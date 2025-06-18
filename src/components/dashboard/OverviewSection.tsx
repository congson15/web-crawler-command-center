
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Activity, Clock, Globe, Zap, Users, Database } from "lucide-react";

export function OverviewSection() {
  const quickStats = [
    { 
      label: "Active Plugins", 
      value: "12", 
      change: "+2", 
      trend: "up",
      icon: Globe,
      color: "from-blue-500 to-cyan-500"
    },
    { 
      label: "Jobs Today", 
      value: "1,234", 
      change: "+15%", 
      trend: "up",
      icon: Zap,
      color: "from-emerald-500 to-teal-500"
    },
    { 
      label: "Success Rate", 
      value: "98.5%", 
      change: "+0.2%", 
      trend: "up",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500"
    },
    { 
      label: "Avg Response", 
      value: "1.2s", 
      change: "-0.1s", 
      trend: "up",
      icon: Clock,
      color: "from-orange-500 to-red-500"
    }
  ];

  const recentActivity = [
    { plugin: "Amazon Scraper", status: "completed", time: "2 min ago", items: 45 },
    { plugin: "eBay Monitor", status: "running", time: "5 min ago", items: 23 },
    { plugin: "News API", status: "completed", time: "12 min ago", items: 156 },
    { plugin: "Stock Tracker", status: "queued", time: "15 min ago", items: 67 },
    { plugin: "Product Feed", status: "failed", time: "18 min ago", items: 0 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'running': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'queued': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-12">
        <div className="inline-flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center animate-pulse">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <p className="text-lg text-slate-600 mt-2">Monitor your web scraping operations in real-time</p>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="group hover-lift bg-gradient-to-br from-white via-white to-slate-50 border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <Badge className={`${stat.trend === 'up' ? 'bg-green-100 text-green-700 border-green-300' : 'bg-red-100 text-red-700 border-red-300'}`}>
                  {stat.change}
                </Badge>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-white via-slate-50 to-blue-50 border-blue-200 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-800">
              <div className="p-2 bg-blue-500 rounded-lg shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              Performance Metrics
              <Badge className="bg-blue-100 text-blue-700 border-blue-300 ml-auto">Live</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">CPU Usage</span>
                  <span className="text-sm font-bold text-blue-600">45%</span>
                </div>
                <Progress value={45} className="h-3" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">Memory</span>
                  <span className="text-sm font-bold text-emerald-600">62%</span>
                </div>
                <Progress value={62} className="h-3" />
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 text-slate-400" />
                <p className="text-lg font-medium text-slate-700">Performance Chart</p>
                <p className="text-slate-500">Real-time metrics visualization</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gradient-to-br from-white via-emerald-50 to-teal-50 border-emerald-200 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-800">
              <div className="p-2 bg-emerald-500 rounded-lg shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-emerald-100 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-medium text-slate-800">{activity.plugin}</p>
                      <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>{activity.time}</span>
                      <span className="font-medium">{activity.items} items</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg font-bold text-slate-800">
              <div className="p-2 bg-purple-500 rounded-lg shadow-lg">
                <Database className="h-5 w-5 text-white" />
              </div>
              Database Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Connection Pool</span>
                <Badge className="bg-green-100 text-green-700 border-green-300">Healthy</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Query Performance</span>
                <span className="text-sm font-medium text-slate-800">12ms avg</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg font-bold text-slate-800">
              <div className="p-2 bg-orange-500 rounded-lg shadow-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              Worker Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Active Workers</span>
                <span className="text-sm font-bold text-orange-600">8/10</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Queue Size</span>
                <span className="text-sm font-medium text-slate-800">42 jobs</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg font-bold text-slate-800">
              <div className="p-2 bg-blue-500 rounded-lg shadow-lg">
                <Globe className="h-5 w-5 text-white" />
              </div>
              Network Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Uptime</span>
                <span className="text-sm font-bold text-blue-600">99.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Response Time</span>
                <span className="text-sm font-medium text-slate-800">145ms</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-3">
            <Zap className="h-6 w-6" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="bg-white/20 hover:bg-white/30 border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105">
              Run All Plugins
            </Button>
            <Button className="bg-white/20 hover:bg-white/30 border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105">
              Clear Queue
            </Button>
            <Button className="bg-white/20 hover:bg-white/30 border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105">
              Export Data
            </Button>
            <Button className="bg-white/20 hover:bg-white/30 border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105">
              System Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
