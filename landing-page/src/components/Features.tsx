import type { ReactNode } from "react";
import { motion } from "framer-motion";

function IconThread() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 7.5v6a2 2 0 0 1-2 2H9l-5 3.5V15.5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2z" />
      <path d="M7 10.5h10M7 13h6" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" />
    </svg>
  );
}

function IconKeyboard() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M7 10h.01M11 10h.01M15 10h.01M17 10h.01M7 14h10" />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4" />
    </svg>
  );
}

const features: { icon: ReactNode; title: string; description: string; rotate: number }[] = [
  {
    icon: <IconThread />,
    title: "Knows which message you're replying to",
    description:
      "Click Reply on any message in a long thread. ReplyForge tracks exactly which one you're answering, not just the latest.",
    rotate: -1.5,
  },
  {
    icon: <IconShield />,
    title: "Stays out of Gmail's way",
    description:
      "Runs in an isolated panel that never touches Gmail's own layout or styling. Nothing to break, nothing to conflict with.",
    rotate: 1,
  },
  {
    icon: <IconKeyboard />,
    title: "Keyboard shortcut",
    description: "Ctrl+Shift+M toggles the panel instantly, without reaching for the mouse.",
    rotate: 1.5,
  },
  {
    icon: <IconSpark />,
    title: "No prompt engineering, ever",
    description:
      "Type like you're texting a friend. Say 'tell them I'm running late' and get a reply that sounds like you, not a robot.",
    rotate: -1,
  },
];

export function Features() {
  return (
    <section id="features" className="border-b-2 border-neutral-950">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <span className="font-marker text-sm font-bold text-orange-600 uppercase">
          Why ReplyForge
        </span>
        <h2 className="mt-1 font-marker text-4xl font-bold text-neutral-950">
          Built for people who live in Gmail, not in ChatGPT tabs
        </h2>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20, rotate: feature.rotate }}
              whileInView={{ opacity: 1, y: 0, rotate: feature.rotate }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 2) * 0.1 }}
              className="rounded-2xl border-2 border-neutral-950 bg-white p-6 shadow-hard"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-neutral-950 bg-orange-100 text-neutral-950">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold text-neutral-950">
                {feature.title}
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
