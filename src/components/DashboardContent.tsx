
import { SidebarTrigger } from "@/components/ui/sidebar";
import { OverviewSection } from "./dashboard/OverviewSection";
import { PluginManagement } from "./dashboard/PluginManagement";
import { JobQueueSection } from "./dashboard/JobQueueSection";
import { WorkerStatus } from "./dashboard/WorkerStatus";
import { LogsViewer } from "./dashboard/LogsViewer";
import { DashboardBackground } from "./dashboard/DashboardBackground";

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
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold gradient-text-blue">Settings</h2>
            <p className="text-gray-600 mt-2">Settings panel coming soon...</p>
          </div>
        );
      default:
        return <OverviewSection />;
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case "plugins": return "Plugin Management";
      case "jobs": return "Job Queue";
      case "workers": return "Worker Status";
      case "logs": return "System Logs";
      case "settings": return "Settings";
      default: return "Dashboard Overview";
    }
  };

  return (
    <div className="flex flex-col h-screen relative">
      <DashboardBackground />
      
      <header className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-white/20 px-6 py-4 flex items-center gap-4 shadow-lg">
        <SidebarTrigger className="lg:hidden" />
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <h1 className="text-2xl font-bold gradient-text-blue">
            {getSectionTitle()}
          </h1>
        </div>
      </header>
      
      <div className="flex-1 overflow-auto relative z-10">
        <div className="stagger-animation">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
