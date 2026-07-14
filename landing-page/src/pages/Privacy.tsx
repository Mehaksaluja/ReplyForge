function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="font-marker text-xl font-bold text-neutral-950">{title}</h2>
      <div className="mt-2 space-y-3 text-neutral-600">{children}</div>
    </section>
  );
}

export function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <a href="/" className="font-logo text-xl font-bold tracking-tight text-neutral-950">
          ReplyForge
        </a>

        <h1 className="mt-8 font-marker text-3xl font-bold text-neutral-950">Privacy Policy</h1>
        <p className="mt-2 text-sm text-neutral-500">Last updated July 14, 2026</p>

        <p className="mt-6 text-neutral-600">
          ReplyForge is a Chrome extension that adds an AI chat panel inside Gmail so you can draft
          replies by describing what you want to say. This page explains what data the extension
          accesses, what we do with it, and what we don't do with it.
        </p>

        <Section title="What we access">
          <p>
            When you open the ReplyForge panel and ask it to draft or explain a reply, we read the
            text of the Gmail thread you're viewing — the subject, sender, and message bodies of the
            email(s) needed to generate a relevant reply.
          </p>
          <p>
            We also use your Google account identity to sign you in and to check your subscription
            status, via the <code className="text-neutral-800">userinfo.email</code> and{" "}
            <code className="text-neutral-800">userinfo.profile</code> OAuth scopes — this gives us
            your email address and basic profile info only, nothing else from your Google account.
          </p>
        </Section>

        <Section title="What we do with it">
          <p>
            Thread text you ask ReplyForge to act on is sent to our backend server and forwarded to
            OpenAI's API to generate a reply. This happens only when you actively trigger a request
            in the panel — ReplyForge does not read or transmit your inbox in the background.
          </p>
          <p>
            We store your Google account email and subscription status (free or Pro) so we can
            enforce reply limits and billing. We do not store the content of your emails or the
            replies generated for you.
          </p>
        </Section>

        <Section title="What we don't do">
          <p>
            We don't sell your data. We don't use your email content for advertising. We don't share
            your data with anyone other than the service providers required to run ReplyForge
            (OpenAI for generating replies, and our payment processor for billing).
          </p>
        </Section>

        <Section title="Third-party services">
          <p>
            <span className="font-semibold text-neutral-800">OpenAI</span> processes thread text to
            generate replies, subject to{" "}
            <a
              href="https://openai.com/policies/privacy-policy"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-orange-600 underline"
            >
              OpenAI's privacy policy
            </a>
            .
          </p>
          <p>
            <span className="font-semibold text-neutral-800">Google Sign-In</span> is used to
            identify your account; we only request your email address and basic profile info.
          </p>
          <p>
            <span className="font-semibold text-neutral-800">Dodo Payments</span> processes
            subscription payments; we don't see or store your card details.
          </p>
        </Section>

        <Section title="Data retention">
          <p>
            Account records (email, subscription status) are kept for as long as you have an
            account. Email thread content sent for reply generation is not retained by ReplyForge
            after the request completes.
          </p>
        </Section>

        <Section title="Your choices">
          <p>
            You can stop all data access at any time by removing the ReplyForge extension from
            Chrome. To request deletion of your account record, contact us at the email below.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about this policy? Reach out at{" "}
            <a href="mailto:salujamehak05@gmail.com" className="font-semibold text-orange-600 underline">
              salujamehak05@gmail.com
            </a>
            .
          </p>
        </Section>
      </div>
    </div>
  );
}
