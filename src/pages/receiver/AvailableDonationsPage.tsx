import { Button } from "../../components/Button";
import { DonationTable } from "../../components/DonationTable";
import { EmptyState } from "../../components/EmptyState";
import { PageHeader } from "../../components/PageHeader";
import { useApp } from "../../context/AppContext";
import { ReceiverShell } from "./ReceiverShell";

export function AvailableDonationsPage() {
  const { donations, acceptDonation } = useApp();
  const available = donations.filter((donation) => donation.status === "available");

  return (
    <ReceiverShell>
      <PageHeader title="Available Donations" description="Frontend donation entries currently open for receiver acceptance." />
      {available.length ? (
        <DonationTable
          donations={available}
          action={(donation) => (
            <Button onClick={() => acceptDonation(donation.id)} className="whitespace-nowrap">
              Accept
            </Button>
          )}
        />
      ) : (
        <EmptyState title="No available donations" description="When donors submit food entries, open items will be listed here." />
      )}
    </ReceiverShell>
  );
}
