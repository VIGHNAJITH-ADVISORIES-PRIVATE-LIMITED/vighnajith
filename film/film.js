// Vighnajith Advisories brand film. Pure function of time. 120 bpm: 1 beat = 0.5 s, 120 beats = 60 s.
import * as M from './lib/motion.js';
const { W, H, E, prog, lerp, clamp, springU, springKeys, SPRING, font, layout, glyph, text, fill, rrect, shake, mix, kf } = M;

const INK = '#16161A', CHAR = '#34343A', ORANGE = '#F99A1C', DEEP = '#A64A06', SURF = '#F4F4F1', WHITE = '#FFFFFF', MUTE = '#BDBDC4';
const DISPLAY = 'Display', UI = 'UI';

// ------------------------------------------------------------------ hits (every accent -> a sound)
const POP = ['D5', 'E5', 'F#5', 'A5', 'B5', 'D6', 'E6', 'F#6', 'A6'];
const HITS = [
  [0, 'GST stamp', 'impact'],
  [1, 'TDS', 'thud', { pitch: 'D2' }], [2, 'ROC', 'thud', { pitch: 'D2' }], [3, 'Payroll', 'thud', { pitch: 'E2' }],
  [4, 'Audit', 'thud', { pitch: 'E2' }], [5, 'Income tax', 'click'], [5.5, 'Returns', 'click'], [6, 'Registrations', 'click'],
  [6.5, 'Statutory', 'click'], [7, 'Bookkeeping', 'click'], [7.5, 'Accounting', 'thud', { pitch: 'A2' }],
  [8, 'wall blows out', 'whoosh', { len: 0.6, from: 400, to: 3000 }],
  [9, 'Running a company', 'pop', { pitch: 'A5' }], [10, 'is the job', 'pop', { pitch: 'D6' }],
  [12, 'Compliance', 'thud', { pitch: 'D2' }], [13.5, 'is ours', 'bell', { pitch: 'A5' }],
  [15, 'riser to drop', 'riser', { len: 1.0 }],
  [16, 'DROP: orange whip + header', 'impact'],
  [16.5, 'H1 line 1', 'click'], [17, 'H1 line 2', 'click'], [17.5, 'H1 line 3', 'click'],
  [17.7, 'register card', 'whoosh', { len: 0.35, from: 800, to: 2600, pan: 0.4 }],
  [18.5, 'actions', 'pop', { pitch: 'D6' }],
  [21.5, 'camera push', 'whoosh', { len: 0.5, from: 500, to: 2200 }],
  ...[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => [22 + i * 0.5, 'row ' + i, 'tick']),
  [27.5, 'pull back', 'whoosh', { len: 0.4, from: 2400, to: 600 }],
  [28, 'whip to services', 'impact'],
  [28.3, 'Nine services', 'pop', { pitch: 'A5' }],
  ...[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => [29 + i * 0.5, 'card ' + i, 'pop', { pitch: POP[i], pan: ((i % 3) - 1) * 0.4 }]),
  [32, 'One team', 'bell', { pitch: 'D6' }],
  [36, 'card opens', 'whoosh', { len: 0.4, from: 600, to: 2200 }], [37, 'accordion expands', 'thud', { pitch: 'G2' }],
  [38, 'Online', 'click'], [39, 'Or offline', 'click'], [41, 'Your books', 'click'], [42, 'your model', 'bell', { pitch: 'A5' }],
  [44, 'whip to books', 'impact'],
  [44.3, 'Books', 'thud', { pitch: 'D2' }], [46, 'Taxes', 'thud', { pitch: 'E2' }], [48, 'Filings', 'thud', { pitch: 'F#2' }],
  [50, 'One team', 'impact'],
  ...[0, 1, 2, 3, 4].map((i) => [52.5 + i * 0.5, 'cred ' + i, 'pop', { pitch: POP[i + 2], pan: (i - 2) * 0.3 }]),
  [58.5, 'whip out', 'whoosh', { len: 0.5, from: 500, to: 2800 }],
  [60, 'whip to who we work with', 'impact'],
  [60.4, 'title', 'pop', { pitch: 'A5' }],
  [62.5, 'Startups row', 'whoosh', { len: 0.4, from: 700, to: 2500, pan: 0.3 }], [66, 'SMEs row', 'whoosh', { len: 0.4, from: 700, to: 2500, pan: -0.3 }],
  [70, 'Corporate row', 'whoosh', { len: 0.4, from: 700, to: 2500, pan: 0.3 }], [73, 'zoom out', 'bell', { pitch: 'D6' }],
  [76, 'whip to steps', 'impact'], [76.4, 'From first call', 'pop', { pitch: 'A5' }], [77.4, 'to ongoing support', 'pop', { pitch: 'D6' }],
  ...[0, 1, 2, 3].map((i) => [79 + i * 2.5, 'step ' + (i + 1), 'bell', { pitch: ['D5', 'F#5', 'A5', 'D6'][i] }]),
  [92, 'orange scene', 'impact'], [92.4, 'Trust and accuracy', 'thud', { pitch: 'D2' }], [94, 'Team effort', 'thud', { pitch: 'E2' }],
  [96, 'Client first', 'thud', { pitch: 'F#2' }], [98, 'Filings made on time', 'thud', { pitch: 'A2' }],
  [100, 'leadership panel', 'whoosh', { len: 0.5, from: 500, to: 2400 }],
  [104, 'whip to CTA', 'impact'], [104.4, 'Take the', 'click'], [104.9, 'workload off', 'click'], [106, 'Run the', 'click'], [106.5, 'business', 'bell', { pitch: 'A5' }],
  [108, 'form flies up', 'whoosh', { len: 0.5, from: 500, to: 2400 }], [110, 'phone number', 'thud', { pitch: 'D2' }],
  [111, 'button', 'pop', { pitch: 'A5' }], [112.5, 'email', 'click'],
  [115, 'riser to end', 'riser', { len: 1.0 }],
  [116, 'END CARD logo', 'impact'], [116.4, 'tagline', 'bell', { pitch: 'D6' }], [117, 'contact', 'click'],
];

