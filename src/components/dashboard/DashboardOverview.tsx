
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Server,
  Database,
  Zap
} from "lucide-react";

interface DashboardOverviewProps {
  currentTheme: {
    name: string;
    id: string;
    primary: string;
    secondary: string;
    background: string;
    pageGradient: string;
    accent: string;
  };
}

export function DashboardOverview({ currentTheme }: DashboardOverviewProps) {
  const stats = [
    {
      title: "Active Jobs",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: Activity,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      title: "Workers Online",
      value: "8",
      change: "+2",
      trend: "up", 
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50"
    },
    {
      title: "Queue Size",
      value: "156",
      change: "-5%",
      trend: "down",
      icon: Clock,
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50"
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: "+1.2%",
      trend: "up",
      icon: CheckCircle,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "job",
      title: "Amazon Product Scraper completed",
      time: "2 minutes ago",
      status: "success",
      details: "Processed 1,247 items"
    },
    {
      id: 2,
      type: "worker",
      title: "New worker connected",
      time: "5 minutes ago", 
      status: "info",
      details: "Worker-007 from US-East region"
    },
    {
      id: 3,
      type: "alert",
      title: "Rate limit detected",
      time: "10 minutes ago",
      status: "warning",
      details: "eBay API throttling active"
    },
    {
      id: 4,
      type: "job",
      title: "Stock Price Tracker failed",
      time: "15 minutes ago",
      status: "error",
      details: "Connection timeout after 30s"
    }
  ];

  const systemHealth = [
    { name: "API Server", status: "healthy", uptime: "99.9%", response: "45ms" },
    { name: "Database", status: "healthy", uptime: "100%", response: "12ms" },
    { name: "Queue System", status: "warning", uptime: "98.2%", response: "78ms" },
    { name: "Worker Pool", status: "healthy", uptime: "99.5%", response: "23ms" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
      case 'healthy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': 
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': 
        return 'bg-red-100 text-red-800 border-red-200';
      case 'info':
      default: 
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
      case 'healthy':
        return <CheckCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4" />;
      case 'info':
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className={`bg-gradient-to-br ${currentTheme.pageGradient} min-h-screen`}>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-4 mb-6">
            <div 
              className="w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`
              }}
            >
              <Activity className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 
                className="text-4xl font-bold"
                style={{ color: currentTheme.primary }}
              >
                Dashboard Overview
              </h1>
              <p className="text-lg text-slate-600 mt-2">Monitor your crawling operations</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="hover-lift border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500"
              style={{ 
                background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.accent}cc)`,
                borderColor: `${currentTheme.primary}20`
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                    <p 
                      className="text-3xl font-bold"
                      style={{ color: currentTheme.primary }}
                    >
                      {stat.value}
                    </p>
                  </div>
                  <div 
                    className="p-3 rounded-xl shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`
                    }}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp 
                    className={`h-4 w-4 ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`} 
                  />
                  <span 
                    className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-slate-500">vs last week</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle 
                className="text-xl font-semibold flex items-center gap-2"
                style={{ color: currentTheme.primary }}
              >
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/50">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(activity.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-slate-900 truncate">{activity.title}</p>
                      <Badge className={`${getStatusColor(activity.status)} text-xs`}>
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{activity.details}</p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* System Health */}
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle 
                className="text-xl font-semibold flex items-center gap-2"
                style={{ color: currentTheme.primary }}
              >
                <Server className="h-5 w-5" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemHealth.map((system, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {system.name === 'Database' ? (
                        <Database className="h-5 w-5 text-slate-600" />
                      ) : system.name === 'Queue System' ? (
                        <Clock className="h-5 w-5 text-slate-600" />
                      ) : system.name === 'Worker Pool' ? (
                        <Users className="h-5 w-5 text-slate-600" />
                      ) : (
                        <Zap className="h-5 w-5 text-slate-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{system.name}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-slate-600">
                          Uptime: {system.uptime}
                        </span>
                        <span className="text-sm text-slate-600">
                          Response: {system.response}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(system.status)} capitalize`}>
                    {system.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Performance Overview */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle 
              className="text-xl font-semibold flex items-center gap-2"
              style={{ color: currentTheme.primary }}
            >
              <TrendingUp className="h-5 w-5" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">CPU Usage</span>
                  <span 
                    className="text-sm font-bold"
                    style={{ color: currentTheme.primary }}
                  >
                    45%
                  </span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">Memory Usage</span>
                  <span 
                    className="text-sm font-bold"
                    style={{ color: currentTheme.primary }}
                  >
                    67%
                  </span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">Network I/O</span>
                  <span 
                    className="text-sm font-bold"
                    style={{ color: currentTheme.primary }}
                  >
                    23%
                  </span>
                </div>
                <Progress value={23} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
