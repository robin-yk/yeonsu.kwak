---
layout: page
title: Tools
permalink: /tools/
description:
published: true
nav: true
nav_order: 3
---

<section class="tool-showcase" aria-labelledby="screenjoule-title">
  <img src="{{ '/assets/img/tools/screenjoule-ui.png' | relative_url }}" width="1680" height="900" alt="ScreenJoule controls and a hollow reactor tube with its calculated temperature field" loading="eager">
  <div>
  <h2 id="screenjoule-title">ScreenJoule</h2>
  <p>Explore how material, geometry, electrodes, and power-supply limits affect reactor-element heating.</p>
  <div class="tool-actions">
    <a class="tool-action primary" href="https://robin-yk.github.io/ScreenJoule/dist/#joule3d">Open ScreenJoule <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
    <a class="tool-action" href="{{ '/assets/pdf/ScreenJoule-Preprint-2026.pdf' | relative_url }}" target="_blank" rel="noopener">Read preprint <i class="fa-regular fa-file-pdf" aria-hidden="true"></i></a>
  </div>
  </div>
</section>

<section class="tool-showcase" aria-labelledby="ethanecracker-title">
  <img src="{{ '/assets/img/tools/ethanecracker-ui.png' | relative_url }}" width="1680" height="900" alt="EthaneCracker interface with reactor controls, process flowsheet, and calculated costs" loading="lazy">
  <div>
    <h2 id="ethanecracker-title">EthaneCracker</h2>
    <p>Compare production costs and CO₂ emissions across operating conditions, energy prices, and heating methods.</p>
    <div class="tool-actions">
      <a class="tool-action primary" href="https://robin-yk.github.io/EthaneCracker/?model=aramco&amp;heat=fired&amp;T=850&amp;tau=0.3500&amp;steam=0.35&amp;P=1.5&amp;n=1&amp;cap=610&amp;ethane=200&amp;elec=0.07&amp;gas=4&amp;grid=0.36&amp;case=Reference+case">Open EthaneCracker <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
    </div>
  </div>
</section>

{% comment %}
Temporarily hidden while the older model interfaces are being revised.

## Models

  <div class="tool-list">

  <a class="tool" href="https://robin-yk.github.io/ElectrificationSuite/#microwave">
      <img src="{{ '/assets/img/tools/microwave.png' | relative_url }}" alt="" width="144" height="146" loading="lazy" />
      <h3>Microwave Heating 2D Model</h3>
      <p>Steady-state powder-bed temperature fields, with dielectric response, penetration depth and experimental calibration.</p>
    </a>

  <a class="tool" href="https://robin-yk.github.io/ElectrificationSuite/#joule">
      <img src="{{ '/assets/img/tools/joule.png' | relative_url }}" alt="" width="144" height="144" loading="lazy" />
      <h3>Joule Heating 2D Model</h3>
      <p>Electrical and thermal screening across materials, geometry and hardware limits, with an axisymmetric temperature field.</p>
    </a>

  <a class="tool" href="https://robin-yk.github.io/ElectrificationSuite/#rphcjh">
      <img src="{{ '/assets/img/tools/rph.png' | relative_url }}" alt="" width="144" height="144" loading="lazy" />
      <h3>RPH vs CJH Visualizer</h3>
      <p>Selectivity to a reaction intermediate under pulsed versus continuous heating, compared at matched average temperature, electrical power or conversion, with the Jensen's-inequality and Damköhler arguments behind it.</p>
    </a>

  </div>
{% endcomment %}
