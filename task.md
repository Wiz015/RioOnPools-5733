# Rio On Pools — Build Progress

## Done
- app_init at /home/user/rio-on-pools
- design.md written
- images copied to packages/web/public/images/
- styles.css: palette tokens, fonts (Big Shoulders Display / Public Sans / Space Mono), gauge-tag util, marquee keyframes
- index.html: title/meta/fonts
- lib/tours.ts, lib/worker.ts, lib/faq-data.ts written
- motion package installed

## Done (cont.)
- Components built: GaugeTag/StatBadge, Reveal, provider.tsx (booking modal context), SuccessModal, BookingModal, Navigation, Footer, Layout, TourCard, MapEmbed, Seo
- Pages built: index.tsx (home, full), tours.tsx, tour-detail.tsx, about.tsx, faq.tsx, contact.tsx

## Next
- privacy-policy.tsx, terms-of-service.tsx pages
- Wire routes in app.tsx (/, /tours, /tours/:slug, /about, /faq, /contact, /privacy-policy, /terms-of-service)
- public/robots.txt, sitemap.xml, llms.txt
- cloudflare-worker.js reference file at project root
- bun run build, fix errors, visual QA (desktop+mobile), deliver

## Notes
- Map iframe (About + Contact): src provided in original plan attachment — Rio On Pools Google Maps embed pb=!1m18!1m12!1m3!1d3815.7468...
- WORKER_URL is placeholder in lib/worker.ts (https://rio-on-pools-worker.example.workers.dev) — client deploys real worker
- No em dashes in any copy
