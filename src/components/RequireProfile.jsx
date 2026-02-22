import { Link } from "react-router-dom";
import { getData } from "../utils/localStorage";

/**
 * Route guard that shows a "set up profile" prompt if no profile exists in localStorage.
 * @param {Object} props
 * @param {string} props.title - Page title shown in the fallback prompt.
 * @param {string} props.message - Description shown in the fallback prompt.
 * @param {React.ReactNode} props.children - Content to render when a profile exists.
 */
export default function RequireProfile({ title, message, children }) {
  const profile = getData("profile");

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-navy mb-4">{title}</h1>
        <p className="text-dark/60 mb-6">{message}</p>
        <Link
          to="/setup"
          className="inline-block bg-accent text-white px-6 py-2.5 rounded-lg font-medium hover:bg-accent/90 transition-colors"
        >
          Set Up Profile
        </Link>
      </div>
    );
  }

  return children;
}
