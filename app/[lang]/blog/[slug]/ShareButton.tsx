"use client";
import { useState } from "react";
export default function ShareButton({ title, label, copiedLabel }: { title: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) { try { await navigator.share({ title, url }); return; } catch {} }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (<button onClick={handleShare} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">{copied ? copiedLabel : label}</button>);
}
