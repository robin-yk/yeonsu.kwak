# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

`AGENTS.md` (imported above) is the **authoritative** agent entry point for this site: where each kind of content lives, the three silent failure modes, and the validated command set. Read it before editing anything. Everything below is longer-form operational detail that does not belong in the short entry point.

## Daily dev loop

```bash
bundle install                       # ruby gems
bundle exec jekyll serve             # dev server → http://localhost:4000/yeonsu.kwak/  (NOTE baseurl)
bundle exec jekyll build             # production-style build to _site/
npm ci && npm run lint:prettier      # formatting check; `npx prettier . --write` fixes
bundle exec al-folio upgrade apply --safe   # deterministic codemods
bundle exec al-folio upgrade overrides diff <path>   # then `overrides accept <path>` to acknowledge an override
```

## Optional toolchains

- **Responsive images.** `imagemagick.enabled: true` in `_config.yml` needs ImageMagick `convert` on `PATH`. Without it the build still succeeds; it just logs `convert: not found` and skips the WebP variants.
- **Scholar citation counts.** `bin/update_scholar_citations.py` (and `.github/workflows/update-citations.yml`) need `scholar_userid` set in `_data/socials.yml` and `scholarly` installed from `requirements.txt`. The ID is set, so the workflow runs weekly. Google Scholar rate-limits scrapers, so an occasional failed run is expected.
- **Manual deploy.** `bin/deploy` is the manual `gh-pages` build + purgecss + force-push path; `deploy.yml` normally handles it. `purgecss` is not a devDependency — `npm install -g purgecss`.

## Docker serving model

`docker compose up -d` bind-mounts the repo to `/srv/jekyll` and runs `bin/entry_point.sh`, which serves with `--force_polling --destination /tmp/_site`. Output deliberately goes to **container-local `/tmp/_site`, not the bind-mounted `_site`** — writing `_site` back across the host bind mount caused write deadlocks. The container also `inotifywait`s `_config.yml` and restarts Jekyll on change (config edits aren't hot-reloaded by `--watch`). Verify at `http://127.0.0.1:8080/yeonsu.kwak/`.

## CI

- `deploy.yml` — builds and force-pushes `_site` to `gh-pages` on every push to `main`. This is the one that matters.
- `prettier.yml` / `prettier-html.yml` — Prettier with `@shopify/prettier-plugin-liquid`, `printWidth: 150`.
- `axe.yml`, `broken-links-site.yml`, `broken-links.yml` — accessibility and link checking (these build with a blank baseurl on purpose).
- `update-tocs.yml` — regenerates `<!--ts-->…<!--te-->` blocks in changed root Markdown. Expect a follow-up auto-commit on `main` after heading changes.
- `upgrade-check.yml` — `bundle exec al-folio upgrade audit`.
- `update-citations.yml` — runs weekly now that `scholar_userid` is set, writing counts into `_data/citations.yml`.

The workflows that only made sense for the template project itself (`release.yml`, `deploy-image.yml`, `docker-slim.yml`, `deploy-docker-tag.yml`, `lighthouse-badger.yml`, `update-screenshots.yml`, `schedule-posts.txt`) have been deleted, along with the template's issue forms, PR template, Copilot instruction set and `docs/`. Recover any of them from history rather than from the upstream repository, since the versions here had already been edited for this site: `git log --diff-filter=D -- <path>`, then `git show <sha>^:<path>`.

## Gem version pins

`Gemfile` pins every `al-*` gem to an exact released version in `group :al_folio_plugins`, and `_config.yml` lists the same gems under `plugins:`. Read the current pins from the `Gemfile` rather than trusting any version quoted in prose — including here.

## Content accuracy

Publications, dates, awards, patent numbers, and affiliations on this site come from Yeonsu's CV (`assets/pdf/YeonsuKwak_CV.pdf`). Do not add or alter any of them from inference — ask instead.
