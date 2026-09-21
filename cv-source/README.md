# CV source

`YeonsuKwak_CV.tex` is the source for `assets/pdf/YeonsuKwak_CV.pdf`, the CV the
site offers for download. This directory is in `exclude` in `_config.yml`, so it
stays out of the built site.

## Rebuilding

```bash
pdflatex -interaction=nonstopmode YeonsuKwak_CV.tex   # run twice
cp YeonsuKwak_CV.pdf ../assets/pdf/YeonsuKwak_CV.pdf
```

Needs `texlive-latex-base`, `-recommended`, `-extra`, `-fonts-recommended` and
`lmodern`. Overleaf (pdfLaTeX) compiles it unchanged.

**The PDF does not rebuild itself.** Editing `_data/cv.yml` or
`_bibliography/papers.bib` leaves the downloadable PDF stale until someone
recompiles here and commits the result.

## Checks that matter

A clean exit code is not enough — the failures below all compile "successfully".

```bash
grep -cE 'Overfull' YeonsuKwak_CV.log    # want 0
pdffonts YeonsuKwak_CV.pdf               # want Type 1 throughout, no bitmap fonts
pdftotext -layout YeonsuKwak_CV.pdf - | grep -oE '^ *\[[0-9]+\]'
#   publication numbers must descend: [11]…[1], [16]…[1], [3][2][1]
```

## Things that bite

- `\titleformat`'s optional `[after]` argument ends at the first `]`, so
  `\titlerule[0.9pt]` cannot be inlined there — hence `\sectionrule`.
- enumitem's `label=` never steps `enumi` unless the label contains `\arabic*`;
  every entry then prints the same number. Publication numbering uses the
  `pubnum` counter and `\pubitem` instead.
- `\href` only reads its URL verbatim at top level. Passed through a macro, an
  `&` becomes an alignment tab — the Scholar link omits `&hl=en` for this reason.
- T1 encoding with stock Computer Modern embeds bitmap fonts; `lmodern` fixes it.
- `\color` at the start of a `[t]` minipage shifts its baseline. Use
  `\textcolor{…}{…}` inside `\dateline`.

## Conventions

- Adding a publication means bumping `N` in `\begin{publist}{N}`; nothing derives it.
- Facts come from `_bibliography/papers.bib`, `_data/cv.yml`, or Yeonsu — never
  from inference. See `AGENTS.md`.
- The References section carries no contact details by choice.
