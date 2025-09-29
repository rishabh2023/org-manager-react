export default function ErrorBanner({ message }) {
  if (!message) return null;
  let text = message;
  try {
    // try to parse backend JSON error
    const parsed = JSON.parse(message);
    if (parsed?.detail) text = typeof parsed.detail === "string" ? parsed.detail : JSON.stringify(parsed.detail);
  } catch {}
  return (
    <div className="mb-4 rounded-md border border-rose-200 dark:border-rose-800 bg-rose-50/80 dark:bg-rose-900/40 px-3 py-2 text-sm text-rose-700 dark:text-rose-200">
      {text}
    </div>
  );
}
