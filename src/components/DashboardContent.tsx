
import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardOverview } from "./dashboard/DashboardOverview";
import { PluginManagement } from "./dashboard/PluginManagement";
import { JobQueueSection } from "./dashboard/JobQueueSection";
import { WorkerStatus } from "./dashboard/WorkerStatus";
import { LogsViewer } from "./dashboard/LogsViewer";
import { SettingsPage } from "./dashboard/SettingsPage";
import { PriceComparison } from "./dashboard/PriceComparison";
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
        return <PluginManagement currentTheme={currentTheme} />;
      case "jobs":
        return <JobQueueSection currentTheme={currentTheme} />;
      case "workers":
        return <WorkerStatus currentTheme={currentTheme} />;
      case "logs":
        return <LogsViewer currentTheme={currentTheme} />;
      case "settings":
        return <SettingsPage currentTheme={currentTheme} />;
      case "price-comparison":
        return <PriceComparison currentTheme={currentTheme} />;
      default:
        return <DashboardOverview currentTheme={currentTheme} />;
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case "plugins": return "Plugin Management";
      case "jobs": return "Job Queue";
      case "workers": return "Worker Status";
      case "logs": return "System Logs";
      case "settings": return "Settings";
      case "price-comparison": return "So Sánh Giá";
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
