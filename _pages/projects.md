---
layout: page
title: research
permalink: /research/
description: Electrifying catalytic chemical manufacturing, from the field-material interaction up to the pilot plant.
nav: true
nav_order: 2
related_publications: true
---

## Microwave catalysis

Propane dehydrogenation is equilibrium-limited and fouls with coke. Industry answers with a large H₂ co-feed and frequent regeneration, and both cost propylene yield.

Microwaves deposit energy in the catalyst rather than through the reactor wall, so the catalyst and the gas no longer sit at the same temperature. On PtSn/SiO₂ that gave coke-resistant PDH **with no H₂ co-feed**, at higher energy efficiency and with slower Pt sintering than a furnace-heated reactor {% cite kwak2023microwave %}. An independent lab at INMA Zaragoza reproduced it, which matters in a field with a history of results that do not travel between rigs. The same field-driven approach produces syngas by dry reforming of methane on doped ceria {% cite wang2023syngas %}.

I built the continuous-flow single-mode reactors, the catalyst synthesis and the cross-laboratory protocol. The heating physics is in the [microwave heating model]({{ '/tools/' | relative_url }}).

## Joule heating

Non-oxidative methane coupling wants high temperature. So does coke. Holding a catalyst there continuously means paying for both.

Pulsed Joule heating separates them: short, high-amplitude pulses reach the temperature C–H activation needs, then quench before carbon deposition and aromatization finish. Paired with microkinetic modeling, this explained why the pulse train beats steady heating at the same mean temperature, and let methane coupling run in tandem with CO₂ reduction on one bed {% cite kwak2025tandem %}. The same approach intensifies steam methane reforming and water-gas shift {% cite railkar2025smr %}.

Moving the heat source inside the tube also removes the fired furnace, the largest CO₂ source in steam cracking. I led the reactor development for an internally Joule-heated, short-contact-time ethane cracker projecting higher ethylene yield at lower capital and CO₂ cost {% cite mittal2025ethane %}. Both the [electrical-thermal optimizer and the pulsed-versus-continuous comparison]({{ '/tools/' | relative_url }}) are available to run in the browser.

## Operando characterization

The standing objection to microwave catalysis is that nobody can say what temperature the catalyst is at, which makes any "non-thermal" claim unfalsifiable. Answering it means measuring the dielectric response _during_ reaction, not before or after.

At ITACA (Universitat Politècnica de València) I developed perturbation-based **dual-mode cavity** protocols that quantify microwave heating profiles and dielectric properties under operando conditions. Combined with operando Raman and XRD, this tracks oxygen-vacancy-mediated reactivity in reducible oxides as the field drives it: dielectric response and redox state on the same sample, at the same time. Related work resolves how ceria's redox cycling depends on the exposed facet {% cite yan2026ceria %}.

I coordinated the ITACA–UD cavity co-development and the preparation for XAS-compatible microwave experiments at the QAS beamline, Brookhaven National Laboratory. A manuscript on dielectric-redox coupling is in preparation.
