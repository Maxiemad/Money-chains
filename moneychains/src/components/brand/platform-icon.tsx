import { getPlatform } from "@/data/platforms";
import { cn } from "@/lib/utils";

/**
 * Brand glyphs as initials-in-a-tinted-circle. Avoids depending on brand
 * icon packs (which lucide dropped) while staying recognizable and on-palette.
 */
const META: Record<string, { color: string; short: string }> = {
  pinterest: { color: "#E60023", short: "Pin" },
  blog: { color: "#02A37A", short: "Blg" },
  amazon_associates: { color: "#FF9900", short: "Amz" },
  instagram: { color: "#C13584", short: "Ig" },
  tiktok: { color: "#111111", short: "TT" },
  youtube: { color: "#FF0000", short: "YT" },
  shopify: { color: "#95BF47", short: "Shp" },
  stripe_connect: { color: "#635BFF", short: "Str" },
  gumroad: { color: "#FF90E8", short: "Gum" },
  substack: { color: "#FF6719", short: "Sub" },
  etsy: { color: "#F1641E", short: "Ets" },
  facebook: { color: "#1877F2", short: "Fb" },
  threads: { color: "#111111", short: "Th" },
  twitter: { color: "#111111", short: "X" },
  linkedin: { color: "#0A66C2", short: "In" },
  reddit: { color: "#FF4500", short: "Rd" },
  quora: { color: "#B92B27", short: "Qu" },
  twitch: { color: "#9146FF", short: "Tw" },
  snapchat: { color: "#FFFC00", short: "Sn" },
  medium: { color: "#111111", short: "Md" },
  notion: { color: "#111111", short: "No" },
  podcast: { color: "#8E44AD", short: "Pod" },
  clickbank: { color: "#1F7A3D", short: "CB" },
  impact_affiliate: { color: "#0E7C7B", short: "Imp" },
  flipkart_affiliate: { color: "#2874F0", short: "Flp" },
  ebay: { color: "#E53238", short: "eBy" },
  redbubble: { color: "#E41321", short: "RB" },
  printful: { color: "#0D9488", short: "Prf" },
  canva: { color: "#00C4CC", short: "Cnv" },
  teachable: { color: "#00A2E0", short: "Tch" },
  udemy: { color: "#A435F0", short: "Udm" },
  skillshare: { color: "#00FF84", short: "Sks" },
  fiverr: { color: "#1DBF73", short: "Fvr" },
  upwork: { color: "#14A800", short: "Upw" },
  beehiiv: { color: "#FFCB46", short: "Bee" },
  convertkit: { color: "#FB6970", short: "CK" },
  mailchimp: { color: "#FFE01B", short: "MC" },
  patreon: { color: "#FF424D", short: "Pat" },
  kofi: { color: "#FF5E5B", short: "Kfi" },
  discord: { color: "#5865F2", short: "Dsc" },
  telegram: { color: "#26A5E4", short: "Tg" },
  whatsapp: { color: "#25D366", short: "Wa" },
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
  const meta = META[platformId] ?? { color: "#5A6A85", short: "??" };
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white",
        className
      )}
      style={{
        width: size,
        height: size,
        background: meta.color,
        fontSize: size * 0.3,
      }}
      title={platform?.name ?? platformId}
      aria-label={platform?.name ?? platformId}
    >
      {meta.short}
    </span>
  );
}
