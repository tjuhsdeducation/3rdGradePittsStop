/* =====================================================================
   Code.gs · Google Sheet that auto-scores Mrs. Pitts' 3rd Grade website
   ---------------------------------------------------------------------
   WHAT YOU GET (all filled in automatically):
     🏆 Class Overview : class average for Reading, Writing, Math, History,
                         Science + every student's average in each subject,
                         activities done, mastered, last day active, fluency,
                         and a list of every activity with the class average.
     ⭐ Mastery        : students × standards, best percent (colored).
     ⚡ Fluency        : every math-fact sprint and reading-fluency check.
     📋 All Scores     : every attempt from every activity (one row each).
     One tab per activity (51 tabs, named by subject) : one row per attempt
                         with the score and points for every question.

   SETUP (about 10 minutes, one time):
     1. Go to sheets.google.com and make a NEW blank spreadsheet with your
        school Google account. Name it "Mrs. Pitts Class Data".
     2. In the sheet menu: Extensions > Apps Script.
     3. Delete the sample code. Paste ALL of this file. Click 💾 Save.
     4. At the top, pick the function "setupTabs" and click ▶ Run.
        Allow access when Google asks (your account > Advanced > Go to project > Allow).
        All the tabs are created for you.
     5. Click Deploy > New deployment > ⚙️ gear > Web app.
          Execute as: Me      Who has access: Anyone
        Click Deploy and copy the "Web app URL" (it ends with /exec).
     6. Paste it into k3-config.js:  scriptUrl: "https://script.google.com/macros/s/.../exec",
        and upload k3-config.js to GitHub. Done!
   If you change this code later: Deploy > Manage deployments > ✏️ Edit >
   Version: New version > Deploy. (The URL stays the same.)
   ===================================================================== */

var PASSCODE = "pitts2026"; // ✏️ must match teacherPasscode in k3-config.js
var MASTERY = 80;           // ✏️ percent that counts as "mastered"

var SUBJECTS = ["Reading", "Writing", "Math", "History", "Science"];
var SUBJ_NAME = { reading: "Reading", writing: "Writing", math: "Math", history: "History", science: "Science", mixed: "Daily Review" };
var PURPLE = "#5b2a86", LAV = "#efe6fb", GOLD = "#ffc53d";

