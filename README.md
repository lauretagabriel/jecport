# Jessica Laureta — Portfolio

A fast, static portfolio site for Jessica Laureta, Software Engineer.

Built with plain **HTML, CSS, and vanilla JavaScript** — no framework, no build step, no dependencies.

## Live Site

**[www.jecport.com](https://www.jecport.com)**

## Running Locally

There is no build step. Just open the HTML file directly in your browser:

```bash
open index.html      # macOS
# or simply double-click index.html in your file explorer
```

> Everything works from `file://`. A local web server is only needed if you want
> absolute-path resources (the web manifest, sitemap) to resolve exactly as they
> do in production — in that case serve the project root with any static server,
> e.g. `npx serve .`, then open the printed URL.

## Project Structure

```
├── index.html          # The entire page (single document)
├── styles.css          # All styles and theme tokens
├── script.js           # Reveal animations, sticky nav, theme toggle, mobile sheet, gallery
├── site.webmanifest    # PWA manifest
├── sitemap.xml         # Sitemap for search engines
├── robots.txt          # Crawler directives
├── assets/             # Images, logos, icons, resume PDF
│   └── gallery/         # Business-trip / travel photos
└── .github/workflows/  # CI/CD
    └── deploy.yml       # GitHub Pages deployment
```

## Deployment

Deployment is fully automated via **GitHub Actions**.

- **Trigger**: every push to `main` (or a manual run from the Actions tab).
- **Workflow**: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
- **How it works**: the workflow uploads the repository root as a static artifact
  and publishes it to GitHub Pages, which serves the custom domain
  [www.jecport.com](https://www.jecport.com).

### First-time setup

1. In the repository, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Push to `main` — the workflow runs and deploys automatically.
