
import { 
  LayoutDashboard, 
  Settings, 
  FileText, 
  Clock, 
  BarChart,
  TrendingUp
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
    title: "So Sánh Giá",
    icon: TrendingUp,
    id: "price-comparison",
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
    <Sidebar className="theme-border-primary" style={{ borderColor: 'var(--theme-primary)' + '30' }}>
      <SidebarHeader 
        className="px-6 py-4 border-b"
        style={{ 
          borderColor: 'var(--theme-primary)' + '30',
          background: `linear-gradient(135deg, var(--theme-accent), var(--theme-accent)cc)`
        }}
      >
        <h2 className="text-xl font-bold theme-text-primary" style={{ color: 'var(--theme-primary)' }}>
          Crawler Manager
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-xs font-medium uppercase tracking-wider theme-text-primary" style={{ color: 'var(--theme-primary)' + 'aa' }}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-3">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild
                    className={`w-full rounded-lg transition-all duration-200 ${
                      activeSection === item.id 
                        ? 'shadow-md' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    style={activeSection === item.id ? {
                      background: `linear-gradient(135deg, var(--theme-accent), var(--theme-accent)dd)`,
                      color: 'var(--theme-primary)',
                      borderColor: 'var(--theme-primary)'
                    } : {}}
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
