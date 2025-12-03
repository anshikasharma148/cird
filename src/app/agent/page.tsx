"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
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
};

type ActiveChat = {
  userId: string;
  roomId: string;
  messages: ChatMessage[];
  startedAt: number;
};

/* --------------------- Constants ------------------------ */
const AGENT_PIN = process.env.NEXT_PUBLIC_AGENT_PIN || "1234"; // Default PIN for development

/* --------------------- Helpers ------------------------ */
const formatTime = (ts: number) =>
  new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

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
          return authData.agentId || "agent1";
        } catch {
          return "agent1";
        }
      }
    }
    return "agent1";
  });
  const [socket, setSocket] = useState<Socket | null>(null);
  const [agentStatuses, setAgentStatuses] = useState<AgentStatus[]>([]);
  const [waitingUsers, setWaitingUsers] = useState<WaitingUser[]>([]);
  const [activeChats, setActiveChats] = useState<ActiveChat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [userTyping, setUserTyping] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const agentTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shouldAutoScrollRef = useRef(true);

  /* ---------------- Scroll to bottom ---------------- */
  const selectedChat = activeChats.find(chat => chat.roomId === selectedChatId);
  
  // Check if user is near bottom of scroll container
  const isNearBottom = () => {
    if (!messagesContainerRef.current) return true;
    const container = messagesContainerRef.current;
    const threshold = 100; // pixels from bottom
    return container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
  };

  // Handle scroll events to track if user manually scrolled up
  const handleScroll = () => {
    shouldAutoScrollRef.current = isNearBottom();
  };

  // Reset scroll behavior when switching chats
  useEffect(() => {
    shouldAutoScrollRef.current = true;
    // Small delay to ensure DOM is updated
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [selectedChatId]);

  useEffect(() => {
    // Only auto-scroll if user is near bottom or if it's a new message from the agent
    if (shouldAutoScrollRef.current || isNearBottom()) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      shouldAutoScrollRef.current = true;
    }
  }, [selectedChat?.messages, userTyping]);

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

    const baseURL =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      (typeof window !== "undefined" && window.location.hostname.includes("cird.co.in")
        ? "https://cird.onrender.com"
        : "http://localhost:5000");

    // Update localStorage when agent ID changes
    if (typeof window !== "undefined") {
      localStorage.setItem(AGENT_AUTH_KEY, JSON.stringify({
        isAuthenticated: true,
        agentId: selectedAgentId,
        timestamp: Date.now(),
      }));
    }
    
    setIsConnecting(true);
    const socketInstance = io(baseURL, {
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
      
      // Force auto-scroll when a new chat starts
      shouldAutoScrollRef.current = true;
      
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
      setActiveChats((prev) => {
        const chatIndex = prev.findIndex(chat => chat.roomId === data.roomId);
        if (chatIndex === -1) return prev;
        
        const updated = [...prev];
        updated[chatIndex] = {
          ...updated[chatIndex],
          messages: [
            ...updated[chatIndex].messages,
            {
              id: uid("system_"),
              sender: "user",
              text: "User has disconnected.",
              timestamp: Date.now(),
            },
          ],
        };
        return updated;
      });
      
      // If this was the selected chat, clear selection
      if (selectedChatId === data.roomId) {
        setSelectedChatId(null);
        setUserTyping(false);
      }
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

    // Force auto-scroll when agent sends a message
    shouldAutoScrollRef.current = true;
    setMessageInput("");
  }, [socket, selectedChatId, messageInput]);

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
      <div className="min-h-screen bg-gradient-to-br from-[#2d545e] to-[#12343b] flex items-center justify-center p-4 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#2d545e] rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#2d545e] mb-2">Agent Dashboard</h1>
            <p className="text-gray-600">Enter your PIN to access</p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label htmlFor="agentId" className="block text-sm font-medium text-gray-700 mb-2">
                Agent ID
              </label>
              <select
                id="agentId"
                value={selectedAgentId}
                onChange={(e) => setSelectedAgentId(e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#c89666] rounded-xl focus:ring-2 focus:ring-[#2d545e] focus:border-[#2d545e] outline-none transition-all bg-white"
              >
                <option value="agent1">Agent 1</option>
                <option value="agent2">Agent 2</option>
                <option value="agent3">Agent 3</option>
                <option value="agent4">Agent 4</option>
              </select>
            </div>
            <div>
              <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-4 py-3 border-2 border-[#c89666] rounded-xl focus:ring-2 focus:ring-[#2d545e] focus:border-[#2d545e] outline-none transition-all"
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
              className="w-full bg-[#2d545e] text-white py-3 rounded-xl font-medium hover:bg-[#12343b] transition-colors"
            >
              Login
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2d545e] to-[#12343b] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e1b382] rounded-full flex items-center justify-center">
              <Users size={20} className="text-[#2d545e]" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Agent Dashboard</h1>
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
                            ? "bg-orange-500"
                            : status.isConnected
                            ? "bg-green-500"
                            : "bg-gray-400"
                          : status.isConnected
                          ? status.activeChatsCount && status.activeChatsCount > 0
                            ? "bg-orange-500/50"
                            : "bg-green-500/50"
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
        {/* Waiting Users Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-4 h-[calc(100vh-120px)] flex flex-col">
            <h2 className="text-lg font-semibold text-[#2d545e] mb-4 flex items-center gap-2">
              <Clock size={20} />
              Waiting Users ({waitingUsers.length})
            </h2>

            <div className="flex-1 overflow-y-auto space-y-2">
              {waitingUsers.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <MessageCircle size={48} className="mx-auto mb-2 opacity-50" />
                  <p>No users waiting</p>
                </div>
              ) : (
                waitingUsers.map((user) => (
                  <motion.div
                    key={user.userId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <UserIcon size={16} className="text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">
                          {user.userId.slice(0, 12)}...
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatWaitingTime(user.waitingSince)}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => joinUserChat(user.userId)}
                      disabled={false}
                      className="w-full bg-[#2d545e] text-white text-sm py-2 rounded-lg hover:bg-[#12343b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Join Chat
                    </motion.button>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Active Chat Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md h-[calc(100vh-120px)] flex flex-col">
            {activeChats.length > 0 ? (
              <>
                {/* Chat Tabs */}
                <div className="border-b border-gray-200 flex overflow-x-auto">
                  {activeChats.map((chat) => (
                    <button
                      key={chat.roomId}
                      onClick={() => setSelectedChatId(chat.roomId)}
                      className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        selectedChatId === chat.roomId
                          ? "border-[#2d545e] text-[#2d545e] bg-[#e1b382]/10"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
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
                            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {unreadCount}
                            </span>
                          ) : null;
                        })()}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Selected Chat Content */}
                {selectedChat && (
                  <>
                    {/* Chat Header */}
                    <div className="border-b border-gray-200 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <UserIcon size={20} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            Chat with {selectedChat.userId.slice(0, 12)}...
                          </h3>
                          <p className="text-xs text-gray-500">
                            Started {formatTime(selectedChat.startedAt)}
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => endChat(selectedChat.roomId)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                      >
                        End Chat
                      </motion.button>
                    </div>

                    {/* Messages */}
                    <div 
                      ref={messagesContainerRef}
                      onScroll={handleScroll}
                      className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
                    >
                      {selectedChat.messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.sender === "agent" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] px-4 py-2 rounded-lg ${
                          msg.sender === "agent"
                            ? "bg-[#2d545e] text-white rounded-br-sm"
                            : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                        <div className="flex items-center justify-between mt-1 gap-2">
                          <p className={`text-xs opacity-70 ${msg.sender === "agent" ? "text-white/70" : "text-gray-500"}`}>
                            {formatTime(msg.timestamp)}
                          </p>
                          {/* Read Receipt Ticks - Only on AGENT's sent messages */}
                          {msg.sender === "agent" && (
                            <div className="flex items-center">
                              {/* For agent's own messages, show if user has read */}
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 15"
                                fill="none"
                                className={msg.readBy?.user ? "text-blue-300" : "text-white/40"}
                              >
                                <path
                                  d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.175a.366.366 0 0 0-.063-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.175a.365.365 0 0 0-.063-.51z"
                                  fill="currentColor"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* User Typing Indicator */}
                  {userTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg rounded-bl-sm">
                        <div className="flex items-center gap-1">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-gray-200 p-4">
                  <div className="flex gap-2">
                    <input
                      value={messageInput}
                      onChange={(e) => {
                        setMessageInput(e.target.value);
                        // Send typing indicator when agent types
                        if (e.target.value.trim()) {
                          handleAgentTyping();
                        } else {
                          // Clear typing if input is empty
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
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d545e] focus:border-[#2d545e] outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={sendMessage}
                      disabled={!selectedChat || !messageInput.trim()}
                      className="px-6 py-2 bg-[#2d545e] text-white rounded-lg hover:bg-[#12343b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={18} />
                    </motion.button>
                  </div>
                </div>
                  </>
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center text-gray-500">
                <div>
                  <MessageCircle size={64} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No active chat</p>
                  <p className="text-sm mt-2">
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

