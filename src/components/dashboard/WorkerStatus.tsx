
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, Cpu, HardDrive, Wifi, Activity, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export function WorkerStatus() {
  const workers = [
    {
      id: "worker-001",
      name: "Primary Scraper",
      status: "active",
      cpu: 45,
      memory: 62,
      uptime: "2d 14h 23m",
      jobsCompleted: 1247,
      currentJob: "Amazon Product Scraper",
      region: "US-East",
      lastPing: "2s ago"
    },
    {
      id: "worker-002", 
      name: "Secondary Scraper",
      status: "active",
      cpu: 78,
      memory: 84,
      uptime: "1d 8h 45m",
      jobsCompleted: 892,
      currentJob: "eBay Price Monitor",
      region: "EU-West",
      lastPing: "1s ago"
    },
    {
      id: "worker-003",
      name: "Backup Worker",
      status: "idle",
      cpu: 12,
      memory: 28,
      uptime: "3d 2h 17m",
      jobsCompleted: 2156,
      currentJob: null,
      region: "Asia-Pacific",
      lastPing: "5s ago"
    },
    {
      id: "worker-004",
      name: "Heavy Duty",
      status: "warning",
      cpu: 95,
      memory: 91,
      uptime: "12h 34m",
      jobsCompleted: 543,
      currentJob: "Stock Data Aggregator",
      region: "US-West",
      lastPing: "15s ago"
    },
    {
      id: "worker-005",
      name: "Mobile Scraper",
      status: "offline",
      cpu: 0,
      memory: 0,
      uptime: "0m",
      jobsCompleted: 1834,
      currentJob: null,
      region: "EU-Central",
      lastPing: "5m ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'idle': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'offline': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'idle': return <Clock className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'offline': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getCpuColor = (cpu: number) => {
    if (cpu > 80) return 'text-red-600';
    if (cpu > 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getMemoryColor = (memory: number) => {
    if (memory > 85) return 'text-red-600';
    if (memory > 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const totalWorkers = workers.length;
  const activeWorkers = workers.filter(w => w.status === 'active').length;
  const totalJobs = workers.reduce((sum, w) => sum + w.jobsCompleted, 0);
  const avgCpu = workers.reduce((sum, w) => sum + w.cpu, 0) / workers.length;

  const statsCards = [
    {
      title: "Total Workers",
      value: totalWorkers.toString(),
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50"
    },
    {
      title: "Active Workers",
      value: activeWorkers.toString(),
      icon: Activity,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      title: "Jobs Completed",
      value: totalJobs.toLocaleString(),
      icon: CheckCircle,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50"
    },
    {
      title: "Avg CPU Usage",
      value: `${avgCpu.toFixed(1)}%`,
      icon: Cpu,
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50"
    }
  ];

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 min-h-screen">
      {/* Header */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-2xl flex items-center justify-center animate-pulse">
            <Users className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Worker Status
            </h1>
            <p className="text-lg text-slate-600 mt-2">Monitor your worker fleet performance</p>
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

      {/* Workers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workers.map((worker) => (
          <Card key={worker.id} className="group hover-lift bg-gradient-to-br from-white via-slate-50 to-orange-50 border-orange-200 shadow-xl hover:shadow-2xl transition-all duration-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-3">
                  <div className={`p-2 rounded-lg shadow-lg ${
                    worker.status === 'active' ? 'bg-green-500' :
                    worker.status === 'idle' ? 'bg-blue-500' :
                    worker.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}>
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  {worker.name}
                </CardTitle>
                <Badge className={`${getStatusColor(worker.status)} font-medium flex items-center gap-1`}>
                  {getStatusIcon(worker.status)}
                  {worker.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span className="font-mono">{worker.id}</span>
                <span className="flex items-center gap-1">
                  <Wifi className="h-3 w-3" />
                  {worker.region}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Resource Usage */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700 flex items-center gap-1">
                      <Cpu className="h-3 w-3" />
                      CPU
                    </span>
                    <span className={`text-sm font-bold ${getCpuColor(worker.cpu)}`}>
                      {worker.cpu}%
                    </span>
                  </div>
                  <Progress value={worker.cpu} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700 flex items-center gap-1">
                      <HardDrive className="h-3 w-3" />
                      Memory
                    </span>
                    <span className={`text-sm font-bold ${getMemoryColor(worker.memory)}`}>
                      {worker.memory}%
                    </span>
                  </div>
                  <Progress value={worker.memory} className="h-2" />
                </div>
              </div>

              {/* Worker Details */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-orange-100 space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Uptime:</span>
                    <span className="font-medium text-slate-800 ml-2">{worker.uptime}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Last Ping:</span>
                    <span className="font-medium text-slate-800 ml-2">{worker.lastPing}</span>
                  </div>
                </div>
                <div className="text-sm">
                  <span className="text-slate-500">Jobs Completed:</span>
                  <span className="font-bold text-orange-600 ml-2">{worker.jobsCompleted.toLocaleString()}</span>
                </div>
                {worker.currentJob && (
                  <div className="text-sm">
                    <span className="text-slate-500">Current Job:</span>
                    <span className="font-medium text-slate-800 ml-2">{worker.currentJob}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {worker.status === 'active' ? (
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 hover:bg-yellow-50 hover:border-yellow-200 hover:text-yellow-600"
                  >
                    Pause Worker
                  </Button>
                ) : worker.status === 'offline' ? (
                  <Button 
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-200"
                  >
                    Start Worker
                  </Button>
                ) : (
                  <Button 
                    size="sm"
                    variant="outline"
                    className="flex-1 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600"
                  >
                    Assign Job
                  </Button>
                )}
                <Button 
                  size="sm" 
                  variant="outline"
                  className="hover:bg-slate-50 hover:border-slate-200"
                >
                  <Activity className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Overview */}
      <Card className="bg-gradient-to-br from-slate-900 via-orange-900 to-red-900 text-white shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-3">
            <Activity className="h-6 w-6" />
            System Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-orange-200">Fleet Health</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-orange-100">Operational:</span>
                  <span className="font-bold text-green-400">80%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-100">Warning:</span>
                  <span className="font-bold text-yellow-400">20%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-100">Offline:</span>
                  <span className="font-bold text-red-400">0%</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-orange-200">Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-orange-100">Avg Response:</span>
                  <span className="font-bold">145ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-100">Throughput:</span>
                  <span className="font-bold">2.3k/min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-100">Success Rate:</span>
                  <span className="font-bold text-green-400">98.7%</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-orange-200">Resource Usage</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-orange-100">Total CPU:</span>
                  <span className="font-bold">{avgCpu.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-100">Total Memory:</span>
                  <span className="font-bold">4.2GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-100">Network I/O:</span>
                  <span className="font-bold">125MB/s</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
