// src/components/ChatBot.tsx
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
import Fuse from "fuse.js";
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
 * - Cap container height, internal scroll, stable UI when many messages
 * - Accessibility & keyboard support (Enter to send, Esc to close)
 * - Suggestion rotation and avoidance of already-asked FAQs
 * - Safe backend hook points for integrating real LLM later (comments in code)
 *
 * Notes:
 * - This is a front-end, FAQ-first assistant. For natural custom Q/A using a model
 *   you can hook the 'resolveAnswerWithModel' function to your backend LLM endpoint.
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

const DEFAULT_GREETING = `Hi 👋 I'm CIRD Assistant — ask me about research, projects, patents or how to collaborate.`;

/* ------------------ Fuse.js Setup --------------------- */
const fuse = new Fuse(faqs, {
  keys: ["question", "answer", "tags"],
  includeScore: true,
  threshold: 0.42, // tuned for our short FAQ corpus
  useExtendedSearch: true,
});

/* ------------- Model / Backend integration ------------- */
/**
 * resolveAnswerWithModel:
 * - By default uses local FAQ matching.
 * - Replace or extend this function to call your backend LLM for advanced Q/A.
 *
 * Example (server-side):
 * POST /api/chat/ask { question, context_faqs: [...], pathname }
 * -> returns { answer, confidence, sourceFaqId? }
 *
 * This client-side function simulates answer resolution and fallback logic.
 */
async function resolveAnswerWithModel(
  question: string,
  activeTag: string | null,
): Promise<{ answer: string; confidence?: number; faqId?: string; didYouMean?: string[] }> {
  // 1) Try tight fuzzy matching first (prefer exact tag if activeTag set)
  const query = question.trim();
  const results = fuse.search(query);

  // If activeTag is set, prioritize results with that tag
  let picked = null as Fuse.FuseResult<FAQ> | null;
  if (activeTag && activeTag !== "All") {
    picked = results.find((r) => (r.item.tags || []).includes(activeTag)) ?? null;
  }
  if (!picked && results.length > 0) picked = results[0];

  // Heuristics on score: lower score is better
  if (picked && typeof picked.score === "number" && picked.score < 0.35) {
    return {
      answer: picked.item.answer,
      confidence: 0.9 - (picked.score ?? 0) * 0.4,
      faqId: picked.item.id,
    };
  }

  // If we have near matches, propose DID YOU MEAN
  const suggestions = results
    .slice(0, 3)
    .filter((r) => r.score !== undefined)
    .map((r) => r.item.question);

  // Fallback: attempt to answer by stitching top-K faq answers that share keywords
  if (results.length > 0 && suggestions.length > 0) {
    const combined = results.slice(0, 2).map((r) => r.item.answer).join("\n\n");
    return {
      answer:
        "I found some related information (below). If this isn't what you meant, try one of the suggested questions.\n\n" +
        combined,
      confidence: 0.5,
      didYouMean: suggestions,
    };
  }

  // Nothing matched well — fallback guidance
  return {
    answer:
      "I'm not sure about that yet 🤔. Try one of the suggested topics (Projects, Patents, Contact), or rephrase your question. Here are some suggestions I found:",
    confidence: 0.15,
    didYouMean: suggestions,
  };
}

