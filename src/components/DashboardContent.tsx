
import { SidebarTrigger } from "@/components/ui/sidebar";
import { OverviewSection } from "./dashboard/OverviewSection";
import { PluginManagement } from "./dashboard/PluginManagement";
import { JobQueueSection } from "./dashboard/JobQueueSection";
import { WorkerStatus } from "./dashboard/WorkerStatus";
import { LogsViewer } from "./dashboard/LogsViewer";

interface DashboardContentProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function DashboardContent({ activeSection }: DashboardContentProps) {
  const renderSection = () => {
    switch (activeSection) {
      case "plugins":
        return <PluginManagement />;
      case "jobs":
        return <JobQueueSection />;
      case "workers":
        return <WorkerStatus />;
      case "logs":
        return <LogsViewer />;
      case "settings":
        return <div className="p-6"><h2 className="text-2xl font-bold">Settings</h2><p className="text-gray-600 mt-2">Settings panel coming soon...</p></div>;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
        <SidebarTrigger className="lg:hidden" />
        <h1 className="text-2xl font-bold text-gray-900">Crawler Management Dashboard</h1>
      </header>
      <div className="flex-1 overflow-auto">
        {renderSection()}
      </div>
    </div>
  );
}
