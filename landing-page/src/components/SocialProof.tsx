import { motion } from "framer-motion";

const points = [
  {
    stat: "10",
    label: "Free replies. No credit card, no signup wall.",
    rotate: -2,
  },
  {
    stat: "0",
    label: "Emails stored after your reply is sent. Nothing lingers on our servers.",
    rotate: 1.5,
  },
  {
    stat: "<2 min",
    label: "From installing the extension to your first AI-drafted reply.",
    rotate: -1,
  },
];

export function SocialProof() {
  return (
    <section className="border-y-2 border-neutral-950 bg-orange-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:grid-cols-3">
        {points.map((point) => (
          <motion.div
            key={point.label}
            initial={{ opacity: 0, y: 16, rotate: point.rotate }}
            whileInView={{ opacity: 1, y: 0, rotate: point.rotate }}
            whileHover={{ rotate: 0, scale: 1.03 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border-2 border-neutral-950 bg-white p-5 text-center shadow-hard sm:text-left"
          >
            <p className="font-marker text-4xl font-bold text-orange-600">{point.stat}</p>
            <p className="mt-1.5 text-sm leading-relaxed font-semibold text-neutral-700">{point.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
