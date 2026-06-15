import { Icon, IconName } from "./Icon";

export function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number | string;
  icon: IconName;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-ink">{value}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mint text-herb">
          <Icon name={icon} size={22} />
        </div>
      </div>
    </div>
  );
}
