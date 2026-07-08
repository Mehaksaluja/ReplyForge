function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function PanelMockup() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl shadow-neutral-900/10 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-black/40">
      <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
        <span className="flex items-center gap-2 text-sm font-semibold text-neutral-950 dark:text-neutral-50">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-950 text-white dark:bg-neutral-50 dark:text-neutral-950">
            <ChatIcon />
          </span>
          MailPilot
        </span>
        <span className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
      </div>

      <div className="flex flex-col gap-2.5 bg-neutral-50 px-4 py-4 dark:bg-neutral-950">
        <div className="max-w-[85%] self-start rounded-xl border border-neutral-200 bg-white px-3 py-2 text-[13px] leading-relaxed text-neutral-950 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50">
          Open an email and tell me what to do.
        </div>

        <div className="max-w-[85%] self-end rounded-xl bg-neutral-950 px-3 py-2 text-[13px] leading-relaxed text-white dark:bg-neutral-50 dark:text-neutral-950">
          tell him I'll send it by Friday
        </div>

        <div className="max-w-[85%] self-start rounded-xl border border-neutral-200 bg-white px-3 py-2 text-[13px] leading-relaxed text-neutral-950 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50">
          <p>
            Hi Sam, thanks for your patience — I'll have this over to you by Friday. Let me know if that works.
          </p>
          <button
            type="button"
            className="mt-2 rounded-md border border-neutral-950 px-2.5 py-1 text-xs font-semibold text-neutral-950 dark:border-neutral-50 dark:text-neutral-50"
          >
            Insert into Reply
          </button>
        </div>
      </div>

      <div className="flex gap-2 border-t border-neutral-200 bg-white p-2.5 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="h-8 flex-1 rounded-lg border border-neutral-200 dark:border-neutral-800" />
        <div className="flex h-8 w-14 items-center justify-center rounded-lg bg-neutral-950 text-xs font-semibold text-white dark:bg-neutral-50 dark:text-neutral-950">
          Send
        </div>
      </div>
    </div>
  );
}
