"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Tag,
  Trash2,
  Download,
  CornerUpLeft,
  Sparkles,
  Bot,
  User,
  Filter,
  Square,
  Users,
  Loader2,
  PhoneOff,
  Copy,
  Check,
  Search,
  Phone,
  Video,
  VideoOff,
  Mic,
  MicOff,
} from "lucide-react";
import Fuse, { FuseResult } from "fuse.js";
import faqs, { FAQ } from "@/data/faqs";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { io, Socket } from "socket.io-client";

/* ----------------------- Types ----------------------- */
type ChatMode = "bot" | "human_waiting" | "human_connected";

type Message = {
  id: string;
  sender: "user" | "bot" | "system" | "agent";
  text: string;
  time: number;
  readBy?: {
    user: boolean;
    agent: boolean;
  };
  meta?: { 
    confidence?: number; 
    faqId?: string;
    reaction?: "liked" | "disliked";
  };
};

/* --------------------- Helpers ------------------------ */
const uid = (prefix = "") =>
  `${prefix}${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-4)}`;

const formatTime = (ts: number) =>
  new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const formatDate = (ts: number) => {
  const date = new Date(ts);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString([], { month: "short", day: "numeric", year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined });
  }
};

const STORAGE_KEY = (path: string) => `cird_chat_v2:${path || "root"}`;

const DEFAULT_GREETING =
  "Hello! I'm your SARATHI. I can help you explore research projects, patents, collaborations, and more. What would you like to know?";

const DEFAULT_MESSAGES: Message[] = [
  {
    id: uid("welcome"),
    sender: "bot",
    text: DEFAULT_GREETING,
    time: Date.now(),
    meta: { confidence: 1 },
  },
];

/* ------------------ Fuse.js Setup --------------------- */
const fuse = new Fuse(faqs, {
  keys: ["question", "answer", "tags"],
  includeScore: true,
  threshold: 0.4,
  useExtendedSearch: true,
});

