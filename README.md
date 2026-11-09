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
`src/web/components/ScrollToTop.tsx` resets the viewport and document scroller
before paint and over the next two animation frames whenever the route changes,
including browser Back/Forward. Same-page navigation links also reset scrolling.
Browser scroll restoration and Chrome's automatic scroll anchoring are disabled
to prevent the old page position from being reapplied during the transition.
New user scroll input cancels scheduled resets. Booking modals, external links,
downloads, and in-page anchor links do not trigger the link-click reset.

After replacing the source files, deploy a new build on Vercel. Check that the
latest deployment is assigned to your production domain, then hard-refresh
Chrome (Ctrl+Shift+R on Windows/Linux, Cmd+Shift+R on Mac).

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
