import { PanelMockup } from "./PanelMockup";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 flex justify-center blur-3xl"
      >
        <div className="h-[420px] w-[720px] rounded-full bg-neutral-200/60 dark:bg-neutral-800/40" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-20 md:grid-cols-2 md:py-28">
        <div>
          <span className="inline-block rounded-full border border-neutral-200 px-3 py-1 text-xs font-semibold tracking-wide text-neutral-600 uppercase dark:border-neutral-800 dark:text-neutral-400">
            AI email assistant for Gmail
          </span>

          <h1 className="mt-6 text-4xl leading-[1.1] font-semibold tracking-tight text-neutral-950 sm:text-5xl dark:text-neutral-50">
            Reply to emails without leaving Gmail.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            ReplyForge is a chat panel that lives right inside Gmail. Tell it what to
            say — "reject politely", "tell them I'll send it Friday" — and it writes
            the reply. No more copy-pasting into ChatGPT.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#"
              className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-950 dark:hover:bg-neutral-200"
            >
              Add to Chrome — Free
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-semibold text-neutral-950 underline underline-offset-4 dark:text-neutral-50"
            >
              See how it works
            </a>
          </div>

          <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-500">
            10 free replies to start. No credit card required.
          </p>
        </div>

        <div className="flex justify-center md:justify-end">
          <PanelMockup />
        </div>
      </div>
    </section>
  );
}
