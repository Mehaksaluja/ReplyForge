import { motion } from "framer-motion";
import { Sparkle } from "./Doodles";

// Paste the YouTube video ID here once it's uploaded, e.g. "dQw4w9WgXcQ"
const YOUTUBE_ID = "";

export function DemoVideo() {
  return (
    <section id="demo" className="relative overflow-hidden border-b-2 border-neutral-950 bg-dot-grid">
      <Sparkle className="absolute top-16 right-10 h-8 w-8 text-orange-300 md:right-24" />

      <div className="mx-auto max-w-5xl px-6 py-20 text-center">
        <span className="font-marker text-sm font-bold text-orange-600 uppercase">
          Watch it work
        </span>
        <h2 className="mt-1 font-marker text-4xl font-bold text-neutral-950">
          See ReplyForge in your inbox
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-neutral-600">
          A quick look at replying to a real email without ever leaving Gmail.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="relative mt-12 aspect-video overflow-hidden rounded-2xl border-2 border-neutral-950 bg-neutral-950 shadow-hard-lg"
        >
          {YOUTUBE_ID ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}`}
              title="ReplyForge demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-neutral-500">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-neutral-700 bg-neutral-900">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="translate-x-0.5 text-white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="font-marker text-sm uppercase tracking-wide">
                Demo video coming soon
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
