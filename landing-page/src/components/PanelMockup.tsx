function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function PanelMockup() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border-2 border-neutral-950 bg-white shadow-hard-lg">
      <div className="flex items-center gap-1.5 border-b-2 border-neutral-950 bg-neutral-50 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full border border-neutral-950 bg-neutral-200" />
        <span className="h-2.5 w-2.5 rounded-full border border-neutral-950 bg-neutral-200" />
        <span className="h-2.5 w-2.5 rounded-full border border-neutral-950 bg-neutral-200" />
        <span className="ml-2 truncate text-xs font-semibold text-neutral-400">mail.google.com</span>
      </div>

      <div className="flex items-center justify-between border-b-2 border-neutral-950 px-4 py-3">
        <span className="flex items-center gap-2 font-logo text-base text-neutral-950">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-neutral-950 bg-orange-600 text-white">
            <ChatIcon />
          </span>
          ReplyForge
        </span>
        <span className="h-2 w-2 rounded-full bg-orange-500" />
      </div>

      <div className="flex flex-col gap-2.5 bg-orange-50/40 px-4 py-4">
        <div className="max-w-[85%] self-start rounded-xl border-2 border-neutral-950 bg-white px-3 py-2 text-[13px] leading-relaxed text-neutral-950">
          Open an email and tell me what to do.
        </div>

        <div className="max-w-[85%] self-end rounded-xl border-2 border-neutral-950 bg-neutral-950 px-3 py-2 text-[13px] leading-relaxed text-white">
          tell him I'll send it by Friday
        </div>

        <div className="max-w-[85%] self-start rounded-xl border-2 border-neutral-950 bg-white px-3 py-2 text-[13px] leading-relaxed text-neutral-950">
          <p>
            Hi Sam, thanks for your patience. I'll have this over to you by Friday. Let me know if that works.
          </p>
          <button
            type="button"
            className="mt-2 rounded-md border-2 border-neutral-950 bg-orange-600 px-2.5 py-1 text-xs font-bold text-white shadow-[2px_2px_0_0_#0a0a0a]"
          >
            Insert into Reply
          </button>
        </div>
      </div>

      <div className="flex gap-2 border-t-2 border-neutral-950 bg-white p-2.5">
        <div className="h-8 flex-1 rounded-lg border-2 border-neutral-950" />
        <div className="flex h-8 w-14 items-center justify-center rounded-lg border-2 border-neutral-950 bg-orange-600 text-xs font-bold text-white">
          Send
        </div>
      </div>
    </div>
  );
}
