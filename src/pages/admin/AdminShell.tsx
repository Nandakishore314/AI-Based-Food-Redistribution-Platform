import { ReactNode } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { adminNav } from "../nav";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout role="admin" navItems={adminNav}>
      {children}
    </DashboardLayout>
  );
}
