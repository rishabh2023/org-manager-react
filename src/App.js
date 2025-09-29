// src/App.js
import { Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from "./auth/Login";
import Register from "./auth/Register";

// Common
import NotFound from "./common/NotFound";

// Organisation views

import ProtectedRoute from "./routes/ProtectedRoute";
import OrganizationsList from "./organisation/views/OrganizationsList";
import OrganizationCreate from "./organisation/views/OrganizationCreate";
import OrganizationEdit from "./organisation/views/OrganizationEdit";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />

      {/* Protected section */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate to="/organizations" replace />} />
        <Route path="/organizations" element={<OrganizationsList />} />
        <Route path="/organizations/new" element={<OrganizationCreate />} />
        <Route path="/organizations/:id" element={<OrganizationEdit />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
