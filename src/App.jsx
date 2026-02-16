import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivacyBanner from "./components/PrivacyBanner";
import Home from "./pages/Home";
import Setup from "./pages/Setup";
import Goals from "./pages/Goals";
import Sessions from "./pages/Sessions";
import Resources from "./pages/Resources";
import EmailTemplates from "./pages/EmailTemplates";
import Guide from "./pages/Guide";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <PrivacyBanner />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/email-templates" element={<EmailTemplates />} />
        <Route path="/guide" element={<Guide />} />
      </Routes>
    </div>
  );
}
