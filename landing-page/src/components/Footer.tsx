function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-sm text-neutral-500 sm:flex-row sm:justify-between dark:text-neutral-500">
        <span className="flex items-center gap-2 font-semibold text-neutral-950 dark:text-neutral-50">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-950 text-white dark:bg-neutral-50 dark:text-neutral-950">
            <ChatIcon />
          </span>
          MailPilot
        </span>
        <p>© {new Date().getFullYear()} MailPilot. Chat with your email, right inside Gmail.</p>
      </div>
    </footer>
  );
}
