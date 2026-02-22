import { useState } from "react";
import { getData } from "../utils/localStorage";
import {
  sessionStructure,
  mentorResponsibilities,
  conversationStarters,
  careerChangerTips,
  menteeSessionPrep,
  menteeGoalsGuide,
  menteeBetweenSessions,
  menteeJsonExport,
  menteeFourSessions,
  menteeAfterProgram,
} from "../data/mentorGuide";

function MentorTab() {
  return (
    <>
      {/* Session Structure */}
      <section className="mb-12 print:mb-8">
        <h2 className="text-xl font-bold text-navy mb-4">Session Structure</h2>
        <p className="text-sm text-dark/60 mb-4">
          A suggested 50-minute session format. Adjust based on what your mentee needs most.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy text-white text-left">
                <th className="px-4 py-3 font-medium">Phase</th>
                <th className="px-4 py-3 font-medium w-24">Duration</th>
                <th className="px-4 py-3 font-medium">What to Do</th>
              </tr>
            </thead>
            <tbody>
              {sessionStructure.map((row, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-white" : "bg-light-gray"}
                >
                  <td className="px-4 py-3 font-medium text-navy">{row.phase}</td>
                  <td className="px-4 py-3 text-teal font-medium">{row.duration}</td>
                  <td className="px-4 py-3 text-dark/70">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mentor Responsibilities */}
      <section className="mb-12 print:mb-8">
        <h2 className="text-xl font-bold text-navy mb-4">Mentor Responsibilities</h2>
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <ul className="space-y-3">
            {mentorResponsibilities.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-dark/80">
                <span className="shrink-0 w-5 h-5 rounded-full bg-isc2-green/20 text-isc2-green flex items-center justify-center text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Conversation Starters */}
      <section className="mb-12 print:mb-8">
        <h2 className="text-xl font-bold text-navy mb-4">Conversation Starters</h2>
        <p className="text-sm text-dark/60 mb-6">
          Use these to kick off meaningful conversations at different stages of the mentoring relationship.
        </p>
        <div className="space-y-6">
          {Object.values(conversationStarters).map((stage) => (
            <div
              key={stage.label}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden"
            >
              <div className="px-5 py-3 bg-light-gray border-b border-gray-100">
                <h3 className="font-bold text-navy text-sm">{stage.label}</h3>
                <p className="text-xs text-dark/50">{stage.description}</p>
              </div>
              <ul className="divide-y divide-gray-100">
                {stage.starters.map((q, i) => (
                  <li key={i} className="px-5 py-3 text-sm text-dark/80">
                    &ldquo;{q}&rdquo;
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Career Changer Tips */}
      <section className="mb-12 print:mb-8">
        <h2 className="text-xl font-bold text-navy mb-4">Tips for Mentoring Career Changers</h2>
        <p className="text-sm text-dark/60 mb-6">
          Many mentees in this program are transitioning from other fields. Here&rsquo;s how to support them effectively.
        </p>
        <div className="space-y-4">
          {careerChangerTips.map((tip, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 bg-white px-5 py-4"
            >
              <h3 className="font-bold text-teal text-sm mb-1">{tip.title}</h3>
              <p className="text-sm text-dark/70">{tip.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function MenteeTab() {
  return (
    <>
      {/* How to Prepare Before Each Session */}
      <section className="mb-12 print:mb-8">
        <h2 className="text-xl font-bold text-navy mb-2">How to Prepare Before Each Session</h2>
        <p className="text-sm text-dark/60 mb-6">
          A little preparation goes a long way. Spend 10&ndash;15 minutes before each meeting so you can make the most of your time together.
        </p>
        <div className="space-y-4">
          {menteeSessionPrep.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 bg-white px-5 py-4"
            >
              <h3 className="font-bold text-teal text-sm mb-1">{item.title}</h3>
              <p className="text-sm text-dark/70">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Completing the Goals Worksheet */}
      <section className="mb-12 print:mb-8">
        <h2 className="text-xl font-bold text-navy mb-2">{menteeGoalsGuide.title}</h2>
        <p className="text-sm text-dark/60 mb-6">{menteeGoalsGuide.intro}</p>
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          {menteeGoalsGuide.steps.map((step, i) => (
            <div
              key={i}
              className={`px-5 py-4 ${i > 0 ? "border-t border-gray-100" : ""}`}
            >
              <h3 className="font-bold text-navy text-sm mb-1">{step.label}</h3>
              <p className="text-sm text-dark/70">{step.tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Making the Most of 4 Sessions */}
      <section className="mb-12 print:mb-8">
        <h2 className="text-xl font-bold text-navy mb-2">Making the Most of 4 Sessions</h2>
        <p className="text-sm text-dark/60 mb-6">
          Four weeks goes fast! Here&rsquo;s a roadmap to help you get the most value from each session.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy text-white text-left">
                <th className="px-4 py-3 font-medium w-28">Session</th>
                <th className="px-4 py-3 font-medium">Focus</th>
                <th className="px-4 py-3 font-medium">Tips</th>
              </tr>
            </thead>
            <tbody>
              {menteeFourSessions.map((row, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-white" : "bg-light-gray"}
                >
                  <td className="px-4 py-3 font-bold text-navy whitespace-nowrap">{row.session}</td>
                  <td className="px-4 py-3 font-medium text-teal">{row.focus}</td>
                  <td className="px-4 py-3 text-dark/70">{row.tips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* What to Do Between Sessions */}
      <section className="mb-12 print:mb-8">
        <h2 className="text-xl font-bold text-navy mb-2">What to Do Between Sessions</h2>
        <p className="text-sm text-dark/60 mb-6">
          The real growth happens between meetings. Here&rsquo;s how to stay on track during the week.
        </p>
        <div className="space-y-4">
          {menteeBetweenSessions.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 bg-white px-5 py-4"
            >
              <h3 className="font-bold text-teal text-sm mb-1">{item.title}</h3>
              <p className="text-sm text-dark/70">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sharing Your Session Log */}
      <section className="mb-12 print:mb-8">
        <h2 className="text-xl font-bold text-navy mb-2">{menteeJsonExport.title}</h2>
        <p className="text-sm text-dark/60 mb-6">
          Sharing your progress with your mentor helps them prepare for your next session and see how far you&rsquo;ve come.
        </p>
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <ol className="space-y-3">
            {menteeJsonExport.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-dark/80">
                <span className="shrink-0 w-5 h-5 rounded-full bg-isc2-blue/15 text-isc2-blue flex items-center justify-center text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <p className="text-xs text-dark/50 mt-4 border-t border-gray-100 pt-3">
            {menteeJsonExport.note}
          </p>
        </div>
      </section>

      {/* After the Program Ends */}
      <section className="mb-12 print:mb-8">
        <h2 className="text-xl font-bold text-navy mb-2">After the Program Ends</h2>
        <p className="text-sm text-dark/60 mb-6">
          The program may be 4 weeks, but your cybersecurity journey is just getting started. Here&rsquo;s how to keep the momentum going.
        </p>
        <div className="space-y-4">
          {menteeAfterProgram.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 bg-white px-5 py-4"
            >
              <h3 className="font-bold text-teal text-sm mb-1">{item.title}</h3>
              <p className="text-sm text-dark/70">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default function Guide() {
  const profile = getData("profile");
  const defaultTab = profile?.role === "mentee" ? "mentee" : "mentor";
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 print:py-4 print:max-w-none">
      <h1 className="text-2xl font-bold text-navy mb-1">Program Guide</h1>
      <p className="text-dark/60 text-sm mb-8 print:mb-6">
        Everything you need to get the most out of the mentoring experience.
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-10 print:hidden">
        <button
          onClick={() => setActiveTab("mentor")}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "mentor"
              ? "bg-navy text-white"
              : "bg-light-gray text-dark/60 hover:bg-navy/10 hover:text-navy"
          }`}
        >
          Mentor Guide
        </button>
        <button
          onClick={() => setActiveTab("mentee")}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "mentee"
              ? "bg-navy text-white"
              : "bg-light-gray text-dark/60 hover:bg-navy/10 hover:text-navy"
          }`}
        >
          Mentee Guide
        </button>
      </div>

      {activeTab === "mentor" ? <MentorTab /> : <MenteeTab />}

      {/* Print footer */}
      <div className="hidden print:block text-center text-xs text-dark/40 border-t border-gray-200 pt-4 mt-8">
        ISC2 New Jersey Chapter &mdash; Cybersecurity Mentoring Toolkit &mdash; {activeTab === "mentor" ? "Mentor" : "Mentee"} Guide
      </div>
    </div>
  );
}
