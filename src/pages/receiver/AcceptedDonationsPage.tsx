import { DonationTable } from "../../components/DonationTable";
import { EmptyState } from "../../components/EmptyState";
import { PageHeader } from "../../components/PageHeader";
import { useApp } from "../../context/AppContext";
import { ReceiverShell } from "./ReceiverShell";

export function AcceptedDonationsPage() {
  const { currentUser, donations } = useApp();
  const accepted = donations.filter((donation) => donation.acceptedBy === currentUser?.id);

  return (
    <ReceiverShell>
      <PageHeader title="Accepted Donations" description="Donations accepted by this receiver during the current session." />
      {accepted.length ? (
        <DonationTable donations={accepted} />
      ) : (
        <EmptyState title="No accepted donations yet" description="Accept an available donation to begin delivery coordination." />
      )}
    </ReceiverShell>
  );
}
