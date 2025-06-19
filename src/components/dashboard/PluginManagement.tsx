
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Play, 
  Pause, 
  Settings, 
  Trash2, 
  Search, 
  Filter,
  MoreVertical,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
  Globe,
  Code,
  RefreshCw,
  Plus
} from "lucide-react";
import { EnhancedAddPluginDialog } from "./EnhancedAddPluginDialog";

const mockPlugins = [
  {
    id: 1,
    name: "Pokemon Ditto API",
    url: "https://pokeapi.co/api/v2/pokemon/ditto",
    type: "json",
    status: "running",
    lastRun: "2 mins ago",
    fields: 5,
    frequency: "Every 5 minutes",
    author: "soha",
    description: "Lấy thông tin pokemon Ditto từ pokeapi"
  },
  {
    id: 2,
    name: "Reddit API Crawler",
    url: "https://reddit.com/api/subreddit/programming",
    type: "json",
    status: "paused",
    lastRun: "1 hour ago",
    fields: 8,
    frequency: "Every 15 minutes",
    author: "dev",
    description: "Crawl programming subreddit posts"
  },
  {
    id: 3,
    name: "News Headlines Scraper",
    url: "https://news.example.com",
    type: "html",
    status: "error",
    lastRun: "3 hours ago",
    fields: 3,
    frequency: "Every hour",
    author: "admin",
    description: "Extract news headlines from website"
  },
  {
    id: 4,
    name: "Stock Price Tracker",
    url: "https://api.stocks.com/prices",
    type: "json",
    status: "running",
    lastRun: "30 seconds ago",
    fields: 12,
    frequency: "Every minute",
    author: "trader",
    description: "Track real-time stock prices"
  }
];