// ------------------------------------------------------------------ helpers
let IM = null;
const imgW = (im) => im.width, imgH = (im) => im.height;

// real screenshot, centred, drawn at width w
function card(ctx, im, cx, cy, w, { rot = 0, sc = 1, a = 1, r = 0, shadow = 0, sx = 1, sy = 1 } = {}) {
  if (!im || a <= 0 || sc <= 0.001) return 0;
  const h = (w * im.height) / im.width;
  ctx.save();
  ctx.globalAlpha *= clamp(a);
  ctx.translate(cx, cy); ctx.rotate((rot * Math.PI) / 180); ctx.scale(sc * sx, sc * sy);
  if (shadow) { ctx.shadowColor = 'rgba(22,22,26,0.22)'; ctx.shadowBlur = shadow; ctx.shadowOffsetY = shadow * 0.35; }
  if (r) { rrect(ctx, -w / 2, -h / 2, w, h, r); ctx.save(); ctx.clip(); ctx.drawImage(im, -w / 2, -h / 2, w, h); ctx.restore(); }
  else ctx.drawImage(im, -w / 2, -h / 2, w, h);
  ctx.restore();
  return h;
}

// masked-rise / stamp kinetic line
function slam(ctx, u, u0, str, x, base, size, color, o = {}) {
  const { align = 'left', rot = 0, mode = 'rise', w = 800, out = null, trk = -0.035 } = o;
  const stag = o.stag != null ? o.stag : Math.min(0.035, 0.7 / Math.max(1, str.length));
  if (u < u0 - 0.001) return null;
  const f = font(size, w, DISPLAY), tr = trk * size, L = layout(ctx, str, f, tr);
  const x0 = align === 'center' ? x - L.width / 2 : align === 'right' ? x - L.width : x;
  const eo = out == null ? 0 : E.inCubic(prog(u, out, out + 0.45));
  if (eo >= 1) return L;
  ctx.save();
  if (rot) { const px = x0 + L.width / 2, py = base - size * 0.3; ctx.translate(px, py); ctx.rotate((rot * Math.PI) / 180); ctx.translate(-px, -py); }
  if (mode === 'rise') {
    ctx.beginPath(); ctx.rect(x0 - 40, base - size * 1.02, L.width + 80, size * 1.32); ctx.clip();
    L.glyphs.forEach((g, j) => {
      const k = springU(u, u0 + j * stag, SPRING.snappy);
      if (k <= 0) return;
      glyph(ctx, g.ch, x0 + g.cx, base + (1 - k) * size * 1.0 - eo * size * 1.25, f, color);
    });
  } else {
    const k = springU(u, u0, SPRING.snappy);
    const s = lerp(2.2, 1, Math.min(k, 1.2)), a = clamp(k * 3) * (1 - eo);
    ctx.globalAlpha *= a;
    ctx.translate(x0 + L.width / 2, base - size * 0.3); ctx.scale(s, s);
    ctx.translate(-(x0 + L.width / 2), -(base - size * 0.3));
    text(ctx, str, x0, base - eo * size, f, color, 'left', tr);
  }
  ctx.restore();
  return L;
}

