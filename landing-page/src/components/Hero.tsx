import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { PanelMockup } from "./PanelMockup";
import { Squiggle, Sparkle, Star } from "./Doodles";

const ctaClass =
  "rounded-full border-2 border-neutral-950 bg-orange-600 px-7 py-3.5 text-base font-bold text-white shadow-hard-lg transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[4px_4px_0_0_#0a0a0a] active:translate-x-[7px] active:translate-y-[7px] active:shadow-none";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-dot-grid">
      <Star className="absolute top-24 left-8 h-8 w-8 text-orange-300 md:left-20" />
      <span
        className="animate-float absolute top-40 right-10 text-orange-400 md:right-28"
        style={{ "--float-rotate": "8deg" } as CSSProperties}
      >
        <Sparkle className="h-10 w-10" />
      </span>

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-20 md:grid-cols-2 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            initial={{ rotate: -4 }}
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-neutral-950 bg-orange-100 px-3.5 py-1.5 text-xs font-bold tracking-wide text-neutral-950 uppercase shadow-hard"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-600" />
            Built for full inboxes
          </motion.span>

          <h1 className="mt-6 font-marker text-5xl leading-[1.05] font-bold text-neutral-950 sm:text-6xl">
            Stop copy-pasting your inbox into{" "}
            <span className="relative inline-block whitespace-nowrap">
              ChatGPT
              <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-orange-500" />
            </span>
            .
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-neutral-600">
            ReplyForge lives right inside Gmail and already knows the thread. Just
            type what you want to say, like 'reject politely' or 'tell them I'll
            send it Friday', and get a reply ready to send. No new tabs, no
            re-explaining the context every single time.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <motion.a
              href="https://chromewebstore.google.com/detail/hhjjdabhmacggchdgeejcdabnpjpaakd"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.97 }}
              className={ctaClass}
            >
              Add to Chrome - Free
            </motion.a>
            <a
              href="#how-it-works"
              className="font-marker text-base font-bold text-neutral-950 underline decoration-orange-400 decoration-4 underline-offset-4 hover:text-orange-600"
            >
              See how it works
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-neutral-600">
            <span className="flex items-center gap-1.5">✓ 5 free replies, no card required</span>
            <span className="flex items-center gap-1.5">✓ Nothing stored on our servers</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center md:justify-end"
        >
          <PanelMockup />
        </motion.div>
      </div>
    </section>
  );
}
