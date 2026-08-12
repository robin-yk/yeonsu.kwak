---
layout: page
permalink: /publications/
title: publications
description: "† equal contribution, * corresponding author."
nav: true
nav_order: 1
---

<!-- _pages/publications.md -->

<!-- Filter by authorship. Hidden until the script runs, so it never shows as a dead control. -->
<div class="pub-filter" role="group" aria-label="Filter publications by authorship" hidden>
  <button type="button" data-filter="first" aria-pressed="true">First authorship</button>
  <button type="button" data-filter="co" aria-pressed="false">Co-authorship</button>
  <button type="button" data-filter="all" aria-pressed="false">All</button>
</div>

<div class="publications" id="published">

{% bibliography --query @article %}

</div>

<h2 id="under-review">Under review &amp; in preparation</h2>

<div class="publications">

{% bibliography --query @unpublished %}

</div>

<!-- `bust_file_cache` appends an MD5 of the file. Without it the URL never changes,
     so a browser holding an older copy keeps running it: the numbering shipped and
     simply did not appear for anyone who had loaded this page before. -->
<script src="{{ '/assets/js/pubfilter.js' | relative_url | bust_file_cache }}"></script>