function check(ctx, cx, cy, s, p, color, lw) {
  if (p <= 0) return;
  const pts = [[-0.5, 0.05], [-0.15, 0.4], [0.5, -0.4]].map(([a, b]) => [cx + a * s, cy + b * s]);
  const l1 = Math.hypot(pts[1][0] - pts[0][0], pts[1][1] - pts[0][1]), l2 = Math.hypot(pts[2][0] - pts[1][0], pts[2][1] - pts[1][1]);
  let d = p * (l1 + l2);
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(...pts[0]);
  if (d <= l1) { const t = d / l1; ctx.lineTo(lerp(pts[0][0], pts[1][0], t), lerp(pts[0][1], pts[1][1], t)); }
  else { ctx.lineTo(...pts[1]); const t = (d - l1) / l2; ctx.lineTo(lerp(pts[1][0], pts[2][0], t), lerp(pts[1][1], pts[2][1], t)); }
  ctx.stroke(); ctx.restore();
}

const dim = (c, u, u0, to = CHAR, amt = 0.85) => mix(c, to, prog(u, u0 + 0.8, u0 + 2.2) * amt);

// ------------------------------------------------------------------ S1 hook (u 0..9, ink)
const WALL = [
  ['GST.', 0, 960, 650, 470, WHITE, 0], ['TDS.', 1, 430, 350, 310, ORANGE, -6], ['ROC.', 2, 1450, 410, 350, MUTE, 5],
  ['Payroll.', 3, 560, 910, 280, WHITE, -4], ['Audit.', 4, 1420, 870, 310, ORANGE, 3], ['Income tax.', 5, 960, 215, 215, WHITE, 0],
  ['Returns.', 5.5, 330, 660, 240, MUTE, -9], ['Registrations.', 6, 1480, 625, 195, WHITE, 6], ['Statutory.', 6.5, 900, 1010, 240, ORANGE, -2],
  ['Bookkeeping.', 7, 420, 170, 205, WHITE, 4], ['Accounting.', 7.5, 960, 610, 400, ORANGE, 0],
];
function sceneHook(ctx, u) {
  fill(ctx, INK);
  ctx.save(); { const z = 1 + 0.07 * prog(u, 0, 8); ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.translate(-W / 2, -H / 2); }
  WALL.forEach(([str, u0, cx, base, size, col, rot], i) => {
    if (u < u0) return;
    const k = springU(u, u0, SPRING.snappy);
    const f = font(size, 800, DISPLAY), tr = -0.035 * size, L = layout(ctx, str, f, tr);
    const eo = E.inBack(prog(u, 8 + i * 0.03, 8.75 + i * 0.03), 1.2);
    const vx = cx - 960, vy = base - 600, vl = Math.hypot(vx, vy) || 1;
    ctx.save();
    ctx.globalAlpha = clamp(k * 3) * (1 - clamp(eo * 1.1));
    ctx.translate(cx + (vx / vl) * eo * 1500, base - size * 0.3 + (vy / vl) * eo * 1100);
    ctx.rotate(((rot + (1 - Math.min(k, 1)) * 10 + eo * rot * 4) * Math.PI) / 180);
    const s = lerp(2.3, 1, Math.min(k, 1.15)) * (1 + eo * 0.6);
    ctx.scale(s, s);
    text(ctx, str, -L.width / 2, size * 0.3, f, dim(col, u, u0), 'left', tr);
    ctx.restore();
  });
  ctx.restore();
}

// ------------------------------------------------------------------ S2 statement (u 9..16, ink)
function sceneStatement(ctx, u) {
  fill(ctx, INK);
  const s1 = 150;
  slam(ctx, u, 9, 'Running a company', 130, 470, s1, WHITE, { out: 12 });
  const L2 = slam(ctx, u, 10, 'is the job.', 130, 640, s1, WHITE, { out: 12.1 });
  if (L2) { const p = E.outQuint(prog(u, 10.5, 11.3)); const e = 1 - E.inCubic(prog(u, 12, 12.4)); ctx.fillStyle = ORANGE; ctx.fillRect(130, 672, L2.width * p * e, 14); }
  const sz = 280;
  slam(ctx, u, 12.5, 'Compliance', 120, 570, sz, WHITE, { w: 800 });
  slam(ctx, u, 13.5, 'is ours.', 120, 880, sz, ORANGE, {});
}

