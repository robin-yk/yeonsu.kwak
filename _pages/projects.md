---
layout: page
title: Research
permalink: /research/
nav: true
nav_order: 1
---

<div class="rc-list">
<iframe class="rc-frame" src="{{ '/assets/research/pulsed-joule.html' | relative_url }}?v={{ site.time | date: '%s' }}" title="Pulsed Joule CH4 + CO2" loading="lazy" scrolling="no"></iframe>
<iframe class="rc-frame" src="{{ '/assets/research/mw-pdh.html' | relative_url }}?v={{ site.time | date: '%s' }}" title="MW-assisted PDH" loading="lazy" scrolling="no"></iframe>
<iframe class="rc-frame" src="{{ '/assets/research/ald-tio2.html' | relative_url }}?v={{ site.time | date: '%s' }}" title="ALD-TiO2 supports" loading="lazy" scrolling="no"></iframe>
<iframe class="rc-frame" src="{{ '/assets/research/pcm-h2.html' | relative_url }}?v={{ site.time | date: '%s' }}" title="PCM-heated H2 release" loading="lazy" scrolling="no"></iframe>
</div>

<style>
.rc-frame { width: 100%; height: 340px; border: 0; padding: 0; margin: 0 0 28px; display: block; background: #fff; border-radius: 14px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 28px rgba(0, 0, 0, 0.07); overflow: hidden; }
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
