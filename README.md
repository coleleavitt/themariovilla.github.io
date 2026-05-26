# themariovilla.github.io

Personal website for **Mario Villa** — content creator and digital marketing specialist (Scottsdale, AZ).

## Layout

```
index.html            # the page
404.html              # custom not-found page
.nojekyll             # serve files as-is (no Jekyll build)
robots.txt            # crawler rules + sitemap pointer
sitemap.xml           # for search engines
resources/
  css/style.css       # all styling
  js/theme.js         # light/dark theme toggle
  images/             # profile + gallery + collab shots
  docs/               # resume PDF
```

## Local preview

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy

Push to `main`; GitHub Pages serves the repo root and rebuilds in ~1 minute.

## GitHub Pages notes / best practices

- **`.nojekyll`** is included so Pages serves the `resources/` folder and any
  dot-files verbatim instead of running them through Jekyll.
- The site is **plain static HTML/CSS/JS — no build step**, which is the most
  reliable thing to host on Pages.
- **Tailwind CSS:** Pages can't run a Node build, so the build-step Tailwind CLI
  isn't a fit here. Two options if you want Tailwind:
  1. **Browser build (no tooling)** — drop in
     `<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>`
     and use utility classes directly. Easiest, but ships a larger script and
     styles flash in on load.
  2. **Build then commit the output** — run the Tailwind CLI locally (or in a
     GitHub Action) to generate a minified `resources/css/tailwind.css`, commit
     that file, and link it. Best performance; needs a build step.
  The current site uses hand-written CSS with design tokens, which stays small
  and dependency-free. See `docs/tailwind-notes.md` for a ready-to-paste setup.
