import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — MoneyChains",
  description:
    "How MoneyChains collects, uses, and protects your data. OAuth tokens are stored encrypted — we never store your platform passwords.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="border-b border-line bg-cloud py-16">
        <div className="mx-auto max-w-3xl px-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-teal">
            Legal
          </p>
          <h1 className="font-display text-4xl font-semibold text-navy sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-muted">Last updated: June 2026</p>
        </div>
      </section>

      {/* Body */}
      <article className="mx-auto max-w-3xl px-5 py-14">
        <p className="text-base leading-relaxed text-muted">
          This Privacy Policy explains what MoneyChains (&ldquo;we&rdquo;,
          &ldquo;us&rdquo;, &ldquo;our&rdquo;) collects, why we collect it, and the
          control you have over your data. We try to collect as little as we need
          and to be plain-spoken about the rest.
        </p>

        <div className="mt-10 space-y-10">
          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              1. What we collect
            </h2>
            <ul className="space-y-2 pl-5 text-base leading-relaxed text-muted">
              <li className="list-disc">
                <span className="font-medium text-navy">Account data</span> — your
                name, email, and password (stored only as a salted hash, never in
                plain text).
              </li>
              <li className="list-disc">
                <span className="font-medium text-navy">
                  Platform connection tokens
                </span>{" "}
                — when you connect a platform via OAuth, we receive access and
                refresh tokens. See section 2.
              </li>
              <li className="list-disc">
                <span className="font-medium text-navy">Product data</span> — the
                chains you start, content you generate, and earnings you log or
                that we track via attribution links.
              </li>
              <li className="list-disc">
                <span className="font-medium text-navy">Usage &amp; device data</span>{" "}
                — basic analytics such as pages viewed, actions taken, browser
                type, and approximate location, used to keep the Service working
                and to improve it.
              </li>
              <li className="list-disc">
                <span className="font-medium text-navy">Billing data</span> —
                handled by our payment processor; we store only what we need to
                manage your subscription (we do not store full card numbers).
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              2. OAuth tokens — encrypted, never passwords
            </h2>
            <p className="rounded-xl border border-line bg-cloud p-4 text-base font-medium leading-relaxed text-navy">
              We never ask for or store your passwords to third-party platforms.
              Connections are made through official OAuth flows. The access and
              refresh tokens we receive are encrypted at rest, scoped to only the
              permissions a chain needs, and revocable by you at any time — one
              click disconnects a platform and invalidates the stored tokens.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              3. How we use your data
            </h2>
            <ul className="space-y-2 pl-5 text-base leading-relaxed text-muted">
              <li className="list-disc">
                To provide the Service: run your chains, generate content you
                approve, publish on your behalf, and track results.
              </li>
              <li className="list-disc">
                To secure accounts, prevent abuse, and meet legal obligations.
              </li>
              <li className="list-disc">
                To communicate with you about your account, important changes, and
                — only with your consent — product updates.
              </li>
              <li className="list-disc">
                To understand and improve the Service in aggregate. We do not sell
                your personal data, and we do not use your private content to train
                third-party AI models without your explicit consent.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              4. Third parties &amp; sub-processors
            </h2>
            <p className="text-base leading-relaxed text-muted">
              We share data with a small set of trusted service providers who help
              us operate — for example cloud hosting, our payment processor,
              transactional email, error monitoring, and AI content providers.
              They process data only on our instructions and under contract. We
              also share the platforms you connect, by design, to publish and track
              on your behalf. We may disclose data where required by law or to
              protect rights and safety.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              5. Cookies &amp; consent
            </h2>
            <p className="text-base leading-relaxed text-muted">
              We use essential cookies to keep you signed in and the Service
              functioning. With your consent, we use a limited set of analytics
              cookies to understand usage. You can accept or decline non-essential
              cookies via our consent banner and change your choice at any time in
              your settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              6. Security
            </h2>
            <p className="text-base leading-relaxed text-muted">
              We protect your data with encryption in transit (TLS) and at rest,
              encrypted OAuth-token storage, hashed passwords, access controls, and
              regular review of our systems. No method of transmission or storage
              is perfectly secure, but we work hard to safeguard your information
              and will notify you and the relevant authorities of a qualifying
              breach as required by law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              7. Data retention
            </h2>
            <p className="text-base leading-relaxed text-muted">
              We keep your data for as long as your account is active or as needed
              to provide the Service. When you delete your account, we delete or
              irreversibly anonymise your personal data within a reasonable period,
              except where we must retain certain records (for example billing and
              tax records) to comply with the law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              8. Your rights (GDPR &amp; India DPDP)
            </h2>
            <p className="text-base leading-relaxed text-muted">
              Wherever you live, and in particular under the EU/UK GDPR and
              India&apos;s Digital Personal Data Protection Act, you have the right
              to:
            </p>
            <ul className="space-y-2 pl-5 text-base leading-relaxed text-muted">
              <li className="list-disc">
                <span className="font-medium text-navy">Access</span> the personal
                data we hold about you.
              </li>
              <li className="list-disc">
                <span className="font-medium text-navy">Export</span> your data in
                a portable format.
              </li>
              <li className="list-disc">
                <span className="font-medium text-navy">Correct</span> inaccurate or
                incomplete data.
              </li>
              <li className="list-disc">
                <span className="font-medium text-navy">Delete</span> your data and
                close your account.
              </li>
              <li className="list-disc">
                Withdraw consent, object to certain processing, and where
                applicable nominate someone to exercise these rights on your behalf.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              9. How to export or delete your data
            </h2>
            <p className="text-base leading-relaxed text-muted">
              You can export a copy of your data or permanently delete your account
              yourself at any time from{" "}
              <a
                href="/app/settings"
                className="font-medium text-teal hover:underline"
              >
                Settings
              </a>
              . Prefer we do it for you? Email{" "}
              <a
                href="mailto:privacy@moneychains.app"
                className="font-medium text-teal hover:underline"
              >
                privacy@moneychains.app
              </a>{" "}
              and we&apos;ll action your request, free of charge, within the
              timeframes required by law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              10. Children
            </h2>
            <p className="text-base leading-relaxed text-muted">
              MoneyChains is not intended for anyone under 18, and we do not
              knowingly collect personal data from children. If you believe a child
              has provided us data, contact us and we will delete it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              11. Changes to this policy
            </h2>
            <p className="text-base leading-relaxed text-muted">
              We may update this policy as the Service evolves. If we make material
              changes, we&apos;ll notify you and update the &ldquo;Last
              updated&rdquo; date above.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              12. Contact
            </h2>
            <p className="text-base leading-relaxed text-muted">
              For any privacy question or to exercise your rights, reach our team at{" "}
              <a
                href="mailto:privacy@moneychains.app"
                className="font-medium text-teal hover:underline"
              >
                privacy@moneychains.app
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
