# yeonsu.kwak

Source for [robin-yk.github.io/yeonsu.kwak](https://robin-yk.github.io/yeonsu.kwak/), the personal academic site of **Yeonsu Kwak**, Ph.D. candidate in Chemical & Biomolecular Engineering at the University of Delaware.

Built on [al-folio](https://github.com/alshedivat/al-folio) v1.x, a Jekyll starter whose runtime comes from versioned `al-*` gems.

```bash
bundle install
bundle exec jekyll serve      # → http://localhost:4000/yeonsu.kwak/
```

Note the `/yeonsu.kwak` path: `_config.yml` sets `baseurl`, so the site is not served from `/`. Building with a blank baseurl is what produces an unstyled page with broken links.

[`AGENTS.md`](AGENTS.md) says which file to edit for each kind of content. Pushing to `main` deploys: `.github/workflows/deploy.yml` publishes `_site` to the `gh-pages` branch.

MIT, see [LICENSE](LICENSE). The al-folio theme is MIT licensed by its authors.
