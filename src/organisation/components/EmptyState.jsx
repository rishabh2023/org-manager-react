export default function EmptyState({ title, subtitle, action }) {
  return (
    <div className="text-center py-20">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Nothing here yet
      </div>
      <h2 className="mt-4 text-xl font-bold">{title}</h2>
      <p className="mt-1 text-slate-600 dark:text-slate-300">{subtitle}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
