---
layout: page
title: research
permalink: /research/
description: Five threads, from the field-material interaction up to the pilot plant.
nav: true
nav_order: 2
related_publications: true
---

## Wireless heating

Microwaves deposit energy in the catalyst rather than through the reactor wall, so the catalyst and the gas stop sharing a temperature. On PtSn/SiO₂ that gave coke-resistant propane dehydrogenation **with no H₂ co-feed**, at higher energy efficiency and with slower Pt sintering than a furnace {% cite kwak2023microwave %}. An independent lab at INMA Zaragoza reproduced it, which matters in a field with a history of results that do not travel between rigs. The same approach makes syngas by dry reforming of methane on doped ceria {% cite wang2023syngas %}.

I built the continuous-flow single-mode reactors, the catalyst synthesis and the cross-laboratory protocol.

## Wired heating

Non-oxidative methane coupling wants high temperature. So does coke. Holding a catalyst there continuously means paying for both. Pulsed Joule heating separates them: short, high-amplitude pulses reach the temperature C–H activation needs, then quench before carbon deposition and aromatization finish. That raised methane coupling while suppressing coke and aromatics, and let CO₂ reduction run in tandem on one bed {% cite kwak2025tandem %}. The same pulsing intensifies steam methane reforming and water-gas shift {% cite railkar2025smr %}.

Putting the heat source inside the tube also deletes the fired furnace, the largest CO₂ source in steam cracking {% cite mittal2025ethane %}, and drives compact Ni-alloy foam reactors for ammonia decomposition {% cite badakhsh2021foam %}.

## Hydrogen reactor technology

Liquid organic hydrogen carriers move hydrogen through existing fuel infrastructure. The cost sits in the release step, which is endothermic and platinum-hungry. I worked that chain end to end: benchmarking which carriers are worth pursuing {% cite kwak2021benchmarking %}, what the catalyst should sit on {% cite kwak2021support ahn2022kit6 %}, how promoters change the intermediates {% cite on2025promoter %}, and atomic-layer tailoring that holds up at low metal loading {% cite kwak2025scalable %}.

Getting heat in and out was its own problem, solved with a liquid-gas phase-change module {% cite kwak2021generator %} and carried to a **2.3 Nm³/h** reactor {% cite kang2024thermally lim2023benzyltoluene %}. Related hardware covers structured Ni catalysts for ammonia {% cite lee2021topdown %}, Pd/Ta membranes {% cite park2021membrane %} and a compact ATR-WGS bioethanol fuel processor {% cite kim2020atrwgs %}. The same scale-up work produced a continuous 5 ton/yr sustainable aviation fuel pilot meeting ASTM D7566 {% cite kwak2018hydroupgrading %}.

## Operando and in situ spectroscopy

The standing objection to microwave catalysis is that nobody can say what temperature the catalyst is at, which makes any "non-thermal" claim unfalsifiable. Answering it means measuring the dielectric response _during_ reaction. At ITACA (Universitat Politècnica de València) I developed perturbation-based **dual-mode cavity** protocols that quantify heating profiles and dielectric properties under operando conditions.

Combined with operando Raman and XRD, this tracks oxygen-vacancy-mediated reactivity as the field drives it. Related work resolves how ceria's redox cycling depends on the exposed facet {% cite yan2026ceria %} and which surface species carry CO oxidation {% cite choi2026bnnt %}. I coordinated the ITACA–UD cavity co-development and the preparation for XAS-compatible microwave experiments at the QAS beamline, Brookhaven National Laboratory.

## Experiment-model twin

A reactor measurement is worth more when a model has to survive it. Microkinetic modeling is what turned the pulsed-heating result from an observation into a mechanism {% cite kwak2025tandem %}; CFD is what turned the internally heated cracker from a rig into a design {% cite mittal2025ethane %}; energy-economic analysis is what decided which hydrogen carriers deserved the bench time {% cite kwak2021benchmarking lim2023benzyltoluene %}.

The electrified-reactor models I developed for my Ph.D. work are open, and [run in the browser]({{ '/tools/' | relative_url }}) with the solvers exposed as importable modules. Separately, at Linde I built an equilibrium-kinetic model for high-temperature water-gas shift and a UniSim hydrogen-plant flowsheet, both aimed at design guidance rather than a single number; that work is proprietary and stays with Linde.
