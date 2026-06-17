import {
  siPinterest,
  siInstagram,
  siTiktok,
  siYoutube,
  siFacebook,
  siThreads,
  siX,
  siReddit,
  siQuora,
  siTwitch,
  siSnapchat,
  siMedium,
  siNotion,
  siShopify,
  siStripe,
  siGumroad,
  siSubstack,
  siEtsy,
  siEbay,
  siUdemy,
  siSkillshare,
  siFiverr,
  siUpwork,
  siMailchimp,
  siPatreon,
  siKofi,
  siDiscord,
  siTelegram,
  siWhatsapp,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import { getPlatform } from "@/data/platforms";
import { cn } from "@/lib/utils";

/**
 * Real brand glyphs from the bundled `simple-icons` set (offline, no CDN).
 * Each renders as the brand SVG on a tinted circle of its brand color.
 * Platforms without a brand mark (blog, podcast, affiliate networks) fall
 * back to initials-in-a-circle.
 */
const ICONS: Record<string, SimpleIcon> = {
  pinterest: siPinterest,
  instagram: siInstagram,
  tiktok: siTiktok,
  youtube: siYoutube,
  facebook: siFacebook,
  threads: siThreads,
  twitter: siX,
  reddit: siReddit,
  quora: siQuora,
  twitch: siTwitch,
  snapchat: siSnapchat,
  medium: siMedium,
  notion: siNotion,
  shopify: siShopify,
  stripe_connect: siStripe,
  gumroad: siGumroad,
  substack: siSubstack,
  etsy: siEtsy,
  ebay: siEbay,
  udemy: siUdemy,
  skillshare: siSkillshare,
  fiverr: siFiverr,
  upwork: siUpwork,
  mailchimp: siMailchimp,
  patreon: siPatreon,
  kofi: siKofi,
  discord: siDiscord,
  telegram: siTelegram,
  whatsapp: siWhatsapp,
};

// Brand colors + initials for platforms without a simple-icons glyph.
const FALLBACK: Record<string, { color: string; short: string }> = {
  amazon_associates: { color: "#FF9900", short: "Amz" },
  linkedin: { color: "#0A66C2", short: "in" },
  canva: { color: "#00C4CC", short: "Cnv" },
  blog: { color: "#7C3AED", short: "Blg" },
  podcast: { color: "#8E44AD", short: "Pod" },
  clickbank: { color: "#1F7A3D", short: "CB" },
  impact_affiliate: { color: "#0E7C7B", short: "Imp" },
  flipkart_affiliate: { color: "#2874F0", short: "Flp" },
  redbubble: { color: "#E41321", short: "RB" },
  printful: { color: "#0D9488", short: "Prf" },
  teachable: { color: "#00A2E0", short: "Tch" },
  beehiiv: { color: "#FFCB46", short: "Bee" },
  convertkit: { color: "#FB6970", short: "CK" },
};

export function PlatformIcon({
  platformId,
  size = 36,
  className,
}: {
  platformId: string;
  size?: number;
  className?: string;
}) {
  const platform = getPlatform(platformId);
  const label = platform?.name ?? platformId;
  const icon = ICONS[platformId];

  if (icon) {
    const color = `#${icon.hex}`;
    return (
      <span
        className={cn("inline-flex shrink-0 items-center justify-center rounded-full", className)}
        style={{ width: size, height: size, background: `${color}22` }}
        title={label}
        aria-label={label}
      >
        <svg
          role="img"
          viewBox="0 0 24 24"
          width={size * 0.5}
          height={size * 0.5}
          fill={color}
          aria-hidden
        >
          <path d={icon.path} />
        </svg>
      </span>
    );
  }

  const fb = FALLBACK[platformId] ?? { color: "#5A6A85", short: "??" };
  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center rounded-full font-semibold", className)}
      style={{
        width: size,
        height: size,
        background: `${fb.color}22`,
        color: fb.color,
        fontSize: size * 0.3,
      }}
      title={label}
      aria-label={label}
    >
      {fb.short}
    </span>
  );
}
