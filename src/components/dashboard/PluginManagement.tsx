
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Code
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

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Header Section */}
      <div className="relative">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Plugin Management
              </h1>
              <p className="text-gray-600 text-lg">
                Manage and monitor your web crawling plugins
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                <Zap className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">{mockPlugins.length} Active Plugins</span>
              </div>
              <EnhancedAddPluginDialog />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search plugins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-gray-200 bg-white/80 backdrop-blur-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 h-12 border-gray-200 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Plugins Grid */}
      <div className="grid gap-6">
        {filteredPlugins.map((plugin, index) => (
          <Card key={plugin.id} className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {/* Plugin Icon & Type */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      {getTypeIcon(plugin.type)}
                    </div>
                    <div className="absolute -top-1 -right-1">
                      {getStatusIcon(plugin.status)}
                    </div>
                  </div>

                  {/* Plugin Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg text-gray-800">{plugin.name}</h3>
                      <Badge className={`${getStatusColor(plugin.status)} px-3 py-1`}>
                        {plugin.status}
                      </Badge>
                      <Badge variant="outline" className="bg-gray-50">
                        {plugin.type.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {plugin.url.length > 50 ? `${plugin.url.substring(0, 50)}...` : plugin.url}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {plugin.frequency}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>{plugin.fields} fields configured</span>
                        <span>Last run: {plugin.lastRun}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-9 w-9 p-0 hover:bg-green-50 hover:border-green-300 hover:text-green-600"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-9 w-9 p-0 hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-600"
                  >
                    <Pause className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-9 w-9 p-0 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-9 w-9 p-0 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-9 w-9 p-0"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPlugins.length === 0 && (
        <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No plugins found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : "Create your first plugin to get started"
              }
            </p>
            {!searchTerm && statusFilter === "all" && <EnhancedAddPluginDialog />}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
