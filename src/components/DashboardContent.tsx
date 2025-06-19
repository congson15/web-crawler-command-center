
import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { OverviewSection } from "./dashboard/OverviewSection";
import { PluginManagement } from "./dashboard/PluginManagement";
import { JobQueueSection } from "./dashboard/JobQueueSection";
import { WorkerStatus } from "./dashboard/WorkerStatus";
import { LogsViewer } from "./dashboard/LogsViewer";
import { SettingsPage } from "./dashboard/SettingsPage";
import { DashboardBackground } from "./dashboard/DashboardBackground";
import { ThemeSelector } from "./dashboard/ThemeSelector";

interface DashboardContentProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function DashboardContent({ activeSection }: DashboardContentProps) {
  const [currentTheme, setCurrentTheme] = useState({
    name: "Ocean Blue",
    id: "blue",
    primary: "#3b82f6",
    secondary: "#1e40af",
    background: "from-blue-50 via-indigo-50 to-purple-50",
    pageGradient: "from-slate-50 via-blue-50 to-indigo-50",
    accent: "#dbeafe"
  });

  const handleThemeChange = (theme: any) => {
    setCurrentTheme(theme);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "plugins":
        return (
          <div className={`bg-gradient-to-br ${currentTheme.pageGradient} min-h-screen`}>
            <PluginManagement />
          </div>
        );
      case "jobs":
        return (
          <div className={`bg-gradient-to-br ${currentTheme.pageGradient} min-h-screen`}>
            <JobQueueSection />
          </div>
        );
      case "workers":
        return (
          <div className={`bg-gradient-to-br ${currentTheme.pageGradient} min-h-screen`}>
            <WorkerStatus />
          </div>
        );
      case "logs":
        return (
          <div className={`bg-gradient-to-br ${currentTheme.pageGradient} min-h-screen`}>
            <LogsViewer />
          </div>
        );
      case "settings":
        return (
          <div className={`bg-gradient-to-br ${currentTheme.pageGradient} min-h-screen`}>
            <SettingsPage />
          </div>
        );
      default:
        return (
          <div className={`bg-gradient-to-br ${currentTheme.pageGradient} min-h-screen`}>
            <OverviewSection />
          </div>
        );
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
      <DashboardBackground theme={{ colors: { background: currentTheme.background } }} />
      <ThemeSelector onThemeChange={handleThemeChange} />
      
      <header className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-white/20 px-6 py-4 flex items-center gap-4 shadow-lg">
        <SidebarTrigger className="lg:hidden" />
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <h1 className="text-2xl font-bold gradient-text">
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
