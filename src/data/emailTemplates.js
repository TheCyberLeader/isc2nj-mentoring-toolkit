export const emailTemplates = [
  {
    id: "welcome",
    label: "First Outreach / Welcome Email",
    subject: "Welcome to Our Mentoring Relationship!",
    scenario: "Send this before or right after your first session.",
    body: `Hi [MENTEE_NAME],

It was great connecting with you through the [PROGRAM_NAME] mentoring program! I'm excited to support your journey into cybersecurity.

Based on our initial conversation, it sounds like you're most interested in [TARGET_ROLE]. I've started putting together resources tailored to that path, which I'll share in our first session.

Before we meet, it would be great if you could think through:
  \u2022 Where you want to be in 12 months \u2014 what does success look like?
  \u2022 Your top 2\u20133 skills gaps you most want to close
  \u2022 Any certifications you've already started or considered

Our first session is scheduled for [SESSION_DATE]. I look forward to working with you!

[MENTOR_NAME]`,
  },
  {
    id: "resources",
    label: "Role-Specific Resource Email",
    subject: "Your [TARGET_ROLE] Career Path \u2014 Resources & Next Steps",
    scenario: "Send after Session 1 once the target role is clear.",
    body: `Hi [MENTEE_NAME],

It was great speaking with you about your career transition into [TARGET_ROLE]! Based on our conversation, I've pulled together resources specifically tailored to your interests and background.

--- CERTIFICATIONS TO CONSIDER ---
[Paste relevant certs from the Resource Library tab]

--- PRACTICE PLATFORMS ---
[Paste relevant platforms from the Resource Library tab]

--- COMMUNITIES & NETWORKING ---
\u2022 Women in Cybersecurity (WiCyS) \u2014 wicys.org
[Add other local/relevant communities]

--- GETTING STARTED ---
Your [CURRENT_BACKGROUND] will be incredibly valuable in cybersecurity. I'd recommend starting with [FIRST_STEP] while working toward [MEDIUM_TERM_GOAL].

Please don't hesitate to reach out with questions!

[MENTOR_NAME]`,
  },
  {
    id: "checkin",
    label: "Mid-Program Check-In",
    subject: "Checking In \u2014 How Are Things Going?",
    scenario: "Send between sessions to maintain momentum.",
    body: `Hi [MENTEE_NAME],

I wanted to check in between our sessions \u2014 how are things going?

A few things I'm curious about:
  \u2022 Have you had a chance to work on the action items from our last session?
  \u2022 How is [CURRENT_FOCUS_AREA] progressing?
  \u2022 Anything you've run into that you'd like to talk through?

No pressure for a long reply \u2014 even a quick update helps me tailor our next session.

Our next session is [SESSION_DATE]. If you need to reschedule, just let me know!

[MENTOR_NAME]`,
  },
  {
    id: "resource-share",
    label: "Sharing a Specific Resource or Opportunity",
    subject: "Resources for [TOPIC] \u2014 As Promised",
    scenario: "Use when sharing an event, course, or opportunity you spotted.",
    body: `Hi [MENTEE_NAME],

Following up on our conversation \u2014 I came across [RESOURCE_NAME] and immediately thought of you.

What it is: [BRIEF_DESCRIPTION]
Why it's relevant: [PERSONALIZED_REASON]
Cost: [COST]
Link: [URL]

[OPTIONAL: If there's an event]
Date: [EVENT_DATE]
Location: [EVENT_LOCATION]
Registration: [REGISTRATION_URL]

This looks like a great fit given your goal of [MENTEE_GOAL]. Let me know if you have questions!

[MENTOR_NAME]`,
  },
  {
    id: "celebrate",
    label: "Celebrating a Win / End of Program",
    subject: "Congratulations \u2014 And What's Next",
    scenario: "Send when a mentee hits a milestone or the program wraps.",
    body: `Hi [MENTEE_NAME],

I just wanted to take a moment to acknowledge \u2014 [SPECIFIC_WIN].

That is a real achievement, and you should be proud. This didn't happen by accident. It's the result of [SPECIFIC_EFFORT_OR_QUALITY].

As you move forward:
  \u2022 Don't stop building \u2014 [SPECIFIC_NEXT_STEP]
  \u2022 Stay connected to the community \u2014 [SPECIFIC_COMMUNITY]
  \u2022 Pay it forward \u2014 when you're ready, consider becoming a mentor yourself

It has been a genuine pleasure working with you. Please keep me posted on your journey, and never hesitate to reach out.

Onward!

[MENTOR_NAME]`,
  },
];
