import type { Platform } from "@/lib/types";

/**
 * The platforms MoneyChains can connect to. Connection `type` decides the
 * flow: OAuth (auto publish + track), api_key (paste an id/key, track sales),
 * or manual (no API — we guide and let users log results).
 *
 * Templates in src/data/ reference these ids in their `flow` and
 * `requiredConnections`. Keep ids stable.
 */
export const PLATFORMS: Platform[] = [
  // ---- Traffic / social ----
  { id: "pinterest", name: "Pinterest", type: "oauth", capabilities: ["publish", "track", "auth"], blurb: "Auto-create pins that drive traffic to your blog or store." },
  { id: "instagram", name: "Instagram", type: "oauth", capabilities: ["publish", "track", "auth"], blurb: "Schedule reels and posts, track reach and clicks." },
  { id: "tiktok", name: "TikTok", type: "oauth", capabilities: ["publish", "track", "auth"], blurb: "Publish short video and read back performance." },
  { id: "youtube", name: "YouTube", type: "oauth", capabilities: ["publish", "track"], blurb: "Upload videos and pull view + revenue analytics." },
  { id: "facebook", name: "Facebook", type: "oauth", capabilities: ["publish", "track", "auth"], blurb: "Post to pages and groups, track engagement." },
  { id: "threads", name: "Threads", type: "oauth", capabilities: ["publish", "track"], blurb: "Publish text posts and grow a following." },
  { id: "twitter", name: "X (Twitter)", type: "oauth", capabilities: ["publish", "track", "auth"], blurb: "Schedule posts and threads, track impressions." },
  { id: "linkedin", name: "LinkedIn", type: "oauth", capabilities: ["publish", "track", "auth"], blurb: "Publish posts and articles to a professional audience." },
  { id: "reddit", name: "Reddit", type: "oauth", capabilities: ["publish", "track"], blurb: "Share helpful posts in relevant communities." },
  { id: "quora", name: "Quora", type: "manual", capabilities: ["publish"], blurb: "No public posting API — we draft answers, you post and log." },
  { id: "twitch", name: "Twitch", type: "oauth", capabilities: ["publish", "track"], blurb: "Stream and pull channel + revenue analytics." },
  { id: "snapchat", name: "Snapchat", type: "oauth", capabilities: ["publish", "track"], blurb: "Publish stories and Spotlight clips." },

  // ---- Content homes ----
  { id: "blog", name: "Blog (MoneyChains Hosted)", type: "oauth", capabilities: ["publish", "track"], blurb: "A fast, SEO-ready blog we host for you — or connect WordPress." },
  { id: "medium", name: "Medium", type: "api_key", capabilities: ["publish"], blurb: "Cross-post articles with an integration token." },
  { id: "notion", name: "Notion", type: "oauth", capabilities: ["publish"], blurb: "Publish docs and resources from a Notion workspace." },
  { id: "podcast", name: "Podcast (Spotify/Apple)", type: "manual", capabilities: ["publish"], blurb: "We script & show-note; you record and upload." },

  // ---- Affiliate / monetization ----
  { id: "amazon_associates", name: "Amazon Associates", type: "api_key", capabilities: ["track"], blurb: "Paste your Associates tag to earn and track affiliate sales." },
  { id: "clickbank", name: "ClickBank", type: "api_key", capabilities: ["track"], blurb: "Paste your nickname to track digital-product commissions." },
  { id: "impact_affiliate", name: "Impact / CJ", type: "api_key", capabilities: ["track"], blurb: "Affiliate networks — track sales across many brands." },
  { id: "flipkart_affiliate", name: "Flipkart Affiliate", type: "api_key", capabilities: ["track"], blurb: "Earn on India's largest marketplace with your affiliate id." },

  // ---- Stores / commerce ----
  { id: "shopify", name: "Shopify", type: "oauth", capabilities: ["publish", "track"], blurb: "Sync products and read real order revenue." },
  { id: "etsy", name: "Etsy", type: "api_key", capabilities: ["publish", "track"], blurb: "List printables and products, track order revenue." },
  { id: "gumroad", name: "Gumroad", type: "api_key", capabilities: ["publish", "track"], blurb: "List digital products and track payouts." },
  { id: "ebay", name: "eBay", type: "api_key", capabilities: ["publish", "track"], blurb: "List items and read sold-order revenue." },
  { id: "redbubble", name: "Redbubble", type: "manual", capabilities: ["publish"], blurb: "Print-on-demand — we generate designs & listings, you upload." },
  { id: "printful", name: "Printful", type: "api_key", capabilities: ["publish", "track"], blurb: "Print-on-demand fulfillment synced to your store." },
  { id: "canva", name: "Canva", type: "manual", capabilities: ["publish"], blurb: "We draft designs; create & export in Canva." },

  // ---- Courses / services ----
  { id: "teachable", name: "Teachable", type: "api_key", capabilities: ["publish", "track"], blurb: "Host a course and track enrollments & revenue." },
  { id: "udemy", name: "Udemy", type: "manual", capabilities: ["publish"], blurb: "We outline the course; you record and publish." },
  { id: "skillshare", name: "Skillshare", type: "manual", capabilities: ["publish"], blurb: "We plan classes; you record and earn on minutes watched." },
  { id: "fiverr", name: "Fiverr", type: "manual", capabilities: ["publish"], blurb: "We write your gigs; you deliver and we log earnings." },
  { id: "upwork", name: "Upwork", type: "manual", capabilities: ["publish"], blurb: "We craft proposals; you bid and log won contracts." },

  // ---- Newsletter / audience ----
  { id: "substack", name: "Substack", type: "manual", capabilities: ["publish"], blurb: "No public API — we draft, you paste & send. Log signups here." },
  { id: "beehiiv", name: "beehiiv", type: "api_key", capabilities: ["publish", "track"], blurb: "Grow a newsletter and track subscribers & revenue." },
  { id: "convertkit", name: "ConvertKit", type: "api_key", capabilities: ["publish", "track"], blurb: "Capture emails and sell to your list." },
  { id: "mailchimp", name: "Mailchimp", type: "oauth", capabilities: ["publish", "track"], blurb: "Send campaigns and read open/click revenue." },
  { id: "patreon", name: "Patreon", type: "oauth", capabilities: ["track"], blurb: "Track recurring membership revenue from fans." },
  { id: "kofi", name: "Ko-fi", type: "api_key", capabilities: ["track"], blurb: "Tips, memberships and shop sales tracking." },

  // ---- Payments / community ----
  { id: "stripe_connect", name: "Stripe", type: "oauth", capabilities: ["track"], blurb: "Track direct product and subscription sales." },
  { id: "discord", name: "Discord", type: "oauth", capabilities: ["publish"], blurb: "Run a paid community; post drops and updates." },
  { id: "telegram", name: "Telegram", type: "api_key", capabilities: ["publish"], blurb: "Broadcast to a channel via a bot token." },
  { id: "whatsapp", name: "WhatsApp", type: "manual", capabilities: ["publish"], blurb: "We draft broadcasts; you send from your business number." },
];

export function getPlatform(id: string): Platform | undefined {
  return PLATFORMS.find((p) => p.id === id);
}
