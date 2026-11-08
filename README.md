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
