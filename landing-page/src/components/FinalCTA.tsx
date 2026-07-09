import { motion } from "framer-motion";
import { Sparkle, Star } from "./Doodles";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-b-2 border-neutral-950 bg-neutral-950">
      <Star className="absolute top-10 left-10 h-8 w-8 text-neutral-700 md:left-24" />
      <Sparkle className="absolute right-10 bottom-10 h-9 w-9 text-orange-500 md:right-24" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl px-6 py-20 text-center"
      >
        <h2 className="font-marker text-4xl font-bold text-white sm:text-5xl">
          Your inbox won't reply to itself.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-neutral-400">
          Stop opening a new tab and writing a prompt for every single email. Install ReplyForge and clear your inbox at Gmail speed.
        </p>
        <motion.a
          href="#"
          whileTap={{ scale: 0.97 }}
          className="mt-8 inline-block rounded-full border-2 border-white bg-orange-600 px-8 py-3.5 text-base font-bold text-white shadow-[4px_4px_0_0_#ffffff] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[1px_1px_0_0_#ffffff] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
        >
          Add to Chrome - Free
        </motion.a>
        <p className="mt-3 text-xs text-neutral-500">10 free replies. No credit card required.</p>
      </motion.div>
    </section>
  );
}
