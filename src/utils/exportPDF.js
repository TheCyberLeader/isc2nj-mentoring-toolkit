import jsPDF from "jspdf";
import { config } from "../data/config";
import { roles } from "../data/roles";

const NAVY = [27, 58, 107];
const TEAL = [13, 115, 119];
const DARK = [34, 34, 34];
const GRAY = [120, 120, 120];
const LIGHT_BG = [242, 243, 244];
const WHITE = [255, 255, 255];
const ACCENT = [23, 165, 137];

let cachedLogo = null;

async function loadLogo() {
  if (cachedLogo) return cachedLogo;
  try {
    const response = await fetch(config.logoHorizontal);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        cachedLogo = reader.result;
        resolve(cachedLogo);
      };
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function addHeader(doc, title, logo) {
  if (logo) {
    doc.addImage(logo, "PNG", 14, 10, 40, 12);
  }
  doc.setFontSize(10);
  doc.setTextColor(...GRAY);
  doc.text(config.chapterName, doc.internal.pageSize.width - 14, 18, { align: "right" });

  doc.setFontSize(16);
  doc.setTextColor(...NAVY);
  doc.setFont(undefined, "bold");
  doc.text(title, 14, 34);

  doc.setDrawColor(...TEAL);
  doc.setLineWidth(0.5);
  doc.line(14, 38, doc.internal.pageSize.width - 14, 38);

  return 44;
}

function addFooter(doc) {
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...GRAY);
    const pageW = doc.internal.pageSize.width;
    const pageH = doc.internal.pageSize.height;
    doc.text(
      `${config.chapterName} — Cybersecurity Mentoring Toolkit`,
      14,
      pageH - 10
    );
    doc.text(`Page ${i} of ${pageCount}`, pageW - 14, pageH - 10, { align: "right" });
  }
}

function checkPage(doc, y, needed = 20) {
  if (y + needed > doc.internal.pageSize.height - 20) {
    doc.addPage();
    return 20;
  }
  return y;
}

function addLabelValue(doc, y, label, value, maxWidth) {
  y = checkPage(doc, y, 16);
  doc.setFontSize(9);
  doc.setFont(undefined, "bold");
  doc.setTextColor(...TEAL);
  doc.text(label, 14, y);
  y += 5;

  doc.setFont(undefined, "normal");
  doc.setTextColor(...DARK);
  doc.setFontSize(10);
  if (value && value.trim()) {
    const lines = doc.splitTextToSize(value, maxWidth);
    doc.text(lines, 14, y);
    y += lines.length * 5 + 4;
  } else {
    doc.setTextColor(...GRAY);
    doc.text("—", 14, y);
    y += 9;
  }
  return y;
}

// --- Goals PDF ---

export async function exportGoalsPDF(goalsData, profileData) {
  const doc = new jsPDF();
  const logo = await loadLogo();
  const maxW = doc.internal.pageSize.width - 28;
  let y = addHeader(doc, "Goal-Setting Worksheet", logo);

  // Profile context
  if (profileData?.name) {
    doc.setFontSize(10);
    doc.setTextColor(...DARK);
    doc.text(`Name: ${profileData.name}`, 14, y);
    y += 5;
    if (profileData.targetRole && roles[profileData.targetRole]) {
      doc.text(`Target Track: ${roles[profileData.targetRole].label}`, 14, y);
      y += 5;
    }
    y += 4;
  }

  const fields = [
    ["Target Role / Job Title", goalsData.targetJobTitle],
    ["Timeline to Achieve Goal", goalsData.timeline],
    ["Current Skills I Have", goalsData.currentSkills],
    ["Skills I Need to Develop", goalsData.skillsToLearn],
    ["Certifications I'm Pursuing", goalsData.certsPursuing],
    ["Networking Goals", goalsData.networkingGoals],
    ["Biggest Challenge / Fear", goalsData.biggestChallenge],
    ["How My Mentor Can Help", goalsData.howMentorCanHelp],
    ["My Commitment (hrs/week)", goalsData.hoursPerWeek ? String(goalsData.hoursPerWeek) : ""],
  ];

  for (const [label, value] of fields) {
    y = addLabelValue(doc, y, label, value || "", maxW);
  }

  // SMART Goal section
  y = checkPage(doc, y, 30);
  y += 4;
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.setTextColor(...NAVY);
  doc.text("SMART Goal", 14, y);
  y += 8;

  const smartFields = [
    ["Specific", goalsData.smart?.specific],
    ["Measurable", goalsData.smart?.measurable],
    ["Achievable", goalsData.smart?.achievable],
    ["Relevant", goalsData.smart?.relevant],
    ["Time-Bound", goalsData.smart?.timeBound],
  ];

  for (const [label, value] of smartFields) {
    y = addLabelValue(doc, y, label, value || "", maxW);
  }

  addFooter(doc);
  doc.save("goals-worksheet.pdf");
}

