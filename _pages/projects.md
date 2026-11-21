---
layout: page
title: Research
permalink: /research/
nav: true
nav_order: 1
---

<div class="research-cards">
<iframe class="research-card" src="{{ '/assets/research/pulsed-joule.html' | relative_url }}" title="Pulsed Joule CH4 + CO2" loading="lazy" scrolling="no"></iframe>
<iframe class="research-card" src="{{ '/assets/research/mw-pdh.html' | relative_url }}" title="MW-assisted PDH" loading="lazy" scrolling="no"></iframe>
<iframe class="research-card" src="{{ '/assets/research/ald-tio2.html' | relative_url }}" title="ALD-TiO2 supports" loading="lazy" scrolling="no"></iframe>
<iframe class="research-card" src="{{ '/assets/research/pcm-h2.html' | relative_url }}" title="PCM-heated H2 release" loading="lazy" scrolling="no"></iframe>
</div>

<style>
.research-card { width: 100%; height: 340px; border: 0; display: block; margin: 0 0 20px; }
</style>
<script>
(function () {
  function fit() {
    document.querySelectorAll(".research-card").forEach(function (f) {
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
