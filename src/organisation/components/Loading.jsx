export default function Loading({ text = "Loading..." }) {
  return (
    <div className="w-full flex items-center justify-center py-10 text-slate-500 dark:text-slate-400">
      <div className="inline-flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
        <span>{text}</span>
      </div>
    </div>
  );
}
