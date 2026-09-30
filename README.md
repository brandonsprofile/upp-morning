# UPP!

A single-screen, mobile-first morning companion concept for getting to Swedish class calmly and on time.

## Local preview

```sh
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## Validate and build

```sh
npm run check
npm run build
```

## Deployment and rollback

Pushes to `main` are validated, built, deployed to GitHub Pages, and smoke-tested against the exact commit SHA. To restore a known-good release without rewriting history, run the **Deploy GitHub Pages** workflow manually and enter that commit SHA in `deploy_ref`.
