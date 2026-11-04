# Portfolio build (from Claude Design handoff)

Regenerates `portfolio/` and `life/` from the `.dc.html` files in `design_handoff_portfolio/`.

1. `npm i puppeteer-core` (needs Google Chrome installed)
2. `node build.mjs`    renders each design file in headless Chrome and saves markup + CSS to `results.json`
3. `node assemble.mjs` writes `portfolio/**/index.html`, `life/index.html` and `portfolio/assets/site.js`

Paths at the top of both scripts are absolute; edit them if the folders move.
Hand edits to the generated pages are overwritten on the next run.
