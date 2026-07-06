# Rio On Pools — Design System

## Business
Rio On Pools, licensed tour operator, Cayo District, Belize. Domain rioonpools.com. Email info@rioonpools.com. Phone +501 639-0074.
Lead-capture booking only (no online payment). Forms POST to a Cloudflare Worker deployed by the client (Resend on the Worker side). App only needs `WORKER_URL`.

## Signature concept: "Pool Gauge"
Rio On Pools cuts through exposed granite (not the limestone that covers most of Belize) inside a rare pine forest ecosystem. The site's identity is built on a stream-gauge plaque — the small metal marker hydrologists bolt to rock recording pool number, drop, depth.

```
[ POOL 04 — DROP 6 FT — DEPTH 4 FT ]
```

Rendered as a small rectangular monospace (Space Mono) tag with subtle corner "bolt" dots. Used as: photo captions, hero data readouts, tour card overlays, stat blocks, section eyebrows. Appears everywhere, consistently — the load-bearing visual device. Distinct from other client sites (field-survey tag = Caracol, diver's depth-log bracket = cave tubing) — this is a hydrology/stream-gauge metaphor, unique to this site.

## Color Palette

| Token | Hex | Use |
|---|---|---|
| `--granite` | #4B4F52 | Dark sections, ink text |
| `--granite-deep` | #2E3133 | Darkest sections, footer |
| `--pine` | #2C4A3B | Primary accent, buttons |
| `--pine-light` | #5B7D68 | Secondary accents |
| `--water` | #2E9CAA | Turquoise pool-water accent |
| `--sun` | #D98F46 | Warm amber CTA highlight |
| `--mist` | #F4F1E8 | Light background, cream |
| `--stone-light` | #E4E1D6 | Card surfaces on light sections |

Balance: mostly mist/cream backgrounds, pine as accent (buttons, tags, underlines), amber for CTA emphasis, water for data/gauge highlights, granite for dark sections (footer, some feature splits). Do not let green dominate every section.

## Typography
- Display/headings: **Big Shoulders Display**, condensed, weight 700-900, uppercase-leaning, engraved-signage feel.
- Body: **Public Sans**, clean/neutral, regular 400 / medium 500.
- Data/gauge readouts: **Space Mono**, exclusively for GaugeTag/StatBadge components, small caps letter-spacing.

Google Fonts import: Big Shoulders Display (700,800,900), Public Sans (400,500,600,700), Space Mono (400,700).

## Layout Patterns
- Sticky nav: transparent over hero, solid `--mist` with border on scroll.
- Hero: full-bleed granite-pool photo, dark gradient overlay, oversized condensed headline, GaugeTag data readout (elevation/pool count), two CTAs (Book Tour amber, View Tours outline).
- Ticker/marquee strip: granite/geology facts, dark granite-deep bg, space mono, scrolling.
- "Why Rio On Pools" split: photo + copy on granite-vs-limestone contrast + stat block.
- Tour cards (2): price stamp badge on photo corner, duration GaugeTag, Book Now + Details.
- Feature splits: Pine Ridge viewpoint, granite terrace/safety, wildlife — alternating image/copy sides.
- Gallery: asymmetric grid (not uniform), GaugeTag captions per photo.
- Stats band: oversized numerals, granite-deep bg, mist text.
- FAQ accordion.
- Map embed (About + Contact): client-provided Google Maps iframe.
- Closing CTA band, amber/pine gradient.
- Footer: granite-deep bg, contact + quick links + legal.

## Components
- Buttons: sharp/slight-radius rectangles (not pill). Primary = pine fill + mist text. Secondary/CTA = amber fill + granite-deep text. Outline variant for hero secondary CTA.
- Cards: sharp corners or 2-4px radius, 1px border that intensifies pine/water on hover, no heavy shadow.
- GaugeTag: `[ LABEL — VALUE — VALUE ]` bracket-style, monospace, corner bolt dots (small circles), border, used as caption/eyebrow/stat.
- BookingModal: multi-field lead form (name, email, phone, tour, date, guests, message) → posts to `WORKER_URL`, shows SuccessModal. Triggered from nav, hero, tour cards, closing CTA. Never inline embedded.
- Contact page: separate simpler general-inquiry form, distinct from booking modal.

## Motion
One orchestrated load with staggered reveals (Reveal.tsx wrapper using Motion/framer-motion), not scattered micro-interactions.

## Tours
1. **Rio On Pools & Mountain Pine Ridge Half-Day** — ~$95/person, 5-6 hrs. Stops: Rio On Pools swim, Rio Frio Cave, Big Rock Falls, Pine Ridge viewpoint. Includes guide, round-trip transport, park access, water.
2. **Caracol & Rio On Pools Full-Day Combo** — $250/person, 2-person minimum, transport included. ~10-11 hrs. Stops: Caracol ruins (climb Caana), Pine Ridge viewpoint, Rio On Pools swim on return. Includes guide, round-trip transport, Caracol entrance fee, packed lunch, water.

## Pages
Home, Tours (listing), Tour Detail (dynamic `/tours/:slug`), About (geology/history/safety/map), FAQ, Contact (form + map), Privacy Policy, Terms of Service.

## SEO
Semantic HTML, one h1/page, unique title/meta per page, JSON-LD (LocalBusiness/TravelAgency, FAQPage, Offer per tour, BreadcrumbList), OG + Twitter cards, sitemap.xml, robots.txt (allow GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot), llms.txt. No em dashes in copy.
