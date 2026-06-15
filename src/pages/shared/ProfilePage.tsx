import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";
import { PageHeader } from "../../components/PageHeader";
import { useApp } from "../../context/AppContext";
import { AdminShell } from "../admin/AdminShell";
import { DonorShell } from "../donor/DonorShell";
import { ReceiverShell } from "../receiver/ReceiverShell";

export function ProfilePage() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const Shell =
    currentUser?.role === "admin"
      ? AdminShell
      : currentUser?.role === "receiver"
        ? ReceiverShell
        : DonorShell;

  return (
    <Shell>
      <PageHeader title="Profile" description="Session profile details for the current frontend-only user." />
      <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mint text-herb">
              <Icon name="user" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-ink">{currentUser?.name}</h2>
              <p className="text-sm text-slate-500">{currentUser?.email}</p>
            </div>
          </div>
          <Button
            variant="secondary"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            <Icon name="logout" size={18} />
            Logout
          </Button>
        </div>
      </div>
    </Shell>
  );
}