export async function exportBlankGoalsPDF() {
  const blankGoals = {
    targetJobTitle: "", timeline: "", currentSkills: "", skillsToLearn: "",
    certsPursuing: "", networkingGoals: "", biggestChallenge: "",
    howMentorCanHelp: "", hoursPerWeek: "",
    smart: { specific: "", measurable: "", achievable: "", relevant: "", timeBound: "" },
  };
  const doc = new jsPDF();
  const logo = await loadLogo();
  const maxW = doc.internal.pageSize.width - 28;
  let y = addHeader(doc, "Goal-Setting Worksheet (Blank)", logo);

  y += 2;
  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  doc.text("Print this blank worksheet and fill it in by hand, or use the app at any time.", 14, y);
  y += 10;

  const fields = [
    "Target Role / Job Title", "Timeline to Achieve Goal", "Current Skills I Have",
    "Skills I Need to Develop", "Certifications I'm Pursuing", "Networking Goals",
    "Biggest Challenge / Fear", "How My Mentor Can Help", "My Commitment (hrs/week)",
  ];

  for (const label of fields) {
    y = checkPage(doc, y, 22);
    doc.setFontSize(9);
    doc.setFont(undefined, "bold");
    doc.setTextColor(...TEAL);
    doc.text(label, 14, y);
    y += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(14, y, maxW + 14, y);
    y += 3;
    doc.line(14, y + 5, maxW + 14, y + 5);
    y += 12;
  }

  // SMART Goal section
  y = checkPage(doc, y, 30);
  y += 4;
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.setTextColor(...NAVY);
  doc.text("SMART Goal", 14, y);
  y += 8;

  const smartLabels = ["Specific", "Measurable", "Achievable", "Relevant", "Time-Bound"];
  for (const label of smartLabels) {
    y = checkPage(doc, y, 22);
    doc.setFontSize(9);
    doc.setFont(undefined, "bold");
    doc.setTextColor(...TEAL);
    doc.text(label, 14, y);
    y += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(14, y, maxW + 14, y);
    y += 3;
    doc.line(14, y + 5, maxW + 14, y + 5);
    y += 12;
  }

  addFooter(doc);
  doc.save("goals-worksheet-blank.pdf");
}

// --- Sessions PDF ---

