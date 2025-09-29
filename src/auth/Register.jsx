import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/organizations";

  const signUp = useAuthStore((s) => s.signUp);
  const session = useAuthStore((s) => s.session);

  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");

  const onChange = (e) => {
    setErr(""); setInfo("");
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErr(""); setInfo("");

    if (!form.email.trim()) return setErr("Email is required.");
    if (form.password.length < 6) return setErr("Password must be at least 6 characters.");
    if (form.password !== form.confirmPassword) return setErr("Passwords do not match.");

    setLoading(true);
    try {
      const data = await signUp({ email: form.email.trim(), password: form.password });
      // If email confirmations ON, session is null:
      if (!data.session && !session) {
        setInfo("Account created! Please check your email to confirm, then sign in.");
      } else {
        navigate(redirectTo, { replace: true });
      }
    } catch (ex) {
      setErr(ex?.message || "Sign up failed. Please try again.");
    } finally {
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
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Create Account
            </div>
            <h1 className="mt-4 text-2xl md:text-3xl font-extrabold leading-tight">
              Join Organization Manager
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Sign up to manage your organizations
            </p>
          </div>

          {err ? (
            <div className="mt-4 rounded-md border border-rose-200 dark:border-rose-800 bg-rose-50/80 dark:bg-rose-900/40 px-3 py-2 text-sm text-rose-700 dark:text-rose-200">
              {err}
            </div>
          ) : null}

          {info ? (
            <div className="mt-4 rounded-md border border-blue-200 dark:border-blue-800 bg-blue-50/80 dark:bg-blue-900/40 px-3 py-2 text-sm text-blue-700 dark:text-blue-200">
              {info}
            </div>
          ) : null}

          <form className="mt-6 space-y-4" onSubmit={handleSignup}>
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
              <input
                name="password" type="password" autoComplete="new-password" required
                value={form.password} onChange={onChange}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Minimum 6 characters.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Confirm Password</label>
              <input
                name="confirmPassword" type="password" autoComplete="new-password" required
                value={form.confirmPassword} onChange={onChange}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full rounded-lg bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700 active:bg-blue-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 dark:text-slate-300 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
          </p>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />
      </div>
    </div>
  );
}
