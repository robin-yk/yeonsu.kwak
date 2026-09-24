// Research figure on the research page: assets/img/research-overview.png, cleaned up and set in motion.
// Left alone it tours through the topics; pointing at a part of the figure explains that part.
// All coordinates are pixels of the source image (1672 x 941).
(() => {
  const root = document.getElementById("research-figure");
  if (!root) return;
  const FW = 1672,
    FH = 941,
    BGC = [253, 253, 253],
    BG = "#FDFDFD",
    INK = "#0B0C24";
  const FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  const REG = { mono: [495, 462, 940, 712], mwc: [128, 296, 226, 366], jc: [270, 310, 366, 369] };
  const MW_C = [176, 330];
  const CIRCUIT = [
    [270, 316],
    [270, 280],
    [372, 280],
    [372, 316],
  ];
  const WAVE = {
    x0: 676,
    x1: 1008,
    lo: 337.5,
    hi: 282.5,
    pulses: [
      [703, 749],
      [807, 854],
      [911, 957],
    ],
  };
  const DUTY = 46 / 104,
    CJH_Y = WAVE.lo - DUTY * (WAVE.lo - WAVE.hi);
  const axisY = (x) => 620 - 0.0692 * (x - 262);
  const LENS = { x: 847, y: 581, r: 22 };
  const DUP = [
      [864, 570],
      [1318, 323],
    ],
    DLO = [
      [862, 593],
      [1350, 670],
    ];
  const CIRC = { x: 1438.5, y: 482.2, rx: 190.5, ry: 203.8 };
  const CAP = { x: 1449, y: 715 };
  const MONO_C = [716, 600];
  const FACE_L = { x: 536, y: 612, rx: 34, ry: 86 },
    FACE_R = { x: 898, y: 592, rx: 33, ry: 83 },
    TILT = -0.069;
  const TEXTS = [
    { t: "Designing the reaction environment", b: [344, 60, 1328, 119], w: 700, desc: true, col: "ink" },
    { t: "Spatial control", b: [139, 188, 384, 223], w: 500, desc: true, col: "spatial" },
    { t: "Temporal control", b: [689, 188, 973, 223], w: 500, desc: true, col: "temporal" },
    { t: "Material state", b: [1331, 220, 1555, 247], w: 500, desc: false, col: "material" },
    { t: "MW", b: [148, 381, 195, 401], w: 500, col: "ink" },
    { t: "Joule", b: [290, 381, 353, 401], w: 500, col: "ink" },
    { t: "Power", b: [579, 292, 649, 311], w: 500, col: "ink" },
    { t: "Time", b: [1009, 365, 1064, 385], w: 500, col: "ink" },
    { t: "Feed", b: [120, 658, 185, 680], w: 500, col: "ink" },
    { t: "Products", b: [1148, 597, 1259, 618], w: 500, col: "ink" },
  ];

  // Nature (NPG) red for energy delivered, navy for time and structure.
  const P = { spatial: "#E64B35", temporal: "#3C5488", material: "#3C5488" };

  const STEPS = ["mw", "joule", "rph", "cjh", "tio2", "sic", "carbon"];
  const GROUP = {
    mw: "spatial",
    joule: "spatial",
    rph: "temporal",
    cjh: "temporal",
    tio2: "material",
    sic: "material",
    carbon: "material",
    catalyst: "ink",
  };
  const DOI = {
    sciadv: ["Science Advances, 2023", "https://doi.org/10.1126/sciadv.adi8219"],
    cej: ["Chem. Eng. J., 2025", "https://doi.org/10.1016/j.cej.2025.168251"],
    acsel: ["ACS Energy Letters, 2025", "https://doi.org/10.1021/acsenergylett.5c02853"],
  };
  const TOPICS = {
    mw: {
      eyebrow: "Spatial control | Microwave heating",
      link: DOI.sciadv,
      text: "Microwaves deposit energy throughout the catalyst bed instead of conducting it in from the wall, so the core runs hotter than the surface. Over PtSn/SiO\u2082, this sustained propane dehydrogenation without H\u2082 co-feed, resisting coke and slowing sintering relative to furnace heating.",
    },
    joule: {
      eyebrow: "Spatial control | Joule heating",
      link: DOI.cej,
      text: "Current passed through a conductive support dissipates heat inside the structure, so the bed temperature follows the applied power rapidly and can be programmed. I led the experiments on internally Joule-heated ethane crackers, which raised ethylene yield.",
    },
    rph: {
      eyebrow: "Temporal control | Rapid pulsed heating (RPH)",
      link: DOI.acsel,
      text: "Rapid pulsed heating concentrates power into brief pulses, so the catalyst reaches peak temperature only momentarily. Relative to continuous heating, pulsing enhanced methane coupling and reduced coke and aromatics.",
    },
    cjh: {
      eyebrow: "Temporal control | Continuous Joule heating (CJH)",
      text: "Continuous Joule heating holds the power constant. It is the reference against which pulsed operation is compared: a lower temperature, held throughout.",
    },
    tio2: {
      eyebrow: "Material state | Reduced rutile TiO\u2082",
      tag: "Manuscript in preparation",
      text: "Oxygen vacancies raise the dielectric loss of reduced rutile, so the oxide absorbs microwaves more strongly as it reduces. Operando dielectric measurements resolve a linear scaling of loss with vacancy concentration, which I related to reduction kinetics and reverse water-gas shift performance.",
    },
    sic: {
      eyebrow: "Material state | Silicon carbide",
      text: "Silicon carbide couples strongly to microwaves and conducts current, which is why it serves both as a microwave susceptor and as a resistive heating element.",
    },
    carbon: {
      eyebrow: "Material state | Carbon",
      link: DOI.acsel,
      text: "Carbon conducts electrons and heats rapidly under microwaves or current. It is also the coke that deactivates catalysts, which pulsed heating suppressed in methane coupling.",
    },
    catalyst: {
      eyebrow: "The reactor | Structured catalyst",
      text: "The structured catalyst, where the delivered energy drives the reaction. Point to MW or Joule above to compare how each heats the bed.",
    },
  };
  // Each stop lasts as long as its description takes to read (about 25 characters a second).
  const DUR = {};
  for (const key of STEPS) DUR[key] = Math.round(1500 + 40 * TOPICS[key].text.length);
  const HOTS = [
    { t: "mw", r: [64, 258, 238, 410], label: "Microwave heating" },
    { t: "mw", r: [130, 178, 394, 230], label: "Spatial control" },
    { t: "joule", r: [244, 244, 404, 410], label: "Joule heating" },
    { t: "rph", r: [562, 174, 1080, 404], label: "Temporal control: rapid pulsed and continuous Joule heating", chart: true },
    { t: "catalyst", r: [488, 456, 946, 718], label: "Structured catalyst" },
    { t: "tio2", r: [814, 548, 880, 614], label: "Zoom into the catalyst material" },
    { t: "tio2", r: [1318, 208, 1566, 256], label: "Material state" },
  ];

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const fig = root.querySelector(".rfig-stage"),
    img = root.querySelector(".rfig-img");
  const base = root.querySelector(".rfig-base"),
    fx = root.querySelector(".rfig-fx");
  const bctx = base.getContext("2d"),
    ctx = fx.getContext("2d");
  const canFilter = typeof ctx.filter === "string";
  const explain = root.querySelector(".rfig-explain"),
    exEyebrow = root.querySelector(".rfig-eyebrow"),
    exText = root.querySelector(".rfig-text");
  const dots = Array.from(root.querySelectorAll(".rfig-dot")),
    playBtn = root.querySelector(".rfig-play");

  /* ---------- colour helpers ---------- */
  const hexRGB = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const rgba = (h, a) => {
    const [r, g, b] = hexRGB(h);
    return `rgba(${r},${g},${b},${a})`;
  };
  function rgb2hsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const mx = Math.max(r, g, b),
      mn = Math.min(r, g, b),
      l = (mx + mn) / 2;
    let h = 0,
      s = 0;
    if (mx !== mn) {
      const d = mx - mn;
      s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
      h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h *= 60;
    }
    return [h, s, l];
  }
  function hsl2rgb(h, s, l) {
    h = (((h % 360) + 360) % 360) / 360;
    if (s === 0) return [l * 255, l * 255, l * 255];
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s,
      p = 2 * l - q;
    const f = (t) => {
      t = (t + 1) % 1;
      return t < 1 / 6 ? p + (q - p) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p;
    };
    return [f(h + 1 / 3) * 255, f(h) * 255, f(h - 1 / 3) * 255];
  }
  const lum = ([r, g, b]) => {
    const c = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b);
  };
  function textInk(hex) {
    let [r, g, b] = hexRGB(hex);
    for (let i = 0; i < 20 && 1.05 / (lum([r, g, b]) + 0.05) < 4.6; i++) {
      r *= 0.92;
      g *= 0.92;
      b *= 0.92;
    }
    return `rgb(${r | 0},${g | 0},${b | 0})`;
  }
  const mixWhite = (hex, t) => {
    const [r, g, b] = hexRGB(hex);
    return `rgb(${(r + (255 - r) * t) | 0},${(g + (255 - g) * t) | 0},${(b + (255 - b) * t) | 0})`;
  };

  /* ---------- crystal structures ---------- */
  const n3 = (a) => Math.hypot(a[0], a[1], a[2]);
  function structTiO2() {
    const atoms = [],
      bonds = [],
      dashes = [];
    [
      [0, 1.5, 0],
      [0, -1.5, 0],
    ].forEach((p) => atoms.push({ p, r: 0.56, c: [60, 84, 136] }));
    [
      [1.41, 0, 0],
      [-1.41, 0, 0],
      [1.41, 2.91, 0],
      [-1.41, 2.91, 0],
      [0, 1.5, 2],
      [0, 1.5, -2],
      [1.41, -2.91, 0],
      [-1.41, -2.91, 0],
      [0, -1.5, 2],
      [0, -1.5, -2],
    ].forEach((p, i) => atoms.push(i === 0 ? { p, r: 0.42, vac: true } : { p, r: 0.42, c: [230, 75, 53] }));
    for (let a = 0; a < 2; a++)
      for (let b = 2; b < atoms.length; b++) {
        const d = n3([atoms[a].p[0] - atoms[b].p[0], atoms[a].p[1] - atoms[b].p[1], atoms[a].p[2] - atoms[b].p[2]]);
        if (d < 2.25) (atoms[b].vac ? dashes : bonds).push([a, b]);
      }
    return { atoms, bonds, dashes, pitch: -0.28, label: "TiO\u2082", caption: "Reduced rutile TiO\u2082" };
  }
  function structSiC() {
    const atoms = [],
      bonds = [],
      basis = [
        [0, 0, 0],
        [0, 2, 2],
        [2, 0, 2],
        [2, 2, 0],
      ],
      c0 = [0.5, 0.5, 0.5];
    for (let i = -1; i <= 1; i++)
      for (let j = -1; j <= 1; j++)
        for (let k = -1; k <= 1; k++)
          for (const bb of basis) {
            const si = [bb[0] + 4 * i, bb[1] + 4 * j, bb[2] + 4 * k],
              c = [si[0] + 1, si[1] + 1, si[2] + 1];
            for (const [p, isSi] of [
              [si, true],
              [c, false],
            ]) {
              const q = [p[0] - c0[0], p[1] - c0[1], p[2] - c0[2]];
              if (n3(q) < 3.25) atoms.push({ p: q, r: isSi ? 0.5 : 0.4, c: isSi ? [176, 156, 133] : [74, 78, 90] });
            }
          }
    for (let a = 0; a < atoms.length; a++)
      for (let b = a + 1; b < atoms.length; b++)
        if (n3([atoms[a].p[0] - atoms[b].p[0], atoms[a].p[1] - atoms[b].p[1], atoms[a].p[2] - atoms[b].p[2]]) < 1.8) bonds.push([a, b]);
    return { atoms, bonds, dashes: [], pitch: -0.34, label: "SiC", caption: "Silicon carbide" };
  }
  function structCarbon() {
    const atoms = [],
      bonds = [],
      bl = 1.2,
      a1 = [Math.sqrt(3) * bl, 0],
      a2 = [(Math.sqrt(3) * bl) / 2, 1.5 * bl];
    for (const [layer, dy, shift] of [
      [0, 1.5, 0],
      [1, -1.5, bl],
    ]) {
      for (let i = -5; i <= 5; i++)
        for (let j = -5; j <= 5; j++)
          for (const bz of [0, bl]) {
            const x = i * a1[0] + j * a2[0],
              z = i * a1[1] + j * a2[1] + bz + shift;
            if (Math.hypot(x, z - bl / 2) < 2.75) atoms.push({ p: [x, dy, z - bl / 2], r: 0.3, c: [74, 78, 90], layer });
          }
    }
    for (let a = 0; a < atoms.length; a++)
      for (let b = a + 1; b < atoms.length; b++) {
        if (atoms[a].layer !== atoms[b].layer) continue;
        if (n3([atoms[a].p[0] - atoms[b].p[0], atoms[a].p[1] - atoms[b].p[1], atoms[a].p[2] - atoms[b].p[2]]) < 1.3) bonds.push([a, b]);
      }
    return { atoms, bonds, dashes: [], pitch: -0.7, label: "C", caption: "Graphitic carbon" };
  }
  const MAT = { tio2: structTiO2(), sic: structSiC(), carbon: structCarbon() };
  for (const key in MAT) {
    const s = MAT[key];
    s.ext = Math.max(...s.atoms.map((a) => n3(a.p) + a.r));
    s.phase = { tio2: 0, sic: 1.7, carbon: 3.4 }[key];
    s.atoms.forEach((a) => {
      a.ph = [Math.random() * 6.28, Math.random() * 6.28, Math.random() * 6.28];
    });
  }
  {
    const T0 = matTargets(null);
    for (const key in MAT) MAT[key].now = { ...T0[key] };
  }
  function matTargets(focus) {
    if (!focus)
      return { tio2: { x: 1438, y: 394, R: 70, lab: 1 }, sic: { x: 1360, y: 550, R: 60, lab: 1 }, carbon: { x: 1518, y: 550, R: 60, lab: 1 } };
    const others = ["tio2", "sic", "carbon"].filter((k) => k !== focus),
      out = {};
    out[focus] = { x: 1438, y: 456, R: 136, lab: 0 };
    out[others[0]] = { x: 1386, y: 634, R: 24, lab: 0 };
    out[others[1]] = { x: 1490, y: 634, R: 24, lab: 0 };
    return out;
  }

  /* ---------- state ---------- */
  let dpr = 1,
    k = 1,
    running = false,
    paused = false,
    raf = 0,
    last = 0,
    t0 = performance.now(),
    onScreen = true;
  let stepIdx = 0,
    stepT = 0,
    hoverTopic = null,
    resumeAt = 0,
    topic = "mw",
    userDriven = false,
    reading = false;
  let heat = 0,
    wMW = 1,
    wJ = 0,
    mwIcon = 0,
    jIcon = 0,
    plateA = 0,
    plateGlow = 0,
    trX = WAVE.x0,
    pulseOn = false;
  let masks = null,
    clean = null,
    figC = null,
    ready = false;
  const waves = [],
    bigWaves = [];
  let waveT = 0,
    bigWaveT = 0;
  const parts = Array.from({ length: 74 }, () => spawn(true));
  function spawn(anywhere) {
    return {
      x: anywhere ? 100 + Math.random() * 1150 : 96 + Math.random() * 10,
      o: (Math.random() * 2 - 1) * 0.86,
      v: 118 + Math.random() * 34,
      w: 0,
    };
  }

  /* ---------- the figure, rebuilt ---------- */
  // Once: remove the two arrows, the printed pulse train and the printed labels.
  function cleanFigure(D) {
    const W = FW,
      M = new Uint8Array(FW * FH);
    const mark = (x0, y0, x1, y1, test, dil) => {
      const seed = [];
      for (let y = y0; y <= y1; y++)
        for (let x = x0; x <= x1; x++) {
          const o = (y * W + x) * 4;
          if (test(D[o], D[o + 1], D[o + 2])) seed.push([x, y]);
        }
      for (const [x, y] of seed)
        for (let dy = -dil; dy <= dil; dy++) for (let dx = -dil; dx <= dil; dx++) if (dx * dx + dy * dy <= dil * dil) M[(y + dy) * W + x + dx] = 1;
    };
    mark(400, 338, 650, 545, (r, g, b) => r > 150 && r - b > 80 && r - g > 40, 5);
    mark(764, 358, 824, 507, (r, g, b) => g - r > 55 && b - r > 50 && g > 100, 5);
    // Above the catalyst the teal shaft also carries a soft white outline, wider than its colour mask. Replace the
    // whole band with the background 30 px to its left, 2 px lower to follow the tube's slope so the glass edges meet.
    for (let y = 358; y <= 481; y++)
      for (let x = 781; x <= 806; x++) {
        const o = (y * W + x) * 4,
          src = ((y + 2) * W + x - 30) * 4;
        D[o] = D[src];
        D[o + 1] = D[src + 1];
        D[o + 2] = D[src + 2];
        M[y * W + x] = 0;
      }
    const isCat = (r, g, b) => (g - r > 25 && r + g + b < 520) || r + g + b < 150;
    for (let y = 330; y <= 552; y++)
      for (let x = 390; x <= 835; x++) {
        const i = y * W + x;
        if (!M[i]) continue;
        let xl = x - 1;
        while (xl > 0 && M[y * W + xl] && x - xl < 90) xl--;
        let xr = x + 1;
        while (xr < W - 1 && M[y * W + xr] && xr - x < 90) xr++;
        const il = (y * W + xl) * 4,
          ir = (y * W + xr) * 4,
          o = i * 4;
        if (isCat(D[il], D[il + 1], D[il + 2]) || isCat(D[ir], D[ir + 1], D[ir + 2])) {
          const s = (y - 4) * W + x + 60;
          if (!M[s]) {
            D[o] = D[s * 4];
            D[o + 1] = D[s * 4 + 1];
            D[o + 2] = D[s * 4 + 2];
            continue;
          }
        }
        const f = (x - xl) / (xr - xl);
        for (let c = 0; c < 3; c++) D[o + c] = D[il + c] + (D[ir + c] - D[il + c]) * f;
      }
    // printed pulse train
    const W2 = new Uint8Array(FW * FH);
    for (let y = 270; y <= 346; y++)
      for (let x = 668; x <= 1016; x++) {
        const o = (y * W + x) * 4,
          r = D[o],
          g = D[o + 1],
          b = D[o + 2];
        if (g - r > 30 && b - r > 30) for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) W2[(y + dy) * W + x + dx] = 1;
      }
    for (let i = 0; i < W2.length; i++)
      if (W2[i]) {
        D[i * 4] = BGC[0];
        D[i * 4 + 1] = BGC[1];
        D[i * 4 + 2] = BGC[2];
      }
    // printed labels and the caption
    const erase = (x0, y0, x1, y1) => {
      for (let y = y0; y <= y1; y++)
        for (let x = x0; x <= x1; x++) {
          const o = (y * W + x) * 4;
          D[o] = BGC[0];
          D[o + 1] = BGC[1];
          D[o + 2] = BGC[2];
        }
    };
    for (const t of TEXTS) erase(t.b[0] - 4, t.b[1] - (t.t === "Time" ? 2 : 4), t.b[2] + 4, t.b[3] + 4);
    erase(1310, 694, 1588, 736);
  }
  // Per palette: move the arcs and the material annotations onto the chosen hues.
  function paintFigure() {
    const D = new Uint8ClampedArray(clean);
    const shift = (x0, y0, x1, y1, srcHex, dstHex) => {
      const [sh, ss, sl] = rgb2hsl(...hexRGB(srcHex)),
        [dh, ds, dl] = rgb2hsl(...hexRGB(dstHex));
      if (srcHex === dstHex) return;
      for (let y = y0; y <= y1; y++)
        for (let x = x0; x <= x1; x++) {
          const o = (y * FW + x) * 4,
            [h, s, l] = rgb2hsl(D[o], D[o + 1], D[o + 2]);
          const dh0 = Math.abs(((h - sh + 540) % 360) - 180);
          if (dh0 > 22 || s < 0.25 || l < 0.2 || l > 0.97) continue;
          const cov = Math.min(1, s / ss),
            [r, g, b] = hsl2rgb(dh, ds * cov, Math.min(0.98, Math.max(0, l + (dl - sl) * cov)));
          D[o] = r;
          D[o + 1] = g;
          D[o + 2] = b;
        }
    };
    shift(70, 268, 135, 380, "#FC3C04", P.spatial);
    shift(820, 210, 1671, 745, "#4404FC", P.material);
    const x = figC.getContext("2d");
    x.putImageData(new ImageData(D, FW, FH), 0, 0);
  }
  function fitText(c, t, w) {
    c.font = `${t.w} 100px ${FONT}`;
    const size = (100 * (t.b[2] - t.b[0])) / c.measureText(t.t).width;
    c.font = `${t.w} ${size}px ${FONT}`;
    return size;
  }
  function drawBase() {
    bctx.setTransform(1, 0, 0, 1, 0, 0);
    bctx.clearRect(0, 0, base.width, base.height);
    if (!figC) return;
    bctx.setTransform(k * dpr, 0, 0, k * dpr, 0, 0);
    bctx.imageSmoothingEnabled = true;
    bctx.imageSmoothingQuality = "high";
    bctx.drawImage(figC, 0, 0);
    // labels in Helvetica
    const colors = { ink: INK, spatial: P.spatial, temporal: P.temporal, material: P.material };
    for (const t of TEXTS) {
      const size = fitText(bctx, t);
      bctx.fillStyle = colors[t.col];
      bctx.textAlign = "left";
      bctx.textBaseline = "alphabetic";
      bctx.fillText(t.t, t.b[0], t.b[3] + 0.5 - (t.desc ? size * 0.2 : 0));
    }
    // temporal control: rapid pulsed (RPH) and continuous (CJH) at matched average power
    const tint = mixWhite(P.temporal, 0.45);
    bctx.lineCap = "round";
    bctx.lineJoin = "round";
    bctx.strokeStyle = tint;
    bctx.lineWidth = 4;
    bctx.beginPath();
    bctx.moveTo(WAVE.x0, CJH_Y);
    bctx.lineTo(WAVE.x1, CJH_Y);
    bctx.stroke();
    bctx.strokeStyle = P.temporal;
    bctx.lineWidth = 4.6;
    bctx.beginPath();
    bctx.moveTo(WAVE.x0, WAVE.lo);
    for (const [a, b] of WAVE.pulses) {
      bctx.lineTo(a, WAVE.lo);
      bctx.lineTo(a, WAVE.hi);
      bctx.lineTo(b, WAVE.hi);
      bctx.lineTo(b, WAVE.lo);
    }
    bctx.lineTo(WAVE.x1, WAVE.lo);
    bctx.stroke();
    bctx.font = `700 19px ${FONT}`;
    bctx.textBaseline = "middle";
    bctx.fillStyle = P.temporal;
    bctx.textAlign = "center";
    bctx.fillText("RPH", 934, 266);
    bctx.fillStyle = mixWhiteHex(P.temporal, 0.2);
    bctx.textAlign = "left";
    bctx.fillText("CJH", 1016, CJH_Y + 1);
    // clear the circle for the live structures
    bctx.fillStyle = BG;
    bctx.beginPath();
    bctx.ellipse(CIRC.x, CIRC.y, CIRC.rx - 7, CIRC.ry - 7, 0, 0, Math.PI * 2);
    bctx.fill();
  }
  function mixWhiteHex(hex, t) {
    const [r, g, b] = hexRGB(hex);
    const h = (v) => Math.round(v).toString(16).padStart(2, "0");
    return "#" + h(r + (255 - r) * t) + h(g + (255 - g) * t) + h(b + (255 - b) * t);
  }

  /* ---------- heat ---------- */
  const RAMP = [
    [0, [70, 16, 8]],
    [0.3, [170, 36, 22]],
    [0.55, [230, 75, 53]],
    [0.8, [245, 140, 70]],
    [1, [255, 214, 170]],
  ];
  function ramp(v) {
    v = v < 0 ? 0 : v > 1 ? 1 : v;
    let j = 0;
    while (j < RAMP.length - 2 && v > RAMP[j + 1][0]) j++;
    const [u0, a] = RAMP[j],
      [u1, b] = RAMP[j + 1],
      f = (v - u0) / (u1 - u0);
    return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
  }
  const smooth = (a, b, x) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  const mk = (w, h) => {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    return c;
  };
  const LO_W = 80,
    LO_H = 28;
  const lo = mk(LO_W, LO_H),
    loD = mk(LO_W, LO_H),
    loI = mk(16, 8),
    loID = mk(16, 8);
  const loImg = lo.getContext("2d").createImageData(LO_W, LO_H),
    loDImg = loD.getContext("2d").createImageData(LO_W, LO_H);
  const liImg = loI.getContext("2d").createImageData(16, 8),
    liDImg = loID.getContext("2d").createImageData(16, 8);
  const region = (r) => mk(r[2] - r[0], r[3] - r[1]);
  const hMono = region(REG.mono),
    hMonoD = region(REG.mono),
    hMw = region(REG.mwc),
    hMwD = region(REG.mwc),
    hJ = region(REG.jc),
    hJD = region(REG.jc);
  function fillLo(img, dimg, w, h, valAt) {
    const d = img.data,
      dd = dimg.data;
    for (let j = 0; j < h; j++) {
      const v = (j / (h - 1)) * 2 - 1;
      for (let i = 0; i < w; i++) {
        const val = valAt(i / (w - 1), v),
          [r, g, b] = ramp(val),
          o = (j * w + i) * 4;
        d[o] = r;
        d[o + 1] = g;
        d[o + 2] = b;
        d[o + 3] = 255 * smooth(0.12, 0.55, val);
        dd[o] = 8;
        dd[o + 1] = 4;
        dd[o + 2] = 2;
        dd[o + 3] = 255 * 0.9 * smooth(0.03, 0.3, val);
      }
    }
  }
  function paintHeat() {
    const sum = Math.max(1e-3, wMW + wJ);
    const [x0, y0, x1, y1] = REG.mono;
    fillLo(loImg, loDImg, LO_W, LO_H, (u, v) => {
      // Microwaves heat the whole volume and the surface loses heat, so the bed is even along its length and hottest on the axis.
      const x = x0 + u * (x1 - x0),
        y = y0 + ((v + 1) / 2) * (y1 - y0),
        r = Math.min(1, Math.abs(y - axisY(x)) / 92);
      const mw = (0.52 + 0.48 * (1 - r * r)) * (0.9 + 0.1 * smooth(0, 0.12, u) * smooth(0, 0.12, 1 - u));
      return (heat * (wMW * mw + wJ * (0.84 + 0.16 * u) * (1 - 0.12 * v * v))) / sum;
    });
    lo.getContext("2d").putImageData(loImg, 0, 0);
    loD.getContext("2d").putImageData(loDImg, 0, 0);
  }
  function paintIcon(level) {
    fillLo(liImg, liDImg, 16, 8, (u, v) => level * 0.88 * (1 - 0.25 * v * v));
    loI.getContext("2d").putImageData(liImg, 0, 0);
    loID.getContext("2d").putImageData(liDImg, 0, 0);
  }
  function masked(hc, src, mask) {
    const h = hc.getContext("2d");
    h.globalCompositeOperation = "source-over";
    h.clearRect(0, 0, hc.width, hc.height);
    h.imageSmoothingEnabled = true;
    h.drawImage(src, 0, 0, hc.width, hc.height);
    if (mask) {
      h.globalCompositeOperation = "destination-in";
      h.drawImage(mask, 0, 0);
      h.globalCompositeOperation = "source-over";
    }
  }
  function buildMasks(x) {
    const make = (r) => {
      const w = r[2] - r[0],
        h = r[3] - r[1],
        id = x.getImageData(r[0], r[1], w, h),
        d = id.data;
      for (let i = 0; i < d.length; i += 4) {
        const R = d[i],
          G = d[i + 1],
          B = d[i + 2];
        const teal = Math.min(1, Math.max(0, (G - R - 18) / 70)),
          L = Math.min(1, Math.max(0, ((R + G + B) / 3 - 25) / 110));
        d[i] = d[i + 1] = d[i + 2] = 255;
        d[i + 3] = 255 * Math.pow(teal, 0.6) * (0.6 + 0.4 * L);
      }
      const m = region(r);
      m.getContext("2d").putImageData(id, 0, 0);
      return m;
    };
    return { mono: make(REG.mono), mwc: make(REG.mwc), jc: make(REG.jc) };
  }

  /* ---------- drawing helpers ---------- */
  function lerpPath(pts, f) {
    const segs = [];
    let L = 0;
    for (let i = 1; i < pts.length; i++) {
      const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      segs.push(l);
      L += l;
    }
    let d = f * L;
    for (let i = 0; i < segs.length; i++) {
      if (d <= segs[i]) {
        const t = d / segs[i];
        return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t];
      }
      d -= segs[i];
    }
    return pts[pts.length - 1];
  }
  function glowDot(x, y, r, col, a) {
    ctx.save();
    ctx.globalAlpha = a;
    ctx.shadowColor = col;
    ctx.shadowBlur = r * 2.4 * k * dpr;
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  const waveY = (x) => {
    for (const [a, b] of WAVE.pulses) if (x >= a && x <= b) return WAVE.hi;
    return WAVE.lo;
  };
  const inPulse = (x) => WAVE.pulses.some(([a, b]) => x >= a && x <= b);
  function ell(c, e, dx, dy) {
    c.beginPath();
    c.ellipse(e.x + (dx || 0), e.y + (dy || 0), e.rx, e.ry, TILT, 0, Math.PI * 2);
  }

  // Thin copper plates on both end faces of the foam, the same size as the faces, drawn semi-transparent so the foam
  // shows through. Copper conducts, so the plates keep their metal colour while the foam between them heats.
  function copperPlates(alpha, warm) {
    const t = 6,
      ux = 0.9976,
      uy = -0.069,
      L = { x: FACE_L.x - t * ux, y: FACE_L.y - t * uy, rx: FACE_L.rx, ry: FACE_L.ry };
    ctx.save();
    ctx.globalAlpha = alpha * 0.6;
    // edge: the part of the plate outline its outer face does not cover
    ctx.save();
    ctx.beginPath();
    ctx.rect(L.x - 60, L.y - 120, 140, 240);
    ctx.ellipse(L.x, L.y, L.rx, L.ry, TILT, 0, Math.PI * 2, true);
    ctx.clip("evenodd");
    ctx.fillStyle = "#5A2C14";
    ell(ctx, FACE_L);
    ctx.fill();
    ctx.restore();
    const g = ctx.createLinearGradient(L.x - L.rx, L.y - L.ry, L.x + L.rx, L.y + L.ry);
    [
      [0, "#6B3519"],
      [0.22, "#A55B2F"],
      [0.4, "#E4A070"],
      [0.48, "#FAD8BC"],
      [0.56, "#D88A57"],
      [0.78, "#96502A"],
      [1, "#5A2C14"],
    ].forEach(([o, c]) => g.addColorStop(o, c));
    ctx.fillStyle = g;
    ell(ctx, L);
    ctx.fill();
    ctx.globalAlpha = alpha * 0.8;
    ctx.strokeStyle = "rgba(255,226,204,0.7)";
    ctx.lineWidth = 1.1;
    ell(ctx, L);
    ctx.stroke();
    if (warm > 0.02) {
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = alpha;
      ctx.fillStyle = `rgba(255,110,50,${0.12 * warm})`;
      ell(ctx, L);
      ctx.fill();
    }
    ctx.restore();
    // far plate: only its edge shows past the foam's silhouette
    ctx.save();
    ctx.globalAlpha = alpha * 0.6;
    ell(ctx, FACE_R, t * ux, t * uy);
    ctx.clip();
    ctx.beginPath();
    ctx.rect(FACE_R.x, FACE_R.y - FACE_R.ry - 12, FACE_R.rx + 24, 2 * FACE_R.ry + 24);
    ctx.ellipse(FACE_R.x, FACE_R.y, FACE_R.rx, FACE_R.ry, TILT, 0, Math.PI * 2, true);
    const h = ctx.createLinearGradient(FACE_R.x, FACE_R.y - FACE_R.ry, FACE_R.x, FACE_R.y + FACE_R.ry);
    [
      [0, "#E9A879"],
      [0.35, "#B8693B"],
      [0.7, "#7E4121"],
      [1, "#4E2711"],
    ].forEach(([o, c]) => h.addColorStop(o, c));
    ctx.fillStyle = h;
    ctx.fill("evenodd");
    ctx.restore();
  }

  function drawStructure(key, st, time, vib) {
    const s = MAT[key],
      sc = st.R / s.ext,
      yaw = time * (st.R > 100 ? 0.62 : 0.45) + s.phase,
      pitch = s.pitch;
    const cy = Math.cos(yaw),
      sy = Math.sin(yaw),
      cp = Math.cos(pitch),
      sp = Math.sin(pitch),
      D = 16;
    const P = s.atoms.map((a) => {
      let x = a.p[0],
        y = a.p[1],
        z = a.p[2];
      if (vib > 0) {
        x += vib * Math.sin(time * 23 + a.ph[0]);
        y += vib * Math.sin(time * 26 + a.ph[1]);
        z += vib * Math.sin(time * 20 + a.ph[2]);
      }
      const x1 = x * cy + z * sy,
        z1 = -x * sy + z * cy,
        y2 = y * cp - z1 * sp,
        z2 = y * sp + z1 * cp,
        f = D / (D - z2);
      return { X: st.x + x1 * sc * f, Y: st.y - y2 * sc * f, z: z2, f };
    });
    const items = [];
    s.bonds.forEach(([a, b]) => items.push({ z: (P[a].z + P[b].z) / 2 - 0.01, bond: [a, b] }));
    s.dashes.forEach(([a, b]) => items.push({ z: (P[a].z + P[b].z) / 2 - 0.01, dash: [a, b] }));
    s.atoms.forEach((a, i) => items.push({ z: P[i].z, atom: i }));
    items.sort((m, n) => m.z - n.z);
    for (const it of items) {
      if (it.bond) {
        const [a, b] = it.bond,
          w = (0.2 * sc * (P[a].f + P[b].f)) / 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#A9AEB8";
        ctx.lineWidth = w * 1.35;
        ctx.beginPath();
        ctx.moveTo(P[a].X, P[a].Y);
        ctx.lineTo(P[b].X, P[b].Y);
        ctx.stroke();
        ctx.strokeStyle = "#D2D5DC";
        ctx.lineWidth = w * 0.8;
        ctx.beginPath();
        ctx.moveTo(P[a].X, P[a].Y);
        ctx.lineTo(P[b].X, P[b].Y);
        ctx.stroke();
      } else if (it.dash) {
        const [a, b] = it.dash;
        ctx.save();
        ctx.setLineDash([4, 5]);
        ctx.strokeStyle = "#50556A";
        ctx.lineWidth = Math.max(1.2, 0.07 * sc);
        ctx.beginPath();
        ctx.moveTo(P[a].X, P[a].Y);
        ctx.lineTo(P[b].X, P[b].Y);
        ctx.stroke();
        ctx.restore();
      } else {
        const a = s.atoms[it.atom],
          p = P[it.atom],
          r = a.r * sc * p.f;
        if (a.vac) {
          ctx.save();
          ctx.setLineDash([5, 4]);
          ctx.strokeStyle = "#E64B35";
          ctx.lineWidth = Math.max(1.6, 0.09 * sc);
          ctx.beginPath();
          ctx.ellipse(p.X, p.Y, r * 0.95, r * 0.6, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
          continue;
        }
        const [R, G, B] = a.c,
          g = ctx.createRadialGradient(p.X - r * 0.38, p.Y - r * 0.42, r * 0.08, p.X, p.Y, r);
        g.addColorStop(0, `rgb(${Math.min(255, R + 110)},${Math.min(255, G + 110)},${Math.min(255, B + 110)})`);
        g.addColorStop(0.35, `rgb(${R},${G},${B})`);
        g.addColorStop(1, `rgb(${(R * 0.58) | 0},${(G * 0.58) | 0},${(B * 0.58) | 0})`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.X, p.Y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  function figText(txt, x, y, size, weight, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = `${weight} ${size}px ${FONT}`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(txt, x, y);
    ctx.restore();
  }

  /* ---------- one frame ---------- */
  function render(time) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, fx.width, fx.height);
    ctx.setTransform(k * dpr, 0, 0, k * dpr, 0, 0);
    const mat = topic === "tio2" || topic === "sic" || topic === "carbon";

    // catalyst: warm tint on the glass, teal knocked down, glow added
    paintHeat();
    const mr = REG.mono,
      mw = mr[2] - mr[0],
      mh = mr[3] - mr[1];
    masked(hMonoD, loD, masks && masks.mono);
    masked(hMono, lo, masks && masks.mono);
    if (heat > 0.04) {
      ctx.save();
      if (canFilter) ctx.filter = `blur(${Math.max(4, Math.round(26 * k * dpr))}px)`;
      ctx.globalAlpha = Math.min(0.3, heat * 0.32);
      ctx.drawImage(hMono, mr[0] - mw * 0.08, mr[1] - mh * 0.22, mw * 1.16, mh * 1.44);
      ctx.restore();
    }
    const body = (fn) => {
      if (masks) {
        fn();
        return;
      }
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(716, 604, 212, 96, TILT, 0, Math.PI * 2);
      ctx.clip();
      fn();
      ctx.restore();
    };
    body(() => {
      ctx.drawImage(hMonoD, mr[0], mr[1]);
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(hMono, mr[0], mr[1]);
      ctx.restore();
    });
    for (const [lvl, r, hc, hd, m] of [
      [mwIcon, REG.mwc, hMw, hMwD, masks && masks.mwc],
      [jIcon, REG.jc, hJ, hJD, masks && masks.jc],
    ]) {
      if (lvl < 0.02) continue;
      paintIcon(lvl);
      masked(hd, loID, m);
      masked(hc, loI, m);
      ctx.save();
      if (canFilter) ctx.filter = `blur(${Math.max(2, Math.round(12 * k * dpr))}px)`;
      ctx.globalAlpha = lvl * 0.28;
      ctx.drawImage(hc, r[0] - 10, r[1] - 10, r[2] - r[0] + 20, r[3] - r[1] + 20);
      ctx.restore();
      ctx.drawImage(hd, r[0], r[1]);
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(hc, r[0], r[1]);
      ctx.restore();
    }

    // gas flow, feed to products
    for (const p of parts) {
      const x = p.x,
        vis = (x >= 100 && x <= 236) || (x >= 458 && x <= 938) || (x >= 1146 && x <= 1252);
      if (!vis) continue;
      const half = x < 300 ? 9 : x > 1100 ? 8 : 112,
        y = axisY(x) + p.o * half,
        inBed = x > 502 && x < 930 && Math.abs(p.o * half) < 92;
      const w = p.w,
        r = 132 + (230 - 132) * w,
        g = 145 + (75 - 145) * w,
        b = 180 + (53 - 180) * w;
      ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${inBed ? 0.22 : 0.48})`;
      ctx.beginPath();
      ctx.arc(x, y, 2.7, 0, Math.PI * 2);
      ctx.fill();
    }

    // copper plates for every Joule mode
    if (plateA > 0.01) copperPlates(plateA, plateGlow);

    // microwaves arriving at the small cylinder and at the reactor
    for (const wv of waves) {
      const f = wv.age / 1.15,
        rr = 132 - 78 * f,
        a = Math.sin(Math.PI * Math.min(1, f)) * 0.9;
      ctx.save();
      ctx.strokeStyle = rgba(P.spatial, a);
      ctx.lineWidth = 4.5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(MW_C[0], MW_C[1], rr, Math.PI - 0.55, Math.PI + 0.55);
      ctx.stroke();
      ctx.restore();
    }
    for (const wv of bigWaves) {
      const f = wv.age / 1.5,
        rr = 300 - 150 * f,
        a = Math.sin(Math.PI * Math.min(1, f)) * 0.3;
      ctx.save();
      ctx.strokeStyle = rgba(P.spatial, a);
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(MONO_C[0], MONO_C[1], rr, Math.PI * 1.08, Math.PI * 1.46);
      ctx.stroke();
      ctx.restore();
    }
    if (jIcon > 0.05)
      for (let q = 0; q < 3; q++) {
        const [x, y] = lerpPath(CIRCUIT, (time * 0.85 + q / 3) % 1);
        glowDot(x, y, 4.2, P.spatial, jIcon);
      }

    // temporal control: the active line glows, tracers run along both
    const rphA = topic === "rph",
      cjhA = topic === "cjh";
    if (rphA || cjhA) {
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = rgba(P.temporal, 0.8);
      ctx.shadowBlur = 12 * k * dpr;
      ctx.strokeStyle = rgba(P.temporal, 0.9);
      ctx.lineWidth = 6;
      ctx.beginPath();
      if (rphA) {
        ctx.moveTo(WAVE.x0, WAVE.lo);
        for (const [a, b] of WAVE.pulses) {
          ctx.lineTo(a, WAVE.lo);
          ctx.lineTo(a, WAVE.hi);
          ctx.lineTo(b, WAVE.hi);
          ctx.lineTo(b, WAVE.lo);
        }
        ctx.lineTo(WAVE.x1, WAVE.lo);
      } else {
        ctx.moveTo(WAVE.x0, CJH_Y);
        ctx.lineTo(WAVE.x1, CJH_Y);
      }
      ctx.globalAlpha = 0.35;
      ctx.stroke();
      ctx.restore();
    }
    glowDot(trX, waveY(trX), rphA ? 7.5 : 5.5, P.temporal, rphA ? 1 : 0.75);
    glowDot(trX, CJH_Y, cjhA ? 7 : 5, mixWhite(P.temporal, 0.3), cjhA ? 1 : 0.6);

    // the lens on the catalyst breathes; when the material is in focus, signals run to the circle
    const lensA = mat || topic === "catalyst" ? 0.9 : 0.45;
    for (const off of [0, 0.5]) {
      const f = (time / 1.5 + off) % 1;
      ctx.save();
      ctx.beginPath();
      ctx.arc(LENS.x, LENS.y, LENS.r + 16 * f, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${(1 - f) * lensA * 0.85})`;
      ctx.lineWidth = 5.5;
      ctx.stroke();
      ctx.strokeStyle = rgba(P.material, (1 - f) * lensA);
      ctx.lineWidth = 2.6;
      ctx.stroke();
      ctx.restore();
    }
    if (mat)
      for (const line of [DUP, DLO])
        for (const off of [0, 0.5]) {
          const f = (time / 1.3 + off) % 1,
            [x, y] = lerpPath(line, f);
          glowDot(x, y, 5, P.material, Math.sin(Math.PI * f));
        }

    // material state: live structures
    const vib = reduced.matches ? 0 : 0.03 + 0.12 * heat;
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(CIRC.x, CIRC.y, CIRC.rx - 8, CIRC.ry - 8, 0, 0, Math.PI * 2);
    ctx.clip();
    for (const key of Object.keys(MAT).sort((a, b) => MAT[a].now.R - MAT[b].now.R)) {
      const st = MAT[key].now;
      drawStructure(key, st, time, vib);
      if (st.lab > 0.02) figText(MAT[key].label, st.x, st.y + st.R + 17, 19, 700, INK, st.lab);
    }
    ctx.restore();
    figText(mat ? MAT[topic].caption : "SiC \u00B7 TiO\u2082 \u00B7 Carbon", CAP.x, CAP.y, 27, 500, INK, 1);
  }

  /* ---------- state update ---------- */
  function update(dt, now) {
    if (!paused && !hoverTopic && !reading && now > resumeAt) {
      stepT += dt * 1000;
      if (stepT >= DUR[STEPS[stepIdx]]) {
        stepIdx = (stepIdx + 1) % STEPS.length;
        stepT = 0;
      }
    }
    const next = hoverTopic || STEPS[stepIdx];
    if (next !== topic) {
      topic = next;
      showTopic();
    }
    dots.forEach((d, i) => d.style.setProperty("--p", i === stepIdx && !hoverTopic ? Math.min(1, stepT / DUR[STEPS[stepIdx]]).toFixed(3) : "0"));

    trX += 112 * dt;
    if (trX > WAVE.x1) trX = WAVE.x0;
    pulseOn = inPulse(trX);

    const target = { mw: 0.95, joule: 0.9, rph: pulseOn ? 1 : 0.1, cjh: 0.55, tio2: 0.04, sic: 0.04, carbon: 0.04, catalyst: 0.04 }[topic];
    const rate = topic === "rph" ? (target > heat ? 7.5 : 3.2) : target > heat ? (topic === "mw" ? 1.3 : 2.4) : 0.9;
    heat += (target - heat) * (1 - Math.exp(-rate * dt));
    if (topic === "mw" || topic === "joule" || topic === "rph" || topic === "cjh") {
      const e = 1 - Math.exp(-2.5 * dt),
        isMW = topic === "mw" ? 1 : 0;
      wMW += (isMW - wMW) * e;
      wJ += (1 - isMW - wJ) * e;
    }
    const e3 = 1 - Math.exp(-3 * dt),
      e5 = 1 - Math.exp(-5 * dt);
    mwIcon += ((topic === "mw" ? 1 : 0) - mwIcon) * e3;
    jIcon += ((topic === "joule" ? 1 : 0) - jIcon) * (1 - Math.exp(-4 * dt));
    const joulish = topic === "joule" || topic === "rph" || topic === "cjh";
    plateA += ((joulish ? 1 : 0) - plateA) * e3;
    plateGlow += ((topic === "joule" ? 0.6 : topic === "cjh" ? 0.4 : topic === "rph" ? (pulseOn ? 1 : 0.12) : 0) - plateGlow) * e5;

    if (topic === "mw") {
      waveT -= dt;
      if (waveT <= 0) {
        waves.push({ age: 0 });
        waveT = 0.42;
      }
      bigWaveT -= dt;
      if (bigWaveT <= 0) {
        bigWaves.push({ age: 0 });
        bigWaveT = 0.6;
      }
    }
    for (const arr of [waves, bigWaves]) {
      for (const w of arr) w.age += dt;
      while (arr.length && arr[0].age > (arr === waves ? 1.15 : 1.5)) arr.shift();
    }

    for (const p of parts) {
      p.x += p.v * dt;
      if (p.x > 502 && p.x < 930) p.w = Math.max(p.w, heat * 0.95);
      else p.w *= Math.exp(-0.2 * dt);
      if (p.x > 1256) Object.assign(p, spawn(false));
    }
    const targets = matTargets(topic === "tio2" || topic === "sic" || topic === "carbon" ? topic : null);
    const em = 1 - Math.exp(-6 * dt);
    for (const key in MAT) {
      const s = MAT[key],
        tg = targets[key];
      if (!s.now) s.now = { ...tg };
      for (const f of ["x", "y", "R", "lab"]) s.now[f] += (tg[f] - s.now[f]) * em;
    }
  }

  const INKS = { spatial: textInk(P.spatial), temporal: textInk(P.temporal), material: textInk(P.material), ink: INK };
  function applyPaletteUI() {
    dots.forEach((d, i) => d.style.setProperty("--c", P[GROUP[STEPS[i]]]));
  }
  function showTopic() {
    const T = TOPICS[topic],
      g = GROUP[topic];
    explain.style.setProperty("--c", INKS[g]);
    explain.setAttribute("aria-live", userDriven ? "polite" : "off");
    exEyebrow.textContent = T.eyebrow;
    exText.textContent = T.text + " ";
    if (T.link) {
      const a = document.createElement("a");
      a.href = T.link[1];
      a.textContent = T.link[0];
      exText.append(a);
    }
    if (T.tag) {
      const s = document.createElement("span");
      s.className = "rfig-tag";
      s.textContent = T.tag;
      exText.append(s);
    }
    dots.forEach((d) => d.removeAttribute("aria-current"));
    const idx = STEPS.indexOf(topic);
    if (idx >= 0) dots[idx].setAttribute("aria-current", "step");
  }

  function frame(now) {
    if (!running) return;
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
    last = now;
    update(dt, now);
    render((now - t0) / 1000);
    raf = requestAnimationFrame(frame);
  }
  function setRunning(v) {
    v = v && !paused && !reduced.matches && ready;
    if (v === running) return;
    running = v;
    if (v) {
      last = 0;
      raf = requestAnimationFrame(frame);
    } else cancelAnimationFrame(raf);
  }
  function still() {
    for (let i = 0; i < 90; i++) update(1 / 30, performance.now() + 1e9);
    if (topic === "rph") {
      trX = 930;
      pulseOn = true;
      heat = 1;
      plateGlow = 1;
    }
    waves.length = 0;
    bigWaves.length = 0;
    render(1.2);
  }

  function reserveText() {
    const keep = exText.innerHTML;
    let tallest = 0;
    exText.style.minHeight = "0";
    for (const key in TOPICS) {
      const T = TOPICS[key];
      exText.textContent = T.text + (T.link ? " " + T.link[0] : "") + (T.tag ? " " + T.tag : "");
      tallest = Math.max(tallest, exText.offsetHeight);
    }
    exText.innerHTML = keep;
    exText.style.minHeight = tallest + "px";
  }
  function resize() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    const r = fig.getBoundingClientRect();
    for (const c of [base, fx]) {
      c.width = Math.max(1, Math.round(r.width * dpr));
      c.height = Math.max(1, Math.round(r.height * dpr));
    }
    k = r.width / FW;
    reserveText();
    drawBase();
    if (ready && !running) render((performance.now() - t0) / 1000);
  }

  /* ---------- interaction ---------- */
  function place(el, r) {
    el.style.left = (r[0] / FW) * 100 + "%";
    el.style.top = (r[1] / FH) * 100 + "%";
    el.style.width = ((r[2] - r[0]) / FW) * 100 + "%";
    el.style.height = ((r[3] - r[1]) / FH) * 100 + "%";
  }
  function engage(t) {
    userDriven = true;
    hoverTopic = t;
    const idx = STEPS.indexOf(t);
    if (idx >= 0) {
      stepIdx = idx;
      stepT = 0;
    }
    if ((reduced.matches || paused) && ready) {
      topic = t;
      showTopic();
      still();
    }
  }
  function release() {
    hoverTopic = null;
    resumeAt = performance.now() + 2600;
  }
  const toFig = (e) => {
    const r = fig.getBoundingClientRect();
    return [(e.clientX - r.left) / k, (e.clientY - r.top) / k];
  };
  for (const h of HOTS) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "rfig-hot";
    b.setAttribute("aria-label", h.label);
    place(b, h.r);
    const choose = (e) => {
      if (!h.chart || !e || e.clientX === undefined) return h.t;
      const [x, y] = toFig(e);
      return Math.abs(y - CJH_Y) < 11 || (x > 1005 && Math.abs(y - CJH_Y) < 18) ? "cjh" : "rph";
    };
    b.addEventListener("pointerenter", (e) => engage(choose(e)));
    if (h.chart)
      b.addEventListener("pointermove", (e) => {
        const t = choose(e);
        if (t !== hoverTopic) engage(t);
      });
    b.addEventListener("focus", () => engage(h.t));
    b.addEventListener("pointerleave", release);
    b.addEventListener("blur", release);
    b.addEventListener("click", (e) => engage(choose(e)));
    fig.append(b);
  }
  const circ = document.createElement("div");
  circ.className = "rfig-hot is-circle";
  circ.setAttribute("aria-hidden", "true");
  place(circ, [CIRC.x - CIRC.rx, CIRC.y - CIRC.ry, CIRC.x + CIRC.rx, CIRC.y + CIRC.ry]);
  const pick = (e) => {
    const [x, y] = toFig(e);
    let best = null,
      bd = Infinity;
    for (const key in MAT) {
      const s = MAT[key].now;
      if (!s) continue;
      const d = Math.hypot(x - s.x, y - s.y) - s.R;
      if (d < 16 && d < bd) {
        bd = d;
        best = key;
      }
    }
    if (best && best !== hoverTopic) engage(best);
    else if (!best && !hoverTopic) engage(topic === "sic" || topic === "carbon" ? topic : "tio2");
  };
  circ.addEventListener("pointermove", pick);
  circ.addEventListener("pointerdown", pick);
  circ.addEventListener("pointerleave", release);
  fig.append(circ);
  const keys = { tio2: [1368, 324, 1508, 464], sic: [1300, 490, 1420, 610], carbon: [1458, 490, 1578, 610] };
  for (const key in keys) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "rfig-hot is-key";
    place(b, keys[key]);
    b.setAttribute("aria-label", TOPICS[key].eyebrow.replace("Material state | ", ""));
    b.addEventListener("focus", () => engage(key));
    b.addEventListener("blur", release);
    fig.append(b);
  }
  dots.forEach((d, i) =>
    d.addEventListener("click", () => {
      userDriven = true;
      stepIdx = i;
      stepT = 0;
      hoverTopic = null;
      resumeAt = performance.now() + 1200;
      if (reduced.matches || paused) {
        topic = STEPS[i];
        showTopic();
        still();
      }
    })
  );
  // Hold the tour while the pointer rests on the caption, so a description does not change mid-sentence.
  explain.addEventListener("pointerenter", () => (reading = true));
  explain.addEventListener("pointerleave", () => (reading = false));
  playBtn.addEventListener("click", () => {
    paused = !paused;
    playBtn.textContent = paused ? "Play" : "Pause";
    playBtn.setAttribute("aria-pressed", String(paused));
    setRunning(!paused && onScreen && !document.hidden);
    if (paused) render((performance.now() - t0) / 1000);
  });

  /* ---------- start ---------- */
  function start() {
    try {
      const c = mk(FW, FH),
        x = c.getContext("2d", { willReadFrequently: true });
      x.drawImage(img, 0, 0, FW, FH);
      const id = x.getImageData(0, 0, FW, FH);
      cleanFigure(id.data);
      clean = id.data;
      x.putImageData(id, 0, 0);
      masks = buildMasks(x);
      figC = mk(FW, FH);
      paintFigure();
    } catch (e) {
      masks = null;
      clean = null;
      figC = null;
    }
    ready = true;
    applyPaletteUI();
    resize();
    showTopic();
    if (reduced.matches) {
      playBtn.hidden = true;
      still();
      return;
    }
    new IntersectionObserver(
      (es) => {
        onScreen = es[0].isIntersecting;
        setRunning(onScreen && !document.hidden);
      },
      { threshold: 0.05 }
    ).observe(fig);
    document.addEventListener("visibilitychange", () => setRunning(onScreen && !document.hidden));
    setRunning(true);
  }
  applyPaletteUI();
  new ResizeObserver(resize).observe(fig);
  if (img.complete && img.naturalWidth) start();
  else img.addEventListener("load", start, { once: true });
})();
