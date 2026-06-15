import { DonationStatus } from "../types";

const statusStyles: Record<DonationStatus, string> = {
  available: "bg-emerald-50 text-emerald-700 border-emerald-200",
  accepted: "bg-blue-50 text-blue-700 border-blue-200",
  in_transit: "bg-amber-50 text-amber-700 border-amber-200",
  delivered: "bg-slate-100 text-slate-700 border-slate-200",
};

export function StatusBadge({ status }: { status: DonationStatus }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>
      {status.replace("_", " ")}
    </span>
  );
}
