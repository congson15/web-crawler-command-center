
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
            <PluginManagement currentTheme={currentTheme} />
          </div>
        );
      case "jobs":
        return (
          <div className={`bg-gradient-to-br ${currentTheme.pageGradient} min-h-screen`}>
            <div className="p-8">
              <h1 className="text-4xl font-bold mb-6" style={{ color: currentTheme.primary }}>
                Job Queue Management
              </h1>
              <div className="text-gray-600">Job queue functionality coming soon...</div>
            </div>
          </div>
        );
      case "workers":
        return (
          <div className={`bg-gradient-to-br ${currentTheme.pageGradient} min-h-screen`}>
            <div className="p-8">
              <h1 className="text-4xl font-bold mb-6" style={{ color: currentTheme.primary }}>
                Worker Status
              </h1>
              <div className="text-gray-600">Worker status monitoring coming soon...</div>
            </div>
          </div>
        );
      case "logs":
        return (
          <div className={`bg-gradient-to-br ${currentTheme.pageGradient} min-h-screen`}>
            <div className="p-8">
              <h1 className="text-4xl font-bold mb-6" style={{ color: currentTheme.primary }}>
                System Logs
              </h1>
              <div className="text-gray-600">System logs viewer coming soon...</div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className={`bg-gradient-to-br ${currentTheme.pageGradient} min-h-screen`}>
            <div className="p-8">
              <h1 className="text-4xl font-bold mb-6" style={{ color: currentTheme.primary }}>
                Settings
              </h1>
              <div className="text-gray-600">Settings panel coming soon...</div>
            </div>
          </div>
        );
      default:
        return (
          <div className={`bg-gradient-to-br ${currentTheme.pageGradient} min-h-screen`}>
            <div className="p-8">
              <h1 className="text-4xl font-bold mb-6" style={{ color: currentTheme.primary }}>
                Dashboard Overview
              </h1>
              <div className="text-gray-600">Dashboard overview coming soon...</div>
            </div>
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
      
      <header 
        className="relative z-10 backdrop-blur-xl border-b shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${currentTheme.accent}cc, ${currentTheme.accent}dd)`,
          borderColor: currentTheme.primary + '40'
        }}
      >
        <div className="px-6 py-4 flex items-center gap-4">
          <SidebarTrigger className="lg:hidden" />
          <div className="flex items-center gap-4">
            <div 
              className="w-8 h-8 rounded-lg shadow-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`
              }}
            >
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <h1 
              className="text-2xl font-bold"
              style={{ color: currentTheme.primary }}
            >
              {getSectionTitle()}
            </h1>
          </div>
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