// ------------------------------------------------------------------ S3 hero (u 16..28, white)
const REG_ROWS = [97, 143, 189, 236, 282, 328, 374, 420, 467];
function sceneHero(ctx, u) {
  fill(ctx, WHITE);
  const hdr = IM.hdr, h1 = IM.h1, reg = IM.reg, act = IM.actions;
  // camera: push into the register card
  const regW = 560, regK = regW / reg.width, regH = reg.height * regK;
  const regCx = 1530, regCy = 600;
  const p = springKeys(u, [[0, 0], [21.5, 1], [27, 0]], SPRING.gentle);
  ctx.save();
  ctx.translate(W / 2, H / 2);
  const s = lerp(1, 1.45, p); ctx.scale(s, s);
  ctx.translate(-lerp(W / 2, regCx, p), -lerp(H / 2, regCy, p));
  ctx.save(); ctx.globalAlpha = 1 - clamp(p * 1.8);
  // header drops in
  const hk = springU(u, 16, SPRING.snappy);
  card(ctx, hdr, W / 2, 56 - (1 - hk) * 130, W);
  // H1 in three masked bands
  const h1w = 1010, h1k = h1w / h1.width, h1x = 110, h1y = 245;
  const bands = [[0, 150], [150, 300], [300, 452]];
  bands.forEach(([a, b], i) => {
    const k = springU(u, 16.5 + i * 0.5, SPRING.snappy);
    if (k <= 0) return;
    const dh = (b - a) * h1k, dy = h1y + a * h1k;
    ctx.save(); ctx.beginPath(); ctx.rect(h1x - 10, dy, h1w + 20, dh); ctx.clip();
    ctx.drawImage(h1, 0, a, h1.width, b - a, h1x, dy + (1 - k) * dh * 1.1, h1w, dh);
    ctx.restore();
  });
  // actions pop
  const ak = springU(u, 18.5, SPRING.bouncy);
  card(ctx, act, h1x + 505, 705, 1010, { sc: lerp(0.7, 1, Math.min(ak, 1.1)), a: ak * 3 });
  // orange rule under the headline block
  const rk = E.outQuint(prog(u, 19, 19.9)); ctx.fillStyle = ORANGE; ctx.fillRect(h1x, 790, 260 * rk, 8);
  ctx.restore();
  // register card flies in from the right
  const rk2 = springU(u, 17.5, SPRING.bouncy);
  card(ctx, reg, regCx + (1 - rk2) * 1100, regCy, regW, { rot: (1 - rk2) * 9, a: rk2 * 4, shadow: 50, r: 10 });
  // sweeping row highlight (real rows, multiply tint)
  if (u > 21.8 && u < 27.4) {
    const ys = REG_ROWS.map((y, i) => [22 + i * 0.5, y]);
    const ry = springKeys(u, [[0, REG_ROWS[0]], ...ys.slice(1)], SPRING.snappy);
    const top = regCy - regH / 2, kk = regW / 487;
    const op = E.outCubic(prog(u, 21.8, 22.2)) * (1 - E.inCubic(prog(u, 26.8, 27.4)));
    ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = op;
    rrect(ctx, regCx - regW / 2 + 22 * kk, top + (ry - 22) * kk, 443 * kk, 44 * kk, 10);
    ctx.fillStyle = '#FFC66B'; ctx.fill(); ctx.restore();
  }
  ctx.restore();
  // side words appear during the push-in (screen space)
  slam(ctx, u, 22.2, 'What the', 70, 470, 80, INK, { out: 27 });
  slam(ctx, u, 22.7, 'firm handles.', 70, 560, 80, ORANGE, { out: 27.1 });
}

