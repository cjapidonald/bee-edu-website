"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ChatbotWidget = dynamic(() => import("./ChatbotWidget"), { ssr: false });

type IdleCallbackWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

export default function DeferredChatbot() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      if (cancelled) return;
      setShouldLoad(true);
    };

    if (typeof window === "undefined") return;

    const w = window as IdleCallbackWindow;

    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(load, { timeout: 3000 });

      return () => {
        cancelled = true;
        w.cancelIdleCallback?.(id);
      };
    }

    const timer = setTimeout(load, 2000);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  if (!shouldLoad) return null;

  return <ChatbotWidget />;
}
