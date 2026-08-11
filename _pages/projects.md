---
layout: page
title: research
permalink: /research/
description: Electrifying catalytic chemical manufacturing.
nav: true
nav_order: 2
horizontal: false
---

{% include figure.liquid loading="eager" path="assets/img/lab_reactors.jpg" class="img-fluid rounded z-depth-1" alt="Continuous-flow hydrogen reactor systems in the laboratory" %}

<div class="caption">Continuous-flow reactor systems built for scaled hydrogen release.</div>

<!-- pages/projects.md -->
<div class="projects">
{% assign sorted_projects = site.projects | sort: "importance" %}
{% if page.horizontal %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
{% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
{% endif %}
</div>
