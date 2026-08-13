---
layout: page
title: tools
permalink: /tools/
description: Interactive browser models of electrified reactors. No install, no account, no backend.
nav: true
nav_order: 3
---

[**Electrified Reactor Models**](https://robin-yk.github.io/Electrification-Suite/#home) is a set of three solvers for electrified reactor design, written because these calculations are usually done ad hoc in spreadsheets and one-off scripts. Each runs entirely in the browser, and each solver is also importable as a standalone JavaScript module. Source and test runs are on [GitHub](https://github.com/robin-yk/Electrification-Suite) and [GitHub page](https://robin-yk.github.io/Electrification-Suite/).

<div class="tool-list">

<a class="tool" href="https://robin-yk.github.io/Electrification-Suite/#microwave">
    <img src="{{ '/assets/img/tools/microwave.png' | relative_url }}" alt="" width="144" height="146" loading="lazy" />
    <h3>Microwave Heating 2D Model</h3>
    <p>Steady-state powder-bed temperature fields, with dielectric response, penetration depth and experimental calibration.</p>
  </a>

<a class="tool" href="https://robin-yk.github.io/Electrification-Suite/#joule">
    <img src="{{ '/assets/img/tools/joule.png' | relative_url }}" alt="" width="144" height="144" loading="lazy" />
    <h3>Joule Heating 2D Model</h3>
    <p>Electrical and thermal screening across materials, geometry and hardware limits, with an axisymmetric temperature field.</p>
  </a>

<a class="tool" href="https://robin-yk.github.io/Electrification-Suite/#rphcjh">
    <img src="{{ '/assets/img/tools/rph.png' | relative_url }}" alt="" width="144" height="144" loading="lazy" />
    <h3>RPH vs CJH Visualizer</h3>
    <p>Jensen's-inequality effects of rapid versus continuous heating on temperature-dependent kinetics and transport, and the resulting exposure and Damköhler ratios for CH<sub>4</sub> + CO<sub>2</sub> coupling.</p>
  </a>

</div>
