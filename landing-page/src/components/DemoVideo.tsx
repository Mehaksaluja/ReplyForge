import { motion } from "framer-motion";

// Paste the YouTube video ID here once it's uploaded, e.g. "dQw4w9WgXcQ"
const YOUTUBE_ID = "hkaOr8a3DFg";

export function DemoVideo() {
  return (
    <section id="demo" className="border-b-2 border-neutral-950 bg-white">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="font-marker text-4xl font-bold text-neutral-950">
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
          className="mt-10 aspect-video overflow-hidden rounded-xl border-2 border-neutral-950"
        >
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${YOUTUBE_ID}`}
            title="ReplyForge demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
}
