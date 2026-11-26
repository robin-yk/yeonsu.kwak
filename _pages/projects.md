---
layout: page
title: Research
permalink: /research/
nav: true
nav_order: 1
---

<div class="rc-list">
<nav class="rc-nav" aria-label="Research topics">
<a href="#pulsed-joule">Pulsed Joule</a>
<a href="#mw-pdh">Microwave PDH</a>
<a href="#ald-tio2">ALD titania</a>
<a href="#pcm-h2">Hydrogen release</a>
</nav>
<iframe id="pulsed-joule" class="rc-frame" src="{{ '/assets/research/pulsed-joule.html' | relative_url }}?v={{ site.time | date: '%s' }}" title="Pulsed Joule CH4 + CO2" scrolling="no"></iframe>
<iframe id="mw-pdh" class="rc-frame" src="{{ '/assets/research/mw-pdh.html' | relative_url }}?v={{ site.time | date: '%s' }}" title="MW-assisted PDH" scrolling="no"></iframe>
<iframe id="ald-tio2" class="rc-frame" src="{{ '/assets/research/ald-tio2.html' | relative_url }}?v={{ site.time | date: '%s' }}" title="ALD-TiO2 supports" scrolling="no"></iframe>
<iframe id="pcm-h2" class="rc-frame" src="{{ '/assets/research/pcm-h2.html' | relative_url }}?v={{ site.time | date: '%s' }}" title="PCM-heated H2 release" scrolling="no"></iframe>
</div>

<style>
body:has(.rc-list) {
  --global-bg-color: #191a1c;
  --global-text-color: #e9e8e5;
  --global-text-color-light: #b9b8b4;
  --global-theme-color: #e4c996;
  --global-hover-color: #e4c996;
  --global-divider-color: #383a3e;
}
.post:has(.rc-list) {
  display: grid;
  grid-template-columns: minmax(100px, 1fr) minmax(0, 660px);
  gap: 32px;
  max-width: 850px;
  margin: clamp(24px, 7vw, 90px) auto 0;
}
.post:has(.rc-list) .post-title {
  font: 600 13px/1.4 system-ui, sans-serif;
  letter-spacing: .09em;
  text-transform: uppercase;
  color: #b9b8b4;
  margin: 0;
}
.rc-list { display: grid; gap: 14px; }
.rc-nav {
  position: sticky;
  top: var(--global-navbar-height, 58px);
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 18px;
  padding: 10px 0;
  background: var(--global-bg-color);
  border-bottom: 1px solid var(--global-divider-color);
  font: 500 13px/1.5 system-ui, sans-serif;
}
.rc-nav a { color: #d4d2cf; }
.rc-nav a:hover, .rc-nav a:focus-visible { color: #e4c996; }
.rc-frame { scroll-margin-top: 128px; display: block; width: 100%; height: 320px; border: 0; background: transparent; }
@media (max-width: 800px) {
  .post:has(.rc-list) { grid-template-columns: minmax(0, 1fr); gap: 16px; max-width: 660px; }
}
</style>
<script>
(function () {
  document.querySelectorAll(".rc-frame").forEach(function (frame) {
    var observer = new ResizeObserver(function (entries) {
      frame.style.height = Math.ceil(entries[0].target.getBoundingClientRect().height) + "px";
    });
    function observeCard() {
      observer.disconnect();
      var card = frame.contentDocument && frame.contentDocument.querySelector(".card");
      if (card) observer.observe(card);
    }
    frame.addEventListener("load", observeCard);
    observeCard();
  });
})();
</script>