// ------------------------------------------------------------------ S4 services (u 28..44, white)
function sceneServices(ctx, u) {
  fill(ctx, WHITE);
  const gx = 680, gy = 190, cw = 370, gap = 22;
  const dirs = [[-1, 0], [0, -1], [1, 0], [-1, 0], [0, 1], [1, 0], [-1, 0], [0, 1], [1, 0]];
  const exit = E.inBack(prog(u, 36, 36.7), 1.0);
  // headline column
  const hx = 96, he = 35.6;
  slam(ctx, u, 28, 'Nine', hx, 390, 130, INK, { out: he });
  slam(ctx, u, 28.25, 'services.', hx, 520, 130, INK, { out: he + 0.05 });
  slam(ctx, u, 32, 'One team.', hx, 720, 110, ORANGE, { out: he + 0.1 });
  ctx.save();
  { const z = 1 + 0.07 * E.inOutSine(prog(u, 31.5, 35.8)) * (1 - E.outCubic(prog(u, 36, 36.7))); const gcx = gx + (3 * cw + 2 * gap) / 2, gcy = gy + 350; ctx.translate(gcx, gcy); ctx.scale(z, z); ctx.translate(-gcx, -gcy); }
  for (let i = 0; i < 9; i++) {
    const im = IM['svc' + i], c = i % 3, r = Math.floor(i / 3);
    const ch = (cw * im.height) / im.width;
    const cx = gx + c * (cw + gap) + cw / 2, cy = gy + r * (ch + gap) + ch / 2;
    const k = springU(u, 29 + i * 0.5, SPRING.bouncy);
    if (k <= 0) continue;
    let px = cx, py = cy, sc = 1, a = clamp(k * 4), rot = (1 - k) * (i % 2 ? 14 : -14);
    px += dirs[i][0] * (1 - k) * 1100; py += dirs[i][1] * (1 - k) * 800;
    if (i === 0) {
      if (u >= 36) continue; // handed over to the expanding real card
      const m = springU(u, 36, SPRING.gentle);
      px = lerp(px, 470, m); py = lerp(py, 520, m); sc = lerp(1, 640 / cw, m);
    } else {
      px += dirs[i][0] * exit * 1400; py += dirs[i][1] * exit * 1000; a *= 1 - clamp(exit);
    }
    card(ctx, im, px, py, cw, { rot, sc, a, shadow: 24, r: 8 });
  }
  ctx.restore();
  if (u >= 36) {
    // the real accordion opening, panned
    const so = IM.svcOpen, w = 640, k = w / so.width, fullH = so.height * k;
    const closedH = IM.svc0.height * (w / IM.svc0.width);
    const open = springU(u, 36.6, SPRING.gentle);
    const wh = lerp(closedH, 860, open);
    const pan = E.inOutSine(prog(u, 38.5, 43.6)) * (fullH - 860);
    const x = 150, y = 110;
    ctx.save();
    ctx.shadowColor = 'rgba(22,22,26,0.22)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 14;
    rrect(ctx, x, y + (860 - wh) / 2 * 0, w, wh, 10); ctx.fillStyle = SURF; ctx.fill();
    ctx.restore();
    ctx.save(); rrect(ctx, x, y, w, wh, 10); ctx.clip();
    ctx.drawImage(so, x, y - pan, w, fullH);
    ctx.restore();
    const ex = 880;
    slam(ctx, u, 38, 'Online.', ex, 360, 190, INK, {});
    slam(ctx, u, 39, 'Or offline.', ex, 560, 190, INK, {});
    slam(ctx, u, 41, 'Your books,', ex, 780, 120, INK, {});
    slam(ctx, u, 42, 'your model.', ex, 910, 120, ORANGE, {});
  }
}

// ------------------------------------------------------------------ S5 one team (u 44..60, surface)
function sceneTeam(ctx, u) {
  fill(ctx, SURF);
  const cxx = 960;
  slam(ctx, u, 44.3, 'Books.', cxx, 700, 480, INK, { align: 'center', out: 45.6 });
  slam(ctx, u, 46, 'Taxes.', cxx, 700, 480, ORANGE, { align: 'center', out: 47.6 });
  slam(ctx, u, 48, 'Filings.', cxx, 700, 480, INK, { align: 'center', out: 49.6 });
  // "One team." giant, then docks to the top
  const dock = springU(u, 52, SPRING.gentle);
  const y1 = lerp(640, 250, dock), s1 = lerp(430, 150, dock), x1 = lerp(cxx, 96, dock);
  if (u >= 50) {
    const k = springU(u, 50, SPRING.snappy);
    const f = font(s1, 800, DISPLAY), tr = -0.035 * s1, L = layout(ctx, 'One team.', f, tr);
    const xx = lerp(cxx - L.width / 2, 96, dock);
    ctx.save(); ctx.globalAlpha = clamp(k * 3);
    const sc = lerp(1.9, 1, Math.min(k, 1.1)); ctx.translate(xx + L.width / 2, y1 - s1 * 0.3); ctx.scale(sc, sc); ctx.translate(-(xx + L.width / 2), -(y1 - s1 * 0.3));
    text(ctx, 'One team.', xx, y1, f, ORANGE, 'left', tr); ctx.restore();
    // sub line
    const sk = E.outQuint(prog(u, 50.6, 51.4));
    if (sk > 0) {
      ctx.save(); ctx.globalAlpha = sk * (1 - dock);
      text(ctx, 'for the books, the taxes and the filings.', cxx, 780 + (1 - sk) * 40, font(62, 600, UI), INK, 'center'); ctx.restore();
    }
    slam(ctx, u, 52.3, 'for the books, the taxes and the filings.', 100, 355, 70, INK, { w: 700 });
  }
  // five credibility cards
  const cw = 336, gap = 20, x0 = (W - (5 * cw + 4 * gap)) / 2;
  for (let i = 0; i < 5; i++) {
    const im = IM['cred' + i], ch = (cw * im.height) / im.width;
    const k = springU(u, 52.5 + i * 0.5, SPRING.bouncy);
    if (k <= 0) continue;
    const ex = E.inCubic(prog(u, 58.4 + i * 0.05, 59.2 + i * 0.05));
    card(ctx, im, x0 + i * (cw + gap) + cw / 2 - ex * 2200, 700 + (1 - k) * 700, cw, { rot: (1 - k) * (i % 2 ? 8 : -8), a: clamp(k * 4), r: 8 });
  }
}

