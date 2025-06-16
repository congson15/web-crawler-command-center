
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardContent } from "@/components/DashboardContent";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-1">
          <DashboardContent activeSection={activeSection} setActiveSection={setActiveSection} />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
