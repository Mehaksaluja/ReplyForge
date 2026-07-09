const faqs = [
  {
    question: "Is my email data stored anywhere?",
    answer:
      "No. ReplyForge sends only the thread text needed to generate a reply — nothing is stored on our servers.",
  },
  {
    question: "Does it work with any Gmail account?",
    answer: "Yes — personal Gmail or Google Workspace, right in your browser.",
  },
  {
    question: "What happens after my 10 free replies?",
    answer:
      "You'll see an upgrade prompt right in the panel. Upgrade to keep going with unlimited replies.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, anytime — no questions asked.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
          Frequently asked questions
        </h2>

        <div className="mt-10 flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-base font-medium text-neutral-950 dark:text-neutral-50">
                {faq.question}
                <span className="ml-4 text-xl text-neutral-400 transition-transform group-open:rotate-45 dark:text-neutral-600">
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-400">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
