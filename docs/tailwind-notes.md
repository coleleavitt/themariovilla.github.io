# Adding Tailwind CSS to this site

GitHub Pages serves static files and can't run a Node build, so the standard
Tailwind CLI build pipeline doesn't run there directly. You have two practical
paths. (Reference: Tailwind CSS v4.x — the `@tailwindcss/browser` package is the
zero-build option.)

## Option 1 — Browser build (no tooling, easiest)

Paste this into `<head>` and start using utility classes immediately:

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

```html
<div class="mx-auto max-w-sm rounded-xl border p-4 shadow-md">
  <img class="aspect-[4/5] w-full rounded-lg object-cover" src="..." alt="..." />
</div>
```

Pros: zero setup, works on Pages as-is.
Cons: ships a ~bigger JS file, and styles compile in the browser (brief flash on
load). Fine for a personal site; not ideal for max performance.

## Option 2 — Build locally, commit the CSS (best performance)

1. Install and run the Tailwind CLI to produce a static stylesheet:

   ```bash
   npm install tailwindcss @tailwindcss/cli
   npx @tailwindcss/cli -i ./resources/css/input.css \
                        -o ./resources/css/tailwind.css --minify
   ```

   `input.css` just needs:

   ```css
   @import "tailwindcss";
   ```

2. Link the generated file in `index.html`:

   ```html
   <link rel="stylesheet" href="./resources/css/tailwind.css" />
   ```

3. Commit `resources/css/tailwind.css` so Pages serves the prebuilt file.

To automate, run that build in a GitHub Action on push to `main` and commit the
output (or publish via the Pages "GitHub Actions" source).

## Recommendation

This site currently uses small, hand-written CSS with design tokens
(`resources/css/style.css`) — no dependency, fast load. Keep that unless you
want Tailwind's utility workflow; if you do, Option 2 gives the smallest,
fastest result on GitHub Pages.
