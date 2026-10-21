/* =====================================================================
   k3-engine.js  ·  Mrs. Pitts' 3rd Grade class website engine
   ---------------------------------------------------------------------
   Plain JavaScript, no libraries. This file must load BEFORE the content
   files (k3-math.js, k3-reading.js, ...) because they call K3.add() and
   K3.pic.*() while they load. Rendering waits for DOMContentLoaded.
   ===================================================================== */
(function () {
  "use strict";

  var CFG = window.K3_CONFIG || {};
  CFG.teacher = CFG.teacher || "Mrs. Pitts";
  CFG.school = CFG.school || "Alpine Vista";
  CFG.grade = CFG.grade || "3rd Grade";
  CFG.className = CFG.className || (CFG.teacher + "’ " + CFG.grade);
  /* class list: "First Last" strings (or {name}); each student gets a stable id made from the name */
  function normName(n) { return String(n || "").normalize ? String(n || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9 '-]/g, " ").replace(/\s+/g, " ").trim() : String(n || "").toLowerCase().trim(); }
  function nameId(n) { return normName(n).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function niceName(n) { return String(n || "").trim().replace(/\s+/g, " ").split(" ").map(function (w) { if (!w) return w; if (w === w.toUpperCase() || w === w.toLowerCase()) w = w.toLowerCase(); return w[0].toUpperCase() + w.slice(1); }).join(" "); }
  /* private name code: the class list can hold codes instead of real names, so names are not public on GitHub */
  function nameCode(n) { var str = normName(n), h1 = 0xdeadbeef, h2 = 0x41c6ce57; for (var i = 0; i < str.length; i++) { var ch = str.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); } h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909); h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909); return "#" + (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36); }
  window.K3_NAME = { norm: normName, id: nameId, nice: niceName, code: nameCode };
  var rawList = Array.isArray(CFG.students) ? CFG.students : [];
  CFG.studentCodes = {};
  CFG.students = rawList.map(function (s) { var name = typeof s === "string" ? s : (s && s.name) || ""; name = String(name).trim(); if (!name) return null; if (name.charAt(0) === "#") { CFG.studentCodes[name.split(/\s/)[0].toLowerCase()] = 1; return null; } CFG.studentCodes[nameCode(name)] = 1; return { name: name, num: nameId(name) }; }).filter(Boolean);
  CFG.openSignIn = !Object.keys(CFG.studentCodes).length || CFG.students.length && CFG.students.every(function (s) { return /^student \d+$/i.test(s.name); });
  CFG.goals = CFG.goals || {};
  CFG.goals.mathFactsPerMin = CFG.goals.mathFactsPerMin || 30;
  CFG.goals.readingWCPM = CFG.goals.readingWCPM || { fall: 83, winter: 97, spring: 112 };
  CFG.announcements = Array.isArray(CFG.announcements) ? CFG.announcements : [];
  CFG.scriptUrl = (CFG.scriptUrl || "").trim();
  window.K3_CONFIG = CFG;

  var QS = {};
  try { (location.search || "").replace(/^\?/, "").split("&").forEach(function (kv) { if (!kv) return; var p = kv.split("="); QS[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || "1"); }); } catch (e) {}
  var FAST = QS.fast === "1";

  /* ---------- tiny utilities ---------- */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function strip(html) { var s = String(html == null ? "" : html).replace(/<svg[\s\S]*?<\/svg>/gi, " ").replace(/<span[^>]*display\s*:\s*block[^>]*>([\s\S]*?)<\/span>/gi, " $1. ").replace(/<\/(b|i|em|strong|u|span|mark|small|sub|sup|a|code)>(?=<)/gi, " ").replace(/<\/?(span|a)\b[^>]*>/gi, " ").replace(/<\/?(b|i|em|strong|u|mark|small|sub|sup|code)\b[^>]*>/gi, "").replace(/<[^>]+>/g, " "); s = s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'"); return s.replace(/\s+/g, " ").replace(/\s+([.,!?;:])/g, "$1").replace(/([.!?:])\.(\s|$)/g, "$1$2").trim(); }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function round(x, d) { var m = Math.pow(10, d || 0); return Math.round(x * m) / m; }
  function today() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function dayKey(t) { var d = new Date(t); if (isNaN(d)) return ""; return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function shortDate(t) { var d = new Date(t); return isNaN(d) ? "" : (d.getMonth() + 1) + "/" + d.getDate(); }
  function longDate(t) { var d = new Date(t || Date.now()); return isNaN(d) ? "" : d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }); }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
  function hashStr(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { var a = typeof seed === "number" ? seed : hashStr(seed); return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function shuffle(arr, r) { r = r || Math.random; var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pick(arr, r) { return arr[Math.floor((r || Math.random)() * arr.length)]; }
  function words(s) { return String(s || "").trim().split(/\s+/).filter(Boolean); }
  function season(d) { var m = (d || new Date()).getMonth(); return (m >= 7 && m <= 10) ? "fall" : (m === 11 || m <= 2) ? "winter" : "spring"; }

  /* ---------- safe storage (everything in try/catch) ---------- */
  var mem = {};
  var store = {
    get: function (k, def) { try { var v = window.localStorage.getItem(k); if (v == null) return k in mem ? mem[k] : def; return JSON.parse(v); } catch (e) { return k in mem ? mem[k] : def; } },
    set: function (k, v) { mem[k] = v; try { window.localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } },
    del: function (k) { delete mem[k]; try { window.localStorage.removeItem(k); } catch (e) {} },
    sget: function (k) { try { return window.sessionStorage.getItem(k); } catch (e) { return mem["s:" + k] || null; } },
    sset: function (k, v) { mem["s:" + k] = v; try { window.sessionStorage.setItem(k, v); } catch (e) {} },
    sdel: function (k) { delete mem["s:" + k]; try { window.sessionStorage.removeItem(k); } catch (e) {} }
  };

  /* ---------- subjects ---------- */
  var SUBJECTS = [
    { id: "reading", name: "Reading", emoji: "📖", tint: "#e9dcff", blurb: "Read, think, and answer" },
    { id: "writing", name: "Writing", emoji: "✏️", tint: "#fff0c2", blurb: "Words, sentences, and stories" },
    { id: "math", name: "Math", emoji: "➗", tint: "#d9f5ea", blurb: "Numbers, facts, and shapes" },
    { id: "history", name: "History", sub: "Social Studies", emoji: "🏛️", tint: "#ffe1d6", blurb: "Our community and California" },
    { id: "science", name: "Science", emoji: "🔬", tint: "#d8ecff", blurb: "Explore, test, and discover" }
  ];
  var SUBJ = {}; SUBJECTS.forEach(function (s) { SUBJ[s.id] = s; });

  /* ---------- the global ---------- */
  var K3 = window.K3 = window.K3 || {};
  K3.version = "1.0";
  K3.config = CFG;
  K3.fast = FAST;
  K3.subjects = SUBJECTS;
  K3.acts = [];
  K3.byId = {};
  K3.passages = [];
  K3.util = { esc: esc, strip: strip, shuffle: shuffle, rng: rng, hashStr: hashStr, words: words, today: today, season: season };
  K3.store = store;
  K3.errors = [];

  var TYPES = ["mc", "tf", "num", "tap", "order", "sort", "build", "shade", "numline", "write"];

  K3.add = function (a) {
    try {
      if (Array.isArray(a)) { a.forEach(K3.add); return; }
      if (!a || typeof a !== "object") return;
      if (!a.id) { console.warn("K3.add: activity without id skipped", a); return; }
      if (K3.byId[a.id]) { console.warn("K3.add: duplicate id skipped:", a.id); return; }
      a.subject = String(a.subject || "").toLowerCase();
      if (!SUBJ[a.subject]) console.warn("K3.add: unknown subject for", a.id, a.subject);
      a.unit = a.unit || "More Practice";
      a.title = a.title || a.id;
      a.standard = a.standard || "";
      a.skill = a.skill || "";
      a.emoji = a.emoji || (SUBJ[a.subject] ? SUBJ[a.subject].emoji : "⭐");
      a.mins = +a.mins || 10;
      a.pass = +a.pass || 80;
      a.learn = Array.isArray(a.learn) ? a.learn : [];
      a.qs = (Array.isArray(a.qs) ? a.qs : []).filter(function (q) { return q && TYPES.indexOf(q.t) >= 0; });
      a._order = K3.acts.length;
      K3.acts.push(a); K3.byId[a.id] = a;
    } catch (e) { console.error("K3.add failed", e); K3.errors.push(String(e)); }
  };

  K3.addPassage = function (p) {
    try {
      if (Array.isArray(p)) { p.forEach(K3.addPassage); return; }
      if (!p || !p.text) return;
      p.id = p.id || ("p-" + K3.passages.length);
      if (K3.passages.some(function (x) { return x.id === p.id; })) { console.warn("K3.addPassage: duplicate id skipped:", p.id); return; }
      p.title = p.title || "Reading Passage";
      p.season = (p.season || "fall").toLowerCase();
      p.text = Array.isArray(p.text) ? p.text.join(" ") : String(p.text);
      p.words = words(p.text);
      p.count = p.words.length;
      K3.passages.push(p);
    } catch (e) { console.error("K3.addPassage failed", e); }
  };

  K3.ofSubject = function (sid) { return K3.acts.filter(function (a) { return a.subject === sid; }); };
  K3.standards = function (sid) {
    var map = {}, out = [];
    K3.acts.forEach(function (a) {
      if (!a.standard || (sid && a.subject !== sid)) return;
      if (!map[a.standard]) { map[a.standard] = { code: a.standard, subject: a.subject, skill: a.skill, acts: [] }; out.push(map[a.standard]); }
      map[a.standard].acts.push(a);
    });
    return out;
  };

  /* ---------- speech ---------- */
  var voice = null;
  function loadVoice() { try { var vs = window.speechSynthesis.getVoices() || []; voice = vs.filter(function (v) { return /^en[-_]US/i.test(v.lang) && /female|samantha|google us|zira|aria|jenny/i.test(v.name); })[0] || vs.filter(function (v) { return /^en[-_]US/i.test(v.lang); })[0] || vs.filter(function (v) { return /^en/i.test(v.lang); })[0] || null; } catch (e) {} }
  try { if (window.speechSynthesis) { loadVoice(); window.speechSynthesis.onvoiceschanged = loadVoice; } } catch (e) {}
  K3.say = function (text, btn) {
    try {
      var s = window.speechSynthesis; if (!s) return;
      var t = strip(text); if (!t) return;
      t = t.replace(/(\d+)\s*\/\s*(\d+)/g, "$1 over $2").replace(/_{2,}/g, " blank ").replace(/÷/g, " divided by ").replace(/×/g, " times ").replace(/(\d)\s*-\s*(\d)/g, "$1 minus $2").replace(/=/g, " equals ");
      s.cancel();
      var u = new SpeechSynthesisUtterance(t);
      u.rate = 0.88; u.pitch = 1.05; u.lang = "en-US"; if (voice) u.voice = voice;
      if (btn) { btn.classList.add("speaking"); u.onend = u.onerror = function () { btn.classList.remove("speaking"); }; }
      s.speak(u);
    } catch (e) {}
  };
  function sayBtn(text, label, cls) { return '<button type="button" class="say ' + (cls || "") + '" data-say="' + esc(strip(text)) + '" aria-label="' + esc(label || "Read aloud") + '" title="Read aloud"><span aria-hidden="true">🔊</span></button>'; }
  K3.sayBtn = sayBtn;

  /* =====================================================================
     K3.pic.*  drawing helpers. Each returns an SVG string.
     ===================================================================== */
  var P = { ink: "#121015", deep: "#5b2a86", bright: "#8a4fd8", lav: "#efe6fb", gold: "#ffc53d", mid: "#c9b3ec", grid: "#d9cdee" };
  var picN = 0;
  function svg(w, h, body, label, cls) { return '<svg class="pic ' + (cls || "") + '" viewBox="0 0 ' + w + " " + h + '" width="' + w + '" height="' + h + '" role="img" aria-label="' + esc(label || "picture") + '" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">' + body + "</svg>"; }
  function txt(x, y, s, o) { o = o || {}; return '<text x="' + x + '" y="' + y + '" font-size="' + (o.size || 16) + '" text-anchor="' + (o.anchor || "middle") + '" fill="' + (o.fill || P.ink) + '"' + (o.bold ? ' font-weight="700"' : "") + ' font-family="Nunito, Arial, sans-serif"' + (o.extra || "") + ">" + esc(s) + "</text>"; }
  function emo(x, y, e, size) { return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 26) + '" text-anchor="middle" dominant-baseline="central">' + esc(e) + "</text>"; }
  function fmtNum(v) { return (Math.round(v * 1000) / 1000).toString(); }
  function fracLabel(k, n) { if (k === 0) return "0"; if (k === n) return "1"; return k + "/" + n; }

  var pic = {};
  pic.array = function (rows, cols, emoji) {
    rows = +rows || 1; cols = +cols || 1; var c = cols > 10 ? 32 : 44, pad = 12, w = cols * c + pad * 2, h = rows * c + pad * 2, b = '<rect x="2" y="2" width="' + (w - 4) + '" height="' + (h - 4) + '" rx="14" fill="' + P.lav + '"/>';
    for (var r = 0; r < rows; r++) for (var k = 0; k < cols; k++) { var x = pad + k * c + c / 2, y = pad + r * c + c / 2; b += emoji ? emo(x, y, emoji, c * 0.62) : '<circle cx="' + x + '" cy="' + y + '" r="' + (c * 0.32) + '" fill="' + P.deep + '"/>'; }
    return svg(w, h, b, rows + " rows of " + cols + (emoji ? " " + emoji : " dots"), "pic-array");
  };
  pic.groups = function (groups, each, emoji) {
    groups = +groups || 1; each = +each || 0; var per = Math.max(1, Math.ceil(Math.sqrt(each))), item = each > 9 ? 20 : 26, d = Math.max(96, per * item + 30), gap = 14, perRow = Math.min(groups, 5), rowsN = Math.ceil(groups / perRow), w = perRow * (d + gap) + gap, h = rowsN * (d + gap) + gap, b = "";
    for (var g = 0; g < groups; g++) {
      var gx = gap + (g % perRow) * (d + gap) + d / 2, gy = gap + Math.floor(g / perRow) * (d + gap) + d / 2;
      b += '<circle cx="' + gx + '" cy="' + gy + '" r="' + (d / 2 - 2) + '" fill="' + P.lav + '" stroke="' + P.bright + '" stroke-width="3"/>';
      var rowsIn = Math.ceil(each / per);
      for (var i = 0; i < each; i++) { var cx = gx + ((i % per) - (per - 1) / 2) * item, cy = gy + (Math.floor(i / per) - (rowsIn - 1) / 2) * item; b += emoji ? emo(cx, cy, emoji, item * 0.8) : '<circle cx="' + cx + '" cy="' + cy + '" r="' + (item * 0.3) + '" fill="' + P.deep + '"/>'; }
    }
    return svg(w, h, b, groups + " groups of " + each, "pic-groups");
  };
  function pieSlice(cx, cy, r, a0, a1) { if (a1 - a0 >= Math.PI * 2 - 1e-6) return "M" + (cx - r) + "," + cy + "a" + r + "," + r + " 0 1,0 " + (2 * r) + ",0a" + r + "," + r + " 0 1,0 " + (-2 * r) + ",0"; var x0 = cx + r * Math.sin(a0), y0 = cy - r * Math.cos(a0), x1 = cx + r * Math.sin(a1), y1 = cy - r * Math.cos(a1); return "M" + cx + "," + cy + "L" + round(x0, 2) + "," + round(y0, 2) + "A" + r + "," + r + " 0 " + (a1 - a0 > Math.PI ? 1 : 0) + ",1 " + round(x1, 2) + "," + round(y1, 2) + "Z"; }
  K3._pieSlice = pieSlice;
  pic.frac = function (parts, shaded, shape) {
    parts = Math.max(1, +parts || 1); shaded = +shaded || 0; var b = "";
    if (shape === "circle") { var r = 80; for (var i = 0; i < parts; i++) b += '<path d="' + pieSlice(90, 90, r, i * 2 * Math.PI / parts, (i + 1) * 2 * Math.PI / parts) + '" fill="' + (i < shaded ? P.bright : "#fff") + '" stroke="' + P.ink + '" stroke-width="3"/>'; return svg(180, 180, b, shaded + " out of " + parts + " parts shaded", "pic-frac"); }
    var W = 360, pw = W / parts; for (var j = 0; j < parts; j++) b += '<rect x="' + (10 + j * pw) + '" y="10" width="' + pw + '" height="64" fill="' + (j < shaded ? P.bright : "#fff") + '" stroke="' + P.ink + '" stroke-width="3"/>';
    return svg(W + 20, 84, b, shaded + " out of " + parts + " parts shaded", "pic-frac");
  };
  pic.numline = function (min, max, ticks, marks) {
    min = +min || 0; max = (max == null) ? 1 : +max; ticks = Math.max(1, +ticks || 1); marks = marks || [];
    var W = 560, x0 = 40, x1 = W - 40, y = 70, step = (max - min) / ticks, b = '<line x1="' + (x0 - 18) + '" y1="' + y + '" x2="' + (x1 + 18) + '" y2="' + y + '" stroke="' + P.ink + '" stroke-width="4" stroke-linecap="round"/>';
    b += '<path d="M' + (x0 - 26) + "," + y + "l10,-8v16z M" + (x1 + 26) + "," + y + 'l-10,-8v16z" fill="' + P.ink + '"/>';
    var fracTicks = Math.abs(step - Math.round(step)) > 1e-9;
    for (var k = 0; k <= ticks; k++) { var v = min + k * step, x = x0 + (x1 - x0) * k / ticks, isInt = Math.abs(v - Math.round(v)) < 1e-9; b += '<line x1="' + x + '" y1="' + (y - 14) + '" x2="' + x + '" y2="' + (y + 14) + '" stroke="' + P.ink + '" stroke-width="3"/>'; if (!fracTicks || isInt || ticks <= 1) b += txt(x, y + 40, fmtNum(v), { size: 20, bold: true }); }
    marks.forEach(function (m) { var v = +m[0], x = x0 + (x1 - x0) * (v - min) / (max - min || 1); b += '<circle cx="' + x + '" cy="' + y + '" r="9" fill="' + P.bright + '" stroke="#fff" stroke-width="2"/>'; if (m[1] != null) b += txt(x, y - 26, m[1], { size: 18, bold: true, fill: P.deep }); });
    return svg(W, 120, b, "number line from " + min + " to " + max, "pic-numline");
  };
  pic.clock = function (h, m) {
    h = +h || 0; m = +m || 0; var c = 100, r = 88, b = '<circle cx="100" cy="100" r="' + r + '" fill="#fff" stroke="' + P.deep + '" stroke-width="8"/>';
    for (var i = 0; i < 60; i++) { var a = i * Math.PI / 30, big = i % 5 === 0, r1 = big ? r - 14 : r - 8; b += '<line x1="' + round(c + r1 * Math.sin(a), 2) + '" y1="' + round(c - r1 * Math.cos(a), 2) + '" x2="' + round(c + (r - 4) * Math.sin(a), 2) + '" y2="' + round(c - (r - 4) * Math.cos(a), 2) + '" stroke="' + P.ink + '" stroke-width="' + (big ? 3 : 1.2) + '"/>'; }
    var ha = ((h % 12) + m / 60) * Math.PI / 6, ma = m * Math.PI / 30;
    b += '<line x1="100" y1="100" x2="' + round(c + 40 * Math.sin(ha), 2) + '" y2="' + round(c - 40 * Math.cos(ha), 2) + '" stroke="' + P.ink + '" stroke-width="8" stroke-linecap="round"/>';
    b += '<line x1="100" y1="100" x2="' + round(c + 77 * Math.sin(ma), 2) + '" y2="' + round(c - 77 * Math.cos(ma), 2) + '" stroke="' + P.bright + '" stroke-width="5" stroke-linecap="round"/>';
    for (var n = 1; n <= 12; n++) { var an = n * Math.PI / 6; b += txt(round(c + (r - 28) * Math.sin(an), 2), round(c - (r - 28) * Math.cos(an) + 7, 2), n, { size: 20, bold: true, extra: ' stroke="#fff" stroke-width="5" paint-order="stroke" stroke-linejoin="round"' }); }
    b += '<circle cx="100" cy="100" r="7" fill="' + P.gold + '" stroke="' + P.ink + '" stroke-width="2"/>';
    return svg(200, 200, b, "a clock", "pic-clock");
  };
  pic.bars = function (title, data, unitLabel, scale) {
    data = data || []; scale = +scale || 1; var maxV = Math.max.apply(null, data.map(function (d) { return +d[1] || 0; }).concat([scale])), steps = Math.ceil(maxV / scale - 1e-9), every = steps > 10 ? Math.ceil(steps / 10) : 1; steps = Math.ceil(steps / every) * every; var top = steps * scale;
    var bw = 54, gap = 22, L = 64, T = 46, H = Math.min(260, Math.max(140, steps * 28)), W = L + data.length * (bw + gap) + gap, b = txt(W / 2, 26, title || "", { size: 18, bold: true });
    for (var s = 0; s <= steps; s++) { var yy = T + H - H * s / steps; b += '<line x1="' + L + '" y1="' + yy + '" x2="' + (W - 6) + '" y2="' + yy + '" stroke="' + P.grid + '" stroke-width="1.5"/>' + (s % every === 0 ? txt(L - 10, yy + 5, s * scale, { size: 14, anchor: "end" }) : ""); }
    data.forEach(function (d, i) { var v = +d[1] || 0, bh = H * v / top, x = L + gap + i * (bw + gap); b += '<rect x="' + x + '" y="' + (T + H - bh) + '" width="' + bw + '" height="' + bh + '" rx="4" fill="' + P.bright + '"/>' + txt(x + bw / 2, T + H + 22, d[0], { size: 15, bold: true }); });
    b += '<line x1="' + L + '" y1="' + T + '" x2="' + L + '" y2="' + (T + H) + '" stroke="' + P.ink + '" stroke-width="2"/><line x1="' + L + '" y1="' + (T + H) + '" x2="' + (W - 6) + '" y2="' + (T + H) + '" stroke="' + P.ink + '" stroke-width="2"/>';
    if (unitLabel) b += txt(16, T + H / 2, unitLabel, { size: 14, extra: ' transform="rotate(-90 16 ' + (T + H / 2) + ')"' });
    if (scale !== 1) b += txt(W - 6, T + H + 44, "Each line = " + scale, { size: 13, anchor: "end", fill: P.deep });
    return svg(W, T + H + (scale !== 1 ? 54 : 34), b, "bar graph: " + (title || ""), "pic-bars");
  };
  pic.picto = function (title, rows, emoji, each) {
    rows = rows || []; each = +each || 1; emoji = emoji || "⭐"; var L = 110, s = 34, maxI = 1, b = "";
    rows.forEach(function (r) { maxI = Math.max(maxI, Math.ceil((+r[1] || 0) / each)); });
    var W = L + maxI * s + 20, H = 44 + rows.length * (s + 8) + 40; b += txt(W / 2, 26, title || "", { size: 18, bold: true });
    rows.forEach(function (r, i) {
      var y = 44 + i * (s + 8), n = (+r[1] || 0) / each, full = Math.floor(n + 1e-9), part = n - full;
      b += '<rect x="4" y="' + y + '" width="' + (W - 8) + '" height="' + s + '" rx="8" fill="' + (i % 2 ? "#fff" : P.lav) + '"/>' + txt(L - 12, y + s / 2 + 6, r[0], { size: 15, bold: true, anchor: "end" });
      for (var k = 0; k < full; k++) b += emo(L + k * s + s / 2, y + s / 2, emoji, 24);
      if (part > 0.01) { var id = "pc" + (++picN); b += '<clipPath id="' + id + '"><rect x="' + (L + full * s) + '" y="' + y + '" width="' + (s * part) + '" height="' + s + '"/></clipPath><g clip-path="url(#' + id + ')">' + emo(L + full * s + s / 2, y + s / 2, emoji, 24) + "</g>"; }
    });
    b += txt(W / 2, H - 12, "Key: each " + emoji + " = " + each, { size: 15, bold: true, fill: P.deep });
    return svg(W, H, b, "pictograph: " + (title || "") + ". Each " + emoji + " equals " + each, "pic-picto");
  };
  pic.area = function (w, h, unitLabel, showGrid) {
    w = +w || 1; h = +h || 1; if (showGrid === undefined) showGrid = true; var u = unitLabel || "units", c = Math.max(18, Math.min(40, Math.floor(340 / Math.max(w, h)))), L = 20 + Math.ceil((String(h) + " " + u).length * 9.5), T = 40, b = "";
    b += '<rect x="' + L + '" y="' + T + '" width="' + (w * c) + '" height="' + (h * c) + '" fill="' + P.lav + '" stroke="' + P.deep + '" stroke-width="4"/>';
    if (showGrid) { for (var i = 1; i < w; i++) b += '<line x1="' + (L + i * c) + '" y1="' + T + '" x2="' + (L + i * c) + '" y2="' + (T + h * c) + '" stroke="' + P.bright + '" stroke-width="1.5"/>'; for (var j = 1; j < h; j++) b += '<line x1="' + L + '" y1="' + (T + j * c) + '" x2="' + (L + w * c) + '" y2="' + (T + j * c) + '" stroke="' + P.bright + '" stroke-width="1.5"/>'; }
    b += txt(L + w * c / 2, T - 12, w + " " + u, { size: 16, bold: true }) + txt(L - 10, T + h * c / 2 + 5, h + " " + u, { size: 16, bold: true, anchor: "end" });
    return svg(L + w * c + 70, T + h * c + 20, b, "rectangle " + w + " by " + h + " " + u, "pic-area");
  };
  pic.base10 = function (hu, te, on) {
    hu = +hu || 0; te = +te || 0; on = +on || 0; var u = 7, x = 10, b = "", H = 10 * u + 20;
    function cube(cx, cy) { return '<rect x="' + cx + '" y="' + cy + '" width="' + u + '" height="' + u + '" fill="' + P.bright + '" stroke="' + P.deep + '" stroke-width="1"/>'; }
    for (var i = 0; i < hu; i++) { for (var r = 0; r < 10; r++) for (var c = 0; c < 10; c++) b += cube(x + c * u, 10 + r * u); x += 10 * u + 12; }
    for (var t = 0; t < te; t++) { for (var r2 = 0; r2 < 10; r2++) b += cube(x, 10 + r2 * u); x += u + 8; }
    if (te) x += 6;
    for (var o = 0; o < on; o++) b += cube(x + (o % 2) * (u + 5), 10 + 10 * u - u - Math.floor(o / 2) * (u + 5));
    x += on ? 2 * u + 15 : 0;
    return svg(Math.max(x, 40), H, b, hu + " hundreds, " + te + " tens, " + on + " ones", "pic-base10");
  };
  pic.coins = function (q, d, n, p) {
    var list = []; if (Array.isArray(q)) list = q; else { for (var i = 0; i < (+q || 0); i++) list.push("q"); for (i = 0; i < (+d || 0); i++) list.push("d"); for (i = 0; i < (+n || 0); i++) list.push("n"); for (i = 0; i < (+p || 0); i++) list.push("p"); }
    var info = { q: [30, "25¢", "#d7d7de"], d: [22, "10¢", "#e4e4ea"], n: [26, "5¢", "#cfcfd6"], p: [24, "1¢", "#d99b66"] }, x = 8, b = "";
    list.forEach(function (c) { c = String(c)[0].toLowerCase(); var f = info[c] || info.p; b += '<circle cx="' + (x + f[0]) + '" cy="40" r="' + f[0] + '" fill="' + f[2] + '" stroke="#6b6b75" stroke-width="2"/>' + txt(x + f[0], 46, f[1], { size: f[0] > 24 ? 15 : 12, bold: true }); x += f[0] * 2 + 8; });
    return svg(Math.max(x, 40), 80, b, "coins", "pic-coins");
  };
  /* Unknown helper names return "" (with a console warning) so a content file never crashes. */
  K3.pic = (typeof Proxy === "function") ? new Proxy(pic, { get: function (o, k) { if (k in o) return o[k]; if (typeof k === "string") { return function () { console.warn("K3.pic." + k + " is not a helper"); return ""; }; } return undefined; } }) : pic;
  /* =====================================================================
     ELVIS THE EAGLE (Alpine Vista mascot, drawn for this site)
     K3.elvis({ size: 120, cls: "" }) returns an SVG string.
     ===================================================================== */
  K3.elvis = function (o) {
    o = o || {}; var w = o.size || 120;
    return '<svg class="elvis ' + (o.cls || "") + '" width="' + w + '" viewBox="0 0 240 262" role="img" aria-label="Elvis the Eagle">' +
      /* tail */ '<path d="M168 214q38 6 52 30-24-4-40-12 10 16 8 28-18-14-34-30z" fill="#fff" stroke="#121015" stroke-width="5" stroke-linejoin="round"/>' +
      /* feet */ '<g fill="#f59e2b" stroke="#121015" stroke-width="4.5" stroke-linejoin="round"><path d="M84 222h26l4 18H80z"/><path d="M130 222h26l4 18h-34z"/></g>' +
      '<g fill="#fff" stroke="#121015" stroke-width="3"><path d="M78 240l-6 10 12-4z"/><path d="M92 241l-2 11 9-8z"/><path d="M106 240l4 10 3-11z"/><path d="M124 240l-6 10 12-4z"/><path d="M138 241l-2 11 9-8z"/><path d="M152 240l4 10 3-11z"/></g>' +
      /* body */ '<ellipse cx="120" cy="178" rx="64" ry="56" fill="#1d1a22" stroke="#121015" stroke-width="5"/>' +
      /* shirt */ '<path d="M66 162q54-22 108 0l6 34q-60 30-120 0z" fill="#7b3fc4" stroke="#121015" stroke-width="4.5" stroke-linejoin="round"/>' +
      '<text x="120" y="196" text-anchor="middle" font-family="Fredoka, Arial Rounded MT Bold, Arial, sans-serif" font-weight="700" font-size="30" fill="#ffc53d" stroke="#121015" stroke-width="1.5">AV</text>' +
      /* book in right wing */ '<g transform="rotate(12 188 160)"><rect x="166" y="128" width="46" height="58" rx="5" fill="#fff" stroke="#121015" stroke-width="4.5"/><rect x="170" y="128" width="42" height="58" rx="4" fill="#5b2a86" stroke="#121015" stroke-width="4.5"/><path d="M191 144l4.5 9 10 1.5-7.2 7 1.7 10-9-4.7-9 4.7 1.7-10-7.2-7 10-1.5z" fill="#ffc53d" stroke="#121015" stroke-width="2.5" stroke-linejoin="round"/></g>' +
      '<path d="M170 168q20-8 26 6 4 14-14 16-18-2-18-12z" fill="#1d1a22" stroke="#121015" stroke-width="4.5" stroke-linejoin="round"/>' +
      /* thumbs-up wing */ '<g class="elvis-thumb"><path d="M70 170q-26 8-40 -6" fill="none" stroke="#121015" stroke-width="20" stroke-linecap="round"/><path d="M70 170q-26 8-40 -6" fill="none" stroke="#1d1a22" stroke-width="12" stroke-linecap="round"/>' +
      '<rect x="20" y="124" width="15" height="28" rx="7.5" fill="#2a2630" stroke="#121015" stroke-width="4.5" transform="rotate(-14 27 138)"/><rect x="12" y="140" width="40" height="34" rx="14" fill="#2a2630" stroke="#121015" stroke-width="4.5"/><path d="M18 150h26M18 158h26M18 166h24" stroke="#121015" stroke-width="3" stroke-linecap="round"/></g>' +
      /* head */ '<path d="M120 26q12-20 22 -2q14-12 16 8 50 14 52 66 0 30-22 46l10 10-18-2 4 12-16-8q-20 8-48 8t-48-8l-16 8 4-12-18 2 10-10q-22-16-22-46 2-52 52-66 2-20 16-8 10-18 22 2z" fill="#fff" stroke="#121015" stroke-width="5" stroke-linejoin="round"/>' +
      /* eyes */ '<g><ellipse cx="94" cy="88" rx="19" ry="23" fill="#fff" stroke="#121015" stroke-width="4"/><ellipse cx="146" cy="88" rx="19" ry="23" fill="#fff" stroke="#121015" stroke-width="4"/>' +
      '<circle cx="98" cy="92" r="13" fill="#3b82d6"/><circle cx="142" cy="92" r="13" fill="#3b82d6"/><circle cx="99" cy="94" r="7.5" fill="#121015"/><circle cx="141" cy="94" r="7.5" fill="#121015"/>' +
      '<circle cx="103" cy="87" r="4.5" fill="#fff"/><circle cx="146" cy="87" r="4.5" fill="#fff"/><circle cx="95" cy="98" r="2" fill="#fff"/><circle cx="138" cy="98" r="2" fill="#fff"/></g>' +
      '<path d="M74 60q16-10 32-2M134 58q16-8 32 2" stroke="#121015" stroke-width="5" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="72" cy="114" rx="9" ry="6" fill="#ff9ec4" opacity=".85"/><ellipse cx="168" cy="114" rx="9" ry="6" fill="#ff9ec4" opacity=".85"/>' +
      /* beak: open smile with a hooked tip */ '<path d="M100 130q20 26 40 0q-2 20-20 22-18-2-20-22z" fill="#e8577e" stroke="#121015" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="M90 118q30-18 60 0 6 12-6 16-12 4-14 4l-10 14-10-14q-2 0-14-4-12-4-6-16z" fill="#ffb02e" stroke="#121015" stroke-width="4.5" stroke-linejoin="round"/>' +
      '<path d="M98 121q22-10 44 0" stroke="#ffd98a" stroke-width="5" fill="none" stroke-linecap="round"/>' +
      '<path d="M116 116q4 3 8 0" stroke="#121015" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      "</svg>";
  };

  /* =====================================================================
     DATA: local history (localStorage "k3data"), sheet data, sending
     ===================================================================== */
  function localData() { var d = store.get("k3data", null); if (!d || typeof d !== "object") d = {}; d.scores = Array.isArray(d.scores) ? d.scores : []; d.fluency = Array.isArray(d.fluency) ? d.fluency : []; d.outbox = Array.isArray(d.outbox) ? d.outbox : []; return d; }
  function saveLocal(d) { return store.set("k3data", d); }
  K3.localData = localData;

  function truthy(v) { return v === true || /^(true|yes|1|y|mastered)$/i.test(String(v == null ? "" : v).trim()); }
  function pickKey(o, names) { for (var i = 0; i < names.length; i++) { var n = names[i]; if (o[n] != null && o[n] !== "") return o[n]; } var keys = Object.keys(o); for (var j = 0; j < names.length; j++) for (var k = 0; k < keys.length; k++) if (keys[k].toLowerCase().replace(/[^a-z]/g, "") === names[j].toLowerCase().replace(/[^a-z]/g, "")) { var v = o[keys[k]]; if (v != null && v !== "") return v; } return ""; }
  function normScore(o, src) {
    if (!o) return null; var st = o.student && typeof o.student === "object" ? o.student : null;
    var r = {
      name: String(st ? st.name : pickKey(o, ["student", "name"])), num: String(st ? st.num : pickKey(o, ["num", "number"])).replace(/^'/, ""),
      subject: String(pickKey(o, ["subject"]) || "").toLowerCase(), unit: String(pickKey(o, ["unit"])), standard: String(pickKey(o, ["standard"])),
      activity: String(pickKey(o, ["activity", "id"])), title: String(pickKey(o, ["title"])), score: +pickKey(o, ["score"]) || 0, total: +pickKey(o, ["total"]) || 0,
      percent: +pickKey(o, ["percent"]) || 0, mastered: truthy(pickKey(o, ["mastered"])), mins: +pickKey(o, ["mins"]) || 0, time: String(pickKey(o, ["time", "date"])), src: src
    };
    var res = o.results; if (typeof res === "string") { try { res = JSON.parse(res); } catch (e) { res = res.split(/[ ,]+/).map(Number); } } r.results = Array.isArray(res) ? res : [];
    if (!r.percent && r.total) r.percent = Math.round(100 * r.score / r.total);
    return r;
  }
  function normFlu(o, src) {
    if (!o) return null; var st = o.student && typeof o.student === "object" ? o.student : null;
    return { name: String(st ? st.name : pickKey(o, ["student", "name"])), num: String(st ? st.num : pickKey(o, ["num", "number"])).replace(/^'/, ""), type: String(pickKey(o, ["type"]) || "").toLowerCase(), set: String(pickKey(o, ["set"])), correct: +pickKey(o, ["correct"]) || 0, errors: +pickKey(o, ["errors"]) || 0, seconds: +pickKey(o, ["seconds"]) || 60, rate: +pickKey(o, ["rate"]) || 0, time: String(pickKey(o, ["time", "date"])), src: src };
  }
  function rowKey(r) { var t = Date.parse(r.time); return [r.num, r.activity || r.type, r.set || "", isNaN(t) ? r.time : Math.round(t / 1000)].join("|"); }

  K3.sheet = store.get("k3sheet", null);
  K3.demo = null;
  K3.rows = function (kind, num) {
    var out = [], seen = {}, d = localData(), norm = kind === "fluency" ? normFlu : normScore;
    function addAll(list, src) { (list || []).forEach(function (o) { var r = norm(o, src); if (!r) return; if (num != null && r.num !== String(num)) return; var k = rowKey(r); if (seen[k]) return; seen[k] = 1; out.push(r); }); }
    if (K3.demo) addAll(K3.demo[kind], "demo");
    if (K3.sheet) addAll(K3.sheet[kind], "sheet");
    addAll(d[kind], "local");
    out.sort(function (a, b) { return (Date.parse(a.time) || 0) - (Date.parse(b.time) || 0); });
    return out;
  };
  K3.normScore = normScore; K3.normFlu = normFlu;

  /* best percent per standard / activity for one student (or all rows given) */
  K3.bestByStandard = function (rows) { var m = {}; rows.forEach(function (r) { if (!r.standard || r.standard === "MIXED") return; m[r.standard] = Math.max(m[r.standard] == null ? -1 : m[r.standard], r.percent); }); return m; };
  K3.bestByActivity = function (rows) { var m = {}; rows.forEach(function (r) { var a = m[r.activity] || (m[r.activity] = { best: -1, mastered: false, tries: 0, last: "" }); a.best = Math.max(a.best, r.percent); a.mastered = a.mastered || r.mastered || (K3.byId[r.activity] && r.percent >= K3.byId[r.activity].pass); a.tries++; a.last = r.time; }); return m; };
  K3.passFor = function (std) { var a = K3.acts.filter(function (x) { return x.standard === std; })[0]; return a ? a.pass : 80; };

  /* ---------- who is signed in ---------- */
  K3.student = function () { var s = store.get("k3student", null); return s && s.num ? s : null; };
  K3.setStudent = function (s) { if (s) store.set("k3student", { name: s.name, num: String(s.num) }); else store.del("k3student"); };
  K3.isTeacher = function () { return store.sget("k3teacher") === "1"; };
  K3.setTeacher = function (on) { if (on) store.sset("k3teacher", "1"); else store.sdel("k3teacher"); };
  K3.roster = function () {
    var list = CFG.students.map(function (s) { return { name: String(s.name), num: String(s.num) }; }), have = {};
    list.forEach(function (s) { have[s.num] = 1; });
    K3.rows("scores").concat(K3.rows("fluency")).forEach(function (r) { if (r.num && !have[r.num]) { have[r.num] = 1; list.push({ name: r.name || ("#" + r.num), num: r.num, extra: true }); } });
    return list;
  };

  /* ---------- sending to the Google Sheet ---------- */
  function post(obj) {
    if (!CFG.scriptUrl) return Promise.resolve("preview");
    if (!window.fetch) return Promise.resolve("queued");
    return fetch(CFG.scriptUrl, { method: "POST", body: JSON.stringify(obj) })
      .then(function (r) { return r.ok ? r.text().then(function () { return "sent"; }) : Promise.reject(new Error("HTTP " + r.status)); })
      .catch(function (e) {
        // Some school networks block reading the reply (CORS); retry blind so the row still lands. The sheet ignores duplicate uids.
        return fetch(CFG.scriptUrl, { method: "POST", mode: "no-cors", body: JSON.stringify(obj) }).then(function () { return "sent"; }).catch(function () { return "queued"; });
      });
  }
  K3.send = function (kind, obj) {
    obj.uid = obj.uid || uid();
    var d = localData(); d[kind].push(obj); if (d[kind].length > 3000) d[kind] = d[kind].slice(-3000); saveLocal(d);
    return post(obj).then(function (st) {
      if (st === "queued") { var d2 = localData(); d2.outbox.push(obj); saveLocal(d2); }
      return st;
    });
  };
  K3.flush = function () {
    if (!CFG.scriptUrl) return; var d = localData(); if (!d.outbox.length) return; var box = d.outbox.slice(); d.outbox = []; saveLocal(d);
    box.reduce(function (p, obj) { return p.then(function () { return post(obj).then(function (st) { if (st === "queued") { var d2 = localData(); d2.outbox.push(obj); saveLocal(d2); } }); }); }, Promise.resolve());
  };
  window.addEventListener("online", function () { K3.flush(); });

  K3.fetchSheet = function (key) {
    if (!CFG.scriptUrl) return Promise.reject(new Error("No scriptUrl in k3-config.js yet."));
    var u = CFG.scriptUrl + (CFG.scriptUrl.indexOf("?") >= 0 ? "&" : "?") + "action=data&key=" + encodeURIComponent(key || CFG.teacherPasscode) + "&t=" + Date.now();
    return fetch(u).then(function (r) { return r.json(); }).then(function (j) {
      if (!j || !j.ok) throw new Error((j && j.error) || "The sheet said no. Check the PASSCODE in Code.gs.");
      K3.sheet = { at: new Date().toISOString(), scores: j.scores || [], fluency: j.fluency || [] }; store.set("k3sheet", K3.sheet); return K3.sheet;
    });
  };
  function sendStatusText(st) { return st === "sent" ? "✅ Sent to " + esc(CFG.teacher) + "!" : st === "preview" ? "💾 Saved on this device (preview mode)." : "📮 Saved. It will send when the internet is back."; }
  K3.sendStatusText = sendStatusText;

  /* =====================================================================
     CHARTS: inline SVG, no libraries
     Colors: student series = deep purple, second series = teal,
     goal = dark gold dashed, benchmarks = gray dashed. Text stays ink.
     ===================================================================== */
  var CH = { s1: "#5b2a86", s2: "#0f7b74", goal: "#b07800", ref: "#6d6577", grid: "#e6def2", axis: "#4a4453", text: "#2a2430", muted: "#5f5869" };
  K3.chartColors = CH;
  function niceMax(v) { if (v <= 0) return 10; var p = Math.pow(10, Math.floor(Math.log10(v))), n = v / p; return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p; }
  K3.lineChart = function (o) {
    var narrow = (window.innerWidth || 1000) < 600, W = o.w || (narrow ? 380 : 640), H = o.h || (narrow ? 260 : 300), L = 48, R = narrow ? 86 : 110, T = o.title ? 40 : 18, B = 46, pw = W - L - R, ph = H - T - B;
    var series = (o.series || []).filter(function (s) { return s.points && s.points.length; }), refs = o.refs || [];
    var n = Math.max.apply(null, [1].concat(series.map(function (s) { return s.points.length; })));
    var maxY = Math.max.apply(null, [o.minMax || 10].concat(refs.map(function (r) { return r.y; })).concat(series.map(function (s) { return Math.max.apply(null, s.points.map(function (p) { return p.y; })); })));
    var raw = maxY * 1.06, p10 = Math.pow(10, Math.floor(Math.log10(raw / 4 || 1))), step = [1, 2, 5, 10].map(function (k) { return k * p10; }).filter(function (v) { return v >= raw / 4; })[0] || 10 * p10, nLines = Math.max(1, Math.ceil(raw / step)); maxY = step * nLines;
    function X(i) { return L + (n <= 1 ? pw / 2 : pw * i / (n - 1)); }
    function Y(v) { return T + ph - ph * v / maxY; }
    var b = "";
    if (o.title) b += '<text x="' + L + '" y="24" font-size="17" font-weight="800" fill="' + CH.text + '">' + esc(o.title) + "</text>";
    for (var g = 0; g <= nLines; g++) { var gv = step * g, gy = Y(gv); b += '<line x1="' + L + '" x2="' + (L + pw) + '" y1="' + gy + '" y2="' + gy + '" stroke="' + CH.grid + '" stroke-width="1"/><text x="' + (L - 8) + '" y="' + (gy + 4) + '" font-size="12" text-anchor="end" fill="' + CH.muted + '">' + round(gv, 0) + "</text>"; }
    b += '<line x1="' + L + '" x2="' + (L + pw) + '" y1="' + (T + ph) + '" y2="' + (T + ph) + '" stroke="' + CH.axis + '" stroke-width="1.5"/>';
    if (o.yLabel) b += '<text x="14" y="' + (T + ph / 2) + '" font-size="12" fill="' + CH.muted + '" text-anchor="middle" transform="rotate(-90 14 ' + (T + ph / 2) + ')">' + esc(o.yLabel) + "</text>";
    var ly = refs.map(function (r) { return Y(r.y) + 4; }), ord = refs.map(function (r, i) { return i; }).sort(function (a, c) { return ly[a] - ly[c]; });
    for (var oi = 1; oi < ord.length; oi++) if (ly[ord[oi]] - ly[ord[oi - 1]] < 15) ly[ord[oi]] = ly[ord[oi - 1]] + 15;
    refs.forEach(function (r, i) { var y = Y(r.y); b += '<line x1="' + L + '" x2="' + (L + pw) + '" y1="' + y + '" y2="' + y + '" stroke="' + (r.color || CH.ref) + '" stroke-width="2" stroke-dasharray="7 5"/><text x="' + (L + pw + 6) + '" y="' + ly[i] + '" font-size="12" font-weight="700" fill="' + CH.text + '">' + esc(r.label + " " + r.y) + "</text>"; });
    var labels = (series[0] || { points: [] }).points.map(function (p) { return p.x; }), every = Math.ceil(n / 8);
    labels.forEach(function (lb, i) { if (i % every === 0 || i === n - 1) b += '<text x="' + X(i) + '" y="' + (T + ph + 20) + '" font-size="12" text-anchor="middle" fill="' + CH.muted + '">' + esc(lb) + "</text>"; });
    if (o.xLabel) b += '<text x="' + (L + pw / 2) + '" y="' + (H - 6) + '" font-size="12" text-anchor="middle" fill="' + CH.muted + '">' + esc(o.xLabel) + "</text>";
    series.forEach(function (s, si) {
      var col = s.color || (si ? CH.s2 : CH.s1), d = s.points.map(function (p, i) { return (i ? "L" : "M") + round(X(i), 1) + "," + round(Y(p.y), 1); }).join("");
      b += '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>';
      s.points.forEach(function (p, i) { b += '<g class="pt"><circle cx="' + X(i) + '" cy="' + Y(p.y) + '" r="14" fill="transparent"/><circle cx="' + X(i) + '" cy="' + Y(p.y) + '" r="5.5" fill="' + col + '" stroke="#fff" stroke-width="2"/><title>' + esc((s.name ? s.name + ": " : "") + p.y + (o.unit ? " " + o.unit : "") + (p.x ? " on " + p.x : "") + (p.t ? " (" + p.t + ")" : "")) + "</title></g>"; });
      var lp = s.points[s.points.length - 1]; b += '<text x="' + (X(s.points.length - 1) + 10) + '" y="' + (Y(lp.y) - 10) + '" font-size="14" font-weight="800" fill="' + CH.text + '">' + esc(lp.y) + "</text>";
    });
    if (!series.length) b += '<text x="' + (L + pw / 2) + '" y="' + (T + 22) + '" font-size="14" text-anchor="middle" fill="' + CH.muted + '">' + esc(o.empty || "No data yet") + "</text>";
    var legend = series.length > 1 ? '<div class="legend">' + series.map(function (s, si) { return '<span><i style="background:' + (s.color || (si ? CH.s2 : CH.s1)) + '"></i>' + esc(s.name) + "</span>"; }).join("") + "</div>" : "";
    return '<figure class="chart"><svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(o.label || o.title || "line chart") + '" preserveAspectRatio="xMidYMid meet">' + b + "</svg>" + legend + "</figure>";
  };
  K3.spark = function (vals, w, h) {
    w = w || 110; h = h || 30; if (!vals || !vals.length) return '<span class="muted">-</span>'; var mx = Math.max.apply(null, vals.concat([1])), mn = Math.min.apply(null, vals.concat([0]));
    var d = vals.map(function (v, i) { return (i ? "L" : "M") + round(4 + (w - 8) * (vals.length < 2 ? 0.5 : i / (vals.length - 1)), 1) + "," + round(h - 4 - (h - 8) * (v - mn) / ((mx - mn) || 1), 1); }).join("");
    return '<svg class="spark" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="trend: ' + esc(vals.join(", ")) + '"><path d="' + d + '" fill="none" stroke="' + CH.s1 + '" stroke-width="2" stroke-linecap="round"/></svg>';
  };
  K3.barList = function (items, max, unit) {
    max = max || Math.max.apply(null, items.map(function (i) { return i.v; }).concat([1]));
    return '<div class="barlist">' + items.map(function (it) { return '<div class="bl-row"><div class="bl-lab">' + it.label + '</div><div class="bl-track" title="' + esc(strip(it.label) + ": " + it.v + (unit || "")) + '"><div class="bl-bar ' + (it.cls || "") + '" style="width:' + clamp(100 * it.v / max, 1, 100) + '%"></div></div><div class="bl-val">' + it.v + (unit || "") + "</div></div>"; }).join("") + "</div>";
  };
  function heatClass(p, pass) { if (p == null || p < 0) return "h-none"; if (p >= pass) return "h-m"; if (p >= 60) return "h-p"; if (p >= 40) return "h-l"; return "h-x"; }
  K3.heatClass = heatClass;

  /* =====================================================================
     APP SHELL + ROUTER
     ===================================================================== */
  var app, cleanups = [];
  K3.onLeave = function (fn) { cleanups.push(fn); };
  function toast(msg, ms) { var t = $("#k3-toast"); if (!t) return; t.innerHTML = msg; t.classList.add("show"); clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("show"); }, ms || 2600); }
  K3.toast = toast;
  K3.go = function (h) { if (location.hash === h) route(); else location.hash = h; };

  function bunting() { var t = String(CFG.bunting || (CFG.teacher || "").replace(/\s+/g, " ")).toUpperCase(); return '<div class="bunting" aria-hidden="true">' + t.split("").map(function (c) { return c === " " ? '<span class="flag gap"></span>' : '<span class="flag">' + (c === "." ? "★" : esc(c)) + "</span>"; }).join("") + "</div>"; }
  function header(route) {
    var s = K3.student(), t = K3.isTeacher(), home = route === "home", first = s ? String(s.name).split(" ")[0] : "";
    var who = s ? '<div class="who"><span class="chip-me" aria-label="Signed in as ' + esc(s.name) + '"><span class="av" aria-hidden="true" style="background:' + avColor(s.num) + '">' + esc(initials(s.name)) + "</span><span class=\"chip-name\">" + esc(s.name) + '</span></span><button type="button" class="btn btn-gold sm" data-act="notme">👋 Not you?</button></div>' : "";
    if (t) who = '<div class="who"><a class="chip-me teach" href="#/teacher" aria-label="Teacher area">🍎<span class="chip-name"> Teacher</span></a><button type="button" class="btn btn-gold sm" data-act="teacherout">Sign out</button></div>';
    var bubble = "", note = "";
    if (home && s) { var st = streak(s.num), bba = K3.bestByActivity(K3.rows("scores", s.num)), m = Object.keys(bba).filter(function (k) { return bba[k].mastered; }).length;
      var msg = greetLine(first);
      bubble = '<p class="bubble">' + esc(msg) + " " + sayBtn(msg, "Read the greeting") + '</p><p class="hstats"><span>🔥 <b>' + st + "</b> day streak</span><span>⭐ <b>" + m + "</b> mastered</span></p>"; }
    if (home && CFG.announcements.length) note = '<div class="sticky" role="note">📌 ' + CFG.announcements[0] + " " + sayBtn(strip(CFG.announcements[0]), "Read the note") + "</div>";
    return bunting() + '<div class="bar-in"><span class="tape l" aria-hidden="true"></span><span class="tape r" aria-hidden="true"></span>' +
      '<a href="#/" class="brand" aria-label="Home: ' + esc(CFG.className) + '">' + K3.elvis({ size: home ? 118 : 74, cls: "bob" }) + '</a>' +
      '<div class="brand-t"><a href="#/" class="ttl">' + esc(CFG.className).replace(/(\d+(st|nd|rd|th) Grade)/, "<u>$1</u>") + '</a><small>' + esc(CFG.school) + " Eagles · Readers, Writers &amp; Thinkers</small>" + bubble + "</div>" + note + who + "</div>";
  }
  var GREETS = ["Hi, {n}! Let’s soar today! 🦅", "Welcome back, {n}! You’ve got this! 💪", "Hi, {n}! Ready to learn something new? 🌟", "Hello, {n}! Eagles never give up! 🦅", "Hi, {n}! Let’s fly high today! ✨"];
  function greetLine(n) { return GREETS[hashStr(today() + n) % GREETS.length].replace("{n}", n); }
  function initials(n) { var p = String(n || "?").trim().split(/\s+/); return ((p[0] || "?")[0] + (p.length > 1 ? (/^\d+$/.test(p[1]) ? p[1] : p[1][0]) : "")).toUpperCase().slice(0, 3); }
  var AV = ["#5b2a86", "#8a4fd8", "#121015", "#7a3fb8", "#3e1d5c", "#9b5de5", "#6a2c91", "#2d1b3d"];
  function avColor(num) { return AV[hashStr(num) % AV.length]; }
  K3.initials = initials; K3.avColor = avColor;

  var routes = {};
  K3.route = function (name, fn) { routes[name] = fn; };
  function route() {
    while (cleanups.length) { try { cleanups.pop()(); } catch (e) {} }
    try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {}
    $$(".confetti").forEach(function (c) { c.remove(); });
    var h = (location.hash || "#/").replace(/^#\/?/, ""), parts = h.split("/").map(function (p) { try { return decodeURIComponent(p); } catch (e) { return p; } });
    var name = parts[0] || "home";
    if (!K3.student() && !K3.isTeacher() && name !== "signin" && name !== "teacher") { K3._after = location.hash && !/signin/.test(location.hash) ? location.hash : null; name = "signin"; parts = ["signin"]; }
    var fn = routes[name] || routes.home;
    var hd = $("#k3-header"); if (hd) { hd.innerHTML = header(name); hd.className = "topbar nb-head" + (name === "home" ? " is-home" : "") + (name === "signin" ? " is-signin" : ""); }
    document.body.setAttribute("data-route", name);
    app.className = "view view-" + name;
    try { fn.apply(null, parts.slice(1)); } catch (e) { console.error(e); app.innerHTML = '<div class="card center"><h2>Oops! 🙈</h2><p>Something went wrong on this page.</p><a class="btn" href="#/">🏠 Go home</a></div>'; }
    window.scrollTo(0, 0);
    var h1 = app.querySelector("h1"); if (h1 && document.activeElement && document.activeElement !== document.body && !app.contains(document.activeElement)) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); }
  }
  K3.render = route;

  /* global click helpers: 🔊 buttons and header actions */
  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("[data-say]") : null;
    if (b) { e.preventDefault(); e.stopPropagation(); K3.say(b.getAttribute("data-say"), b); return; }
    var a = e.target.closest ? e.target.closest("[data-act]") : null; if (!a) return;
    var act = a.getAttribute("data-act");
    if (act === "notme") { K3.setStudent(null); toast("👋 Bye! Type your name to sign in."); K3.go("#/signin"); }
    if (act === "teacherout") { K3.setTeacher(false); toast("Signed out of the teacher area."); K3.go("#/"); }
    if (act === "print") { window.print(); }
  }, true);

  function crumbs(list) { return '<nav class="crumbs" aria-label="Breadcrumb">' + list.map(function (c, i) { return i < list.length - 1 ? '<a href="' + c[1] + '">' + c[0] + "</a><span aria-hidden=\"true\">›</span>" : '<span aria-current="page">' + c[0] + "</span>"; }).join("") + "</nav>"; }
  K3.crumbs = crumbs;
  function needStudent(after) { if (K3.student()) return false; K3._after = after || location.hash; app.innerHTML = '<div class="card center pop"><div class="big-emoji" aria-hidden="true">👋</div><h1>Sign in first!</h1><p class="lead">Type your name so your stars are saved.</p><a class="btn btn-xl" href="#/signin">👋 Sign in</a> <a class="btn btn-ghost" href="#/">🏠 Home</a></div>'; return true; }
  K3.needStudent = needStudent;

  /* =====================================================================
     HOME
     ===================================================================== */
  function greeting() { var h = new Date().getHours(); return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"; }
  function streak(num) { var days = {}; K3.rows("scores", num).concat(K3.rows("fluency", num)).forEach(function (r) { var k = dayKey(r.time); if (k) days[k] = 1; }); var n = 0, d = new Date(); if (!days[dayKey(d)]) d.setDate(d.getDate() - 1); for (var guard = 0; guard < 400; guard++) { var k = dayKey(d), wd = d.getDay(); if (days[k]) n++; else if (wd !== 0 && wd !== 6) break; d.setDate(d.getDate() - 1); } return n; }
  K3.streak = streak;

  function problemOfDay() {
    var pool = []; K3.acts.forEach(function (a) { if (a.subject !== "math" || a.passage) return; a.qs.forEach(function (q) { if (q.t === "mc" || q.t === "tf" || q.t === "num") pool.push({ a: a, q: q }); }); });
    if (!pool.length) return null; return pool[hashStr("pod" + today()) % pool.length];
  }
  function wordOfDay() {
    var pool = []; K3.acts.forEach(function (a) { if (a.subject === "math") return; a.learn.forEach(function (c) { var html = String(c.html || ""), re = /<b>([^<]{3,24})<\/b>/gi, m; var sentences = (strip(html).match(/[^.!?]+[.!?]*/g) || []).map(function (x) { return x.trim(); }); while ((m = re.exec(html))) { var w = m[1].trim(); var sen = sentences.filter(function (s) { return s.toLowerCase().indexOf(w.toLowerCase()) >= 0; })[0]; if (sen && words(w).length <= 3) pool.push({ w: w, s: sen, a: a }); } }); });
    var vocab = pool.filter(function (x) { return /^[a-z]/.test(x.w); }); if (vocab.length) pool = vocab;
    if (!pool.length) return null; return pool[hashStr("wod" + today()) % pool.length];
  }

  K3.route("home", function () {
    var s = K3.student(), counts = {}; SUBJECTS.forEach(function (x) { counts[x.id] = K3.ofSubject(x.id).length; });
    var tiles = SUBJECTS.map(function (x) { return '<a class="tile subj subj-' + x.id + '" href="#/subject/' + x.id + '" style="--tint:' + x.tint + '"><span class="tile-ic" aria-hidden="true">' + x.emoji + '</span><span class="tile-name">' + x.name + (x.sub ? '<small>' + x.sub + "</small>" : "") + '</span><span class="tile-count">' + (counts[x.id] ? counts[x.id] + " activities" : "Coming soon") + "</span></a>"; }).join("");
    var more = '<a class="tile wide t-flu" href="#/fluency"><span class="tile-ic" aria-hidden="true">⚡</span><span class="tile-name">Daily Fluency<small>Fact sprint & reading</small></span></a>' +
      '<a class="tile wide t-goals" href="#/goals"><span class="tile-ic" aria-hidden="true">🎯</span><span class="tile-name">My Goals & Data<small>My stars and charts</small></span></a>' +
      '<a class="tile wide t-rev" href="#/review"><span class="tile-ic" aria-hidden="true">🔁</span><span class="tile-name">Daily Review<small>6 quick questions</small></span></a>';
    var pod = problemOfDay(), wod = wordOfDay(), days = "";
    if (pod) { var q = pod.q, opts = q.t === "mc" ? q.opts : q.t === "tf" ? ["👍 True", "👎 False"] : null;
      days += '<section class="card ofday pod"><h2><span aria-hidden="true">🧮</span> Problem of the Day ' + sayBtn(q.say || q.q, "Read the problem") + '</h2><div class="q-text">' + q.q + "</div>" + (q.pic ? '<div class="q-pic">' + q.pic + "</div>" : "") +
        (opts ? '<div class="pod-opts">' + opts.map(function (o, i) { return '<button type="button" class="opt sm" data-pod="' + i + '">' + o + "</button>"; }).join("") + "</div>" : '<button type="button" class="btn btn-ghost" data-pod="show">🤔 Show the answer</button>') + '<p class="pod-out" aria-live="polite"></p></section>'; }
    if (wod) days += '<section class="card ofday wod"><h2><span aria-hidden="true">💬</span> Word of the Day ' + sayBtn(wod.w + ". " + wod.s, "Read the word") + '</h2><p class="wod-w">' + esc(wod.w) + '</p><p class="wod-s">' + esc(wod.s) + '</p><p class="muted">From: ' + esc(wod.a.title) + "</p></section>";
    app.innerHTML = '<h2 class="sec-h sr">Pick a subject</h2><nav class="tiles" aria-label="Subjects">' + tiles + '</nav><nav class="tiles tiles-3" aria-label="Daily practice">' + more + "</nav>" + (days ? '<div class="ofday-row">' + days + "</div>" : "") +
      '<footer class="foot"><a class="teacher-link" href="#/teacher">🍎 Teacher</a><span>' + esc(CFG.className) + " · " + esc(CFG.school) + "</span></footer>";
    if (pod) $$("[data-pod]").forEach(function (b) { b.onclick = function () {
      var q = pod.q, v = b.getAttribute("data-pod"), out = $(".pod-out"), ok;
      if (v === "show") { out.innerHTML = "Answer: <b>" + esc(q.a) + (q.unit ? " " + esc(q.unit) : "") + "</b>. " + (q.why || ""); return; }
      ok = q.t === "mc" ? +v === q.a : (v === "0") === q.a; b.classList.add(ok ? "right" : "wrong");
      out.innerHTML = ok ? "🎉 Yes! " + (q.why || "") : "Not yet. Try again! 💪"; if (ok) $$("[data-pod]").forEach(function (x) { x.disabled = true; });
    }; });
  });

  /* =====================================================================
     SIGN IN (student: tap name, then type 3-digit class number)
     ===================================================================== */
  K3.route("signin", function () {
    var open = CFG.openSignIn, N = window.K3_NAME;
    app.innerHTML = '<div class="signin nb-signin pop"><div class="si-card"><div class="si-elvis">' + K3.elvis({ size: 190, cls: "bob" }) + '<p class="bubble big">Hi! I’m Elvis. What’s your name? ' + sayBtn("Hi! I'm Elvis the Eagle. Type your first name and your last name. Then press Let's go!", "Read") + '</p></div>' +
      '<form class="si-form" autocomplete="off" novalidate><h1>✏️ Sign in</h1>' +
      '<label>First name<input type="text" id="si-first" autocomplete="off" autocapitalize="words" spellcheck="false" placeholder="First name"></label>' +
      '<label>Last name<input type="text" id="si-last" autocomplete="off" autocapitalize="words" spellcheck="false" placeholder="Last name"></label>' +
      '<button type="submit" class="btn btn-gold btn-xl">🦅 Let’s go!</button><p class="si-msg" role="status" aria-live="polite"></p>' +
      (open ? '<p class="muted small">Teacher: add your class list in <code>k3-config.js</code> so names must match.</p>' : "") +
      '</form></div><p class="center"><a class="teacher-link" href="#/teacher">🍎 I am the teacher</a></p></div>';
    var f = $(".si-form"), fi = $("#si-first"), la = $("#si-last"), msg = $(".si-msg");
    setTimeout(function () { fi.focus(); }, 60);
    f.onsubmit = function (e) {
      e.preventDefault(); var a = fi.value.trim(), b = la.value.trim();
      if (!/[a-z]/i.test(a)) { msg.innerHTML = "✏️ Type your <b>first</b> name."; fi.focus(); return; }
      if (!/[a-z]/i.test(b)) { msg.innerHTML = "✏️ Type your <b>last</b> name."; la.focus(); return; }
      var full = N.nice(a) + " " + N.nice(b), s = null;
      if (!open) {
        var listed = CFG.students.filter(function (x) { return N.norm(x.name) === N.norm(full); })[0];
        if (listed) full = listed.name;
        if (!listed && !CFG.studentCodes[N.code(full)]) { msg.innerHTML = "🤔 Hmm, I can’t find <b>" + esc(full) + "</b>. Check your spelling, or ask " + esc(CFG.teacher) + " for help."; f.classList.add("shake"); setTimeout(function () { f.classList.remove("shake"); }, 450); K3.say("Hmm, I can't find that name. Check your spelling."); return; }
      }
      s = { name: full, num: N.id(full) };
      K3.setStudent(s); if (K3._afterSignIn) K3._afterSignIn(s);
      msg.innerHTML = "🎉 Welcome, " + esc(s.name.split(" ")[0]) + "!";
      var dest = K3._after && !/signin/.test(K3._after) ? K3._after : "#/"; K3._after = null;
      setTimeout(function () { K3.go(dest); toast("🎉 Hi, " + esc(s.name.split(" ")[0]) + "!"); }, 350);
    };
  });
  function keypad(extras, opts) {
    opts = opts || {}; var keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"].concat(extras ? [".", "0", "/"] : ["", "0", ""]);
    return '<div class="keypad' + (opts.cls ? " " + opts.cls : "") + '" role="group" aria-label="Number pad">' + keys.map(function (k) { return k ? '<button type="button" class="key" data-key="' + k + '" aria-label="' + (k === "/" ? "fraction bar" : k === "." ? "point" : k) + '">' + k + "</button>" : '<span class="key-blank"></span>'; }).join("") +
      '<button type="button" class="key key-back" data-key="back" aria-label="Erase">⌫</button>' + (opts.go ? '<button type="button" class="key key-go" data-key="go" aria-label="' + esc(opts.goLabel || "Check") + '">' + (opts.go) + "</button>" : "") + "</div>";
  }
  function bindKeypad(root, fn) { $$("[data-key]", root).forEach(function (b) { b.onclick = function () { fn(b.getAttribute("data-key")); }; }); }
  function keyHandler(fn) { var h = function (e) { if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return; fn(e.key, e); }; document.addEventListener("keydown", h); K3.onLeave(function () { document.removeEventListener("keydown", h); }); }
  K3.keypad = keypad; K3.bindKeypad = bindKeypad; K3.keyHandler = keyHandler;

  /* =====================================================================
     SUBJECT PAGE
     ===================================================================== */
  function statusOf(a, best) { var b = best[a.id]; if (!b) return { cls: "new", txt: "New", ic: "🆕" }; if (b.mastered || b.best >= a.pass) return { cls: "mastered", txt: "Mastered", ic: "⭐" }; return { cls: "done", txt: "Done", ic: "✅" }; }
  K3.statusOf = statusOf;
  K3.route("subject", function (sid) {
    var S = SUBJ[sid]; if (!S) { K3.go("#/"); return; }
    var acts = K3.ofSubject(sid), s = K3.student(), best = s ? K3.bestByActivity(K3.rows("scores", s.num)) : {};
    var units = [], byU = {}; acts.forEach(function (a) { if (!byU[a.unit]) { byU[a.unit] = []; units.push(a.unit); } byU[a.unit].push(a); });
    var nM = acts.filter(function (a) { return statusOf(a, best).cls === "mastered"; }).length;
    var head = crumbs([["🏠 Home", "#/"], [S.emoji + " " + S.name, ""]]) + '<header class="subj-head" style="--tint:' + S.tint + '"><span class="subj-ic" aria-hidden="true">' + S.emoji + "</span><div><h1>" + S.name + (S.sub ? " <small>(" + S.sub + ")</small>" : "") + " " + sayBtn(S.name + ". " + S.blurb, "Read") + "</h1><p>" + S.blurb + "</p>" +
      (acts.length ? '<div class="meter" role="progressbar" aria-valuemin="0" aria-valuemax="' + acts.length + '" aria-valuenow="' + nM + '" aria-label="Mastered"><span style="width:' + (100 * nM / acts.length) + '%"></span></div><p class="meter-t">⭐ ' + nM + " of " + acts.length + " mastered" + (s ? "" : " · <a href=\"#/signin\">Sign in</a> to save your stars") + "</p>" : "") + "</div></header>";
    if (!acts.length) { app.innerHTML = head + '<div class="card center pop"><div class="big-emoji" aria-hidden="true">🚧</div><h2>Coming soon!</h2><p class="lead">New activities are on the way.</p><a class="btn" href="#/">🏠 Home</a></div>'; return; }
    app.innerHTML = head + units.map(function (u) { return '<section class="unit"><h2 class="unit-h">' + esc(u) + '</h2><div class="acts">' + byU[u].map(function (a) { var st = statusOf(a, best); return '<a class="act-card st-' + st.cls + '" href="#/act/' + encodeURIComponent(a.id) + '"><span class="act-emoji" aria-hidden="true">' + esc(a.emoji) + '</span><span class="act-body"><span class="act-title">' + esc(a.title) + '</span><span class="act-skill">I can ' + esc(lowerFirst(a.skill)) + '</span><span class="act-meta"><span class="std">' + esc(a.standard) + "</span><span>⏱️ " + a.mins + " min</span>" + (best[a.id] ? "<span>Best " + best[a.id].best + "%</span>" : "") + '</span></span><span class="status st-' + st.cls + '"><span aria-hidden="true">' + st.ic + "</span> " + st.txt + "</span></a>"; }).join("") + "</div></section>"; }).join("");
  });
  function lowerFirst(s) { s = String(s || ""); s = s.replace(/^I can\s+/i, ""); return /^[A-Z][a-z]/.test(s) && !/^(I|I'm|English|Spanish|California|Tulare|American)\b/.test(s) ? s[0].toLowerCase() + s.slice(1) : s; }
  K3.lowerFirst = lowerFirst;

  /* =====================================================================
     QUESTION TYPES
     Each type: build(q, el, api) returns { check() -> {ok, hint}, reveal(), retry() }
     api.ready(bool) turns the Check button on/off.
     ===================================================================== */
  var CHEER = ["Great job!", "You got it!", "Super!", "Way to go!", "¡Muy bien!", "Awesome thinking!", "Yes! You are a star!", "¡Excelente!"];
  var MISS = ["Not yet. Try again!", "Almost! Give it one more try.", "Good try! Look again.", "Keep going! Try again."];
  function parseAns(s) { s = String(s).trim(); if (!s) return NaN; var m = s.match(/^(\d+)\s+(\d+)\/(\d+)$/); if (m) return +m[1] + (+m[2]) / (+m[3]); m = s.match(/^(-?\d*\.?\d+)\/(\d*\.?\d+)$/); if (m) return +m[2] ? +m[1] / +m[2] : NaN; return /^-?\d*\.?\d+$/.test(s) ? +s : NaN; }
  K3.parseAns = parseAns;
  function same(a, b) { return Math.abs(a - b) < 1e-6; }
  function optSay(html) { return strip(html) || "picture answer"; }

  var QT = {};
  QT.mc = function (q, el, api) {
    var order = (q.opts || []).map(function (o, i) { return i; }), picked = null, struck = {};
    el.innerHTML = '<div class="opts" role="group" aria-label="Answer choices">' + order.map(function (i) { return '<div class="opt-row"><button type="button" class="opt" data-i="' + i + '"><span class="opt-l" aria-hidden="true">' + "ABCD"[i] + "</span><span class=\"opt-t\">" + q.opts[i] + "</span></button>" + sayBtn(optSay(q.opts[i]), "Read answer " + "ABCD"[i]) + "</div>"; }).join("") + "</div>";
    $$(".opt", el).forEach(function (b) { b.onclick = function () { if (b.disabled) return; picked = +b.getAttribute("data-i"); $$(".opt", el).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); api.submit(); }; b.setAttribute("aria-pressed", "false"); });
    return {
      check: function () { var ok = picked === q.a; if (!ok) { struck[picked] = 1; var wrong = order.filter(function (i) { return i !== q.a && !struck[i]; }); var extra = wrong.length > 1 ? wrong[0] : null; if (extra != null) struck[extra] = 1; } return { ok: ok, hint: q.hint || (Object.keys(struck).length > 1 ? "I crossed out a wrong answer for you. Try again!" : "Read each answer again. Try again!") }; },
      retry: function () { $$(".opt", el).forEach(function (b) { var i = +b.getAttribute("data-i"); b.setAttribute("aria-pressed", "false"); if (struck[i]) { b.disabled = true; b.classList.add("struck"); } }); },
      lock: function (ok) { $$(".opt", el).forEach(function (b) { b.disabled = true; var i = +b.getAttribute("data-i"); if (i === q.a) b.classList.add("right"); else if (i === picked && !ok) b.classList.add("wrong"); }); },
      reveal: function () { this.lock(false); }
    };
  };
  QT.tf = function (q, el, api) {
    var picked = null, opts = [[true, "👍", "True"], [false, "👎", "False"]];
    el.innerHTML = '<div class="opts tf" role="group" aria-label="True or false">' + opts.map(function (o) { return '<div class="opt-row"><button type="button" class="opt tfb" data-v="' + o[0] + '" aria-pressed="false"><span class="tf-ic" aria-hidden="true">' + o[1] + "</span>" + o[2] + "</button>" + sayBtn(o[2], "Read " + o[2]) + "</div>"; }).join("") + "</div>";
    $$(".opt", el).forEach(function (b) { b.onclick = function () { if (b.disabled) return; picked = b.getAttribute("data-v") === "true"; $$(".opt", el).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); api.submit(); }; });
    return {
      check: function () { return { ok: picked === q.a, hint: q.hint || "Read it one more time, slowly. Is every part true?" }; },
      retry: function () { $$(".opt", el).forEach(function (b) { if ((b.getAttribute("data-v") === "true") === picked) { b.disabled = true; b.classList.add("struck"); } b.setAttribute("aria-pressed", "false"); }); },
      lock: function (ok) { $$(".opt", el).forEach(function (b) { b.disabled = true; var v = b.getAttribute("data-v") === "true"; if (v === q.a) b.classList.add("right"); else if (v === picked && !ok) b.classList.add("wrong"); }); },
      reveal: function () { this.lock(false); }
    };
  };
  QT.num = function (q, el, api) {
    var val = "";
    el.innerHTML = '<div class="num-wrap"><div class="num-show"><output class="num-box" aria-live="polite" aria-label="Your answer">&nbsp;</output>' + (q.unit ? '<span class="num-unit">' + esc(q.unit) + "</span>" : "") + "</div>" + keypad(true, { cls: "kp-num" }) + "</div>";
    function show() { var o = $(".num-box", el); o.innerHTML = val ? esc(val) : "&nbsp;"; api.ready(!isNaN(parseAns(val))); }
    function press(k) { if (api.locked()) return; if (k === "back") val = val.slice(0, -1); else if (val.length < 9) { var seg = val.split("/").pop(); if (k === "." && seg.indexOf(".") >= 0) return; if (k === "/" && (val.indexOf("/") >= 0 || !val || /\.$/.test(val))) return; val += k; } show(); }
    bindKeypad(el, press);
    api.keys(function (k, e) { if (/^[\d.\/]$/.test(k)) press(k); else if (k === "Backspace") press("back"); else if (k === "Enter" && !isNaN(parseAns(val))) { e.preventDefault(); api.submit(); } });
    show();
    return {
      check: function () { var v = parseAns(val), ok = same(v, q.a); return { ok: ok, hint: q.hint || (v > q.a ? "Your answer is too big. Check your work!" : "Your answer is too small. Check your work!") }; },
      retry: function () { val = ""; show(); },
      lock: function () { $$(".key", el).forEach(function (b) { b.disabled = true; }); },
      reveal: function () { this.lock(); $(".num-box", el).innerHTML = '<s class="muted">' + esc(val) + "</s> " + esc(fmtNum(q.a)); }
    };
  };
  QT.tap = function (q, el, api) {
    var sel = {}, ws = q.words || [];
    el.innerHTML = '<div class="tapwords" role="group" aria-label="Tap the words">' + ws.map(function (w, i) { return '<button type="button" class="tw" data-i="' + i + '" aria-pressed="false">' + esc(w) + "</button>"; }).join(" ") + '</div><p class="tap-count muted" aria-live="polite">Tap the words. Then press Check.</p>';
    function upd() { var n = Object.keys(sel).length; $(".tap-count", el).textContent = n ? "You tapped " + n + " word" + (n > 1 ? "s" : "") + "." : "Tap the words. Then press Check."; api.ready(n > 0); }
    $$(".tw", el).forEach(function (b) { b.onclick = function () { if (api.locked()) return; var i = b.getAttribute("data-i"); if (sel[i]) delete sel[i]; else sel[i] = 1; b.setAttribute("aria-pressed", sel[i] ? "true" : "false"); upd(); }; });
    upd();
    function ok() { var a = (q.a || []).map(String), k = Object.keys(sel); return k.length === a.length && a.every(function (x) { return sel[x]; }); }
    return {
      check: function () { var need = (q.a || []).length; return { ok: ok(), hint: q.hint || ("There " + (need === 1 ? "is 1 word" : "are " + need + " words") + " to tap. Try again!") }; },
      retry: function () {},
      lock: function () { $$(".tw", el).forEach(function (b) { b.disabled = true; var i = +b.getAttribute("data-i"), right = (q.a || []).indexOf(i) >= 0; if (right) b.classList.add("right"); else if (sel[i]) b.classList.add("wrong"); }); },
      reveal: function () { this.lock(); }
    };
  };
  QT.order = function (q, el, api) {
    var items = q.items || [], idx = items.map(function (x, i) { return i; }), tray = shuffle(idx), placed = [];
    if (tray.length > 1 && tray.every(function (v, i) { return v === i; })) tray.reverse();
    el.innerHTML = '<p class="how muted">Tap them in order: first to last.</p><ol class="slots" aria-label="Your order"></ol><div class="tray" role="group" aria-label="Pieces to put in order"></div>';
    function draw() {
      $(".slots", el).innerHTML = idx.map(function (x, k) { var it = placed[k]; return '<li class="slot' + (it != null ? " full" : "") + '"><span class="slot-n" aria-hidden="true">' + (k + 1) + "</span>" + (it != null ? '<button type="button" class="tile-b in-slot" data-p="' + k + '" aria-label="Number ' + (k + 1) + ": " + esc(strip(items[it])) + '. Tap to take it out.">' + items[it] + "</button>" + sayBtn(items[it], "Read") : '<span class="slot-empty">tap a card</span>') + "</li>"; }).join("");
      $(".tray", el).innerHTML = tray.length ? tray.map(function (it) { return '<span class="tray-i"><button type="button" class="tile-b" data-t="' + it + '">' + items[it] + "</button>" + sayBtn(items[it], "Read") + "</span>"; }).join("") : '<span class="muted">All placed! Tap one to take it out, or press Check.</span>';
      $$("[data-t]", el).forEach(function (b) { b.onclick = function () { if (api.locked()) return; var it = +b.getAttribute("data-t"); tray.splice(tray.indexOf(it), 1); placed.push(it); draw(); }; });
      $$("[data-p]", el).forEach(function (b) { b.onclick = function () { if (api.locked()) return; var k = +b.getAttribute("data-p"); if (locked0 && k === 0) return; tray.push(placed[k]); placed.splice(k, 1); draw(); }; });
      api.ready(placed.length === items.length);
    }
    var locked0 = false; draw();
    return {
      check: function () { var ok = placed.every(function (v, i) { return v === i; }); return { ok: ok, hint: q.hint || ("Here is a clue: the first one is “" + strip(items[0]) + ".”") }; },
      retry: function () { tray = shuffle(idx.filter(function (i) { return i !== 0; })); placed = [0]; locked0 = true; draw(); },
      lock: function () { $$("button.tile-b", el).forEach(function (b) { b.disabled = true; }); $$(".slot", el).forEach(function (s, k) { s.classList.add(placed[k] === k ? "right" : "wrong"); }); },
      reveal: function () { placed = idx.slice(); tray = []; draw(); $$("button.tile-b", el).forEach(function (b) { b.disabled = true; }); $$(".slot", el).forEach(function (s) { s.classList.add("ans"); }); }
    };
  };
  QT.sort = function (q, el, api) {
    var items = q.items || [], bins = q.bins || [], where = items.map(function () { return -1; }), sel = null, order = shuffle(items.map(function (x, i) { return i; }));
    el.innerHTML = '<p class="how muted">Tap a card. Then tap the box where it goes.</p><div class="tray sort-tray" role="group" aria-label="Cards to sort"></div><div class="bins"></div>';
    function draw() {
      var trayIts = order.filter(function (i) { return where[i] === -1; });
      $(".sort-tray", el).innerHTML = trayIts.length ? trayIts.map(function (i) { return '<span class="tray-i"><button type="button" class="tile-b card-s' + (sel === i ? " sel" : "") + '" data-c="' + i + '" aria-pressed="' + (sel === i) + '">' + items[i][0] + "</button>" + sayBtn(items[i][0], "Read") + "</span>"; }).join("") : '<span class="muted">All sorted! Press Check.</span>';
      $(".bins", el).innerHTML = bins.map(function (bn, b) { var inB = order.filter(function (i) { return where[i] === b; }); return '<div class="bin"><button type="button" class="bin-h" data-b="' + b + '"' + (sel == null ? ' aria-disabled="true"' : "") + ">" + bn + ' <span class="bin-add" aria-hidden="true">' + (sel != null ? "⬇️" : "") + "</span></button>" + sayBtn(bn, "Read") + '<div class="bin-items">' + inB.map(function (i) { return '<button type="button" class="tile-b sm" data-c="' + i + '" data-in="1" aria-label="' + esc(strip(items[i][0])) + ' in ' + esc(strip(bn)) + '. Tap to take it out.">' + items[i][0] + "</button>"; }).join("") + "</div></div>"; }).join("");
      $$("[data-c]", el).forEach(function (b) { b.onclick = function () { if (api.locked()) return; var i = +b.getAttribute("data-c"); if (b.getAttribute("data-in")) { where[i] = -1; sel = i; } else sel = sel === i ? null : i; draw(); }; });
      $$("[data-b]", el).forEach(function (b) { b.onclick = function () { if (api.locked() || sel == null) return; where[sel] = +b.getAttribute("data-b"); sel = null; draw(); }; });
      api.ready(where.every(function (w) { return w >= 0; }));
    }
    draw();
    return {
      check: function () { return { ok: where.every(function (w, i) { return w === items[i][1]; }), hint: q.hint || "I moved the wrong ones back. Try them again!" }; },
      retry: function () { where = where.map(function (w, i) { return w === items[i][1] ? w : -1; }); sel = null; draw(); },
      lock: function () { $$("button.tile-b, .bin-h", el).forEach(function (b) { b.disabled = true; }); $$(".bin-items .tile-b", el).forEach(function (b) { var i = +b.getAttribute("data-c"); b.classList.add(where[i] === items[i][1] ? "right" : "wrong"); }); },
      reveal: function () { where = items.map(function (x) { return x[1]; }); sel = null; draw(); $$("button.tile-b, .bin-h", el).forEach(function (b) { b.disabled = true; b.classList.add("ans"); }); }
    };
  };
  QT.build = function (q, el, api) {
    var ws = q.words || [], idx = ws.map(function (w, i) { return i; }), tray = shuffle(idx), line = [];
    if (tray.length > 1 && tray.every(function (v, i) { return v === i; })) tray.reverse();
    el.innerHTML = '<div class="sentence" aria-live="polite" aria-label="Your sentence"></div><div class="tray build-tray" role="group" aria-label="Word tiles"></div>';
    function draw() {
      $(".sentence", el).innerHTML = line.length ? line.map(function (i, k) { return '<button type="button" class="tile-b word" data-l="' + k + '" aria-label="' + esc(ws[i]) + '. Tap to take it out.">' + esc(ws[i]) + "</button>"; }).join("") : '<span class="muted">Tap the words to build the sentence.</span>';
      $(".build-tray", el).innerHTML = tray.map(function (i) { return '<button type="button" class="tile-b word" data-w="' + i + '">' + esc(ws[i]) + "</button>"; }).join("");
      $$("[data-w]", el).forEach(function (b) { b.onclick = function () { if (api.locked()) return; var i = +b.getAttribute("data-w"); tray.splice(tray.indexOf(i), 1); line.push(i); draw(); }; });
      $$("[data-l]", el).forEach(function (b) { b.onclick = function () { if (api.locked()) return; var k = +b.getAttribute("data-l"); if (keep0 && k === 0) return; tray.push(line[k]); line.splice(k, 1); draw(); }; });
      api.ready(line.length === ws.length);
    }
    var keep0 = false; draw();
    function sentence(arr) { return arr.map(function (i) { return ws[i]; }).join(" "); }
    return {
      check: function () { return { ok: sentence(line) === ws.join(" "), hint: q.hint || ("Here is a clue: the sentence starts with “" + ws[0] + ".”") }; },
      retry: function () { tray = shuffle(idx.filter(function (i) { return i !== 0; })); line = [0]; keep0 = true; draw(); },
      lock: function (ok) { $$("button.tile-b", el).forEach(function (b) { b.disabled = true; }); $(".sentence", el).classList.add(ok ? "right" : "wrong"); },
      reveal: function () { line = idx.slice(); tray = []; draw(); this.lock(true); $(".sentence", el).classList.add("ans"); }
    };
  };
  QT.shade = function (q, el, api) {
    var n = Math.max(1, q.parts | 0), on = {}, circle = q.shape === "circle", b = "";
    if (circle) { for (var i = 0; i < n; i++) b += '<path class="part" data-i="' + i + '" role="button" tabindex="0" aria-pressed="false" aria-label="part ' + (i + 1) + '" d="' + pieSlice(110, 110, 100, i * 2 * Math.PI / n, (i + 1) * 2 * Math.PI / n) + '"/>'; b = '<svg class="shade-svg circle" viewBox="0 0 220 220" role="group" aria-label="Tap parts to shade them">' + b + "</svg>"; }
    else { var W = 400 / n; for (var j = 0; j < n; j++) b += '<rect class="part" data-i="' + j + '" role="button" tabindex="0" aria-pressed="false" aria-label="part ' + (j + 1) + '" x="' + (6 + j * W) + '" y="6" width="' + W + '" height="100"/>'; b = '<svg class="shade-svg bar" viewBox="0 0 412 112" role="group" aria-label="Tap parts to shade them">' + b + "</svg>"; }
    el.innerHTML = '<div class="shade-wrap">' + b + '<p class="shade-count" aria-live="polite"></p></div>';
    function count() { return Object.keys(on).length; }
    function upd() { $$(".part", el).forEach(function (p) { var i = p.getAttribute("data-i"); p.classList.toggle("on", !!on[i]); p.setAttribute("aria-pressed", on[i] ? "true" : "false"); }); $(".shade-count", el).textContent = "Shaded: " + count() + " of " + n + " parts"; api.ready(true); }
    $$(".part", el).forEach(function (p) { function t() { if (api.locked()) return; var i = p.getAttribute("data-i"); if (on[i]) delete on[i]; else on[i] = 1; upd(); } p.addEventListener("click", t); p.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); t(); } }); });
    upd();
    return {
      check: function () { var c = count(); return { ok: c === q.a, hint: q.hint || (c > q.a ? "You shaded too many parts. Try again!" : "Shade more parts. Look at the top number of the fraction!") }; },
      retry: function () {},
      lock: function (ok) { $$(".part", el).forEach(function (p) { p.classList.add("locked"); }); $(".shade-wrap", el).classList.add(ok ? "right" : "wrong"); },
      reveal: function () { on = {}; for (var i = 0; i < q.a; i++) on[i] = 1; upd(); this.lock(true); }
    };
  };
  QT.numline = function (q, el, api) {
    var min = +q.min || 0, max = q.max == null ? 1 : +q.max, T = Math.max(1, q.ticks | 0), step = (max - min) / T, W = 600, x0 = 50, x1 = W - 50, y = 80, sel = null;
    var fracT = Math.abs(step - Math.round(step)) > 1e-9, ans = Math.round((q.a - min) / step);
    function X(k) { return x0 + (x1 - x0) * k / T; }
    function lab(k) { var v = min + k * step; if (!fracT) return fmtNum(v); if (Math.abs(v - Math.round(v)) < 1e-9) return String(Math.round(v)); return ""; }
    function draw() {
      var b = '<line x1="' + (x0 - 30) + '" y1="' + y + '" x2="' + (x1 + 30) + '" y2="' + y + '" class="nl-line"/>';
      b += '<path d="M' + (x0 - 40) + "," + y + "l12,-9v18z M" + (x1 + 40) + "," + y + 'l-12,-9v18z" class="nl-arrow"/>';
      for (var k = 0; k <= T; k++) { b += '<line x1="' + X(k) + '" y1="' + (y - 18) + '" x2="' + X(k) + '" y2="' + (y + 18) + '" class="nl-tick"/>'; var l = lab(k); if (l) b += '<text x="' + X(k) + '" y="' + (y + 50) + '" class="nl-lab" text-anchor="middle">' + l + "</text>"; }
      for (var h = 0; h <= T; h++) { var hw = (x1 - x0) / T; b += '<rect class="nl-hit" data-k="' + h + '" role="button" tabindex="0" aria-label="mark ' + (h + 1) + " of " + (T + 1) + '" aria-pressed="' + (sel === h) + '" x="' + (X(h) - hw / 2) + '" y="' + (y - 50) + '" width="' + hw + '" height="100"/>'; }
      if (sel != null) b += '<g class="nl-mark"><circle cx="' + X(sel) + '" cy="' + y + '" r="14"/><text x="' + X(sel) + '" y="' + (y - 28) + '" text-anchor="middle">' + esc(q.label || "?") + "</text></g>";
      $(".nl-svg", el).innerHTML = b;
      $$(".nl-hit", el).forEach(function (r) { function t() { if (api.locked()) return; sel = +r.getAttribute("data-k"); draw(); } r.addEventListener("click", t); r.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); t(); } }); });
      api.ready(sel != null);
    }
    el.innerHTML = '<p class="how muted">Tap the number line to put the point.</p><svg class="nl-svg" viewBox="0 0 ' + W + ' 150" role="group" aria-label="Number line from ' + min + " to " + max + '"></svg>';
    draw();
    return {
      check: function () { return { ok: sel === ans, hint: q.hint || (sel > ans ? "Too far right. Move left!" : "Too far left. Move right!") }; },
      retry: function () {},
      lock: function (ok) { $(".nl-svg", el).classList.add(ok ? "right" : "wrong", "locked"); },
      reveal: function () { sel = ans; draw(); $(".nl-svg", el).classList.add("right", "locked"); }
    };
  };
  QT.write = function (q, el, api) {
    var min = q.min || 0, checks = q.checks || [];
    el.innerHTML = (q.frames && q.frames.length ? '<div class="frames"><p class="muted">Tap a sentence starter:</p>' + q.frames.map(function (f, i) { return '<span class="tray-i"><button type="button" class="tile-b frame" data-f="' + i + '">' + esc(f) + "</button>" + sayBtn(f, "Read starter") + "</span>"; }).join("") + "</div>" : "") +
      '<label class="sr" for="k3-write">Your writing</label><textarea id="k3-write" class="write-box" rows="5" placeholder="Type here..." spellcheck="true"></textarea><div class="write-meta"><span class="wc" aria-live="polite"></span>' + sayBtn("", "Read my writing", "say-mine") + "</div>" +
      (checks.length ? '<ul class="checks" aria-label="Checklist">' + checks.map(function (c, i) { return '<li data-ck="' + i + '"><span class="ck" aria-hidden="true">⬜</span> ' + esc(c.label) + "</li>"; }).join("") + "</ul>" : "");
    var ta = $("#k3-write", el), warned = false;
    function upd() { var t = ta.value, n = words(t).length; $(".wc", el).textContent = n + " word" + (n === 1 ? "" : "s") + (min ? " (goal: " + min + ")" : ""); $(".wc", el).classList.toggle("ok", n >= min); $(".say-mine", el).setAttribute("data-say", t || "Type your writing first."); checks.forEach(function (c, i) { var ok = false; try { c.re.lastIndex = 0; ok = c.re.test(t); } catch (e) {} var li = $('[data-ck="' + i + '"]', el); li.classList.toggle("ok", ok); $(".ck", li).textContent = ok ? "✅" : "⬜"; }); api.ready(n > 0); }
    ta.addEventListener("input", function () { upd(); var card = el.parentNode, f = card && card.querySelector(".fb.hint"); if (f) f.className = "fb"; });
    $$("[data-f]", el).forEach(function (b) { b.onclick = function () { var f = q.frames[+b.getAttribute("data-f")]; ta.value = (ta.value && !/\s$/.test(ta.value) ? ta.value + " " : ta.value) + f + " "; ta.focus(); upd(); }; });
    upd();
    return {
      isWrite: true,
      score: function () { var t = ta.value, n = words(t).length; if (n < min && !warned) { warned = true; return { again: "Try to write " + min + " words. You have " + n + ". Tap Done again to turn it in." }; } var all = checks.every(function (c) { try { c.re.lastIndex = 0; return c.re.test(t); } catch (e) { return false; } }); return { pts: all ? 1 : n >= min ? 0.5 : 0, all: all, n: n, text: t }; },
      lock: function () { ta.readOnly = true; $$("[data-f]", el).forEach(function (b) { b.disabled = true; }); }
    };
  };
  K3.types = QT;

  /* =====================================================================
     QUIZ RUNNER (used by activities and the Daily Review)
     ===================================================================== */
  function passageHTML(p, open) {
    if (!p) return "";
    var paras = Array.isArray(p.text) ? p.text : String(p.text || "").split(/\n\s*\n|\n/);
    return '<aside class="passage" aria-label="Reading passage"><details' + (open ? " open" : "") + '><summary><span aria-hidden="true">📄</span> ' + esc(p.title || "Read the passage") + ' <span class="sum-hint">(tap to ' + '<span class="when-open">hide</span><span class="when-closed">show</span>)</span></summary><div class="passage-in">' +
      '<div class="passage-tools">' + sayBtn((p.title ? p.title + ". " : "") + paras.map(strip).join(" "), "Read the whole passage", "say-all") + '<span class="muted">Read it all</span>' + (p.lexile ? '<span class="lexile">' + esc(p.lexile) + "</span>" : "") + "</div>" +
      (p.title ? "<h2>" + esc(p.title) + "</h2>" : "") + (p.pic ? '<div class="passage-pic">' + p.pic + "</div>" : "") +
      paras.filter(function (x) { return strip(x); }).map(function (t) { return '<div class="para"><p>' + t + "</p>" + sayBtn(t, "Read this paragraph") + "</div>"; }).join("") + "</div></details></aside>";
  }
  K3.passageHTML = passageHTML;

  function confetti() {
    try { if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; } catch (e) {}
    var box = document.createElement("div"); box.className = "confetti"; box.setAttribute("aria-hidden", "true"); var cols = ["#ffc53d", "#8a4fd8", "#5b2a86", "#ffffff", "#ff7ab6", "#3dd6b5"], h = "";
    for (var i = 0; i < 90; i++) h += '<i style="left:' + Math.random() * 100 + "%;background:" + cols[i % cols.length] + ";animation-delay:" + (Math.random() * 0.8).toFixed(2) + "s;animation-duration:" + (2 + Math.random() * 1.6).toFixed(2) + "s;transform:rotate(" + Math.floor(Math.random() * 360) + "deg);" + (i % 3 ? "" : "border-radius:50%;") + '"></i>';
    box.innerHTML = h; document.body.appendChild(box); setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 4200);
  }
  K3.confetti = confetti;
  function starsFor(pct) { return pct >= 90 ? 3 : pct >= 60 ? 2 : 1; }
  K3.starsFor = starsFor;

  function runQuiz(o) {
    var items = o.items, n = items.length, st = { i: 0, tries: 0, pts: [], first: 0, locked: false, t0: Date.now(), open: true }, handler = null, qKeys = [];
    app.innerHTML = (o.crumbs || "") + '<div class="runner"><header class="run-head"><span class="run-emoji" aria-hidden="true">' + esc(o.emoji || "⭐") + '</span><div><h1>' + esc(o.title) + "</h1>" + (o.skill ? '<p class="run-skill">I can ' + esc(lowerFirst(o.skill)) + (o.standard ? ' <span class="std">' + esc(o.standard) + "</span>" : "") + "</p>" : "") + '</div></header><div class="prog-wrap"><div class="prog" role="progressbar" aria-label="Progress" aria-valuemin="0" aria-valuemax="' + n + '" aria-valuenow="0"><span class="prog-fill"></span></div><span class="prog-t"></span></div><div class="run-body"></div></div>';
    var body = $(".run-body", app);
    function prog(k, label) { var p = $(".prog", app); p.setAttribute("aria-valuenow", k); $(".prog-fill", app).style.width = (100 * k / n) + "%"; $(".prog-t", app).innerHTML = label; }
    function clearKeys() { qKeys.forEach(function (h) { document.removeEventListener("keydown", h); }); qKeys = []; }
    K3.onLeave(clearKeys);

    var learn = o.learn || [];
    if (learn.length) showLearn(0); else showQ();

    function showLearn(k) {
      prog(0, "📘 Learn it");
      var c = learn[k];
      body.innerHTML = '<section class="card learn-card pop" aria-label="Learn it"><p class="eyebrow">📘 Learn it · ' + (k + 1) + " of " + learn.length + '</p><div class="learn-main"><div class="learn-html">' + (c.html || "") + "</div>" + (c.pic ? '<div class="learn-pic">' + c.pic + "</div>" : "") + '</div><div class="learn-say">' + sayBtn(c.say || c.html, "Read this card", "say-lg") + '<span class="muted">Listen</span></div><div class="row-btns">' + (k ? '<button type="button" class="btn btn-ghost" data-l="prev">← Back</button>' : "") + '<button type="button" class="btn btn-xl" data-l="next">' + (k < learn.length - 1 ? "Next →" : "I'm ready! 🚀") + "</button></div>" + (k < learn.length - 1 ? '<p class="center"><button type="button" class="link-btn" data-l="skip">Skip to questions</button></p>' : "") + "</section>";
      $$("[data-l]", body).forEach(function (b) { b.onclick = function () { var a = b.getAttribute("data-l"); if (a === "prev") showLearn(k - 1); else if (a === "next" && k < learn.length - 1) showLearn(k + 1); else showQ(); }; });
      var nb = $('[data-l="next"]', body); if (nb) nb.focus({ preventScroll: true });
    }

    function showQ() {
      clearKeys();
      var it = items[st.i], q = it.q; st.tries = 0; st.locked = false;
      prog(st.i, "Question <b>" + (st.i + 1) + "</b> of " + n);
      var pOpen = st.open, d0 = $(".passage details", body); if (d0) pOpen = d0.open;
      body.innerHTML = '<div class="run-grid' + (it.passage ? " has-passage" : "") + '">' + passageHTML(it.passage, pOpen) + '<section class="card q-card pop" aria-labelledby="k3-qtext">' + (it.tag ? '<p class="q-tag">' + it.tag + "</p>" : "") +
        '<div class="q-top"><span class="q-n">Question ' + (st.i + 1) + "</span>" + sayBtn(q.say || q.q, "Read the question", "say-lg") + '</div><div class="q-text" id="k3-qtext">' + q.q + "</div>" + (q.pic ? '<div class="q-pic">' + q.pic + "</div>" : "") +
        '<div class="q-ui"></div><div class="fb" role="status" aria-live="polite"></div><div class="q-actions"><button type="button" class="btn btn-xl btn-check" disabled>' + (q.t === "write" ? "I'm done ✓" : "Check ✓") + '</button><button type="button" class="btn btn-xl btn-gold btn-next" hidden>' + (st.i < n - 1 ? "Next →" : "Finish 🎉") + "</button></div></section></div>";
      var det = $(".passage details", body); if (det) det.addEventListener("toggle", function () { st.open = det.open; });
      var chk = $(".btn-check", body), nxt = $(".btn-next", body);
      var api = { ready: function (b) { chk.disabled = !b || st.locked; }, locked: function () { return st.locked; }, submit: doCheck, keys: function (fn) { var h = function (e) { if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return; fn(e.key, e); }; document.addEventListener("keydown", h); qKeys.push(h); } };
      try { handler = QT[q.t](q, $(".q-ui", body), api); } catch (e) { console.error("question failed", e); handler = { check: function () { return { ok: true }; }, lock: function () {}, reveal: function () {}, retry: function () {} }; $(".q-ui", body).innerHTML = '<p class="muted">This question could not load. Tap Check to skip it.</p>'; chk.disabled = false; }
      if (q.t === "mc" || q.t === "tf") chk.hidden = true;
      chk.onclick = doCheck;
      nxt.onclick = function () { st.i++; if (st.i < n) { showQ(); var qt = $(".q-top", body); if (qt && qt.getBoundingClientRect().top < 0) qt.scrollIntoView({ block: "start" }); } else finish(); };
      function fb(cls, html, sayText) { var f = $(".fb", body); f.className = "fb show " + cls; f.innerHTML = html + (sayText ? sayBtn(sayText, "Read the feedback") : ""); }
      function done(pts) { st.pts[st.i] = pts; st.locked = true; chk.hidden = true; nxt.hidden = false; prog(st.i + 1, "Question <b>" + (st.i + 1) + "</b> of " + n); setTimeout(function () { nxt.focus({ preventScroll: false }); }, 30); }
      function doCheck() {
        if (st.locked) return;
        if (handler.isWrite) {
          var r = handler.score(); if (r.again) { fb("hint", "✍️ " + esc(r.again), r.again); return; }
          handler.lock();
          var missing = (q.checks || []).filter(function (c) { try { c.re.lastIndex = 0; return !c.re.test(r.text); } catch (e) { return true; } }).map(function (c) { return c.label; });
          var msg = r.pts === 1 ? "🌟 Wonderful writing! You did every part of the checklist." : r.pts === 0.5 ? "👍 Nice work! Next time, try to: " + missing.join("; ") + "." : "💪 Keep practicing! Try to write " + (q.min || 1) + " words next time.";
          if (r.pts === 1) st.first++;
          fb(r.pts === 1 ? "good" : "hint", esc(msg) + (q.why ? '<p class="why">' + q.why + "</p>" : ""), msg + " " + strip(q.why || "")); done(r.pts); return;
        }
        var res = handler.check();
        if (res.ok) { var pts = st.tries === 0 ? 1 : 0.5; if (st.tries === 0) st.first++; handler.lock(true); var c = pick(CHEER); fb("good", '<b class="fb-h">🎉 ' + esc(c) + (pts < 1 ? " (2nd try)" : "") + "</b>" + (q.why ? '<p class="why">' + q.why + "</p>" : ""), c + " " + strip(q.why || "")); done(pts); return; }
        st.tries++;
        if (st.tries === 1) { var m = pick(MISS); fb("hint", '<b class="fb-h">🤔 ' + esc(m) + '</b><p class="hint">💡 ' + esc(res.hint || "Look again.") + "</p>", m + " " + (res.hint || "")); try { handler.retry(); } catch (e) {} return; }
        handler.reveal(); fb("reveal", '<b class="fb-h">💜 Let\'s learn it together.</b><p>Look at the right answer.</p>' + (q.why ? '<p class="why">' + q.why + "</p>" : ""), "Let's learn it together. " + strip(q.why || "")); done(0);
      }
    }

    function finish() {
      clearKeys();
      var score = st.pts.reduce(function (a, b) { return a + (b || 0); }, 0), pct = n ? Math.round(100 * score / n) : 0, mastered = pct >= (o.pass || 80), mins = round((Date.now() - st.t0) / 60000, 1);
      var res = { score: score, total: n, percent: pct, mastered: mastered, firstTry: st.first, mins: mins, results: st.pts.slice() };
      prog(n, "All done!");
      var stars = starsFor(pct), sname = K3.student();
      body.innerHTML = '<section class="card finish pop" aria-labelledby="k3-fin"><div class="stars" role="img" aria-label="' + stars + ' out of 3 stars">' + [1, 2, 3].map(function (k) { return '<span class="star' + (k <= stars ? " on" : "") + '" style="animation-delay:' + (k * 0.18) + 's">★</span>'; }).join("") + "</div>" +
        '<div class="fin-elvis">' + K3.elvis({ size: 130, cls: "cheer" }) + '</div>' + '<h1 id="k3-fin">' + (mastered ? "Mastered! 🏆" : pct >= 60 ? "Great work! 🎉" : "Good effort! 💪") + "</h1>" + (mastered ? '<p class="mastered-badge">⭐ You mastered ' + esc(o.standard && o.standard !== "MIXED" ? o.standard : "it") + "!</p>" : "") +
        '<p class="score-big"><b>' + fmtNum(score) + "</b> out of " + n + ' <span class="pct">(' + pct + "%)</span></p>" +
        '<ol class="res-dots" aria-label="Your answers">' + st.pts.map(function (p, i) { return '<li class="' + (p === 1 ? "r1" : p ? "r5" : "r0") + '" title="Question ' + (i + 1) + '"><span class="sr">Question ' + (i + 1) + ": " + (p === 1 ? "right" : p ? "right on second try" : "not yet") + "</span>" + (p === 1 ? "✓" : p ? "½" : "•") + "</li>"; }).join("") + "</ol>" +
        '<p class="muted small">✓ first try &nbsp; ½ second try &nbsp; • keep practicing</p>' +
        '<p class="send-st" role="status">' + (sname ? "📤 Saving..." : "") + "</p>" +
        '<div class="row-btns"><button type="button" class="btn btn-ghost" data-f="again">🔁 Try again</button>' + (o.nextHref ? '<a class="btn btn-gold" href="' + o.nextHref + '">Next activity →</a>' : "") + '<a class="btn" href="' + (o.backHref || "#/") + '">' + (o.backLabel || "🏠 Home") + "</a></div></section>";
      if (pct >= 60) confetti();
      K3.say((mastered ? "Mastered! " : "Great work! ") + "You scored " + fmtNum(score) + " out of " + n + ".");
      $('[data-f="again"]', body).onclick = function () { K3.render(); };
      var obj = o.payload(res);
      if (sname) { obj.student = { name: sname.name, num: sname.num }; K3.send("scores", obj).then(function (s) { var e = $(".send-st", body); if (e) e.innerHTML = sendStatusText(s); }); }
      else { K3._pending = obj; var e = $(".send-st", body); e.innerHTML = '⚠️ You are not signed in. <a href="#/signin">Sign in</a> to save these stars.'; K3._after = o.backHref || "#/"; }
    }
  }
  K3.runQuiz = runQuiz;
  K3._afterSignIn = function (s) { if (K3._pending) { var p = K3._pending; K3._pending = null; p.student = { name: s.name, num: s.num }; K3.send("scores", p).then(function (st) { toast(sendStatusText(st)); }); } };

  /* ---------- activity route ---------- */
  K3.route("act", function (id) {
    var a = K3.byId[id];
    if (!a) { app.innerHTML = '<div class="card center"><h1>Hmm, I can’t find that activity. 🔎</h1><a class="btn" href="#/">🏠 Home</a></div>'; return; }
    var S = SUBJ[a.subject] || { name: a.subject, emoji: "⭐" };
    if (!a.qs.length) { app.innerHTML = '<div class="card center"><h1>' + esc(a.title) + '</h1><p>This activity has no questions yet.</p><a class="btn" href="#/subject/' + a.subject + '">← Back</a></div>'; return; }
    var list = K3.ofSubject(a.subject), s = K3.student(), best = s ? K3.bestByActivity(K3.rows("scores", s.num)) : {}, k = list.indexOf(a), next = null;
    for (var j = 1; j < list.length; j++) { var c = list[(k + j) % list.length]; if (statusOf(c, best).cls !== "mastered") { next = c; break; } }
    runQuiz({
      title: a.title, emoji: a.emoji, skill: a.skill, standard: a.standard, pass: a.pass, learn: a.learn,
      crumbs: crumbs([["🏠 Home", "#/"], [S.emoji + " " + S.name, "#/subject/" + a.subject], [esc(a.title), ""]]),
      items: a.qs.map(function (q) { return { q: q, passage: a.passage }; }),
      backHref: "#/subject/" + a.subject, backLabel: "← " + S.name, nextHref: next ? "#/act/" + encodeURIComponent(next.id) : "",
      payload: function (r) { return { action: "score", activity: a.id, title: a.title, subject: a.subject, unit: a.unit, standard: a.standard, score: r.score, total: r.total, percent: r.percent, mastered: r.mastered, firstTry: r.firstTry, mins: r.mins, results: r.results, time: new Date().toISOString() }; }
    });
  });

  /* ---------- daily review ---------- */
  K3.buildReview = function (num, count, seed) {
    count = count || 6; var r = rng(seed || ("rev" + today() + num)), rows = K3.rows("scores", num), best = K3.bestByStandard(rows);
    var byStd = {}; K3.acts.forEach(function (a) { if (!a.standard) return; a.qs.forEach(function (q) { if (q.t === "write") return; (byStd[a.standard] = byStd[a.standard] || []).push({ q: q, a: a }); }); });
    var stds = Object.keys(byStd); if (!stds.length) return [];
    var pass = function (s) { return K3.passFor(s); };
    var mastered = shuffle(stds.filter(function (s) { return best[s] != null && best[s] >= pass(s); }), r);
    var weak = stds.filter(function (s) { return best[s] != null && best[s] < pass(s); }).sort(function (a, b) { return best[a] - best[b]; });
    var fresh = shuffle(stds.filter(function (s) { return best[s] == null; }), r);
    var nM = mastered.length ? (mastered.length >= 4 && stds.length > 4 ? 2 : 1) : 0, plan = [];
    var focus = weak.concat(fresh); if (!focus.length) { focus = mastered.slice(nM); }
    for (var i = 0; plan.length < count - nM && focus.length; i++) plan.push(focus[i % focus.length]);
    for (var m = 0; m < nM; m++) plan.push(mastered[m]);
    while (plan.length < count) plan.push(pick(stds, r));
    var used = {}, out = [];
    plan.forEach(function (s) {
      var opts = byStd[s].filter(function (x) { return !used[x.a.id + "|" + x.a.qs.indexOf(x.q)]; }), noP = opts.filter(function (x) { return !x.a.passage; });
      var c = pick(noP.length ? noP : opts.length ? opts : byStd[s], r); used[c.a.id + "|" + c.a.qs.indexOf(c.q)] = 1;
      out.push({ q: c.q, passage: c.a.passage, act: c.a, tag: (SUBJ[c.a.subject] ? SUBJ[c.a.subject].emoji + " " : "") + esc(c.a.title) + ' · <span class="std">' + esc(c.a.standard) + "</span>" + (best[s] != null && best[s] >= pass(s) ? ' · <span class="tag-m">⭐ review</span>' : best[s] != null ? ' · <span class="tag-p">practice</span>' : "") });
    });
    return shuffle(out, r);
  };
  K3.route("review", function () {
    if (needStudent("#/review")) return;
    var s = K3.student(), doneToday = K3.rows("scores", s.num).filter(function (x) { return x.activity === "daily-review" && dayKey(x.time) === today(); }).length;
    var items = K3.buildReview(s.num, 6, "rev" + today() + s.num + "#" + doneToday);
    if (!items.length) { app.innerHTML = '<div class="card center"><div class="big-emoji">🔁</div><h1>Daily Review</h1><p class="lead">No questions yet. Check back soon!</p><a class="btn" href="#/">🏠 Home</a></div>'; return; }
    runQuiz({
      title: "Daily Review", emoji: "🔁", skill: "remember what I learned", pass: 80, standard: "MIXED",
      crumbs: crumbs([["🏠 Home", "#/"], ["🔁 Daily Review", ""]]), items: items, backHref: "#/", backLabel: "🏠 Home",
      payload: function (r) { return { action: "score", activity: "daily-review", title: "Daily Review", subject: "mixed", unit: "Daily Review", standard: "MIXED", score: r.score, total: r.total, percent: r.percent, mastered: r.mastered, firstTry: r.firstTry, mins: r.mins, results: r.results, time: new Date().toISOString() }; }
    });
  });

  /* =====================================================================
     DAILY FLUENCY: math fact sprint + reading WCPM
     ===================================================================== */
  var SPRINT_SECS = FAST ? 5 : 60, READ_SECS = FAST ? 5 : 60;
  var SETS = [
    { id: "add", label: "Addition within 20", ic: "➕", gen: function (r) { var a = Math.floor(r() * 21), b = Math.floor(r() * (21 - a)); return [a + " + " + b, a + b]; } },
    { id: "sub", label: "Subtraction within 20", ic: "➖", gen: function (r) { var a = Math.floor(r() * 21), b = Math.floor(r() * (a + 1)); return [a + " − " + b, a - b]; } },
    { id: "mult", label: "Multiply by", ic: "✖️", factor: true, gen: function (r, f) { var k = Math.floor(r() * 11); return r() < 0.5 ? [f + " × " + k, f * k] : [k + " × " + f, f * k]; } },
    { id: "multmix", label: "Multiplication 0-10 mixed", ic: "🎲", gen: function (r) { var a = Math.floor(r() * 11), b = Math.floor(r() * 11); return [a + " × " + b, a * b]; } },
    { id: "div", label: "Division facts", ic: "➗", gen: function (r) { var d = 1 + Math.floor(r() * 10), q = Math.floor(r() * 11); return [d * q + " ÷ " + d, q]; } }
  ];
  K3.factSets = SETS;
  function benchNow() { var se = season(); return { season: se, v: CFG.goals.readingWCPM[se] }; }
  K3.benchNow = benchNow;
  var NORM = "Hasbrouck & Tindal (2017) grade 3, 50th percentile (national norms)";
  K3.NORM = NORM;
  K3.mathChart = function (rows, title) { return K3.lineChart({ title: title || "⚡ Math facts per minute", series: [{ name: "Facts per minute", points: rows.map(function (r) { return { x: shortDate(r.time), y: round(r.rate, 0), t: r.set }; }) }], refs: [{ y: CFG.goals.mathFactsPerMin, label: "Goal", color: CH.goal }], yLabel: "facts per minute", unit: "per min", empty: "Do a fact sprint to start your chart!", label: "Line chart of math facts per minute" }); };
  K3.readChart = function (rows, title) { var g = CFG.goals.readingWCPM; return K3.lineChart({ title: title || "📖 Words correct per minute", series: [{ name: "WCPM", points: rows.map(function (r) { return { x: shortDate(r.time), y: round(r.rate, 0), t: r.set }; }) }], refs: [{ y: g.fall, label: "Fall", color: CH.ref }, { y: g.winter, label: "Winter", color: CH.ref }, { y: g.spring, label: "Spring", color: CH.goal }], yLabel: "words correct per minute", unit: "WCPM", minMax: 120, empty: "Do a reading check to start your chart!", label: "Line chart of words correct per minute with national norm lines" }) + '<p class="muted small">Dashed lines: ' + esc(NORM) + ".</p>"; };

  K3.route("fluency", function (kind) {
    if (kind === "math") return mathSprint();
    if (kind === "reading") return readCheck();
    var s = K3.student(), mr = s ? K3.rows("fluency", s.num).filter(function (r) { return r.type === "math"; }) : [], rr = s ? K3.rows("fluency", s.num).filter(function (r) { return r.type === "reading"; }) : [];
    var bm = mr.length ? Math.max.apply(null, mr.map(function (r) { return r.rate; })) : null, br = rr.length ? rr[rr.length - 1].rate : null;
    app.innerHTML = crumbs([["🏠 Home", "#/"], ["⚡ Daily Fluency", ""]]) + '<h1>⚡ Daily Fluency ' + sayBtn("Daily Fluency. Pick math facts or reading.", "Read") + '</h1><p class="lead">Practice a little every day. Watch yourself grow! 🌱</p><div class="tiles tiles-2">' +
      '<a class="tile big-t" href="#/fluency/math"><span class="tile-ic" aria-hidden="true">🧮</span><span class="tile-name">Math Fact Sprint<small>60 seconds. How many can you do?</small></span>' + (bm != null ? '<span class="tile-count">🏅 Best: ' + round(bm, 0) + " per min</span>" : "") + "</a>" +
      '<a class="tile big-t" href="#/fluency/reading"><span class="tile-ic" aria-hidden="true">📚</span><span class="tile-name">Reading Fluency<small>Read for 1 minute with a partner</small></span>' + (br != null ? '<span class="tile-count">Last: ' + round(br, 0) + " WCPM</span>" : "") + "</a></div>";
  });

  function mathSprint() {
    if (needStudent("#/fluency/math")) return;
    var s = K3.student(), chosen = store.get("k3sprintset", { id: "multmix", f: 2 });
    var rows = K3.rows("fluency", s.num).filter(function (r) { return r.type === "math"; });
    app.innerHTML = crumbs([["🏠 Home", "#/"], ["⚡ Fluency", "#/fluency"], ["🧮 Fact Sprint", ""]]) + '<h1>🧮 Math Fact Sprint ' + sayBtn("Math fact sprint. Pick your facts. Then press Start. You have 60 seconds.", "Read") + '</h1><p class="lead">Pick your facts. You have <b>' + SPRINT_SECS + " seconds</b>.</p>" +
      '<div class="card"><h2 class="h3">1. Pick your facts</h2><div class="set-pick" role="radiogroup" aria-label="Fact set">' + SETS.map(function (x) { return '<button type="button" role="radio" class="set-btn" data-set="' + x.id + '" aria-checked="' + (chosen.id === x.id) + '"><span aria-hidden="true">' + x.ic + "</span> " + x.label + (x.factor ? "..." : "") + "</button>"; }).join("") + "</div>" +
      '<div class="factor-pick" ' + (chosen.id === "mult" ? "" : "hidden") + '><h2 class="h3">Multiply by which number?</h2><div class="factor-row" role="radiogroup" aria-label="Factor">' + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (f) { return '<button type="button" role="radio" class="fac" data-f="' + f + '" aria-checked="' + (chosen.f === f) + '">' + f + "</button>"; }).join("") + '</div></div><p class="center"><button type="button" class="btn btn-xl btn-gold" data-go>▶️ Start!</button></p></div>' +
      '<div class="card">' + K3.mathChart(rows, "⚡ My facts per minute") + "</div>";
    $$(".set-btn").forEach(function (b) { b.onclick = function () { chosen.id = b.getAttribute("data-set"); $$(".set-btn").forEach(function (x) { x.setAttribute("aria-checked", x === b); }); $(".factor-pick").hidden = chosen.id !== "mult"; }; });
    $$(".fac").forEach(function (b) { b.onclick = function () { chosen.f = +b.getAttribute("data-f"); $$(".fac").forEach(function (x) { x.setAttribute("aria-checked", x === b); }); }; });
    $("[data-go]").onclick = function () { store.set("k3sprintset", chosen); go(); };
    function go() {
      var set = SETS.filter(function (x) { return x.id === chosen.id; })[0] || SETS[3], label = set.factor ? "Multiply by " + chosen.f : set.label, r = Math.random, cur = null, last = "", val = "", correct = 0, errors = 0, t0 = 0, timer = null, ended = false, log = [];
      app.innerHTML = '<div class="sprint"><div class="sprint-top"><span class="sprint-set">' + set.ic + " " + esc(label) + '</span><span class="sprint-score" aria-live="polite">✅ <b>0</b></span></div><div class="timebar" aria-hidden="true"><span></span></div><p class="sprint-time" role="timer" aria-live="off"><b>' + SPRINT_SECS + "</b> s</p>" +
        '<div class="fact" aria-live="assertive"></div><output class="num-box fact-ans" aria-label="Your answer">&nbsp;</output><p class="sprint-msg" aria-live="polite"></p>' + keypad(false, { go: "✓", goLabel: "Check", cls: "kp-sprint" }) + "</div>";
      function nextFact() { var f, g = 0; do { f = set.gen(r, chosen.f); g++; } while (f[0] === last && g < 10); cur = f; last = f[0]; $(".fact").textContent = f[0] + " = ?"; val = ""; showV(); }
      function showV() { $(".fact-ans").innerHTML = val ? esc(val) : "&nbsp;"; }
      function press(k) {
        if (ended) return;
        if (k === "back") { val = val.slice(0, -1); showV(); return; }
        if (k === "go") { if (!val) return; var ok = +val === cur[1]; log.push([cur[0], +val, ok]); if (ok) { correct++; $(".sprint-score b").textContent = correct; flash("good", "✓"); } else { errors++; flash("bad", "Oops! " + cur[0] + " = " + cur[1]); } nextFact(); return; }
        if (/^\d$/.test(k) && val.length < 3) { val += k; showV(); }
      }
      function flash(cls, m) { var e = $(".sprint-msg"); e.className = "sprint-msg " + cls; e.textContent = m; var f = $(".fact-ans"); f.classList.remove("pulse-good", "pulse-bad"); void f.offsetWidth; f.classList.add(cls === "good" ? "pulse-good" : "pulse-bad"); }
      bindKeypad(app, press);
      keyHandler(function (k, e) { if (/^\d$/.test(k)) press(k); else if (k === "Backspace") press("back"); else if (k === "Enter") { e.preventDefault(); press("go"); } });
      nextFact(); t0 = Date.now();
      timer = setInterval(tick, 100); K3.onLeave(function () { clearInterval(timer); });
      function tick() { var el = (Date.now() - t0) / 1000, left = Math.max(0, SPRINT_SECS - el), bar = $(".timebar span"); if (!bar) { clearInterval(timer); return; } bar.style.width = (100 * left / SPRINT_SECS) + "%"; $(".sprint-time b").textContent = Math.ceil(left); if (left <= 10) $(".timebar").classList.add("low"); if (left <= 0) end(); }
      function end() {
        clearInterval(timer); ended = true;
        var rate = round(correct * 60 / SPRINT_SECS, 1), prev = rows.length ? Math.max.apply(null, rows.map(function (x) { return x.rate; })) : 0, prevSet = rows.filter(function (x) { return x.set === label; }), pbSet = prevSet.length ? Math.max.apply(null, prevSet.map(function (x) { return x.rate; })) : 0, isPB = rate > pbSet && rate > 0;
        var obj = { action: "fluency", student: { name: s.name, num: s.num }, type: "math", set: label, correct: correct, errors: errors, seconds: SPRINT_SECS, rate: rate, time: new Date().toISOString() };
        var all = rows.concat([K3.normFlu(obj, "local")]);
        app.innerHTML = crumbs([["🏠 Home", "#/"], ["⚡ Fluency", "#/fluency"], ["🧮 Fact Sprint", ""]]) + '<section class="card finish pop"><h1>' + (isPB ? "🏅 New personal best!" : "⏰ Time!") + '</h1><p class="score-big"><b>' + round(rate, 0) + '</b> facts per minute</p><div class="stats center-stats"><span class="stat">✅ <b>' + correct + '</b> right</span><span class="stat">🔁 <b>' + errors + '</b> to practice</span><span class="stat">🎯 Goal <b>' + CFG.goals.mathFactsPerMin + "</b></span><span class=\"stat\">🏅 Best (" + esc(label) + ") <b>" + round(Math.max(pbSet, rate), 0) + "</b></span></div>" +
          (rate >= CFG.goals.mathFactsPerMin ? '<p class="mastered-badge">🎯 You met the goal!</p>' : '<p class="lead">' + (CFG.goals.mathFactsPerMin - round(rate, 0)) + " more to reach the goal. You can do it! 💪</p>") +
          (log.filter(function (l) { return !l[2]; }).length ? '<div class="practice-list"><h2 class="h3">Facts to practice</h2><p>' + log.filter(function (l) { return !l[2]; }).slice(0, 12).map(function (l) { var f = l[0]; return '<span class="fact-chip">' + esc(f) + "</span>"; }).join(" ") + "</p></div>" : "") +
          '<p class="send-st" role="status">📤 Saving...</p><div class="row-btns"><button type="button" class="btn btn-gold btn-xl" data-again>🔁 Go again</button><a class="btn btn-ghost" href="#/fluency/math">Pick new facts</a><a class="btn" href="#/goals">🎯 My data</a></div></section><div class="card">' + K3.mathChart(all, "⚡ My facts per minute") + "</div>";
        if (isPB || correct > 0) confetti();
        K3.say(isPB ? "New personal best! " + round(rate, 0) + " facts per minute!" : "Time! You got " + round(rate, 0) + " facts per minute.");
        $("[data-again]").onclick = function () { rows = all; go(); };
        K3.send("fluency", obj).then(function (st) { var e = $(".send-st"); if (e) e.innerHTML = sendStatusText(st); });
      }
    }
  }

  function readCheck(pid) {
    var t = K3.isTeacher(), s = K3.student();
    if (!t && needStudent("#/fluency/reading")) return;
    var reader = (t && K3._reader) || s || null;
    if (!reader && t) reader = K3._reader = K3.roster()[0] || null;
    if (!reader) { needStudent("#/fluency/reading"); return; }
    var bySeason = { fall: [], winter: [], spring: [] }; K3.passages.forEach(function (p) { (bySeason[p.season] || (bySeason[p.season] = [])).push(p); });
    var bn = benchNow();
    var head = crumbs([["🏠 Home", "#/"], ["⚡ Fluency", "#/fluency"], ["📚 Reading Fluency", ""]]);
    if (!K3.passages.length) { app.innerHTML = head + '<div class="card center"><div class="big-emoji">📚</div><h1>Reading passages are coming soon!</h1><a class="btn" href="#/fluency">← Back</a></div>'; return; }
    var rRows = reader ? K3.rows("fluency", reader.num).filter(function (r) { return r.type === "reading"; }) : [];
    app.innerHTML = head + '<h1>📚 Reading Fluency ' + sayBtn("Reading fluency. Pick a passage. A partner will listen and tap any word you miss.", "Read") + "</h1>" +
      '<div class="card how-card"><p><b>How it works:</b> The reader reads out loud for <b>1 minute</b>. A partner or the teacher taps any word the reader <b>misses or skips</b>. Then we count <b>words correct per minute</b> (WCPM).</p><p class="muted small">Goal right now (' + bn.season + "): <b>" + bn.v + " WCPM</b>. " + esc(NORM) + ".</p>" +
      (t ? '<label class="field">Reader: <select id="k3-reader">' + K3.roster().map(function (x) { return '<option value="' + esc(x.num) + '"' + (reader && reader.num === x.num ? " selected" : "") + ">" + esc(x.name) + "</option>"; }).join("") + "</select></label>" : '<p>Reader: <b>' + esc(reader.name) + "</b></p>") + "</div>" +
      ["fall", "winter", "spring"].filter(function (se) { return bySeason[se] && bySeason[se].length; }).map(function (se) { return '<section class="unit"><h2 class="unit-h">' + { fall: "🍂 Fall", winter: "❄️ Winter", spring: "🌸 Spring" }[se] + ' passages <span class="muted small">(goal ' + CFG.goals.readingWCPM[se] + ' WCPM)</span></h2><div class="acts">' + bySeason[se].map(function (p) { return '<button type="button" class="act-card" data-p="' + esc(p.id) + '"><span class="act-emoji" aria-hidden="true">📄</span><span class="act-body"><span class="act-title">' + esc(p.title) + '</span><span class="act-meta"><span>' + p.count + " words</span></span></span></button>"; }).join("") + "</div></section>"; }).join("") +
      (reader ? '<div class="card">' + K3.readChart(rRows, "📖 " + reader.name + ": words correct per minute") + "</div>" : "");
    var sel = $("#k3-reader");
    if (sel) sel.onchange = function () { var num = sel.value; K3._reader = K3.roster().filter(function (x) { return x.num === num; })[0]; readCheck(); };
    $$("[data-p]").forEach(function (b) { b.onclick = function () { var p = K3.passages.filter(function (x) { return x.id === b.getAttribute("data-p"); })[0]; run(p, reader); }; });

    function run(p, rd) {
      var miss = {}, phase = "ready", t0 = 0, timer = null, secs = READ_SECS;
      app.innerHTML = '<div class="wcpm"><div class="wcpm-top"><button type="button" class="btn btn-ghost sm" data-back>← Passages</button><div><b>' + esc(rd.name) + "</b> · " + esc(p.title) + '</div><div class="wcpm-timer" role="timer"><b>' + secs + '</b>s</div></div><div class="timebar" aria-hidden="true"><span style="width:100%"></span></div>' +
        '<p class="wcpm-msg" role="status">Partner: press <b>Start</b> when the reader begins. Tap any word they miss. Tap again to undo.</p><div class="row-btns"><button type="button" class="btn btn-gold btn-xl" data-start>▶️ Start</button><button type="button" class="btn btn-ghost" data-stop hidden>🏁 Finished early</button>' + sayBtn(p.text, "Listen to the passage first", "say-lg") + '</div><h2 class="wcpm-title">' + esc(p.title) + '</h2><div class="wcpm-text" aria-label="Passage words. Tap a word to mark it missed.">' + p.words.map(function (w, i) { return '<button type="button" class="ww" data-w="' + i + '" aria-pressed="false">' + esc(w) + "</button>"; }).join(" ") + '</div><p class="muted small center">' + p.count + " words</p></div>";
      $("[data-back]").onclick = function () { clearInterval(timer); readCheck(); };
      $$(".ww").forEach(function (b) { b.onclick = function () { var i = +b.getAttribute("data-w"); if (phase === "last") { finish(i, secs); return; } if (phase === "done") return; if (miss[i]) delete miss[i]; else miss[i] = 1; b.classList.toggle("miss", !!miss[i]); b.setAttribute("aria-pressed", !!miss[i]); }; });
      $("[data-start]").onclick = function () { if (phase !== "ready") return; phase = "run"; t0 = Date.now(); this.hidden = true; $("[data-stop]").hidden = false; $(".wcpm-msg").innerHTML = "📖 Reading... Tap words that are missed."; timer = setInterval(tick, 100); };
      $("[data-stop]").onclick = function () { if (phase !== "run") return; clearInterval(timer); var el = Math.max(1, (Date.now() - t0) / 1000); phase = "last"; secs = round(el, 0) || 1; $(".wcpm-msg").innerHTML = "🏁 Tap the <b>last word</b> the reader read."; $("[data-stop]").hidden = true; $(".wcpm").classList.add("pick-last"); };
      K3.onLeave(function () { clearInterval(timer); });
      function tick() { var el = (Date.now() - t0) / 1000, left = Math.max(0, READ_SECS - el), bar = $(".timebar span"); if (!bar) { clearInterval(timer); return; } bar.style.width = (100 * left / READ_SECS) + "%"; $(".wcpm-timer b").textContent = Math.ceil(left); if (left <= 10) $(".timebar").classList.add("low"); if (left <= 0) { clearInterval(timer); phase = "last"; secs = READ_SECS; $(".wcpm-msg").innerHTML = "⏰ Time! Tap the <b>last word</b> the reader read."; $("[data-stop]").hidden = true; $(".wcpm").classList.add("pick-last"); K3.say("Time! Tap the last word."); } }
      function finish(last, seconds) {
        phase = "done";
        var attempted = last + 1, errors = Object.keys(miss).filter(function (i) { return +i <= last; }).length, correct = Math.max(0, attempted - errors), rate = Math.round(correct * 60 / seconds), acc = attempted ? Math.round(100 * correct / attempted) : 0, b = benchNow();
        var obj = { action: "fluency", student: { name: rd.name, num: rd.num }, type: "reading", set: p.title, correct: correct, errors: errors, seconds: seconds, rate: rate, time: new Date().toISOString() };
        var prev = K3.rows("fluency", rd.num).filter(function (r) { return r.type === "reading"; }), all = prev.concat([K3.normFlu(obj, "local")]), pb = prev.length ? Math.max.apply(null, prev.map(function (r) { return r.rate; })) : 0;
        app.innerHTML = crumbs([["🏠 Home", "#/"], ["⚡ Fluency", "#/fluency"], ["📚 Reading Fluency", "#/fluency/reading"], ["Result", ""]]) + '<section class="card finish pop"><h1>' + (rate > pb && prev.length ? "🏅 New personal best!" : "📚 Great reading, " + esc(rd.name) + "!") + '</h1><p class="score-big"><b>' + rate + '</b> words correct per minute</p><div class="stats center-stats"><span class="stat">📖 <b>' + attempted + '</b> words read</span><span class="stat">✅ <b>' + correct + '</b> correct</span><span class="stat">🔁 <b>' + errors + '</b> missed</span><span class="stat">🎯 <b>' + acc + "%</b> accuracy</span></div>" +
          '<div class="bench"><div class="bench-row"><span>' + { fall: "🍂 Fall", winter: "❄️ Winter", spring: "🌸 Spring" }[b.season] + " goal</span><b>" + b.v + ' WCPM</b></div><div class="bench-bar" role="img" aria-label="' + rate + " compared with goal " + b.v + '"><span class="bb-me" style="width:' + clamp(100 * rate / (Math.max(b.v, rate) * 1.15), 2, 100) + '%"></span><i class="bb-goal" style="left:' + (100 * b.v / (Math.max(b.v, rate) * 1.15)) + '%"></i></div><p class="muted small">' + esc(NORM) + ".</p></div>" +
          '<p class="lead">' + (rate >= b.v ? "🎯 You are at or above the goal! Amazing!" : "Keep practicing! Every day you grow. 🌱") + '</p><p class="send-st" role="status">📤 Saving...</p><div class="row-btns"><button type="button" class="btn btn-gold" data-again>🔁 Read it again</button><a class="btn btn-ghost" href="#/fluency/reading">Pick a passage</a></div></section><div class="card">' + K3.readChart(all, "📖 " + rd.name + ": words correct per minute") + "</div>";
        confetti(); K3.say("Great reading! " + rate + " words correct per minute.");
        $("[data-again]").onclick = function () { run(p, rd); };
        K3.send("fluency", obj).then(function (st) { var e = $(".send-st"); if (e) e.innerHTML = sendStatusText(st); });
      }
    }
  }

  /* =====================================================================
     MY GOALS & DATA (student data notebook)
     ===================================================================== */
  function longestStreak(rows) {
    var days = {}; rows.forEach(function (r) { var k = dayKey(r.time); if (k) days[k] = 1; }); var list = Object.keys(days).sort(); if (!list.length) return 0;
    var best = 1, cur = 1;
    for (var i = 1; i < list.length; i++) { var d = new Date(list[i - 1] + "T12:00:00"), gapOk = true; d.setDate(d.getDate() + 1); while (dayKey(d) !== list[i]) { var wd = d.getDay(); if (wd !== 0 && wd !== 6) { gapOk = false; break; } d.setDate(d.getDate() + 1); if (dayKey(d) > list[i]) { gapOk = false; break; } } cur = gapOk ? cur + 1 : 1; best = Math.max(best, cur); }
    return best;
  }
  K3.longestStreak = longestStreak;
  function stdStatus(p, pass) { if (p == null) return { cls: "ns", txt: "Not started", ic: "○" }; if (p >= pass) return { cls: "ms", txt: "Mastered", ic: "★" }; return { cls: "pr", txt: "Practicing", ic: "◐" }; }
  K3.stdStatus = stdStatus;
  K3.badges = function (num) {
    var sc = K3.rows("scores", num), fl = K3.rows("fluency", num), bba = K3.bestByActivity(sc), nMast = Object.keys(bba).filter(function (k) { return bba[k].mastered; }).length;
    var pb = false; ["math", "reading"].forEach(function (ty) { var mx = null; fl.filter(function (r) { return r.type === ty; }).forEach(function (r) { if (mx != null && r.rate > mx) pb = true; mx = mx == null ? r.rate : Math.max(mx, r.rate); }); });
    var subjWith = SUBJECTS.filter(function (x) { return K3.ofSubject(x.id).length; }).map(function (x) { return x.id; }), tried = {}; sc.forEach(function (r) { tried[r.subject] = 1; });
    var mathMax = Math.max.apply(null, [0].concat(fl.filter(function (r) { return r.type === "math"; }).map(function (r) { return r.rate; })));
    return [
      { ic: "🚀", name: "First Step", how: "Finish your first activity", got: sc.length > 0 },
      { ic: "⭐", name: "Star Power", how: "Master 5 activities", got: nMast >= 5 },
      { ic: "🌟", name: "Super Star", how: "Master 10 activities", got: nMast >= 10 },
      { ic: "🏅", name: "Personal Best", how: "Beat your own fluency record", got: pb },
      { ic: "🔥", name: "5-Day Streak", how: "Practice 5 school days in a row", got: longestStreak(sc.concat(fl)) >= 5 },
      { ic: "📚", name: "Reader", how: "Do a reading fluency check", got: fl.some(function (r) { return r.type === "reading"; }) },
      { ic: "⚡", name: "Fact Fan", how: "Do 10 fact sprints", got: fl.filter(function (r) { return r.type === "math"; }).length >= 10 },
      { ic: "🎯", name: "Goal Getter", how: "Reach the math fact goal", got: mathMax >= CFG.goals.mathFactsPerMin },
      { ic: "🔁", name: "Reviewer", how: "Do 5 Daily Reviews", got: sc.filter(function (r) { return r.activity === "daily-review"; }).length >= 5 },
      { ic: "🌈", name: "Explorer", how: "Try every subject", got: subjWith.length > 0 && subjWith.every(function (x) { return tried[x]; }) }
    ];
  };
  function standardsGrid(best, compact) {
    return SUBJECTS.map(function (S) { var stds = K3.standards(S.id); if (!stds.length) return ""; return '<div class="sg-subj"><h3 class="h4">' + S.emoji + " " + S.name + '</h3><div class="sg">' + stds.map(function (sd) { var p = best[sd.code], pass = K3.passFor(sd.code), stt = stdStatus(p, pass); return '<div class="sg-c sg-' + stt.cls + '" title="' + esc(sd.code + ": " + sd.skill + " (" + stt.txt + (p != null ? ", best " + p + "%" : "") + ")") + '"><span class="sg-ic" aria-hidden="true">' + stt.ic + '</span><span class="sg-code">' + esc(sd.code) + "</span>" + (compact ? "" : '<span class="sg-skill">' + esc(sd.skill) + "</span>") + '<span class="sg-p">' + (p != null ? p + "%" : stt.txt) + '</span><span class="sr">' + stt.txt + "</span></div>"; }).join("") + "</div></div>"; }).join("");
  }
  K3.standardsGrid = standardsGrid;
  var LEGEND = '<p class="sg-legend"><span class="sg-c sg-ns mini">○ Not started</span><span class="sg-c sg-pr mini">◐ Practicing</span><span class="sg-c sg-ms mini">★ Mastered</span></p>';
  K3.sgLegend = LEGEND;

  K3.route("goals", function () {
    if (needStudent("#/goals")) return;
    var s = K3.student(), sc = K3.rows("scores", s.num), fl = K3.rows("fluency", s.num), best = K3.bestByStandard(sc), bba = K3.bestByActivity(sc);
    var mr = fl.filter(function (r) { return r.type === "math"; }), rr = fl.filter(function (r) { return r.type === "reading"; });
    var g = store.get("k3goal:" + s.num, { text: "", prog: 0 });
    var nStdM = Object.keys(best).filter(function (k) { return best[k] >= K3.passFor(k); }).length, badges = K3.badges(s.num), nB = badges.filter(function (b) { return b.got; }).length;
    app.innerHTML = crumbs([["🏠 Home", "#/"], ["🎯 My Goals & Data", ""]]) +
      '<div class="notebook"><header class="nb-head"><div><p class="eyebrow">My Data Notebook</p><h1>🎯 ' + esc(s.name) + "’s Goals & Data " + sayBtn("My goals and data. Here are my stars, my charts, and my badges.", "Read") + '</h1><p class="muted">' + esc(CFG.className) + " · " + esc(longDate()) + '</p></div><button type="button" class="btn btn-ghost noprint" data-act="print">🖨️ Print my data</button></header>' +
      '<div class="stats nb-stats"><span class="stat"><b>' + sc.length + '</b> activities</span><span class="stat"><b>' + nStdM + '</b> standards ⭐</span><span class="stat"><b>' + streak(s.num) + '</b> day streak 🔥</span><span class="stat"><b>' + (mr.length ? round(Math.max.apply(null, mr.map(function (r) { return r.rate; })), 0) : "-") + '</b> best facts/min</span><span class="stat"><b>' + (rr.length ? rr[rr.length - 1].rate : "-") + "</b> latest WCPM</span></div>" +
      '<section class="card goal-box"><h2>✍️ My goal ' + sayBtn("My goal. Type your goal. Then color in your progress.", "Read") + '</h2><label class="sr" for="k3-goal">My goal</label><textarea id="k3-goal" rows="2" placeholder="My goal is to...">' + esc(g.text) + '</textarea><div class="goal-starters noprint"><button type="button" class="tile-b sm" data-gs="My goal is to read ' + benchNow().v + ' words correct per minute.">📖 Reading goal</button><button type="button" class="tile-b sm" data-gs="My goal is to answer ' + CFG.goals.mathFactsPerMin + ' math facts in one minute.">🧮 Math facts goal</button><button type="button" class="tile-b sm" data-gs="My goal is to master 5 new standards.">⭐ Stars goal</button></div><p class="muted small">Color in your progress:</p><div class="goal-prog" role="group" aria-label="Goal progress">' + [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (k) { return '<button type="button" class="gp' + (k <= g.prog ? " on" : "") + '" data-gp="' + k + '" aria-pressed="' + (k <= g.prog) + '" aria-label="' + k * 10 + ' percent">' + (k === 10 ? "🏁" : "") + "</button>"; }).join("") + '</div><p class="goal-saved muted small" aria-live="polite"></p></section>' +
      '<div class="nb-charts"><section class="card">' + K3.mathChart(mr, "⚡ Math facts per minute") + '</section><section class="card">' + K3.readChart(rr, "📖 Words correct per minute") + "</section></div>" +
      '<section class="card"><h2>⭐ My stars by standard</h2>' + LEGEND + (K3.acts.length ? standardsGrid(best) : '<p class="muted">Activities are coming soon.</p>') + "</section>" +
      '<section class="card"><h2>🏆 My badge shelf <span class="muted small">' + nB + " of " + badges.length + '</span></h2><div class="shelf">' + badges.map(function (b) { return '<div class="badge' + (b.got ? " got" : "") + '" title="' + esc(b.how) + '"><span class="b-ic" aria-hidden="true">' + (b.got ? b.ic : "🔒") + '</span><b>' + esc(b.name) + '</b><small>' + esc(b.how) + '</small><span class="sr">' + (b.got ? "earned" : "not earned yet") + "</span></div>"; }).join("") + "</div></section>" +
      '<section class="card nb-recent"><h2>📋 My recent work</h2>' + (sc.length ? '<table class="tbl"><thead><tr><th scope="col">Date</th><th scope="col">Activity</th><th scope="col">Standard</th><th scope="col">Score</th></tr></thead><tbody>' + sc.slice(-8).reverse().map(function (r) { return "<tr><td>" + shortDate(r.time) + "</td><td>" + esc(r.title || r.activity) + "</td><td>" + esc(r.standard) + "</td><td>" + r.percent + "%" + (r.mastered ? " ⭐" : "") + "</td></tr>"; }).join("") + "</tbody></table>" : '<p class="muted">Nothing yet. Try an activity!</p>') + "</section></div>";
    function saveG() { store.set("k3goal:" + s.num, g); $(".goal-saved").textContent = "Saved ✓"; }
    var ta = $("#k3-goal"); ta.addEventListener("input", function () { g.text = ta.value; saveG(); });
    $$("[data-gs]").forEach(function (b) { b.onclick = function () { ta.value = g.text = b.getAttribute("data-gs"); saveG(); K3.say(g.text); }; });
    $$("[data-gp]").forEach(function (b) { b.onclick = function () { var k = +b.getAttribute("data-gp"); g.prog = g.prog === k ? k - 1 : k; $$("[data-gp]").forEach(function (x) { var on = +x.getAttribute("data-gp") <= g.prog; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on); }); saveG(); if (g.prog === 10) { confetti(); K3.say("You did it! Goal complete!"); } }; });
  });

  /* =====================================================================
     TEACHER AREA (passcode)
     ===================================================================== */
  function teacherGate(dest) {
    if (K3.isTeacher()) return false;
    app.innerHTML = crumbs([["🏠 Home", "#/"], ["🍎 Teacher", ""]]) + '<form class="card gate pop" autocomplete="off"><div class="big-emoji" aria-hidden="true">🍎</div><h1>Teacher sign in</h1><p class="muted">Enter the teacher passcode.</p><label class="sr" for="k3-pass">Passcode</label><input id="k3-pass" class="pass-in" type="password" inputmode="text" autocomplete="current-password" placeholder="Passcode"><p class="gate-msg" role="alert"></p><button type="submit" class="btn btn-xl">Open teacher area</button><p class="muted small">Students: <a href="#/signin">tap here to sign in</a>.</p></form>';
    var f = $(".gate"); $("#k3-pass").focus();
    f.onsubmit = function (e) { e.preventDefault(); var v = $("#k3-pass").value.trim(); if (v && v === String(CFG.teacherPasscode)) { K3.setTeacher(true); toast("🍎 Welcome, " + esc(CFG.teacher) + "!"); K3.render(); } else { $(".gate-msg").textContent = "That passcode is not right. Try again."; f.classList.add("shake"); setTimeout(function () { f.classList.remove("shake"); }, 450); } };
    return true;
  }
  var TCR = [["🏠 Home", "#/"], ["🍎 Teacher", "#/teacher"]];

  /* ---------- demo data (preview only, never saved or sent) ---------- */
  K3.makeDemo = function () {
    var r = rng("demo-" + today()), roster = CFG.students.length ? CFG.students : [{ name: "Demo Student", num: "100" }], scores = [], flu = [], now = Date.now(), DAY = 864e5;
    roster.forEach(function (s, si) {
      var ab = 0.35 + r() * 0.6, inactive = si % 7 === 3, lastDay = inactive ? 9 + Math.floor(r() * 10) : Math.floor(r() * 3);
      K3.acts.forEach(function (a, ai) { if (r() < 0.25) return; var tries = 1 + Math.floor(r() * 2); for (var k = 0; k < tries; k++) { var pct = Math.round(clamp((ab + (k * 0.12) + (r() - 0.5) * 0.4) * 100, 10, 100)), total = a.qs.length, score = round(total * pct / 100 * 2, 0) / 2; pct = Math.round(100 * score / total); scores.push({ student: { name: s.name, num: s.num }, activity: a.id, title: a.title, subject: a.subject, unit: a.unit, standard: a.standard, score: score, total: total, percent: pct, mastered: pct >= a.pass, mins: round(3 + r() * 9, 1), results: [], time: new Date(now - (lastDay + Math.floor(r() * 30)) * DAY - k * 3600e3).toISOString() }); } });
      var m0 = 8 + Math.floor(ab * 20), w0 = 50 + Math.floor(ab * 60);
      for (var w = 7; w >= 0; w--) { var t = new Date(now - (lastDay + w * 5) * DAY).toISOString(); var mr = Math.max(0, Math.round(m0 + (7 - w) * (1 + r() * 2) + (r() - 0.5) * 4)); flu.push({ student: { name: s.name, num: s.num }, type: "math", set: "Multiplication 0-10 mixed", correct: mr, errors: Math.floor(r() * 4), seconds: 60, rate: mr, time: t }); if (w % 2 === 0) { var wr = Math.round(w0 + (7 - w) * (1.5 + r() * 2)); flu.push({ student: { name: s.name, num: s.num }, type: "reading", set: (K3.passages[w % Math.max(1, K3.passages.length)] || { title: "Passage" }).title, correct: wr, errors: Math.floor(r() * 6), seconds: 60, rate: wr, time: new Date(Date.parse(t) + 600e3).toISOString() }); } }
    });
    return { scores: scores, fluency: flu };
  };

  function dashData(subj) {
    var roster = K3.roster(), sc = K3.rows("scores"), fl = K3.rows("fluency"), bests = {}, last = {}, stdMap = {}, stds = [];
    K3.standards(subj === "all" ? null : subj).forEach(function (s) { stdMap[s.code] = s; stds.push(s); });
    sc.forEach(function (r) { if (!r.standard || r.standard === "MIXED") return; if (!stdMap[r.standard] && (subj === "all" || r.subject === subj)) { stdMap[r.standard] = { code: r.standard, subject: r.subject, skill: r.title, acts: [] }; stds.push(stdMap[r.standard]); } });
    sc.forEach(function (r) { var b = bests[r.num] || (bests[r.num] = {}); if (r.standard && r.standard !== "MIXED") b[r.standard] = Math.max(b[r.standard] == null ? -1 : b[r.standard], r.percent); });
    sc.concat(fl).forEach(function (r) { var t = Date.parse(r.time) || 0; if (!last[r.num] || t > last[r.num]) last[r.num] = t; });
    return { roster: roster, sc: sc, fl: fl, bests: bests, last: last, stds: stds, stdMap: stdMap };
  }
  K3.dashData = dashData;
  function classAvg(D) { return D.stds.map(function (s) { var vals = D.roster.map(function (st) { return (D.bests[st.num] || {})[s.code]; }).filter(function (v) { return v != null && v >= 0; }), pass = K3.passFor(s.code); return { s: s, n: vals.length, avg: vals.length ? Math.round(vals.reduce(function (a, b) { return a + b; }, 0) / vals.length) : null, m: vals.filter(function (v) { return v >= pass; }).length }; }); }
  function csv(rows, cols) { return [cols.join(",")].concat(rows.map(function (r) { return cols.map(function (c) { var v = r[c]; if (Array.isArray(v)) v = v.join(" "); v = String(v == null ? "" : v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }).join(","); })).join("\n"); }
  function download(name, text) { try { var b = new Blob(["﻿" + text], { type: "text/csv;charset=utf-8" }), a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500); toast("⬇️ Downloaded " + esc(name)); } catch (e) { toast("Download did not work on this device."); } }
  K3.csv = csv;
  function ago(t) { if (!t) return "Never"; var d = Math.floor((Date.now() - t) / 864e5); return d <= 0 ? "Today" : d === 1 ? "Yesterday" : d + " days ago"; }

  K3.route("teacher", function (page, arg, arg2) {
    if (teacherGate()) return;
    if (page === "dash") return dashboard(arg || "overview", arg2);
    if (page === "student") return studentReport(arg);
    if (page === "tools") return tools(arg);
    if (page === "letter") return letter(arg);
    var D = dashData("all");
    app.innerHTML = crumbs([["🏠 Home", "#/"], ["🍎 Teacher", ""]]) + "<h1>🍎 Teacher area</h1><p class=\"lead\">Hi, " + esc(CFG.teacher) + "! " + (CFG.scriptUrl ? "☁️ Connected to your Google Sheet." : "💾 Preview mode: data stays on this device until you add your Sheet URL in <code>k3-config.js</code>.") + "</p>" +
      '<div class="tiles tiles-3"><a class="tile wide" href="#/teacher/dash"><span class="tile-ic" aria-hidden="true">📊</span><span class="tile-name">Dashboard<small>Mastery, fluency, small groups</small></span></a><a class="tile wide" href="#/teacher/tools"><span class="tile-ic" aria-hidden="true">🧰</span><span class="tile-name">Class Tools<small>Name picker, timer, voice levels, groups</small></span></a><a class="tile wide" href="#/fluency/reading"><span class="tile-ic" aria-hidden="true">📚</span><span class="tile-name">Reading Check<small>Run a WCPM check for any student</small></span></a><a class="tile wide" href="#/teacher/tools/letters"><span class="tile-ic" aria-hidden="true">✉️</span><span class="tile-name">Parent Letters<small>English & Spanish</small></span></a><a class="tile wide" href="setup.html"><span class="tile-ic" aria-hidden="true">⚙️</span><span class="tile-name">Setup Guide<small>Connect your Google Sheet</small></span></a><a class="tile wide" href="#/teacher/dash/students"><span class="tile-ic" aria-hidden="true">🧑‍🎓</span><span class="tile-name">Student Reports<small>Print for conferences</small></span></a></div>' +
      '<div class="card"><h2>📦 Content loaded</h2><ul class="content-list">' + SUBJECTS.map(function (S) { return "<li>" + S.emoji + " <b>" + S.name + "</b>: " + K3.ofSubject(S.id).length + " activities, " + K3.standards(S.id).length + " standards</li>"; }).join("") + "<li>📚 <b>Fluency passages</b>: " + K3.passages.length + "</li><li>🧑‍🎓 <b>Students</b>: " + CFG.students.length + " · 🗂️ <b>Rows on this device</b>: " + D.sc.length + " scores, " + D.fl.length + " fluency</li></ul></div>";
  });

  function dataBar() {
    var src = K3.demo ? '🧪 <b>Demo data</b> (pretend, not saved)' : K3.sheet ? '☁️ Sheet data from ' + esc(new Date(K3.sheet.at).toLocaleString()) + " + this device" : "💾 Data from <b>this device</b>";
    return '<div class="databar noprint"><span>' + src + '</span><span class="db-btns">' + (CFG.scriptUrl ? '<button type="button" class="btn sm" data-d="load">☁️ Load from Sheet</button>' : "") + '<button type="button" class="btn btn-ghost sm" data-d="demo">' + (K3.demo ? "Hide demo data" : "🧪 Show demo data") + '</button><button type="button" class="btn btn-ghost sm" data-act="print">🖨️ Print</button></span></div>';
  }
  function bindDataBar() {
    $$("[data-d]").forEach(function (b) { b.onclick = function () {
      var w = b.getAttribute("data-d");
      if (w === "demo") { K3.demo = K3.demo ? null : K3.makeDemo(); K3.render(); }
      if (w === "load") { b.disabled = true; b.textContent = "Loading..."; K3.fetchSheet(CFG.teacherPasscode).then(function () { toast("☁️ Loaded from your Sheet!"); K3.render(); }).catch(function (e) { toast("⚠️ " + esc(e.message || e)); b.disabled = false; b.textContent = "☁️ Load from Sheet"; }); }
    }; });
  }

  function dashboard(tab, arg) {
    var subj = K3._dsubj || "all", D = dashData(subj), tabs = [["overview", "🗺️ Mastery"], ["fluency", "⚡ Fluency"], ["groups", "👥 Small Groups"], ["students", "🧑‍🎓 Students"], ["export", "⬇️ Export"]];
    var head = crumbs(TCR.concat([["📊 Dashboard", ""]])) + '<h1>📊 Class Dashboard</h1>' + dataBar() + '<nav class="tabs noprint" aria-label="Dashboard sections">' + tabs.map(function (t) { return '<a href="#/teacher/dash/' + t[0] + '" class="tab' + (t[0] === tab ? " on" : "") + '"' + (t[0] === tab ? ' aria-current="page"' : "") + ">" + t[1] + "</a>"; }).join("") + "</nav>";
    var subjSel = '<label class="field noprint">Subject: <select id="k3-subj"><option value="all">All subjects</option>' + SUBJECTS.map(function (S) { return '<option value="' + S.id + '"' + (subj === S.id ? " selected" : "") + ">" + S.emoji + " " + S.name + "</option>"; }).join("") + "</select></label>";
    var body = "";
    if (tab === "overview") {
      var avgs = classAvg(D).filter(function (a) { return a.n; }).sort(function (a, b) { return a.avg - b.avg; });
      var inactive = D.roster.filter(function (s) { return !D.last[s.num] || Date.now() - D.last[s.num] > 7 * 864e5; });
      body = '<section class="card"><div class="card-h"><h2>🗺️ Class mastery heatmap</h2>' + subjSel + '</div><p class="muted small">Best score per student per standard. Tap a name for a report.</p>' + heatLegend() + heatmap(D) + "</section>" +
        '<div class="two"><section class="card"><h2>📉 Lowest class averages</h2>' + (avgs.length ? K3.barList(avgs.slice(0, 8).map(function (a) { return { label: '<a href="#/teacher/dash/groups/' + encodeURIComponent(a.s.code) + '"><b>' + esc(a.s.code) + "</b></a> <span class=\"muted\">" + esc(a.s.skill || "") + "</span>", v: a.avg, cls: a.avg >= K3.passFor(a.s.code) ? "ok" : a.avg >= 60 ? "mid" : "low" }; }), 100, "%") + '<p class="muted small">Average of each student’s best score (students who tried). Tap a standard to make a small group.</p>' : '<p class="muted">No scores yet.</p>') + "</section>" +
        '<section class="card"><h2>😴 Not active in 7 days <span class="pill">' + inactive.length + "</span></h2>" + (inactive.length ? '<ul class="inactive">' + inactive.map(function (s) { return '<li><a href="#/teacher/student/' + encodeURIComponent(s.num) + '">' + esc(s.name) + '</a><span class="muted">' + ago(D.last[s.num]) + "</span></li>"; }).join("") + "</ul>" : '<p>🎉 Everyone has practiced this week!</p>') + "</section></div>";
    }
    if (tab === "fluency") {
      var who = K3._fstu || (D.roster[0] && D.roster[0].num), wr = D.roster.filter(function (s) { return s.num === who; })[0];
      body = '<section class="card"><h2>⚡ Fluency by student</h2><div class="tbl-wrap"><table class="tbl flu-tbl"><thead><tr><th scope="col">Student</th><th scope="col">Math latest</th><th scope="col">Math best</th><th scope="col">Math trend</th><th scope="col">WCPM latest</th><th scope="col">WCPM growth</th><th scope="col">WCPM trend</th><th scope="col">vs. ' + benchNow().season + " norm</th></tr></thead><tbody>" + D.roster.map(function (s) {
        var m = D.fl.filter(function (r) { return r.num === s.num && r.type === "math"; }), rd = D.fl.filter(function (r) { return r.num === s.num && r.type === "reading"; }), lastR = rd.length ? rd[rd.length - 1].rate : null, bn = benchNow().v;
        return '<tr><th scope="row"><button type="button" class="link-btn" data-fs="' + esc(s.num) + '">' + esc(s.name) + "</button></th><td>" + (m.length ? round(m[m.length - 1].rate, 0) : "-") + "</td><td>" + (m.length ? round(Math.max.apply(null, m.map(function (r) { return r.rate; })), 0) : "-") + "</td><td>" + K3.spark(m.map(function (r) { return r.rate; })) + "</td><td>" + (lastR != null ? lastR : "-") + "</td><td>" + (rd.length > 1 ? signed(lastR - rd[0].rate) : "-") + "</td><td>" + K3.spark(rd.map(function (r) { return r.rate; })) + "</td><td>" + (lastR == null ? "-" : lastR >= bn ? '<span class="pill ok">✓ at/above</span>' : '<span class="pill low">' + (lastR - bn) + "</span>") + "</td></tr>";
      }).join("") + '</tbody></table></div><p class="muted small">Norm: ' + esc(NORM) + ": fall " + CFG.goals.readingWCPM.fall + ", winter " + CFG.goals.readingWCPM.winter + ", spring " + CFG.goals.readingWCPM.spring + ". Math goal: " + CFG.goals.mathFactsPerMin + " facts per minute.</p></section>" +
        (wr ? '<section class="card"><div class="card-h"><h2>📈 Growth: ' + esc(wr.name) + '</h2><label class="field noprint">Student: <select id="k3-fsel">' + D.roster.map(function (s) { return '<option value="' + esc(s.num) + '"' + (s.num === who ? " selected" : "") + ">" + esc(s.name) + "</option>"; }).join("") + '</select></label></div><div class="nb-charts"><div>' + K3.mathChart(D.fl.filter(function (r) { return r.num === who && r.type === "math"; })) + "</div><div>" + K3.readChart(D.fl.filter(function (r) { return r.num === who && r.type === "reading"; })) + "</div></div></section>" : "");
    }
    if (tab === "groups") body = groupsTab(D, arg, subjSel);
    if (tab === "students") body = '<section class="card"><h2>🧑‍🎓 Student reports</h2><p class="muted">Tap a student to open a printable report for a parent conference.</p><div class="names">' + D.roster.map(function (s) { var b = D.bests[s.num] || {}, n = Object.keys(b).filter(function (k) { return b[k] >= K3.passFor(k); }).length; return '<a class="name-btn" href="#/teacher/student/' + encodeURIComponent(s.num) + '"><span class="av" aria-hidden="true" style="background:' + avColor(s.num) + '">' + esc(initials(s.name)) + "</span><span>" + esc(s.name) + '<small class="muted"> ⭐ ' + n + "</small></span></a>"; }).join("") + "</div></section>";
    if (tab === "export") body = '<section class="card"><h2>⬇️ Export CSV</h2><p class="muted">Opens in Google Sheets or Excel. Includes ' + (K3.demo ? "demo" : K3.sheet ? "Sheet + device" : "device") + " data.</p><div class=\"row-btns left\"><button type=\"button\" class=\"btn\" data-x=\"scores\">📄 Scores (" + D.sc.length + ' rows)</button><button type="button" class="btn" data-x="fluency">⚡ Fluency (' + D.fl.length + ' rows)</button><button type="button" class="btn" data-x="mastery">🗺️ Mastery table</button></div></section>';
    app.innerHTML = head + body;
    bindDataBar();
    var ss = $("#k3-subj"); if (ss) ss.onchange = function () { K3._dsubj = ss.value; K3.render(); };
    var fs = $("#k3-fsel"); if (fs) fs.onchange = function () { K3._fstu = fs.value; K3.render(); };
    $$("[data-fs]").forEach(function (b) { b.onclick = function () { K3._fstu = b.getAttribute("data-fs"); K3.render(); setTimeout(function () { var c = $("#k3-fsel"); if (c) c.scrollIntoView({ block: "center" }); }, 50); }; });
    var gs = $("#k3-gstd"); if (gs) gs.onchange = function () { K3.go("#/teacher/dash/groups/" + encodeURIComponent(gs.value)); };
    $$("[data-x]").forEach(function (b) { b.onclick = function () {
      var x = b.getAttribute("data-x"), d = today();
      if (x === "scores") download("scores-" + d + ".csv", csv(D.sc.map(function (r) { return Object.assign({}, r, { date: r.time, student: r.name }); }), ["date", "student", "num", "subject", "unit", "standard", "activity", "title", "score", "total", "percent", "mastered", "mins", "results"]));
      if (x === "fluency") download("fluency-" + d + ".csv", csv(D.fl.map(function (r) { return Object.assign({}, r, { date: r.time, student: r.name }); }), ["date", "student", "num", "type", "set", "correct", "errors", "seconds", "rate"]));
      if (x === "mastery") { var all = dashData("all"), cols = ["student", "num"].concat(all.stds.map(function (s) { return s.code; })); download("mastery-" + d + ".csv", csv(all.roster.map(function (s) { var o = { student: s.name, num: s.num }, b = all.bests[s.num] || {}; all.stds.forEach(function (st) { o[st.code] = b[st.code] != null && b[st.code] >= 0 ? b[st.code] : ""; }); return o; }), cols)); }
    }; });
  }
  function signed(v) { v = Math.round(v); return v > 0 ? '<span class="up">▲ ' + v + "</span>" : v < 0 ? '<span class="down">▼ ' + -v + "</span>" : "0"; }
  function heatLegend() { return '<p class="heat-legend"><span class="hc h-none">–</span> not started <span class="hc h-x">&lt;40</span><span class="hc h-l">40–59</span><span class="hc h-p">60+</span><span class="hc h-m">★ pass</span> mastered</p>'; }
  function heatmap(D) {
    if (!D.stds.length) return '<p class="muted">No standards yet for this subject.</p>';
    return '<div class="heat-wrap" tabindex="0" role="region" aria-label="Mastery heatmap, scroll sideways"><table class="heat"><thead><tr><th scope="col" class="hm-name">Student</th>' + D.stds.map(function (s) { return '<th scope="col" class="hm-std" title="' + esc(s.code + ": " + (s.skill || "")) + '"><span>' + esc(s.code) + "</span></th>"; }).join("") + "</tr></thead><tbody>" +
      D.roster.map(function (st) { var b = D.bests[st.num] || {}; return '<tr><th scope="row" class="hm-name"><a href="#/teacher/student/' + encodeURIComponent(st.num) + '">' + esc(st.name) + "</a></th>" + D.stds.map(function (s) { var p = b[s.code], pass = K3.passFor(s.code); return '<td class="hc ' + heatClass(p, pass) + '" title="' + esc(st.name + " · " + s.code + ": " + (p != null && p >= 0 ? p + "%" : "not started")) + '">' + (p != null && p >= 0 ? (p >= pass ? "★" : "") + p : "–") + "</td>"; }).join("") + "</tr>"; }).join("") +
      '</tbody><tfoot><tr><th scope="row" class="hm-name">Class avg</th>' + classAvg(D).map(function (a) { return '<td class="hc ' + heatClass(a.avg, K3.passFor(a.s.code)) + '">' + (a.avg != null ? a.avg : "–") + "</td>"; }).join("") + "</tr></tfoot></table></div>";
  }
  function groupsTab(D, std, subjSel) {
    var all = classAvg(D).filter(function (a) { return a.n; }).sort(function (a, b) { return a.avg - b.avg; });
    if (!D.stds.length) return '<section class="card"><h2>👥 Small groups</h2><p class="muted">No standards yet.</p></section>';
    std = std && D.stdMap[std] ? std : (all[0] ? all[0].s.code : D.stds[0].code);
    var s = D.stdMap[std], pass = K3.passFor(std), G = { ns: [], low: [], mid: [], ok: [] };
    D.roster.forEach(function (st) { var p = (D.bests[st.num] || {})[std]; if (p == null || p < 0) G.ns.push([st, null]); else if (p >= pass) G.ok.push([st, p]); else if (p < 60) G.low.push([st, p]); else G.mid.push([st, p]); });
    var acts = K3.acts.filter(function (a) { return a.standard === std; });
    function card(title, list, cls, tip) { return '<article class="gcard ' + cls + '"><header><p class="eyebrow">' + esc(std) + " · " + esc(title) + "</p><h3>" + esc(s.skill || "") + '</h3></header><ul class="gnames">' + (list.length ? list.map(function (x) { return "<li>" + esc(x[0].name) + (x[1] != null ? ' <span class="muted">' + x[1] + "%</span>" : "") + "</li>"; }).join("") : '<li class="muted">Nobody here 🎉</li>') + '</ul><p class="gtip">💡 ' + tip + "</p>" + (acts.length ? '<p class="small"><b>Practice:</b> ' + acts.map(function (a) { return esc(a.emoji + " " + a.title); }).join(", ") + "</p>" : "") + '<div class="gnotes"><span>Notes:</span></div></article>'; }
    return '<section class="card"><div class="card-h"><h2>👥 Small groups</h2><div class="noprint row-inline">' + subjSel + '<label class="field">Standard: <select id="k3-gstd">' + D.stds.map(function (x) { var a = all.filter(function (y) { return y.s.code === x.code; })[0]; return '<option value="' + esc(x.code) + '"' + (x.code === std ? " selected" : "") + ">" + esc(x.code) + (a ? " (avg " + a.avg + "%)" : "") + "</option>"; }).join("") + '</select></label><button type="button" class="btn sm" data-act="print">🖨️ Print group cards</button></div></div>' +
      '<p class="muted small noprint">Students below ' + pass + "% on <b>" + esc(std) + "</b> are grouped for reteaching. Mastered students can be peer helpers.</p>" +
      '<div class="gcards">' + card("Reteach (below 60%)", G.low, "g-low", "Reteach with objects or pictures. Do the Learn It cards together.") + card("Almost there (60–" + (pass - 1) + "%)", G.mid, "g-mid", "Quick guided practice. Talk through each mistake.") + card("Not started", G.ns, "g-ns", "Assign the activity. Check in after.") + card("Mastered: peer helpers", G.ok, "g-ok", "Challenge task, or invite them to coach a partner.") + "</div></section>";
  }

  /* ---------- per-student report (printable) ---------- */
  function studentReport(num) {
    var st = K3.roster().filter(function (s) { return s.num === String(num); })[0];
    if (!st) { app.innerHTML = '<div class="card center"><h1>Student not found</h1><a class="btn" href="#/teacher/dash/students">← Students</a></div>'; return; }
    var sc = K3.rows("scores", st.num), fl = K3.rows("fluency", st.num), best = K3.bestByStandard(sc), mr = fl.filter(function (r) { return r.type === "math"; }), rr = fl.filter(function (r) { return r.type === "reading"; });
    var nM = Object.keys(best).filter(function (k) { return best[k] >= K3.passFor(k); }).length, nP = Object.keys(best).length - nM, totalStd = K3.standards().length, badges = K3.badges(st.num).filter(function (b) { return b.got; });
    var strengths = Object.keys(best).filter(function (k) { return best[k] >= K3.passFor(k); }).slice(0, 5), needs = Object.keys(best).filter(function (k) { return best[k] < K3.passFor(k); }).sort(function (a, b) { return best[a] - best[b]; }).slice(0, 5);
    function skillOf(code) { var a = K3.acts.filter(function (x) { return x.standard === code; })[0]; return a ? a.skill : ""; }
    var note = store.get("k3note:" + st.num, "");
    app.innerHTML = crumbs(TCR.concat([["📊 Dashboard", "#/teacher/dash/students"], [esc(st.name), ""]])) + dataBar() +
      '<article class="report"><header class="rep-head"><div><p class="eyebrow">Student Progress Report</p><h1>' + esc(st.name) + '</h1><p class="muted">' + esc(CFG.className) + " · " + esc(CFG.school) + " · " + esc(longDate()) + '</p></div><div class="rep-logo" aria-hidden="true">' + esc(CFG.mascot || "⭐") + "</div></header>" +
      '<div class="stats"><span class="stat"><b>' + nM + "</b> of " + totalStd + ' standards mastered</span><span class="stat"><b>' + nP + '</b> practicing</span><span class="stat"><b>' + sc.length + '</b> activities done</span><span class="stat"><b>' + (mr.length ? round(mr[mr.length - 1].rate, 0) : "-") + '</b> math facts/min</span><span class="stat"><b>' + (rr.length ? rr[rr.length - 1].rate : "-") + "</b> WCPM</span></div>" +
      '<div class="two"><section class="card"><h2>💪 Strengths</h2>' + (strengths.length ? "<ul>" + strengths.map(function (k) { return "<li><b>" + esc(k) + "</b> " + esc(skillOf(k)) + " (" + best[k] + "%)</li>"; }).join("") + "</ul>" : '<p class="muted">Keep practicing to show strengths!</p>') + '</section><section class="card"><h2>🌱 Next steps</h2>' + (needs.length ? "<ul>" + needs.map(function (k) { return "<li><b>" + esc(k) + "</b> " + esc(skillOf(k)) + " (" + best[k] + "%)</li>"; }).join("") + "</ul>" : '<p class="muted">No open next steps yet.</p>') + "</section></div>" +
      '<div class="nb-charts"><section class="card">' + K3.mathChart(mr) + '</section><section class="card">' + K3.readChart(rr) + "</section></div>" +
      '<section class="card"><h2>⭐ Mastery by standard</h2>' + K3.sgLegend + K3.standardsGrid(best) + "</section>" +
      (badges.length ? '<section class="card"><h2>🏆 Badges earned</h2><p class="rep-badges">' + badges.map(function (b) { return '<span class="pill">' + b.ic + " " + esc(b.name) + "</span>"; }).join(" ") + "</p></section>" : "") +
      '<section class="card"><h2>📝 Notes for the family</h2><label class="sr" for="k3-note">Teacher notes</label><textarea id="k3-note" rows="4" placeholder="Type notes for the conference...">' + esc(note) + '</textarea></section>' +
      '<section class="card"><h2>🏠 How to help at home</h2><ul><li>Read together for 20 minutes every day, in English or your home language.</li><li>Have your child do the <b>Daily Review</b> and a <b>Fact Sprint</b> on our class website.</li><li>Look at <b>My Goals & Data</b> together and celebrate growth.</li></ul></section></article>';
    bindDataBar();
    $("#k3-note").addEventListener("input", function () { store.set("k3note:" + st.num, this.value); });
  }

  /* ---------- tools ---------- */
  function tools(which) {
    var list = [["picker", "🎲", "Name Picker", "No repeats until everyone is picked"], ["timer", "⏳", "Countdown Timer", "Big timer for the projector"], ["voice", "🔊", "Voice Levels", "0 to 4 voice chart"], ["groups", "👥", "Group Maker", "Random or by data"], ["letters", "✉️", "Parent Letters", "English & Spanish"]];
    if (!which) { app.innerHTML = crumbs(TCR.concat([["🧰 Tools", ""]])) + '<h1>🧰 Class Tools</h1><div class="tiles tiles-3">' + list.map(function (t) { return '<a class="tile wide" href="#/teacher/tools/' + t[0] + '"><span class="tile-ic" aria-hidden="true">' + t[1] + '</span><span class="tile-name">' + t[2] + "<small>" + t[3] + "</small></span></a>"; }).join("") + "</div>"; return; }
    var meta = list.filter(function (t) { return t[0] === which; })[0] || list[0], head = crumbs(TCR.concat([["🧰 Tools", "#/teacher/tools"], [meta[1] + " " + meta[2], ""]]));
    ({ picker: picker, timer: cdTimer, voice: voiceChart, groups: groupMaker, letters: letters })[meta[0]](head);
  }
  function picker(head) {
    var roster = CFG.students, st = store.get("k3picker", null);
    if (!st || !Array.isArray(st.left)) st = { left: roster.map(function (s) { return s.num; }), picked: [] };
    st.left = st.left.filter(function (n) { return roster.some(function (s) { return s.num === n; }); });
    function nameOf(n) { var s = roster.filter(function (x) { return x.num === n; })[0]; return s ? s.name : n; }
    app.innerHTML = head + '<div class="tool picker"><div class="pick-show" aria-live="assertive">' + (st.picked.length ? esc(nameOf(st.picked[st.picked.length - 1])) : "🎲 Ready!") + '</div><div class="row-btns"><button type="button" class="btn btn-gold btn-xl" data-pk="go">🎲 Pick a name</button><button type="button" class="btn btn-ghost" data-pk="reset">↺ Start over</button></div><p class="pick-left center muted"></p><div class="pick-list"></div></div>';
    function draw() { $(".pick-left").textContent = st.left.length + " of " + roster.length + " not picked yet"; $(".pick-list").innerHTML = st.picked.map(function (n) { return '<span class="pill">' + esc(nameOf(n)) + "</span>"; }).join(" "); }
    draw(); var spin = null; K3.onLeave(function () { clearInterval(spin); });
    $('[data-pk="go"]').onclick = function () {
      if (!roster.length) return; if (!st.left.length) { st.left = roster.map(function (s) { return s.num; }); st.picked = []; toast("🔄 Everyone was picked. Starting a new round!"); }
      var b = this; b.disabled = true; var k = 0, show = $(".pick-show"); show.classList.add("spinning");
      clearInterval(spin); spin = setInterval(function () { show.textContent = nameOf(st.left[Math.floor(Math.random() * st.left.length)]); if (++k > (FAST ? 2 : 14)) { clearInterval(spin); var i = Math.floor(Math.random() * st.left.length), n = st.left.splice(i, 1)[0]; st.picked.push(n); store.set("k3picker", st); show.textContent = nameOf(n); show.classList.remove("spinning"); show.classList.add("picked"); setTimeout(function () { show.classList.remove("picked"); }, 600); b.disabled = false; draw(); K3.say(nameOf(n)); } }, 70);
    };
    $('[data-pk="reset"]').onclick = function () { st = { left: roster.map(function (s) { return s.num; }), picked: [] }; store.set("k3picker", st); $(".pick-show").textContent = "🎲 Ready!"; draw(); };
  }
  function cdTimer(head) {
    var total = store.get("k3timer", 300), left = total, run = false, end = 0, h = null;
    app.innerHTML = head + '<div class="tool timer-tool"><div class="ring-wrap"><svg class="ring" viewBox="0 0 220 220" aria-hidden="true"><circle cx="110" cy="110" r="96" class="ring-bg"/><circle cx="110" cy="110" r="96" class="ring-fg" transform="rotate(-90 110 110)"/></svg><div class="cd" role="timer" aria-live="off"></div></div><div class="row-btns"><button type="button" class="btn btn-gold btn-xl" data-t="go">▶️ Start</button><button type="button" class="btn btn-ghost" data-t="reset">↺ Reset</button><button type="button" class="btn btn-ghost" data-t="full">⛶ Full screen</button></div><div class="row-btns presets">' + [1, 2, 3, 5, 10, 15, 20].map(function (m) { return '<button type="button" class="btn sm btn-ghost" data-m="' + m + '">' + m + " min</button>"; }).join("") + '<button type="button" class="btn sm btn-ghost" data-add="-30">−30s</button><button type="button" class="btn sm btn-ghost" data-add="30">+30s</button></div></div>';
    var C = 2 * Math.PI * 96, fg = $(".ring-fg"); fg.style.strokeDasharray = C;
    function fmt(s) { s = Math.max(0, Math.ceil(s)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }
    function draw() { $(".cd").textContent = fmt(left); fg.style.strokeDashoffset = C * (1 - (total ? left / total : 0)); $(".timer-tool").classList.toggle("low", left <= 10 && left > 0); $(".timer-tool").classList.toggle("over", left <= 0); $('[data-t="go"]').innerHTML = run ? "⏸️ Pause" : "▶️ Start"; }
    function tick() { left = Math.max(0, (end - Date.now()) / 1000); if (left <= 0) { run = false; clearInterval(h); beep(); K3.say("Time is up!"); } draw(); }
    $('[data-t="go"]').onclick = function () { if (run) { run = false; clearInterval(h); } else { if (left <= 0) left = total; run = true; end = Date.now() + left * 1000; clearInterval(h); h = setInterval(tick, 200); } draw(); };
    $('[data-t="reset"]').onclick = function () { run = false; clearInterval(h); left = total; draw(); };
    $('[data-t="full"]').onclick = function () { var el = $(".timer-tool"); try { if (document.fullscreenElement) document.exitFullscreen(); else (el.requestFullscreen || el.webkitRequestFullscreen).call(el); } catch (e) {} };
    $$("[data-m]").forEach(function (b) { b.onclick = function () { total = left = +b.getAttribute("data-m") * 60; store.set("k3timer", total); run = false; clearInterval(h); draw(); }; });
    $$("[data-add]").forEach(function (b) { b.onclick = function () { var a = +b.getAttribute("data-add"); left = Math.max(0, left + a); total = Math.max(total, left); if (run) end = Date.now() + left * 1000; draw(); }; });
    K3.onLeave(function () { clearInterval(h); });
    draw();
  }
  function beep() { try { var A = window.AudioContext || window.webkitAudioContext; if (!A) return; var c = new A(); [0, 0.35, 0.7].forEach(function (t) { var o = c.createOscillator(), g = c.createGain(); o.frequency.value = 880; o.connect(g); g.connect(c.destination); g.gain.setValueAtTime(0.001, c.currentTime + t); g.gain.exponentialRampToValueAtTime(0.4, c.currentTime + t + 0.02); g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + t + 0.3); o.start(c.currentTime + t); o.stop(c.currentTime + t + 0.32); }); } catch (e) {} }
  K3.beep = beep;
  var VOICES = [[0, "🤫", "Silent", "Silencio", "No talking. Show me with your eyes."], [1, "🤏", "Whisper", "Susurro", "Only your neighbor can hear you."], [2, "👥", "Partner Talk", "Voz de compañero", "Talk with one partner. Soft voice."], [3, "🗣️", "Group Talk", "Voz de grupo", "Your table group can hear you."], [4, "📣", "Outside Voice", "Voz de afuera", "For recess and P.E. only!"]];
  function voiceChart(head) {
    var cur = store.get("k3voice", 0);
    app.innerHTML = head + '<div class="tool voice"><div class="voice-now" aria-live="polite"></div><div class="voice-list" role="radiogroup" aria-label="Voice level">' + VOICES.map(function (v) { return '<button type="button" role="radio" class="vl vl-' + v[0] + '" data-v="' + v[0] + '"><span class="vl-n">' + v[0] + '</span><span class="vl-ic" aria-hidden="true">' + v[1] + '</span><span class="vl-t"><b>' + v[2] + "</b><small>" + v[3] + "</small></span></button>"; }).join("") + "</div></div>";
    function draw() { var v = VOICES[cur]; $(".voice-now").className = "voice-now vl-" + cur; $(".voice-now").innerHTML = '<span class="vn-n">' + v[0] + '</span><span class="vn-ic" aria-hidden="true">' + v[1] + '</span><span><b>' + v[2] + "</b><small>" + v[3] + "</small><em>" + v[4] + "</em></span>"; $$(".vl").forEach(function (b) { b.setAttribute("aria-checked", +b.getAttribute("data-v") === cur); }); }
    $$(".vl").forEach(function (b) { b.onclick = function () { cur = +b.getAttribute("data-v"); store.set("k3voice", cur); draw(); K3.say("Voice level " + cur + ". " + VOICES[cur][2] + ". " + VOICES[cur][4]); }; });
    draw();
  }
  function groupMaker(head) {
    var roster = CFG.students, absent = {}, opt = store.get("k3gm", { n: 4, mode: "random" });
    app.innerHTML = head + '<div class="tool gm"><div class="card"><div class="row-inline"><label class="field">Number of groups: <select id="gm-n">' + [2, 3, 4, 5, 6, 7, 8].map(function (n) { return "<option" + (n === opt.n ? " selected" : "") + ">" + n + "</option>"; }).join("") + '</select></label><label class="field">How: <select id="gm-mode"><option value="random">🎲 Random</option><option value="mixed">🌈 Mixed levels (by data)</option><option value="same">🎯 Same levels (by data)</option></select></label><button type="button" class="btn btn-gold" data-gm>👥 Make groups</button><button type="button" class="btn btn-ghost sm" data-act="print">🖨️ Print</button></div><p class="muted small">Tap a name to mark them absent.</p><div class="gm-names">' + roster.map(function (s) { return '<button type="button" class="tile-b sm" data-ab="' + esc(s.num) + '" aria-pressed="true">' + esc(s.name) + "</button>"; }).join("") + '</div></div><div class="gm-out"></div></div>';
    $("#gm-mode").value = opt.mode;
    $$("[data-ab]").forEach(function (b) { b.onclick = function () { var n = b.getAttribute("data-ab"); absent[n] = !absent[n]; b.setAttribute("aria-pressed", !absent[n]); b.classList.toggle("absent", !!absent[n]); }; });
    $("[data-gm]").onclick = function () {
      opt = { n: +$("#gm-n").value, mode: $("#gm-mode").value }; store.set("k3gm", opt);
      var here = roster.filter(function (s) { return !absent[s.num]; }), D = dashData("all"), avg = {};
      here.forEach(function (s) { var b = D.bests[s.num] || {}, v = Object.keys(b).map(function (k) { return b[k]; }).filter(function (x) { return x >= 0; }); avg[s.num] = v.length ? v.reduce(function (a, c) { return a + c; }, 0) / v.length : 50; });
      var G = []; for (var i = 0; i < opt.n; i++) G.push([]);
      if (opt.mode === "random") shuffle(here).forEach(function (s, i) { G[i % opt.n].push(s); });
      else { var sorted = shuffle(here).sort(function (a, b) { return avg[b.num] - avg[a.num]; }); if (opt.mode === "mixed") sorted.forEach(function (s, i) { var r2 = Math.floor(i / opt.n), k = i % opt.n; G[r2 % 2 ? opt.n - 1 - k : k].push(s); }); else { var size = Math.ceil(sorted.length / opt.n); sorted.forEach(function (s, i) { G[Math.min(opt.n - 1, Math.floor(i / size))].push(s); }); } }
      var cols = ["#5b2a86", "#8a4fd8", "#121015", "#b07800", "#0f7b74", "#7a3fb8", "#3e1d5c", "#9b5de5"];
      $(".gm-out").innerHTML = '<div class="gm-groups">' + G.map(function (g, i) { return '<div class="gm-g" style="--gc:' + cols[i % cols.length] + '"><h3>Group ' + (i + 1) + "</h3><ul>" + g.map(function (s) { return "<li>" + esc(s.name) + (opt.mode !== "random" ? ' <span class="muted small">' + Math.round(avg[s.num]) + "%</span>" : "") + "</li>"; }).join("") + "</ul></div>"; }).join("") + "</div>" + (opt.mode !== "random" ? '<p class="muted small">Levels use each student’s average best score (50% if no data yet).</p>' : "");
    };
  }
  function letters(head) {
    app.innerHTML = head + '<h1>✉️ Parent Letters</h1><p class="lead">Print these and send them home. Each one explains the website and how to help at home.</p><div class="tiles tiles-2"><a class="tile wide" href="#/teacher/letter/en"><span class="tile-ic" aria-hidden="true">🇺🇸</span><span class="tile-name">English letter<small>Welcome to our class website</small></span></a><a class="tile wide" href="#/teacher/letter/es"><span class="tile-ic" aria-hidden="true">🇲🇽</span><span class="tile-name">Carta en español<small>Bienvenidos a nuestro sitio web</small></span></a></div>';
  }
  function letter(lang) {
    var url = (location.href.split("#")[0] || "").replace(/\?.*$/, "").replace(/index\.html$/, ""), T = CFG.teacher, C = CFG.className, S = CFG.school;
    var en = '<p class="eyebrow">' + esc(S) + " · " + esc(C) + "</p><h1>Welcome to our class website! 🌟</h1><p>Dear Families,</p><p>Our class has a new website where your child can practice reading, writing, math, history, and science. It works on a Chromebook, tablet, phone, or computer. Every question has a 🔊 button that reads it out loud.</p>" +
      '<div class="letter-box"><p><b>Website:</b> <span class="url">' + esc(url) + '</span></p><p><b>How to sign in:</b> Tap your child’s name. Then type their class number.</p><p><b>Class number:</b> ____________</p></div>' +
      "<h2>How you can help at home (15 minutes a day)</h2><ol><li><b>🔁 Daily Review:</b> 6 quick questions that help your child remember what we learned.</li><li><b>⚡ Daily Fluency:</b> A 1-minute math fact sprint. Or listen to your child read for 1 minute and tap any words they miss.</li><li><b>🎯 My Goals & Data:</b> Look at the charts and stars together. Celebrate growth!</li></ol>" +
      "<h2>Tips</h2><ul><li>Read together every day, in English or your home language. Both help!</li><li>Ask, “What did you learn today?” and “How do you know?”</li><li>Praise effort: “You kept trying. Your brain is growing!”</li></ul><p>Thank you for being part of our team. Please contact me with any questions.</p><p>Sincerely,<br><b>" + esc(T) + "</b></p>";
    var es = '<p class="eyebrow">' + esc(S) + " · " + esc(C) + "</p><h1>¡Bienvenidos a nuestro sitio web de la clase! 🌟</h1><p>Queridas familias:</p><p>Nuestra clase tiene un sitio web nuevo donde su hijo o hija puede practicar lectura, escritura, matemáticas, historia y ciencias. Funciona en una Chromebook, tableta, teléfono o computadora. Cada pregunta tiene un botón 🔊 que la lee en voz alta (en inglés).</p>" +
      '<div class="letter-box"><p><b>Sitio web:</b> <span class="url">' + esc(url) + '</span></p><p><b>Cómo entrar:</b> Toque el nombre de su hijo o hija. Luego escriba su número de la clase.</p><p><b>Número de la clase:</b> ____________</p></div>' +
      "<h2>Cómo puede ayudar en casa (15 minutos al día)</h2><ol><li><b>🔁 Repaso diario (Daily Review):</b> 6 preguntas rápidas que ayudan a su hijo o hija a recordar lo que aprendimos.</li><li><b>⚡ Fluidez diaria (Daily Fluency):</b> Un reto de 1 minuto con operaciones de matemáticas. O escuche a su hijo o hija leer por 1 minuto y toque las palabras que no lea bien.</li><li><b>🎯 Mis metas y datos (My Goals & Data):</b> Miren juntos las gráficas y las estrellas. ¡Celebren su progreso!</li></ol>" +
      "<h2>Consejos</h2><ul><li>Lean juntos todos los días, en inglés o en español. ¡Los dos idiomas ayudan!</li><li>Pregunte: “¿Qué aprendiste hoy?” y “¿Cómo lo sabes?”</li><li>Celebre el esfuerzo: “Seguiste intentando. ¡Tu cerebro está creciendo!”</li></ul><p>Gracias por ser parte de nuestro equipo. Por favor comuníquese conmigo si tiene preguntas.</p><p>Atentamente,<br><b>" + esc(T) + "</b></p>";
    app.innerHTML = crumbs(TCR.concat([["🧰 Tools", "#/teacher/tools"], ["✉️ Letters", "#/teacher/tools/letters"], [lang === "es" ? "Español" : "English", ""]])) + '<div class="row-btns left noprint"><button type="button" class="btn" data-act="print">🖨️ Print letter</button><a class="btn btn-ghost" href="#/teacher/letter/' + (lang === "es" ? "en" : "es") + '">' + (lang === "es" ? "🇺🇸 English" : "🇲🇽 Español") + '</a></div><article class="letter" lang="' + (lang === "es" ? "es" : "en") + '">' + (lang === "es" ? es : en) + "</article>";
  }

  /* =====================================================================
     BOOT: render after DOMContentLoaded (content files have run by then)
     ===================================================================== */
  function boot() {
    app = document.getElementById("app");
    if (!app) { app = document.createElement("main"); app.id = "app"; document.body.appendChild(app); }
    if (!document.getElementById("k3-header")) { var h = document.createElement("header"); h.id = "k3-header"; h.className = "topbar"; document.body.insertBefore(h, document.body.firstChild); }
    if (!document.getElementById("k3-toast")) { var t = document.createElement("div"); t.id = "k3-toast"; t.className = "toast"; t.setAttribute("role", "status"); t.setAttribute("aria-live", "polite"); document.body.appendChild(t); }
    if (FAST) document.documentElement.classList.add("k3-fast");
    window.addEventListener("hashchange", route);
    route();
    K3.flush();
    K3.ready = true;
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else setTimeout(boot, 0);
})();
