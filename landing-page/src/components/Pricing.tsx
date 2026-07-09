import { motion } from "framer-motion";

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function PlanFeature({ children }: { children: string }) {
  return (
    <li className="flex items-start gap-2 text-sm font-semibold text-neutral-600">
      <CheckIcon />
      {children}
    </li>
  );
}

const ctaClass =
  "mt-8 block rounded-full border-2 border-neutral-950 px-6 py-3 text-center text-sm font-bold transition-all hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none";

export function Pricing() {
  return (
    <section id="pricing" className="border-b-2 border-neutral-950">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <span className="font-marker text-sm font-bold text-orange-600 uppercase">
          Pricing
        </span>
        <h2 className="mt-1 font-marker text-4xl font-bold text-neutral-950">
          Simple pricing
        </h2>
        <p className="mt-3 max-w-lg text-neutral-600">
          Start free. Upgrade only once ReplyForge is doing the heavy lifting for you.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
            whileHover={{ rotate: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border-2 border-neutral-950 bg-white p-8 shadow-hard"
          >
            <h3 className="font-marker text-sm font-bold tracking-wide text-neutral-500 uppercase">
              Free
            </h3>
            <p className="mt-4 text-4xl font-bold text-neutral-950">$0</p>
            <p className="mt-1 text-sm font-semibold text-neutral-500">10 replies, forever</p>

            <ul className="mt-8 flex flex-col gap-3">
              <PlanFeature>Knows the whole thread</PlanFeature>
              <PlanFeature>Insert reply directly into Gmail</PlanFeature>
              <PlanFeature>Keyboard shortcut</PlanFeature>
              <PlanFeature>Dark mode</PlanFeature>
            </ul>

            <a href="#" className={`${ctaClass} bg-white text-neutral-950 shadow-hard hover:shadow-[2px_2px_0_0_#0a0a0a]`}>
              Add to Chrome - Free
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 1.5 }}
            whileHover={{ rotate: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative rounded-2xl border-2 border-neutral-950 bg-neutral-950 p-8 text-white shadow-hard-orange"
          >
            <span className="absolute -top-4 right-8 -rotate-3 rounded-full border-2 border-neutral-950 bg-orange-600 px-3 py-1 font-marker text-xs font-bold text-white shadow-hard">
              Most popular
            </span>

            <h3 className="font-marker text-sm font-bold tracking-wide text-neutral-400 uppercase">
              Pro
            </h3>
            <p className="mt-4 text-4xl font-bold">
              $7<span className="text-lg font-medium text-neutral-400">/month</span>
            </p>
            <p className="mt-1 text-sm font-semibold text-neutral-400">Unlimited replies</p>

            <ul className="mt-8 flex flex-col gap-3">
              <li className="flex items-start gap-2 text-sm font-semibold text-neutral-300">
                <CheckIcon />
                Everything in Free
              </li>
              <li className="flex items-start gap-2 text-sm font-semibold text-neutral-300">
                <CheckIcon />
                Unlimited AI replies
              </li>
              <li className="flex items-start gap-2 text-sm font-semibold text-neutral-300">
                <CheckIcon />
                Cancel anytime
              </li>
            </ul>

            <a href="#" className={`${ctaClass} bg-orange-600 text-white shadow-hard hover:shadow-[2px_2px_0_0_#0a0a0a]`}>
              Add to Chrome - Free
            </a>
            <p className="mt-3 text-center text-xs text-neutral-400">
              Upgrade anytime from within the extension.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
