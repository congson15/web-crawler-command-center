
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Play, Pause, Trash2, Settings, Search, Plus, Activity, AlertCircle, CheckCircle, Package } from "lucide-react";

interface Plugin {
  id: string;
  name: string;
  status: "active" | "inactive" | "error";
  type: string;
  lastRun: string;
  nextRun: string;
  successRate: number;
}

interface PluginManagementProps {
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

export function PluginManagement({ currentTheme }: PluginManagementProps) {
  const [plugins, setPlugins] = useState<Plugin[]>([
    {
      id: "1",
      name: "E-commerce Scraper",
      status: "active",
      type: "Data Collection",
      lastRun: "2024-01-15 14:30",
      nextRun: "2024-01-15 15:30",
      successRate: 98.5
    },
    {
      id: "2", 
      name: "Price Monitor",
      status: "active",
      type: "Monitoring",
      lastRun: "2024-01-15 14:25",
      nextRun: "2024-01-15 15:25",
      successRate: 95.2
    },
    {
      id: "3",
      name: "Social Media Tracker",
      status: "inactive",
      type: "Social",
      lastRun: "2024-01-15 12:00",
      nextRun: "N/A",
      successRate: 88.7
    },
    {
      id: "4",
      name: "News Aggregator",
      status: "error",
      type: "Content",
      lastRun: "2024-01-15 13:45",
      nextRun: "N/A",
      successRate: 76.3
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlugins = plugins.filter(plugin =>
    plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plugin.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "inactive": return "bg-gray-500";
      case "error": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4" />;
      case "inactive": return <Pause className="h-4 w-4" />;
      case "error": return <AlertCircle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={`bg-gradient-to-br ${currentTheme.pageGradient} min-h-screen`}>
      <div className="p-8 space-y-8">
        {/* Header Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { title: "Total Plugins", value: plugins.length, icon: Package },
            { title: "Active", value: plugins.filter(p => p.status === "active").length, icon: CheckCircle },
            { title: "Inactive", value: plugins.filter(p => p.status === "inactive").length, icon: Pause },
            { title: "Errors", value: plugins.filter(p => p.status === "error").length, icon: AlertCircle }
          ].map((stat, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card 
                className="border-white/50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
                style={{ 
                  background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.accent}cc)`,
                  borderColor: `${currentTheme.primary}30`
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
                      <p 
                        className="text-3xl font-bold"
                        style={{ color: currentTheme.primary }}
                      >
                        {stat.value}
                      </p>
                    </div>
                    <div 
                      className="p-3 rounded-xl shadow-lg"
                      style={{ backgroundColor: currentTheme.primary }}
                    >
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Controls */}
        <motion.div variants={cardVariants} initial="hidden" animate="visible">
          <Card 
            className="border-white/50 shadow-xl"
            style={{ 
              background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.accent}cc)`,
              borderColor: `${currentTheme.primary}30`
            }}
          >
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Search plugins..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/50 backdrop-blur-sm"
                      style={{ borderColor: `${currentTheme.primary}30` }}
                    />
                  </div>
                </div>
                <Button 
                  className="shadow-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                    color: 'white'
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Plugin
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Plugins Table */}
        <motion.div variants={cardVariants} initial="hidden" animate="visible">
          <Card 
            className="border-white/50 shadow-xl"
            style={{ 
              background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.accent}cc)`,
              borderColor: `${currentTheme.primary}30`
            }}
          >
            <CardHeader>
              <CardTitle 
                className="text-xl font-bold flex items-center gap-2"
                style={{ color: currentTheme.primary }}
              >
                <Package className="h-5 w-5" />
                Plugin Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>
                <Table>
                  <TableHeader>
                    <TableRow style={{ backgroundColor: `${currentTheme.primary}10` }}>
                      <TableHead style={{ color: currentTheme.primary }}>Plugin Name</TableHead>
                      <TableHead style={{ color: currentTheme.primary }}>Status</TableHead>
                      <TableHead style={{ color: currentTheme.primary }}>Type</TableHead>
                      <TableHead style={{ color: currentTheme.primary }}>Last Run</TableHead>
                      <TableHead style={{ color: currentTheme.primary }}>Success Rate</TableHead>
                      <TableHead style={{ color: currentTheme.primary }}>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPlugins.map((plugin) => (
                      <TableRow key={plugin.id} className="hover:bg-white/30">
                        <TableCell className="font-medium">{plugin.name}</TableCell>
                        <TableCell>
                          <Badge 
                            className={`${getStatusColor(plugin.status)} text-white flex items-center gap-1 w-fit`}
                          >
                            {getStatusIcon(plugin.status)}
                            {plugin.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{plugin.type}</TableCell>
                        <TableCell>{plugin.lastRun}</TableCell>
                        <TableCell>
                          <span 
                            className="font-semibold"
                            style={{ color: plugin.successRate > 90 ? '#10b981' : plugin.successRate > 80 ? '#f59e0b' : '#ef4444' }}
                          >
                            {plugin.successRate}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="hover:scale-105 transition-all duration-200"
                              style={{ borderColor: `${currentTheme.primary}50`, color: currentTheme.primary }}
                            >
                              {plugin.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="hover:scale-105 transition-all duration-200"
                              style={{ borderColor: `${currentTheme.primary}50`, color: currentTheme.primary }}
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="hover:scale-105 transition-all duration-200 hover:border-red-400 hover:text-red-600"
                              style={{ borderColor: `${currentTheme.primary}50`, color: currentTheme.primary }}
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
        </motion.div>
      </div>
    </div>
  );
}
