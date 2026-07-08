const steps = [
  {
    number: "01",
    title: "Open any email",
    description: "Click Reply on any message in a thread — even an older one, not just the latest.",
  },
  {
    number: "02",
    title: "Type what you mean",
    description: '"accept politely", "say no, but nicely" — plain English, no prompt engineering.',
  },
  {
    number: "03",
    title: "Insert and send",
    description: "One click drops the reply straight into your compose box. Edit if you want, then send.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
          How it works
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="text-sm font-semibold text-neutral-400 dark:text-neutral-600">
                {step.number}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-neutral-950 dark:text-neutral-50">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600 dark:text-neutral-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
