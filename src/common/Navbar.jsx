import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const navigate = useNavigate();

  const logout = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className="w-full bg-white/70 dark:bg-slate-900/60 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
      <Link to="/" className="font-semibold">Organization Manager</Link>
      <div className="flex items-center gap-3 text-sm">
        {user?.email && <span className="text-slate-600 dark:text-slate-300">{user.email}</span>}
        <button onClick={logout} className="rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
          Logout
        </button>
      </div>
    </div>
  );
}