async function streamChatResponse(
  question: string,
  onUpdate: (text: string) => void,
  abortSignal?: AbortSignal
): Promise<void> {
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    (typeof window !== "undefined" && window.location.hostname.includes("cird.co.in")
      ? "https://cird.onrender.com"
      : "http://localhost:5000");

  console.log("🌐 Chat API base URL:", baseURL);

  try {
    const response = await fetch(`${baseURL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
      signal: abortSignal,
    });

    if (!response.ok) {
      console.error("❌ Chat API error:", response.status, response.statusText);
      onUpdate("Sorry, the assistant is temporarily unavailable. Please try again later.");
      return;
    }

    // ✅ Type-safe reader
    const reader: ReadableStreamDefaultReader<Uint8Array> | undefined = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let botText = "";

    // ✅ Add a typed delay helper
    const delay = (ms: number): Promise<void> =>
      new Promise((resolve) => setTimeout(resolve, ms));

    if (!reader) {
      console.error("⚠️ Stream reader unavailable");
      onUpdate("Sorry, something went wrong initializing the chat stream.");
      return;
    }

    // ✅ Stream loop (typed)
    while (true) {
      // Check if aborted
      if (abortSignal?.aborted) {
        reader.cancel();
        break;
      }

      const { value, done } = await reader.read();
      if (done) break;

      // Check again after read
      if (abortSignal?.aborted) {
        reader.cancel();
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n").filter((line) => line.trim() !== "");

      for (const line of lines) {
        if (abortSignal?.aborted) {
          reader.cancel();
          return;
        }
        if (line === "data: [DONE]") return;
        if (line.startsWith("data: ")) {
          const content = line.replace("data: ", "");
          botText += content;
          onUpdate(botText);
          await delay(120); // simulate natural typing
        }
      }
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.log("Stream cancelled by user");
      return;
    }
    console.error("Error in streamChatResponse:", error);
    onUpdate("Sorry, an error occurred. Please try again.");
  }
}


/* ------------- Enhanced Answer Resolution ------------- */
async function resolveAnswerWithModel(
  question: string,
  activeTag: string | null,
): Promise<{ answer: string; confidence?: number; faqId?: string; suggestions?: string[] }> {
  const query = question.trim().toLowerCase();
  
  // Quick exact match check
  const exactMatch = faqs.find(f => 
    f.question.toLowerCase().includes(query) || 
    f.tags?.some(tag => tag.toLowerCase().includes(query))
  );
  
  if (exactMatch) {
    return {
      answer: exactMatch.answer,
      confidence: 0.95,
      faqId: exactMatch.id,
    };
  }

  const results = fuse.search(query);
  let picked: FuseResult<FAQ> | null = null;
  
  if (activeTag && activeTag !== "All") {
    picked = results.find((r) => (r.item.tags || []).includes(activeTag)) ?? null;
  }
  if (!picked && results.length > 0) picked = results[0];

  if (picked && typeof picked.score === "number" && picked.score < 0.4) {
    return {
      answer: picked.item.answer,
      confidence: 0.9 - (picked.score ?? 0) * 0.4,
      faqId: picked.item.id,
      suggestions: results.slice(1, 4).map(r => r.item.question),
    };
  }

  if (results.length > 0) {
    const primaryAnswer = results[0].item.answer;
    const suggestions = results.slice(0, 3).map(r => r.item.question);
    
    return {
      answer: `I found this information that might help:\n\n${primaryAnswer}\n\nRelated questions you might want to ask:`,
      confidence: 0.7,
      suggestions,
    };
  }

  return {
    answer: "I'm still learning about CIRD's knowledge base. Could you try rephrasing your question or ask about our research projects, patents, or collaboration opportunities?",
    confidence: 0.1,
    suggestions: ["What research projects are ongoing?", "How can I collaborate with CIRD?", "Where can I find patent information?"],
  };
}

/* -------------------- Enhanced Component ----------------------- */
export default function ChatBot() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const storageKey = useMemo(() => STORAGE_KEY(pathname), [pathname]);

  const [open, setOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [messageReactions, setMessageReactions] = useState<Record<string, "liked" | "disliked">>({});
  const [showFilters, setShowFilters] = useState(false);
  const [isGeneratingAnswer, setIsGeneratingAnswer] = useState(false);
  const [suggestionsUpdated, setSuggestionsUpdated] = useState(false); // Track if suggestions have been updated
  const [chatbotImageError, setChatbotImageError] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  // ✅ Human Agent Chat State
  const [chatMode, setChatMode] = useState<ChatMode>("bot");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [agentTyping, setAgentTyping] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  
  // Call state
  const [callState, setCallState] = useState<"idle" | "ringing" | "connected" | "incoming">("idle");
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const incomingCallOfferRef = useRef<RTCSessionDescriptionInit | null>(null);

  // Update refs when state changes
  useEffect(() => {
    chatModeRef.current = chatMode;
  }, [chatMode]);

  useEffect(() => {
    currentRoomIdRef.current = currentRoomId;
  }, [currentRoomId]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chatModeRef = useRef<ChatMode>("bot");
  const currentRoomIdRef = useRef<string | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    faqs.forEach((f) => (f.tags || []).forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, []);

  /* ------------------ Enhanced Persistence ------------------ */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved) && saved.length > 0) {
          setMessages(saved);
        } else {
          setMessages(DEFAULT_MESSAGES);
        }
      } else {
        setMessages(DEFAULT_MESSAGES);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
      setMessages(DEFAULT_MESSAGES);
    }
  }, [storageKey]);

  useEffect(() => {
    if (messages.length > 0 && Array.isArray(messages)) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(messages.slice(-300)));
      } catch (error) {
        console.error('Error saving chat history:', error);
      }
    }
  }, [messages, storageKey]);

  /* ------------------ Smart Popup behavior ------------------ */
  useEffect(() => {
    const greetings = {
      default: "💬 Need help exploring CIRD?",
      about: "💬 Want to know about CIRD's mission and team?",
      projects: "💬 Curious about our research projects?",
      patents: "💬 Looking for patent information?",
      contact: "💬 Need contact details or collaboration info?",
    };

    let text = greetings.default;
    if (pathname.includes("/about")) text = greetings.about;
    else if (pathname.includes("/projects")) text = greetings.projects;
    else if (pathname.includes("/patents")) text = greetings.patents;
    else if (pathname.includes("/contact")) text = greetings.contact;

    const showTimer = setTimeout(() => {
      if (!open) setPopupVisible(true);
    }, 3000);
    
    const hideTimer = setTimeout(() => setPopupVisible(false), 10000);
    
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [pathname, open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ✅ Mark agent messages as read when they appear (for user)
  useEffect(() => {
    if (chatMode !== "human_connected" || !socket || !currentRoomId) return;

    // Find unread agent messages
    const unreadAgentMessages = messages.filter(
      (m) => m.sender === "agent" && m.readBy && !m.readBy.user
    );

    // Mark them as read after a delay
    unreadAgentMessages.forEach((msg) => {
      setTimeout(() => {
        if (socket && currentRoomId && chatModeRef.current === "human_connected") {
          socket.emit("message_read", {
            messageId: msg.id,
            roomId: currentRoomId,
          });
        }
      }, 1000);
    });
  }, [messages, chatMode, socket, currentRoomId]);

  // WebRTC Configuration
  const rtcConfiguration: RTCConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
    ],
  };

  // End Call
  const endCall = useCallback(() => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
    
    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop());
      setRemoteStream(null);
    }

    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    if (socket && currentRoomIdRef.current) {
      socket.emit("call_end", {
        roomId: currentRoomIdRef.current,
        enderType: "user",
      });
    }

    setCallState("idle");
    incomingCallOfferRef.current = null;
  }, [localStream, remoteStream, peerConnection, socket]);

  // Answer Call
  const answerCall = useCallback(async () => {
    if (!currentRoomIdRef.current || !socket || !incomingCallOfferRef.current) {
      console.error("Cannot answer call: missing roomId, socket, or offer");
      return;
    }

    try {
      console.log("📞 Answering call...");
      
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: isVideoEnabled,
        audio: !isMuted,
      });
      
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Create peer connection
      const pc = new RTCPeerConnection(rtcConfiguration);

      // Handle ICE candidates
      pc.onicecandidate = (event) => {
        if (event.candidate && socket && currentRoomIdRef.current) {
          socket.emit("call_ice_candidate", {
            roomId: currentRoomIdRef.current,
            candidate: event.candidate,
            senderType: "user",
          });
        }
      };

      // Handle remote stream
      pc.ontrack = (event) => {
        if (event.streams[0]) {
          setRemoteStream(event.streams[0]);
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        }
      };

      // Add local stream tracks
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      setPeerConnection(pc);

      // Set remote description (the offer)
      await pc.setRemoteDescription(new RTCSessionDescription(incomingCallOfferRef.current));

      // Create answer
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      // Send answer
      socket.emit("call_answer", {
        roomId: currentRoomIdRef.current,
        answer: answer,
        answererType: "user",
      });

      console.log("✅ Call answered, waiting for connection...");
      setCallState("connected");
      incomingCallOfferRef.current = null;
    } catch (error: any) {
      console.error("Error answering call:", error);
      let errorMessage = "Could not access camera/microphone.\n\n";
      
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        errorMessage += "Please grant camera/microphone permissions:\n";
        errorMessage += "1. Click the lock icon (🔒) in your browser's address bar\n";
        errorMessage += "2. Allow Camera and Microphone access\n";
        errorMessage += "3. Refresh the page and try again";
      } else {
        errorMessage += `Error: ${error.message || "Unknown error"}`;
      }
      
      alert(errorMessage);
      setCallState("idle");
      incomingCallOfferRef.current = null;
    }
  }, [socket, isVideoEnabled, isMuted]);

  // Reject Call
  const rejectCall = useCallback(() => {
    if (socket && currentRoomIdRef.current) {
      socket.emit("call_end", {
        roomId: currentRoomIdRef.current,
        enderType: "user",
      });
    }
    setCallState("idle");
    incomingCallOfferRef.current = null;
  }, [socket]);

  // Toggle Mute
  const toggleMute = useCallback(() => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = isMuted;
      });
      setIsMuted(!isMuted);
    }
  }, [localStream, isMuted]);

  // Toggle Video
  const toggleVideo = useCallback(() => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !isVideoEnabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  }, [localStream, isVideoEnabled]);

  /* ---------------- Socket.io Connection & Event Handlers ---------------- */
  useEffect(() => {
    if (!open) return; // Only connect when chat is open

    const baseURL =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      (typeof window !== "undefined" && window.location.hostname.includes("cird.co.in")
        ? "https://cird.onrender.com"
        : "http://localhost:5000");

    console.log("🔌 Initializing Socket.io connection to:", baseURL);
    const socketInstance = io(baseURL, {
      transports: ["websocket", "polling"],
      query: { userId },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socketInstance.on("connect", () => {
      console.log("✅ Socket.io connected:", socketInstance.id);
      setSocketConnected(true);
      socketInstance.emit("user_connect", { userId });
      
      // If we're in human_connected mode, rejoin the room
      if (chatMode === "human_connected" && currentRoomId) {
        console.log("🔄 Rejoining room after reconnection:", currentRoomId);
        socketInstance.emit("user_connect", { userId, roomId: currentRoomId });
      }
    });

    socketInstance.on("disconnect", () => {
      console.log("❌ Socket.io disconnected");
      setSocketConnected(false);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("❌ Socket.io connection error:", error);
      setSocketConnected(false);
    });

    socketInstance.on("queue_position", (data: { position: number; total: number }) => {
      setQueuePosition(data.position);
      console.log(`⏳ Queue position: ${data.position}/${data.total}`);
    });

    socketInstance.on("agent_connected", (data: { roomId: string; agentId?: string }) => {
      console.log("✅ Agent connected, room:", data.roomId);
      
      // Update both state and refs immediately
      setChatMode("human_connected");
      setCurrentRoomId(data.roomId);
      chatModeRef.current = "human_connected";
      currentRoomIdRef.current = data.roomId;
      
      setQueuePosition(null);
      setAgentTyping(false); // Clear any typing indicator
      
      // Stop any ongoing AI streaming
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      setIsStreaming(false);
      setIsTyping(false);
      setIsGeneratingAnswer(false);

      // Add system message
      setMessages((prev) => [
        ...prev,
        {
          id: uid("system_"),
          sender: "system",
          text: "You are now connected to a Margadarshak. How can we help you?",
          time: Date.now(),
        },
      ]);
      
      // Verify socket is in the room and test connection
      console.log("🔍 Verifying socket room membership for room:", data.roomId);
      console.log("🔍 Socket connected:", socketInstance.connected);
      console.log("🔍 Socket ID:", socketInstance.id);
      console.log("🔍 Chat mode set to:", chatModeRef.current);
      console.log("🔍 Room ID set to:", currentRoomIdRef.current);
      
      // Ensure we're listening for messages
      console.log("✅ Ready to receive agent messages in room:", data.roomId);
    });

    socketInstance.on("agent_not_available", () => {
      setMessages((prev) => [
        ...prev,
        {
          id: uid("system_"),
          sender: "system",
          text: "No agents are currently available. Please try again later or continue chatting with SARATHI.",
          time: Date.now(),
        },
      ]);
      setChatMode("bot");
      setQueuePosition(null);
    });

    socketInstance.on("new_message", (data: { id?: string; sender: string; text: string; timestamp: number; roomId?: string; readBy?: { user: boolean; agent: boolean } }) => {
      // Use refs to get current values (not stale closure values)
      const currentMode = chatModeRef.current;
      const currentRoom = currentRoomIdRef.current;
      
      console.log("📨 Received new_message event:", { 
        sender: data.sender, 
        text: data.text.substring(0, 50), 
        roomId: data.roomId, 
        currentRoomId: currentRoom, 
        chatMode: currentMode 
      });
      
      // Process agent messages
      if (data.sender === "agent") {
        // Check if we have a roomId match (more reliable than mode check)
        const roomMatches = !data.roomId || !currentRoom || data.roomId === currentRoom;
        const isHumanMode = currentMode === "human_connected" || currentMode === "human_waiting";
        
        if (!roomMatches && !isHumanMode) {
          console.log("⚠️ Ignoring agent message - no room match and not in human mode");
          return;
        }
        
        // If we have a roomId match, process the message even if mode isn't set yet
        if (roomMatches || isHumanMode) {
          console.log("✅ Processing agent message:", data.text);
          
          // Clear typing indicator immediately when message arrives
          if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = null;
          }
          setAgentTyping(false);
          
          // If we're not in human_connected mode but have a room, switch to it
          if (currentMode !== "human_connected" && data.roomId) {
            console.log("🔄 Switching to human_connected mode");
            setChatMode("human_connected");
            setCurrentRoomId(data.roomId);
          }
          
          setMessages((prev) => {
            // Check if message already exists (prevent duplicates)
            const messageExists = prev.some(
              (msg) => msg.text === data.text && Math.abs(msg.time - data.timestamp) < 1000 && msg.sender === "agent"
            );
            if (messageExists) {
              console.log("⚠️ Duplicate agent message detected, skipping");
              return prev;
            }
            
            console.log("✅ Adding agent message to chat");
            const newMessage: Message = {
              id: data.id || uid("agent_"),
              sender: "agent",
              text: data.text,
              time: data.timestamp,
              readBy: data.readBy || { user: false, agent: true },
            };
            
            // Mark as read after a delay (when user sees it)
            if (socketInstance && currentRoomId && !newMessage.readBy?.user) {
              setTimeout(() => {
                if (socketInstance && currentRoomId && chatModeRef.current === "human_connected") {
                  socketInstance.emit("message_read", {
                    messageId: newMessage.id,
                    roomId: currentRoomId,
                  });
                }
              }, 1000);
            }
            
            return [...prev, newMessage];
          });
        } else {
          console.log("⚠️ Ignoring agent message - conditions not met");
        }
      } else if (data.sender === "user") {
        // Handle user's own messages from server (to sync IDs and readBy status)
        setMessages((prev) => {
          // Find the most recent user message that matches (likely the one just sent)
          const matchingIndex = prev.findLastIndex(
            (msg) => msg.text === data.text && Math.abs(msg.time - data.timestamp) < 2000 && msg.sender === "user"
          );
          
          if (matchingIndex !== -1) {
            // Update existing message with server's ID and readBy status
            const updated = [...prev];
            updated[matchingIndex] = {
              ...updated[matchingIndex],
              id: data.id || updated[matchingIndex].id,
              readBy: data.readBy || updated[matchingIndex].readBy || { user: true, agent: false },
            };
            console.log("✅ Updated user message ID:", updated[matchingIndex].id, "readBy:", updated[matchingIndex].readBy);
            return updated;
          }
          return prev;
        });
      } else {
        console.log("⚠️ Ignoring non-agent/user message:", { sender: data.sender });
      }
    });

    socketInstance.on("agent_typing", (data?: { agentId?: string; roomId?: string }) => {
      // Use refs to get current values
      const currentMode = chatModeRef.current;
      const currentRoom = currentRoomIdRef.current;
      
      console.log("⌨️ Agent typing indicator received:", data, "chatMode:", currentMode);
      
      // Show typing indicator if we're in human_connected mode or if roomId matches
      const shouldShow = currentMode === "human_connected" || 
                        currentMode === "human_waiting" ||
                        (data?.roomId && currentRoom && data.roomId === currentRoom);
      
      if (shouldShow) {
        console.log("✅ Showing agent typing indicator");
        
        // Clear any existing timeout first
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
          typingTimeoutRef.current = null;
        }
        
        // Show typing indicator immediately
        setAgentTyping(true);
      } else {
        console.log("⚠️ Not showing typing indicator, conditions not met");
      }
    });

    socketInstance.on("agent_stopped_typing", (data?: { agentId?: string; roomId?: string }) => {
      // Use refs to get current values
      const currentMode = chatModeRef.current;
      const currentRoom = currentRoomIdRef.current;
      
      console.log("⌨️ Agent stopped typing indicator received:", data);
      
      // Clear typing indicator if we're in the right mode/room
      const shouldClear = currentMode === "human_connected" || 
                         currentMode === "human_waiting" ||
                         (data?.roomId && currentRoom && data.roomId === currentRoom);
      
      if (shouldClear) {
        console.log("✅ Clearing agent typing indicator");
        
        // Clear timeout
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
          typingTimeoutRef.current = null;
        }
        
        // Clear typing indicator
        setAgentTyping(false);
      }
    });

    socketInstance.on("agent_disconnected", (data: { message?: string }) => {
      setChatMode("bot");
      setCurrentRoomId(null);
      setAgentTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: uid("system_"),
          sender: "system",
          text: data.message || "The Margadarshak has disconnected. You may continue chatting with SARATHI.",
          time: Date.now(),
        },
      ]);
    });

    // ✅ Handle read receipt updates
    socketInstance.on("message_read_update", (data: { messageId: string; readBy: { user: boolean; agent: boolean }; roomId?: string }) => {
      const currentRoom = currentRoomIdRef.current;
      
      // Only process if room matches
      if (data.roomId && currentRoom && data.roomId !== currentRoom) {
        return;
      }
      
      console.log("✅ Message read update received:", data);
      
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === data.messageId
            ? { ...msg, readBy: data.readBy }
            : msg
        )
      );
    });

    // ✅ WebRTC Call Event Handlers
    socketInstance.on("call_offer", async (data: { roomId: string; offer: RTCSessionDescriptionInit; callerId: string }) => {
      console.log("📞 Incoming call offer from:", data.callerId, "roomId:", data.roomId, "currentRoom:", currentRoomIdRef.current);
      
      if (data.roomId !== currentRoomIdRef.current) {
        console.log("⚠️ Room ID mismatch, ignoring call offer");
        return;
      }
      
      incomingCallOfferRef.current = data.offer;
      setCallState("incoming");
      
      // Play notification sound (ringing)
      const playRing = () => {
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.value = 800;
          oscillator.type = 'sine';
          
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.2);
        } catch (error) {
          console.log("Could not play call sound:", error);
        }
      };
      
      // Play ring sound every 2 seconds while incoming
      const ringInterval = setInterval(() => {
        if (callState === "incoming") {
          playRing();
        } else {
          clearInterval(ringInterval);
        }
      }, 2000);
      
      // Cleanup interval when call state changes
      setTimeout(() => clearInterval(ringInterval), 30000); // Stop after 30 seconds
    });

    socketInstance.on("call_answer", async (data: { roomId: string; answer: RTCSessionDescriptionInit }) => {
      if (data.roomId !== currentRoomIdRef.current || !peerConnection) return;
      
      console.log("📞 Call answered");
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
      setCallState("connected");
    });

    socketInstance.on("call_ice_candidate", async (data: { roomId: string; candidate: RTCIceCandidateInit }) => {
      if (data.roomId !== currentRoomIdRef.current || !peerConnection) return;
      
      try {
        await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
      } catch (error) {
        console.error("Error adding ICE candidate:", error);
      }
    });

    socketInstance.on("call_end", (data: { roomId: string }) => {
      if (data.roomId !== currentRoomIdRef.current) return;
      
      console.log("📞 Call ended by agent");
      endCall();
    });

    setSocket(socketInstance);

    return () => {
      // Cleanup call handlers
      socketInstance.off("call_offer");
      socketInstance.off("call_answer");
      socketInstance.off("call_ice_candidate");
      socketInstance.off("call_end");
      
      // Only disconnect when chat is closed, not on every render
      if (!open) {
        socketInstance.disconnect();
        setSocket(null);
        setSocketConnected(false);
      }
    };
  }, [open, userId, peerConnection, endCall]);

  /* ---------------- Human Handoff Detection ---------------- */
  const detectHumanHandoff = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    const triggers = [
      "connect to a human",
      "talk to support",
      "need agent",
      "human please",
      "speak to agent",
      "human agent",
      "live agent",
      "real person",
      "talk to person",
      "human support",
    ];
    return triggers.some((trigger) => lowerText.includes(trigger));
  };

  /* ---------------- Enhanced Suggestions logic ---------------- */
  const askedSet = useMemo(() => {
    const safeMessages = Array.isArray(messages) ? messages : [];
    return new Set(
      safeMessages
        .filter((m) => m.sender === "user")
        .map((m) => m.text.toLowerCase())
    );
  }, [messages]);

  const refreshSuggestions = useCallback(
    (tag: string | null = "All") => {
      if (suggestionsUpdated) return; // Prevent suggestion refresh if already updated once
      
      const pool =
        tag && tag !== "All"
          ? faqs.filter((f) => (f.tags || []).includes(tag))
          : faqs;

      const available = pool
        .map((f) => f.question)
        .filter((q) => !askedSet.has(q.toLowerCase()));

      const picks = available.sort(() => 0.5 - Math.random()).slice(0, 4);
      setSuggestions(picks); // Update suggestions only when response is fully generated
      setSuggestionsUpdated(true); // Mark suggestions as updated
    },
    [askedSet, suggestionsUpdated]
  );

  const shuffleSuggestions = (selected: string) => {
    const pool = faqs.map(f => f.question);
    const filteredSuggestions = pool.filter(s => s !== selected); // Remove the selected question
    const shuffledSuggestions = filteredSuggestions.sort(() => Math.random() - 0.5); // Shuffle the remaining questions
    setSuggestions([selected, ...shuffledSuggestions.slice(0, 3)]); // Keep the selected question and shuffle the rest
  };

  /* ---------------- Stop streaming function ---------------- */
  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
    setIsTyping(false);
    setIsGeneratingAnswer(false);
  }, []);

  /* ---------------- Enhanced Sending & resolving ---------------- */
  const sendMessage = useCallback(async (raw: string) => {
    const cleaned = raw.trim();
    if (!cleaned) return;

    // ✅ Handle human chat mode
    if (chatMode === "human_connected" && socket && currentRoomId && socketConnected) {
      const messageText = cleaned;
      const timestamp = Date.now();
      
      // Send via Socket.io first (server will broadcast to room)
      socket.emit("user_message", {
        message: messageText,
        roomId: currentRoomId,
      });

      // Emit typing indicator
      socket.emit("user_typing", { roomId: currentRoomId });

      // Add to local state immediately (will also be received via new_message, but adding for better UX)
      const userMsg: Message = {
        id: uid("user_"),
        sender: "user",
        text: messageText,
        time: timestamp,
        readBy: { user: true, agent: false },
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");

      // Clear typing indicator after delay
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        // Typing indicator cleared
      }, 3000);

      return;
    }

    // ✅ Check for human handoff request
    if (detectHumanHandoff(cleaned)) {
      // Cancel any existing stream
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      setIsStreaming(false);
      setIsTyping(false);
      setIsGeneratingAnswer(false);

      // Add user message
      const userMsg: Message = {
        id: uid("user_"),
        sender: "user",
        text: cleaned,
        time: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");

      // Switch to human waiting mode
      setChatMode("human_waiting");
      setMessages((prev) => [
        ...prev,
        {
          id: uid("system_"),
          sender: "system",
          text: "Connecting you to a human agent...",
          time: Date.now(),
        },
      ]);

      // Request agent via Socket.io - wait for connection if needed
      if (socket && socketConnected) {
        console.log("📤 Emitting user_request_agent for userId:", userId);
        socket.emit("user_request_agent");
      } else if (socket && !socketConnected) {
        // Wait for connection
        console.log("⏳ Waiting for socket connection...");
        socket.once("connect", () => {
          console.log("✅ Socket connected, emitting user_request_agent");
          socket.emit("user_request_agent");
        });
      } else {
        console.error("❌ Socket not available");
        setMessages((prev) => [
          ...prev,
          {
            id: uid("system_"),
            sender: "system",
            text: "Connection error. Please try again.",
            time: Date.now(),
          },
        ]);
        setChatMode("bot");
      }

      return;
    }

    // ✅ Normal bot mode - continue with AI streaming
    // Cancel any existing stream
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    // Add the user message to the state
    const userMsg: Message = {
      id: uid("user_"),
      sender: "user",
      text: cleaned,
      time: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setIsGeneratingAnswer(true);
    setIsStreaming(true);

    // Create a placeholder for the bot message with "Thinking..." text
    const botMsg: Message = {
      id: uid("bot_"),
      sender: "bot",
      text: "Thinking...",
      time: Date.now(),
    };

    setMessages((prev) => [...prev, botMsg]);

    // Show thinking indicator before starting the response generation
    setIsTyping(true);

    // Stream the bot's response
    await streamChatResponse(cleaned, (newText) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === botMsg.id ? { ...m, text: newText } : m))
      );
    }, abortController.signal);

    // Stop typing and refresh suggestions after the message finishes
    setIsStreaming(false);
    setIsTyping(false);
    setIsGeneratingAnswer(false);
    abortControllerRef.current = null;
    refreshSuggestions(activeTag); // Refresh suggestions only once after response is generated
  }, [activeTag, refreshSuggestions, chatMode, socket, currentRoomId]);

  /* --------------- Enhanced Regenerate ---------------- */
  const regenerateAnswer = async (botMessageId: string) => {
    // Cancel any existing stream
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const safeMessages = Array.isArray(messages) ? messages : DEFAULT_MESSAGES;
    const idx = safeMessages.findIndex((m) => m.id === botMessageId);
    if (idx === -1) return;
    
    const userMsg = [...safeMessages].reverse().find((m) => m.sender === "user");
    if (!userMsg) return;

    setIsTyping(true);
    const res = await resolveAnswerWithModel(
      userMsg.text,
      activeTag === "All" ? null : activeTag,
    );
    
    await new Promise((r) => setTimeout(r, 600));

    setMessages((prev) => {
      const safePrev = Array.isArray(prev) ? prev : DEFAULT_MESSAGES;
      return safePrev.map((m) =>
        m.id === botMessageId
          ? {
              ...m,
              text: res.answer,
              time: Date.now(),
              meta: { 
                confidence: res.confidence,
                faqId: res.faqId,
                reaction: m.meta?.reaction,
              },
            }
          : m,
      );
    });
    setIsTyping(false);
  };

  /* ---------------- Message Reactions ---------------- */
  const handleReaction = (messageId: string, reaction: "liked" | "disliked") => {
    setMessageReactions(prev => ({
      ...prev,
      [messageId]: reaction
    }));
    
    setMessages(prev => {
      const safePrev = Array.isArray(prev) ? prev : DEFAULT_MESSAGES;
      return safePrev.map(msg =>
        msg.id === messageId
          ? {
              ...msg,
              meta: {
                ...msg.meta,
                reaction
              }
            }
          : msg
      );
    });
  };

  /* ----------------- Clear / Restart ------------------ */
  function clearChat() {
    setMessages(DEFAULT_MESSAGES);
    setInput("");
    setMessageReactions({});
    setSuggestionsUpdated(false); // Reset suggestions update flag
    setChatMode("bot");
    setQueuePosition(null);
    setCurrentRoomId(null);
    setAgentTyping(false);
  }

  /* ---------------- Request Human Agent ---------------- */
  const requestHumanAgent = useCallback(() => {
    // Cancel any ongoing streaming
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
    setIsTyping(false);
    setIsGeneratingAnswer(false);

    // Switch to human waiting mode
    setChatMode("human_waiting");
    setMessages((prev) => [
      ...prev,
      {
        id: uid("system_"),
        sender: "system",
        text: "Connecting you to a human agent...",
        time: Date.now(),
      },
    ]);

    // Request agent via Socket.io - wait for connection if needed
    if (socket && socketConnected) {
      console.log("📤 Emitting user_request_agent for userId:", userId);
      socket.emit("user_request_agent");
    } else if (socket && !socketConnected) {
      // Wait for connection
      console.log("⏳ Waiting for socket connection...");
      socket.once("connect", () => {
        console.log("✅ Socket connected, emitting user_request_agent");
        socket.emit("user_request_agent");
      });
    } else {
      console.error("❌ Socket not available");
      setMessages((prev) => [
        ...prev,
        {
          id: uid("system_"),
          sender: "system",
          text: "Connection error. Please try again.",
          time: Date.now(),
        },
      ]);
      setChatMode("bot");
    }
  }, [socket, socketConnected, userId]);

  // Cleanup on unmount or chat change
  useEffect(() => {
    return () => {
      if (callState !== "idle") {
        endCall();
      }
    };
  }, [currentRoomId, callState, endCall]);

  /* ---------------- End Chat with Agent ---------------- */
  const endChatWithAgent = useCallback(() => {
    if (chatMode !== "human_connected" || !socket || !currentRoomId) return;

    // Emit user disconnect event
    socket.emit("user_disconnect_chat", { roomId: currentRoomId });

    // Switch back to bot mode
    setChatMode("bot");
    setCurrentRoomId(null);
    chatModeRef.current = "bot";
    currentRoomIdRef.current = null;
    setAgentTyping(false);
    setQueuePosition(null);

    // Add system message
    setMessages((prev) => [
      ...prev,
      {
        id: uid("system_"),
        sender: "system",
        text: "You have ended the chat with the Margadarshak. You may continue chatting with SARATHI.",
        time: Date.now(),
      },
    ]);
  }, [chatMode, socket, currentRoomId]);

  /* ---------------- Enhanced Export ------------------ */
  function exportChat() {
    const safeMessages = Array.isArray(messages) ? messages : DEFAULT_MESSAGES;
    const data = {
      pathname,
      exportedAt: new Date().toISOString(),
      messageCount: safeMessages.length,
      messages: safeMessages,
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cird-chat-${pathname.replace(/\W+/g, "_")}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* ---------------- Initialize suggestions on mount ---------------- */
  useEffect(() => {
    if (Array.isArray(messages) && messages.length > 0) {
      refreshSuggestions(activeTag);
    }
  }, [messages, activeTag]);

  /* ---------------- Enhanced UI render ---------------- */
  return (
    <>
      {/* Enhanced Floating Button with Glass Effect */}
      <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-2">
        <AnimatePresence>
          {popupVisible && !open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="relative mb-2"
            >
              {/* Speech Bubble Cloud */}
              <div className="relative bg-[#2d545e]/95 backdrop-blur-md border border-[#12343b] shadow-2xl text-white text-sm px-4 py-3 rounded-2xl">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-[#e1b382]" />
                  <span>Ask me anything about CIRD</span>
                </div>
                {/* Speech bubble tail pointing down to bot */}
                <div className="absolute bottom-0 right-8 transform translate-y-full">
                  <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[14px] border-l-transparent border-r-transparent border-t-[#2d545e]/95 drop-shadow-lg"></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative flex items-center justify-center">
          {/* Circular text path for SARATHI - positioned on top */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 180 180"
              style={{ overflow: 'visible' }}
            >
              <defs>
                {/* Circular path - upper arc only, starting from top (12 o'clock) */}
                <path
                  id="circlePath"
                  d="M 35, 90 A 55, 55 0 0, 1 145, 90"
                  fill="none"
                />
              </defs>
              <text
                fill="white"
                fontSize="16"
                fontWeight="bold"
                letterSpacing="5"
                style={{
                  textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                  filter: 'drop-shadow(0 3px 6px rgba(0,0,0,1))'
                }}
              >
                <textPath 
                  href="#circlePath" 
                  startOffset="50%"
                  textAnchor="middle"
                >
                  SARATHI
                </textPath>
              </text>
            </svg>
            
            {/* Chatbot Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open chat"
              title="Open chat"
              onClick={() => {
                setOpen(true);
                setPopupVisible(false);
                refreshSuggestions(activeTag);
                setTimeout(() => inputRef.current?.focus(), 300);
              }}
              className="relative w-16 h-16 rounded-full bg-transparent border-none shadow-2xl flex items-center justify-center hover:opacity-90 transition-all duration-300 overflow-visible z-10 p-0"
            >
              {!chatbotImageError ? (
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/assets/chatbot.png"
                    alt="SARATHI Chatbot"
                    fill
                    className="object-cover"
                    priority
                    sizes="64px"
                    onError={(e) => {
                      console.error("Failed to load chatbot.png from /assets/chatbot.png");
                      console.error("Error details:", e);
                      setChatbotImageError(true);
                    }}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#2d545e]/20 backdrop-blur-sm rounded-full">
                  <MessageCircle size={28} className="text-[#2d545e]" />
                </div>
              )}
              
              {/* Notification Badge with "1" */}
              {popupVisible && !open && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg z-20"
                >
                  <span className="text-white text-xs font-bold">1</span>
                </motion.div>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Enhanced Chat Window */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-[#2d545e]/20 backdrop-blur-sm z-[999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.9 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300,
                mass: 0.8
              }}
              className="fixed bottom-20 right-6 z-[1000] w-[92%] sm:w-[420px] max-w-[440px] bg-white backdrop-blur-xl text-[#2d545e] rounded-3xl shadow-2xl flex flex-col overflow-hidden border-2 border-[#c89666]"
              style={{
                height: "min(80vh, 650px)",
                maxHeight: "650px",
              }}
            >
              {/* Enhanced Header */}
              <div className="flex items-center justify-between bg-gradient-to-r from-[#2d545e] to-[#12343b] text-white px-5 py-4 border-b border-[#c89666]">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-[#e1b382] flex items-center justify-center">
                      <Bot size={20} className="text-[#2d545e]" />
                    </div>
                    <motion.div 
                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#e1b382] rounded-full border-2 border-[#2d545e]"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">SARATHI</h2>
                    <p className="text-xs text-white/80 opacity-90">
                      {chatMode === "bot" && "Research • Projects • Patents"}
                      {chatMode === "human_waiting" && "Connecting to Margadarshak..."}
                      {chatMode === "human_connected" && "Live Margadarshak • Real-time Chat"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {/* Search Button - Only show when there are messages */}
                  {messages.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setShowSearch(!showSearch);
                        if (showSearch) {
                          setSearchQuery("");
                        }
                      }}
                      title="Search messages"
                      className={`p-2 rounded-xl transition-colors ${
                        showSearch ? "bg-[#e1b382] text-[#2d545e]" : "hover:bg-[#e1b382]/20 text-white"
                      }`}
                    >
                      <Search size={16} />
                    </motion.button>
                  )}
                  {/* End Chat Button - Only in human_connected mode */}
                  {chatMode === "human_connected" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={endChatWithAgent}
                      className="p-2 text-red-300 hover:bg-red-500/20 rounded-xl transition-colors"
                      title="End Chat with Margadarshak"
                    >
                      <PhoneOff size={18} />
                    </motion.button>
                  )}
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowFilters(!showFilters)}
                    title="Toggle filters"
                    className="p-2 hover:bg-[#e1b382]/20 rounded-xl transition-colors text-white"
                  >
                    <Filter size={16} />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={exportChat} 
                    title="Export conversation" 
                    className="p-2 hover:bg-[#e1b382]/20 rounded-xl transition-colors text-white"
                  >
                    <Download size={16} />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={clearChat} 
                    title="Clear conversation" 
                    className="p-2 hover:bg-[#e1b382]/20 rounded-xl transition-colors text-white"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setOpen(false)} 
                    title="Close chat" 
                    className="p-2 hover:bg-[#e1b382]/20 rounded-xl transition-colors text-white"
                  >
                    <X size={18} />
                  </motion.button>
                </div>
              </div>

              {/* Compact Filters Section - Only shown when toggled */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-b border-[#c89666] bg-[#e1b382]/20 backdrop-blur-sm overflow-hidden"
                  >
                    <div className="px-4 py-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Tag size={14} className="text-[#2d545e]" />
                        <span className="text-xs font-medium text-[#2d545e]">FILTER BY TOPIC</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                        {allTags.map((t) => (
                          <motion.button
                            key={t}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setActiveTag(t);
                              refreshSuggestions(t);
                            }}
                            className={`flex items-center gap-1 px-2 py-1 text-xs rounded-full border backdrop-blur-sm transition-all ${
                              activeTag === t
                                ? "bg-[#2d545e] text-white border-[#12343b] shadow-md"
                                : "bg-white text-[#2d545e] border-[#c89666] hover:bg-[#e1b382]/20 hover:border-[#2d545e]"
                            }`}
                          >
                            <Tag size={10} />
                            {t}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Search Bar - Show when search is active */}
              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-b border-[#c89666] bg-[#e1b382]/20 overflow-hidden"
                  >
                    <div className="px-4 py-2">
                      <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2d545e]" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search messages..."
                          className="w-full pl-10 pr-10 py-2 border border-[#c89666] rounded-lg text-sm bg-white text-[#2d545e] focus:ring-2 focus:ring-[#2d545e]/30 focus:border-[#2d545e] outline-none"
                          autoFocus
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2d545e] hover:text-[#12343b]"
                          >
                            <X size={16} />
                          </button>
                        )}
                        {searchQuery && (
                          <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-xs text-[#2d545e]">
                            {messages.filter(m => m.text.toLowerCase().includes(searchQuery.toLowerCase())).length} found
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enhanced Messages Area - More space now */}
              <div 
                ref={containerRef} 
                className="flex-1 overflow-y-auto p-4 bg-[#e1b382]/10 space-y-4"
              >
                {(searchQuery ? messages.filter(m => m.text.toLowerCase().includes(searchQuery.toLowerCase())) : messages).map((m, index) => {
                  const allMessages = messages;
                  const actualIndex = allMessages.findIndex(msg => msg.id === m.id);
                  const prevMsg = actualIndex > 0 ? allMessages[actualIndex - 1] : null;
                  const showDateSeparator = !prevMsg || 
                    formatDate(prevMsg.time) !== formatDate(m.time);
                  
                  return (
                    <React.Fragment key={m.id}>
                      {showDateSeparator && (
                        <div className="flex items-center justify-center my-4">
                          <div className="bg-[#2d545e]/10 text-[#2d545e] text-xs px-3 py-1 rounded-full border border-[#c89666]/30">
                            {formatDate(m.time)}
                          </div>
                        </div>
                      )}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"} group`}
                      >
                    <div className="flex items-start gap-2 max-w-[85%]">
                      {(m.sender === "bot" || m.sender === "agent") && (
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                          m.sender === "agent" ? "bg-green-500" : "bg-[#2d545e]"
                        }`}>
                          {m.sender === "agent" ? (
                            <Users size={12} className="text-white" />
                          ) : (
                            <Bot size={12} className="text-white" />
                          )}
                        </div>
                      )}
                      <div
                        className={`px-4 py-3 rounded-2xl text-sm shadow-sm backdrop-blur-sm ${
                          m.sender === "user"
                            ? "bg-[#2d545e] text-white rounded-br-md"
                            : m.sender === "agent"
                            ? "bg-green-50 border border-green-200 text-[#2d545e] rounded-bl-md"
                            : m.sender === "system"
                            ? "bg-blue-50 border border-blue-200 text-blue-700 rounded-lg"
                            : "bg-white border border-[#c89666] text-[#2d545e] rounded-bl-md"
                        }`}
                      >
                        <div className="whitespace-pre-wrap leading-relaxed">
                          {m.sender === "bot" ? (
                            <div className="prose prose-sm max-w-none">
                              {m.text.split(/(\/projects\/[^\s]+)/g).map((part, idx) => {
                                if (part.startsWith("/projects/")) {
                                  return (
                                    <button
                                      key={idx}
                                      onClick={() => router.push(part)}
                                      className="text-[#2d545e] hover:text-[#12343b] underline font-medium cursor-pointer"
                                    >
                                      Know More
                                    </button>
                                  );
                                }
                                return <span key={idx}>{part}</span>;
                              })}
                            </div>
                          ) : (
                            m.text
                          )}
                        </div>
                        
                        {/* Message Footer */}
                        <div className="flex items-center justify-between mt-2 text-xs">
                          <span className={`${m.sender === "user" ? "text-white/80" : "text-gray-500"}`}>
                            {formatTime(m.time)}
                          </span>
                          
                          <div className="flex items-center gap-3">
                            {/* Read Receipt Ticks - Only on USER's sent messages in human chat */}
                            {chatMode === "human_connected" && m.sender === "user" && (
                              <div className="flex items-center gap-0.5">
                                {/* For user's own messages, show if agent has read */}
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 15"
                                  fill="none"
                                  className={m.readBy?.agent ? "text-blue-500" : "text-gray-400"}
                                >
                                  <path
                                    d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.175a.366.366 0 0 0-.063-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.175a.365.365 0 0 0-.063-.51z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </div>
                            )}
                            
                            {/* Copy Button - Show on hover */}
                            <motion.button
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded ${
                                m.sender === "user" ? "hover:bg-white/20" : "hover:bg-gray-100"
                              }`}
                              onClick={() => {
                                navigator.clipboard.writeText(m.text);
                                setCopiedMessageId(m.id);
                                setTimeout(() => setCopiedMessageId(null), 2000);
                              }}
                              title="Copy message"
                            >
                              {copiedMessageId === m.id ? (
                                <Check size={12} className={m.sender === "user" ? "text-green-300" : "text-green-600"} />
                              ) : (
                                <Copy size={12} className={m.sender === "user" ? "text-white/70" : "text-gray-500"} />
                              )}
                            </motion.button>

                            {m.meta?.confidence && (
                              <span className={`px-2 py-1 rounded-full ${
                                m.meta.confidence > 0.7 ? "bg-green-100 text-green-700" :
                                m.meta.confidence > 0.4 ? "bg-yellow-100 text-yellow-700" :
                                "bg-red-100 text-red-700"
                              }`}>
                                {Math.round(m.meta.confidence * 100)}% confident
                              </span>
                            )}
                            
                            {m.sender === "bot" && chatMode === "bot" && (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => regenerateAnswer(m.id)}
                                  className="p-1 hover:bg-[#e1b382]/20 rounded transition-colors"
                                  title="Regenerate response"
                                >
                                  <CornerUpLeft size={12} className="text-gray-600" />
                                </button>
                                <button
                                  onClick={() => handleReaction(m.id, "liked")}
                                  className={`p-1 rounded transition-colors ${
                                    messageReactions[m.id] === "liked" 
                                      ? "text-green-600 bg-green-50" 
                                      : "hover:bg-[#e1b382]/20"
                                  }`}
                                  title="Helpful response"
                                >
                                  👍
                                </button>
                                <button
                                  onClick={() => handleReaction(m.id, "disliked")}
                                  className={`p-1 rounded transition-colors ${
                                    messageReactions[m.id] === "disliked" 
                                      ? "text-red-600 bg-red-50" 
                                      : "hover:bg-[#e1b382]/20"
                                  }`}
                                  title="Not helpful"
                                >
                                  👎
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {m.sender === "user" && (
                        <div className="w-6 h-6 rounded-full bg-[#2d545e] flex items-center justify-center flex-shrink-0 mt-1">
                          <User size={12} className="text-white" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                    </React.Fragment>
                  );
                })}

                {/* Enhanced Typing Indicator */}
                {isTyping && !isGeneratingAnswer && chatMode === "bot" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start gap-2 max-w-[85%]">
                      <div className="w-6 h-6 rounded-full bg-[#2d545e] flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot size={12} className="text-white" />
                      </div>
                      <div className="bg-white border border-[#c89666] px-4 py-3 rounded-2xl rounded-bl-md">
                        <div className="flex items-center gap-2">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-[#2d545e] rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-[#2d545e] rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-[#2d545e] rounded-full"
                          />
                          <span className="text-xs text-gray-600 ml-2">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Agent Typing Indicator */}
                {agentTyping && chatMode === "human_connected" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start gap-2 max-w-[85%]">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                        <Users size={12} className="text-white" />
                      </div>
                      <div className="bg-white border border-[#c89666] px-4 py-3 rounded-2xl rounded-bl-md">
                        <div className="flex items-center gap-2">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-green-500 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-green-500 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-green-500 rounded-full"
                          />
                          <span className="text-xs text-gray-600 ml-2">Margadarshak is typing...</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Waiting for Agent Indicator */}
                {chatMode === "human_waiting" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center"
                  >
                    <div className="bg-blue-50 border border-blue-200 px-4 py-3 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <Loader2 size={16} className="text-blue-600 animate-spin" />
                        <span className="text-sm text-blue-700">
                          {queuePosition
                            ? `Waiting for Margadarshak... (Position: ${queuePosition})`
                            : "Connecting to Margadarshak..."}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={endRef} />
              </div>

              {/* Connect to Human Agent Button - Only in bot mode */}
              {chatMode === "bot" && (
                <div className="border-t border-[#c89666] bg-[#e1b382]/20 backdrop-blur-sm px-4 py-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={requestHumanAgent}
                    disabled={!socket}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                  >
                    <Users size={16} />
                    <span className="text-sm font-medium">Connect to Margadarshak</span>
                  </motion.button>
                </div>
              )}

              {/* Enhanced Suggestions - Now more compact - Hidden in human mode */}
              {suggestions.length > 0 && chatMode === "bot" && (
                <div className="border-t border-[#c89666] bg-[#e1b382]/20 backdrop-blur-sm px-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={12} className="text-[#2d545e]" />
                    <span className="text-xs font-medium text-[#2d545e]">QUICK SUGGESTIONS</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {suggestions.map((s) => (
                      <motion.button
                        key={s}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          shuffleSuggestions(s); // Shuffle suggestions when user selects one
                          sendMessage(s); // Send the selected suggestion as message
                        }}
                        className="px-2 py-1 text-xs bg-[#2d545e] border border-[#12343b] rounded-lg hover:bg-[#12343b] hover:border-[#2d545e] transition-all backdrop-blur-sm text-white"
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Incoming Call UI */}
              <AnimatePresence>
                {callState === "incoming" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="border-t border-[#c89666] bg-gradient-to-r from-green-500 to-green-600 p-4"
                  >
                    <div className="text-center text-white">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center"
                        >
                          <Phone size={32} className="text-white" />
                        </motion.div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Incoming Call</h3>
                      <p className="text-sm text-white/90 mb-4">Margadarshak is calling you...</p>
                      <div className="flex items-center justify-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={rejectCall}
                          className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center gap-2"
                        >
                          <PhoneOff size={20} />
                          Decline
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={answerCall}
                          className="px-6 py-3 bg-white text-green-600 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2 font-semibold"
                        >
                          <Phone size={20} />
                          Answer
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active Call UI */}
              <AnimatePresence>
                {callState === "connected" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-[#c89666] bg-gray-900 overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-2 p-4">
                      {/* Remote Video */}
                      <div className="relative bg-black rounded-lg aspect-video">
                        {remoteStream ? (
                          <video
                            ref={remoteVideoRef}
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white">
                            Connecting...
                          </div>
                        )}
                      </div>
                      
                      {/* Local Video */}
                      <div className="relative bg-black rounded-lg aspect-video">
                        {localStream ? (
                          <video
                            ref={localVideoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            Local video
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Call Controls */}
                    <div className="flex items-center justify-center gap-4 p-4 bg-gray-800">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleMute}
                        className={`p-3 rounded-full ${
                          isMuted ? "bg-red-500 text-white" : "bg-gray-700 text-white"
                        }`}
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleVideo}
                        className={`p-3 rounded-full ${
                          !isVideoEnabled ? "bg-red-500 text-white" : "bg-gray-700 text-white"
                        }`}
                        title={isVideoEnabled ? "Turn off video" : "Turn on video"}
                      >
                        {isVideoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={endCall}
                        className="p-3 rounded-full bg-red-500 text-white"
                        title="End Call"
                      >
                        <PhoneOff size={20} />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enhanced Input Area */}
              <div className="border-t border-[#c89666] p-4 bg-[#e1b382]/20 backdrop-blur-sm">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          if (chatMode === "human_connected" || (!isStreaming && chatMode === "bot")) {
                            sendMessage(input);
                          }
                        }
                      }}
                      placeholder={
                        chatMode === "bot"
                          ? "Ask about research, projects, patents..."
                          : chatMode === "human_waiting"
                          ? "Waiting for Margadarshak..."
                          : "Type your message to the Margadarshak..."
                      }
                      disabled={isStreaming || chatMode === "human_waiting"}
                      maxLength={2000}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#c89666] bg-white text-[#2d545e] text-sm focus:ring-2 focus:ring-[#2d545e]/30 focus:border-[#2d545e] outline-none transition-all backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {/* Character Counter */}
                    {input.length > 0 && (
                      <div className="absolute bottom-1 right-2 text-xs text-gray-400">
                        {input.length}/2000
                      </div>
                    )}
                  </div>
                  {chatMode === "bot" && isStreaming ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={stopStreaming}
                      className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all backdrop-blur-sm"
                      title="Stop generating"
                    >
                      <Square size={18} />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => sendMessage(input)}
                      disabled={!input.trim() || chatMode === "human_waiting" || (chatMode === "bot" && isStreaming)}
                      className="p-3 bg-[#2d545e] text-white rounded-xl hover:bg-[#12343b] transition-all disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                    >
                      <Send size={18} />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
