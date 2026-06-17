/**
 * The blog is DATA, not code. Adding a post = adding an object here (or a row
 * in a `blog_posts` table). The listing and post pages render whatever is in
 * `POSTS` — nothing in the UI is hardcoded to a specific article.
 *
 * `body` is a small, explicit block model so posts stay structured and easy to
 * render without a markdown/prose pipeline.
 */

export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readingMins: number;
  publishedAt: string; // ISO string
  accent: string; // emoji used as a hero motif
  body: BlogBlock[];
}

export const POSTS: BlogPost[] = [
  {
    slug: "how-the-pinterest-blog-amazon-money-chain-works",
    title: "How the Pinterest → Blog → Amazon money chain actually works",
    excerpt:
      "A plain-English walkthrough of the most-asked-about chain: how a pin becomes a blog visit becomes an Amazon commission — and where most people go wrong.",
    category: "Money Chains",
    author: "Kamya Rao",
    readingMins: 7,
    publishedAt: "2026-05-28T09:00:00.000Z",
    accent: "📌",
    body: [
      {
        type: "p",
        text: "It's the chain people ask us about most, and it's also the one most misunderstood. The pitch sounds almost too clean: post pictures on Pinterest, earn money from Amazon. But there's a real mechanism underneath, and once you see it, both the appeal and the limits become obvious. This is the honest version — no screenshots of suspicious dashboards, just how the pieces connect.",
      },
      { type: "h2", text: "The three links in the chain" },
      {
        type: "p",
        text: "Every money chain is just a sequence of steps where the output of one becomes the input of the next. This one has three links, and each does exactly one job:",
      },
      {
        type: "ul",
        items: [
          "Pinterest is a discovery engine — people go there searching for ideas, not to buy. Your job here is to create pins that show up when someone searches your topic and earn the click.",
          "Your blog is where the actual helping happens. A pin sends a visitor to a post that genuinely answers their question — 'best budget standing desks under ₹15,000', say — with real recommendations.",
          "Amazon Associates is the payout layer. The products you recommend carry your affiliate tag, so when a reader buys one within 24 hours of clicking, you earn a commission.",
        ],
      },
      {
        type: "p",
        text: "Miss any link and the chain breaks. A beautiful pin that links to a thin post earns nothing. A great post with no traffic earns nothing. Perfect traffic to a post with no buyable products earns nothing. The skill is keeping all three healthy at once.",
      },
      { type: "h2", text: "Why Pinterest, and not Instagram or TikTok?" },
      {
        type: "p",
        text: "Pinterest behaves more like a search engine than a social feed. A pin you publish today can keep surfacing in search results for months or years, quietly sending traffic long after you posted it. That 'evergreen' quality is what makes this chain attractive for people who can't post daily. On Instagram or TikTok, a post peaks in 48 hours and then vanishes. On Pinterest, your back catalogue keeps working.",
      },
      {
        type: "p",
        text: "The trade-off: Pinterest rewards consistency and patience, not virality. You're planting a field, not winning a lottery. Most pins do very little; a handful become steady earners. You won't know which until you've published enough of them.",
      },
      { type: "h2", text: "Where the money actually comes from" },
      {
        type: "p",
        text: "Amazon's commission rates are modest — often 1% to 4% depending on the category. On a ₹2,000 product at 3%, that's ₹60. This is the number that surprises people. Affiliate income is a volume game: it works when you have many posts, each recommending products to a steady trickle of the right readers. One viral post rarely changes your life; fifty solid posts compounding over a year might add up to a meaningful side income.",
      },
      {
        type: "p",
        text: "It also means niche selection matters enormously. A niche with cheap products and low purchase intent will frustrate you no matter how good your pins are. We wrote a separate, practical filter for choosing a niche — it's worth reading before you commit weeks to a topic.",
      },
      { type: "h2", text: "What MoneyChains automates, and what it can't" },
      {
        type: "p",
        text: "We can draft the blog posts, generate and schedule the pins, insert correctly-tagged affiliate links, and trace each sale back to the pin that drove it. That removes most of the repetitive grind. What we can't do is care about your niche for you, write from real experience you have and we don't, or make Amazon pay faster. The taste, the topic, and the patience are still yours.",
      },
      { type: "h2", text: "An honest timeline" },
      {
        type: "p",
        text: "Pinterest typically takes a few weeks to start trusting and distributing a new account's pins. Add the time for posts to get indexed and for a reader's purchase to land, and a realistic 'first commission' window is roughly three to six weeks of consistent posting — sometimes longer. Plenty of people earn very little in the first month. Some earn nothing. If anyone tells you otherwise, be suspicious. This chain is real and it works, but it works like planting, not like winning.",
      },
    ],
  },
  {
    slug: "picking-a-niche-that-actually-earns",
    title: "Picking a niche that actually earns (a practical filter)",
    excerpt:
      "Most 'pick a niche you love' advice is useless. Here's the concrete filter we use to tell whether a topic can actually pay — before you sink weeks into it.",
    category: "Strategy",
    author: "Devan Mehta",
    readingMins: 8,
    publishedAt: "2026-06-04T09:00:00.000Z",
    accent: "🎯",
    body: [
      {
        type: "p",
        text: "The most common reason a money chain quietly fails isn't bad execution. It's a niche that was never going to pay, chosen with enthusiasm and zero filtering. 'Pick something you're passionate about' is comforting and almost entirely useless on its own — passion doesn't put money in a niche that has none. Here's the actual filter we walk people through.",
      },
      { type: "h2", text: "Filter 1: Are people already spending money here?" },
      {
        type: "p",
        text: "A niche earns only if there's existing demand to buy things, not just to browse. The cleanest signal is whether real products already sell into the space. Before anything else, check:",
      },
      {
        type: "ul",
        items: [
          "Are there products on Amazon (or Etsy, or wherever your chain ends) that a reader of this topic would realistically buy?",
          "Do those products cost enough that a small commission is worth it? A 3% cut of a ₹400 item is rounding error; a 3% cut of a ₹12,000 item is real.",
          "Is anyone already running ads or building businesses around this topic? Competition is a sign of money, not a reason to flee.",
        ],
      },
      {
        type: "p",
        text: "If you can't name three products a reader would buy, the niche fails this filter. Stop here and pick something else.",
      },
      { type: "h2", text: "Filter 2: Is the audience specific enough?" },
      {
        type: "p",
        text: "Narrow beats broad almost every time. 'Fitness' is a war zone dominated by huge brands. 'Home workouts for new parents with no equipment' is a niche you can actually own. A specific audience trusts you faster, searches with clearer intent, and faces less competition. When you narrow, you trade a smaller total audience for a much higher chance of being the answer someone was looking for.",
      },
      {
        type: "p",
        text: "A useful test: can you picture one specific person who'd read every post you publish? If your imagined reader is 'anyone interested in health', you haven't narrowed enough.",
      },
      { type: "h2", text: "Filter 3: Can you produce 30 posts without dread?" },
      {
        type: "p",
        text: "This is where 'pick something you like' earns its place — not as the whole filter, but as a stamina check. These chains reward consistency over months. If the topic bores you to tears by post five, you'll quit before it compounds. You don't need burning passion; you need enough genuine interest to keep showing up. Ask yourself honestly whether you could write thirty helpful posts on this without resenting it.",
      },
      { type: "h2", text: "Filter 4: Do you know something, or can you learn fast?" },
      {
        type: "p",
        text: "The posts that earn aren't generic summaries — they carry a point of view, a real recommendation, a 'here's what I'd actually buy and why'. You don't need to be a world expert, but you need either existing knowledge or a real willingness to do the research properly. A niche where you can add a genuine opinion will always beat one where you're just paraphrasing the first page of search results.",
      },
      { type: "h2", text: "Putting the filters together" },
      {
        type: "p",
        text: "A niche worth your weeks usually clears all four: people already spend money there, the audience is specific, you won't run out of things to say, and you can speak with some authority. Most ideas fail at least one filter — and that's the point. The filter's job is to save you from spending two months learning, the expensive way, that a topic was never going to pay.",
      },
      {
        type: "p",
        text: "When you've got a candidate that clears all four, the chain templates take it from there. But no template can rescue a niche that fails the filter, and we'd rather you find that out in ten minutes here than ten weeks in.",
      },
    ],
  },
  {
    slug: "why-we-will-never-promise-guaranteed-income",
    title: "Why we'll never promise you guaranteed income",
    excerpt:
      "Every 'make money online' pitch you've seen probably guaranteed results. We won't — and the reason we won't is exactly why you should trust the parts we do say.",
    category: "Honesty",
    author: "Kamya Rao",
    readingMins: 6,
    publishedAt: "2026-06-10T09:00:00.000Z",
    accent: "🤝",
    body: [
      {
        type: "p",
        text: "If you've spent any time around 'make money online' content, you've been promised a lot. Specific numbers. Fast timelines. 'Guaranteed' results. We've made a deliberate choice not to talk that way, and we want to be upfront about why — because the way a company talks about money tells you almost everything about whether you can trust it.",
      },
      { type: "h2", text: "Because guarantees in this space are lies" },
      {
        type: "p",
        text: "Your results depend on things no software controls: your niche, your effort, your consistency, the quality of your writing, the mood of a dozen platform algorithms, and plain luck. Anyone who 'guarantees' an income figure is either ignoring all of that or lying about it. There is no honest version of 'earn ₹50,000 a month, guaranteed'. The moment you see a number with a guarantee attached, you've learned something important about the person selling it.",
      },
      { type: "h2", text: "What we'll say instead" },
      {
        type: "p",
        text: "We'd rather give you accurate, uncomfortable information than comfortable, false information. So our language stays careful on purpose:",
      },
      {
        type: "ul",
        items: [
          "We show earning ranges, and we label them illustrative — not promises. They describe what's been possible, not what you'll get.",
          "We tell you that many people earn little at first, and some earn nothing. That's not pessimism; it's the actual distribution.",
          "We talk in 'typically' and 'often', not 'will' and 'guaranteed', because that's how honest probability sounds.",
        ],
      },
      { type: "h2", text: "Why honesty is the better business" },
      {
        type: "p",
        text: "Hype gets the first sale and loses every one after it. If we promised you ₹50,000 a month and you earned ₹2,000, you'd feel cheated — correctly — and you'd leave. We'd rather set expectations you can actually meet, so that when the chain does start working, it feels like more than you were promised instead of less. A reputation for telling the truth is worth more to us than a conversion bump from a lie.",
      },
      { type: "h2", text: "What we're actually confident about" },
      {
        type: "p",
        text: "Refusing to guarantee income doesn't mean we're unsure of the product. We're very confident about the things we control: the chains are real workflows that real people use to earn; the automation removes most of the repetitive work; your connections are secure; and we'll never quietly do something with your accounts you didn't ask for. We'll make firm promises about our software and our conduct all day. We just won't make promises about a future that depends mostly on you.",
      },
      {
        type: "p",
        text: "If that honesty makes us a little less exciting than the next pitch, we'll take that trade. The people who do well with MoneyChains are the ones who came in with clear eyes — and clear eyes start with someone telling you the truth.",
      },
    ],
  },
  {
    slug: "oauth-explained-simply",
    title: "OAuth, explained simply: why MoneyChains never sees your passwords",
    excerpt:
      "When you connect Pinterest or YouTube to MoneyChains, you never hand us a password. Here's how that works, in plain language — and why it's safer for you.",
    category: "Security",
    author: "Priya Nair",
    readingMins: 6,
    publishedAt: "2026-06-15T09:00:00.000Z",
    accent: "🔐",
    body: [
      {
        type: "p",
        text: "When you connect an account like Pinterest or YouTube to MoneyChains, a fair question is: am I about to hand my password to some app I just met? The answer is no — and the reason is a quietly brilliant piece of plumbing called OAuth. It's worth understanding, because once you do, 'never share your password' stops being a slogan and starts being something you can verify.",
      },
      { type: "h2", text: "The hotel key card analogy" },
      {
        type: "p",
        text: "Think of your password as the master key to your house. You'd never lend it to a contractor. Instead, you'd give them a temporary key that opens only the rooms they need to work in, for only as long as the job lasts, and that you can deactivate the moment you're done. OAuth is that temporary key. You log in directly with Pinterest, Pinterest issues MoneyChains a limited, revocable token, and we use the token — never your password, which we never see.",
      },
      { type: "h2", text: "What actually happens when you click 'Connect'" },
      {
        type: "p",
        text: "The flow looks like a lot, but each step exists for your protection:",
      },
      {
        type: "ul",
        items: [
          "You click 'Connect Pinterest' and we send you to Pinterest's own site — not a MoneyChains form pretending to be one.",
          "You log in there, on Pinterest's domain, where your password stays. We never receive it, see it, or store it.",
          "Pinterest shows you exactly what you're granting — for example, permission to publish pins — and asks you to approve.",
          "Once you approve, Pinterest hands MoneyChains a token: a scoped, revocable key that does only the approved jobs and nothing else.",
        ],
      },
      { type: "h2", text: "Why this is safer than a password" },
      {
        type: "p",
        text: "A token is strictly less dangerous than a password in three ways. It's scoped, so it can only do the specific things you approved — a 'publish pins' token can't go change your account email. It's revocable, so you can cut off access instantly from your platform's settings without changing your password or touching anything else you've connected. And because we never hold your password, a breach on our side can't leak a credential we don't have.",
      },
      { type: "h2", text: "You stay in control" },
      {
        type: "p",
        text: "Every connection you make is one you can undo. From your Connections page in MoneyChains, or directly in Pinterest's or YouTube's own security settings, you can revoke our token whenever you like. The instant you do, our access is gone — no negotiation, no waiting, no lingering key under the mat.",
      },
      {
        type: "p",
        text: "Some platforms don't offer OAuth and instead use an API key you paste in, or a manual connection. We treat those with the same principle: ask for the least access needed, store it carefully, and make it easy to disconnect. But wherever OAuth is available, that's what we use — because the best way to keep your password safe is to never ask for it in the first place.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}
