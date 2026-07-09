import { motion } from "framer-motion";

const faqs = [
  {
    question: "Why not just use ChatGPT?",
    answer:
      "You can, but then you're copying the email over, writing a prompt to explain who it's from, copying the reply back, and doing it all again for the next one. ReplyForge already sees the thread. You just say what you want and it's ready to insert.",
  },
  {
    question: "Is my email data stored anywhere?",
    answer:
      "No. ReplyForge only sends the thread text needed to generate a reply. Nothing is stored on our servers.",
  },
  {
    question: "Does it work with any Gmail account?",
    answer: "Yes. Personal Gmail or Google Workspace, right in your browser.",
  },
  {
    question: "What happens after my 10 free replies?",
    answer:
      "You'll see an upgrade prompt right in the panel. Upgrade to keep going with unlimited replies.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, anytime. No questions asked.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="border-b-2 border-neutral-950">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <span className="font-marker text-sm font-bold text-orange-600 uppercase">
          FAQ
        </span>
        <h2 className="mt-1 font-marker text-4xl font-bold text-neutral-950">
          Frequently asked questions
        </h2>

        <div className="mt-10 flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <details className="group rounded-2xl border-2 border-neutral-950 bg-white p-5 shadow-hard">
                <summary className="flex cursor-pointer list-none items-center justify-between text-base font-bold text-neutral-950">
                  {faq.question}
                  <span className="ml-4 shrink-0 font-marker text-2xl text-orange-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-neutral-600">
                  {faq.answer}
                </p>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
