"use client";

import { useId, useState } from "react";
import { useInterval } from "./hooks";

const KEY = [0x5a, 0x13, 0xc7, 0x2e, 0x91];

interface ChatToyProps {
  active: boolean;
  reduced: boolean;
  clients: [string, string];
  initial: string;
}

export function ChatToy({ active, reduced, clients, initial }: ChatToyProps) {
  const [msg, setMsg] = useState(initial);
  const [pkt, setPkt] = useState(1);
  const id = useId();
  useInterval(() => setPkt((p) => p + 1), 450, active && !reduced);

  const wire = Array.from(msg, (ch, i) =>
    ((ch.charCodeAt(0) ^ KEY[i % KEY.length] ^ (pkt * 7)) & 255).toString(16).padStart(2, "0"),
  ).join(" ");

  return (
    <div className="flex flex-1 flex-col gap-3.5 p-5 sm:p-7">
      <span className="font-mono text-[10.5px] tracking-[0.14em] text-[#716c60]">RAW TCP · TWO CLIENTS · PACKET {pkt}</span>
      <div className="rounded-[6px] border border-[#2a2621] p-4">
        <label htmlFor={id} className="font-mono text-[10.5px] tracking-[0.1em] text-[#4fd67a]">
          {clients[0].toUpperCase()} · TYPE HERE
        </label>
        <input
          id={id}
          value={msg}
          maxLength={40}
          onChange={(e) => setMsg(e.target.value)}
          className="toyfocus mt-2.5 box-border block h-11 w-full rounded-[6px] border border-[#3a352d] bg-[#141210] px-3 font-mono text-[16px] sm:text-[14px] text-[#fbfdf5]"
        />
      </div>
      <div className="rounded-[6px] border border-dashed border-[#3a352d] p-4">
        <div className="font-mono text-[10.5px] tracking-[0.1em] text-[#e0735c]">ON THE WIRE · WHAT AN EAVESDROPPER SEES</div>
        <div className="mt-2.5 min-h-[42px] break-all font-mono text-[13px] leading-[1.6] text-[#d8d3c9]" aria-hidden="true">
          {wire}
        </div>
      </div>
      <div className="rounded-[6px] border border-[#2a2621] p-4">
        <div className="font-mono text-[10.5px] tracking-[0.1em] text-[#4fd67a]">{clients[1].toUpperCase()} · DECRYPTED</div>
        <div className="mt-2.5 min-h-[22px] break-words text-[16px]">{msg}</div>
      </div>
      <p className="mt-auto font-mono text-[10.5px] text-[#716c60]">
        The real app uses AES. This toy only scrambles bytes so you can watch it happen.
      </p>
    </div>
  );
}
