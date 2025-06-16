
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function WorkerStatus() {
  const workers = [
    {
      id: "W-001",
      hostname: "crawler-node-01",
      currentJob: "Amazon Product Scraper",
      cpuUsage: 78,
      memoryUsage: 65,
      status: "busy"
    },
    {
      id: "W-002",
      hostname: "crawler-node-02",
      currentJob: null,
      cpuUsage: 12,
      memoryUsage: 34,
      status: "idle"
    },
    {
      id: "W-003",
      hostname: "crawler-node-03",
      currentJob: "eBay Price Monitor",
      cpuUsage: 45,
      memoryUsage: 52,
      status: "busy"
    },
    {
      id: "W-004",
      hostname: "crawler-node-04",
      currentJob: "Stock Price Tracker",
      cpuUsage: 89,
      memoryUsage: 71,
      status: "busy"
    },
    {
      id: "W-005",
      hostname: "crawler-node-05",
      currentJob: null,
      cpuUsage: 8,
      memoryUsage: 28,
      status: "idle"
    },
    {
      id: "W-006",
      hostname: "crawler-node-06",
      currentJob: "News Aggregator",
      cpuUsage: 92,
      memoryUsage: 83,
      status: "busy"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'busy': return 'bg-green-100 text-green-800';
      case 'idle': return 'bg-gray-100 text-gray-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  const getResourceColor = (usage: number) => {
    if (usage > 80) return 'text-red-600';
    if (usage > 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Worker Status</h2>
        <div className="flex gap-2">
          <Button variant="outline">Restart All</Button>
          <Button variant="outline">Add Worker</Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-900">
              {workers.filter(w => w.status === 'busy').length}
            </div>
            <p className="text-sm text-gray-600">Active Workers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-900">
              {workers.filter(w => w.status === 'idle').length}
            </div>
            <p className="text-sm text-gray-600">Idle Workers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(workers.reduce((acc, w) => acc + w.cpuUsage, 0) / workers.length)}%
            </div>
            <p className="text-sm text-gray-600">Avg CPU Usage</p>
          </CardContent>
        </Card>
      </div>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {workers.map((worker) => (
          <Card key={worker.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{worker.id}</CardTitle>
                  <p className="text-sm text-gray-600">{worker.hostname}</p>
                </div>
                <Badge className={getStatusColor(worker.status)}>
                  {worker.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current Job */}
              <div>
                <span className="text-sm text-gray-600">Current Job:</span>
                <p className="font-medium text-sm">
                  {worker.currentJob || "No active job"}
                </p>
              </div>

              {/* Resource Usage */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">CPU Usage</span>
                    <span className={`text-sm font-medium ${getResourceColor(worker.cpuUsage)}`}>
                      {worker.cpuUsage}%
                    </span>
                  </div>
                  <Progress value={worker.cpuUsage} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Memory Usage</span>
                    <span className={`text-sm font-medium ${getResourceColor(worker.memoryUsage)}`}>
                      {worker.memoryUsage}%
                    </span>
                  </div>
                  <Progress value={worker.memoryUsage} className="h-2" />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Restart
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:text-red-700">
                  Stop
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
