import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("access_token");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-slate-900 dark:to-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Brand */}
        <Link to="/organizations" className="text-lg font-bold tracking-wide hover:opacity-90">
          OrgManager
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/organizations"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Organizations
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 hover:bg-red-600 px-3 py-1.5 text-sm font-medium shadow transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
