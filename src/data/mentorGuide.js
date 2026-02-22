export const sessionStructure = [
  {
    phase: "Opening Check-In",
    duration: "5 min",
    description: "Ask how the mentee is doing personally and professionally. Review action items from the last session.",
  },
  {
    phase: "Topic Deep-Dive",
    duration: "20 min",
    description: "Focus on the session's main topic — career planning, skill-building, certification prep, or job search strategy.",
  },
  {
    phase: "Hands-On / Resource Review",
    duration: "15 min",
    description: "Walk through a resource together, review a resume or LinkedIn profile, or demo a tool or platform.",
  },
  {
    phase: "Action Items & Next Steps",
    duration: "5 min",
    description: "Agree on 2–3 concrete action items for the mentee before the next session.",
  },
  {
    phase: "Closing & Scheduling",
    duration: "5 min",
    description: "Confirm the next session date. Ask if there's anything else the mentee wants to discuss.",
  },
];

export const mentorResponsibilities = [
  "Be consistent — show up on time and prepared for every session",
  "Listen more than you talk — ask open-ended questions",
  "Share your own career journey, including setbacks and lessons learned",
  "Tailor advice to the mentee's background, not a generic path",
  "Connect the mentee to your network when appropriate",
  "Celebrate wins — even small ones — to build confidence",
  "Respect boundaries — you're a guide, not a manager",
  "Follow up between sessions with a short email or resource share",
  "Be honest when you don't know something — model lifelong learning",
  "Track progress so the mentee can see how far they've come",
];

export const conversationStarters = {
  early: {
    label: "Early Sessions (1–2)",
    description: "Building rapport and understanding the mentee's background",
    starters: [
      "What first got you interested in cybersecurity?",
      "What does your ideal day at work look like?",
      "What's your biggest concern about breaking into the field?",
      "Tell me about your current role — what do you enjoy most?",
      "If you could fast-forward two years, where do you want to be?",
      "Have you explored any certifications or training yet?",
    ],
  },
  mid: {
    label: "Mid-Program Session (2)",
    description: "Deepening skills, refining the career path, and building momentum",
    starters: [
      "How is your certification study going? What's clicking, what's hard?",
      "Have you connected with anyone new in the field recently?",
      "Let's review your SMART goal — are we still on track?",
      "What's one thing you've learned since we started that surprised you?",
      "Is there a specific project or lab you'd like to walk through together?",
      "How are you balancing this with your current job and personal life?",
    ],
  },
  advanced: {
    label: "Late Sessions (3–4)",
    description: "Job search readiness, confidence building, and independence",
    starters: [
      "Let's look at your resume together — does it tell your cybersecurity story?",
      "Have you started applying to roles? What's been the response?",
      "What would make you feel truly ready for your target role?",
      "How would you explain your value to a hiring manager in 60 seconds?",
      "What's your plan for continued growth after our program ends?",
      "Is there anyone in my network I can introduce you to?",
    ],
  },
};

export const careerChangerTips = [
  {
    title: "Validate their existing experience",
    detail: "Career changers often underestimate how much their previous experience (project management, communication, analytical thinking) transfers directly to cybersecurity roles.",
  },
  {
    title: "Start with relatable frameworks",
    detail: "If they come from compliance, start with GRC. If they're technical, start with SOC or cloud security. Meet them where they are.",
  },
  {
    title: "Address imposter syndrome directly",
    detail: "Many career changers feel like they're \"starting over.\" Remind them that cybersecurity values diverse perspectives and that the skills gap means the industry needs them.",
  },
  {
    title: "Make the first win achievable",
    detail: "Help them get a quick, tangible win early — complete a TryHackMe room, earn the free (ISC)\u00B2 CC certification, or attend a local chapter meeting.",
  },
  {
    title: "Help them build a learning routine",
    detail: "Even 30 minutes a day adds up. Help them set a sustainable schedule rather than trying to cram everything at once.",
  },
  {
    title: "Normalize the timeline",
    detail: "A career transition takes 6–18 months for most people. Setting realistic expectations prevents burnout and disappointment.",
  },
  {
    title: "Focus on networking early",
    detail: "Many cybersecurity jobs are filled through referrals. Encourage them to attend meetups, engage on LinkedIn, and join communities like (ISC)\u00B2 NJ and WiCyS before they need a job.",
  },
];

// --- Mentee Guide Data ---

export const menteeSessionPrep = [
  {
    title: "Review your action items",
    detail: "Before each session, look back at the action items from your last meeting. Even if you didn't finish everything, knowing where you stand helps your mentor adjust and support you.",
  },
  {
    title: "Write down 1\u20132 questions",
    detail: "Come with at least one question or topic you want to discuss. It could be about a certification, a job posting you saw, a concept you're struggling with, or advice on networking. Your sessions are most valuable when you drive the agenda.",
  },
  {
    title: "Update your goals page",
    detail: "Take 5 minutes to revisit your Goal-Setting Worksheet in the app. Has anything changed? New interests? A certification you want to add? Keeping this current helps your mentor tailor their advice.",
  },
  {
    title: "Bring something to show",
    detail: "If you completed a lab, earned a badge, updated your resume, or wrote a LinkedIn post \u2014 share it! Your mentor wants to celebrate your progress, and it makes the conversation concrete.",
  },
];

