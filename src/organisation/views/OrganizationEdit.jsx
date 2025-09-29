import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OrgAPI } from "../api";
import Loading from "../components/Loading";
import ErrorBanner from "../components/ErrorBanner";
import OrgForm from "../components/OrgForm";

export default function OrganizationEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(null);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const load = async () => {
    try {
      setErr("");
      const data = await OrgAPI.get(id);
      setValue({
        name: data.name,
        description: data.description || "",
        is_active: data.is_active,
      });
    } catch (e) {
      setErr(e.message);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErr("");
    try {
      await OrgAPI.update(id, value);
      navigate("/organizations", { replace: true });
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-100 px-4 py-8">
      <div className="mx-auto max-w-2xl relative overflow-hidden rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur shadow-xl ring-1 ring-slate-200/70 dark:ring-slate-800">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 blur-2xl"
        />
        <div className="p-6 md:p-8">
          <h1 className="text-2xl font-extrabold">Edit Organization</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Update details and save changes.
          </p>
          <ErrorBanner message={err} />
          {!value ? (
            <Loading text="Loading organization..." />
          ) : (
            <div className="mt-6">
              <OrgForm value={value} onChange={setValue} onSubmit={onSubmit} submitting={saving} />
            </div>
          )}
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />
      </div>
    </div>
  );
}
