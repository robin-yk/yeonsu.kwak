---
layout: page
permalink: /publications/
title: publications
description: "10 first-author and 16 co-author peer-reviewed papers. † equal contribution, * corresponding author."
nav: true
nav_order: 1
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

{% bibliography --query @article %}

</div>

<h2 id="under-review">Under review &amp; in preparation</h2>

<div class="publications">

{% bibliography --query @unpublished %}

</div>
