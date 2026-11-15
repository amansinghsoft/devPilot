
import { AppShell } from "@/components/layout/app-shell";
import { OverviewDashboard } from "@/components/dashboard/overview-dashboard";

export default function OverviewPage() {
  return (
    <AppShell
      title="Workspace overview"
      description="A quick look at your connected GitHub workspace."
    >
      <OverviewDashboard />
    </AppShell>
  );
}
