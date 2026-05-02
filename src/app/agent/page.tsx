"use client";

import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { io, Socket } from "socket.io-client";
import {
  Users,
  MessageCircle,
  X,
  Send,
  LogOut,
  Loader2,
  User as UserIcon,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Download,
  Check,
  Search,
  FileText,
  Zap,
  BarChart3,
  Edit3,
  Phone,
  PhoneOff,
  Mic,
  MicOff,
} from "lucide-react";

/* ----------------------- Types ----------------------- */
type WaitingUser = {
  userId: string;
  waitingSince: number;
};

type ChatMessage = {
  id: string;
  sender: "agent" | "user";
  text: string;
  timestamp: number;
  readBy?: {
    user: boolean;
    agent: boolean;
  };
  reaction?: "thumbs_up" | "thumbs_down";
};

type ActiveChat = {
  userId: string;
  roomId: string;
  messages: ChatMessage[];
  startedAt: number;
  notes?: string;
};

/* --------------------- Constants ------------------------ */
const AGENT_PIN = process.env.NEXT_PUBLIC_AGENT_PIN || "1234"; // Default PIN for development

/* --------------------- Helpers ------------------------ */
const formatTime = (ts: number, use24Hour: boolean = false) =>
  new Date(ts).toLocaleTimeString([], { 
    hour: "2-digit", 
    minute: "2-digit",
    hour12: !use24Hour
  });

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

