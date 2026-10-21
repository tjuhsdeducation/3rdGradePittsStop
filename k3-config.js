/* =====================================================================
   k3-config.js  ·  ✏️ THE ONLY FILE MRS. PITTS NEEDS TO EDIT
   ---------------------------------------------------------------------
   ✏️ How to edit:
     1. Open this file on GitHub and click the ✏️ pencil ("Edit this file").
     2. Change only the words inside the "quotes". Keep every comma, quote
        mark, and bracket just where it is.
     3. Click "Commit changes". The website updates in about 1 minute.
   ===================================================================== */
window.K3_CONFIG = {
  /* ✏️ Names shown at the top of the site and on letters and reports. */
  teacher: "Mrs. Pitts",
  school: "Alpine Vista",
  grade: "3rd Grade",
  className: "Mrs. Pitts’ 3rd Grade",

  /* ✏️ Optional mascot emoji for the logo, for example "🦅" or "🐻". Leave "" for a star. */
  mascot: "",

  /* ✏️ TEACHER PASSCODE: opens the 🍎 Teacher area.
     It must match PASSCODE in Code.gs (the Google Apps Script).
     Anyone who looks at this file's code can see it, so it is a light lock.
     Never put private student information on this website. */
  teacherPasscode: "pitts2026",

  /* ✏️ GOOGLE SHEET LINK: paste your Apps Script web app URL between the quotes.
     It ends with /exec. See setup.html for the steps.
     Leave it "" for preview mode (scores stay on each device only). */
  scriptUrl: "",

  /* ✏️ CLASS LIST: students sign in by typing their FIRST and LAST name.
     🔒 This file is public on GitHub, so DON'T type real names here. Open setup.html,
        use the "Name Code Maker", and paste the codes it makes, like:
          students: [
            "#u98pqs951r",   // student 1
            "#1x2k9fa0bq",   // student 2
          ],
     Only names on the list can sign in, and scores go to your private Google Sheet under the real name.
     While this list is empty, the site accepts any name (good for trying it out). */
  students: [
  ],

  /* ✏️ GOALS shown as goal lines on the charts.
     mathFactsPerMin: the fact sprint goal (facts correct in 1 minute).
     readingWCPM: Hasbrouck & Tindal (2017) grade 3, 50th percentile national
     norms for words correct per minute. Change only if your school uses other goals. */
  goals: { mathFactsPerMin: 30, readingWCPM: { fall: 83, winter: 97, spring: 112 } },

  /* ✏️ ANNOUNCEMENTS: the FIRST one shows on the yellow sticky note at the top of the home page. One message per line, each in "quotes", with a comma between lines. */
  announcements: [
    "Today: Library day! Bring your books back. 📚"
  ]
};
