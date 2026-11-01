"use client";

import { REACTION_OPEN } from "@/components/DeskHello";

export default function ReactionLink({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(REACTION_OPEN))} className={`cursor-pointer border-0 bg-transparent p-0 text-left ${className ?? ""}`}>
      {children}
    </button>
  );
}