/* Every graded activity on the website: [id, subject, title, standard, number of questions] */
var ACTIVITIES = [
  ["r-rl1-lost-book", "Reading", "Ask and Answer: The Lost Library Book", "RL.3.1", 9],
  ["r-rl2-ant-grasshopper", "Reading", "Fable: The Ant and the Grasshopper", "RL.3.2", 9],
  ["r-rl3-goalie", "Reading", "Character Traits: Mateo the Goalie", "RL.3.3", 9],
  ["r-rl5-fog-poem-play", "Reading", "Parts of Poems and Plays: Tule Fog Morning", "RL.3.5", 9],
  ["r-rl6-orange-tree", "Reading", "Point of View: The Orange Tree Trouble", "RL.3.6", 8],
  ["r-l5-rainy-recess", "Reading", "Literal or Nonliteral? A Rainy Day at Recess", "L.3.5", 9],
  ["r-ri2-dairy-cows", "Reading", "Main Idea: Dairy Cows of Tulare County", "RI.3.2", 9],
  ["r-ri3-snowpack", "Reading", "Cause and Effect: From Mountain Snow to Valley Water", "RI.3.3", 9],
  ["r-l4-monarchs", "Reading", "Context Clues: The Monarch's Amazing Trip", "L.3.4", 9],
  ["r-ri5-oranges", "Reading", "Text Features: Growing Oranges", "RI.3.5", 9],
  ["r-ri8-giant-trees", "Reading", "Compare and Contrast: Two Giant Trees", "RI.3.8", 8],
  ["r-rf3-word-parts", "Reading", "Word Parts: Prefixes and Suffixes", "RF.3.3", 9],
  ["w-parts-of-speech", "Writing", "Nouns, Verbs, Adjectives, Adverbs", "L.3.1a", 10],
  ["w-plural-nouns", "Writing", "Plural Nouns", "L.3.1b", 10],
  ["w-verb-tenses", "Writing", "Past, Present, and Future Verbs", "L.3.1e", 10],
  ["w-agreement-compare", "Writing", "Verbs That Match and Words That Compare", "L.3.1f", 10],
  ["w-conjunctions", "Writing", "And, But, Or, So", "L.3.1h", 10],
  ["w-caps-commas", "Writing", "Capital Letters and Commas", "L.3.2a", 10],
  ["w-spelling-suffixes", "Writing", "Spelling Patterns and Suffixes", "L.3.2f", 10],
  ["w-sentence-fluency", "Writing", "Fix and Combine Sentences", "L.3.1i", 10],
  ["w-opinion", "Writing", "Opinion Writing", "W.3.1", 10],
  ["w-informative", "Writing", "Informative Paragraph", "W.3.2", 9],
  ["w-narrative", "Writing", "Narrative Writing", "W.3.3", 9],
  ["m-mult-arrays", "Math", "Equal Groups and Arrays", "3.OA.A.1", 10],
  ["m-div-sharing", "Math", "Division Is Sharing", "3.OA.A.2", 10],
  ["m-mult-div-word", "Math", "Multiply and Divide Word Problems", "3.OA.A.3", 10],
  ["m-unknown-number", "Math", "Find the Missing Number", "3.OA.A.4", 10],
  ["m-mult-properties", "Math", "Multiplication Properties", "3.OA.B.5", 10],
  ["m-mult-facts", "Math", "Multiplication Facts 0 to 10", "3.OA.C.7", 10],
  ["m-two-step", "Math", "Two-Step Word Problems", "3.OA.D.8", 10],
  ["m-mult-patterns", "Math", "Patterns in Multiplication", "3.OA.D.9", 10],
  ["m-rounding", "Math", "Rounding to 10 and 100", "3.NBT.A.1", 10],
  ["m-add-sub-1000", "Math", "Add and Subtract to 1000", "3.NBT.A.2", 10],
  ["m-frac-understand", "Math", "Fractions and the Number Line", "3.NF.A.1", 10],
  ["m-frac-compare", "Math", "Equal and Compare Fractions", "3.NF.A.3", 10],
  ["m-time", "Math", "Time to the Minute", "3.MD.A.1", 10],
  ["m-graphs", "Math", "Picture and Bar Graphs", "3.MD.B.3", 10],
  ["m-area", "Math", "Area", "3.MD.C.7", 10],
  ["m-perimeter", "Math", "Perimeter", "3.MD.D.8", 10],
  ["h-geo-local-region", "History", "Maps of Our Valley", "HSS 3.1", 10],
  ["h-yokuts-local-nations", "History", "The Yokuts People", "HSS 3.2", 10],
  ["h-tulare-then-now", "History", "How Tulare Changed", "HSS 3.3", 9],
  ["h-citizenship-government", "History", "Rules, Laws, and Good Citizens", "HSS 3.4", 10],
  ["h-heroes-leaders", "History", "Heroes Who Made a Difference", "HSS 3.4.6", 9],
  ["h-economics-local", "History", "Goods, Services, and Choices", "HSS 3.5", 10],
  ["s-forces-motion", "Science", "Pushes, Pulls, and Patterns", "3-PS2-1/2", 9],
  ["s-magnets-static", "Science", "Magnets and Static Electricity", "3-PS2-3/4", 9],
  ["s-life-cycles", "Science", "Life Cycles", "3-LS1-1", 9],
  ["s-traits-inherited", "Science", "Traits: From Parents or Environment?", "3-LS3-1/2", 9],
  ["s-fossils-adaptations", "Science", "Fossils, Habitats, and Survival", "3-LS4", 9],
  ["s-weather-climate", "Science", "Weather, Climate, and Staying Safe", "3-ESS2-1/2, 3-ESS3-1", 10]

];

var SCORE_HEADERS = ["Date", "Student", "Num", "Subject", "Unit", "Standard", "Activity", "Title", "Score", "Total", "Percent", "Mastered", "Mins", "Results"];
var FLUENCY_HEADERS = ["Date", "Student", "Num", "Type", "Set", "Correct", "Errors", "Seconds", "Rate"];
var SCORES = "📋 All Scores", FLUENCY = "⚡ Fluency", OVERVIEW = "🏆 Class Overview", MASTERY_TAB = "⭐ Mastery";

