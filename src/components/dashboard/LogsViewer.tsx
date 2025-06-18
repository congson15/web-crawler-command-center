
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Search, Download, Filter, AlertTriangle, Info, CheckCircle, Clock } from "lucide-react";

export function LogsViewer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  const logs = [
    {
      id: 1,
      timestamp: "2024-01-15 10:30:45",
      level: "info",
      source: "amazon-scraper",
      message: "Successfully scraped 45 products from category 'Electronics'",
      details: "Processed in 2.3s with 0 errors"
    },
    {
      id: 2,
      timestamp: "2024-01-15 10:30:42",
      level: "warning", 
      source: "ebay-monitor",
      message: "Rate limit approaching for eBay API",
      details: "Current usage: 950/1000 requests per hour"
    },
    {
      id: 3,
      timestamp: "2024-01-15 10:30:38",
      level: "error",
      source: "stock-tracker",
      message: "Failed to connect to Yahoo Finance API",
      details: "Connection timeout after 30s. Retrying in 60s..."
    },
    {
      id: 4,
      timestamp: "2024-01-15 10:30:35",
      level: "info",
      source: "news-aggregator",
      message: "News articles batch completed",
      details: "Processed 156 articles from 12 sources"
    },
    {
      id: 5,
      timestamp: "2024-01-15 10:30:32",
      level: "debug",
      source: "worker-manager",
      message: "Worker pool status check",
      details: "Active: 8/10 workers, Queue: 42 jobs pending"
    },
    {
      id: 6,
      timestamp: "2024-01-15 10:30:28",
      level: "info",
      source: "amazon-scraper", 
      message: "Starting product category scan",
      details: "Target: Electronics > Smartphones (estimated 200 items)"
    },
    {
      id: 7,
      timestamp: "2024-01-15 10:30:25",
      level: "warning",
      source: "database",
      message: "High memory usage detected",
      details: "Current usage: 87% of allocated memory pool"
    },
    {
      id: 8,
      timestamp: "2024-01-15 10:30:20",
      level: "error",
      source: "proxy-manager",
      message: "Proxy rotation failed",
      details: "Unable to acquire new proxy. Falling back to direct connection"
    }
  ];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === "all" || log.level === levelFilter;
    const matchesSource = sourceFilter === "all" || log.source === sourceFilter;
    return matchesSearch && matchesLevel && matchesSource;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'debug': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error': return <AlertTriangle className="h-3 w-3" />;
      case 'warning': return <AlertTriangle className="h-3 w-3" />;
      case 'info': return <Info className="h-3 w-3" />;
      case 'debug': return <CheckCircle className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  const getLogBorderColor = (level: string) => {
    switch (level) {
      case 'error': return 'border-l-red-400';
      case 'warning': return 'border-l-yellow-400';
      case 'info': return 'border-l-blue-400';
      case 'debug': return 'border-l-gray-400';
      default: return 'border-l-slate-400';
    }
  };

  const logStats = {
    total: logs.length,
    errors: logs.filter(l => l.level === 'error').length,
    warnings: logs.filter(l => l.level === 'warning').length,
    info: logs.filter(l => l.level === 'info').length
  };

  const statsCards = [
    {
      title: "Total Logs",
      value: logStats.total.toString(),
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50"
    },
    {
      title: "Errors",
      value: logStats.errors.toString(),
      icon: AlertTriangle,
      color: "from-red-500 to-pink-500",
      bgColor: "from-red-50 to-pink-50"
    },
    {
      title: "Warnings", 
      value: logStats.warnings.toString(),
      icon: AlertTriangle,
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50"
    },
    {
      title: "Info",
      value: logStats.info.toString(),
      icon: Info,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50"
    }
  ];

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 min-h-screen">
      {/* Header */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-2xl flex items-center justify-center animate-pulse">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              System Logs
            </h1>
            <p className="text-lg text-slate-600 mt-2">Real-time system activity monitoring</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className={`hover-lift bg-gradient-to-br ${stat.bgColor} border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="bg-gradient-to-br from-white via-slate-50 to-emerald-50 border-emerald-200 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-emerald-500 rounded-lg shadow-lg">
              <Filter className="h-6 w-6 text-white" />
            </div>
            Log Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <Input
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 border-emerald-200 bg-white/50 backdrop-blur-sm"
            />
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="h-12 border-emerald-200 bg-white/50 backdrop-blur-sm">
                <SelectValue placeholder="Log Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="debug">Debug</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="h-12 border-emerald-200 bg-white/50 backdrop-blur-sm">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="amazon-scraper">Amazon Scraper</SelectItem>
                <SelectItem value="ebay-monitor">eBay Monitor</SelectItem>
                <SelectItem value="stock-tracker">Stock Tracker</SelectItem>
                <SelectItem value="news-aggregator">News Aggregator</SelectItem>
                <SelectItem value="worker-manager">Worker Manager</SelectItem>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="proxy-manager">Proxy Manager</SelectItem>
              </SelectContent>
            </Select>
            <Button className="h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-200 transition-all duration-300 hover:scale-105">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logs Display */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Live Logs ({filteredLogs.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            <div className="space-y-2 p-6">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className={`group p-4 bg-white rounded-lg border-l-4 ${getLogBorderColor(log.level)} shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-[1.01]`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge className={`${getLevelColor(log.level)} font-medium flex items-center gap-1`}>
                        {getLevelIcon(log.level)}
                        {log.level.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="font-mono text-xs bg-slate-50">
                        {log.source}
                      </Badge>
                    </div>
                    <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded">
                      {log.timestamp}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="font-medium text-slate-800">{log.message}</p>
                    <p className="text-sm text-slate-600 bg-slate-50 p-2 rounded border">
                      {log.details}
                    </p>
                  </div>
                </div>
              ))}
              
              {filteredLogs.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                    <Search className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-lg font-medium text-slate-700">No logs found</p>
                  <p className="text-slate-500">Try adjusting your search filters</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Log Analysis */}
      <Card className="bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 text-white shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-3">
            <FileText className="h-6 w-6" />
            Log Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-emerald-200">Error Distribution</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-emerald-100">Connection Issues:</span>
                  <span className="font-bold text-red-400">45%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-100">Rate Limits:</span>
                  <span className="font-bold text-yellow-400">30%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-100">Parsing Errors:</span>
                  <span className="font-bold text-orange-400">25%</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-emerald-200">Performance Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-emerald-100">Avg Log Rate:</span>
                  <span className="font-bold">12.5/min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-100">Peak Activity:</span>
                  <span className="font-bold">45/min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-100">Error Rate:</span>
                  <span className="font-bold text-red-400">2.1%</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-emerald-200">System Health</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-emerald-100">Overall Status:</span>
                  <span className="font-bold text-green-400">Healthy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-100">Uptime:</span>
                  <span className="font-bold">99.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-100">Last Issue:</span>
                  <span className="font-bold">2h ago</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