// ------------------------------------------------------------------ S6 who we work with (u 60..76, ink)
function sceneServe(ctx, u) {
  fill(ctx, INK);
  const rw = 1500, ys = [], hs = [];
  let y = 95;
  for (let i = 0; i < 3; i++) { const im = IM['serve' + i]; const h = (rw * im.height) / im.width; hs.push(h); ys.push(y + h / 2); y += h + 20; }
  const cx = W / 2;
  // title
  const tk = u < 62 ? 1 : 0;
  slam(ctx, u, 60.4, 'Who we', 140, 520, 250, WHITE, { out: 62.2 });
  slam(ctx, u, 60.7, 'work with.', 140, 790, 250, ORANGE, { out: 62.3 });
  const cam = springKeys(u, [[0, [cx, 540, 1]], [62.3, [cx, ys[0], 1.22]], [65.8, [cx, ys[1], 1.22]], [69.8, [cx, ys[2], 1.22]], [72.8, [cx, 540, 1]]], SPRING.gentle);
  ctx.save();
  ctx.translate(W / 2, H / 2); ctx.scale(cam[2], cam[2]); ctx.translate(-cam[0], -cam[1]);
  // static small title (appears once the big one leaves)
  [62.5, 66, 70].forEach((u0, i) => {
    const k = springU(u, u0, SPRING.snappy);
    if (k <= 0) return;
    card(ctx, IM['serve' + i], cx + (1 - k) * 2200, ys[i], rw, { a: clamp(k * 5) });
  });
  // orange accent bar sweeping each row's top-left
  [62.5, 66, 70].forEach((u0, i) => {
    const p = E.outQuint(prog(u, u0 + 0.3, u0 + 1.1));
    ctx.fillStyle = ORANGE; ctx.fillRect(cx - rw / 2, ys[i] - hs[i] / 2 - 2, 200 * p, 6);
  });
  ctx.restore();
}

// ------------------------------------------------------------------ S7 how it works (u 76..92, white)
function sceneSteps(ctx, u) {
  fill(ctx, WHITE);
  const exitAll = E.inCubic(prog(u, 90.8, 91.6));
  const cw = 420, gap = 30, n = 4, x0 = (W - (n * cw + (n - 1) * gap)) / 2;
  const sx = (i) => x0 + i * (cw + gap) + cw / 2;
  const cam = springKeys(u, [[0, [W / 2, 540, 1]], [79.2, [sx(0) + 120, 640, 1.5]], [81.7, [sx(1) + 100, 640, 1.5]], [84.2, [sx(2) + 100, 640, 1.5]], [86.7, [sx(3) - 60, 640, 1.5]], [89.2, [W / 2, 560, 1]]], SPRING.gentle);
  ctx.save();
  ctx.translate(W / 2, H / 2); ctx.scale(cam[2], cam[2]); ctx.translate(-cam[0], -cam[1]);
  slam(ctx, u, 76.4, 'From first call', 96, 270, 130, INK, { out: 90.6 });
  slam(ctx, u, 77.4, 'to ongoing support.', 96, 420, 130, ORANGE, { out: 90.7 });
  for (let i = 0; i < n; i++) {
    const im = IM['step' + i], ch = (cw * im.height) / im.width;
    const u0 = 79 + i * 2.5, k = springU(u, u0, SPRING.bouncy);
    if (k <= 0) continue;
    const cx = x0 + i * (cw + gap) + cw / 2 - exitAll * 2400;
    const cy = 700 + (1 - k) * 600;
    card(ctx, im, cx, cy, cw, { a: clamp(k * 4), sc: lerp(0.85, 1, Math.min(k, 1.1)) });
    const bp = M.bump(u, u0 + 0.35, 0.5);
    if (bp > 0) { ctx.save(); ctx.globalAlpha = bp * 0.55; ctx.fillStyle = ORANGE; ctx.beginPath(); ctx.arc(cx - cw / 2 + 36, cy - ch / 2 + 36, 54 * (0.6 + 0.8 * (1 - bp)), 0, M.TAU); ctx.fill(); ctx.restore(); }
  }
  ctx.restore();
}

