"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Tag,
  Trash2,
  RefreshCcw,
  Download,
  CornerUpLeft,
  Check,
} from "lucide-react";
import Fuse, { FuseResult } from "fuse.js"; // ✅ FIXED: added FuseResult import
import faqs, { FAQ } from "@/data/faqs";
import { usePathname } from "next/navigation";

/**
 * Advanced ChatBot for CIRD
 *
 * Features:
 * - Context-aware popup (based on pathname)
 * - Tag/category filtering and dynamic suggestions
 * - Fuse.js fuzzy search with scoring and fallback "Did you mean?"
 * - LocalStorage persistence per route (so chat survives reload)
 * - Clear / Restart conversation
 * - Export conversation to JSON
 * - "Regenerate" (re-answer) for bot messages (local re-run using same logic)
 * - Typing indicator & message timestamps
 * - Accessibility & keyboard support (Enter to send, Esc to close)
 * - Suggestion rotation and avoidance of already-asked FAQs
 * - Future-ready for LLM backend integration
 */

/* ----------------------- Types ----------------------- */
type Message = {
  id: string;
  sender: "user" | "bot" | "system";
  text: string;
  time: number;
  meta?: { confidence?: number; faqId?: string };
};

/* --------------------- Helpers ------------------------ */
const uid = (prefix = "") =>
  `${prefix}${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-4)}`;

const formatTime = (ts: number) =>
  new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const STORAGE_KEY = (path: string) => `cird_chat_v1:${path || "root"}`;

const DEFAULT_GREETING =
  "Hi 👋 I'm CIRD Assistant — ask me about research, projects, patents or how to collaborate.";

/* ------------------ Fuse.js Setup --------------------- */
const fuse = new Fuse(faqs, {
  keys: ["question", "answer", "tags"],
  includeScore: true,
  threshold: 0.42,
  useExtendedSearch: true,
});

/* ------------- Model / Backend integration ------------- */
async function resolveAnswerWithModel(
  question: string,
  activeTag: string | null,
): Promise<{ answer: string; confidence?: number; faqId?: string; didYouMean?: string[] }> {
  const query = question.trim();
  const results = fuse.search(query);

  // ✅ FIXED: use FuseResult type
  let picked: FuseResult<FAQ> | null = null;
  if (activeTag && activeTag !== "All") {
    picked = results.find((r) => (r.item.tags || []).includes(activeTag)) ?? null;
  }
  if (!picked && results.length > 0) picked = results[0];

  if (picked && typeof picked.score === "number" && picked.score < 0.35) {
    return {
      answer: picked.item.answer,
      confidence: 0.9 - (picked.score ?? 0) * 0.4,
      faqId: picked.item.id,
    };
  }

  const suggestions = results.slice(0, 3).map((r) => r.item.question);

  if (results.length > 0 && suggestions.length > 0) {
    const combined = results.slice(0, 2).map((r) => r.item.answer).join("\n\n");
    return {
      answer:
        "I found some related information (below). If this isn't what you meant, try one of these:\n\n" +
        combined,
      confidence: 0.5,
      didYouMean: suggestions,
    };
  }

  return {
    answer:
      "I'm not sure about that yet 🤔. Try asking about 'projects', 'patents', or 'contact'.",
    confidence: 0.15,
    didYouMean: suggestions,
  };
}

