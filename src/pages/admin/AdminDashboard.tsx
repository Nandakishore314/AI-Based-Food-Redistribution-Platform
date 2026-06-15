import { DonationTable } from "../../components/DonationTable";
import { EmptyState } from "../../components/EmptyState";
import { PageHeader } from "../../components/PageHeader";
import { StatCard } from "../../components/StatCard";
import { useApp } from "../../context/AppContext";
import { AdminShell } from "./AdminShell";

export function AdminDashboard() {
  const { donations } = useApp();

  return (
    <AdminShell>
      <PageHeader title="Admin Dashboard" description="Monitor food donations and current redistribution availability." />
      <div className="grid gap-4 md:grid-cols-2">
        <StatCard label="Total Donations" value={donations.length} icon="clipboard" />
        <StatCard label="Available Donations" value={donations.filter((item) => item.status === "available").length} icon="package" />
      </div>
      <div className="mt-8">
        {donations.length ? (
          <DonationTable donations={donations.slice(0, 6)} />
        ) : (
          <EmptyState title="No donation data yet" description="Donations created in this session will appear here for admin review." />
        )}
      </div>
    </AdminShell>
  );
}
