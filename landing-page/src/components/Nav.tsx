import { useState } from "react";
import { motion } from "framer-motion";

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

const links = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

const ctaClass =
  "rounded-full border-2 border-neutral-950 bg-orange-600 px-5 py-2.5 text-sm font-bold text-white shadow-hard transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#0a0a0a] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-neutral-950 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <a href="#" className="flex items-center gap-2.5">
          <motion.span
            initial={{ rotate: -6 }}
            whileHover={{ rotate: 6, scale: 1.08 }}
            className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-neutral-950 bg-orange-600 text-white shadow-hard"
          >
            <ChatIcon />
          </motion.span>
          <span className="font-logo text-xl font-bold tracking-tight text-neutral-950">ReplyForge</span>
        </a>

        <nav className="hidden items-center gap-8 font-marker text-base font-bold text-neutral-700 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-orange-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#" className={`hidden sm:inline-block ${ctaClass}`}>
            Add to Chrome - Free
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-neutral-950 text-neutral-950 md:hidden"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t-2 border-neutral-950 px-6 py-4 font-marker text-base font-bold text-neutral-700 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-2 py-2.5 transition-colors hover:bg-orange-50 hover:text-orange-600"
            >
              {link.label}
            </a>
          ))}
          <a href="#" onClick={() => setMenuOpen(false)} className={`mt-2 text-center ${ctaClass}`}>
            Add to Chrome - Free
          </a>
        </nav>
      )}
    </header>
  );
}
