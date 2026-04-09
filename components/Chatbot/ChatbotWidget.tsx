"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { X, Send } from "lucide-react";
import type { Message } from "./types";
import { ChatMessage, TypingIndicator } from "./ChatMessage";
import { findAnswer, getGreetingMessages, getSuggestedQuestions } from "./chatbotKnowledge";

export function ChatbotWidget() {
  const pathname = usePathname();

  const supportedLang = pathname?.startsWith("/zh-HK") ? "zh-HK" : "en";

  const ui =
    supportedLang === "zh-HK"
      ? {
          tryLabel: "建議：",
          placeholder: "想了解什麼？…",
          tooltipTitle: "你好！有問題嗎？",
          tooltipBody: "我是 Bumblebee，你的導覽員。你可以問我 Elementals 的功能、價格或如何開始使用。",
          openAria: "開啟與 Bumblebee 對話",
          closeAria: "關閉與 Bumblebee 對話",
          dismissTooltip: "關閉提示",
          buttonLabel: "問 Bumblebee",
        }
      : {
          tryLabel: "Try:",
          placeholder: "Ask me anything...",
          tooltipTitle: "Hi there! Have questions?",
          tooltipBody: "I'm Bumblebee, your guide. Ask me anything about Elementals!",
          openAria: "Open chat with Bumblebee",
          closeAria: "Close chat with Bumblebee",
          dismissTooltip: "Dismiss tooltip",
          buttonLabel: "Ask Bumblebee",
        };


  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [dynamicSuggestions, setDynamicSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const conversationHistoryRef = useRef<string[]>([]);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);


  // Initialize greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greetings = getGreetingMessages(supportedLang);
      const greeting = greetings[Math.floor(Math.random() * greetings.length)];
      setMessages([
        {
          id: "greeting",
          content: greeting,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length, supportedLang]);


  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSend = useCallback(
    async (text?: string) => {
      const content = text || inputValue.trim();
      if (!content) return;

      // Add user message
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        content,
        isUser: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInputValue("");

      conversationHistoryRef.current.push(content);

      setIsTyping(true);

      // Find answer
      const result = findAnswer(content, conversationHistoryRef.current, supportedLang);

      // Simulate typing delay
      const typingDelay = Math.min(600 + result.answer.length * 2, 1800);
      await new Promise((resolve) => setTimeout(resolve, typingDelay));

      // Add bot response
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        content: result.answer,
        isUser: false,
        timestamp: new Date(),
        pageLink: result.pageLink
          ? {
              path: (() => {
                const path = result.pageLink.path;
                if (path.startsWith("http")) return path;
                if (supportedLang === "en") return path;
                if (path === "/") return `/${supportedLang}`;
                if (path === `/${supportedLang}` || path.startsWith(`/${supportedLang}/`)) return path;
                return `/${supportedLang}${path}`;
              })(),
              text: result.pageLink.text,
            }
          : undefined,
      };

      conversationHistoryRef.current.push(result.answer);
      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);

      // Update suggestions
      if (result.followUps.length > 0) {
        setDynamicSuggestions(result.followUps);
      }
    },
    [inputValue, supportedLang]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const baseSuggestions = getSuggestedQuestions(supportedLang);

  const currentSuggestions =
    messages.length > 1 && dynamicSuggestions.length > 0
      ? dynamicSuggestions
      : baseSuggestions;

  // Hide chatbot on blog pages (only check after mount to prevent hydration mismatch)
  if (mounted && (pathname?.startsWith("/blog") || pathname?.includes("/blog"))) {
    return null;
  }

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "20px",
            width: "380px",
            maxWidth: "calc(100vw - 40px)",
            height: "520px",
            maxHeight: "calc(100vh - 140px)",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999,
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 0 0 0.5px rgba(0, 0, 0, 0.06)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
              borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
              background: "rgba(255, 255, 255, 0.6)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/bumblebee.svg"
                  alt="Bumblebee"
                  width={36}
                  height={36}
                  loading="lazy"
                  style={{ width: "36px", height: "36px", objectFit: "contain" }}
                />
              </div>
              <div>
                <div style={{ fontWeight: 600, color: "#111827" }}>Bumblebee</div>
              </div>
            </div>
            <button
              onClick={handleClose}
              style={{
                background: "transparent",
                border: "none",
                color: "#9ca3af",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "8px",
                transition: "color 0.2s",
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} onLinkClick={handleLinkClick} />
            ))}

            {isTyping && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {!isTyping && currentSuggestions.length > 0 && (
            <div
              style={{
                padding: "8px 16px",
                borderTop: "1px solid rgba(0, 0, 0, 0.06)",
                backgroundColor: "rgba(249, 250, 251, 0.6)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  overflowX: "auto",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    color: "#9ca3af",
                    flexShrink: 0,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {ui.tryLabel}
                </span>
                {currentSuggestions.slice(0, 3).map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    style={{
                      padding: "4px 10px",
                      fontSize: "11px",
                      borderRadius: "12px",
                      border: "1px solid rgba(40, 102, 240, 0.3)",
                      backgroundColor: "transparent",
                      color: "#000000",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {q.length > 25 ? q.slice(0, 25) + "..." : q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div
            style={{
              padding: "16px",
              borderTop: "1px solid rgba(0, 0, 0, 0.06)",
              display: "flex",
              gap: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={ui.placeholder}
              style={{
                flex: 1,
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                backgroundColor: "#f9fafb",
                color: "#111827",
                fontSize: "14px",
                outline: "none",
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputValue.trim()}
              style={{
                padding: "12px",
                borderRadius: "12px",
                border: "none",
                background: inputValue.trim()
                  ? "linear-gradient(135deg, #16a34a, #15803d)"
                  : "#e5e7eb",
                color: inputValue.trim() ? "#ffffff" : "#9ca3af",
                cursor: inputValue.trim() ? "pointer" : "not-allowed",
                transition: "all 0.2s",
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}


      {/* Floating Button */}
      <button
        onClick={isOpen ? handleClose : handleOpen}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          color: "#000000",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          zIndex: 9997,
          boxShadow:
            "0 4px 20px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(0, 0, 0, 0.06)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        aria-label={isOpen ? ui.closeAria : ui.openAria}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src="/bumblebee.svg"
            alt="Bumblebee"
            width={40}
            height={40}
            loading="lazy"
            style={{ width: "40px", height: "40px", objectFit: "contain" }}
          />
        )}
      </button>

      {/* Label under button */}
      {!isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "4px",
            right: "20px",
            width: "60px",
            textAlign: "center",
            fontSize: "10px",
            color: "#000000",
            zIndex: 9996,
            fontWeight: 500,
          }}
        >
          {ui.buttonLabel}
        </div>
      )}
    </>
  );
}

export default ChatbotWidget;