/* -------------------- Component ----------------------- */
export default function ChatBot() {
  const pathname = usePathname() ?? "/";
  const storageKey = useMemo(() => STORAGE_KEY(pathname), [pathname]);

  // UI state
  const [open, setOpen] = useState<boolean>(false);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [popupText, setPopupText] = useState<string>("💬 Need help exploring CIRD?");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [activeTag, setActiveTag] = useState<string>("All");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [loadingRegenerateId, setLoadingRegenerateId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  // All unique tags from faqs (derived from tags[])
  const allTags = useMemo(() => {
    const set = new Set<string>();
    faqs.forEach((f) => (f.tags || []).forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, []);

  /* ------------------ Persistence ------------------ */
  useEffect(() => {
    // load
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as Message[];
        setMessages(parsed);
      } else {
        // seed with greeting
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
    } catch (e) {
      // If parse fails, reset
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
    // initial suggestions
    refreshSuggestions("All", []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  useEffect(() => {
    // persist
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages.slice(-300))); // cap to last 300 messages
    } catch {
      // ignore
    }
  }, [messages, storageKey]);

  /* ------------------ Popup behavior ------------------ */
  useEffect(() => {
    // set popup text by pathname context
    let text = "💬 Can I help you with something?";
    if (pathname.includes("/about")) text = "💬 Want to know about CIRD’s mission?";
    else if (pathname.includes("/research") || pathname.includes("/projects"))
      text = "💬 Curious about our research or projects?";
    else if (pathname.includes("/entities")) text = "💬 Looking for our research entities?";
    else if (pathname.includes("/contact")) text = "💬 Need contact details?";
    else if (pathname === "/") text = "💬 Need help exploring CIRD?";

    setPopupText(text);

    // show popup after a short delay, only if chat closed
    const showTimer = setTimeout(() => {
      if (!open) setPopupVisible(true);
    }, 1800);
    const hideTimer = setTimeout(() => setPopupVisible(false), 9000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [pathname, open]);

  /* ------------- Scroll to bottom on updates ------------- */
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  /* ---------------- Suggestions logic ---------------- */
  const askedSet = useMemo(() => {
    return new Set(
      messages.filter((m) => m.sender === "user").map((m) => m.text.trim().toLowerCase()),
    );
  }, [messages]);

  function refreshSuggestions(tag: string | null = "All", avoid: string[] = []) {
    // pick from faqs where tag matches (or any)
    const pool = (tag && tag !== "All" ? faqs.filter((f) => (f.tags || []).includes(tag)) : faqs)
      .map((f) => f.question)
      .filter((q) => !askedSet.has(q.trim().toLowerCase()) && !avoid.includes(q));

    // Shuffle and take 4
    const picks = pool.sort(() => 0.5 - Math.random()).slice(0, 4);
    // if not enough, include others
    if (picks.length < 4) {
      const fallback = faqs
        .map((f) => f.question)
        .filter((q) => !picks.includes(q) && !askedSet.has(q.trim().toLowerCase()));
      const extra = fallback.sort(() => 0.5 - Math.random()).slice(0, 4 - picks.length);
      setSuggestions([...picks, ...extra].slice(0, 4));
    } else {
      setSuggestions(picks);
    }
  }

  /* ---------------- Sending & resolving ---------------- */
  const sendMessage = useCallback(
    async (raw: string) => {
      const cleaned = raw.trim();
      if (!cleaned) return;

      // add user message
      const userMsg: Message = { id: uid("u_"), sender: "user", text: cleaned, time: Date.now() };
      setMessages((p) => [...p, userMsg]);
      setInput("");
      setIsTyping(true);

      // Resolve answer (local heuristic / fuse)
      const resolution = await resolveAnswerWithModel(cleaned, activeTag === "All" ? null : activeTag);

      // If model returned DID YOU MEAN suggestions, we include them as system message + suggested quick buttons
      let botText = resolution.answer;
      const meta = { confidence: resolution.confidence ?? 0 };
      if (resolution.didYouMean && resolution.didYouMean.length > 0) {
        botText += `\n\nDid you mean: ${resolution.didYouMean.slice(0, 3).join(" • ")} ?`;
      }

      const botMsg: Message = {
        id: uid("b_"),
        sender: "bot",
        text: botText,
        time: Date.now(),
        meta: { ...meta, faqId: resolution.faqId },
      };

      // simulate "thinking" latency for UX
      await new Promise((r) => setTimeout(r, 650));

      setMessages((p) => [...p, botMsg]);
      setIsTyping(false);

      // refresh suggestions for the active tag - avoid recommending recently used suggestions
      refreshSuggestions(activeTag, Object.keys({}));
    },
    [activeTag],
  );

  /* --------------- Regenerate (re-answer) --------------- */
  async function regenerateAnswer(botMessageId: string) {
    // Find the user message that preceded this bot message
    setLoadingRegenerateId(botMessageId);
    const idx = messages.findIndex((m) => m.id === botMessageId);
    if (idx === -1) {
      setLoadingRegenerateId(null);
      return;
    }
    // find previous user message (backwards)
    let userMsg: Message | undefined;
    for (let i = idx - 1; i >= 0; i--) {
      if (messages[i].sender === "user") {
        userMsg = messages[i];
        break;
      }
    }
    if (!userMsg) {
      setLoadingRegenerateId(null);
      return;
    }

    // call same resolver
    setIsTyping(true);
    const resolution = await resolveAnswerWithModel(userMsg.text, activeTag === "All" ? null : activeTag);
    const botText =
      resolution.answer +
      (resolution.didYouMean && resolution.didYouMean.length ? `\n\nDid you mean: ${resolution.didYouMean.join(" • ")}` : "");
    const newBotMsg: Message = {
      id: uid("b_"),
      sender: "bot",
      text: botText,
      time: Date.now(),
      meta: { confidence: resolution.confidence ?? 0, faqId: resolution.faqId },
    };

    // replace the existing bot message at idx with newBotMsg
    setMessages((prev) => {
      const copy = [...prev];
      copy[idx] = newBotMsg;
      return copy;
    });
    setIsTyping(false);
    setLoadingRegenerateId(null);
  }

  /* ----------------- Clear / Restart ------------------ */
  function clearChat(restartGreeting = true) {
    const seed: Message[] = restartGreeting
      ? [
          {
            id: uid("sys_"),
            sender: "bot",
            text: DEFAULT_GREETING,
            time: Date.now(),
            meta: { confidence: 1 },
          },
        ]
      : [];
    setMessages(seed);
    setInput("");
    refreshSuggestions(activeTag, []);
  }

  /* ---------------- Export chat ------------------ */
  function exportChat() {
    const dataStr = JSON.stringify({ pathname, messages }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cird-chat-${(pathname || "root").replace(/\W+/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /* ---------------- Tag click ------------------ */
  function onTagClick(tag: string) {
    const newTag = activeTag === tag ? "All" : tag;
    setActiveTag(newTag);
    refreshSuggestions(newTag, []);
  }

  /* ---------------- Keyboard shortcuts ---------------- */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ----------------- Did you mean click ----------------- */
  function onSuggestionClick(text: string) {
    sendMessage(text);
  }

  /* ---------------- UI render ---------------- */
  return (
    <>
      {/* Floating icon and popup */}
      <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-2">
        <AnimatePresence>
          {popupVisible && !open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: [1, 1.03, 1] }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.6 }}
              className="px-3 py-2 rounded-xl bg-white text-black shadow-lg border border-gray-200 max-w-[230px] text-sm"
              role="status"
              aria-live="polite"
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
            // when opening, refresh suggestions for the active tag
            refreshSuggestions(activeTag, []);
          }}
          className="w-14 h-14 rounded-full bg-black text-white shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
        >
          <MessageCircle size={22} />
        </button>
      </div>

      {/* Chat overlay + window */}
      <AnimatePresence>
        {open && (
          <>
            {/* backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-[999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* chat window */}
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", damping: 16, stiffness: 120 }}
              className="fixed bottom-20 right-6 z-[1000] w-[92%] sm:w-[380px] md:w-[420px] max-w-[420px] rounded-2xl shadow-2xl overflow-hidden bg-white text-black flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="CIRD assistant"
            >
              {/* header */}
              <div className="flex items-center justify-between px-4 py-3 bg-black text-white">
                <div>
                  <div className="text-lg font-semibold">CIRD Assistant</div>
                  <div className="text-xs text-gray-200">Ask about research, projects, patents, or collaboration</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    title="Export chat"
                    onClick={exportChat}
                    className="p-1 rounded hover:bg-black/20 transition"
                    aria-label="Export chat"
                  >
                    <Download size={16} />
                  </button>
                  <button
                    title="Restart conversation"
                    onClick={() => clearChat(true)}
                    className="p-1 rounded hover:bg-black/20 transition"
                    aria-label="Restart conversation"
                  >
                    <RefreshCcw size={16} />
                  </button>
                  <button
                    title="Clear messages"
                    onClick={() => clearChat(false)}
                    className="p-1 rounded hover:bg-black/20 transition"
                    aria-label="Clear messages"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button title="Close" onClick={() => setOpen(false)} className="p-1 rounded hover:bg-black/20 transition" aria-label="Close chat">
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* messages container */}
              <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" style={{ maxHeight: 420 }}>
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`${m.sender === "user" ? "bg-black text-white" : "bg-white border border-gray-200 text-black"} max-w-[85%] px-4 py-2 rounded-2xl shadow-sm relative`}>
                      <div className="text-sm whitespace-pre-wrap">{m.text}</div>
                      <div className="text-[10px] text-gray-400 mt-1 flex items-center gap-2 justify-end">
                        <span>{formatTime(m.time)}</span>
                        {m.sender === "bot" && m.meta?.confidence !== undefined && (
                          <span className="px-1 py-0.5 rounded bg-gray-100 text-gray-600 border text-[10px]">{Math.round((m.meta.confidence ?? 0) * 100)}%</span>
                        )}
                      </div>

                      {/* actions for bot messages */}
                      {m.sender === "bot" && (
                        <div className="absolute top-1 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                          <button
                            title="Regenerate answer"
                            onClick={() => regenerateAnswer(m.id)}
                            className="p-1 rounded hover:bg-gray-100"
                            aria-label="Regenerate answer"
                          >
                            {loadingRegenerateId === m.id ? <CornerUpLeft size={14} /> : <CornerUpLeft size={14} />}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl text-sm shadow-sm flex items-center gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300" />
                      <span className="text-xs text-gray-400 ml-2">Thinking...</span>
                    </div>
                  </div>
                )}

                <div ref={endRef} />
              </div>

              {/* tags & suggestions */}
              <div className="px-3 py-2 border-t border-gray-200 bg-white">
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {allTags.map((t) => (
                    <button
                      key={t}
                      onClick={() => onTagClick(t)}
                      className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full border ${
                        activeTag === t ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                      aria-pressed={activeTag === t}
                    >
                      <Tag size={12} /> {t}
                    </button>
                  ))}
                </div>

                <div className="mt-2 flex flex-wrap gap-2 items-center">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => onSuggestionClick(s)}
                      className="px-3 py-1 text-xs bg-white border border-gray-200 rounded-full hover:bg-gray-100"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* input */}
              <div className="px-3 py-3 bg-white border-t border-gray-200 flex items-center gap-2">
                <input
                  aria-label="Type your message"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(input);
                    }
                  }}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black text-sm"
                />
                <button
                  title="Send message"
                  onClick={() => sendMessage(input)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-black text-white hover:bg-gray-800 transition"
                  aria-label="Send"
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
