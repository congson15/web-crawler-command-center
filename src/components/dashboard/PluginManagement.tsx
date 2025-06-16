
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2, Plus } from "lucide-react";

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
      successRate: 98.5 
    },
    { 
      id: 2, 
      name: "eBay Price Monitor", 
      website: "ebay.com", 
      lastRun: "5 minutes ago", 
      status: "active",
      jobsToday: 8,
      successRate: 94.2 
    },
    { 
      id: 3, 
      name: "News Aggregator", 
      website: "reddit.com", 
      lastRun: "1 day ago", 
      status: "inactive",
      jobsToday: 0,
      successRate: 87.1 
    },
    { 
      id: 4, 
      name: "Stock Price Tracker", 
      website: "finance.yahoo.com", 
      lastRun: "30 minutes ago", 
      status: "active",
      jobsToday: 24,
      successRate: 96.8 
    },
  ];

  const filteredPlugins = plugins.filter(plugin => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plugin.website.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || plugin.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Plugin Management</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Plugin
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search plugins or websites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
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

      {/* Plugins Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPlugins.map((plugin) => (
          <Card key={plugin.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{plugin.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{plugin.website}</p>
                </div>
                <Badge variant={plugin.status === 'active' ? 'default' : 'secondary'}>
                  {plugin.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Last Run:</span>
                  <p className="font-medium">{plugin.lastRun}</p>
                </div>
                <div>
                  <span className="text-gray-600">Jobs Today:</span>
                  <p className="font-medium">{plugin.jobsToday}</p>
                </div>
                <div>
                  <span className="text-gray-600">Success Rate:</span>
                  <p className="font-medium text-green-600">{plugin.successRate}%</p>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Run Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