const containerVariants = {
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
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

interface PluginManagementProps {
  currentTheme?: {
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

  // Default theme if none provided
  const theme = currentTheme || {
    name: "Ocean Blue",
    id: "blue",
    primary: "#3b82f6",
    secondary: "#1e40af",
    background: "from-blue-50 via-indigo-50 to-purple-50",
    pageGradient: "from-slate-50 via-blue-50 to-indigo-50",
    accent: "#dbeafe"
  };

  // Fix midnight theme colors for better readability
  const isDarkTheme = theme.id === 'black';
  const textColor = isDarkTheme ? '#ffffff' : theme.primary;
  const cardBg = isDarkTheme ? 'rgba(31, 41, 55, 0.9)' : `${theme.accent}cc`;
  const headerBg = isDarkTheme ? 'rgba(17, 24, 39, 0.9)' : `linear-gradient(135deg, ${theme.accent}, ${theme.accent}cc)`;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "paused":
        return <Pause className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-100 text-green-800 border-green-200";
      case "paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "html" ? (
      <Globe className="h-4 w-4 text-blue-500" />
    ) : (
      <Code className="h-4 w-4 text-purple-500" />
    );
  };

  const filteredPlugins = mockPlugins.filter(plugin => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || plugin.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statsCards = [
    {
      title: "Total Plugins",
      value: mockPlugins.length.toString(),
      icon: Globe,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Running",
      value: mockPlugins.filter(p => p.status === 'running').length.toString(),
      icon: Zap,
      color: "from-green-500 to-green-600", 
      bgColor: "from-green-50 to-green-100",
      change: "+8%",
      changeType: "positive"
    },
    {
      title: "Paused",
      value: mockPlugins.filter(p => p.status === 'paused').length.toString(),
      icon: Pause,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "from-yellow-50 to-yellow-100",
      change: "0%",
      changeType: "neutral"
    },
    {
      title: "Failed",
      value: mockPlugins.filter(p => p.status === 'error').length.toString(),
      icon: AlertCircle,
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
      change: "-15%",
      changeType: "negative"
    }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8 space-y-8 min-h-screen"
    >
      {/* Animated Header */}
      <motion.div variants={itemVariants} className="text-center py-8">
        <div className="inline-flex items-center gap-6 mb-8">
          <motion.div 
            className="w-20 h-20 shadow-2xl rounded-3xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Globe className="h-10 w-10 text-white" />
          </motion.div>
          <div>
            <h1 className="text-5xl font-bold mb-3" style={{ color: textColor }}>
              Plugin Management
            </h1>
            <p className={`text-xl ${isDarkTheme ? 'text-gray-300' : 'text-slate-600'}`}>
              Manage and monitor your web crawling plugins
            </p>
          </div>
        </div>
      </motion.div>

      {/* Animated Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className={`hover-lift ${isDarkTheme ? 'bg-gray-800 border-gray-700' : `bg-gradient-to-br ${stat.bgColor} border-white/50`} shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden relative`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className={`text-sm font-medium mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-slate-600'}`}>
                      {stat.title}
                    </p>
                    <p className={`text-4xl font-bold ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
                      {stat.value}
                    </p>
                    <div className={`text-sm font-medium mt-2 ${
                      stat.changeType === 'positive' ? 'text-green-600' :
                      stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {stat.change} from last month
                    </div>
                  </div>
                  <motion.div 
                    className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-xl`}
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <stat.icon className="h-8 w-8 text-white" />
                  </motion.div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <div className={`w-full h-full bg-gradient-to-br ${stat.color} rounded-full blur-3xl animate-float`}></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Controls */}
      <motion.div variants={itemVariants}>
        <Card 
          className="border-2 shadow-xl overflow-hidden relative"
          style={{
            background: cardBg,
            borderColor: theme.primary + '40'
          }}
        >
          <CardHeader 
            className="border-b"
            style={{
              background: headerBg,
              borderColor: theme.primary + '30'
            }}
          >
            <CardTitle className="text-2xl font-bold flex items-center gap-4" style={{ color: textColor }}>
              <motion.div 
                className="p-3 rounded-xl shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <RefreshCw className="h-6 w-6 text-white" />
              </motion.div>
              Plugin Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search plugins..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 h-12 shadow-inner ${isDarkTheme ? 'bg-gray-700 text-white border-gray-600' : 'bg-white/80 backdrop-blur-sm'}`}
                  style={{ borderColor: theme.primary + '40' }}
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger 
                    className={`pl-10 w-full sm:w-48 h-12 ${isDarkTheme ? 'bg-gray-700 text-white border-gray-600' : 'bg-white/80 backdrop-blur-sm'}`}
                    style={{ borderColor: theme.primary + '40' }}
                  >
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <EnhancedAddPluginDialog />
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="shadow-lg shadow-green-200 h-12 px-6 text-white font-semibold"
                  style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start All
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="h-12 px-6 hover:bg-yellow-50 hover:border-yellow-200 hover:text-yellow-600 shadow-md">
                  <Pause className="h-5 w-5 mr-2" />
                  Pause All
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="h-12 px-6 hover:bg-red-50 hover:border-red-200 hover:text-red-600 shadow-md">
                  <Trash2 className="h-5 w-5 mr-2" />
                  Clear Stopped
                </Button>
              </motion.div>
            </div>
          </CardContent>
          
          <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
            <div 
              className="w-full h-full rounded-full blur-3xl animate-pulse"
              style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
            ></div>
          </div>
        </Card>
      </motion.div>

      {/* Enhanced Plugins Table */}
      <motion.div variants={itemVariants}>
        <Card className={`${isDarkTheme ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90'} backdrop-blur-xl shadow-2xl overflow-hidden`}>
          <CardHeader 
            className="border-b"
            style={{
              background: headerBg,
              borderColor: theme.primary + '30'
            }}
          >
            <CardTitle className="text-2xl font-semibold flex items-center gap-3" style={{ color: textColor }}>
              <Globe className="h-6 w-6" style={{ color: theme.primary }} />
              Active Plugins ({filteredPlugins.length})
              <Badge 
                className="px-3 py-1"
                style={{
                  backgroundColor: theme.accent,
                  color: theme.primary,
                  borderColor: theme.primary
                }}
              >
                Live Data
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow 
                    className={isDarkTheme ? 'border-gray-700' : 'border-slate-100'}
                    style={{ background: headerBg }}
                  >
                    <TableHead className="font-bold py-4" style={{ color: textColor }}>ID</TableHead>
                    <TableHead className="font-bold py-4" style={{ color: textColor }}>Plugin</TableHead>
                    <TableHead className="font-bold py-4" style={{ color: textColor }}>Type</TableHead>
                    <TableHead className="font-bold py-4" style={{ color: textColor }}>Status</TableHead>
                    <TableHead className="font-bold py-4" style={{ color: textColor }}>URL</TableHead>
                    <TableHead className="font-bold py-4" style={{ color: textColor }}>Fields</TableHead>
                    <TableHead className="font-bold py-4" style={{ color: textColor }}>Frequency</TableHead>
                    <TableHead className="font-bold py-4" style={{ color: textColor }}>Last Run</TableHead>
                    <TableHead className="text-right font-bold py-4" style={{ color: textColor }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlugins.map((plugin, index) => (
                    <motion.tr
                      key={plugin.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`${isDarkTheme ? 'border-gray-700' : 'border-slate-50'} transition-all duration-300 group hover:shadow-lg`}
                      style={{ 
                        background: isDarkTheme 
                          ? `linear-gradient(90deg, transparent, rgba(75, 85, 99, 0.2), transparent)`
                          : `linear-gradient(90deg, transparent, ${theme.accent}20, transparent)` 
                      }}
                    >
                      <TableCell className={`font-mono text-sm py-4 ${isDarkTheme ? 'text-gray-300' : 'text-slate-600'}`}>
                        <Badge variant="outline" className={isDarkTheme ? 'bg-gray-700 text-white' : 'bg-slate-100'}>
                          #{plugin.id}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full shadow-md"
                            style={{
                              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                            }}
                          ></div>
                          <div>
                            <span className={`font-semibold block ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>
                              {plugin.name}
                            </span>
                            <span className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-slate-500'}`}>
                              by {plugin.author}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(plugin.type)}
                          <Badge variant="outline" className={`capitalize border-2 ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}>
                            {plugin.type}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <Badge className={`${getStatusColor(plugin.status)} font-medium flex items-center gap-2 w-fit px-3 py-1 shadow-sm`}>
                            {getStatusIcon(plugin.status)}
                            {plugin.status}
                          </Badge>
                        </motion.div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className={`text-sm font-mono px-2 py-1 rounded ${isDarkTheme ? 'bg-gray-700 text-gray-300' : 'text-slate-600 bg-slate-100'}`}>
                          {plugin.url.length > 40 ? `${plugin.url.substring(0, 40)}...` : plugin.url}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge 
                          className="font-bold px-3 py-1"
                          style={{
                            backgroundColor: theme.accent,
                            color: theme.primary,
                            borderColor: theme.primary
                          }}
                        >
                          {plugin.fields} fields
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className={`text-sm px-2 py-1 rounded ${isDarkTheme ? 'bg-gray-700 text-gray-300' : 'text-slate-600 bg-slate-50'}`}>
                          {plugin.frequency}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-slate-400" />
                          <span className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-slate-600'}`}>
                            {plugin.lastRun}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-4">
                        <div className="flex gap-2 justify-end opacity-70 group-hover:opacity-100 transition-opacity">
                          {plugin.status === 'running' ? (
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-9 w-9 p-0 hover:bg-yellow-50 hover:border-yellow-200 hover:text-yellow-600 shadow-md"
                              >
                                <Pause className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          ) : (
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-9 w-9 p-0 hover:bg-green-50 hover:border-green-200 hover:text-green-600 shadow-md"
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          )}
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-9 w-9 p-0 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 shadow-md"
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-9 w-9 p-0 hover:bg-red-50 hover:border-red-200 hover:text-red-600 shadow-md"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
