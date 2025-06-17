
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Eye, Play, BarChart3, Clock, Globe } from "lucide-react";
import { EnhancedAddPluginDialog } from "./EnhancedAddPluginDialog";

export function PluginManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const plugins = [
    { 
      id: 1, 
      name: "Amazon Product Scraper", 
      website: "amazon.com", 
      lastRun: "2 hours ago", 
      status: "active",
      jobsToday: 12,
      successRate: 98.5,
      type: "html"
    },
    { 
      id: 2, 
      name: "eBay Price Monitor", 
      website: "ebay.com", 
      lastRun: "5 minutes ago", 
      status: "active",
      jobsToday: 8,
      successRate: 94.2,
      type: "html"
    },
    { 
      id: 3, 
      name: "News API Aggregator", 
      website: "newsapi.org", 
      lastRun: "1 day ago", 
      status: "inactive",
      jobsToday: 0,
      successRate: 87.1,
      type: "json"
    },
    { 
      id: 4, 
      name: "Stock Price Tracker", 
      website: "finance.yahoo.com", 
      lastRun: "30 minutes ago", 
      status: "active",
      jobsToday: 24,
      successRate: 96.8,
      type: "html"
    },
  ];

  const filteredPlugins = plugins.filter(plugin => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plugin.website.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || plugin.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'json' ? <BarChart3 className="h-4 w-4" /> : <Globe className="h-4 w-4" />;
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Plugin Management
          </h2>
          <p className="text-gray-600 mt-1">Manage and monitor your crawler plugins</p>
        </div>
        <EnhancedAddPluginDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg shadow-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Plugins</p>
                <p className="text-3xl font-bold">{plugins.length}</p>
              </div>
              <div className="bg-blue-400 p-3 rounded-lg">
                <Globe className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg shadow-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Active</p>
                <p className="text-3xl font-bold">{plugins.filter(p => p.status === 'active').length}</p>
              </div>
              <div className="bg-green-400 p-3 rounded-lg">
                <Play className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg shadow-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Jobs Today</p>
                <p className="text-3xl font-bold">{plugins.reduce((sum, p) => sum + p.jobsToday, 0)}</p>
              </div>
              <div className="bg-purple-400 p-3 rounded-lg">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg shadow-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Avg Success Rate</p>
                <p className="text-3xl font-bold">
                  {(plugins.reduce((sum, p) => sum + p.successRate, 0) / plugins.length).toFixed(1)}%
                </p>
              </div>
              <div className="bg-orange-400 p-3 rounded-lg">
                <BarChart3 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search plugins or websites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 h-12 border-gray-200 bg-white/50 backdrop-blur-sm"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 h-12 border-gray-200 bg-white/50 backdrop-blur-sm">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Plugins Table */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Plugins ({filteredPlugins.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-100">
                  <TableHead className="font-semibold text-gray-700">Plugin Name</TableHead>
                  <TableHead className="font-semibold text-gray-700">Type</TableHead>
                  <TableHead className="font-semibold text-gray-700">Website</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700">Last Run</TableHead>
                  <TableHead className="font-semibold text-gray-700">Jobs Today</TableHead>
                  <TableHead className="font-semibold text-gray-700">Success Rate</TableHead>
                  <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlugins.map((plugin) => (
                  <TableRow key={plugin.id} className="border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <TableCell className="font-medium text-gray-900">{plugin.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(plugin.type)}
                        <span className="text-sm font-medium capitalize">{plugin.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{plugin.website}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(plugin.status)} font-medium`}>
                        {plugin.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{plugin.lastRun}</TableCell>
                    <TableCell>
                      <span className="font-medium text-blue-600">{plugin.jobsToday}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-green-600">{plugin.successRate}%</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-yellow-50 hover:border-yellow-200 hover:text-yellow-600 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-200 transition-all duration-200 hover:scale-105"
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Run
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
