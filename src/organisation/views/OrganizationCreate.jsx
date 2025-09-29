import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrgAPI } from "../api";
import ErrorBanner from "../components/ErrorBanner";
import OrgForm from "../components/OrgForm";

export default function OrganizationCreate() {
  const navigate = useNavigate();
  const [value, setValue] = useState({ name: "", description: "", is_active: true });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setSaving(true);
    try {
      const created = await OrgAPI.create(value);
      navigate(`/organizations/${created.id}`, { replace: true });
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
          <h1 className="text-2xl font-extrabold">Create Organization</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Fill the details and save.
          </p>
          <ErrorBanner message={err} />
          <div className="mt-6">
            <OrgForm value={value} onChange={setValue} onSubmit={onSubmit} submitting={saving} />
          </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />
      </div>
    </div>
  );
}
