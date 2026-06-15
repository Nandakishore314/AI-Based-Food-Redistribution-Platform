import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AuthPage } from "./pages/AuthPage";
import { LandingPage } from "./pages/LandingPage";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { CreateDonationPage } from "./pages/donor/CreateDonationPage";
import { MyDonationsPage } from "./pages/donor/MyDonationsPage";
import { AcceptedDonationsPage } from "./pages/receiver/AcceptedDonationsPage";
import { AvailableDonationsPage } from "./pages/receiver/AvailableDonationsPage";
import { DeliveryManagementPage } from "./pages/receiver/DeliveryManagementPage";
import { ReceiverDashboard } from "./pages/receiver/ReceiverDashboard";
import { ProfilePage } from "./pages/shared/ProfilePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/:role" element={<AuthPage />} />

      <Route element={<ProtectedRoute role="donor" />}>
        <Route path="/donor" element={<Navigate to="/donor/create" replace />} />
        <Route path="/donor/create" element={<CreateDonationPage />} />
        <Route path="/donor/donations" element={<MyDonationsPage />} />
        <Route path="/donor/profile" element={<ProfilePage />} />
      </Route>

      <Route element={<ProtectedRoute role="receiver" />}>
        <Route path="/receiver" element={<ReceiverDashboard />} />
        <Route path="/receiver/available" element={<AvailableDonationsPage />} />
        <Route path="/receiver/accepted" element={<AcceptedDonationsPage />} />
        <Route path="/receiver/delivery" element={<DeliveryManagementPage />} />
        <Route path="/receiver/profile" element={<ProfilePage />} />
      </Route>

      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
