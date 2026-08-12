---
layout: page
title: tools
permalink: /tools/
description: Interactive browser models of electrified reactors. No install, no account, no backend.
nav: true
nav_order: 3
---

[**Electrification Suite**](https://robin-yk.github.io/Electrification/#home) is a set of three solvers for electrified reactor design, written because these calculations are usually done ad hoc in spreadsheets and one-off scripts. Each runs entirely in the browser, and each solver is also importable as a standalone JavaScript module. Source and tests are on [GitHub](https://github.com/robin-yk/Electrification).

<div class="tool-list">

<a class="tool" href="https://robin-yk.github.io/Electrification/#microwave">
    <img src="{{ '/assets/img/tools/microwave.png' | relative_url }}" alt="" width="144" height="146" loading="lazy" />
    <h3>Microwave Heating 2D Model</h3>
    <p>Steady-state powder-bed temperature fields, with dielectric response, penetration depth, heat transfer and experimental calibration.</p>
  </a>

<a class="tool" href="https://robin-yk.github.io/Electrification/#joule">
    <img src="{{ '/assets/img/tools/joule.png' | relative_url }}" alt="" width="144" height="144" loading="lazy" />
    <h3>Joule Heating 2D Optimizer</h3>
    <p>Electrical and thermal screening across materials, geometry, hardware limits and heat losses, with an axisymmetric temperature field.</p>
  </a>

<a class="tool" href="https://robin-yk.github.io/Electrification/#rphcjh">
    <img src="{{ '/assets/img/tools/rph.png' | relative_url }}" alt="" width="144" height="144" loading="lazy" />
    <h3>RPH vs CJH Dimensionless Visualizer</h3>
    <p>Jensen's-inequality effects of ramped versus continuous heating on temperature-dependent kinetics and transport, and the resulting exposure and Damköhler ratios for ethane cracking.</p>
  </a>

</div>
