
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Play, 
  Pause, 
  Settings, 
  Trash2, 
  Search, 
  Filter,
  MoreVertical,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
  Globe,
  Code,
  RefreshCw
} from "lucide-react";
import { EnhancedAddPluginDialog } from "./EnhancedAddPluginDialog";

const mockPlugins = [
  {
    id: 1,
    name: "Amazon Product Monitor",
    url: "https://amazon.com/product/123",
    type: "html",
    status: "running",
    lastRun: "2 mins ago",
    fields: 5,
    frequency: "Every 5 minutes"
  },
  {
    id: 2,
    name: "Reddit API Crawler",
    url: "https://reddit.com/api/subreddit/programming",
    type: "json",
    status: "paused",
    lastRun: "1 hour ago",
    fields: 8,
    frequency: "Every 15 minutes"
  },
  {
    id: 3,
    name: "News Headlines Scraper",
    url: "https://news.example.com",
    type: "html",
    status: "error",
    lastRun: "3 hours ago",
    fields: 3,
    frequency: "Every hour"
  },
  {
    id: 4,
    name: "Stock Price Tracker",
    url: "https://api.stocks.com/prices",
    type: "json",
    status: "running",
    lastRun: "30 seconds ago",
    fields: 12,
    frequency: "Every minute"
  }
];

export function PluginManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "paused":
        return <Pause className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-100 text-green-800 border-green-200";
      case "paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "html" ? (
      <Globe className="h-4 w-4 text-blue-500" />
    ) : (
      <Code className="h-4 w-4 text-purple-500" />
    );
  };

  const filteredPlugins = mockPlugins.filter(plugin => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || plugin.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statsCards = [
    {
      title: "Total Plugins",
      value: mockPlugins.length.toString(),
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50"
    },
    {
      title: "Running",
      value: mockPlugins.filter(p => p.status === 'running').length.toString(),
      icon: Zap,
      color: "from-green-500 to-emerald-500", 
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      title: "Paused",
      value: mockPlugins.filter(p => p.status === 'paused').length.toString(),
      icon: Pause,
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50"
    },
    {
      title: "Failed",
      value: mockPlugins.filter(p => p.status === 'error').length.toString(),
      icon: AlertCircle,
      color: "from-red-500 to-pink-500",
      bgColor: "from-red-50 to-pink-50"
    }
  ];

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 min-h-screen">
      {/* Header */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-2xl flex items-center justify-center animate-pulse">
            <Globe className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Plugin Management
            </h1>
            <p className="text-lg text-slate-600 mt-2">Manage and monitor your web crawling plugins</p>
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

      {/* Controls */}
      <Card className="bg-gradient-to-br from-white via-slate-50 to-purple-50 border-purple-200 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-purple-500 rounded-lg shadow-lg">
              <RefreshCw className="h-6 w-6 text-white" />
            </div>
            Plugin Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search plugins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 h-12 border-purple-200 bg-white/50 backdrop-blur-sm"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 h-12 border-purple-200 bg-white/50 backdrop-blur-sm">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-3">
            <EnhancedAddPluginDialog />
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-200 transition-all duration-300 hover:scale-105">
              <Play className="h-4 w-4 mr-2" />
              Start All
            </Button>
            <Button variant="outline" className="hover:bg-yellow-50 hover:border-yellow-200 hover:text-yellow-600">
              <Pause className="h-4 w-4 mr-2" />
              Pause All
            </Button>
            <Button variant="outline" className="hover:bg-red-50 hover:border-red-200 hover:text-red-600">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Stopped
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Plugins Table */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Plugins ({filteredPlugins.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-100">
                  <TableHead className="font-semibold text-slate-700">ID</TableHead>
                  <TableHead className="font-semibold text-slate-700">Plugin</TableHead>
                  <TableHead className="font-semibold text-slate-700">Type</TableHead>
                  <TableHead className="font-semibold text-slate-700">Status</TableHead>
                  <TableHead className="font-semibold text-slate-700">URL</TableHead>
                  <TableHead className="font-semibold text-slate-700">Fields</TableHead>
                  <TableHead className="font-semibold text-slate-700">Frequency</TableHead>
                  <TableHead className="font-semibold text-slate-700">Last Run</TableHead>
                  <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlugins.map((plugin) => (
                  <TableRow key={plugin.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <TableCell className="font-mono text-sm text-slate-600">#{plugin.id}</TableCell>
                    <TableCell className="font-medium text-slate-900">{plugin.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(plugin.type)}
                        <Badge variant="outline" className="bg-gray-50 capitalize">
                          {plugin.type}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(plugin.status)} font-medium flex items-center gap-1 w-fit`}>
                        {getStatusIcon(plugin.status)}
                        {plugin.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600 font-mono">
                        {plugin.url.length > 40 ? `${plugin.url.substring(0, 40)}...` : plugin.url}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-slate-800">{plugin.fields}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600">{plugin.frequency}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600">{plugin.lastRun}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        {plugin.status === 'running' ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-yellow-50 hover:border-yellow-200 hover:text-yellow-600"
                          >
                            <Pause className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-green-50 hover:border-green-200 hover:text-green-600"
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
