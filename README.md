# Rio On Pools

## Development
```sh
bun install
bun run dev
```

## Build and serve
```sh
bun run build
bun run start
```
The production server uses port 3000 by default; set `PORT` to change it.
`bun run preview` serves the built site with Vite for local checking.

## Deploy to Vercel
Import this project into Vercel and set the Root Directory to the folder containing
`package.json` and `vercel.json` (not the parent folder).
The included `vercel.json` selects Vite, installs using the Bun lockfile,
builds with `bun run build`, and publishes `dist`.
Its SPA rewrite allows direct links and refreshes on routes such as `/tours`
and `/about` while Vercel continues to serve existing static assets normally.
Vercel serves the static build; it does not need to run `src/server.ts`.

## Page navigation
`src/web/components/ScrollToTop.tsx` resets scrolling before paint whenever the
route changes, including browser Back/Forward. Browser scroll restoration is
disabled while the app is mounted. Opening a booking modal or other same-page
interaction does not trigger this reset.

## Editing
- Tour data: `src/web/lib/adventures.ts`.
- Home selection: `homeTourIndexes` in `src/web/lib/tours.ts`.
  Default `[0, 1, 2, 3]`: Caracol + Pine Ridge, Cave Tubing, Xunantunich, ATM Cave.
  Index `4`: 7 Mile Cave Kayaking.
- Logo, 1200×630 OG image and multi-size favicon: `public/images/`.
- Public website summary: `public/llm.txt`, served at `/llm.txt`.

Booking and contact forms POST directly to
`https://mountainpinerigeleads.wisman-gt.workers.dev/`.
The external Worker processes submissions; no database or API keys are needed here.

Existing brand: Public Sans and Big Shoulders Display, pine green, amber and off-white.
