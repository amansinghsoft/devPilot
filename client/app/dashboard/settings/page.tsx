
import { AppShell } from "@/components/layout/app-shell";
import { SettingDashboard } from "@/components/dashboard/setting-dashboard";

export default function SettingsPage() {
  return (
    <AppShell
      title="Account settings"
      description="Manage your connected GitHub account."
    >
      <SettingDashboard />
    </AppShell>
  );
}
