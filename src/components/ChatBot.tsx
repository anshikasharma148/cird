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
} from "lucide-react";
import Fuse, { FuseResult } from "fuse.js";
import faqs, { FAQ } from "@/data/faqs";
import { usePathname } from "next/navigation";

/* ----------------------- Types ----------------------- */
type Message = {
  id: string;
  sender: "user" | "bot" | "system";
  text: string;
  time: number;
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

const STORAGE_KEY = (path: string) => `cird_chat_v2:${path || "root"}`;

const DEFAULT_GREETING =
  "Hello! I'm CIRD Assistant. I can help you explore research projects, patents, collaborations, and more. What would you like to know?";

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

  const containerRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  /* ---------------- Enhanced Suggestions logic ---------------- */
  const askedSet = useMemo(() => {
    const safeMessages = Array.isArray(messages) ? messages : [];
    return new Set(
      safeMessages
        .filter((m) => m.sender === "user")
        .map((m) => m.text.toLowerCase())
    );
  }, [messages]);

  function refreshSuggestions(tag: string | null = "All") {
    const pool = tag && tag !== "All" 
      ? faqs.filter((f) => (f.tags || []).includes(tag))
      : faqs;
    
    const available = pool
      .map((f) => f.question)
      .filter((q) => !askedSet.has(q.toLowerCase()));
    
    const picks = available
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    setSuggestions(picks);
  }

  /* ---------------- Enhanced Sending & resolving ---------------- */
  const sendMessage = useCallback(
    async (raw: string) => {
      const cleaned = raw.trim();
      if (!cleaned) return;
      
      const userMsg: Message = {
        id: uid("user_"),
        sender: "user",
        text: cleaned,
        time: Date.now(),
      };
      
      setMessages((p) => {
        const prev = Array.isArray(p) ? p : DEFAULT_MESSAGES;
        return [...prev, userMsg];
      });
      setInput("");
      setIsTyping(true);

      const res = await resolveAnswerWithModel(
        cleaned,
        activeTag === "All" ? null : activeTag,
      );

      const thinkingTime = Math.min(800 + Math.random() * 700, 1500);
      await new Promise((r) => setTimeout(r, thinkingTime));

      const botMsg: Message = {
        id: uid("bot_"),
        sender: "bot",
        text: res.answer,
        time: Date.now(),
        meta: { 
          confidence: res.confidence,
          faqId: res.faqId,
        },
      };

      setMessages((p) => {
        const prev = Array.isArray(p) ? p : DEFAULT_MESSAGES;
        return [...prev, botMsg];
      });
      setIsTyping(false);
      refreshSuggestions(activeTag);
    },
    [activeTag],
  );

  /* --------------- Enhanced Regenerate ---------------- */
  const regenerateAnswer = async (botMessageId: string) => {
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
  }

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
      <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-3">
        <AnimatePresence>
          {popupVisible && !open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-2xl text-gray-700 text-sm px-4 py-3 rounded-2xl"
            >
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-blue-500" />
                <span>Ask me anything about CIRD</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
          className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-900 to-black text-white shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all duration-300 backdrop-blur-sm"
        >
          <MessageCircle size={22} />
        </motion.button>
      </div>

      {/* Enhanced Chat Window */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[999]"
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
              className="fixed bottom-20 right-6 z-[1000] w-[92%] sm:w-[420px] max-w-[440px] bg-white/95 backdrop-blur-xl text-gray-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200/50"
              style={{
                height: "min(80vh, 650px)",
                maxHeight: "650px",
              }}
            >

              {/* Enhanced Header */}
              <div className="flex items-center justify-between bg-gradient-to-r from-gray-900 to-black text-white px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Bot size={20} />
                    </div>
                    <motion.div 
                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">CIRD Assistant</h2>
                    <p className="text-xs text-gray-300 opacity-90">
                      Research • Projects • Patents
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowFilters(!showFilters)}
                    title="Toggle filters"
                    className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <Filter size={16} />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={exportChat} 
                    title="Export conversation" 
                    className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <Download size={16} />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={clearChat} 
                    title="Clear conversation" 
                    className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setOpen(false)} 
                    title="Close chat" 
                    className="p-2 hover:bg-white/10 rounded-xl transition-colors"
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
                    className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm overflow-hidden"
                  >
                    <div className="px-4 py-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Tag size={14} className="text-gray-500" />
                        <span className="text-xs font-medium text-gray-600">FILTER BY TOPIC</span>
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
                                ? "bg-gray-900 text-white border-gray-900 shadow-md"
                                : "bg-white/80 text-gray-700 border-gray-300/70 hover:bg-gray-50 hover:border-gray-400"
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

              {/* Enhanced Messages Area - More space now */}
              <div 
                ref={containerRef} 
                className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50/80 to-white/50 space-y-4"
              >
                {messages.map((m, index) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex items-start gap-2 max-w-[85%]">
                      {m.sender === "bot" && (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot size={12} className="text-white" />
                        </div>
                      )}
                      <div
                        className={`px-4 py-3 rounded-2xl text-sm shadow-sm backdrop-blur-sm ${
                          m.sender === "user"
                            ? "bg-gradient-to-br from-gray-900 to-black text-white rounded-br-md"
                            : "bg-white/90 border border-gray-200/70 text-gray-800 rounded-bl-md"
                        }`}
                      >
                        <div className="whitespace-pre-wrap leading-relaxed">
                          {m.text}
                        </div>
                        
                        {/* Message Footer */}
                        <div className="flex items-center justify-between mt-2 text-xs">
                          <span className={`${m.sender === "user" ? "text-gray-300" : "text-gray-500"}`}>
                            {formatTime(m.time)}
                          </span>
                          
                          <div className="flex items-center gap-3">
                            {m.meta?.confidence && (
                              <span className={`px-2 py-1 rounded-full ${
                                m.meta.confidence > 0.7 ? "bg-green-100 text-green-700" :
                                m.meta.confidence > 0.4 ? "bg-yellow-100 text-yellow-700" :
                                "bg-red-100 text-red-700"
                              }`}>
                                {Math.round(m.meta.confidence * 100)}% confident
                              </span>
                            )}
                            
                            {m.sender === "bot" && (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => regenerateAnswer(m.id)}
                                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                                  title="Regenerate response"
                                >
                                  <CornerUpLeft size={12} />
                                </button>
                                <button
                                  onClick={() => handleReaction(m.id, "liked")}
                                  className={`p-1 rounded transition-colors ${
                                    messageReactions[m.id] === "liked" 
                                      ? "text-green-500 bg-green-50" 
                                      : "hover:bg-gray-100"
                                  }`}
                                  title="Helpful response"
                                >
                                  👍
                                </button>
                                <button
                                  onClick={() => handleReaction(m.id, "disliked")}
                                  className={`p-1 rounded transition-colors ${
                                    messageReactions[m.id] === "disliked" 
                                      ? "text-red-500 bg-red-50" 
                                      : "hover:bg-gray-100"
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
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center flex-shrink-0 mt-1">
                          <User size={12} className="text-white" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Enhanced Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start gap-2 max-w-[85%]">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot size={12} className="text-white" />
                      </div>
                      <div className="bg-white/90 border border-gray-200/70 px-4 py-3 rounded-2xl rounded-bl-md">
                        <div className="flex items-center gap-2">
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
                          <span className="text-xs text-gray-500 ml-2">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={endRef} />
              </div>

              {/* Enhanced Suggestions - Now more compact */}
              {suggestions.length > 0 && (
                <div className="border-t border-gray-200/50 bg-white/80 backdrop-blur-sm px-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={12} className="text-blue-500" />
                    <span className="text-xs font-medium text-gray-600">QUICK SUGGESTIONS</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {suggestions.map((s) => (
                      <motion.button
                        key={s}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => sendMessage(s)}
                        className="px-2 py-1 text-xs bg-white/80 border border-gray-300/70 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all backdrop-blur-sm"
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Enhanced Input Area */}
              <div className="border-t border-gray-200/50 p-4 bg-white/90 backdrop-blur-sm">
                <div className="flex gap-3">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage(input);
                      }
                    }}
                    placeholder="Ask about research, projects, patents..."
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300/70 bg-white text-sm focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 outline-none transition-all backdrop-blur-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim()}
                    className="p-3 bg-gradient-to-br from-gray-900 to-black text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                  >
                    <Send size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}