function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function PlanFeature({ children }: { children: string }) {
  return (
    <li className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
      <CheckIcon />
      {children}
    </li>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
          Simple pricing
        </h2>
        <p className="mt-3 max-w-lg text-neutral-600 dark:text-neutral-400">
          Start free. Upgrade only when you're actually using it enough to need to.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 p-8 dark:border-neutral-800">
            <h3 className="text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-500">
              Free
            </h3>
            <p className="mt-4 text-4xl font-semibold text-neutral-950 dark:text-neutral-50">$0</p>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-500">10 replies, forever</p>

            <ul className="mt-8 flex flex-col gap-3">
              <PlanFeature>Full thread context awareness</PlanFeature>
              <PlanFeature>Insert reply directly into Gmail</PlanFeature>
              <PlanFeature>Keyboard shortcut</PlanFeature>
              <PlanFeature>Dark mode</PlanFeature>
            </ul>

            <a
              href="#"
              className="mt-8 block rounded-full border border-neutral-950 px-6 py-3 text-center text-sm font-semibold text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white dark:border-neutral-50 dark:text-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-950"
            >
              Add to Chrome — Free
            </a>
          </div>

          <div className="relative rounded-2xl border border-neutral-950 bg-neutral-950 p-8 text-white dark:border-neutral-50 dark:bg-neutral-50 dark:text-neutral-950">
            <span className="absolute -top-3 right-8 rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50">
              Most popular
            </span>

            <h3 className="text-sm font-semibold tracking-wide text-neutral-400 uppercase dark:text-neutral-600">
              Pro
            </h3>
            <p className="mt-4 text-4xl font-semibold">
              $7<span className="text-lg font-medium text-neutral-400 dark:text-neutral-600">/month</span>
            </p>
            <p className="mt-1 text-sm text-neutral-400 dark:text-neutral-600">Unlimited replies</p>

            <ul className="mt-8 flex flex-col gap-3">
              <li className="flex items-start gap-2 text-sm text-neutral-300 dark:text-neutral-700">
                <CheckIcon />
                Everything in Free
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-300 dark:text-neutral-700">
                <CheckIcon />
                Unlimited AI replies
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-300 dark:text-neutral-700">
                <CheckIcon />
                Cancel anytime
              </li>
            </ul>

            <a
              href="#"
              className="mt-8 block rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-neutral-950 transition-colors hover:bg-neutral-200 dark:bg-neutral-950 dark:text-neutral-50 dark:hover:bg-neutral-800"
            >
              Add to Chrome — Free
            </a>
            <p className="mt-3 text-center text-xs text-neutral-400 dark:text-neutral-600">
              Upgrade anytime from within the extension.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
