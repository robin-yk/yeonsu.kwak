---
layout: page
title: tools
permalink: /tools/
description: Browser-based models for electrified reactor design.
published: true
nav: true
nav_order: 3
---

<section class="tool-feature" aria-labelledby="screenjoule-title">
  <p class="tool-kicker">Open-source reactor design toolkit</p>
  <h2 id="screenjoule-title">ScreenJoule</h2>
  <p class="tool-feature-title">Electrothermal Design of Reactor Elements under Power-Supply and Electrode Constraints</p>
  <p class="tool-feature-meta"><strong>Yeonsu Kwak*</strong><span aria-hidden="true"> · </span>Preprint, 2026</p>
  <div class="tool-actions">
    <a class="tool-action primary" href="https://robin-yk.github.io/ScreenJoule/dist/#joule3d">Open ScreenJoule <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
    <a class="tool-action" href="{{ '/assets/pdf/ScreenJoule-Preprint-2026.pdf' | relative_url }}" target="_blank" rel="noopener">Read preprint <i class="fa-regular fa-file-pdf" aria-hidden="true"></i></a>
    <a class="tool-action" href="https://github.com/robin-yk/Electrification-Suite">Source code <i class="fa-brands fa-github" aria-hidden="true"></i></a>
  </div>
</section>

ScreenJoule brings three browser-based solvers together for electrified reactor design. Each runs locally in the browser and is also importable as a standalone JavaScript module.

{% comment %}
Temporarily hidden while the older model interfaces are being revised.

## Models

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
      <p>Selectivity to a reaction intermediate under pulsed versus continuous heating, compared at matched average temperature, electrical power or conversion, with the Jensen's-inequality and Damköhler arguments behind it.</p>
    </a>

  </div>
{% endcomment %}
