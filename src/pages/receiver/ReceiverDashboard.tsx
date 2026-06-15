import { DonationTable } from "../../components/DonationTable";
import { EmptyState } from "../../components/EmptyState";
import { PageHeader } from "../../components/PageHeader";
import { StatCard } from "../../components/StatCard";
import { useApp } from "../../context/AppContext";
import { ReceiverShell } from "./ReceiverShell";

export function ReceiverDashboard() {
  const { currentUser, donations } = useApp();
  const available = donations.filter((donation) => donation.status === "available");
  const accepted = donations.filter((donation) => donation.acceptedBy === currentUser?.id);

  return (
    <ReceiverShell>
      <PageHeader
        title="Receiver Dashboard"
        description="Review current session donations, accept suitable entries, and coordinate delivery progress."
      />
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Available Donations" value={available.length} icon="package" />
        <StatCard label="Accepted Donations" value={accepted.length} icon="checklist" />
        <StatCard label="In Transit" value={accepted.filter((item) => item.status === "in_transit").length} icon="truck" />
        <StatCard label="Completed" value={accepted.filter((item) => item.status === "delivered").length} icon="clipboard" />
      </div>
      <div className="mt-8">
        {available.length ? (
          <DonationTable donations={available.slice(0, 5)} />
        ) : (
          <EmptyState title="No available donations" description="Donations created by donors during this session will appear here." />
        )}
      </div>
    </ReceiverShell>
  );
}
