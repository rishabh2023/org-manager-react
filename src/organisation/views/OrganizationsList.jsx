import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OrgAPI } from "../api";
import Loading from "../components/Loading";
import ErrorBanner from "../components/ErrorBanner";
import EmptyState from "../components/EmptyState";
import OrgCard from "../components/OrgCard";
import Toolbar from "../components/Toolbar";
import ConfirmDialog from "../components/ConfirmDialog";

export default function OrganizationsList() {
  const [items, setItems] = useState(null);
  const [err, setErr] = useState("");
  const [confirmId, setConfirmId] = useState(null); // holds org id for deletion

  const fetchAll = async () => {
    try {
      setErr("");
      const data = await OrgAPI.list();
      setItems(data);
    } catch (e) {
      setErr(e.message);
    }
  };

  const handleDelete = async (id) => {
    setConfirmId(id); // open dialog
  };

  const confirmDelete = async () => {
    try {
      await OrgAPI.remove(confirmId);
      setItems((prev) => prev.filter((x) => x.id !== confirmId));
    } catch (e) {
      setErr(e.message);
    } finally {
      setConfirmId(null); // close dialog
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-100 px-4 py-8">
      <div className="mx-auto max-w-5xl relative overflow-hidden rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur shadow-xl ring-1 ring-slate-200/70 dark:ring-slate-800">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 blur-2xl"
        />
        <div className="p-6 md:p-8">
          <Toolbar
            right={
              <Link
                to="/organizations/new"
                className="rounded-lg bg-blue-600 text-white px-3 py-2 text-sm font-medium hover:bg-blue-700 transition"
              >
                + New Organization
              </Link>
            }
          />
          <ErrorBanner message={err} />
          {!items ? (
            <Loading text="Loading organizations..." />
          ) : items.length === 0 ? (
            <EmptyState
              title="No organizations yet"
              subtitle="Create your first organization to get started."
              action={
                <Link
                  to="/organizations/new"
                  className="rounded-lg bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 transition"
                >
                  Create Organization
                </Link>
              }
            />
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {items.map((org) => (
                <OrgCard key={org.id} org={org} onDelete={() => handleDelete(org.id)} />
              ))}
            </div>
          )}
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />
      </div>

      {/* Confirmation Modal */}
      <ConfirmDialog
        open={!!confirmId}
        title="Delete Organization"
        message="Are you sure you want to delete this organization? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setConfirmId(null)}
      />
    </div>
  );
}