export async function exportSessionsPDF(sessionsData, milestonesData, profileData) {
  const doc = new jsPDF();
  const logo = await loadLogo();
  const maxW = doc.internal.pageSize.width - 28;
  let y = addHeader(doc, "Session Log", logo);

  if (profileData?.name) {
    doc.setFontSize(10);
    doc.setTextColor(...DARK);
    doc.text(`Name: ${profileData.name}`, 14, y);
    y += 5;
    if (profileData.partnerName) {
      doc.text(`Partner: ${profileData.partnerName}`, 14, y);
      y += 5;
    }
    y += 4;
  }

  const sorted = [...(sessionsData || [])].sort((a, b) => a.sessionNumber - b.sessionNumber);

  if (sorted.length === 0) {
    doc.setFontSize(10);
    doc.setTextColor(...GRAY);
    doc.text("No sessions logged yet.", 14, y);
    y += 10;
  } else {
    for (const s of sorted) {
      y = checkPage(doc, y, 40);

      // Session header bar
      doc.setFillColor(...NAVY);
      doc.rect(14, y - 4, maxW, 8, "F");
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.setTextColor(...WHITE);
      doc.text(`Session ${s.sessionNumber}`, 18, y + 1);
      if (s.date) {
        doc.text(s.date, maxW + 10, y + 1, { align: "right" });
      }
      if (s.menteeRating) {
        doc.text(`Rating: ${s.menteeRating}/5`, maxW - 20, y + 1, { align: "right" });
      }
      y += 10;

      if (s.topics) {
        y = addLabelValue(doc, y, "Topics Discussed", s.topics, maxW);
      }
      if (s.actionItems) {
        y = addLabelValue(doc, y, "Action Items", s.actionItems, maxW);
      }
      if (s.notes) {
        y = addLabelValue(doc, y, "Notes / Reflections", s.notes, maxW);
      }
      y += 4;
    }
  }

  // Milestones
  if (milestonesData && milestonesData.length > 0) {
    y = checkPage(doc, y, 30);
    y += 4;
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.setTextColor(...NAVY);
    doc.text("Milestones", 14, y);
    y += 8;

    for (const m of milestonesData) {
      y = checkPage(doc, y, 14);
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.setTextColor(...ACCENT);
      doc.text("\u2022", 14, y);
      doc.setTextColor(...DARK);
      doc.text(m.achievement, 20, y);
      if (m.date) {
        doc.setFont(undefined, "normal");
        doc.setTextColor(...GRAY);
        doc.text(`(${m.date})`, maxW + 14, y, { align: "right" });
      }
      y += 5;
      if (m.nextStep) {
        doc.setFont(undefined, "normal");
        doc.setFontSize(9);
        doc.setTextColor(...GRAY);
        doc.text(`Next: ${m.nextStep}`, 20, y);
        y += 5;
      }
      y += 2;
    }
  }

  addFooter(doc);
  doc.save("session-log.pdf");
}

export async function exportBlankSessionsPDF() {
  const doc = new jsPDF();
  const logo = await loadLogo();
  const maxW = doc.internal.pageSize.width - 28;
  let y = addHeader(doc, "Session Log (Blank)", logo);

  y += 2;
  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  doc.text("Print this blank session log to take notes by hand during your sessions.", 14, y);
  y += 10;

  for (let i = 1; i <= config.maxSessions; i++) {
    y = checkPage(doc, y, 60);

    doc.setFillColor(...NAVY);
    doc.rect(14, y - 4, maxW, 8, "F");
    doc.setFontSize(10);
    doc.setFont(undefined, "bold");
    doc.setTextColor(...WHITE);
    doc.text(`Session ${i}`, 18, y + 1);
    doc.text("Date: _______________", maxW + 10, y + 1, { align: "right" });
    y += 10;

    const sessionFields = ["Topics Discussed", "Action Items", "Notes / Reflections"];
    for (const label of sessionFields) {
      doc.setFontSize(9);
      doc.setFont(undefined, "bold");
      doc.setTextColor(...TEAL);
      doc.text(label, 14, y);
      y += 5;
      doc.setDrawColor(200, 200, 200);
      doc.line(14, y, maxW + 14, y);
      y += 3;
      doc.line(14, y + 5, maxW + 14, y + 5);
      y += 12;
    }

    // Rating
    doc.setFontSize(9);
    doc.setFont(undefined, "bold");
    doc.setTextColor(...TEAL);
    doc.text("Mentee Self-Rating:   1   2   3   4   5   (circle one)", 14, y);
    y += 10;
  }

  addFooter(doc);
  doc.save("session-log-blank.pdf");
}
