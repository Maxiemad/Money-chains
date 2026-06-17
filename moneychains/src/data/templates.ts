import type { ChainTemplate } from "@/lib/types";
import { EXTRA_TEMPLATES } from "./templates-extra";

/**
 * Chain templates are DATA, not code. Adding a new chain = adding an object
 * here (or a row in the `chain_templates` table). Nothing in the UI is
 * hardcoded to a specific chain.
 *
 * The flagship — Pinterest → Blog → Amazon Affiliate — is fully specified
 * with real, ordered steps that drive the guided workspace end to end.
 *
 * The 6 hand-built flagship-quality chains below are combined with
 * EXTRA_TEMPLATES (see templates-extra.ts) for 50+ total in the marketplace.
 */
const BASE_TEMPLATES: ChainTemplate[] = [
  {
    id: "tpl_pin_blog_amazon",
    slug: "pinterest-blog-amazon",
    name: "Pinterest → Blog → Amazon Affiliate",
    tagline: "Turn Pinterest traffic into affiliate commissions on autopilot.",
    description:
      "The classic, proven affiliate engine. You publish helpful blog posts in a niche, drive free traffic to them with Pinterest pins, and earn commissions when readers buy the products you recommend on Amazon. MoneyChains writes the posts and pins, schedules them, and tracks every sale back to the pin that drove it.",
    category: "Affiliate",
    flow: ["pinterest", "blog", "amazon_associates"],
    requiredConnections: ["pinterest", "blog", "amazon_associates"],
    effort: "3–4 hrs / week",
    difficulty: "Beginner",
    timeToFirstEarning: "Typically 3–6 weeks of consistent posting",
    earningRange: "₹2,000–₹40,000 / mo (varies widely by niche & effort)",
    automated: true,
    proven: true,
    steps: [
      {
        id: "s_niche",
        title: "Pick your niche & topic",
        description:
          "Choose a focused topic you can write helpfully about — e.g. 'budget home office setups' or 'monsoon skincare'. Narrow beats broad.",
        action: "manual_task",
        required: true,
        help: "A good niche has buyable products on Amazon and an audience that searches Pinterest for ideas. Avoid 'everything' niches.",
      },
      {
        id: "s_connect_amazon",
        title: "Connect Amazon Associates",
        description:
          "Paste your Amazon Associates tracking ID so we can build correctly-tagged affiliate links and attribute your sales.",
        platformId: "amazon_associates",
        action: "connect_account",
        required: true,
        help: "You only share your Associates *tag* (e.g. yourtag-21), never a password. Don't have one? We link you to sign up — approval is free.",
      },
      {
        id: "s_connect_blog",
        title: "Connect your blog",
        description:
          "Use the MoneyChains-hosted blog (instant) or connect your own WordPress. This is where posts get published.",
        platformId: "blog",
        action: "connect_account",
        required: true,
        help: "The hosted blog is SEO-ready and free on every plan. You can point a custom domain later.",
      },
      {
        id: "s_write_post",
        title: "Generate your first blog post",
        description:
          "We draft a genuinely useful, SEO-aware post for your topic. You review and edit it before anything goes live.",
        platformId: "blog",
        action: "create_content",
        required: true,
        help: "Edit freely — the best-earning posts add your real opinion and experience on top of the draft.",
      },
      {
        id: "s_insert_links",
        title: "Insert affiliate links",
        description:
          "We detect product mentions and insert your correctly-tagged Amazon links with UTM attribution.",
        platformId: "amazon_associates",
        action: "insert_affiliate_link",
        required: true,
        help: "Every link carries your Associates tag + a chain UTM so each sale is traced back to the exact post and pin.",
      },
      {
        id: "s_publish_blog",
        title: "Publish the post",
        description: "Push the approved post live to your blog.",
        platformId: "blog",
        action: "publish",
        required: true,
        help: "Published posts get a public URL you can share anywhere — not just Pinterest.",
      },
      {
        id: "s_connect_pinterest",
        title: "Connect Pinterest",
        description:
          "Securely connect Pinterest via OAuth so we can publish pins for you. We never see your password.",
        platformId: "pinterest",
        action: "connect_account",
        required: true,
        help: "OAuth means Pinterest hands us a revocable token. Disconnect any time from Connections.",
      },
      {
        id: "s_make_pins",
        title: "Generate & schedule 5 pins",
        description:
          "We create 5 pin designs with titles and descriptions that link to your post, and schedule them across the week.",
        platformId: "pinterest",
        action: "publish",
        required: true,
        help: "Consistency wins on Pinterest. Scheduling spreads pins so the algorithm keeps testing them.",
      },
      {
        id: "s_track",
        title: "Track clicks & earnings",
        description:
          "Watch pin clicks → blog visits → Amazon sales roll into your dashboard. Log any sale the API hasn't synced yet.",
        action: "track",
        required: false,
        help: "Amazon reports sales on a delay. You can log a sale manually and we'll reconcile when the API confirms it.",
      },
    ],
  },
  {
    id: "tpl_yt_digital",
    slug: "youtube-leadmagnet-digital-product",
    name: "YouTube → Lead Magnet → Digital Product",
    tagline: "Teach on YouTube, capture emails, sell a digital product.",
    description:
      "Publish helpful tutorials, offer a free downloadable in the description to capture emails, then sell a paid template or course to your list.",
    category: "Digital Products",
    flow: ["youtube", "substack", "gumroad"],
    requiredConnections: ["youtube", "gumroad"],
    effort: "5–6 hrs / week",
    difficulty: "Intermediate",
    timeToFirstEarning: "Typically 4–8 weeks",
    earningRange: "₹5,000–₹1,00,000 / mo",
    automated: false,
    proven: true,
    steps: [
      { id: "s1", title: "Pick a teachable skill", description: "Choose something you can demonstrate on camera.", action: "manual_task", required: true, help: "Pick a skill people actively search how-to videos for." },
      { id: "s2", title: "Connect YouTube", description: "OAuth connect to publish and read analytics.", platformId: "youtube", action: "connect_account", required: true, help: "We only request upload + read-analytics scopes." },
      { id: "s3", title: "Script & generate video outline", description: "AI drafts a tight tutorial script.", platformId: "youtube", action: "create_content", required: true, help: "Hook in the first 10 seconds; deliver one clear win." },
      { id: "s4", title: "Create the free lead magnet", description: "A checklist or template to capture emails.", action: "create_content", required: true, help: "It should solve a small problem instantly." },
      { id: "s5", title: "Connect Gumroad", description: "List your paid product.", platformId: "gumroad", action: "connect_account", required: true, help: "Paste your Gumroad API key to sync sales." },
      { id: "s6", title: "Publish & track", description: "Ship the video, track signups and sales.", action: "track", required: false, help: "Watch which video drives the most buyers." },
    ],
  },
  {
    id: "tpl_ig_affiliate",
    slug: "instagram-reels-affiliate",
    name: "Instagram Reels → Affiliate",
    tagline: "Short videos that quietly sell products you love.",
    description:
      "Post niche reels, drive viewers to a link-in-bio of affiliate products, and earn on every sale. Great for fashion, beauty, tech, and home.",
    category: "Affiliate",
    flow: ["instagram", "amazon_associates"],
    requiredConnections: ["instagram", "amazon_associates"],
    effort: "4–5 hrs / week",
    difficulty: "Beginner",
    timeToFirstEarning: "Typically 2–5 weeks",
    earningRange: "₹3,000–₹50,000 / mo",
    automated: true,
    proven: true,
    steps: [
      { id: "s1", title: "Pick a visual niche", description: "Choose a niche that looks good in 9:16 video.", action: "manual_task", required: true, help: "Beauty, decor, gadgets and fashion convert well." },
      { id: "s2", title: "Connect Amazon Associates", description: "For tagged affiliate links.", platformId: "amazon_associates", action: "connect_account", required: true, help: "Just your Associates tag." },
      { id: "s3", title: "Generate 3 reel scripts", description: "Hook + product + CTA.", platformId: "instagram", action: "create_content", required: true, help: "Lead with the problem, reveal the product fast." },
      { id: "s4", title: "Connect Instagram", description: "OAuth to schedule reels.", platformId: "instagram", action: "connect_account", required: true, help: "Requires a Professional/Creator account." },
      { id: "s5", title: "Publish & track", description: "Schedule reels and track link clicks → sales.", action: "track", required: false, help: "Double down on the format that earns." },
    ],
  },
  {
    id: "tpl_newsletter_sponsor",
    slug: "newsletter-sponsorship",
    name: "Niche Newsletter → Sponsorships",
    tagline: "Grow a focused list, sell sponsor slots.",
    description:
      "Publish a weekly niche newsletter, grow subscribers with cross-promotion, then sell sponsorship slots once you cross ~1,000 readers.",
    category: "Newsletter",
    flow: ["substack", "stripe_connect"],
    requiredConnections: ["substack"],
    effort: "3 hrs / week",
    difficulty: "Intermediate",
    timeToFirstEarning: "Typically 6–12 weeks",
    earningRange: "₹4,000–₹80,000 / mo",
    automated: false,
    proven: true,
    steps: [
      { id: "s1", title: "Define your newsletter angle", description: "One audience, one promise.", action: "manual_task", required: true, help: "Specific beats broad — 'AI tools for lawyers' over 'tech news'." },
      { id: "s2", title: "Generate your first 4 issues", description: "AI drafts a month of content.", action: "create_content", required: true, help: "Batch ahead so you never miss a week." },
      { id: "s3", title: "Set up subscriber capture", description: "Connect your newsletter tool (manual paste).", platformId: "substack", action: "connect_account", required: true, help: "No public API — we draft, you send, then log signups." },
      { id: "s4", title: "Log growth & sponsorships", description: "Track subscribers and sponsor revenue.", action: "track", required: false, help: "Sell your first slot at ~1,000 engaged readers." },
    ],
  },
  {
    id: "tpl_etsy_printables",
    slug: "pinterest-etsy-printables",
    name: "Pinterest → Etsy Printables",
    tagline: "Design once, sell digital printables forever.",
    description:
      "Create digital printables (planners, wall art, templates), list them on Etsy, and drive free buyers with Pinterest. Near-zero marginal cost per sale.",
    category: "E-commerce",
    flow: ["pinterest", "etsy"],
    requiredConnections: ["pinterest", "etsy"],
    effort: "4 hrs / week",
    difficulty: "Beginner",
    timeToFirstEarning: "Typically 2–6 weeks",
    earningRange: "₹2,000–₹60,000 / mo",
    automated: true,
    proven: true,
    steps: [
      { id: "s1", title: "Pick a printable category", description: "Planners, wall art, checklists…", action: "manual_task", required: true, help: "Look for high-search, low-competition keywords on Etsy." },
      { id: "s2", title: "Generate product copy", description: "Titles, tags, descriptions.", platformId: "etsy", action: "create_content", required: true, help: "Etsy SEO lives in your title + tags." },
      { id: "s3", title: "Connect Etsy", description: "Paste your Etsy API key to sync listings & sales.", platformId: "etsy", action: "connect_account", required: true, help: "We read orders to attribute revenue." },
      { id: "s4", title: "Connect Pinterest & pin", description: "Schedule pins to your listings.", platformId: "pinterest", action: "connect_account", required: true, help: "Pinterest is the #1 free traffic source for printables." },
      { id: "s5", title: "Track sales", description: "Watch pins → Etsy sales.", action: "track", required: false, help: "Re-pin your best sellers monthly." },
    ],
  },
  {
    id: "tpl_tiktok_shop",
    slug: "tiktok-shopify-store",
    name: "TikTok → Shopify Store",
    tagline: "Viral short video funnelling to your own store.",
    description:
      "Post product-led TikToks, send viewers to a lean Shopify store, and keep the full margin instead of an affiliate cut. Higher effort, higher ceiling.",
    category: "E-commerce",
    flow: ["tiktok", "shopify", "stripe_connect"],
    requiredConnections: ["tiktok", "shopify"],
    effort: "6–8 hrs / week",
    difficulty: "Advanced",
    timeToFirstEarning: "Typically 4–10 weeks",
    earningRange: "₹8,000–₹3,00,000 / mo",
    automated: false,
    proven: false,
    steps: [
      { id: "s1", title: "Pick a product angle", description: "One hero product, one clear hook.", action: "manual_task", required: true, help: "Solve a visible problem the camera can show." },
      { id: "s2", title: "Connect Shopify", description: "Sync products and real order revenue.", platformId: "shopify", action: "connect_account", required: true, help: "We read orders to attribute revenue to videos." },
      { id: "s3", title: "Generate 5 video hooks", description: "Scripts engineered to stop the scroll.", platformId: "tiktok", action: "create_content", required: true, help: "Test many hooks; let the winners scale." },
      { id: "s4", title: "Connect TikTok & publish", description: "Schedule and publish your videos.", platformId: "tiktok", action: "connect_account", required: true, help: "Post daily in the first weeks to find a hit." },
      { id: "s5", title: "Track orders", description: "Attribute Shopify orders to videos.", action: "track", required: false, help: "Reinvest winners into ads once profitable." },
    ],
  },
];

/** All money-chain templates (flagship + extras) — 50+ in the marketplace. */
export const TEMPLATES: ChainTemplate[] = [...BASE_TEMPLATES, ...EXTRA_TEMPLATES];

export function getTemplate(slugOrId: string): ChainTemplate | undefined {
  return TEMPLATES.find((t) => t.slug === slugOrId || t.id === slugOrId);
}
