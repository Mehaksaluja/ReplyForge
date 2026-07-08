import { useState } from "react";

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

const links = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 text-base font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-950 text-white dark:bg-neutral-50 dark:text-neutral-950">
            <ChatIcon />
          </span>
          MailPilot
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-600 md:flex dark:text-neutral-400">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-neutral-950 dark:hover:text-neutral-50"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#"
            className="hidden rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 sm:inline-block dark:bg-neutral-50 dark:text-neutral-950 dark:hover:bg-neutral-200"
          >
            Add to Chrome
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-950 md:hidden dark:text-neutral-50"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-neutral-200 px-6 py-4 text-sm font-medium text-neutral-600 md:hidden dark:border-neutral-800 dark:text-neutral-400">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-2 py-2.5 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:hover:bg-neutral-900 dark:hover:text-neutral-50"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-full bg-neutral-950 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-950 dark:hover:bg-neutral-200"
          >
            Add to Chrome
          </a>
        </nav>
      )}
    </header>
  );
}
