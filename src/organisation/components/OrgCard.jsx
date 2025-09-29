import { Link } from "react-router-dom";

export default function OrgCard({ org, onDelete }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white/70 dark:bg-slate-900/60 backdrop-blur shadow ring-1 ring-slate-200/70 dark:ring-slate-800">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-tr from-blue-500/10 to-emerald-500/10 blur-2xl"
      />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold">{org.name}</h3>
            {org.description ? (
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                {org.description}
              </p>
            ) : null}
            <p className="text-xs text-slate-500 mt-2">
              Created: {org.created_at ? new Date(org.created_at).toLocaleString() : "—"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={`/organizations/${org.id}`}
              className="rounded-lg bg-blue-600 text-white px-3 py-1.5 text-sm hover:bg-blue-700 transition"
            >
              Edit
            </Link>
            <button
              onClick={() => onDelete?.(org.id)}
              className="rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              Delete
            </button>
          </div>
        </div>
        {!org.is_active && (
          <span className="mt-3 inline-block rounded-full border border-amber-300/60 bg-amber-50/60 dark:bg-amber-900/20 px-2 py-0.5 text-xs text-amber-700 dark:text-amber-200">
            Inactive
          </span>
        )}
      </div>
      <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />
    </div>
  );
}
