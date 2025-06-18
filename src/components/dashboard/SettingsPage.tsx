
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Globe, 
  Palette,
  Save,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SettingsPage() {
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = useState(false);
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "Crawler Dashboard",
    timezone: "UTC",
    language: "en",
    theme: "light",
    
    // User Profile
    username: "admin",
    email: "admin@crawler.com",
    firstName: "Admin",
    lastName: "User",
    
    // Notifications
    emailNotifications: true,
    browserNotifications: false,
    dailyReports: true,
    errorAlerts: true,
    
    // Security
    apiKey: "sk-1234567890abcdef",
    twoFactorAuth: false,
    sessionTimeout: "24",
    
    // Database
    backupFrequency: "daily",
    retentionPeriod: "30",
    autoCleanup: true,
    
    // Crawler Settings
    defaultFrequency: "15",
    maxConcurrent: "5",
    timeout: "30",
    userAgent: "Crawler Bot 1.0"
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Settings Exported",
      description: "Settings have been downloaded as JSON file.",
    });
  };

  const handleImport = () => {
    toast({
      title: "Settings Imported",
      description: "Settings have been imported successfully.",
    });
  };

  const handleReset = () => {
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
      variant: "destructive",
    });
  };

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Settings
            </h1>
            <p className="text-gray-600 text-lg">
              Configure your dashboard preferences and system settings
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={handleExport} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button onClick={handleImport} variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Tabs */}
      <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl">
        <CardContent className="p-8">
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid grid-cols-6 w-full h-14 bg-gray-100">
              <TabsTrigger value="general" className="gap-2 data-[state=active]:bg-white">
                <Settings className="h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-white">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2 data-[state=active]:bg-white">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2 data-[state=active]:bg-white">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="database" className="gap-2 data-[state=active]:bg-white">
                <Database className="h-4 w-4" />
                Database
              </TabsTrigger>
              <TabsTrigger value="crawler" className="gap-2 data-[state=active]:bg-white">
                <Globe className="h-4 w-4" />
                Crawler
              </TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={settings.language} onValueChange={(value) => setSettings({...settings, language: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="vi">Tiếng Việt</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={settings.theme} onValueChange={(value) => setSettings({...settings, theme: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            {/* Profile Settings */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={settings.firstName}
                    onChange={(e) => setSettings({...settings, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={settings.lastName}
                    onChange={(e) => setSettings({...settings, lastName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={settings.username}
                    onChange={(e) => setSettings({...settings, username: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({...settings, email: e.target.value})}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="emailNotifications" className="text-base font-medium">Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="browserNotifications" className="text-base font-medium">Browser Notifications</Label>
                    <p className="text-sm text-gray-600">Show notifications in browser</p>
                  </div>
                  <Switch
                    id="browserNotifications"
                    checked={settings.browserNotifications}
                    onCheckedChange={(checked) => setSettings({...settings, browserNotifications: checked})}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="dailyReports" className="text-base font-medium">Daily Reports</Label>
                    <p className="text-sm text-gray-600">Receive daily summary reports</p>
                  </div>
                  <Switch
                    id="dailyReports"
                    checked={settings.dailyReports}
                    onCheckedChange={(checked) => setSettings({...settings, dailyReports: checked})}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="errorAlerts" className="text-base font-medium">Error Alerts</Label>
                    <p className="text-sm text-gray-600">Get notified when errors occur</p>
                  </div>
                  <Switch
                    id="errorAlerts"
                    checked={settings.errorAlerts}
                    onCheckedChange={(checked) => setSettings({...settings, errorAlerts: checked})}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="apiKey"
                      type={showApiKey ? "text" : "password"}
                      value={settings.apiKey}
                      onChange={(e) => setSettings({...settings, apiKey: e.target.value})}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="px-3"
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="twoFactorAuth" className="text-base font-medium">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-600">Enable 2FA for enhanced security</p>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => setSettings({...settings, twoFactorAuth: checked})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings({...settings, sessionTimeout: e.target.value})}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Database Settings */}
            <TabsContent value="database" className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select value={settings.backupFrequency} onValueChange={(value) => setSettings({...settings, backupFrequency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retentionPeriod">Data Retention (days)</Label>
                  <Input
                    id="retentionPeriod"
                    type="number"
                    value={settings.retentionPeriod}
                    onChange={(e) => setSettings({...settings, retentionPeriod: e.target.value})}
                  />
                </div>
                <div className="col-span-2 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="autoCleanup" className="text-base font-medium">Auto Cleanup</Label>
                    <p className="text-sm text-gray-600">Automatically delete old data</p>
                  </div>
                  <Switch
                    id="autoCleanup"
                    checked={settings.autoCleanup}
                    onCheckedChange={(checked) => setSettings({...settings, autoCleanup: checked})}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Crawler Settings */}
            <TabsContent value="crawler" className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultFrequency">Default Frequency (minutes)</Label>
                  <Input
                    id="defaultFrequency"
                    type="number"
                    value={settings.defaultFrequency}
                    onChange={(e) => setSettings({...settings, defaultFrequency: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxConcurrent">Max Concurrent Crawlers</Label>
                  <Input
                    id="maxConcurrent"
                    type="number"
                    value={settings.maxConcurrent}
                    onChange={(e) => setSettings({...settings, maxConcurrent: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeout">Request Timeout (seconds)</Label>
                  <Input
                    id="timeout"
                    type="number"
                    value={settings.timeout}
                    onChange={(e) => setSettings({...settings, timeout: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userAgent">User Agent String</Label>
                  <Input
                    id="userAgent"
                    value={settings.userAgent}
                    onChange={(e) => setSettings({...settings, userAgent: e.target.value})}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="bg-red-50/80 backdrop-blur-xl border border-red-200 shadow-xl">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-red-800">Reset All Settings</h4>
              <p className="text-sm text-red-600">This will reset all settings to their default values</p>
            </div>
            <Button onClick={handleReset} variant="destructive" className="gap-2">
              <Trash2 className="h-4 w-4" />
              Reset Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