const formatDuration = (startTime: number) => {
  const seconds = Math.floor((Date.now() - startTime) / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
};

const formatWaitingTime = (since: number) => {
  const seconds = Math.floor((Date.now() - since) / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ${seconds % 60}s`;
};

const uid = (prefix = "") =>
  `${prefix}${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-4)}`;

type AgentStatus = {
  agentId: string;
  isConnected: boolean;
  activeChatsCount?: number;
  isBusy: boolean;
};

const AGENT_AUTH_KEY = "cird_agent_auth";

// Quick Reply Templates
const QUICK_REPLIES = [
  "Hello! How can I help you today?",
  "Thank you for contacting CIRD. I'm here to assist you.",
  "I understand your concern. Let me help you with that.",
  "Could you please provide more details?",
  "I'll look into this for you right away.",
  "Is there anything else I can help you with?",
  "Thank you for your patience.",
  "Have a great day!",
];

export default function AgentDashboard() {
  // Load authentication state from localStorage on mount
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(AGENT_AUTH_KEY);
      if (saved) {
        try {
          const authData = JSON.parse(saved);
          return authData.isAuthenticated === true;
        } catch {
          return false;
        }
      }
    }
    return false;
  });
  
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [selectedAgentId, setSelectedAgentId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(AGENT_AUTH_KEY);
      if (saved) {
        try {
          const authData = JSON.parse(saved);
          return authData.agentId || "margadarshak1";
        } catch {
          return "margadarshak1";
        }
      }
    }
    return "margadarshak1";
  });
  const [socket, setSocket] = useState<Socket | null>(null);
  const [agentStatuses, setAgentStatuses] = useState<AgentStatus[]>([]);
  const [waitingUsers, setWaitingUsers] = useState<WaitingUser[]>([]);
  const [activeChats, setActiveChats] = useState<ActiveChat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [userTyping, setUserTyping] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [chatDuration, setChatDuration] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [showChatNotes, setShowChatNotes] = useState(false);
  const [showChatStats, setShowChatStats] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [timeFormat24, setTimeFormat24] = useState(false);
  const [chatTags, setChatTags] = useState<Record<string, string>>({});
  const [showTagSelector, setShowTagSelector] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Call state (audio-only)
  const [callState, setCallState] = useState<"idle" | "pending" | "ringing" | "connected" | "incoming">("idle");
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
  const pendingIceCandidatesRef = useRef<RTCIceCandidateInit[]>([]);
  const incomingCallOfferRef = useRef<RTCSessionDescriptionInit | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const agentTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const userScrolledUpRef = useRef(false);
  const lastScrollTopRef = useRef<number>(0);
  const isUserScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /* ---------------- Scroll to bottom ---------------- */
  const selectedChat = activeChats.find(chat => chat.roomId === selectedChatId);
  
  // Check if user is near bottom of scroll container
  const isNearBottom = useCallback(() => {
    if (!messagesContainerRef.current) return true;
    const container = messagesContainerRef.current;
    const threshold = 200; // pixels from bottom - increased threshold
    const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    return distanceFromBottom < threshold;
  }, []);

  // Handle scroll events to track if user manually scrolled up
  const handleScroll = useCallback(() => {
    if (!messagesContainerRef.current) return;
    
    const container = messagesContainerRef.current;
    const currentScrollTop = container.scrollTop;
    const scrollDifference = Math.abs(currentScrollTop - lastScrollTopRef.current);
    
    // If scroll difference is significant, user is manually scrolling
    if (scrollDifference > 5) {
      isUserScrollingRef.current = true;
      userScrolledUpRef.current = !isNearBottom();
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Reset scrolling flag after user stops scrolling
      scrollTimeoutRef.current = setTimeout(() => {
        isUserScrollingRef.current = false;
      }, 150);
    }
    
    lastScrollTopRef.current = currentScrollTop;
  }, [isNearBottom]);

  // Reset scroll behavior when switching chats
  useEffect(() => {
    userScrolledUpRef.current = false;
    isUserScrollingRef.current = false;
    lastScrollTopRef.current = 0;
    
    // Only scroll to bottom when switching chats (user wants to see new chat)
    setTimeout(() => {
      if (messagesEndRef.current && messagesContainerRef.current) {
        const container = messagesContainerRef.current;
        container.scrollTop = container.scrollHeight;
      }
    }, 100);
  }, [selectedChatId]);

  // Update chat duration timer
  useEffect(() => {
    if (!selectedChat) {
      setChatDuration(0);
      return;
    }

    const interval = setInterval(() => {
      setChatDuration(Date.now() - selectedChat.startedAt);
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedChat]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isAuthenticated) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K: Focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        searchInput?.focus();
      }
      
      // Ctrl/Cmd + /: Toggle quick replies
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setShowQuickReplies(!showQuickReplies);
      }
      
      // Escape: Close modals/panels
      if (e.key === 'Escape') {
        setShowQuickReplies(false);
        setShowChatNotes(false);
        setShowChatStats(false);
        setShowTagSelector(false);
        setSearchQuery("");
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated, showQuickReplies]);

  // Play notification sound
  const playNotificationSound = useCallback(() => {
    if (!soundEnabled) return;
    
    try {
      // Create a simple beep sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.log("Could not play notification sound:", error);
    }
  }, [soundEnabled]);

  // Play sound on new message
  useEffect(() => {
    if (!selectedChat || !socket) return;
    
    const lastMessage = selectedChat.messages[selectedChat.messages.length - 1];
    if (lastMessage && lastMessage.sender === "user" && selectedChatId === selectedChat.roomId) {
      playNotificationSound();
    }
  }, [selectedChat?.messages.length, selectedChatId, playNotificationSound, selectedChat, socket]);

  // WebRTC Configuration
  const rtcConfiguration: RTCConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
    ],
  };

  // Safe addIceCandidate wrapper - queues candidates if remoteDescription not set
  const safeAddIceCandidate = useCallback(async (candidate: RTCIceCandidateInit) => {
    if (!peerConnection) return;
    
    if (peerConnection.remoteDescription) {
      // Remote description is set, add immediately
      try {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        console.log("✅ Added ICE candidate immediately");
      } catch (error) {
        console.error("Error adding ICE candidate:", error);
      }
    } else {
      // Queue candidate for later
      pendingIceCandidatesRef.current.push(candidate);
      console.log("📦 Queued ICE candidate (remoteDescription not set yet)");
    }
  }, [peerConnection]);

  // Flush queued ICE candidates
  const flushIceCandidates = useCallback(async () => {
    if (!peerConnection || pendingIceCandidatesRef.current.length === 0) return;
    
    console.log(`🔄 Flushing ${pendingIceCandidatesRef.current.length} queued ICE candidates`);
    const candidates = [...pendingIceCandidatesRef.current];
    pendingIceCandidatesRef.current = [];
    
    for (const candidate of candidates) {
      try {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        console.log("✅ Flushed queued ICE candidate");
      } catch (error) {
        console.error("Error flushing ICE candidate:", error);
      }
    }
  }, [peerConnection]);

  // Initialize WebRTC Peer Connection
  const createPeerConnection = useCallback(() => {
    const pc = new RTCPeerConnection(rtcConfiguration);

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate && socket && selectedChatId) {
        socket.emit("call_ice_candidate", {
          roomId: selectedChatId,
          candidate: event.candidate,
          senderType: "agent",
        });
      }
    };

    // Handle remote stream (audio-only)
    pc.ontrack = (event) => {
      console.log("📞 Received remote audio track");
      if (event.streams[0]) {
        setRemoteStream(event.streams[0]);
        // Play remote audio using audio element
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = event.streams[0];
          remoteAudioRef.current.play().catch(err => console.error("Error playing remote audio:", err));
        }
      }
    };

    // Don't add local stream tracks here - do it in startCall/answerCall

    return pc;
  }, [socket, selectedChatId]);

  // Start Call (audio-only)
  const startCall = useCallback(async () => {
    if (!selectedChatId || !socket) return;

    // Prevent starting new call if one is in progress
    if (callState !== "idle") {
      console.log("⚠️ Call already in progress, cannot start new call");
      return;
    }

    try {
      console.log("📞 Starting call...");
      // Get user media (audio-only)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
      
      setLocalStream(stream);

      // Create peer connection
      const pc = createPeerConnection();
      
      // Add local stream tracks
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
        console.log("✅ Added local track:", track.kind);
      });
      
      setPeerConnection(pc);

      // Create offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      console.log("✅ Created and set local description (offer)");

      // Send offer (backend will send call_pending first)
      socket.emit("call_offer", {
        roomId: selectedChatId,
        offer: offer,
        callerType: "agent",
      });

      setCallState("ringing");
    } catch (error: any) {
      console.error("Error starting call:", error);
      
      let errorMessage = "Could not access microphone.\n\n";
      
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        errorMessage += "Please grant microphone permissions:\n";
        errorMessage += "1. Click the lock icon (🔒) in your browser's address bar\n";
        errorMessage += "2. Allow Microphone access\n";
        errorMessage += "3. Refresh the page and try again\n\n";
        errorMessage += "Or go to: Settings → Privacy and Security → Site Settings → Microphone";
      } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
        errorMessage += "No microphone found. Please connect a device and try again.";
      } else if (error.name === "NotReadableError" || error.name === "TrackStartError") {
        errorMessage += "Microphone is being used by another application. Please close it and try again.";
      } else {
        errorMessage += `Error: ${error.message || "Unknown error"}`;
      }
      
      alert(errorMessage);
      setCallState("idle");
    }
  }, [selectedChatId, socket, createPeerConnection, callState]);

  // Answer Call (audio-only) - called when agent manually accepts
  const answerCall = useCallback(async () => {
    if (!selectedChatId || !socket || !incomingCallOfferRef.current) {
      console.error("Cannot answer call: missing roomId, socket, or offer");
      return;
    }

    try {
      console.log("📞 Answering call...");
      
      // Send call_accepted event first
      socket.emit("call_accepted", {
        roomId: selectedChatId,
        answererType: "agent",
      });
      console.log("✅ Sent call_accepted event");
      
      // Get user media (audio-only)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
      
      setLocalStream(stream);

      // Create peer connection if not exists
      let pc = peerConnection;
      if (!pc) {
        pc = createPeerConnection();
        setPeerConnection(pc);
      }
      
      // Add local stream tracks
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
        console.log("✅ Added local track:", track.kind);
      });

      // Set remote description
      await pc.setRemoteDescription(new RTCSessionDescription(incomingCallOfferRef.current));
      console.log("✅ Set remote description (offer)");

      // Flush queued ICE candidates after setting remote description
      await flushIceCandidates();

      // Create answer
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      console.log("✅ Created and set local description (answer)");

      // Send answer
      socket.emit("call_answer", {
        roomId: selectedChatId,
        answer: answer,
        answererType: "agent",
      });

      console.log("✅ Call answered, waiting for call_started event...");
      // Don't set state to "connected" yet - wait for call_started event
      incomingCallOfferRef.current = null;
    } catch (error: any) {
      console.error("Error answering call:", error);
      
      let errorMessage = "Could not access microphone.\n\n";
      
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        errorMessage += "Please grant microphone permissions:\n";
        errorMessage += "1. Click the lock icon (🔒) in your browser's address bar\n";
        errorMessage += "2. Allow Microphone access\n";
        errorMessage += "3. Refresh the page and try again";
      } else {
        errorMessage += `Error: ${error.message || "Unknown error"}`;
      }
      
      alert(errorMessage);
      setCallState("idle");
      incomingCallOfferRef.current = null;
      pendingIceCandidatesRef.current = [];
    }
  }, [selectedChatId, socket, peerConnection, createPeerConnection, flushIceCandidates]);

  // Reject Call
  const rejectCall = useCallback(() => {
    if (!socket || !selectedChatId) return;
    
    socket.emit("call_rejected", {
      roomId: selectedChatId,
      rejecterType: "agent",
    });
    console.log("✅ Sent call_rejected event");
    setCallState("idle");
    incomingCallOfferRef.current = null;
    // Clear any pending ICE candidates
    pendingIceCandidatesRef.current = [];
  }, [socket, selectedChatId]);

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

    if (remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = null;
      remoteAudioRef.current.pause();
    }

    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
    }

    if (socket && selectedChatId) {
      socket.emit("call_end", {
        roomId: selectedChatId,
        enderType: "agent",
      });
    }

    setCallState("idle");
    incomingCallOfferRef.current = null;
    // Clear pending ICE candidates
    pendingIceCandidatesRef.current = [];
  }, [localStream, remoteStream, peerConnection, socket, selectedChatId]);

  // Toggle Mute
  const toggleMute = useCallback(() => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = isMuted;
      });
      setIsMuted(!isMuted);
    }
  }, [localStream, isMuted]);


  // Setup call event listeners
  useEffect(() => {
    if (!socket) return;

    socket.on("call_pending", (data: { roomId: string; callerId: string }) => {
      if (data.roomId !== selectedChatId) return;
      console.log("📞 Call pending from:", data.callerId);
      // Set state to pending - will show incoming call UI
      setCallState("pending");
    });

    socket.on("call_offer", async (data: { roomId: string; offer: RTCSessionDescriptionInit; callerId: string }) => {
      if (data.roomId !== selectedChatId) return;
      
      console.log("📞 Incoming call offer from:", data.callerId);
      // Store offer but don't create peer connection yet
      incomingCallOfferRef.current = data.offer;
      setCallState("incoming");
      // Do NOT auto-answer - wait for manual accept
    });

    socket.on("call_accepted", (data: { roomId: string }) => {
      if (data.roomId !== selectedChatId) return;
      console.log("📞 Call accepted by receiver");
      // Agent can prepare for answer if needed
    });

    socket.on("call_rejected", (data: { roomId: string }) => {
      if (data.roomId !== selectedChatId) return;
      console.log("📞 Call rejected by receiver");
      setCallState("idle");
      incomingCallOfferRef.current = null;
    });

    socket.on("call_answer", async (data: { roomId: string; answer: RTCSessionDescriptionInit }) => {
      if (data.roomId !== selectedChatId || !peerConnection) return;
      
      console.log("📞 Call answer received");
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
      console.log("✅ Set remote description (answer)");
      
      // Flush queued ICE candidates after setting remote description
      await flushIceCandidates();
      
      // Wait for call_started event before setting state to "connected"
      // Don't set state here
    });

    socket.on("call_started", (data: { roomId: string }) => {
      if (data.roomId !== selectedChatId) return;
      console.log("📞 Call started - connection established");
      setCallState("connected");
    });

    socket.on("call_ice_candidate", async (data: { roomId: string; candidate: RTCIceCandidateInit }) => {
      if (data.roomId !== selectedChatId) return;
      
      // Use safe wrapper to queue if needed
      await safeAddIceCandidate(data.candidate);
    });

    socket.on("call_end", (data: { roomId: string }) => {
      if (data.roomId !== selectedChatId) return;
      console.log("📞 Call ended");
      endCall();
    });

    return () => {
      socket.off("call_pending");
      socket.off("call_offer");
      socket.off("call_accepted");
      socket.off("call_rejected");
      socket.off("call_answer");
      socket.off("call_started");
      socket.off("call_ice_candidate");
      socket.off("call_end");
    };
  }, [socket, selectedChatId, peerConnection, createPeerConnection, answerCall, endCall, flushIceCandidates, safeAddIceCandidate]);

  // Cleanup on unmount or chat change
  useEffect(() => {
    return () => {
      if (callState !== "idle") {
        endCall();
      }
    };
  }, [selectedChatId]);

  // DISABLED: No auto-scroll on new messages - user must manually scroll
  // This prevents the screen from jumping down when reading older messages
  // useEffect(() => {
  //   // Removed auto-scroll on message updates
  // }, [selectedChat?.messages]);

  // ✅ Mark user messages as read when agent views them
  useEffect(() => {
    if (!selectedChat || !socket) return;

    // Find unread user messages
    const unreadUserMessages = selectedChat.messages.filter(
      (msg) => msg.sender === "user" && msg.readBy && !msg.readBy.agent
    );

    // Mark them as read after a delay
    unreadUserMessages.forEach((msg) => {
      setTimeout(() => {
        if (socket && selectedChat.roomId) {
          socket.emit("message_read", {
            messageId: msg.id,
            roomId: selectedChat.roomId,
          });
        }
      }, 500);
    });
  }, [selectedChat?.messages, socket, selectedChat?.roomId]);

  /* ---------------- Socket.io Connection ---------------- */
  useEffect(() => {
    if (!isAuthenticated) return;

    // Update localStorage when agent ID changes
    if (typeof window !== "undefined") {
      localStorage.setItem(AGENT_AUTH_KEY, JSON.stringify({
        isAuthenticated: true,
        agentId: selectedAgentId,
        timestamp: Date.now(),
      }));
    }

    // Same-origin: Socket.io connects to current host (e.g. https://cird.co.in)
    setIsConnecting(true);
    const socketInstance = io({
      transports: ["websocket", "polling"],
      query: { agentId: selectedAgentId },
    });

    socketInstance.on("connect", () => {
      console.log("✅ Agent socket connected:", socketInstance.id);
      socketInstance.emit("agent_connect", { agentId: selectedAgentId });
      setIsConnecting(false);
    });

    socketInstance.on("agent_connect_error", (data: { message: string }) => {
      console.error("❌ Agent connect error:", data.message);
      setPinError(data.message);
      setIsConnecting(false);
      setIsAuthenticated(false);
      // Disconnect the socket
      socketInstance.disconnect();
      setSocket(null);
      // Clear localStorage
      localStorage.removeItem(AGENT_AUTH_KEY);
    });

    socketInstance.on("agent_status_update", (data: { agents: AgentStatus[] }) => {
      console.log("📊 Agent status update:", data.agents);
      setAgentStatuses(data.agents);
    });

    socketInstance.on("disconnect", () => {
      console.log("❌ Agent socket disconnected");
      setIsConnecting(false);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("❌ Agent socket connection error:", error);
      setIsConnecting(false);
    });

    socketInstance.on("waiting_users", (users: WaitingUser[]) => {
      console.log("👥 Waiting users:", users);
      setWaitingUsers(users);
    });

    // Restore active chats when agent reconnects
    socketInstance.on("active_chats_restored", (data: { chats: Array<{ roomId: string; userId: string; messages: ChatMessage[]; startedAt: number }> }) => {
      console.log("🔄 Restoring active chats:", data.chats);
      if (data.chats && data.chats.length > 0) {
        const restoredChats: ActiveChat[] = data.chats.map(chat => ({
          roomId: chat.roomId,
          userId: chat.userId,
          messages: chat.messages,
          startedAt: chat.startedAt,
        }));
        
        setActiveChats(restoredChats);
        
        // Select the first chat if no chat is selected
        if (!selectedChatId && restoredChats.length > 0) {
          setSelectedChatId(restoredChats[0].roomId);
        }
        
        console.log(`✅ Restored ${restoredChats.length} active chat(s)`);
      }
    });

    socketInstance.on("new_user_waiting", (data: { userId: string; waitingSince: number }) => {
      console.log("🆕 New user waiting:", data);
      // Agents can handle multiple chats, so always add to waiting list
      setWaitingUsers((prev) => {
        if (prev.some((u) => u.userId === data.userId)) return prev;
        return [...prev, { userId: data.userId, waitingSince: data.waitingSince }];
      });
    });

    socketInstance.on("user_left_queue", (data: { userId: string }) => {
      console.log("👋 User left queue:", data.userId);
      setWaitingUsers((prev) => prev.filter((u) => u.userId !== data.userId));
    });

    socketInstance.on("user_taken", (data: { userId: string }) => {
      console.log("✅ User taken by another agent:", data.userId);
      setWaitingUsers((prev) => prev.filter((u) => u.userId !== data.userId));
    });

    socketInstance.on("chat_started", (data: { roomId: string; userId: string; autoAssigned?: boolean }) => {
      console.log("💬 Chat started:", data);
      const newChat: ActiveChat = {
        userId: data.userId,
        roomId: data.roomId,
        messages: [
          {
            id: uid("system_"),
            sender: "agent",
            text: `Chat started with user ${data.userId.slice(0, 12)}...${data.autoAssigned ? " (Auto-assigned)" : ""}`,
            timestamp: Date.now(),
          },
        ],
        startedAt: Date.now(),
      };
      
      setActiveChats((prev) => {
        // Check if chat already exists
        if (prev.some(chat => chat.roomId === data.roomId)) {
          return prev;
        }
        return [...prev, newChat];
      });
      
      // Select the new chat
      setSelectedChatId(data.roomId);
      
      // Reset scroll state for new chat (will be handled by selectedChatId useEffect)
      userScrolledUpRef.current = false;
      isUserScrollingRef.current = false;
      
      setWaitingUsers((prev) => prev.filter((u) => u.userId !== data.userId));
      
      // Update agent status locally
      setAgentStatuses(prev => prev.map(a => 
        a.agentId === selectedAgentId ? { ...a, activeChatsCount: (a.activeChatsCount || 0) + 1, isBusy: true } : a
      ));
    });

    socketInstance.on("new_message", (data: { id?: string; sender: string; text: string; timestamp: number; roomId?: string; readBy?: { user: boolean; agent: boolean } }) => {
      // Handle both user and agent messages
      if (data.sender === "user" || data.sender === "agent") {
        if (!data.roomId) {
          console.error("⚠️ No roomId in new_message event");
          return;
        }
        
        setActiveChats((prev) => {
          const chatIndex = prev.findIndex(chat => chat.roomId === data.roomId);
          
          if (chatIndex === -1) {
            // Chat doesn't exist, might be a new auto-assigned chat
            console.log(`📨 New chat detected for room ${data.roomId}`);
            return prev; // Will be created by chat_started event
          }
          
          const chat = prev[chatIndex];
          
          // Check if message already exists (prevent duplicates)
          const messageExists = chat.messages.some(
            (msg) => msg.text === data.text && Math.abs(msg.timestamp - data.timestamp) < 1000
          );
          if (messageExists) {
            console.log("⚠️ Duplicate message detected, skipping");
            return prev;
          }
          
          console.log(`📨 Received message from ${data.sender} in room ${data.roomId}`);
          
          // Mark user messages as read by agent when received (only if chat is selected)
          const readBy = data.readBy || { user: data.sender === "user", agent: data.sender === "agent" };
          if (data.sender === "user" && selectedChatId === data.roomId) {
            readBy.agent = true; // Agent reads user messages when viewing
            // Notify server
            if (socketInstance) {
              socketInstance.emit("message_read", {
                messageId: data.id || uid("msg_"),
                roomId: data.roomId,
              });
            }
          }
          
          const updated = [...prev];
          updated[chatIndex] = {
            ...chat,
            messages: [
              ...chat.messages,
              {
                id: data.id || uid("msg_"),
                sender: data.sender as "agent" | "user",
                text: data.text,
                timestamp: data.timestamp,
                readBy: readBy,
              },
            ],
          };
          
          return updated;
        });
      }
    });

    socketInstance.on("message_read_update", (data: { messageId: string; readBy: { user: boolean; agent: boolean }; roomId?: string }) => {
      if (!data.roomId) return;
      
      console.log("✅ Message read update received:", data);
      
      setActiveChats((prev) => {
        const chatIndex = prev.findIndex(chat => chat.roomId === data.roomId);
        if (chatIndex === -1) return prev;
        
        const updated = [...prev];
        updated[chatIndex] = {
          ...updated[chatIndex],
          messages: updated[chatIndex].messages.map((msg) =>
            msg.id === data.messageId
              ? { ...msg, readBy: data.readBy }
              : msg
          ),
        };
        return updated;
      });
    });

    socketInstance.on("user_typing", (data: { userId: string; roomId?: string }) => {
      // Only show typing indicator for the selected chat
      if (selectedChatId && data.roomId === selectedChatId) {
        const selectedChat = activeChats.find(chat => chat.roomId === selectedChatId);
        if (selectedChat && data.userId === selectedChat.userId) {
          setUserTyping(true);
          if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
          }
          typingTimeoutRef.current = setTimeout(() => {
            setUserTyping(false);
          }, 3000);
        }
      }
    });

    socketInstance.on("user_disconnected", (data: { roomId: string; userId: string }) => {
      console.log("👋 User disconnected from chat:", data.roomId);
      
      // Remove the chat completely from active chats
      setActiveChats((prev) => {
        const filtered = prev.filter(chat => chat.roomId !== data.roomId);
        
        // If this was the selected chat, select another one or clear selection
        if (selectedChatId === data.roomId) {
          if (filtered.length > 0) {
            setSelectedChatId(filtered[0].roomId);
          } else {
            setSelectedChatId(null);
          }
        }
        
        return filtered;
      });
      
      // Clear typing indicator
      setUserTyping(false);
      
      // Stop duration timer (will be handled by useEffect when selectedChat changes)
      setChatDuration(0);
      
      // Update agent status locally
      setAgentStatuses(prev => prev.map(a => 
        a.agentId === selectedAgentId 
          ? { ...a, activeChatsCount: Math.max(0, (a.activeChatsCount || 0) - 1), isBusy: (a.activeChatsCount || 0) > 1 } 
          : a
      ));
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
      setSocket(null);
    };
  }, [isAuthenticated, selectedAgentId]); // Reconnect when agent ID changes

  /* ---------------- PIN Authentication ---------------- */
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === AGENT_PIN) {
      setIsAuthenticated(true);
      setPinError("");
      // Save authentication state to localStorage
      localStorage.setItem(AGENT_AUTH_KEY, JSON.stringify({
        isAuthenticated: true,
        agentId: selectedAgentId,
        timestamp: Date.now(),
      }));
    } else {
      setPinError("Invalid PIN. Please try again.");
      setPin("");
    }
  };

  /* ---------------- Join User Chat ---------------- */
  const joinUserChat = useCallback(
    (userId: string) => {
      if (!socket) return;
      socket.emit("agent_join", { userId });
    },
    [socket]
  );

  /* ---------------- Handle Agent Typing ---------------- */
  const handleAgentTyping = useCallback(() => {
    if (!socket || !selectedChatId) return;

    // Clear any existing stop typing timeout
    if (agentTypingTimeoutRef.current) {
      clearTimeout(agentTypingTimeoutRef.current);
    }

    // Send typing indicator
    socket.emit("agent_typing", { roomId: selectedChatId });

    // Set timeout to send stop typing after 2 seconds of inactivity
    agentTypingTimeoutRef.current = setTimeout(() => {
      if (socket && selectedChatId) {
        socket.emit("agent_stopped_typing", { roomId: selectedChatId });
      }
      agentTypingTimeoutRef.current = null;
    }, 2000);
  }, [socket, selectedChatId]);

  /* ---------------- Send Message ---------------- */
  const sendMessage = useCallback(() => {
    if (!socket || !selectedChatId || !messageInput.trim()) return;

    const messageText = messageInput.trim();
    const timestamp = Date.now();
    const messageId = uid("msg_");

    // Clear typing indicator timeout
    if (agentTypingTimeoutRef.current) {
      clearTimeout(agentTypingTimeoutRef.current);
      agentTypingTimeoutRef.current = null;
    }

    // Send stop typing indicator
    socket.emit("agent_stopped_typing", { roomId: selectedChatId });

    // Send via Socket.io first (server will broadcast to room)
    socket.emit("agent_message", {
      message: messageText,
      roomId: selectedChatId,
    });

    // Add to local state (will also be received via new_message event, but adding immediately for better UX)
    setActiveChats((prev) => {
      const chatIndex = prev.findIndex(chat => chat.roomId === selectedChatId);
      if (chatIndex === -1) return prev;
      
      const updated = [...prev];
      updated[chatIndex] = {
        ...updated[chatIndex],
        messages: [
          ...updated[chatIndex].messages,
          {
            id: messageId,
            sender: "agent",
            text: messageText,
            timestamp: timestamp,
            readBy: { user: false, agent: true },
          },
        ],
      };
      return updated;
    });

    // Only scroll to bottom if user is already near bottom when sending message
    setTimeout(() => {
      if (messagesEndRef.current && messagesContainerRef.current && !userScrolledUpRef.current) {
        const container = messagesContainerRef.current;
        const nearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 200;
        if (nearBottom) {
          container.scrollTop = container.scrollHeight;
        }
      }
    }, 100);
    setMessageInput("");
  }, [socket, selectedChatId, messageInput]);

  /* ---------------- Copy Message ---------------- */
  const copyMessage = useCallback((text: string, messageId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(messageId);
    setTimeout(() => setCopiedMessageId(null), 2000);
  }, []);

  /* ---------------- Export Chat ---------------- */
  const exportChat = useCallback(() => {
    if (!selectedChat) return;

    const chatText = selectedChat.messages
      .map((msg) => {
        const date = new Date(msg.timestamp);
        const sender = msg.sender === "agent" ? "Margadarshak" : "User";
        return `[${date.toLocaleString()}] ${sender}: ${msg.text}`;
      })
      .join("\n\n");

    const blob = new Blob([chatText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat_${selectedChat.userId.slice(0, 8)}_${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [selectedChat]);

  /* ---------------- Quick Reply ---------------- */
  const insertQuickReply = useCallback((template: string) => {
    setMessageInput(template);
    setShowQuickReplies(false);
    inputRef.current?.focus();
  }, []);

  /* ---------------- Save Chat Notes ---------------- */
  const saveChatNotes = useCallback((notes: string) => {
    if (!selectedChat) return;
    setActiveChats((prev) =>
      prev.map((chat) =>
        chat.roomId === selectedChat.roomId ? { ...chat, notes } : chat
      )
    );
    // Save to localStorage
    const notesKey = `chat_notes_${selectedChat.roomId}`;
    localStorage.setItem(notesKey, notes);
    setEditingNotes(false);
  }, [selectedChat]);

  /* ---------------- Save Chat Tag ---------------- */
  const saveChatTag = useCallback((tag: string) => {
    if (!selectedChat) return;
    setChatTags((prev) => {
      const updated = { ...prev, [selectedChat.roomId]: tag };
      localStorage.setItem('chat_tags', JSON.stringify(updated));
      return updated;
    });
    setShowTagSelector(false);
  }, [selectedChat]);

  /* ---------------- Load Chat Tags ---------------- */
  useEffect(() => {
    const savedTags = localStorage.getItem('chat_tags');
    if (savedTags) {
      try {
        setChatTags(JSON.parse(savedTags));
      } catch (e) {
        console.error("Error loading chat tags:", e);
      }
    }
  }, []);

  /* ---------------- Format Message Text ---------------- */
  const formatMessageText = (text: string) => {
    // Simple markdown-like formatting
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-slate-200 px-1.5 py-0.5 rounded text-sm text-[#1A237E]">$1</code>');
    
    return formatted;
  };

  /* ---------------- Load Chat Notes ---------------- */
  useEffect(() => {
    if (selectedChat) {
      const notesKey = `chat_notes_${selectedChat.roomId}`;
      const savedNotes = localStorage.getItem(notesKey);
      if (savedNotes && !selectedChat.notes) {
        setActiveChats((prev) =>
          prev.map((chat) =>
            chat.roomId === selectedChat.roomId ? { ...chat, notes: savedNotes } : chat
          )
        );
      }
    }
  }, [selectedChat]);

  /* ---------------- Chat Statistics ---------------- */
  const getChatStats = useCallback(() => {
    if (!selectedChat) return null;
    
    const agentMessages = selectedChat.messages.filter(m => m.sender === "agent");
    const userMessages = selectedChat.messages.filter(m => m.sender === "user");
    const totalWords = selectedChat.messages.reduce((acc, msg) => {
      return acc + msg.text.split(/\s+/).length;
    }, 0);
    const avgResponseTime = selectedChat.messages.length > 0
      ? (Date.now() - selectedChat.startedAt) / selectedChat.messages.length
      : 0;

    return {
      totalMessages: selectedChat.messages.length,
      agentMessages: agentMessages.length,
      userMessages: userMessages.length,
      totalWords,
      avgResponseTime: Math.round(avgResponseTime / 1000), // in seconds
      duration: Math.round((Date.now() - selectedChat.startedAt) / 1000), // in seconds
    };
  }, [selectedChat]);

  /* ---------------- Filter Messages by Search ---------------- */
  const filteredMessages = useMemo(() => {
    if (!selectedChat || !searchQuery.trim()) {
      return selectedChat?.messages || [];
    }
    const query = searchQuery.toLowerCase();
    return selectedChat.messages.filter((msg) =>
      msg.text.toLowerCase().includes(query)
    );
  }, [selectedChat, searchQuery]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  /* ---------------- End Chat ---------------- */
  const endChat = useCallback((roomId: string) => {
    if (!socket || !roomId) return;

    socket.emit("agent_disconnect_chat", { roomId });
    
    // Remove chat from active chats
    setActiveChats((prev) => prev.filter(chat => chat.roomId !== roomId));
    
    // If this was the selected chat, clear selection
    if (selectedChatId === roomId) {
      setSelectedChatId(null);
      setUserTyping(false);
      
      // Select another chat if available
      setActiveChats((prev) => {
        if (prev.length > 0) {
          setSelectedChatId(prev[0].roomId);
        }
        return prev;
      });
    }
    
    // Update agent status locally
    setAgentStatuses(prev => prev.map(a => 
      a.agentId === selectedAgentId ? { ...a, activeChatsCount: Math.max(0, (a.activeChatsCount || 0) - 1), isBusy: (a.activeChatsCount || 0) > 1 } : a
    ));
  }, [socket, selectedChatId, selectedAgentId]);

  /* ---------------- Logout ---------------- */
  const handleLogout = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
    setIsAuthenticated(false);
    setActiveChats([]);
    setSelectedChatId(null);
    setWaitingUsers([]);
    setPin("");
    // Clear authentication from localStorage
    localStorage.removeItem(AGENT_AUTH_KEY);
  };

  /* ---------------- Render ---------------- */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A237E] to-[#0D1542] flex items-center justify-center p-4 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 w-full max-w-md"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#FF9800] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#1A237E] mb-2">Margadarshak Dashboard</h1>
            <p className="text-[#37474F]">Enter your PIN to access</p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label htmlFor="agentId" className="block text-sm font-semibold text-[#1A237E] mb-2">
                Margadarshak ID
              </label>
              <select
                id="agentId"
                value={selectedAgentId}
                onChange={(e) => setSelectedAgentId(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1A237E]/20 focus:border-[#1A237E] outline-none transition-all bg-white text-[#37474F]"
              >
                <option value="margadarshak1">Margadarshak 1</option>
                <option value="margadarshak2">Margadarshak 2</option>
                <option value="margadarshak3">Margadarshak 3</option>
                <option value="margadarshak4">Margadarshak 4</option>
              </select>
            </div>
            <div>
              <label htmlFor="pin" className="block text-sm font-semibold text-[#1A237E] mb-2">
                PIN
              </label>
              <input
                id="pin"
                type="password"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setPinError("");
                }}
                placeholder="Enter PIN"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1A237E]/20 focus:border-[#1A237E] outline-none transition-all text-[#37474F]"
                autoFocus
              />
              {pinError && (
                <p className="mt-2 text-sm text-red-600">{pinError}</p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#FF9800] text-white py-3 rounded-xl font-semibold hover:bg-[#F57C00] transition-colors shadow-sm"
            >
              Login
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28">
      {/* Header - CIRD theme */}
      <div className="bg-gradient-to-r from-[#1A237E] to-[#0D1542] text-white shadow-md border-b border-[#1A237E]/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF9800] rounded-full flex items-center justify-center shadow-sm">
              <Users size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Margadarshak Dashboard</h1>
              <p className="text-sm text-white/80">
                {isConnecting ? "Connecting..." : `${selectedAgentId.toUpperCase()} - Live Support`}
              </p>
              {agentStatuses.length > 0 && (
                <div className="flex gap-2 mt-1 flex-wrap">
                  {agentStatuses.map((status) => (
                    <span
                      key={status.agentId}
                      className={`text-xs px-2 py-0.5 rounded ${
                        status.agentId === selectedAgentId
                          ? status.activeChatsCount && status.activeChatsCount > 0
                            ? "bg-[#FF9800]"
                            : status.isConnected
                            ? "bg-emerald-500"
                            : "bg-slate-400"
                          : status.isConnected
                          ? status.activeChatsCount && status.activeChatsCount > 0
                            ? "bg-[#FF9800]/50"
                            : "bg-emerald-500/50"
                          : "bg-white/20"
                      }`}
                    >
                      {status.agentId}: {
                        !status.isConnected 
                          ? "Free" 
                          : status.activeChatsCount && status.activeChatsCount > 0
                          ? `Live (${status.activeChatsCount})`
                          : "Live"
                      }
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </motion.button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Waiting Users Panel - CIRD theme */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 h-[calc(100vh-120px)] flex flex-col">
            <h2 className="text-lg font-bold text-[#1A237E] mb-4 flex items-center gap-2">
              <Clock size={20} className="text-[#FF9800]" />
              Waiting Users ({waitingUsers.length})
            </h2>

            <div className="flex-1 overflow-y-auto space-y-2">
              {waitingUsers.length === 0 ? (
                <div className="text-center text-[#37474F] py-8">
                  <MessageCircle size={48} className="mx-auto mb-2 text-slate-300" />
                  <p className="text-sm font-medium">No users waiting</p>
                </div>
              ) : (
                waitingUsers.map((user) => (
                  <motion.div
                    key={user.userId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-3 hover:border-[#1A237E]/20 hover:bg-slate-50/80 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <UserIcon size={16} className="text-[#1A237E]" />
                        <span className="text-sm font-medium text-[#37474F]">
                          {user.userId.slice(0, 12)}...
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">
                        {formatWaitingTime(user.waitingSince)}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => joinUserChat(user.userId)}
                      disabled={false}
                      className="w-full bg-[#FF9800] text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-[#F57C00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      Join Chat
                    </motion.button>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Active Chat Panel - premium chat box */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-[calc(100vh-120px)] flex flex-col overflow-hidden">
            {activeChats.length > 0 ? (
              <>
                {/* Chat Tabs - CIRD */}
                <div className="border-b border-slate-200 flex overflow-x-auto bg-slate-50/50">
                  {activeChats.map((chat) => (
                    <button
                      key={chat.roomId}
                      onClick={() => {
                        setSelectedChatId(chat.roomId);
                        setSearchQuery(""); // Clear search when switching chats
                      }}
                      className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap relative ${
                        selectedChatId === chat.roomId
                          ? "border-[#1A237E] text-[#1A237E] bg-white"
                          : "border-transparent text-[#37474F] hover:text-[#1A237E] hover:bg-slate-100/80"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <UserIcon size={14} />
                        <span>{chat.userId.slice(0, 10)}...</span>
                        {(() => {
                          const unreadCount = chat.messages.filter(
                            msg => msg.sender === "user" && msg.readBy && !msg.readBy.agent
                          ).length;
                          return unreadCount > 0 ? (
                            <span className="bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5 font-semibold">
                              {unreadCount}
                            </span>
                          ) : null;
                        })()}
                        {chat.notes && (
                          <span title="Has notes">
                            <FileText size={12} className="text-yellow-600" />
                          </span>
                        )}
                        {chatTags[chat.roomId] && (
                          <span className="px-1.5 py-0.5 bg-[#FF9800]/10 text-[#1A237E] text-[10px] font-medium rounded border border-[#FF9800]/30">
                            {chatTags[chat.roomId]}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Selected Chat Content */}
                {selectedChat && (
                  <>
                    {/* Chat Header - premium */}
                    <div className="border-b border-slate-200 bg-white px-5 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#1A237E] rounded-full flex items-center justify-center shadow-sm">
                          <UserIcon size={20} className="text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-[#1A237E]">
                              Chat with {selectedChat.userId.slice(0, 12)}...
                            </h3>
                            {chatTags[selectedChat.roomId] && (
                              <span className="px-2 py-0.5 bg-[#FF9800]/10 text-[#1A237E] text-xs font-medium rounded-full border border-[#FF9800]/30">
                                {chatTags[selectedChat.roomId]}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-[#37474F]">
                            <span>Started {formatTime(selectedChat.startedAt, timeFormat24)}</span>
                            <span>•</span>
                            <span className="font-semibold text-[#1A237E]">
                              Duration: {formatDuration(selectedChat.startedAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={exportChat}
                          className="px-3 py-2 bg-slate-100 text-[#1A237E] rounded-xl hover:bg-slate-200 transition-colors text-sm font-medium flex items-center gap-1 border border-slate-200"
                          title="Export Chat"
                        >
                          <Download size={14} />
                          Export
                        </motion.button>
                        {/* Call Button */}
                        {callState === "idle" && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={startCall}
                            className="px-3 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors text-sm font-medium flex items-center gap-1 shadow-sm"
                            title="Start Call"
                          >
                            <Phone size={14} />
                            Call
                          </motion.button>
                        )}
                        {callState !== "idle" && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={endCall}
                            className="px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors text-sm font-medium flex items-center gap-1"
                            title="End Call"
                          >
                            <PhoneOff size={14} />
                            End Call
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => endChat(selectedChat.roomId)}
                          className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors text-sm font-medium"
                        >
                          End Chat
                        </motion.button>
                      </div>
                    </div>

                    {/* Incoming Call UI */}
                    <AnimatePresence>
                      {(callState === "pending" || callState === "incoming") && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="border-b border-slate-200 bg-gradient-to-r from-emerald-500 to-emerald-600 p-4"
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
                            <p className="text-sm text-white/90 mb-4">User is calling you...</p>
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
                                className="px-6 py-3 bg-white text-emerald-600 rounded-full hover:bg-slate-100 transition-colors flex items-center gap-2 font-semibold"
                              >
                                <Phone size={20} />
                                Answer
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Call UI (Audio-only) - Connected or Ringing */}
                    <AnimatePresence>
                      {(callState === "ringing" || callState === "connected") && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-b border-slate-200 bg-gradient-to-r from-emerald-500 to-emerald-600 overflow-hidden"
                        >
                          {/* Hidden audio element for remote audio */}
                          <audio ref={remoteAudioRef} autoPlay playsInline />
                          
                          <div className="p-6 text-center text-white">
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                            >
                              <Phone size={40} className="text-white" />
                            </motion.div>
                            <h3 className="text-lg font-semibold mb-2">
                              {callState === "ringing" ? "Calling..." : "Call Connected"}
                            </h3>
                            <p className="text-sm text-white/90 mb-6">
                              {callState === "connected" ? "Voice call in progress" : "Waiting for answer..."}
                            </p>
                            
                            {/* Call Controls */}
                            {callState === "connected" && (
                              <div className="flex items-center justify-center gap-4">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={toggleMute}
                                  className={`p-4 rounded-full ${
                                    isMuted ? "bg-red-500 text-white" : "bg-white/20 text-white"
                                  }`}
                                  title={isMuted ? "Unmute" : "Mute"}
                                >
                                  {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                                </motion.button>
                                
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={endCall}
                                  className="p-4 rounded-full bg-red-500 text-white"
                                  title="End Call"
                                >
                                  <PhoneOff size={24} />
                                </motion.button>
                              </div>
                            )}
                            
                            {/* End call button for ringing state */}
                            {callState === "ringing" && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={endCall}
                                className="p-4 rounded-full bg-red-500 text-white"
                                title="Cancel Call"
                              >
                                <PhoneOff size={24} />
                              </motion.button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Messages - premium chat bubble area */}
                    <div 
                      ref={messagesContainerRef}
                      onScroll={handleScroll}
                      className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/80"
                    >
                      {(searchQuery ? filteredMessages : selectedChat.messages).map((msg, index) => {
                        const allMessages = selectedChat.messages;
                        const actualIndex = allMessages.findIndex(m => m.id === msg.id);
                        const prevMsg = actualIndex > 0 ? allMessages[actualIndex - 1] : null;
                        const showDateSeparator = !prevMsg || 
                          formatDate(prevMsg.timestamp) !== formatDate(msg.timestamp);
                        
                        return (
                          <React.Fragment key={msg.id}>
                            {showDateSeparator && (
                              <div className="flex items-center justify-center my-4">
                                <div className="bg-slate-200/80 text-[#37474F] text-xs font-medium px-3 py-1.5 rounded-full">
                                  {formatDate(msg.timestamp)}
                                </div>
                              </div>
                            )}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`flex ${msg.sender === "agent" ? "justify-end" : "justify-start"} group`}
                            >
                              <div
                                className={`max-w-[75%] px-4 py-3 rounded-2xl relative shadow-sm ${
                                  msg.sender === "agent"
                                    ? "bg-[#1A237E] text-white rounded-br-md"
                                    : "bg-white border border-slate-200 text-[#37474F] rounded-bl-md"
                                }`}
                              >
                        <p 
                          className="text-sm whitespace-pre-wrap leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: formatMessageText(msg.text) }}
                        />
                        <div className="flex items-center justify-between mt-1 gap-2">
                          <p className={`text-xs opacity-70 ${msg.sender === "agent" ? "text-white/70" : "text-slate-500"}`}>
                            {formatTime(msg.timestamp, timeFormat24)}
                          </p>
                                  <div className="flex items-center gap-1">
                                    {/* Read Receipt Ticks - Only on AGENT's sent messages */}
                                    {msg.sender === "agent" && (
                                      <div className="flex items-center">
                                        <svg
                                          width="16"
                                          height="16"
                                          viewBox="0 0 16 15"
                                          fill="none"
                                          className={msg.readBy?.user ? "text-emerald-300" : "text-white/40"}
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
                                        msg.sender === "agent" ? "hover:bg-white/20" : "hover:bg-slate-100"
                                      }`}
                                      onClick={() => copyMessage(msg.text, msg.id)}
                                      title="Copy message"
                                    >
                                      {copiedMessageId === msg.id ? (
                                        <Check size={12} className={msg.sender === "agent" ? "text-green-300" : "text-green-600"} />
                                      ) : (
                                        <Copy size={12} className={msg.sender === "agent" ? "text-white/70" : "text-slate-500"} />
                                      )}
                                    </motion.button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </React.Fragment>
                        );
                      })}

                  {/* User Typing Indicator */}
                                  {userTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                        <div className="flex items-center gap-1.5">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-[#1A237E]/50 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-[#1A237E]/50 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-[#1A237E]/50 rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input - premium */}
                <div className="border-t border-slate-200 bg-white p-4">
                  {/* Quick Replies */}
                  <AnimatePresence>
                    {showQuickReplies && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mb-3 overflow-hidden"
                      >
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-[#1A237E] uppercase tracking-wide flex items-center gap-1">
                              <Zap size={12} className="text-[#FF9800]" />
                              Quick Replies
                            </span>
                            <button
                              onClick={() => setShowQuickReplies(false)}
                              className="text-slate-400 hover:text-[#1A237E] p-1 rounded-lg hover:bg-slate-200/50"
                            >
                              <X size={14} />
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {QUICK_REPLIES.map((reply, idx) => (
                              <motion.button
                                key={idx}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => insertQuickReply(reply)}
                                className="px-3 py-2 bg-white border border-slate-200 text-sm text-[#37474F] rounded-xl hover:border-[#1A237E]/30 hover:bg-[#1A237E]/5 hover:text-[#1A237E] transition-colors font-medium"
                              >
                                {reply}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <input
                        ref={inputRef}
                        value={messageInput}
                        onChange={(e) => {
                          setMessageInput(e.target.value);
                          if (e.target.value.trim()) {
                            handleAgentTyping();
                          } else {
                            if (agentTypingTimeoutRef.current) {
                              clearTimeout(agentTypingTimeoutRef.current);
                              agentTypingTimeoutRef.current = null;
                            }
                            if (socket && selectedChatId) {
                              socket.emit("agent_stopped_typing", { roomId: selectedChatId });
                            }
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                        placeholder="Type your message..."
                        disabled={!selectedChat}
                        maxLength={2000}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1A237E]/20 focus:border-[#1A237E] outline-none transition-all text-[#37474F] disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      {messageInput.length > 0 && (
                        <div className="absolute bottom-2 right-3 text-xs text-slate-400">
                          {messageInput.length}/2000
                        </div>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowQuickReplies(!showQuickReplies)}
                      className={`p-3 rounded-xl transition-colors ${
                        showQuickReplies
                          ? "bg-[#1A237E] text-white"
                          : "bg-slate-100 text-[#37474F] hover:bg-slate-200 border border-slate-200"
                      }`}
                      title="Quick Replies"
                    >
                      <Zap size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={sendMessage}
                      disabled={!selectedChat || !messageInput.trim()}
                      className="px-5 py-3 bg-[#FF9800] text-white rounded-xl hover:bg-[#F57C00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-sm"
                    >
                      <Send size={18} />
                    </motion.button>
                  </div>
                </div>
                  </>
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center px-6">
                <div>
                  <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle size={40} className="text-[#1A237E]/40" />
                  </div>
                  <p className="text-lg font-semibold text-[#1A237E]">No active chat</p>
                  <p className="text-sm text-[#37474F] mt-2 max-w-xs mx-auto">
                    Select a user from the waiting list to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