/* ---------- website sends data here ---------- */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var body = (e && e.postData && e.postData.contents) || "{}"; // the site sends text/plain JSON
    var d;
    try { d = JSON.parse(body); } catch (err) { return json_({ ok: false, error: "Bad JSON" }); }
    var cache = CacheService.getScriptCache();
    if (d.uid && cache.get("uid_" + d.uid)) return json_({ ok: true, duplicate: true });
    var st = d.student || {};
    var when = d.time ? new Date(d.time) : new Date();
    if (isNaN(when.getTime())) when = new Date();

    if (d.action === "score") {
      var sh = sheet_(SCORES, SCORE_HEADERS);
      sh.appendRow([when, clean_(st.name), "", clean_(d.subject), clean_(d.unit), clean_(d.standard), clean_(d.activity), clean_(d.title),
        num_(d.score), num_(d.total), num_(d.percent), d.mastered === true, num_(d.mins), JSON.stringify(d.results || [])]);
      setNum_(sh, st.num);
      addToActivityTab_(d, st, when);
      rebuildAll();
    } else if (d.action === "fluency") {
      var fs = sheet_(FLUENCY, FLUENCY_HEADERS);
      fs.appendRow([when, clean_(st.name), "", clean_(d.type), clean_(d.set), num_(d.correct), num_(d.errors), num_(d.seconds), num_(d.rate)]);
      setNum_(fs, st.num);
      rebuildOverview();
    } else return json_({ ok: false, error: "Unknown action" });
    if (d.uid) cache.put("uid_" + d.uid, "1", 21600);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally { try { lock.releaseLock(); } catch (e2) {} }
}

/* Teacher dashboard asks for data: ?action=data&key=PASSCODE */
function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.action !== "data") return json_({ ok: true, message: "Mrs. Pitts' class web app is running." });
  if (String(p.key || "") !== String(PASSCODE)) return json_({ ok: false, error: "Wrong passcode" });
  return json_({ ok: true, scores: rows_(SCORES), fluency: rows_(FLUENCY) });
}

/* ---------- one tab per activity ---------- */
function actInfo_(id) { for (var i = 0; i < ACTIVITIES.length; i++) if (ACTIVITIES[i][0] === id) return ACTIVITIES[i]; return null; }
function tabName_(subject, title) { return (subject + " · " + String(title).replace(/\s*:\s*/g, " – ").replace(/[\[\]\*\?\/\\]/g, " ")).slice(0, 90); }
function activityTab_(id, subject, title, nq) {
  var name = id === "daily-review" ? "🔁 Daily Review" : tabName_(subject, title);
  var headers = ["Date", "Student", "Score", "Total", "Percent", "Mastered", "Attempt #", "Minutes"];
  for (var q = 1; q <= nq; q++) headers.push("Q" + q);
  var sh = sheet_(name, headers);
  return sh;
}
function addToActivityTab_(d, st, when) {
  var info = actInfo_(String(d.activity)), subject = info ? info[1] : (SUBJ_NAME[String(d.subject).toLowerCase()] || "Other");
  var results = Array.isArray(d.results) ? d.results : [];
  var sh = activityTab_(String(d.activity), subject, info ? info[2] : (d.title || d.activity), Math.max(results.length, info ? info[4] : 0, String(d.activity) === "daily-review" ? 6 : 0));
  var name = clean_(st.name), attempts = 0;
  if (sh.getLastRow() > 1) sh.getRange(2, 2, sh.getLastRow() - 1, 1).getValues().forEach(function (r) { if (String(r[0]) === name) attempts++; });
  sh.appendRow([when, name, num_(d.score), num_(d.total), num_(d.percent), d.mastered === true ? "⭐ Yes" : "Not yet", attempts + 1, num_(d.mins)].concat(results));
}

/* ---------- rebuild the summary tabs ---------- */
function rebuildAll() { rebuildOverview(); rebuildMastery(); }

