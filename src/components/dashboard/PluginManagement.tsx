
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Eye } from "lucide-react";
import { AddPluginDialog } from "./AddPluginDialog";

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
        <AddPluginDialog />
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

      {/* Plugins Table */}
      <Card>
        <CardHeader>
          <CardTitle>Plugins ({filteredPlugins.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plugin Name</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Run</TableHead>
                <TableHead>Jobs Today</TableHead>
                <TableHead>Success Rate</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlugins.map((plugin) => (
                <TableRow key={plugin.id}>
                  <TableCell className="font-medium">{plugin.name}</TableCell>
                  <TableCell className="text-gray-600">{plugin.website}</TableCell>
                  <TableCell>
                    <Badge variant={plugin.status === 'active' ? 'default' : 'secondary'}>
                      {plugin.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{plugin.lastRun}</TableCell>
                  <TableCell>{plugin.jobsToday}</TableCell>
                  <TableCell className="text-green-600">{plugin.successRate}%</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
