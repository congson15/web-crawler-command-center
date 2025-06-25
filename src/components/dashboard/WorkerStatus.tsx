
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Users, Activity, Server, RefreshCw, Settings, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface WorkerStatusProps {
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

export function WorkerStatus({ currentTheme }: WorkerStatusProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const workers = [
    {
      id: "worker-001",
      name: "Primary Worker",
      status: "active",
      region: "US-East",
      uptime: "24h 15m",
      jobsCompleted: 1247,
      currentJob: "Amazon Product Scraper",
      cpuUsage: 45,
      memoryUsage: 67,
      lastSeen: "2 min ago"
    },
    {
      id: "worker-002",
      name: "Secondary Worker",
      status: "active",
      region: "US-West",
      uptime: "18h 32m",
      jobsCompleted: 892,
      currentJob: "eBay Price Monitor",
      cpuUsage: 32,
      memoryUsage: 54,
      lastSeen: "1 min ago"
    },
    {
      id: "worker-003",
      name: "Backup Worker",
      status: "idle",
      region: "EU-Central",
      uptime: "12h 45m",
      jobsCompleted: 543,
      currentJob: "-",
      cpuUsage: 15,
      memoryUsage: 23,
      lastSeen: "30 sec ago"
    },
    {
      id: "worker-004",
      name: "Emergency Worker",
      status: "offline",
      region: "Asia-Pacific",
      uptime: "-",
      jobsCompleted: 234,
      currentJob: "-",
      cpuUsage: 0,
      memoryUsage: 0,
      lastSeen: "5 min ago"
    }
  ];

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || worker.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'idle': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'offline': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Activity className="h-4 w-4" />;
      case 'idle': return <Clock className="h-4 w-4" />;
      case 'offline': return <AlertTriangle className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const statsCards = [
    {
      title: "Total Workers",
      value: workers.length.toString(),
      icon: Users,
      color: currentTheme.primary,
      bgColor: currentTheme.accent
    },
    {
      title: "Active Workers",
      value: workers.filter(w => w.status === 'active').length.toString(),
      icon: Activity,
      color: currentTheme.primary,
      bgColor: currentTheme.accent
    },
    {
      title: "Jobs Completed",
      value: workers.reduce((sum, w) => sum + w.jobsCompleted, 0).toLocaleString(),
      icon: CheckCircle,
      color: currentTheme.primary,
      bgColor: currentTheme.accent
    },
    {
      title: "Avg CPU Usage",
      value: `${Math.round(workers.reduce((sum, w) => sum + w.cpuUsage, 0) / workers.length)}%`,
      icon: Server,
      color: currentTheme.primary,
      bgColor: currentTheme.accent
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
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 
                className="text-4xl font-bold"
                style={{ color: currentTheme.primary }}
              >
                Worker Status
              </h1>
              <p className="text-lg text-slate-600 mt-2">Monitor your worker pool and performance</p>
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
                background: `linear-gradient(135deg, ${stat.bgColor}, ${stat.bgColor}cc)`,
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
                <Settings className="h-6 w-6 text-white" />
              </div>
              Worker Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Input
                placeholder="Search workers..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="idle">Idle</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
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
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Status
              </Button>
              <Button 
                variant="outline" 
                className="hover:scale-105 transition-all duration-300"
                style={{ borderColor: `${currentTheme.primary}50`, color: currentTheme.primary }}
              >
                <Users className="h-4 w-4 mr-2" />
                Add Worker
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Workers Table */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle 
              className="text-xl font-semibold flex items-center gap-2"
              style={{ color: currentTheme.primary }}
            >
              <Users className="h-5 w-5" />
              Workers ({filteredWorkers.length})
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
                      Worker
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
                      Region
                    </TableHead>
                    <TableHead 
                      className="font-semibold"
                      style={{ color: currentTheme.primary }}
                    >
                      Current Job
                    </TableHead>
                    <TableHead 
                      className="font-semibold"
                      style={{ color: currentTheme.primary }}
                    >
                      Performance
                    </TableHead>
                    <TableHead 
                      className="font-semibold"
                      style={{ color: currentTheme.primary }}
                    >
                      Uptime
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
                  {filteredWorkers.map((worker) => (
                    <TableRow key={worker.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <TableCell>
                        <div>
                          <div className="font-medium text-slate-900">{worker.name}</div>
                          <div className="text-sm text-slate-500">{worker.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(worker.status)} font-medium flex items-center gap-1 w-fit capitalize`}>
                          {getStatusIcon(worker.status)}
                          {worker.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className="font-medium"
                          style={{ borderColor: `${currentTheme.primary}50`, color: currentTheme.primary }}
                        >
                          {worker.region}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-700">{worker.currentJob}</TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>CPU:</span>
                            <span style={{ color: currentTheme.primary }}>{worker.cpuUsage}%</span>
                          </div>
                          <Progress value={worker.cpuUsage} className="h-1" />
                          <div className="flex justify-between text-sm">
                            <span>Memory:</span>
                            <span style={{ color: currentTheme.primary }}>{worker.memoryUsage}%</span>
                          </div>
                          <Progress value={worker.memoryUsage} className="h-1" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="text-slate-800">{worker.uptime}</div>
                          <div className="text-slate-500">Last: {worker.lastSeen}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
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
                            className="h-8 w-8 p-0 hover:bg-green-50 hover:border-green-200 hover:text-green-600"
                          >
                            <RefreshCw className="h-4 w-4" />
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
