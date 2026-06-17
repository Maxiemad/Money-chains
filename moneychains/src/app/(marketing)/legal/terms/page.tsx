import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — MoneyChains",
  description:
    "The terms that govern your use of MoneyChains. Tools and proven workflows — never a guarantee of income.",
};

export default function TermsPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="border-b border-line bg-cloud py-16">
        <div className="mx-auto max-w-3xl px-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-teal">
            Legal
          </p>
          <h1 className="font-display text-4xl font-semibold text-navy sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-muted">Last updated: June 2026</p>
        </div>
      </section>

      {/* Body */}
      <article className="mx-auto max-w-3xl px-5 py-14">
        <p className="text-base leading-relaxed text-muted">
          Welcome to MoneyChains. These Terms of Service (the &ldquo;Terms&rdquo;)
          are a binding agreement between you and MoneyChains (&ldquo;we&rdquo;,
          &ldquo;us&rdquo;, &ldquo;our&rdquo;) covering your use of our website,
          apps, and services (together, the &ldquo;Service&rdquo;). Please read
          them carefully — by using the Service you agree to them.
        </p>

        <div className="mt-10 space-y-10">
          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              1. Acceptance of these terms
            </h2>
            <p className="text-base leading-relaxed text-muted">
              By creating an account, accessing, or using the Service, you
              confirm that you have read, understood, and agree to be bound by
              these Terms and our{" "}
              <a
                href="/legal/privacy"
                className="font-medium text-teal hover:underline"
              >
                Privacy Policy
              </a>
              . If you are using the Service on behalf of an organisation, you
              represent that you have authority to bind that organisation. If you
              do not agree, please do not use the Service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              2. What MoneyChains is — and is not
            </h2>
            <p className="text-base leading-relaxed text-muted">
              MoneyChains provides software tools, templates, and guided
              workflows (&ldquo;money chains&rdquo;) that help you connect online
              platforms, draft content, publish it, and track results in one
              place. We give you a clearer path and remove busywork.
            </p>
            <p className="rounded-xl border border-line bg-cloud p-4 text-base font-medium leading-relaxed text-navy">
              MoneyChains does not promise, guarantee, or warrant any level of
              income, earnings, sales, or results. Any figures, ranges, or
              examples shown anywhere in the Service are illustrative only.
              Outcomes depend on your niche, effort, consistency, market
              conditions, and factors outside our control. We are a toolset and a
              set of workflows — not an income guarantee.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              3. Your account
            </h2>
            <p className="text-base leading-relaxed text-muted">
              You must provide accurate information and keep it up to date. You
              are responsible for safeguarding your login credentials and for all
              activity under your account. You must be at least 18 years old (or
              the age of majority in your jurisdiction) to use the Service. Notify
              us promptly at{" "}
              <a
                href="mailto:support@moneychains.app"
                className="font-medium text-teal hover:underline"
              >
                support@moneychains.app
              </a>{" "}
              if you suspect any unauthorised use.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              4. Acceptable use
            </h2>
            <p className="text-base leading-relaxed text-muted">
              You agree not to use the Service to:
            </p>
            <ul className="space-y-2 pl-5 text-base leading-relaxed text-muted">
              <li className="list-disc">
                Break the law, infringe others&apos; intellectual property, or
                violate anyone&apos;s privacy.
              </li>
              <li className="list-disc">
                Publish spam, deceptive, misleading, or fraudulent content, or
                content that misrepresents an affiliate or sponsorship
                relationship.
              </li>
              <li className="list-disc">
                Reverse-engineer, scrape, overload, or attempt to gain
                unauthorised access to the Service or its systems.
              </li>
              <li className="list-disc">
                Resell or white-label the Service except where your plan
                explicitly permits it.
              </li>
            </ul>
            <p className="text-base leading-relaxed text-muted">
              You are responsible for disclosing affiliate relationships and for
              following applicable advertising and consumer-protection laws in
              your region.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              5. Third-party platform connections
            </h2>
            <p className="text-base leading-relaxed text-muted">
              MoneyChains connects to third-party platforms (for example
              Pinterest, your blog host, marketplaces, and email tools), usually
              through official OAuth flows. These platforms are independent of us
              and governed by their own terms.
            </p>
            <p className="text-base leading-relaxed text-muted">
              You are solely responsible for complying with the terms of service,
              policies, and program rules of every platform you connect — including
              affiliate-program and content-publishing rules. We are not
              responsible if a platform suspends, restricts, or changes your
              access, its API, or its policies. You can disconnect any platform at
              any time, which revokes our stored access tokens for it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              6. Billing, subscriptions &amp; cancellation
            </h2>
            <p className="text-base leading-relaxed text-muted">
              Paid plans are billed in advance on a monthly or annual basis
              through our payment processor. By starting a paid plan you authorise
              us to charge the applicable fees, including taxes, on a recurring
              basis until you cancel.
            </p>
            <p className="text-base leading-relaxed text-muted">
              You can cancel anytime from your account settings. Cancellation
              stops future renewals; you keep paid access until the end of the
              period you have already paid for, after which your account moves to
              the Free plan. Upgrades take effect immediately and are pro-rated;
              downgrades take effect at the next renewal. We do not bill surprise
              overages — if you reach a usage limit, the affected capability
              pauses until your next cycle or until you upgrade. If we ever change
              prices, we will give you reasonable advance notice. Except where
              required by law or stated in our refund practice, fees already paid
              are non-refundable.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              7. Intellectual property
            </h2>
            <p className="text-base leading-relaxed text-muted">
              The Service, including its software, templates, and branding, is
              owned by MoneyChains and protected by law. We grant you a limited,
              non-exclusive, non-transferable licence to use it under these Terms.
              Content you create or generate through the Service belongs to you;
              you grant us only the limited rights needed to operate, secure, and
              improve the Service and to publish on your behalf when you ask us to.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              8. Disclaimers
            </h2>
            <p className="text-base leading-relaxed text-muted">
              The Service is provided &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; without warranties of any kind, whether express or
              implied, including merchantability, fitness for a particular
              purpose, and non-infringement. We do not warrant that the Service
              will be uninterrupted, error-free, or that any result, ranking, or
              earning will be achieved. AI-generated content may contain errors;
              you are responsible for reviewing and approving everything before it
              is published.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              9. Limitation of liability
            </h2>
            <p className="text-base leading-relaxed text-muted">
              To the maximum extent permitted by law, MoneyChains and its team
              will not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or for any loss of profits,
              revenue, data, or goodwill, arising from your use of (or inability
              to use) the Service. Our total liability for any claim relating to
              the Service is limited to the amount you paid us in the twelve months
              before the event giving rise to the claim. Some jurisdictions do not
              allow certain limitations, so some of these may not apply to you.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              10. Termination
            </h2>
            <p className="text-base leading-relaxed text-muted">
              You may stop using the Service and delete your account at any time
              from your settings. We may suspend or terminate your access if you
              materially breach these Terms, misuse the Service, or where required
              by law. On termination, your right to use the Service ends; sections
              that by their nature should survive (such as disclaimers, liability
              limits, and ownership) will continue to apply.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              11. Changes to these terms
            </h2>
            <p className="text-base leading-relaxed text-muted">
              We may update these Terms from time to time. If we make material
              changes, we will notify you (for example by email or an in-app
              notice) and update the &ldquo;Last updated&rdquo; date above.
              Continuing to use the Service after changes take effect means you
              accept the revised Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-navy">
              12. Contact
            </h2>
            <p className="text-base leading-relaxed text-muted">
              Questions about these Terms? Reach us at{" "}
              <a
                href="mailto:hello@moneychains.app"
                className="font-medium text-teal hover:underline"
              >
                hello@moneychains.app
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
