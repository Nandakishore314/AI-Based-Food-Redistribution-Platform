import { Button } from "../../components/Button";
import { DonationTable } from "../../components/DonationTable";
import { EmptyState } from "../../components/EmptyState";
import { PageHeader } from "../../components/PageHeader";
import { useApp } from "../../context/AppContext";
import { ReceiverShell } from "./ReceiverShell";

export function DeliveryManagementPage() {
  const { currentUser, donations, updateDonationStatus } = useApp();
  const accepted = donations.filter((donation) => donation.acceptedBy === currentUser?.id);

  return (
    <ReceiverShell>
      <PageHeader title="Delivery Management" description="Update the frontend-only status of accepted donations." />
      {accepted.length ? (
        <DonationTable
          donations={accepted}
          action={(donation) => (
            <div className="flex flex-wrap gap-2">
              <Button
                variant="secondary"
                className="whitespace-nowrap"
                onClick={() => updateDonationStatus(donation.id, "in_transit")}
                disabled={donation.status === "delivered"}
              >
                In Transit
              </Button>
              <Button
                className="whitespace-nowrap"
                onClick={() => updateDonationStatus(donation.id, "delivered")}
                disabled={donation.status === "delivered"}
              >
                Delivered
              </Button>
            </div>
          )}
        />
      ) : (
        <EmptyState title="No deliveries to manage" description="Accepted donations will appear here for status updates." />
      )}
    </ReceiverShell>
  );
}
