
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, Trash2, RefreshCw, Clock, Zap, AlertTriangle, CheckCircle } from "lucide-react";

interface JobQueueSectionProps {
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

export function JobQueueSection({ currentTheme }: JobQueueSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const jobs = [
    {
      id: "job-001",
      plugin: "Amazon Product Scraper",
      status: "running",
      progress: 65,
      startTime: "10:30 AM",
      estimatedCompletion: "11:15 AM",
      itemsProcessed: 450,
      totalItems: 692,
      priority: "high"
    },
    {
      id: "job-002", 
      plugin: "eBay Price Monitor",
      status: "queued",
      progress: 0,
      startTime: "-",
      estimatedCompletion: "11:45 AM",
      itemsProcessed: 0,
      totalItems: 234,
      priority: "medium"
    },
    {
      id: "job-003",
      plugin: "News API Aggregator", 
      status: "completed",
      progress: 100,
      startTime: "9:15 AM",
      estimatedCompletion: "10:00 AM",
      itemsProcessed: 1240,
      totalItems: 1240,
      priority: "low"
    },
    {
      id: "job-004",
      plugin: "Stock Price Tracker",
      status: "failed",
      progress: 23,
      startTime: "8:45 AM",
      estimatedCompletion: "-",
      itemsProcessed: 45,
      totalItems: 195,
      priority: "high"
    },
    {
      id: "job-005",
      plugin: "Social Media Monitor",
      status: "paused",
      progress: 78,
      startTime: "9:30 AM",
      estimatedCompletion: "12:00 PM",
      itemsProcessed: 890,
      totalItems: 1140,
      priority: "medium"
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.plugin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'queued': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'paused': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Zap className="h-4 w-4" />;
      case 'queued': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <AlertTriangle className="h-4 w-4" />;
      case 'paused': return <Pause className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const statsCards = [
    {
      title: "Total Jobs",
      value: jobs.length.toString(),
      icon: Clock,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50"
    },
    {
      title: "Running",
      value: jobs.filter(j => j.status === 'running').length.toString(),
      icon: Zap,
      color: "from-green-500 to-emerald-500", 
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      title: "Queued",
      value: jobs.filter(j => j.status === 'queued').length.toString(),
      icon: Clock,
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50"
    },
    {
      title: "Failed",
      value: jobs.filter(j => j.status === 'failed').length.toString(),
      icon: AlertTriangle,
      color: "from-red-500 to-pink-500",
      bgColor: "from-red-50 to-pink-50"
    }
  ];

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
              <Clock className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 
                className="text-4xl font-bold"
                style={{ color: currentTheme.primary }}
              >
                Job Queue Management
              </h1>
              <p className="text-lg text-slate-600 mt-2">Monitor and control your scraping jobs</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <Card 
              key={index} 
              className="hover-lift border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500"
              style={{ 
                background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.accent}cc)`,
                borderColor: `${currentTheme.primary}20`
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
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
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Controls */}
        <Card 
          className="border-white/50 shadow-xl"
          style={{ 
            background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.accent}cc)`,
            borderColor: `${currentTheme.primary}30`
          }}
        >
          <CardHeader>
            <CardTitle 
              className="text-xl font-bold flex items-center gap-3"
              style={{ color: currentTheme.primary }}
            >
              <div 
                className="p-2 rounded-lg shadow-lg"
                style={{ backgroundColor: currentTheme.primary }}
              >
                <RefreshCw className="h-6 w-6 text-white" />
              </div>
              Queue Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 h-12 bg-white/50 backdrop-blur-sm"
                style={{ borderColor: `${currentTheme.primary}30` }}
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger 
                  className="w-full sm:w-48 h-12 bg-white/50 backdrop-blur-sm"
                  style={{ borderColor: `${currentTheme.primary}30` }}
                >
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="queued">Queued</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-3">
              <Button 
                className="shadow-lg transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                  color: 'white'
                }}
              >
                <Play className="h-4 w-4 mr-2" />
                Start All
              </Button>
              <Button 
                variant="outline" 
                className="hover:scale-105 transition-all duration-300"
                style={{ borderColor: `${currentTheme.primary}50`, color: currentTheme.primary }}
              >
                <Pause className="h-4 w-4 mr-2" />
                Pause All
              </Button>
              <Button 
                variant="outline" 
                className="hover:scale-105 transition-all duration-300"
                style={{ borderColor: `${currentTheme.primary}50`, color: currentTheme.primary }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Completed
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Jobs Table */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle 
              className="text-xl font-semibold flex items-center gap-2"
              style={{ color: currentTheme.primary }}
            >
              <Clock className="h-5 w-5" />
              Jobs ({filteredJobs.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-100">
                    <TableHead 
                      className="font-semibold"
                      style={{ color: currentTheme.primary }}
                    >
                      Job ID
                    </TableHead>
                    <TableHead 
                      className="font-semibold"
                      style={{ color: currentTheme.primary }}
                    >
                      Plugin
                    </TableHead>
                    <TableHead 
                      className="font-semibold"
                      style={{ color: currentTheme.primary }}
                    >
                      Status
                    </TableHead>
                    <TableHead 
                      className="font-semibold"
                      style={{ color: currentTheme.primary }}
                    >
                      Priority
                    </TableHead>
                    <TableHead 
                      className="font-semibold"
                      style={{ color: currentTheme.primary }}
                    >
                      Progress
                    </TableHead>
                    <TableHead 
                      className="font-semibold"
                      style={{ color: currentTheme.primary }}
                    >
                      Items
                    </TableHead>
                    <TableHead 
                      className="font-semibold"
                      style={{ color: currentTheme.primary }}
                    >
                      Time
                    </TableHead>
                    <TableHead 
                      className="text-right font-semibold"
                      style={{ color: currentTheme.primary }}
                    >
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job) => (
                    <TableRow key={job.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="font-mono text-sm text-slate-600">{job.id}</TableCell>
                      <TableCell className="font-medium text-slate-900">{job.plugin}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(job.status)} font-medium flex items-center gap-1 w-fit`}>
                          {getStatusIcon(job.status)}
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getPriorityColor(job.priority)} font-medium capitalize`}>
                          {job.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span style={{ color: currentTheme.primary }}>{job.progress}%</span>
                            <span className="text-slate-500">{job.itemsProcessed}/{job.totalItems}</span>
                          </div>
                          <Progress value={job.progress} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium text-slate-800">{job.itemsProcessed}</div>
                          <div className="text-slate-500">of {job.totalItems}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="text-slate-800">Started: {job.startTime}</div>
                          <div className="text-slate-500">ETA: {job.estimatedCompletion}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          {job.status === 'running' ? (
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
    </div>
  );
}