// ------------------------------------------------------------------ S8 trust (u 92..104, orange)
function sceneTrust(ctx, u) {
  fill(ctx, ORANGE);
  const out = 100;
  slam(ctx, u, 92.4, 'Trust and accuracy.', 110, 250, 150, INK, { out });
  slam(ctx, u, 94, 'Team effort.', 110, 420, 150, INK, { out: out + 0.05 });
  slam(ctx, u, 96, 'Client first.', 110, 590, 150, INK, { out: out + 0.1 });
  const L = slam(ctx, u, 98, 'Filings made on time.', 110, 760, 150, INK, { out: out + 0.15 });
  if (L && u < out + 0.6) check(ctx, 110 + L.width + 130, 700, 190, E.outCubic(prog(u, 98.8, 99.7)), WHITE, 34);
  // leadership panel rises
  const k = springU(u, 100.3, SPRING.gentle);
  if (k > 0) {
    const zoom = lerp(1, 1.1, E.inOutSine(prog(u, 101, 104)));
    card(ctx, IM.lead, W / 2, lerp(1500, 540, k), 1560 * zoom, { shadow: 60, r: 14, a: clamp(k * 4) });
  }
}

// ------------------------------------------------------------------ S9 CTA (u 104..116, ink)
function sceneCta(ctx, u) {
  fill(ctx, INK);
  const out = 114.6;
  slam(ctx, u, 104.4, 'Take the', 120, 250, 135, WHITE, { out });
  slam(ctx, u, 104.9, 'workload off.', 120, 385, 135, WHITE, { out: out + 0.05 });
  slam(ctx, u, 106, 'Run the', 120, 580, 135, WHITE, { out: out + 0.1 });
  slam(ctx, u, 106.5, 'business.', 120, 715, 135, ORANGE, { out: out + 0.15 });
  const fk = springU(u, 108, SPRING.gentle);
  const fe = E.inCubic(prog(u, out, out + 0.8));
  if (fk > 0) card(ctx, IM.form, 1490 + fe * 900, lerp(1500, 520, fk), 570, { r: 12, shadow: 50, rot: (1 - fk) * -6 });
  const ph = slam(ctx, u, 110, '+91 90356 89708', 120, 870, 84, WHITE, { out: out + 0.2, trk: 0.01 });
  const bk = springU(u, 111, SPRING.bouncy);
  if (bk > 0) {
    const pulse = 1 + 0.045 * M.bump(u % 1, 0.15, 0.25) * (u > 112 ? 1 : 0);
    card(ctx, IM.btn, 120 + 210, 970, 420, { sc: lerp(0.5, 1, Math.min(bk, 1.15)) * pulse, a: clamp(bk * 4) * (1 - fe) });
  }
  slam(ctx, u, 112.5, 'vijay@vighnajith.com', 600, 988, 40, MUTE, { w: 500, out: out + 0.25 });
}

// ------------------------------------------------------------------ S10 end card (u 116..120, white)
function sceneEnd(ctx, u) {
  fill(ctx, WHITE);
  const k = springU(u, 116, SPRING.bouncy);
  const r = E.outQuint(prog(u, 116, 117.2));
  const lw = 760, lh = (lw * IM.logo.height) / IM.logo.width;
  if (k > 0) {
    ctx.save();
    ctx.beginPath(); ctx.rect(W / 2 - lw / 2 - 20, 90, (lw + 40) * r, lh + 40); ctx.clip();
    card(ctx, IM.logo, W / 2, 90 + lh / 2 + 10, lw, { sc: lerp(0.78, 1, Math.min(k, 1.15)), a: clamp(k * 3) });
    ctx.restore();
  }
  slam(ctx, u, 116.4, 'Your End-to-End Business Advisory Partner', W / 2, 700, 64, INK, { align: 'center' });
  const rk = E.outQuint(prog(u, 116.8, 117.5)); ctx.fillStyle = ORANGE; ctx.fillRect(W / 2 - 130 * rk, 745, 260 * rk, 8);
  const ck = E.outQuint(prog(u, 117, 117.7));
  if (ck > 0) { ctx.save(); ctx.globalAlpha = ck; text(ctx, 'JP Nagar, Bengaluru  ·  +91 90356 89708  ·  vijay@vighnajith.com', W / 2, 850 + (1 - ck) * 24, font(38, 500, UI), CHAR, 'center'); ctx.restore(); }
}

// ------------------------------------------------------------------ cut + wipe
const SCENES = [
  [0, sceneHook], [9, sceneStatement], [16, sceneHero], [28, sceneServices], [44, sceneTeam],
  [60, sceneServe], [76, sceneSteps], [92, sceneTrust], [104, sceneCta], [116, sceneEnd],
];
// whip wipes at structural cuts: [beat, direction, slab colour]
const WIPES = { 16: ['r', ORANGE], 28: ['l', ORANGE], 44: ['u', INK], 60: ['d', ORANGE], 76: ['r', ORANGE], 92: ['l', INK], 104: ['r', WHITE], 116: ['l', ORANGE] };
const WIPE_HALF = 0.5;

