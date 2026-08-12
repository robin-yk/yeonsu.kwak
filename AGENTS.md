# Agent Guidelines for yeonsu.kwak

This is **Yeonsu Kwak's personal academic website**, built from the [al-folio](https://github.com/alshedivat/al-folio) v1.x Jekyll starter. It is a site, not a copy of the upstream template — the starter's own test suite, demo content, and contribution rules have been removed.

## Route your change

| Your change                                     | Goes in                                                                                       |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Bio, subtitle, headshot, contact block          | `_pages/about.md`                                                                             |
| Site metadata, feature flags, plugin activation | `_config.yml` (and `Gemfile` when adding/removing a plugin)                                   |
| Social links, CV download link                  | `_data/socials.yml`                                                                           |
| CV contents                                     | `_data/cv.yml`; the PDF is `assets/pdf/YeonsuKwak_CV.pdf`                                     |
| Publications                                    | `_bibliography/papers.bib`; badge links in `_data/venues.yml`                                 |
| News items                                      | `_news/` (one file per item, `inline: true` for one-liners)                                   |
| Research cards                                  | `_projects/` (`category` + `importance` drive grouping/order)                                 |
| Nav order                                       | `nav_order` in each page's front matter                                                       |
| A layout, include, or Sass partial              | prefer the owning `al-*` gem; a local override here is allowed but must be maintained by hand |

## Three failures that produce no error message

1. **Features fail silently.** A feature renders only when its gem is loaded _and_ its flag is on in `_config.yml` _and_ the page opts in. Otherwise the Liquid tag emits an empty string — no warning.
2. **`Gemfile` and `_config.yml` are two lists that must agree.** A plugin in only one of them is inert. Repo dirs use hyphens (`al-folio-core`); gem/plugin ids use underscores (`al_folio_core`).
3. **This site's baseurl is `/yeonsu.kwak`.** `_config.yml` already sets it, so a plain `bundle exec jekyll build` is correct. Blanking the baseurl is what renders the site unstyled with broken links. Dev server: `http://localhost:4000/yeonsu.kwak/`.

## Local commands

```bash
bundle install
bundle exec jekyll build          # baseurl comes from _config.yml
bundle exec jekyll serve          # → http://localhost:4000/yeonsu.kwak/
npm ci && npm run lint:prettier   # Prettier + @shopify/prettier-plugin-liquid, printWidth 150
bundle exec al-folio upgrade audit
```

`npx prettier . --write` fixes formatting. CI runs Prettier, link checking, axe accessibility, and the deploy workflow.

## Before you push

- Never invent facts about Yeonsu's record — publications, dates, awards, and affiliations must come from the CV or from Yeonsu directly.
- Run `npm run lint:prettier`.
- Deployment is automatic: `.github/workflows/deploy.yml` publishes `_site` to `gh-pages` on every push to `main`.

## Further reading

`docs/` still carries the upstream al-folio maintainer documentation. It describes the template project, not this site, so treat it as background reference only — `docs/CUSTOMIZE.md` and `docs/FAQ.md` are the useful ones.
