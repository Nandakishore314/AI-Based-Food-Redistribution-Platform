import { DonationTable } from "../../components/DonationTable";
import { EmptyState } from "../../components/EmptyState";
import { PageHeader } from "../../components/PageHeader";
import { useApp } from "../../context/AppContext";
import { DonorShell } from "./DonorShell";

export function MyDonationsPage() {
  const { currentUser, donations } = useApp();
  const donorDonations = donations.filter((donation) => donation.donorId === currentUser?.id);

  return (
    <DonorShell>
      <PageHeader title="My Donations" description="All donation records created by this donor during the current browser session." />
      {donorDonations.length ? (
        <DonationTable donations={donorDonations} />
      ) : (
        <EmptyState title="No donor records yet" description="Create a donation to populate this table with frontend session data." />
      )}
    </DonorShell>
  );
}
