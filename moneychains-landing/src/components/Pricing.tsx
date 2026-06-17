import { useState } from "react";
import { SIGNUP_URL } from "../config";

type Plan = {
  tier: string;
  monthly: string;
  yearly: string;
  desc: string;
  features: string[];
  pro?: boolean;
};

const PLANS: Plan[] = [
  {
    tier: "Free",
    monthly: "₹0",
    yearly: "₹0",
    desc: "For anyone taking their first step toward online income.",
    features: [
      "1 active money chain",
      "50 AI content credits per month",
      "Manual publishing",
      "Earnings dashboard with attribution",
      "OAuth security — no passwords stored",
    ],
  },
  {
    tier: "Starter",
    monthly: "₹999/m",
    yearly: "₹9,990/y",
    desc: "For serious side-income builders who want more chains and automation.",
    features: [
      "3 active money chains",
      "500 AI content credits per month",
      "Automated publishing (100 runs)",
      "Full earnings analytics",
      "No watermark on output",
    ],
  },
  {
    tier: "Pro",
    monthly: "₹2,499/m",
    yearly: "₹24,990/y",
    desc: "For full-timers scaling multiple income engines at once.",
    pro: true,
    features: [
      "Unlimited active money chains",
      "2,500 AI content credits per month",
      "Automated publishing (500 runs)",
      "Advanced analytics + funnels",
      "Multi-account + priority support",
    ],
  },
];

function Check() {
  return (
    <span className="c3-check">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="c3-pricing-section relative z-10">
      {/* pricing-scoped noise filter (overlay watermark grain) */}
      <svg className="absolute w-0 h-0" aria-hidden>
        <filter id="c3-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" stitchTiles="stitch" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.075" />
          </feComponentTransfer>
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
        </filter>
      </svg>

      {/* giant watermark headline backdrop */}
      <div className="c3-watermark-container">
        <div className="c3-watermark-main">
          <span className="c3-watermark-line-1">Your skills.</span>
          <span className="c3-watermark-line-2">Monetized</span>
        </div>
      </div>

      <div className="c3-grid">
        {PLANS.map((plan) => (
          <div key={plan.tier} className={`c3-card ${plan.pro ? "c3-card-pro" : ""}`}>
            <div className="c3-tier-small">{plan.tier}</div>
            <div className="c3-tier-large">{yearly ? plan.yearly : plan.monthly}</div>
            <p className="c3-desc">{plan.desc}</p>
            <ul className="c3-list">
              {plan.features.map((f) => (
                <li key={f}>
                  <Check />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a className="c3-btn" href={SIGNUP_URL}>
              Choose plan
            </a>
          </div>
        ))}
      </div>

      <div className="c3-toggle-wrap">
        <span className="c3-toggle-label">Yearly</span>
        <button
          aria-label="Toggle yearly billing"
          className={`c3-toggle ${yearly ? "active" : ""}`}
          onClick={() => setYearly((v) => !v)}
        >
          <span className="c3-toggle-knob" />
        </button>
      </div>
    </section>
  );
}
