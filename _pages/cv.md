---
layout: cv
permalink: /cv/
title: cv
nav: true
nav_order: 5
cv_pdf: /assets/pdf/YeonsuKwak_CV.pdf # you can also use external links here
cv_format: rendercv # options: rendercv, jsonresume
description: Catalysis, reaction engineering, and the electrification of chemical manufacturing. Last updated August 2026.
toc:
  sidebar: left
---

<script>
  (() => {
    const simplifyCvLabels = () => {
      document.querySelectorAll(".cv b, .cv h3").forEach((element) => {
        if (element.textContent.trim() === "Professional Title") element.textContent = "Position";
        if (element.textContent.trim() === "Professional Summary") element.textContent = "Summary";
      });
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", simplifyCvLabels);
    } else {
      simplifyCvLabels();
    }
  })();
</script>
