"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Message } from "./types";

interface ChatMessageProps {
  message: Message;
  onLinkClick?: () => void;
}

// Parse message content for markdown-like formatting
function formatContent(content: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const lines = content.split("\n");

  lines.forEach((line, lineIndex) => {
    if (lineIndex > 0) {
      parts.push(<br key={`br-${lineIndex}`} />);
    }

    // Process bold text (**text**)
    const boldRegex = /\*\*([^*]+)\*\*/g;
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.slice(lastIndex, match.index));
      }
      parts.push(
        <strong
          key={`bold-${lineIndex}-${match.index}`}
          style={{ fontWeight: 600, color: "#fc3c00" }}
        >
          {match[1]}
        </strong>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < line.length) {
      parts.push(line.slice(lastIndex));
    }
  });

  return parts;
}

export function ChatMessage({ message, onLinkClick }: ChatMessageProps) {
  const isUser = message.isUser;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "8px",
      }}
    >
      <div
        style={{
          maxWidth: "85%",
          padding: "12px 16px",
          borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
          backgroundColor: isUser ? "#fc3c00" : "#f3f4f6",
          border: isUser ? "none" : "1px solid #e5e7eb",
          color: isUser ? "#ffffff" : "#111827",
          fontSize: "14px",
          lineHeight: "1.6",
        }}
      >
        <div style={{ whiteSpace: "pre-wrap" }}>{formatContent(message.content)}</div>

        {message.pageLink && (
          <Link
            href={message.pageLink.path}
            onClick={onLinkClick}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              marginTop: "12px",
              padding: "8px 12px",
              backgroundColor: isUser
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(252, 60, 0, 0.1)",
              color: isUser ? "#ffffff" : "#fc3c00",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 500,
              transition: "background-color 0.2s",
            }}
          >
            {message.pageLink.text}
            <ExternalLink size={14} />
          </Link>
        )}
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "8px" }}>
      <div
        style={{
          padding: "12px 16px",
          borderRadius: "16px 16px 16px 4px",
          backgroundColor: "#f3f4f6",
          border: "1px solid #e5e7eb",
          display: "flex",
          gap: "6px",
          alignItems: "center",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#fc3c00",
            animation: "typingBounce 1.2s infinite",
            animationDelay: "0ms",
          }}
        />
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#fc3c00",
            animation: "typingBounce 1.2s infinite",
            animationDelay: "150ms",
          }}
        />
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#fc3c00",
            animation: "typingBounce 1.2s infinite",
            animationDelay: "300ms",
          }}
        />
        <style>{`
          @keyframes typingBounce {
            0%, 60%, 100% {
              transform: translateY(0);
              opacity: 0.4;
            }
            30% {
              transform: translateY(-6px);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

export default ChatMessage;
