
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

export function LogsViewer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [logLevel, setLogLevel] = useState("all");
  const [autoScroll, setAutoScroll] = useState(true);

  const logs = [
    {
      timestamp: "2024-06-16 14:35:23",
      level: "info",
      plugin: "Amazon Scraper",
      jobId: "J-1234",
      message: "Successfully scraped 150 products from category Electronics"
    },
    {
      timestamp: "2024-06-16 14:34:45",
      level: "warning",
      plugin: "eBay Monitor",
      jobId: "J-1235",
      message: "Rate limit detected, implementing backoff strategy"
    },
    {
      timestamp: "2024-06-16 14:33:12",
      level: "error",
      plugin: "News Aggregator",
      jobId: "J-1236",
      message: "Failed to connect to target server: Connection timeout after 30s"
    },
    {
      timestamp: "2024-06-16 14:32:58",
      level: "info",
      plugin: "Stock Tracker",
      jobId: "J-1237",
      message: "Started job execution with 45 target symbols"
    },
    {
      timestamp: "2024-06-16 14:32:15",
      level: "debug",
      plugin: "Amazon Scraper",
      jobId: "J-1234",
      message: "Initializing browser session with user agent rotation"
    },
    {
      timestamp: "2024-06-16 14:31:42",
      level: "info",
      plugin: "Weather Collector",
      jobId: "J-1238",
      message: "Data collection completed for 25 cities"
    },
    {
      timestamp: "2024-06-16 14:30:19",
      level: "error",
      plugin: "Social Media Monitor",
      jobId: "J-1239",
      message: "Authentication failed: API key expired or invalid"
    },
    {
      timestamp: "2024-06-16 14:29:33",
      level: "warning",
      plugin: "Price Tracker",
      jobId: "J-1240",
      message: "Detected anti-bot protection, switching proxy"
    },
  ];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.plugin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.jobId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = logLevel === "all" || log.level === logLevel;
    return matchesSearch && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'debug': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Logs & Error Viewer</h2>
        <div className="flex gap-2">
          <Button 
            variant={autoScroll ? "default" : "outline"}
            size="sm"
            onClick={() => setAutoScroll(!autoScroll)}
          >
            Auto Scroll {autoScroll ? "ON" : "OFF"}
          </Button>
          <Button variant="outline" size="sm">
            Export Logs
          </Button>
          <Button variant="outline" size="sm">
            Clear All
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search logs by message, plugin, or job ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={logLevel} onValueChange={setLogLevel}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="debug">Debug</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Log Stream */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Live Log Stream
            <Badge variant="secondary">{filteredLogs.length} entries</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px] w-full">
            <div className="p-4 space-y-2">
              {filteredLogs.map((log, index) => (
                <div key={index} className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg border-l-2 border-l-gray-200">
                  <span className="text-xs text-gray-500 font-mono min-w-[140px]">
                    {log.timestamp}
                  </span>
                  <Badge className={`${getLevelColor(log.level)} min-w-[60px] justify-center`}>
                    {log.level.toUpperCase()}
                  </Badge>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{log.plugin}</span>
                      <span className="text-xs text-gray-500 font-mono">{log.jobId}</span>
                    </div>
                    <p className="text-sm text-gray-700">{log.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
