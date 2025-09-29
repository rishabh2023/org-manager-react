import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur shadow-xl ring-1 ring-slate-200/70 dark:ring-slate-800">
          {/* Decorative blob */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 blur-2xl"
          />

          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                Error 404
              </span>
              <span className="hidden md:inline">The page doesn’t exist</span>
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl font-extrabold leading-tight">
              Oops… we couldn’t find that page
            </h1>

            <p className="mt-3 text-slate-600 dark:text-slate-300">
              The URL <code className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5">{location.pathname}</code> may be
              incorrect or the page has moved.
            </p>

            {/* Helpful links */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 text-white px-4 py-2.5 font-medium hover:bg-blue-700 active:bg-blue-800 transition"
              >
                ← Go to Dashboard
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2.5 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                Sign in
              </Link>

              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2.5 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                ⤺ Go Back
              </button>
            </div>

            {/* Tiny tips */}
            <div className="mt-6 text-xs text-slate-500 dark:text-slate-400">
              Tip: Check the URL for typos or use the navigation above to find what you need.
            </div>
          </div>

          {/* Bottom stripe */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />
        </div>
      </div>
    </div>
  );
}
