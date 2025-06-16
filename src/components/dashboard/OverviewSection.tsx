
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function OverviewSection() {
  const metrics = [
    { title: "Total Plugins", value: "24", change: "+2 this week", trend: "up" },
    { title: "Jobs Today", value: "156", change: "+12% vs yesterday", trend: "up" },
    { title: "Success Rate", value: "94.2%", change: "+1.2% this week", trend: "up" },
    { title: "Avg Duration", value: "2.4m", change: "-0.3m vs last week", trend: "down" },
  ];

  const recentJobs = [
    { id: "J-1234", plugin: "Amazon Scraper", status: "completed", duration: "1.2m", success: true },
    { id: "J-1235", plugin: "eBay Monitor", status: "running", duration: "0.8m", success: null },
    { id: "J-1236", plugin: "News Aggregator", status: "failed", duration: "0.3m", success: false },
    { id: "J-1237", plugin: "Price Tracker", status: "completed", duration: "2.1m", success: true },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <p className={`text-xs mt-1 ${
                metric.trend === 'up' ? 'text-green-600' : 'text-blue-600'
              }`}>
                {metric.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Volume Chart */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Job Volume (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={day} className="flex items-center gap-3">
                  <span className="w-8 text-sm text-gray-600">{day}</span>
                  <Progress value={Math.random() * 100} className="flex-1" />
                  <span className="w-8 text-sm text-gray-900">{Math.floor(Math.random() * 50 + 10)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Jobs */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Recent Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{job.id}</span>
                      <Badge variant={
                        job.status === 'completed' ? 'default' :
                        job.status === 'running' ? 'secondary' : 'destructive'
                      }>
                        {job.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{job.plugin}</p>
                  </div>
                  <span className="text-sm text-gray-500">{job.duration}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