function bestRows_() {
  /* best percent per student per activity (from All Scores) */
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SCORES), out = {};
  if (!sh || sh.getLastRow() < 2) return out;
  sh.getRange(2, 1, sh.getLastRow() - 1, SCORE_HEADERS.length).getValues().forEach(function (r) {
    var name = String(r[1]), id = String(r[6]), subj = SUBJ_NAME[String(r[3]).toLowerCase()] || String(r[3]), pct = Number(r[10]) || 0, when = r[0];
    if (!name) return;
    var s = out[name] || (out[name] = { name: name, acts: {}, last: null, attempts: 0 });
    s.attempts++; if (when instanceof Date && (!s.last || when > s.last)) s.last = when;
    if (id === "daily-review") return;
    var a = s.acts[id] || (s.acts[id] = { subj: subj, best: -1 });
    if (pct > a.best) a.best = pct;
  });
  return out;
}
function avg_(arr) { return arr.length ? Math.round(arr.reduce(function (a, b) { return a + b; }, 0) / arr.length) : ""; }

function rebuildOverview() {
  var ss = SpreadsheetApp.getActiveSpreadsheet(), best = bestRows_(), names = Object.keys(best).sort();
  var sh = ss.getSheetByName(OVERVIEW) || ss.insertSheet(OVERVIEW, 0);
  sh.clear(); sh.clearConditionalFormatRules();
  var rows = [], fmt = [];
  rows.push(["🏆 Mrs. Pitts’ 3rd Grade · Class Overview", "", "", "", "", "", "", "", "", ""]);
  rows.push(["Updated " + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MMM d, yyyy h:mm a") + " · Percents use each student’s BEST try on each activity · Mastered = " + MASTERY + "%+", "", "", "", "", "", "", "", "", ""]);
  rows.push(["", "", "", "", "", "", "", "", "", ""]);
  /* section 1: class average by subject */
  rows.push(["CLASS AVERAGE BY SUBJECT", "Class average %", "Students who practiced", "Activities finished", "% of finished activities mastered", "", "", "", "", ""]); fmt.push(rows.length);
  var subjStart = rows.length + 1;
  SUBJECTS.forEach(function (S) {
    var studentAvgs = [], done = 0, mastered = 0;
    names.forEach(function (n) { var list = []; Object.keys(best[n].acts).forEach(function (id) { var a = best[n].acts[id]; if (a.subj === S) { list.push(a.best); done++; if (a.best >= MASTERY) mastered++; } }); if (list.length) studentAvgs.push(avg_(list)); });
    rows.push([S, avg_(studentAvgs), studentAvgs.length, done, done ? Math.round(100 * mastered / done) : "", "", "", "", "", ""]);
  });
  var allAvgs = []; names.forEach(function (n) { var l = Object.keys(best[n].acts).map(function (id) { return best[n].acts[id].best; }); if (l.length) allAvgs.push(avg_(l)); });
  rows.push(["ALL SUBJECTS", avg_(allAvgs), allAvgs.length, "", "", "", "", "", "", ""]);
  var subjEnd = rows.length;
  rows.push(["", "", "", "", "", "", "", "", "", ""]);
  /* section 2: each student */
  rows.push(["STUDENT", "Reading %", "Writing %", "Math %", "History %", "Science %", "Overall %", "Activities done", "Mastered", "Last active"]); fmt.push(rows.length);
  var stuStart = rows.length + 1;
  names.forEach(function (n) {
    var s = best[n], per = {}, all = [], m = 0;
    Object.keys(s.acts).forEach(function (id) { var a = s.acts[id]; (per[a.subj] = per[a.subj] || []).push(a.best); all.push(a.best); if (a.best >= MASTERY) m++; });
    rows.push([n].concat(SUBJECTS.map(function (S) { return per[S] ? avg_(per[S]) : ""; })).concat([avg_(all), all.length, m, s.last || ""]));
  });
  if (!names.length) rows.push(["(No scores yet. They appear here as soon as students finish activities.)", "", "", "", "", "", "", "", "", ""]);
  var stuEnd = rows.length;
  rows.push(["", "", "", "", "", "", "", "", "", ""]);
  /* section 3: fluency (latest and best) */
  rows.push(["FLUENCY", "Math facts: latest", "Math facts: best", "Reading WCPM: latest", "Reading WCPM: best", "", "", "", "", ""]); fmt.push(rows.length);
  var fl = ss.getSheetByName(FLUENCY), fd = {};
  if (fl && fl.getLastRow() > 1) fl.getRange(2, 1, fl.getLastRow() - 1, FLUENCY_HEADERS.length).getValues().forEach(function (r) {
    var n = String(r[1]), type = String(r[3]), rate = Number(r[8]) || 0; if (!n) return;
    var f = fd[n] || (fd[n] = { math: [], reading: [] }); (type === "reading" ? f.reading : f.math).push(rate);
  });
  var fn = Object.keys(fd).sort();
  fn.forEach(function (n) { var f = fd[n]; rows.push([n, f.math.length ? f.math[f.math.length - 1] : "", f.math.length ? Math.max.apply(null, f.math) : "", f.reading.length ? f.reading[f.reading.length - 1] : "", f.reading.length ? Math.max.apply(null, f.reading) : "", "", "", "", "", ""]); });
  if (!fn.length) rows.push(["(No fluency checks yet.)", "", "", "", "", "", "", "", "", ""]);
  rows.push(["", "", "", "", "", "", "", "", "", ""]);
  /* section 4: every activity */
  rows.push(["ACTIVITY", "Subject", "Standard", "Students done", "Class average %", "% mastered", "", "", "", ""]); fmt.push(rows.length);
  var actStart = rows.length + 1;
  ACTIVITIES.forEach(function (A) {
    var list = []; names.forEach(function (n) { var a = best[n].acts[A[0]]; if (a) list.push(a.best); });
    rows.push([A[2], A[1], A[3], list.length, avg_(list), list.length ? Math.round(100 * list.filter(function (x) { return x >= MASTERY; }).length / list.length) : "", "", "", "", ""]);
  });
  var actEnd = rows.length;
  sh.getRange(1, 1, rows.length, 10).setValues(rows);
  /* formatting */
  sh.getRange(1, 1).setFontSize(18).setFontWeight("bold").setFontColor(PURPLE);
  sh.getRange(2, 1).setFontColor("#5f5869").setFontStyle("italic");
  fmt.forEach(function (r) { sh.getRange(r, 1, 1, 10).setFontWeight("bold").setBackground(PURPLE).setFontColor("#ffffff"); });
  sh.getRange(subjEnd, 1, 1, 5).setFontWeight("bold").setBackground(LAV);
  sh.getRange(subjStart, 1, subjEnd - subjStart + 1, 1).setFontWeight("bold");
  if (stuEnd >= stuStart) sh.getRange(stuStart, 10, stuEnd - stuStart + 1, 1).setNumberFormat("MMM d");
  sh.setColumnWidth(1, 300); for (var c = 2; c <= 10; c++) sh.setColumnWidth(c, 120);
  sh.setFrozenRows(0);
  var rules = [], ranges = [sh.getRange(subjStart, 2, subjEnd - subjStart + 1, 1), sh.getRange(stuStart, 2, Math.max(1, stuEnd - stuStart + 1), 6), sh.getRange(actStart, 5, actEnd - actStart + 1, 1)];
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThanOrEqualTo(MASTERY).setBackground("#d9f2e3").setFontColor("#1d7a45").setRanges(ranges).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberBetween(60, MASTERY - 0.001).setBackground("#fff4d1").setRanges(ranges).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberLessThan(60).setBackground("#fde9e7").setFontColor("#b3261e").setRanges(ranges).build());
  sh.setConditionalFormatRules(rules);
  ss.setActiveSheet(sh); ss.moveActiveSheet(1);
}

/* Mastery tab: one row per student, one column per standard, best percent. */
function rebuildMastery() {
  var ss = SpreadsheetApp.getActiveSpreadsheet(), src = ss.getSheetByName(SCORES);
  if (!src || src.getLastRow() < 2) return;
  var data = src.getRange(2, 1, src.getLastRow() - 1, SCORE_HEADERS.length).getValues();
  var students = {}, order = [], stds = {};
  data.forEach(function (r) {
    var name = String(r[1]), std = String(r[5]), pct = Number(r[10]) || 0;
    if (!name) return;
    if (!students[name]) { students[name] = { best: {} }; order.push(name); }
    if (!std || std === "MIXED") return;
    stds[std] = true;
    var b = students[name].best; if (b[std] == null || pct > b[std]) b[std] = pct;
  });
  var cols = Object.keys(stds).sort(); order.sort();
  var out = [["Student", "Standards mastered (" + MASTERY + "%+)"].concat(cols)];
  order.forEach(function (k) { var s = students[k], n = 0, cells = []; cols.forEach(function (c) { var v = s.best[c]; if (v != null && v >= MASTERY) n++; cells.push(v == null ? "" : v); }); out.push([k, n].concat(cells)); });
  var m = ss.getSheetByName(MASTERY_TAB) || ss.insertSheet(MASTERY_TAB, 1);
  m.clear(); m.clearConditionalFormatRules();
  m.getRange(1, 1, out.length, out[0].length).setValues(out);
  m.getRange(1, 1, 1, out[0].length).setFontWeight("bold").setBackground(PURPLE).setFontColor("#ffffff");
  m.setFrozenRows(1); m.setFrozenColumns(2);
  if (cols.length && out.length > 1) {
    var rng = m.getRange(2, 3, out.length - 1, cols.length);
    m.setConditionalFormatRules([
      SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThanOrEqualTo(MASTERY).setBackground(PURPLE).setFontColor("#ffffff").setRanges([rng]).build(),
      SpreadsheetApp.newConditionalFormatRule().whenNumberBetween(60, MASTERY - 0.001).setBackground("#e2d4f7").setRanges([rng]).build(),
      SpreadsheetApp.newConditionalFormatRule().whenNumberLessThan(60).setBackground("#f6d0cc").setRanges([rng]).build()
    ]);
    m.getRange(1, 3, 1, cols.length).setTextRotation(90);
  }
}

/* Menu in the sheet: 🍎 Class Website */
function onOpen() {
  SpreadsheetApp.getUi().createMenu("🍎 Class Website").addItem("Set up all tabs", "setupTabs").addItem("Refresh Class Overview + Mastery", "rebuildAll").addToUi();
}
/* Run once: creates Class Overview, Mastery, Fluency, All Scores, and one tab per activity. */
function setupTabs() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  sheet_(SCORES, SCORE_HEADERS); sheet_(FLUENCY, FLUENCY_HEADERS);
  ACTIVITIES.forEach(function (A) { activityTab_(A[0], A[1], A[2], A[4]); });
  activityTab_("daily-review", "Daily Review", "Daily Review", 6);
  rebuildOverview();
  var m = ss.getSheetByName(MASTERY_TAB) || ss.insertSheet(MASTERY_TAB, 1);
  if (m.getLastRow() === 0) m.getRange(1, 1, 1, 2).setValues([["Student", "Standards mastered"]]).setFontWeight("bold").setBackground(PURPLE).setFontColor("#ffffff");
  var junk = ss.getSheetByName("Sheet1"); if (junk && junk.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(junk);
}

/* ---------- helpers ---------- */
function sheet_(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  if (sh.getLastRow() === 0) {
    sh.appendRow(headers);
    sh.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#5b2a86").setFontColor("#ffffff");
    sh.setFrozenRows(1);
    if (headers[2] === "Num") sh.getRange("C:C").setNumberFormat("@");
    sh.getRange(1, 1, 1, headers.length).setWrap(true);
  }
  return sh;
}
function setNum_(sh, num) { sh.getRange(sh.getLastRow(), 3).setNumberFormat("@").setValue(clean_(num)); }
function rows_(name) {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sh || sh.getLastRow() < 2) return [];
  var vals = sh.getDataRange().getValues(), head = vals.shift().map(function (h) { return String(h).toLowerCase(); });
  return vals.map(function (r) {
    var o = {};
    head.forEach(function (h, i) { var v = r[i]; o[h] = v instanceof Date ? v.toISOString() : v; });
    if (o.num != null) o.num = String(o.num);
    return o;
  });
}
function clean_(v) { v = String(v == null ? "" : v).slice(0, 500); return /^[=+\-@]/.test(v) ? "'" + v : v; } // blocks formula injection
function num_(v) { var n = Number(v); return isNaN(n) ? "" : n; }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
