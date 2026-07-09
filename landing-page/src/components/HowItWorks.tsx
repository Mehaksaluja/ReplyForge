import { motion } from "framer-motion";
import { DoodleArrow } from "./Doodles";

const steps = [
  {
    number: "01",
    title: "Open any email",
    description: "Click Reply on any message in a thread, even an older one, not just the latest.",
  },
  {
    number: "02",
    title: "Type what you mean",
    description: "'accept politely', 'say no, but nicely'. Plain English, no prompt engineering needed.",
  },
  {
    number: "03",
    title: "Insert and send",
    description: "One click drops the reply straight into your compose box. Edit if you want, then send.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b-2 border-neutral-950">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <span className="font-marker text-sm font-bold text-orange-600 uppercase">
          Process
        </span>
        <h2 className="mt-1 font-marker text-4xl font-bold text-neutral-950">
          How it works
        </h2>

        <div className="relative mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          <DoodleArrow className="absolute top-2 left-[29%] hidden h-14 w-20 -rotate-3 text-neutral-300 md:block" />
          <DoodleArrow className="absolute top-2 left-[63%] hidden h-14 w-20 -rotate-3 text-neutral-300 md:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border-2 border-neutral-950 bg-white p-6 shadow-hard"
            >
              <span className="font-marker text-2xl font-bold text-orange-600">
                {step.number}
              </span>
              <h3 className="mt-2 text-lg font-bold text-neutral-950">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
