import type { ReactNode } from "react";

function IconThread() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 7.5v6a2 2 0 0 1-2 2H9l-5 3.5V15.5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2z" />
      <path d="M7 10.5h10M7 13h6" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" />
    </svg>
  );
}

function IconKeyboard() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M7 10h.01M11 10h.01M15 10h.01M17 10h.01M7 14h10" />
    </svg>
  );
}

function IconMoon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

const features: { icon: ReactNode; title: string; description: string }[] = [
  {
    icon: <IconThread />,
    title: "Knows which message you're replying to",
    description:
      "Click Reply on any message in a long thread — ReplyForge tracks exactly which one you're answering, not just the latest.",
  },
  {
    icon: <IconShield />,
    title: "Stays out of Gmail's way",
    description:
      "Runs in an isolated panel that never touches Gmail's own layout or styling — nothing to break, nothing to conflict with.",
  },
  {
    icon: <IconKeyboard />,
    title: "Keyboard shortcut",
    description: "Ctrl+Shift+M toggles the panel instantly, without reaching for the mouse.",
  },
  {
    icon: <IconMoon />,
    title: "Dark mode, automatically",
    description: "Matches your system theme by default — no setting to dig for.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
          Built to fit into how you already use Gmail
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950 text-white dark:bg-neutral-50 dark:text-neutral-950">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-950 dark:text-neutral-50">
                {feature.title}
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600 dark:text-neutral-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
