import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/organizations";

  const signIn = useAuthStore((s) => s.signIn);

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => {
    setErr("");
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await signIn({ email: form.email.trim(), password: form.password });
      navigate(redirectTo, { replace: true });
    } catch (ex) {
      setErr(ex?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setErr("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: "github" });
      if (error) throw error;
      // redirect handled by Supabase
    } catch (ex) {
      setErr(ex?.message || "GitHub login failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md relative overflow-hidden rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur shadow-xl ring-1 ring-slate-200/70 dark:ring-slate-800">
        <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 blur-2xl" />
        <div className="p-6 md:p-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Secure Sign In
            </div>
            <h1 className="mt-4 text-2xl md:text-3xl font-extrabold leading-tight">
              Welcome back
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Sign in to manage your organizations
            </p>
          </div>

          {err ? (
            <div className="mt-4 rounded-md border border-rose-200 dark:border-rose-800 bg-rose-50/80 dark:bg-rose-900/40 px-3 py-2 text-sm text-rose-700 dark:text-rose-200">
              {err}
            </div>
          ) : null}

          <form className="mt-6 space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <input
                name="email" type="email" autoComplete="email" required
                value={form.email} onChange={onChange}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <div className="relative">
                <input
                  name="password" type={showPw ? "text" : "password"} autoComplete="current-password" required
                  value={form.password} onChange={onChange}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/40 px-3 py-2 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
                <button
                  type="button" onClick={() => setShowPw((s) => !s)}
                  className="absolute inset-y-0 right-2 my-auto text-xs text-slate-500 hover:text-slate-300"
                >
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full rounded-lg bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700 active:bg-blue-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

      
          <p className="text-center text-sm text-slate-600 dark:text-slate-300 mt-6">
            New here?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />
      </div>
    </div>
  );
}
