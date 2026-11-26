---
layout: page
title: Research
permalink: /research/
nav: true
nav_order: 1
---

<div class="rc-list">
<iframe class="rc-frame" src="{{ '/assets/research/pulsed-joule.html' | relative_url }}?v={{ site.time | date: '%s' }}" title="Pulsed Joule CH4 + CO2" scrolling="no"></iframe>
<iframe class="rc-frame" src="{{ '/assets/research/mw-pdh.html' | relative_url }}?v={{ site.time | date: '%s' }}" title="MW-assisted PDH" scrolling="no"></iframe>
<iframe class="rc-frame" src="{{ '/assets/research/ald-tio2.html' | relative_url }}?v={{ site.time | date: '%s' }}" title="ALD-TiO2 supports" scrolling="no"></iframe>
<iframe class="rc-frame" src="{{ '/assets/research/pcm-h2.html' | relative_url }}?v={{ site.time | date: '%s' }}" title="PCM-heated H2 release" scrolling="no"></iframe>
</div>

<style>
.post:has(.rc-list) { max-width: 1040px; margin-inline: auto; }
.post:has(.rc-list) .post-title { font: normal clamp(54px, 7vw, 92px)/1 Georgia, serif; letter-spacing: -.055em; }
.rc-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px 28px; align-items: start; }
.rc-frame { display: block; width: 100%; height: 460px; border: none; background: white; }
.rc-frame:first-child, .rc-frame:last-child { grid-column: 1 / -1; }
@media (max-width: 760px) { .rc-list { grid-template-columns: minmax(0, 1fr); gap: 24px; } }
</style>
<script>
(function () {
  function fit() {
    document.querySelectorAll(".rc-frame").forEach(function (f) {
      try {
        var c = f.contentDocument && f.contentDocument.querySelector(".card");
        if (c) f.style.height = Math.ceil(c.getBoundingClientRect().height) + 2 + "px";
      } catch (e) {}
    });
  }
  window.addEventListener("resize", fit);
  setInterval(fit, 500);
})();
</script>
