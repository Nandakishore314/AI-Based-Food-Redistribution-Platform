import { ReactNode } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { donorNav } from "../nav";

export function DonorShell({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout role="donor" navItems={donorNav}>
      {children}
    </DashboardLayout>
  );
}