export const menteeGoalsGuide = {
  title: "Completing Your Goals Worksheet Before Session 1",
  intro: "Your first session will be much more productive if your mentor already understands where you want to go. Here\u2019s how to fill out the Goal-Setting Worksheet thoughtfully:",
  steps: [
    {
      label: "Target Role",
      tip: "Pick the cybersecurity career track that excites you most \u2014 you can always change it later. If you\u2019re not sure, that\u2019s okay! Write down what appeals to you and discuss it with your mentor.",
    },
    {
      label: "Current Skills",
      tip: "Don\u2019t undersell yourself. Include technical skills, but also soft skills like project management, communication, analytical thinking, or compliance experience. These matter in cybersecurity.",
    },
    {
      label: "Skills to Develop",
      tip: "Be honest about gaps. Your mentor can\u2019t help if they don\u2019t know where you need support. It\u2019s a sign of strength, not weakness.",
    },
    {
      label: "SMART Goal",
      tip: "Try to set one focused goal for the 4-week program. Keep it achievable \u2014 for example, \u201CComplete the TryHackMe SOC Level 1 path\u201D or \u201CEarn the free (ISC)\u00B2 CC certification\u201D rather than \u201CGet a cybersecurity job.\u201D",
    },
  ],
};

export const menteeBetweenSessions = [
  {
    title: "Work on your action items",
    detail: "Even 20\u201330 minutes a day adds up. Your mentor will check in on these, and showing progress \u2014 even partial \u2014 builds momentum and trust.",
  },
  {
    title: "Log your session in the app",
    detail: "Right after each meeting, take 5 minutes to log the session in the Session Tracker. Capture topics discussed, action items, and a self-rating while it\u2019s fresh. You\u2019ll thank yourself later.",
  },
  {
    title: "Explore the Resource Library",
    detail: "Browse the resources for your career track. Try one new platform, read about a certification, or join a community. Come to your next session with something to talk about.",
  },
  {
    title: "Reach out if you\u2019re stuck",
    detail: "You don\u2019t have to wait until your next session to ask a question. A short email to your mentor is always welcome \u2014 they\u2019d rather hear from you than have you spin your wheels alone.",
  },
];

export const menteeJsonExport = {
  title: "Sharing Your Session Log with Your Mentor",
  steps: [
    "Go to the Sessions page in the app",
    "Click \u201CExport as JSON\u201D to download your data",
    "Save the file to your computer",
    "Email the file to your mentor, or share it via Google Drive or a shared folder",
    "Your mentor can import the file into their own copy of the app to see your progress",
  ],
  note: "The JSON file contains your profile, goals, session notes, action items, ratings, and milestones — everything stored in the app.",
};

export const menteeFourSessions = [
  {
    session: "Session 1",
    focus: "Get to know each other & set your direction",
    tips: "Share your background, discuss your target role, and review your completed Goals Worksheet together. Be open about where you are \u2014 there\u2019s no wrong starting point.",
  },
  {
    session: "Session 2",
    focus: "Dive into resources & build a learning plan",
    tips: "Review the resources your mentor shared. Ask which certifications or platforms to prioritize. Start narrowing your focus \u2014 depth beats breadth in 4 weeks.",
  },
  {
    session: "Session 3",
    focus: "Check progress & adjust course",
    tips: "Revisit your SMART goal. What\u2019s working? What\u2019s hard? This is the session to ask for introductions, resume feedback, or help with a specific challenge.",
  },
  {
    session: "Session 4",
    focus: "Look ahead & plan for independence",
    tips: "Discuss your next steps beyond the program. Ask your mentor for any final recommendations. Talk about staying connected \u2014 this doesn\u2019t have to be the end of the relationship.",
  },
];

export const menteeAfterProgram = [
  {
    title: "Export everything",
    detail: "Before the program ends, export your session log as JSON and your goals as PDF. These are your records of growth \u2014 save them somewhere safe.",
  },
  {
    title: "Keep building",
    detail: "The program gives you a foundation, but the real work continues. Stick with the learning routine you\u2019ve built, even if it\u2019s just 20 minutes a day.",
  },
  {
    title: "Stay connected to the community",
    detail: "Attend (ISC)\u00B2 NJ Chapter meetings, join WiCyS or other communities from the Resource Library, and stay active on LinkedIn. Your network is your net worth in cybersecurity.",
  },
  {
    title: "Keep in touch with your mentor",
    detail: "Most mentors are happy to hear from you after the program ends. A quick update every few months \u2014 a new cert, a job interview, a win \u2014 goes a long way.",
  },
  {
    title: "Pay it forward",
    detail: "When you\u2019re ready, consider becoming a mentor yourself. You don\u2019t need to be an expert \u2014 you just need to be one step ahead and willing to share what you\u2019ve learned.",
  },
];
