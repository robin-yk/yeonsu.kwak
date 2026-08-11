# yeonsukwak-folio

Personal academic website for **Yeonsu Kwak** — Ph.D. candidate in Chemical & Biomolecular Engineering at the University of Delaware, working on heterogeneous catalysis, reaction engineering, and the electrification of chemical manufacturing.

Built on [al-folio](https://github.com/alshedivat/al-folio) (v1.x), a Jekyll starter that pulls its runtime from versioned `al-*` gems.

## Where the content lives

| What                                          | File                                                                    |
| --------------------------------------------- | ----------------------------------------------------------------------- |
| Bio, headshot, contact block on the home page | `_pages/about.md`                                                       |
| Site title, URL, feature flags                | `_config.yml`                                                           |
| Email, LinkedIn, GitHub, CV link              | `_data/socials.yml`                                                     |
| CV page contents                              | `_data/cv.yml` (the downloadable PDF is `assets/pdf/YeonsuKwak_CV.pdf`) |
| Publications                                  | `_bibliography/papers.bib`                                              |
| Journal badge links                           | `_data/venues.yml`                                                      |
| News items on the home page                   | `_news/`                                                                |
| Research cards                                | `_projects/`                                                            |

## Running it locally

```bash
bundle install
bundle exec jekyll serve      # → http://localhost:4000/yeonsukwak-folio/
```

Note the `/yeonsukwak-folio` path: `_config.yml` sets `baseurl`, so the site is not served from `/`. Building with a blank baseurl is what produces an unstyled page with broken links.

Optional extras: ImageMagick (`convert` on `PATH`) for responsive WebP images, and `npm ci && npm run lint:prettier` for formatting checks.

## Deploying

`.github/workflows/deploy.yml` builds the site and force-pushes `_site` to the `gh-pages` branch on every push to `main`. Enable it once under **Settings → Pages → Deploy from a branch → `gh-pages` / (root)**.

## License

MIT — see [LICENSE](LICENSE). The al-folio theme is MIT licensed by its authors.