function drawScene(ctx, u, i, IMGS) { SCENES[i][1](ctx, Math.max(u, SCENES[i][0] - 0.0001 - (i === 0 ? 1 : 0)), IMGS); }

function wipe(ctx, u, cut, i, IMGS) {
  const [dir, col] = WIPES[cut];
  const e = E.inOutCubic(prog(u, cut - WIPE_HALF, cut + WIPE_HALF));
  drawScene(ctx, u, i - 1, IMGS);
  const horiz = dir === 'r' || dir === 'l';
  const L = horiz ? W : H, pw = horiz ? 520 : 360, sl = horiz ? 260 : 180;
  const lead = lerp(-sl, L + pw + sl, e);
  const trail = lead - pw;
  // new scene clipped behind the slab
  ctx.save();
  ctx.beginPath();
  const poly = (a) => {
    if (dir === 'r') return [[0, 0], [a + sl / 2, 0], [a - sl / 2, H], [0, H]];
    if (dir === 'l') return [[W, 0], [W - a - sl / 2, 0], [W - a + sl / 2, H], [W, H]];
    if (dir === 'd') return [[0, 0], [W, 0], [W, a + sl / 2], [0, a - sl / 2]];
    return [[0, H], [W, H], [W, H - a - sl / 2], [0, H - a + sl / 2]];
  };
  const P = poly(lead); ctx.moveTo(...P[0]); P.slice(1).forEach((p) => ctx.lineTo(...p)); ctx.closePath(); ctx.clip();
  drawScene(ctx, u, i, IMGS);
  ctx.restore();
  // slab: region between trail and lead
  const A = poly(lead), B = poly(trail);
  ctx.save(); ctx.beginPath();
  if (dir === 'r') { ctx.moveTo(...A[1]); ctx.lineTo(...A[2]); ctx.lineTo(...B[2]); ctx.lineTo(...B[1]); }
  else if (dir === 'l') { ctx.moveTo(...A[1]); ctx.lineTo(...A[2]); ctx.lineTo(...B[2]); ctx.lineTo(...B[1]); }
  else { ctx.moveTo(...A[2]); ctx.lineTo(...A[3]); ctx.lineTo(...B[3]); ctx.lineTo(...B[2]); }
  ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.restore();
}

const SHAKES = [[0, 14], [1, 12], [2, 12], [3, 12], [4, 12], [5, 8], [5.5, 8], [6, 8], [6.5, 8], [7, 8], [7.5, 22], [16, 16], [28, 12], [44.3, 14], [46, 14], [48, 14], [50, 18], [60, 12], [92.4, 10], [94, 10], [96, 10], [98, 10], [104, 12], [110, 10], [116, 14]];

M.film({
  fonts: [font(100, 800, DISPLAY), font(40, 500, UI), font(40, 600, UI)],
  images: {
    logo: 'assets/logo.png', hdr: 'assets/shots/header.png', h1: 'assets/shots/h1.png', actions: 'assets/shots/actions.png', reg: 'assets/shots/register.png',
    ...Object.fromEntries([0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => ['svc' + i, `assets/shots/svc_${i}.png`])), svcOpen: 'assets/shots/svc_open.png',
    ...Object.fromEntries([0, 1, 2, 3, 4].map((i) => ['cred' + i, `assets/shots/cred_${i}.png`])),
    ...Object.fromEntries([0, 1, 2].map((i) => ['serve' + i, `assets/shots/serve_${i}.png`])),
    ...Object.fromEntries([0, 1, 2, 3].map((i) => ['step' + i, `assets/shots/step_${i}.png`])),
    lead: 'assets/shots/lead.png', form: 'assets/shots/form.png', btn: 'assets/shots/btn.png',
  },
  hits: HITS,
  samples: (t) => { const u = M.U(t); return Object.keys(WIPES).some((c) => Math.abs(u - c) < 0.6) ? 8 : 6; },
  draw(ctx, u, t, IMGS) {
    IM = IMGS;
    let i = SCENES.length - 1; while (i > 0 && u < SCENES[i][0]) i--;
    ctx.save();
    SHAKES.forEach(([s, a], j) => shake(ctx, u, s, a, 3 + j));
    // wipe window: at the cut shared by scenes i-1 and i (or i and i+1 when approaching)
    let drawn = false;
    for (const c of Object.keys(WIPES).map(Number)) {
      if (u > c - WIPE_HALF && u < c + WIPE_HALF) { const idx = SCENES.findIndex((s) => s[0] === c); wipe(ctx, u, c, idx, IMGS); drawn = true; break; }
    }
    if (!drawn) drawScene(ctx, u, i, IMGS);
    ctx.restore();
  },
});