/* -------------------- Component ----------------------- */
export default function ChatBot() {
  const pathname = usePathname() ?? "/";
  const storageKey = useMemo(() => STORAGE_KEY(pathname), [pathname]);

  const [open, setOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupText, setPopupText] = useState("💬 Need help exploring CIRD?");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [loadingRegenerateId, setLoadingRegenerateId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    faqs.forEach((f) => (f.tags || []).forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, []);

  /* ------------------ Persistence ------------------ */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setMessages(JSON.parse(raw));
      else
        setMessages([
          {
            id: uid("sys_"),
            sender: "bot",
            text: DEFAULT_GREETING,
            time: Date.now(),
            meta: { confidence: 1 },
          },
        ]);
    } catch {
      setMessages([
        {
          id: uid("sys_"),
          sender: "bot",
          text: DEFAULT_GREETING,
          time: Date.now(),
          meta: { confidence: 1 },
        },
      ]);
    }
    refreshSuggestions("All");
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages.slice(-300)));
    } catch {}
  }, [messages, storageKey]);

  /* ------------------ Popup behavior ------------------ */
  useEffect(() => {
    let text = "💬 Can I help you with something?";
    if (pathname.includes("/about")) text = "💬 Want to know about CIRD’s mission?";
    else if (pathname.includes("/projects"))
      text = "💬 Curious about our ongoing projects?";
    else if (pathname.includes("/contact")) text = "💬 Need contact details?";
    else if (pathname === "/") text = "💬 Need help exploring CIRD?";
    setPopupText(text);

    const showTimer = setTimeout(() => {
      if (!open) setPopupVisible(true);
    }, 2000);
    const hideTimer = setTimeout(() => setPopupVisible(false), 8000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [pathname, open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* ---------------- Suggestions logic ---------------- */
  const askedSet = useMemo(
    () => new Set(messages.filter((m) => m.sender === "user").map((m) => m.text.toLowerCase())),
    [messages],
  );

  function refreshSuggestions(tag: string | null = "All") {
    const pool =
      tag && tag !== "All"
        ? faqs.filter((f) => (f.tags || []).includes(tag))
        : faqs;
    const available = pool
      .map((f) => f.question)
      .filter((q) => !askedSet.has(q.toLowerCase()));
    const picks = available.sort(() => 0.5 - Math.random()).slice(0, 4);
    setSuggestions(picks);
  }

  /* ---------------- Sending & resolving ---------------- */
  const sendMessage = useCallback(
    async (raw: string) => {
      const cleaned = raw.trim();
      if (!cleaned) return;
      const userMsg: Message = {
        id: uid("u_"),
        sender: "user",
        text: cleaned,
        time: Date.now(),
      };
      setMessages((p) => [...p, userMsg]);
      setInput("");
      setIsTyping(true);

      const res = await resolveAnswerWithModel(
        cleaned,
        activeTag === "All" ? null : activeTag,
      );
      await new Promise((r) => setTimeout(r, 600));

      setMessages((p) => [
        ...p,
        {
          id: uid("b_"),
          sender: "bot",
          text: res.answer,
          time: Date.now(),
          meta: { confidence: res.confidence },
        },
      ]);
      setIsTyping(false);
      refreshSuggestions(activeTag);
    },
    [activeTag],
  );

  /* --------------- Regenerate (re-answer) --------------- */
  async function regenerateAnswer(botMessageId: string) {
    setLoadingRegenerateId(botMessageId);
    const idx = messages.findIndex((m) => m.id === botMessageId);
    if (idx === -1) return;
    const userMsg = [...messages].reverse().find((m) => m.sender === "user");
    if (!userMsg) return;

    setIsTyping(true);
    const res = await resolveAnswerWithModel(
      userMsg.text,
      activeTag === "All" ? null : activeTag,
    );
    await new Promise((r) => setTimeout(r, 600));

    setMessages((prev) =>
      prev.map((m) =>
        m.id === botMessageId
          ? {
              ...m,
              text: res.answer,
              time: Date.now(),
              meta: { confidence: res.confidence },
            }
          : m,
      ),
    );
    setIsTyping(false);
    setLoadingRegenerateId(null);
  }

  /* ----------------- Clear / Restart ------------------ */
  function clearChat() {
    setMessages([
      {
        id: uid("sys_"),
        sender: "bot",
        text: DEFAULT_GREETING,
        time: Date.now(),
      },
    ]);
    setInput("");
  }

  /* ---------------- Export chat ------------------ */
  function exportChat() {
    const dataStr = JSON.stringify({ pathname, messages }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cird-chat-${pathname.replace(/\W+/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /* ---------------- UI render ---------------- */
  return (
    <>
      {/* Floating icon and popup */}
      <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-2">
        <AnimatePresence>
          {popupVisible && !open && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-gray-200 shadow-lg text-black text-sm px-3 py-2 rounded-xl"
            >
              {popupText}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          aria-label="Open chat"
          title="Open chat"
          onClick={() => {
            setOpen(true);
            setPopupVisible(false);
            refreshSuggestions(activeTag);
          }}
          className="w-14 h-14 rounded-full bg-black text-white shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
        >
          <MessageCircle size={22} />
        </button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-[999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", damping: 16, stiffness: 120 }}
              className="fixed bottom-20 right-6 z-[1000] w-[92%] sm:w-[380px] max-w-[420px] bg-white text-black rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between bg-black text-white px-4 py-3">
                <div>
                  <h2 className="text-lg font-semibold">CIRD Assistant</h2>
                  <p className="text-xs text-gray-300">
                    Ask about research, projects, or patents
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={exportChat} title="Export" className="p-1 hover:bg-gray-800 rounded">
                    <Download size={16} />
                  </button>
                  <button onClick={clearChat} title="Clear" className="p-1 hover:bg-gray-800 rounded">
                    <Trash2 size={16} />
                  </button>
                  <button onClick={() => setOpen(false)} title="Close" className="p-1 hover:bg-gray-800 rounded">
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div ref={containerRef} className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
                        m.sender === "user"
                          ? "bg-black text-white rounded-br-none"
                          : "bg-white border border-gray-200 text-black rounded-bl-none"
                      }`}
                    >
                      {m.text}
                      <div className="text-[10px] text-gray-400 mt-1 flex justify-between">
                        <span>{formatTime(m.time)}</span>
                        {m.meta?.confidence && (
                          <span>{Math.round((m.meta.confidence ?? 0) * 100)}%</span>
                        )}
                      </div>
                      {m.sender === "bot" && (
                        <div className="flex justify-end mt-1">
                          <button
                            onClick={() => regenerateAnswer(m.id)}
                            className="text-[11px] flex items-center gap-1 px-2 py-0.5 border border-gray-200 text-gray-500 rounded-md hover:bg-gray-100"
                          >
                            <CornerUpLeft size={10} /> Regenerate
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border px-4 py-2 rounded-2xl flex gap-1 text-sm">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300" />
                      <span className="text-xs text-gray-400 ml-2">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>

              {/* Tags */}
              <div className="border-t border-gray-200 bg-white px-3 py-2">
                <div
                  className="flex gap-2 overflow-x-auto scrollbar-hide pb-1"
                  style={{
                    scrollBehavior: "smooth",
                    maskImage:
                      "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                    WebkitMaskImage:
                      "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                  }}
                >
                  {allTags.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setActiveTag(t);
                        refreshSuggestions(t);
                      }}
                      className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full border whitespace-nowrap ${
                        activeTag === t
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <Tag size={12} /> {t}
                    </button>
                  ))}
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="px-3 py-1 text-xs bg-white border border-gray-300 rounded-full hover:bg-gray-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-2 bg-white flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-black outline-none"
                />
                <button
                  onClick={() => sendMessage(input)}
                  className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                                    <Send size={16} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

