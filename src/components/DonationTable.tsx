import { ReactNode } from "react";
import { Donation } from "../types";
import { StatusBadge } from "./Badge";

export function DonationTable({
  donations,
  action,
}: {
  donations: Donation[];
  action?: (donation: Donation) => ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-field text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-4">Image</th>
              <th className="px-5 py-4">Food</th>
              <th className="px-5 py-4">Quantity</th>
              <th className="px-5 py-4">Expiry</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Pickup</th>
              {action ? <th className="px-5 py-4">Action</th> : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {donations.map((donation) => (
              <tr key={donation.id} className="align-top">
                <td className="px-5 py-4">
                  {donation.imageDataUrl ? (
                    <img src={donation.imageDataUrl} alt={donation.foodName} className="h-12 w-16 rounded-lg object-cover" />
                  ) : (
                    <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-field text-xs text-slate-400">No image</div>
                  )}
                </td>
                <td className="px-5 py-4 font-semibold text-ink">{donation.foodName}</td>
                <td className="px-5 py-4 text-slate-600">{donation.quantity}</td>
                <td className="px-5 py-4 text-slate-600">{donation.expiryTime}</td>
                <td className="px-5 py-4">
                  <StatusBadge status={donation.status} />
                </td>
                <td className="max-w-xs px-5 py-4 text-slate-600">{donation.pickupAddress}</td>
                {action ? <td className="px-5 py-4">{action(donation)}</td> : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
