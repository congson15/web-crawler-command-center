
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export function JobQueueSection() {
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const jobs = [
    {
      id: "J-1234",
      plugin: "Amazon Product Scraper",
      schedule: "Every 2 hours",
      status: "running",
      startTime: "14:32:15",
      endTime: "-",
      duration: "2m 15s"
    },
    {
      id: "J-1235",
      plugin: "eBay Price Monitor",
      schedule: "Daily at 9:00 AM",
      status: "completed",
      startTime: "09:00:00",
      endTime: "09:01:45",
      duration: "1m 45s"
    },
    {
      id: "J-1236",
      plugin: "News Aggregator",
      schedule: "Every 30 minutes",
      status: "failed",
      startTime: "14:00:00",
      endTime: "14:00:23",
      duration: "23s"
    },
    {
      id: "J-1237",
      plugin: "Stock Price Tracker",
      schedule: "Every 5 minutes",
      status: "pending",
      startTime: "-",
      endTime: "-",
      duration: "-"
    },
    {
      id: "J-1238",
      plugin: "Weather Data Collector",
      schedule: "Every hour",
      status: "completed",
      startTime: "13:00:00",
      endTime: "13:02:12",
      duration: "2m 12s"
    },
  ];

  const filteredJobs = jobs.filter(job => 
    job.plugin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleJobSelection = (jobId: string) => {
    setSelectedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Job Queue</h2>
        <div className="flex gap-2">
          <Button variant="outline" disabled={selectedJobs.length === 0}>
            Retry Failed ({selectedJobs.length})
          </Button>
          <Button variant="outline" disabled={selectedJobs.length === 0}>
            Cancel Running ({selectedJobs.length})
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <Input
            placeholder="Search jobs by ID or plugin name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Jobs</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 w-12">
                    <Checkbox 
                      checked={selectedJobs.length === filteredJobs.length}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedJobs(filteredJobs.map(job => job.id));
                        } else {
                          setSelectedJobs([]);
                        }
                      }}
                    />
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">Job ID</th>
                  <th className="text-left p-4 font-medium text-gray-900">Plugin</th>
                  <th className="text-left p-4 font-medium text-gray-900">Schedule</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Start Time</th>
                  <th className="text-left p-4 font-medium text-gray-900">Duration</th>
                  <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <Checkbox 
                        checked={selectedJobs.includes(job.id)}
                        onCheckedChange={() => toggleJobSelection(job.id)}
                      />
                    </td>
                    <td className="p-4 font-mono text-sm">{job.id}</td>
                    <td className="p-4">{job.plugin}</td>
                    <td className="p-4 text-sm text-gray-600">{job.schedule}</td>
                    <td className="p-4">
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                    </td>
                    <td className="p-4 font-mono text-sm">{job.startTime}</td>
                    <td className="p-4 text-sm">{job.duration}</td>
                    <td className="p-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
