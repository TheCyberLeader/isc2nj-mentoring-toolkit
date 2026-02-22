import { Routes, Route, Link } from "react-router-dom";
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
        <Route
          path="*"
          element={
            <div className="max-w-2xl mx-auto px-4 py-16 text-center">
              <h1 className="text-2xl font-bold text-navy mb-4">Page Not Found</h1>
              <p className="text-dark/60 mb-6">
                The page you're looking for doesn't exist.
              </p>
              <Link
                to="/"
                className="inline-block bg-accent text-white px-6 py-2.5 rounded-lg font-medium hover:bg-accent/90 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          }
        />
      </Routes>
    </div>
  );
}
