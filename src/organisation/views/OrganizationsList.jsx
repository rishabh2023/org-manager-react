// src/organisation/views/OrganizationsList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OrgAPI } from "../api";
import Loading from "../components/Loading";
import ErrorBanner from "../components/ErrorBanner";
import EmptyState from "../components/EmptyState";
import OrgCard from "../components/OrgCard";
import Toolbar from "../components/Toolbar";
import ConfirmDialog from "../components/ConfirmDialog";
import Navbar from "../../common/Navbar"; // <-- add navbar with Logout

export default function OrganizationsList() {
  const [items, setItems] = useState(null);
  const [err, setErr] = useState("");
  const [confirmId, setConfirmId] = useState(null);

  // search + pagination
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  // debounce q
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 300);
    return () => clearTimeout(t);
  }, [q]);

  const fetchAll = async (query, limitVal, offsetVal) => {
    try {
      setErr("");
      // ask for limit+1 to detect if there's a next page
      const data = await OrgAPI.list({
        q: query || undefined,
        limit: (limitVal ?? limit) + 1,
        offset: offsetVal ?? offset,
      });

      // compute hasMore, slice to 'limit'
      setHasMore(data.length > (limitVal ?? limit));
      setItems(data.slice(0, limitVal ?? limit));
    } catch (e) {
      setErr(e.message || "Failed to load organizations");
      setItems([]);
      setHasMore(false);
    }
  };

  // initial load & whenever search/pagination changes
  useEffect(() => {
    fetchAll(debouncedQ, limit, offset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQ, limit, offset]);

  // delete flow
  const handleDeleteClick = (id) => setConfirmId(id);
  const confirmDelete = async () => {
    try {
      await OrgAPI.remove(confirmId);
      // refetch current page to stay consistent
      fetchAll(debouncedQ, limit, offset);
    } catch (e) {
      setErr(e.message || "Delete failed");
    } finally {
      setConfirmId(null);
    }
  };

  // pagination actions
  const nextPage = () => {
    if (hasMore) setOffset((o) => o + limit);
  };
  const prevPage = () => {
    setOffset((o) => Math.max(0, o - limit));
  };

  const canPrev = offset > 0;
  const canNext = hasMore;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-100">
      {/* Global navbar with Logout */}
      <Navbar />

      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-5xl relative overflow-hidden rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur shadow-xl ring-1 ring-slate-200/70 dark:ring-slate-800">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 blur-2xl"
          />
          <div className="p-6 md:p-8">
            <Toolbar
              right={
                <div className="flex items-center gap-2">
                  <input
                    value={q}
                    onChange={(e) => {
                      setQ(e.target.value);
                      setOffset(0); // reset to first page on new search
                    }}
                    placeholder="Search by name..."
                    className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={limit}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setLimit(v);
                      setOffset(0); // reset page when page size changes
                    }}
                    className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/40 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={5}>5 / page</option>
                    <option value={10}>10 / page</option>
                    <option value={20}>20 / page</option>
                  </select>
                  <Link
                    to="/organizations/new"
                    className="rounded-lg bg-blue-600 text-white px-3 py-2 text-sm font-medium hover:bg-blue-700 transition"
                  >
                    + New Organization
                  </Link>
                </div>
              }
            />
            <ErrorBanner message={err} />

            {!items ? (
              <Loading text="Loading organizations..." />
            ) : items.length === 0 ? (
              <EmptyState
                title={debouncedQ ? "No results" : "No organizations yet"}
                subtitle={
                  debouncedQ
                    ? "Try a different search term."
                    : "Create your first organization to get started."
                }
                action={
                  !debouncedQ && (
                    <Link
                      to="/organizations/new"
                      className="rounded-lg bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 transition"
                    >
                      Create Organization
                    </Link>
                  )
                }
              />
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  {items.map((org) => (
                    <OrgCard key={org.id} org={org} onDelete={() => handleDeleteClick(org.id)} />
                  ))}
                </div>

                {/* Pagination controls */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    Showing <span className="font-medium">{items.length}</span>
                    {" of "}
                    <span className="font-medium">{offset + items.length}</span>+
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevPage}
                      disabled={!canPrev}
                      className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={nextPage}
                      disabled={!canNext}
                      className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />
        </div>
      </main>

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
