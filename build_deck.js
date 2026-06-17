const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const FA = require("react-icons/fa");

// ---------- palette ----------
const NAVY = "0E1A38";
const NAVY2 = "16264F";
const INK = "13203B";
const TEAL = "02A37A";
const MINT = "27D8A0";
const ICE = "E8F0FF";
const SLATE = "5A6A85";
const CLOUD = "F4F7FB";
const LINE = "DCE4F0";
const WHITE = "FFFFFF";
const GOLD = "FFB020";

const HFONT = "Georgia";
const BFONT = "Calibri";
const W = 13.3, H = 7.5;

async function icon(IconComponent, color = "#FFFFFF", size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + png.toString("base64");
}
const hx = (c) => "#" + c;
const shadow = () => ({ type: "outer", color: "0E1A38", blur: 9, offset: 3, angle: 90, opacity: 0.12 });

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.author = "Founder";
  pres.title = "MoneyChains — Pitch Deck";

  // ---- icon set ----
  const I = {
    link: await icon(FA.FaLink, hx(MINT)),
    compass: await icon(FA.FaCompass, hx(MINT)),
    chart: await icon(FA.FaChartLine, hx(MINT)),
    check: await icon(FA.FaCheckCircle, hx(TEAL)),
    checkW: await icon(FA.FaCheckCircle, hx(MINT)),
    arrow: await icon(FA.FaArrowRight, hx(TEAL)),
    arrowW: await icon(FA.FaArrowRight, hx(MINT)),
    warn: await icon(FA.FaExclamationTriangle, hx(GOLD)),
    times: await icon(FA.FaTimesCircle, hx("#C9472F")),
    lock: await icon(FA.FaLock, hx(WHITE)),
    shield: await icon(FA.FaShieldAlt, hx(MINT)),
    db: await icon(FA.FaDatabase, hx(WHITE)),
    store: await icon(FA.FaStore, hx(WHITE)),
    robot: await icon(FA.FaRobot, hx(WHITE)),
    bolt: await icon(FA.FaBolt, hx(WHITE)),
    coins: await icon(FA.FaCoins, hx(WHITE)),
    users: await icon(FA.FaUsers, hx(WHITE)),
    layers: await icon(FA.FaLayerGroup, hx(WHITE)),
    rocket: await icon(FA.FaRocket, hx(WHITE)),
    seed: await icon(FA.FaSeedling, hx(WHITE)),
    clock: await icon(FA.FaClock, hx(MINT)),
    puzzle: await icon(FA.FaPuzzlePiece, hx(WHITE)),
    bullseye: await icon(FA.FaBullseye, hx(MINT)),
    play: await icon(FA.FaPlayCircle, hx(WHITE)),
    handshake: await icon(FA.FaHandshake, hx(WHITE)),
    cog: await icon(FA.FaCogs, hx(MINT)),
    globe: await icon(FA.FaGlobe, hx(MINT)),
    flag: await icon(FA.FaFlagCheckered, hx(WHITE)),
    mobile: await icon(FA.FaMobileAlt, hx(MINT)),
    tag: await icon(FA.FaTag, hx(MINT)),
    pen: await icon(FA.FaPenNib, hx(MINT)),
    paper: await icon(FA.FaPaperPlane, hx(MINT)),
    wallet: await icon(FA.FaWallet, hx(WHITE)),
    book: await icon(FA.FaBookOpen, hx(WHITE)),
    video: await icon(FA.FaVideo, hx(WHITE)),
    cart: await icon(FA.FaShoppingCart, hx(WHITE)),
    envelope: await icon(FA.FaEnvelopeOpenText, hx(WHITE)),
    bullhorn: await icon(FA.FaBullhorn, hx(WHITE)),
    leaf: await icon(FA.FaLeaf, hx(WHITE)),
  };

  // ---------- shared helpers ----------
  let pageNum = 0;
  function footer(s, dark) {
    pageNum++;
    if (pageNum === 1) return;
    s.addText("MoneyChains", { x: 0.9, y: 7.02, w: 4, h: 0.3, fontFace: BFONT, fontSize: 9, bold: true, color: dark ? "6E83AD" : SLATE, charSpacing: 1, margin: 0 });
    s.addText(String(pageNum), { x: 12.2, y: 7.02, w: 0.6, h: 0.3, fontFace: BFONT, fontSize: 9, color: dark ? "6E83AD" : SLATE, align: "right", margin: 0 });
  }
  function kicker(s, x, y, text, color) {
    s.addText(text.toUpperCase(), { x, y, w: 7, h: 0.32, fontFace: BFONT, fontSize: 12, bold: true, color: color || TEAL, charSpacing: 3, margin: 0 });
  }
  function title(s, x, y, text, color) {
    s.addText(text, { x, y, w: 11.6, h: 0.8, fontFace: HFONT, fontSize: 30, bold: true, color: color || INK, margin: 0 });
  }
  function chip(s, x, y, text, fg, bg, w) {
    s.addText(text.toUpperCase(), { x, y, w: w || 2.4, h: 0.36, fontFace: BFONT, fontSize: 11, bold: true, color: fg, fill: { color: bg }, align: "center", valign: "middle", charSpacing: 2, margin: 0, rectRadius: 0.18, shape: pres.shapes.ROUNDED_RECTANGLE });
  }
  const bullets = (arr) => arr.map((t) => ({ text: t, options: { bullet: { code: "2022", indent: 14 }, breakLine: true, paraSpaceAfter: 9 } }));

  // ============================================================
  // 1 — COVER
  // ============================================================
  let s = pres.addSlide();
  s.background = { color: NAVY };
  s.addShape(pres.shapes.OVAL, { x: 11.6, y: -1.2, w: 3.4, h: 3.4, fill: { color: NAVY2 } });
  s.addShape(pres.shapes.OVAL, { x: 12.4, y: 5.6, w: 2.8, h: 2.8, fill: { color: NAVY2 } });
  s.addText("STARTUP PITCH  ·  CONFIDENTIAL  ·  2026", { x: 0.9, y: 0.85, w: 9, h: 0.4, fontFace: BFONT, fontSize: 12, bold: true, color: MINT, charSpacing: 3, margin: 0 });
  s.addText("MoneyChains", { x: 0.82, y: 1.85, w: 11.6, h: 1.1, fontFace: HFONT, fontSize: 62, bold: true, color: WHITE, margin: 0 });
  s.addText([
    { text: "The ", options: { color: ICE } },
    { text: "“Zapier for making money online.”", options: { color: MINT, bold: true } },
  ], { x: 0.9, y: 3.1, w: 11.6, h: 0.6, fontFace: HFONT, italic: true, fontSize: 25, margin: 0 });
  s.addText("Pick a proven income “chain,” connect your accounts securely, and our platform guides you end-to-end — create, publish, and track real revenue. 50+ templates. One dashboard.", { x: 0.9, y: 3.95, w: 9.8, h: 1.1, fontFace: BFONT, fontSize: 16, color: ICE, lineSpacingMultiple: 1.25, margin: 0 });
  const pills = [["CONNECT", I.link], ["GUIDE", I.compass], ["TRACK", I.chart]];
  pills.forEach((p, i) => {
    const px = 0.9 + i * 3.0;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: px, y: 5.7, w: 2.7, h: 0.95, fill: { color: NAVY2 }, rectRadius: 0.12 });
    s.addImage({ data: p[1], x: px + 0.28, y: 5.97, w: 0.42, h: 0.42 });
    s.addText(p[0], { x: px + 0.85, y: 5.7, w: 1.7, h: 0.95, fontFace: BFONT, fontSize: 16, bold: true, color: WHITE, valign: "middle", margin: 0, charSpacing: 1 });
  });
  footer(s, true);

  // ============================================================
  // 2 — THE PROBLEM
  // ============================================================
  s = pres.addSlide(); s.background = { color: WHITE };
  kicker(s, 0.9, 0.55, "The Problem");
  title(s, 0.9, 0.9, "People have the skills. They just can’t turn them into money.");
  // big stat band
  const stats = [["Millions", "can code, write, design,\nedit — but earn ₹0 from it"], ["6+ tools", "to juggle for one income\nstream (Canva, Pinterest…)"], ["~3%", "course completion — info\ndoesn’t create income"]];
  stats.forEach((st, i) => {
    const x = 0.9 + i * 4.0;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.95, w: 3.7, h: 1.65, fill: { color: CLOUD }, rectRadius: 0.1 });
    s.addText(st[0], { x: x + 0.25, y: 2.12, w: 3.2, h: 0.7, fontFace: HFONT, fontSize: 34, bold: true, color: TEAL, margin: 0 });
    s.addText(st[1], { x: x + 0.25, y: 2.82, w: 3.25, h: 0.7, fontFace: BFONT, fontSize: 13, color: SLATE, margin: 0, lineSpacingMultiple: 1.0 });
  });
  s.addText("Why it happens", { x: 0.9, y: 3.95, w: 6, h: 0.4, fontFace: BFONT, fontSize: 15, bold: true, color: INK, margin: 0 });
  s.addText(bullets([
    "The path from “I have a skill” to “I earn” is a confusing maze — nobody shows the exact steps.",
    "Platforms don’t talk to each other; you stitch everything by hand and give up halfway.",
    "“Make money online” advice is generic, hype-filled, and full of scams — trust is broken.",
    "Result: capable people stay stuck at the starting line, earning nothing.",
  ]), { x: 0.9, y: 4.4, w: 11.4, h: 2.3, fontFace: BFONT, fontSize: 15, color: SLATE, margin: 0, lineSpacingMultiple: 1.1 });
  footer(s);

  // ============================================================
  // 3 — WHY NOW
  // ============================================================
  s = pres.addSlide(); s.background = { color: WHITE };
  kicker(s, 0.9, 0.55, "Why Now");
  title(s, 0.9, 0.9, "This was impossible 3 years ago. Today it’s buildable.");
  const why = [
    [I.robot, "AI makes creation instant", "Writing posts, pins, articles, scripts used to need a human for every step. AI now does the heavy creative work cheaply — the missing piece."],
    [I.cog, "APIs make platforms connectable", "OAuth + no-code automation let a small team safely wire 50+ platforms together — no enterprise budget needed."],
    [I.globe, "Creator economy is exploding", "Hundreds of millions want online income. Demand is at an all-time high, and the tools to serve them finally exist."],
  ];
  why.forEach((w0, i) => {
    const x = 0.9 + i * 3.95;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 2.0, w: 3.65, h: 4.4, fill: { color: NAVY }, rectRadius: 0.1, shadow: shadow() });
    s.addShape(pres.shapes.OVAL, { x: x + 0.35, y: 2.4, w: 0.85, h: 0.85, fill: { color: NAVY2 } });
    s.addImage({ data: w0[0], x: x + 0.59, y: 2.64, w: 0.37, h: 0.37 });
    s.addText(String(i + 1), { x: x + 2.9, y: 2.35, w: 0.6, h: 0.6, fontFace: HFONT, fontSize: 30, bold: true, color: NAVY2, margin: 0 });
    s.addText(w0[1], { x: x + 0.35, y: 3.45, w: 3.0, h: 0.85, fontFace: BFONT, fontSize: 17, bold: true, color: MINT, margin: 0, lineSpacingMultiple: 1.05 });
    s.addText(w0[2], { x: x + 0.35, y: 4.35, w: 3.0, h: 1.9, fontFace: BFONT, fontSize: 13.5, color: ICE, margin: 0, lineSpacingMultiple: 1.2 });
  });
  footer(s);

  // ============================================================
  // 4 — THE SOLUTION (big idea)
  // ============================================================
  s = pres.addSlide(); s.background = { color: NAVY };
  kicker(s, 0.9, 0.6, "The Solution", MINT);
  s.addText("Don’t teach people to make money. Hand them a system that already works.", { x: 0.9, y: 0.98, w: 11.6, h: 1.0, fontFace: HFONT, fontSize: 28, bold: true, color: WHITE, margin: 0, lineSpacingMultiple: 1.05 });
  s.addText([
    { text: "MoneyChains is a platform of pre-built ", options: { color: ICE } },
    { text: "“money chains”", options: { color: MINT, bold: true } },
    { text: " — templates that connect several platforms into one working income engine. You pick a chain, connect your accounts, and we guide you to real revenue.", options: { color: ICE } },
  ], { x: 0.9, y: 2.2, w: 11.4, h: 0.9, fontFace: BFONT, fontSize: 16, margin: 0, lineSpacingMultiple: 1.2 });
  // analogy cards
  const an = [
    [I.layers, "Like Zapier", "but the templates make you money, not just automate tasks."],
    [I.play, "Like a video game", "pick a level (chain), play the steps, watch your score (₹) go up."],
    [I.compass, "Like a GPS", "it tells you the exact next step and reroutes when you’re stuck."],
  ];
  an.forEach((a, i) => {
    const x = 0.9 + i * 3.95;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 3.4, w: 3.65, h: 2.5, fill: { color: NAVY2 }, rectRadius: 0.1 });
    s.addImage({ data: a[0], x: x + 0.35, y: 3.75, w: 0.55, h: 0.55 });
    s.addText(a[1], { x: x + 0.35, y: 4.45, w: 3.0, h: 0.45, fontFace: BFONT, fontSize: 18, bold: true, color: MINT, margin: 0 });
    s.addText(a[2], { x: x + 0.35, y: 4.95, w: 3.05, h: 0.85, fontFace: BFONT, fontSize: 13.5, color: ICE, margin: 0, lineSpacingMultiple: 1.15 });
  });
  s.addText("We don’t sell information. We sell execution + results.", { x: 0.9, y: 6.2, w: 11.4, h: 0.4, fontFace: HFONT, italic: true, fontSize: 16, color: MINT, margin: 0 });
  footer(s, true);

  // ============================================================
  // 5 — HOW IT WORKS (3 layers + chain ribbon)
  // ============================================================
  s = pres.addSlide(); s.background = { color: WHITE };
  kicker(s, 0.9, 0.55, "How It Works");
  title(s, 0.9, 0.9, "Three layers. The connection is just the pipe.");
  const chainItems = ["Pinterest", "Blog", "Amazon", "Email", "₹ Earned"];
  let cx = 0.9; const cw = 2.1, gap = 0.32, cyy = 1.8, chh = 0.65;
  chainItems.forEach((t, i) => {
    const money = i === chainItems.length - 1;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: cyy, w: cw, h: chh, fill: { color: money ? TEAL : CLOUD }, line: { color: money ? TEAL : LINE, width: 1 }, rectRadius: 0.1 });
    s.addText(t, { x: cx, y: cyy, w: cw, h: chh, fontFace: BFONT, fontSize: 14, bold: true, color: money ? WHITE : INK, align: "center", valign: "middle", margin: 0 });
    if (i < chainItems.length - 1) s.addImage({ data: I.arrow, x: cx + cw + 0.02, y: cyy + 0.16, w: 0.32, h: 0.32 });
    cx += cw + gap;
  });
  s.addText("Example: one of 50+ ready-made chains", { x: 0.9, y: 2.52, w: 8, h: 0.3, fontFace: BFONT, fontSize: 11.5, italic: true, color: SLATE, margin: 0 });
  const layers = [
    [I.link, "1 · CONNECT", "Securely link your own accounts via OAuth (never passwords). Auto-publish where the API allows; guided-manual where it doesn’t.", "Table stakes — anyone can copy"],
    [I.compass, "2 · GUIDE", "A step-by-step flow walks you through the work. Stuck somewhere? Contextual help unblocks you at exactly that step.", "The experience — why people stay"],
    [I.chart, "3 · TRACK", "Every link is tagged. One dashboard shows clicks → sales → ₹ per chain — your motivation, and our secret data.", "The moat — our compounding edge"],
  ];
  const lw = 3.75, lgap = 0.42, lx0 = 0.9, ly = 3.15, lh = 3.45;
  layers.forEach((L, i) => {
    const x = lx0 + i * (lw + lgap);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: ly, w: lw, h: lh, fill: { color: NAVY }, rectRadius: 0.1, shadow: shadow() });
    s.addShape(pres.shapes.OVAL, { x: x + 0.35, y: ly + 0.35, w: 0.8, h: 0.8, fill: { color: TEAL } });
    s.addImage({ data: L[0], x: x + 0.58, y: ly + 0.58, w: 0.34, h: 0.34 });
    s.addText(L[1], { x: x + 0.35, y: ly + 1.3, w: lw - 0.7, h: 0.4, fontFace: BFONT, fontSize: 16, bold: true, color: MINT, margin: 0, charSpacing: 1 });
    s.addText(L[2], { x: x + 0.35, y: ly + 1.75, w: lw - 0.7, h: 1.25, fontFace: BFONT, fontSize: 13, color: ICE, margin: 0, lineSpacingMultiple: 1.15 });
    s.addText(L[3], { x: x + 0.35, y: ly + 2.98, w: lw - 0.7, h: 0.4, fontFace: BFONT, fontSize: 10.5, bold: true, italic: true, color: "8FA6CC", margin: 0 });
  });
  footer(s);

  // ============================================================
  // 6 — PRODUCT JOURNEY (5 steps)
  // ============================================================
  s = pres.addSlide(); s.background = { color: WHITE };
  kicker(s, 0.9, 0.55, "Product Walkthrough");
  title(s, 0.9, 0.9, "What a user actually does — five simple steps");
  const steps = [
    [I.bullseye, "Pick a chain", "Browse 50+ templates, choose one that fits your skill & time."],
    [I.shield, "Connect", "One-click link your accounts — secure, no passwords, 2FA-safe."],
    [I.pen, "Create", "AI helps generate the content; you approve and tweak."],
    [I.paper, "Publish", "We post across the connected platforms, with your links inside."],
    [I.chart, "Track & earn", "Watch clicks → sales → ₹ in one live dashboard."],
  ];
  const sw = 2.18, sgap = 0.18, sx0 = 0.9, sy0 = 2.2, sh = 3.4;
  steps.forEach((st, i) => {
    const x = sx0 + i * (sw + sgap);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: sy0, w: sw, h: sh, fill: { color: i === 4 ? TEAL : CLOUD }, rectRadius: 0.1 });
    s.addShape(pres.shapes.OVAL, { x: x + sw / 2 - 0.42, y: sy0 + 0.35, w: 0.84, h: 0.84, fill: { color: NAVY } });
    s.addImage({ data: st[0], x: x + sw / 2 - 0.21, y: sy0 + 0.56, w: 0.42, h: 0.42 });
    s.addText("STEP " + (i + 1), { x, y: sy0 + 1.35, w: sw, h: 0.3, fontFace: BFONT, fontSize: 10.5, bold: true, color: i === 4 ? "D6FFF0" : SLATE, align: "center", charSpacing: 2, margin: 0 });
    s.addText(st[1], { x: x + 0.15, y: sy0 + 1.65, w: sw - 0.3, h: 0.5, fontFace: BFONT, fontSize: 16, bold: true, color: i === 4 ? WHITE : INK, align: "center", margin: 0 });
    s.addText(st[2], { x: x + 0.18, y: sy0 + 2.2, w: sw - 0.36, h: 1.1, fontFace: BFONT, fontSize: 12, color: i === 4 ? "EAFFF8" : SLATE, align: "center", margin: 0, lineSpacingMultiple: 1.1 });
  });
  s.addText("From sign-up to first published chain in under an hour — no tech skills required.", { x: 0.9, y: 6.0, w: 11.4, h: 0.4, fontFace: HFONT, italic: true, fontSize: 15, color: TEAL, margin: 0 });
  footer(s);

  // ============================================================
  // 7 — TEMPLATE LIBRARY
  // ============================================================
  s = pres.addSlide(); s.background = { color: WHITE };
  kicker(s, 0.9, 0.55, "The Template Library");
  title(s, 0.9, 0.9, "50+ money chains, grouped by how you earn");
  const cats = [
    [I.tag, "Affiliate", "Pinterest→Blog→Amazon, deal sites, review chains"],
    [I.video, "Content & video", "Faceless YouTube/TikTok/Reels → ad rev + affiliate"],
    [I.book, "Digital products", "Course / e-book / templates → Gumroad, email funnel"],
    [I.envelope, "Newsletter", "Grow list → sponsors + paid subs + affiliate"],
    [I.cart, "E-commerce", "Dropship / print-on-demand → store + social ads"],
    [I.bullhorn, "Lead-gen / services", "Niche leads → sell to businesses, or freelance offers"],
  ];
  const gw = 5.6, gh = 1.3, gx = [0.9, 6.8], gyB = 1.95, gvg = 0.2;
  cats.forEach((c, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = gx[col], y = gyB + row * (gh + gvg);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: gw, h: gh, fill: { color: CLOUD }, rectRadius: 0.08 });
    s.addShape(pres.shapes.OVAL, { x: x + 0.3, y: y + 0.43, w: 0.5, h: 0.5, fill: { color: NAVY } });
    s.addImage({ data: c[0], x: x + 0.42, y: y + 0.55, w: 0.26, h: 0.26 });
    s.addText(c[1], { x: x + 1.0, y: y + 0.22, w: gw - 1.2, h: 0.4, fontFace: BFONT, fontSize: 16, bold: true, color: INK, margin: 0 });
    s.addText(c[2], { x: x + 1.0, y: y + 0.62, w: gw - 1.2, h: 0.6, fontFace: BFONT, fontSize: 12.5, color: SLATE, margin: 0, lineSpacingMultiple: 1.05 });
  });
  s.addText("Two chain types: fully-automated (API connected) and guided-manual (we coach you step-by-step). Every template is proven before it goes live.", { x: 0.9, y: 6.4, w: 11.4, h: 0.45, fontFace: BFONT, italic: true, fontSize: 12.5, color: SLATE, margin: 0 });
  footer(s);

  // ============================================================
  // 8 — HOW WE CONNECT SAFELY (OAuth)
  // ============================================================
  s = pres.addSlide(); s.background = { color: WHITE };
  kicker(s, 0.9, 0.55, "How We Connect Safely");
  title(s, 0.9, 0.9, "We never store passwords. Ever.");
  // wrong vs right
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.9, y: 1.95, w: 5.6, h: 2.0, fill: { color: "FBE3DE" }, rectRadius: 0.1 });
  s.addImage({ data: I.times, x: 1.2, y: 2.2, w: 0.45, h: 0.45 });
  s.addText("The wrong way (what kills startups)", { x: 1.8, y: 2.22, w: 4.5, h: 0.4, fontFace: BFONT, fontSize: 15, bold: true, color: "B23A2E", margin: 0 });
  s.addText("Collecting users’ raw passwords. Breaks with 2FA, violates platform rules, makes you a hacker target, and invites lawsuits. One breach = company dead.", { x: 1.2, y: 2.75, w: 5.1, h: 1.1, fontFace: BFONT, fontSize: 13, color: "7A3528", margin: 0, lineSpacingMultiple: 1.2 });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.8, y: 1.95, w: 5.6, h: 2.0, fill: { color: NAVY }, rectRadius: 0.1 });
  s.addImage({ data: I.shield, x: 7.1, y: 2.2, w: 0.45, h: 0.45 });
  s.addText("Our way — OAuth tokens", { x: 7.7, y: 2.22, w: 4.5, h: 0.4, fontFace: BFONT, fontSize: 15, bold: true, color: MINT, margin: 0 });
  s.addText("User logs in on the platform’s own page; we get a secure “permission token,” not the password. Works with 2FA, fully compliant, revocable anytime — exactly how Buffer & Zapier do it.", { x: 7.1, y: 2.75, w: 5.1, h: 1.1, fontFace: BFONT, fontSize: 13, color: ICE, margin: 0, lineSpacingMultiple: 1.2 });

  // 3 connection types
  s.addText("Every platform falls into one of three buckets — our templates respect this:", { x: 0.9, y: 4.25, w: 11.4, h: 0.4, fontFace: BFONT, fontSize: 14, bold: true, color: INK, margin: 0 });
  const conn = [
    ["OAuth (best)", "Pinterest, Google, Instagram, TikTok, Shopify, Stripe", "Auto-post + auto-track. Full automation."],
    ["API key / ID", "Amazon Associates, affiliate networks", "Track sales, insert links. Semi-auto."],
    ["Manual-only", "Niche sites, Google ranking (SEO)", "We guide + track. No automation possible."],
  ];
  conn.forEach((c, i) => {
    const x = 0.9 + i * 3.95;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 4.75, w: 3.65, h: 1.75, fill: { color: CLOUD }, rectRadius: 0.08 });
    s.addText(c[0], { x: x + 0.25, y: 4.9, w: 3.2, h: 0.35, fontFace: BFONT, fontSize: 15, bold: true, color: TEAL, margin: 0 });
    s.addText(c[1], { x: x + 0.25, y: 5.28, w: 3.2, h: 0.6, fontFace: BFONT, fontSize: 11.5, italic: true, color: SLATE, margin: 0, lineSpacingMultiple: 1.05 });
    s.addText(c[2], { x: x + 0.25, y: 5.92, w: 3.2, h: 0.5, fontFace: BFONT, fontSize: 12, color: INK, margin: 0, lineSpacingMultiple: 1.05 });
  });
  footer(s);

  // ============================================================
  // 9 — BUSINESS MODEL
  // ============================================================
  s = pres.addSlide(); s.background = { color: WHITE };
  kicker(s, 0.9, 0.55, "Business Model");
  title(s, 0.9, 0.9, "Four ways to earn — we stack them");
  const rev = [
    [I.layers, "Subscription", "Tiered SaaS: Free → ₹999 → ₹2,499 → Agency. Predictable monthly revenue (MRR)."],
    [I.bolt, "Usage credits", "AI generation + automation runs metered above plan limits — protects our margins."],
    [I.coins, "Affiliate override", "A small sub-affiliate cut paid by networks — never taken from the user’s earnings."],
    [I.store, "Template marketplace", "Power users publish & sell their proven chains; we take 20–30% (V2)."],
  ];
  rev.forEach((r, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.9 + col * 5.9, y = 2.05 + row * 1.9;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 5.55, h: 1.65, fill: { color: NAVY }, rectRadius: 0.1, shadow: shadow() });
    s.addShape(pres.shapes.OVAL, { x: x + 0.32, y: y + 0.55, w: 0.6, h: 0.6, fill: { color: TEAL } });
    s.addImage({ data: r[0], x: x + 0.46, y: y + 0.69, w: 0.32, h: 0.32 });
    s.addText(r[1], { x: x + 1.15, y: y + 0.28, w: 4.2, h: 0.4, fontFace: BFONT, fontSize: 18, bold: true, color: MINT, margin: 0 });
    s.addText(r[2], { x: x + 1.15, y: y + 0.7, w: 4.2, h: 0.85, fontFace: BFONT, fontSize: 12.5, color: ICE, margin: 0, lineSpacingMultiple: 1.15 });
  });
  s.addText("“We win when our users win” — the affiliate override means revenue grows with their success, not our effort.", { x: 0.9, y: 6.05, w: 11.4, h: 0.4, fontFace: HFONT, italic: true, fontSize: 14.5, color: TEAL, margin: 0 });
  footer(s);

  // ============================================================
  // 10 — UNIT ECONOMICS / THE ONE METRIC
  // ============================================================
  s = pres.addSlide(); s.background = { color: WHITE };
  kicker(s, 0.9, 0.55, "The Metric That Matters");
  title(s, 0.9, 0.9, "Everything depends on time-to-first-earning");
  // funnel
  const fl = [
    ["Sign up", "100%", "F4F7FB", INK],
    ["Connect a chain", "60%", "CBE9DD", INK],
    ["Publish", "40%", "7FD6B5", INK],
    ["First ₹ earned", "25%", TEAL, WHITE],
    ["Becomes a paying, retained user", "→ LTV", NAVY, WHITE],
  ];
  let fy = 2.1; const fx0 = 0.9;
  fl.forEach((f, i) => {
    const fw = 5.6 - i * 0.7;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: fx0, y: fy, w: fw, h: 0.74, fill: { color: f[2] }, rectRadius: 0.06 });
    s.addText(f[0], { x: fx0 + 0.2, y: fy, w: fw - 1.0, h: 0.74, fontFace: BFONT, fontSize: 12.5, bold: true, color: f[3], valign: "middle", margin: 0 });
    s.addText(f[1], { x: fx0 + fw - 1.05, y: fy, w: 0.9, h: 0.74, fontFace: BFONT, fontSize: 12.5, bold: true, color: f[3], align: "right", valign: "middle", margin: 0 });
    fy += 0.88;
  });
  // right column commentary
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 8.4, y: 2.05, w: 3.95, h: 4.1, fill: { color: CLOUD }, rectRadius: 0.1 });
  s.addImage({ data: I.clock, x: 8.7, y: 2.3, w: 0.5, h: 0.5 });
  s.addText("Why this is the whole game", { x: 8.7, y: 2.9, w: 3.4, h: 0.4, fontFace: BFONT, fontSize: 15, bold: true, color: INK, margin: 0 });
  s.addText(bullets([
    "“Make money” tools die from churn — users quit before their first win.",
    "If they earn fast, they stay → LTV climbs → LTV > 3× CAC works.",
    "So the product is engineered for one thing: a fast, real first ₹.",
    "Low CAC: the templates themselves are our marketing (content + word-of-mouth).",
  ]), { x: 8.7, y: 3.4, w: 3.45, h: 2.7, fontFace: BFONT, fontSize: 12, color: SLATE, margin: 0, lineSpacingMultiple: 1.1 });
  footer(s);

  // ============================================================
  // 11 — THE MOAT
  // ============================================================
  s = pres.addSlide(); s.background = { color: NAVY };
  kicker(s, 0.9, 0.6, "Defensibility", MINT);
  title(s, 0.9, 0.95, "Integrations get copied. Our data can’t.", WHITE);
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.9, y: 2.1, w: 11.5, h: 2.1, fill: { color: NAVY2 }, rectRadius: 0.1 });
  s.addImage({ data: I.db, x: 1.25, y: 2.45, w: 0.55, h: 0.55 });
  s.addText("Performance data — our compounding moat", { x: 1.95, y: 2.42, w: 9.8, h: 0.5, fontFace: BFONT, fontSize: 19, bold: true, color: MINT, margin: 0 });
  s.addText("We become the only platform that knows which chains actually earn, for whom, and how fast. A competitor can clone our 50 templates — but has zero idea which ones work. That dataset grows with every user and powers AI recommendations no rival can match.", { x: 1.25, y: 3.0, w: 10.8, h: 1.1, fontFace: BFONT, fontSize: 14, color: ICE, margin: 0, lineSpacingMultiple: 1.2 });
  const moats = [
    [I.lock, "Switching cost", "Connected accounts, earning history & live chains — leaving means rebuilding everything."],
    [I.users, "Network effect", "A creator marketplace becomes a two-sided flywheel that’s very hard to cold-start twice."],
    [I.check, "Trust brand", "Being the honest, it-actually-works name in a scam-filled niche is a soft moat rivals can’t fake."],
  ];
  moats.forEach((m, i) => {
    const x = 0.9 + i * 3.95;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 4.45, w: 3.65, h: 2.0, fill: { color: NAVY2 }, rectRadius: 0.1 });
    s.addImage({ data: m[0], x: x + 0.3, y: 4.72, w: 0.42, h: 0.42 });
    s.addText(m[1], { x: x + 0.85, y: 4.72, w: 2.6, h: 0.45, fontFace: BFONT, fontSize: 15, bold: true, color: WHITE, valign: "middle", margin: 0 });
    s.addText(m[2], { x: x + 0.3, y: 5.32, w: 3.05, h: 1.0, fontFace: BFONT, fontSize: 12, color: ICE, margin: 0, lineSpacingMultiple: 1.15 });
  });
  footer(s, true);

  // ============================================================
  // 12 — MARKET SIZE
  // ============================================================
  s = pres.addSlide(); s.background = { color: WHITE };
  kicker(s, 0.9, 0.55, "Market Opportunity");
  title(s, 0.9, 0.9, "Riding the creator & passive-income wave");
  // concentric TAM/SAM/SOM as stacked bars
  const tam = [
    ["TAM", "Global creator economy", "~$250B", "0E1A38"],
    ["SAM", "People seeking online income with a skill", "~$40B", "16264F"],
    ["SOM", "Our reachable users in 3–5 yrs", "~$1.5B", TEAL],
  ];
  let ty = 2.1;
  tam.forEach((t, i) => {
    const bw = 6.4 - i * 1.4;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.9, y: ty, w: bw, h: 1.25, fill: { color: t[3] }, rectRadius: 0.08 });
    s.addText(t[0], { x: 1.2, y: ty + 0.16, w: 2, h: 0.5, fontFace: HFONT, fontSize: 24, bold: true, color: i === 2 ? WHITE : MINT, margin: 0 });
    s.addText(t[1], { x: 1.2, y: ty + 0.72, w: bw - 0.5, h: 0.45, fontFace: BFONT, fontSize: 12, color: ICE, margin: 0 });
    s.addText(t[2], { x: 0.95 + bw, y: ty + 0.3, w: 1.7, h: 0.6, fontFace: HFONT, fontSize: 22, bold: true, color: t[3] === TEAL ? TEAL : INK, margin: 0 });
    ty += 1.4;
  });
  // right note
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 9.1, y: 2.1, w: 3.25, h: 4.05, fill: { color: CLOUD }, rectRadius: 0.1 });
  s.addImage({ data: I.globe, x: 9.4, y: 2.35, w: 0.5, h: 0.5 });
  s.addText("Tailwinds", { x: 9.4, y: 2.95, w: 2.7, h: 0.4, fontFace: BFONT, fontSize: 15, bold: true, color: INK, margin: 0 });
  s.addText(bullets([
    "200M+ creators worldwide, growing fast.",
    "AI slashes the cost of content creation.",
    "Gig & side-income demand at record highs.",
    "India + emerging markets vastly under-served.",
  ]), { x: 9.4, y: 3.45, w: 2.75, h: 2.5, fontFace: BFONT, fontSize: 12, color: SLATE, margin: 0, lineSpacingMultiple: 1.1 });
  s.addText("Figures are industry estimates, illustrative — to be validated with primary research.", { x: 0.9, y: 6.45, w: 11.4, h: 0.35, fontFace: BFONT, italic: true, fontSize: 10.5, color: SLATE, margin: 0 });
  footer(s);

  // ============================================================
  // 13 — COMPETITION
  // ============================================================
  s = pres.addSlide(); s.background = { color: WHITE };
  kicker(s, 0.9, 0.55, "Competitive Landscape");
  title(s, 0.9, 0.9, "Everyone solves one piece. We connect the journey.");
  const headers = ["", "Proven chain\ntemplates", "Connects\nplatforms", "Guides to\nfirst ₹", "Tracks real\nrevenue"];
  const rows = [
    ["Courses / gurus", "no", "no", "no", "no"],
    ["Zapier / Make", "no", "yes", "no", "no"],
    ["Buffer / Hootsuite", "no", "yes", "no", "no"],
    ["Link-in-bio (Beacons)", "no", "part", "no", "part"],
    ["MoneyChains", "yes", "yes", "yes", "yes"],
  ];
  const colX = [0.9, 4.0, 6.3, 8.6, 10.9]; const colW = [3.1, 2.3, 2.3, 2.3, 2.0];
  const headY = 2.05, rowH = 0.78;
  // header
  headers.forEach((h, i) => {
    s.addText(h, { x: colX[i], y: headY, w: colW[i], h: 0.7, fontFace: BFONT, fontSize: 12, bold: true, color: INK, align: i === 0 ? "left" : "center", valign: "middle", margin: 0, lineSpacingMultiple: 0.95 });
  });
  rows.forEach((r, ri) => {
    const y = headY + 0.75 + ri * rowH;
    const isUs = ri === rows.length - 1;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.9, y, w: 12.0, h: rowH - 0.12, fill: { color: isUs ? TEAL : (ri % 2 ? WHITE : CLOUD) }, line: isUs ? { color: TEAL, width: 1 } : { color: "FFFFFF", width: 0 }, rectRadius: 0.06 });
    s.addText(r[0], { x: colX[0] + 0.15, y, w: colW[0], h: rowH - 0.12, fontFace: BFONT, fontSize: 13.5, bold: true, color: isUs ? WHITE : INK, valign: "middle", margin: 0 });
    for (let c = 1; c < r.length; c++) {
      const v = r[c];
      if (v === "yes") s.addImage({ data: isUs ? I.checkW : I.check, x: colX[c] + colW[c] / 2 - 0.16, y: y + (rowH - 0.12) / 2 - 0.16, w: 0.32, h: 0.32 });
      else if (v === "no") s.addText("—", { x: colX[c], y, w: colW[c], h: rowH - 0.12, fontFace: BFONT, fontSize: 16, color: isUs ? "BFFCEA" : "B6C2D6", align: "center", valign: "middle", margin: 0 });
      else s.addText("partial", { x: colX[c], y, w: colW[c], h: rowH - 0.12, fontFace: BFONT, fontSize: 11, italic: true, color: isUs ? "EAFFF8" : SLATE, align: "center", valign: "middle", margin: 0 });
    }
  });
  footer(s);

  // ============================================================
  // 14 — GO TO MARKET
  // ============================================================
  s = pres.addSlide(); s.background = { color: WHITE };
  kicker(s, 0.9, 0.55, "Go-To-Market");
  title(s, 0.9, 0.9, "Get the first 1,000 users without burning cash");
  const gtm = [
    [I.pen, "Content as the product", "The chains double as SEO/social content — show real results, attract people searching “how to make money with X.”"],
    [I.users, "Community + word-of-mouth", "Public earnings leaderboards & success stories turn winners into recruiters. Lowest-cost channel."],
    [I.handshake, "Creator partnerships", "Co-create signature chains with mid-tier creators; they bring their audience, we power the engine."],
    [I.rocket, "Land-and-expand", "Start free → upgrade when earning → upsell automation & marketplace. CAC paid back by retained MRR."],
  ];
  gtm.forEach((g, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.9 + col * 5.9, y = 2.05 + row * 2.05;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 5.55, h: 1.8, fill: { color: CLOUD }, rectRadius: 0.1 });
    s.addShape(pres.shapes.OVAL, { x: x + 0.3, y: y + 0.32, w: 0.6, h: 0.6, fill: { color: NAVY } });
    s.addImage({ data: g[0], x: x + 0.44, y: y + 0.46, w: 0.32, h: 0.32 });
    s.addText(g[1], { x: x + 1.1, y: y + 0.28, w: 4.2, h: 0.4, fontFace: BFONT, fontSize: 16, bold: true, color: INK, margin: 0 });
    s.addText(g[2], { x: x + 1.1, y: y + 0.72, w: 4.25, h: 1.0, fontFace: BFONT, fontSize: 12.5, color: SLATE, margin: 0, lineSpacingMultiple: 1.15 });
  });
  s.addText("Acquisition cost stays low because the product creates its own proof — every user’s win is marketing.", { x: 0.9, y: 6.2, w: 11.4, h: 0.4, fontFace: HFONT, italic: true, fontSize: 14, color: TEAL, margin: 0 });
  footer(s);

  // ============================================================
  // 15 — ROADMAP
  // ============================================================
  s = pres.addSlide(); s.background = { color: WHITE };
  kicker(s, 0.9, 0.55, "Roadmap");
  title(s, 0.9, 0.9, "Tool → platform → the income rail");
  const phases = [
    [I.seed, "V1 · The Wedge", TEAL, ["Launch a few focused chains end-to-end", "OAuth connect + AI content + auto-publish", "One earnings dashboard", "Goal: % earning within 30 days"]],
    [I.layers, "V2 · Scale", NAVY, ["Full 50+ template library", "Chain marketplace (users sell chains)", "“Smart Recommend” AI from earnings data", "Autopilot tiers + new verticals"]],
    [I.wallet, "V3 · Income Rail", "16264F", ["Embedded fintech: creator wallet", "Instant payouts on earnings", "Capital advances vs. proven income", "B2B / white-label licensing"]],
  ];
  const phaseIcons = [I.seed, I.layers, I.wallet];
  phases.forEach((p, i) => {
    const x = 0.9 + i * 3.95;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 2.05, w: 3.65, h: 4.3, fill: { color: i === 0 ? CLOUD : (i === 1 ? NAVY : NAVY2) }, rectRadius: 0.1, shadow: i === 0 ? shadow() : undefined });
    s.addShape(pres.shapes.OVAL, { x: x + 0.35, y: 2.4, w: 0.8, h: 0.8, fill: { color: i === 0 ? TEAL : MINT } });
    s.addImage({ data: phaseIcons[i], x: x + 0.57, y: 2.62, w: 0.36, h: 0.36 });
    s.addText(p[1], { x: x + 0.35, y: 3.35, w: 3.0, h: 0.45, fontFace: BFONT, fontSize: 17, bold: true, color: i === 0 ? TEAL : MINT, margin: 0 });
    s.addText(bullets(p[3]), { x: x + 0.35, y: 3.85, w: 3.0, h: 2.4, fontFace: BFONT, fontSize: 12.5, color: i === 0 ? SLATE : ICE, margin: 0, lineSpacingMultiple: 1.1 });
  });
  footer(s);

  // ============================================================
  // 16 — FINANCIAL SNAPSHOT
  // ============================================================
  s = pres.addSlide(); s.background = { color: WHITE };
  kicker(s, 0.9, 0.55, "Financial Snapshot");
  title(s, 0.9, 0.9, "Illustrative path — first three years");
  s.addText("Revenue (₹ Cr)", { x: 0.9, y: 1.85, w: 6.6, h: 0.35, fontFace: BFONT, fontSize: 13, bold: true, color: SLATE, margin: 0 });
  s.addChart(pres.charts.BAR, [{ name: "Revenue", labels: ["Year 1", "Year 2", "Year 3"], values: [0.3, 4, 25] }], {
    x: 0.7, y: 2.25, w: 6.9, h: 4.0, barDir: "col",
    chartColors: [TEAL], chartArea: { fill: { color: "FFFFFF" } },
    catAxisLabelColor: SLATE, catAxisLabelFontSize: 13, valAxisLabelColor: SLATE, valAxisLabelFontSize: 10,
    valGridLine: { color: "E2E8F0", size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: INK, dataLabelFontSize: 13, dataLabelFontBold: true,
    showLegend: false, showTitle: false, barGapWidthPct: 60,
  });
  const fin = [
    ["~250K", "users by Year 3", "(5K → 50K → 250K)"],
    ["8–12%", "convert to paying", "the lever that moves everything"],
    ["₹25 Cr", "ARR run-rate exit", "subscription + usage + override"],
  ];
  let finY = 2.05;
  fin.forEach((c) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 8.1, y: finY, w: 4.3, h: 1.35, fill: { color: CLOUD }, rectRadius: 0.1 });
    s.addText(c[0], { x: 8.4, y: finY + 0.12, w: 3.7, h: 0.6, fontFace: HFONT, fontSize: 30, bold: true, color: TEAL, margin: 0 });
    s.addText(c[1], { x: 8.4, y: finY + 0.72, w: 3.7, h: 0.35, fontFace: BFONT, fontSize: 14, bold: true, color: INK, margin: 0 });
    s.addText(c[2], { x: 8.4, y: finY + 1.0, w: 3.8, h: 0.3, fontFace: BFONT, fontSize: 11, italic: true, color: SLATE, margin: 0 });
    finY += 1.45;
  });
  s.addText("Illustrative top-down model — placeholder numbers to replace with a bottom-up build-up. Key drivers: user growth, % paying, and revenue per user.", { x: 0.9, y: 6.5, w: 11.5, h: 0.4, fontFace: BFONT, italic: true, fontSize: 10.5, color: SLATE, margin: 0 });
  footer(s);

  // ============================================================
  // 17 — TEAM
  // ============================================================
  s = pres.addSlide(); s.background = { color: WHITE };
  kicker(s, 0.9, 0.55, "Team");
  title(s, 0.9, 0.9, "Built by a founder close to the problem");
  // founder card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.9, y: 2.0, w: 5.4, h: 4.3, fill: { color: NAVY }, rectRadius: 0.1, shadow: shadow() });
  s.addShape(pres.shapes.OVAL, { x: 1.25, y: 2.4, w: 1.1, h: 1.1, fill: { color: NAVY2 } });
  s.addImage({ data: I.users, x: 1.55, y: 2.7, w: 0.5, h: 0.5 });
  s.addText("[Your Name]", { x: 2.6, y: 2.5, w: 3.5, h: 0.5, fontFace: BFONT, fontSize: 22, bold: true, color: WHITE, margin: 0 });
  s.addText("Founder & CEO", { x: 2.6, y: 3.02, w: 3.5, h: 0.35, fontFace: BFONT, fontSize: 14, color: MINT, margin: 0 });
  s.addText("kam@gotoretreats.com", { x: 2.6, y: 3.36, w: 3.6, h: 0.3, fontFace: BFONT, fontSize: 12, color: "8FA6CC", margin: 0 });
  s.addText("Why me", { x: 1.25, y: 3.95, w: 4, h: 0.35, fontFace: BFONT, fontSize: 13, bold: true, color: MINT, charSpacing: 1, margin: 0 });
  s.addText("[Add 2–3 lines: your edge — operator/building experience, why you understand this user, any unfair advantage or early traction.]", { x: 1.25, y: 4.3, w: 4.75, h: 1.8, fontFace: BFONT, fontSize: 13, italic: true, color: ICE, margin: 0, lineSpacingMultiple: 1.25 });
  // key hires
  s.addText("First key hires", { x: 6.7, y: 2.0, w: 5, h: 0.4, fontFace: BFONT, fontSize: 16, bold: true, color: INK, margin: 0 });
  const hires = [
    [I.cog, "Founding Engineer", "Owns the integration layer (OAuth, APIs, automation)."],
    [I.robot, "AI / Product", "The content-generation engine and template tooling."],
    [I.handshake, "Growth & Partnerships", "Creator deals, community, and low-cost acquisition."],
  ];
  let hy = 2.55;
  hires.forEach((h2) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.7, y: hy, w: 5.7, h: 1.05, fill: { color: CLOUD }, rectRadius: 0.08 });
    s.addShape(pres.shapes.OVAL, { x: 6.95, y: hy + 0.3, w: 0.45, h: 0.45, fill: { color: NAVY } });
    s.addImage({ data: h2[0] === I.cog || h2[0] === I.handshake ? h2[0] : h2[0], x: 7.05, y: hy + 0.4, w: 0.25, h: 0.25 });
    s.addText(h2[1], { x: 7.55, y: hy + 0.16, w: 4.6, h: 0.35, fontFace: BFONT, fontSize: 15, bold: true, color: INK, margin: 0 });
    s.addText(h2[2], { x: 7.55, y: hy + 0.52, w: 4.7, h: 0.4, fontFace: BFONT, fontSize: 12, color: SLATE, margin: 0 });
    hy += 1.2;
  });
  s.addText("Advisors: [add names — ideally creator-economy, fintech, or growth operators].", { x: 6.7, y: 6.15, w: 5.7, h: 0.4, fontFace: BFONT, italic: true, fontSize: 11.5, color: SLATE, margin: 0 });
  footer(s);

  // ============================================================
  // 18 — THE ASK
  // ============================================================
  s = pres.addSlide(); s.background = { color: NAVY };
  s.addShape(pres.shapes.OVAL, { x: 11.9, y: -1.0, w: 3.0, h: 3.0, fill: { color: NAVY2 } });
  kicker(s, 0.9, 0.6, "The Ask", MINT);
  title(s, 0.9, 0.98, "Raising ₹___ to prove the engine", WHITE);
  // use of funds
  s.addText("Use of funds", { x: 0.9, y: 2.05, w: 5, h: 0.4, fontFace: BFONT, fontSize: 15, bold: true, color: MINT, charSpacing: 1, margin: 0 });
  const funds = [["Product & integrations", "45%"], ["AI & infrastructure", "20%"], ["Growth / first users", "25%"], ["Team & ops", "10%"]];
  let uy = 2.55;
  funds.forEach((f) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.9, y: uy, w: 5.6, h: 0.78, fill: { color: NAVY2 }, rectRadius: 0.08 });
    // label + percentage on the navy track (always readable)
    s.addText(f[0], { x: 1.15, y: uy + 0.06, w: 4.0, h: 0.4, fontFace: BFONT, fontSize: 13.5, bold: true, color: WHITE, valign: "middle", margin: 0 });
    s.addText(f[1], { x: 4.7, y: uy + 0.06, w: 0.75, h: 0.4, fontFace: BFONT, fontSize: 13.5, bold: true, color: MINT, align: "right", valign: "middle", margin: 0 });
    // green meter strip below the text — never crosses the label
    const trackW = 5.2, fillW = (parseInt(f[1]) / 100) * trackW;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 1.15, y: uy + 0.5, w: trackW, h: 0.12, fill: { color: NAVY }, rectRadius: 0.06 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 1.15, y: uy + 0.5, w: fillW, h: 0.12, fill: { color: TEAL }, rectRadius: 0.06 });
    uy += 0.92;
  });
  // milestones
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.9, y: 2.05, w: 5.5, h: 3.95, fill: { color: NAVY2 }, rectRadius: 0.1 });
  s.addImage({ data: I.flag, x: 7.2, y: 2.3, w: 0.45, h: 0.45 });
  s.addText("What this milestone proves", { x: 7.75, y: 2.32, w: 4.4, h: 0.4, fontFace: BFONT, fontSize: 16, bold: true, color: MINT, margin: 0 });
  s.addText(bullets([
    "First 100 real users onboarded end-to-end",
    "Core metric: % of users earning within 30 days",
    "At least one chain producing repeatable income",
    "Early retention + the first slice of our data moat",
  ]), { x: 7.2, y: 2.9, w: 4.9, h: 3.0, fontFace: BFONT, fontSize: 14, color: ICE, margin: 0, lineSpacingMultiple: 1.25 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.9, y: 6.25, w: 11.5, h: 0.7, fill: { color: TEAL }, rectRadius: 0.08 });
  s.addText("Prove ONE chain works for ONE real user → then scale the catalog. That’s the whole plan.", { x: 1.2, y: 6.25, w: 11, h: 0.7, fontFace: BFONT, fontSize: 15, bold: true, color: WHITE, valign: "middle", margin: 0 });
  footer(s, true);

  // ============================================================
  // 17 — CLOSING VISION
  // ============================================================
  s = pres.addSlide(); s.background = { color: NAVY };
  s.addShape(pres.shapes.OVAL, { x: -1.2, y: 5.4, w: 3.4, h: 3.4, fill: { color: NAVY2 } });
  s.addShape(pres.shapes.OVAL, { x: 11.6, y: -1.2, w: 3.4, h: 3.4, fill: { color: NAVY2 } });
  s.addText("THE VISION", { x: 0.9, y: 2.0, w: 8, h: 0.4, fontFace: BFONT, fontSize: 13, bold: true, color: MINT, charSpacing: 3, margin: 0 });
  s.addText([
    { text: "We start as a tool,\n", options: { color: WHITE } },
    { text: "become a platform,\n", options: { color: ICE } },
    { text: "and end as the financial rail\nfor the creator economy.", options: { color: MINT, bold: true } },
  ], { x: 0.85, y: 2.6, w: 11.6, h: 2.6, fontFace: HFONT, fontSize: 34, bold: true, margin: 0, lineSpacingMultiple: 1.1 });
  s.addText("MoneyChains — turning skills into income, one chain at a time.", { x: 0.9, y: 5.5, w: 11, h: 0.5, fontFace: HFONT, italic: true, fontSize: 17, color: ICE, margin: 0 });
  s.addText("Founder  ·  kam@gotoretreats.com", { x: 0.9, y: 6.3, w: 8, h: 0.4, fontFace: BFONT, fontSize: 12, color: "8FA6CC", margin: 0 });
  footer(s, true);

  await pres.writeFile({ fileName: "/Users/akanksha/work/Startup/MoneyChains_Pitch.pptx" });
  console.log("DECK WRITTEN — " + pageNum + " slides");
})();
