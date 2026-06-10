# Jessica Laureta — Portfolio

A static portfolio site for Jessica Laureta, Software Engineer.

Built with **React 18** (via CDN) + **Babel standalone** for client-side JSX transpilation — no build step required.

## Live Site

Deployed automatically to GitHub Pages:
**[lauretagabriel.github.io/jecport](https://lauretagabriel.github.io/jecport/)**

## Local Development

Serve the project root with any static file server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node (npx)
npx serve .
```

Then open `http://localhost:8000` in your browser.

## Deployment

Deployment is fully automated via **GitHub Actions**.

- **Trigger**: Every push to `main` (or manual dispatch from the Actions tab).
- **Workflow**: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
- **How it works**: The workflow uploads all static files and deploys them to GitHub Pages using `actions/deploy-pages`.

### First-time Setup

1. Go to your repository **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Push to `main` — the workflow will run and deploy automatically.

## Project Structure

```
├── index.html           # Entry point
├── styles.css           # All styles
├── app.jsx              # Main React app
├── sections.jsx         # Page section components
├── data.jsx             # Portfolio content / data
├── icons.jsx            # SVG icon components
├── tweaks-panel.jsx     # Theme/tweaks panel component
├── assets/              # Images, logos, resume PDF
│   └── gallery/         # Business trip / travel photos
├── uploads/             # Uploaded files (resume PDF)
└── .github/workflows/   # CI/CD pipeline
    └── deploy.yml       # GitHub Pages deployment
```
