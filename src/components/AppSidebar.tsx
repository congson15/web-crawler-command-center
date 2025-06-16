
import { 
  LayoutDashboard, 
  Settings, 
  FileText, 
  Clock, 
  BarChart 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    id: "dashboard",
  },
  {
    title: "Plugins",
    icon: Settings,
    id: "plugins",
  },
  {
    title: "Jobs",
    icon: Clock,
    id: "jobs",
  },
  {
    title: "Workers",
    icon: BarChart,
    id: "workers",
  },
  {
    title: "Logs",
    icon: FileText,
    id: "logs",
  },
  {
    title: "Settings",
    icon: Settings,
    id: "settings",
  },
];

interface AppSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function AppSidebar({ activeSection, setActiveSection }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Crawler Manager</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-3">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild
                    className={`w-full rounded-lg ${
                      activeSection === item.id 
                        ? 'bg-blue-50 text-blue-600 border-blue-200' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className="flex items-center gap-3 px-3 py-2 w-full text-left"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
