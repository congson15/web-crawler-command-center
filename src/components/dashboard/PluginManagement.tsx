
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Settings, Play, Pause, Trash2, Edit, Plus, Search, Filter, RefreshCw, Activity } from "lucide-react";
import { motion } from "framer-motion";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const plugins = [
    {
      id: "plugin-001",
      name: "Amazon Product Scraper",
      description: "Scrapes product information from Amazon listings",
      status: "active",
      lastRun: "2 hours ago",
      frequency: "15 min",
      success: 95.2,
      totalRuns: 1247,
      category: "E-commerce"
    },
    {
      id: "plugin-002", 
      name: "eBay Price Monitor",
      description: "Monitors price changes on eBay auctions",
      status: "paused",
      lastRun: "1 day ago",
      frequency: "30 min",
      success: 87.8,
      totalRuns: 892,
      category: "E-commerce"
    },
    {
      id: "plugin-003",
      name: "News API Aggregator",
      description: "Aggregates news from multiple sources",
      status: "active",
      lastRun: "30 min ago", 
      frequency: "1 hour",
      success: 98.1,
      totalRuns: 2156,
      category: "News"
    },
    {
      id: "plugin-004",
      name: "Stock Price Tracker",
      description: "Tracks real-time stock prices",
      status: "error",
      lastRun: "3 hours ago",
      frequency: "5 min",
      success: 72.4,
      totalRuns: 543,
      category: "Finance"
    },
    {
      id: "plugin-005",
      name: "Social Media Monitor",
      description: "Monitors social media mentions",
      status: "active",
      lastRun: "15 min ago",
      frequency: "20 min",
      success: 91.5,
      totalRuns: 1834,
      category: "Social"
    }
  ];

  const filteredPlugins = plugins.filter(plugin => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plugin.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || plugin.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const statsCards = [
    {
      title: "Total Plugins",
      value: plugins.length.toString(),
      icon: Settings,
      color: currentTheme.primary,
      bgColor: currentTheme.accent
    },
    {
      title: "Active Plugins",
      value: plugins.filter(p => p.status === 'active').length.toString(),
      icon: Activity,
      color: currentTheme.primary,
      bgColor: currentTheme.accent
    },
    {
      title: "Total Runs",
      value: plugins.reduce((sum, p) => sum + p.totalRuns, 0).toLocaleString(),
      icon: Play,
      color: currentTheme.primary,
      bgColor: currentTheme.accent
    },
    {
      title: "Avg Success",
      value: `${(plugins.reduce((sum, p) => sum + p.success, 0) / plugins.length).toFixed(1)}%`,
      icon: RefreshCw,
      color: currentTheme.primary,
      bgColor: currentTheme.accent
    }
  ];

  const containerVariants = {
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
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

  return (
    <div className={`bg-gradient-to-br ${currentTheme.pageGradient} min-h-screen`}>
      <motion.div 
        className="p-8 space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div 
          className="text-center py-8"
          variants={cardVariants}
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <motion.div 
              className="w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Settings className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h1 
                className="text-4xl font-bold"
                style={{ color: currentTheme.primary }}
              >
                Plugin Management
              </h1>
              <p className="text-lg text-slate-600 mt-2">Manage and monitor your scraping plugins</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {statsCards.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card 
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
            </motion.div>
          ))}
        </motion.div>

        {/* Controls */}
        <motion.div variants={cardVariants}>
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
                  <Search className="h-6 w-6 text-white" />
                </div>
                Plugin Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Input
                  placeholder="Search plugins..."
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
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
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
                  <Plus className="h-4 w-4 mr-2" />
                  Add Plugin
                </Button>
                <Button 
                  variant="outline" 
                  className="hover:scale-105 transition-all duration-300"
                  style={{ borderColor: `${currentTheme.primary}50`, color: currentTheme.primary }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh All
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Plugins Table */}
        <motion.div variants={cardVariants}>
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle 
                className="text-xl font-semibold flex items-center gap-2"
                style={{ color: currentTheme.primary }}
              >
                <Settings className="h-5 w-5" />
                Plugins ({filteredPlugins.length})
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
                        Plugin Name
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
                        Category
                      </TableHead>
                      <TableHead 
                        className="font-semibold"
                        style={{ color: currentTheme.primary }}
                      >
                        Success Rate
                      </TableHead>
                      <TableHead 
                        className="font-semibold"
                        style={{ color: currentTheme.primary }}
                      >
                        Frequency
                      </TableHead>
                      <TableHead 
                        className="font-semibold"
                        style={{ color: currentTheme.primary }}
                      >
                        Last Run
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
                    {filteredPlugins.map((plugin) => (
                      <TableRow key={plugin.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <TableCell>
                          <div>
                            <div className="font-medium text-slate-900">{plugin.name}</div>
                            <div className="text-sm text-slate-500">{plugin.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(plugin.status)} font-medium capitalize`}>
                            {plugin.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className="font-medium"
                            style={{ borderColor: `${currentTheme.primary}50`, color: currentTheme.primary }}
                          >
                            {plugin.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span style={{ color: currentTheme.primary }}>{plugin.success}%</span>
                            </div>
                            <Progress value={plugin.success} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-700">{plugin.frequency}</TableCell>
                        <TableCell className="text-slate-700">{plugin.lastRun}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            {plugin.status === 'active' ? (
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
                              className="h-8 w-8 p-0 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
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
        </motion.div>
      </motion.div>
    </div>
  );
}
