import { ReactNode } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { receiverNav } from "../nav";

export function ReceiverShell({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout role="receiver" navItems={receiverNav}>
      {children}
    </DashboardLayout>
  );
}
