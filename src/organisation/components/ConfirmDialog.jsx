import React from "react";

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-xl bg-white dark:bg-slate-900 shadow-xl ring-1 ring-slate-200/70 dark:ring-slate-700 p-6">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          {title}
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
