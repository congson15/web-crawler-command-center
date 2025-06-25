
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Settings, Save, RefreshCw, Bell, Shield, Database, Globe, User } from "lucide-react";

interface SettingsPageProps {
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

export function SettingsPage({ currentTheme }: SettingsPageProps) {
  const [settings, setSettings] = useState({
    apiKey: "sk-1234567890abcdef",
    maxWorkers: "10",
    requestDelay: "1000",
    enableNotifications: true,
    enableLogging: true,
    logLevel: "info",
    timezone: "UTC",
    language: "en"
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const settingSections = [
    {
      title: "API Configuration",
      icon: Globe,
      description: "Configure API keys and connection settings",
      fields: [
        { key: "apiKey", label: "API Key", type: "password" },
        { key: "maxWorkers", label: "Max Workers", type: "number" },
        { key: "requestDelay", label: "Request Delay (ms)", type: "number" }
      ]
    },
    {
      title: "System Preferences",
      icon: Settings,
      description: "General system and interface settings",
      fields: [
        { key: "timezone", label: "Timezone", type: "select", options: ["UTC", "EST", "PST", "GMT"] },
        { key: "language", label: "Language", type: "select", options: ["en", "vi", "es", "fr"] }
      ]
    },
    {
      title: "Notifications",
      icon: Bell,
      description: "Configure notification preferences",
      fields: [
        { key: "enableNotifications", label: "Enable Notifications", type: "switch" },
        { key: "enableLogging", label: "Enable System Logging", type: "switch" },
        { key: "logLevel", label: "Log Level", type: "select", options: ["debug", "info", "warning", "error"] }
      ]
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
              <Settings className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 
                className="text-4xl font-bold"
                style={{ color: currentTheme.primary }}
              >
                Settings
              </h1>
              <p className="text-lg text-slate-600 mt-2">Configure your application preferences</p>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {settingSections.map((section, index) => (
            <Card 
              key={index}
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
                    <section.icon className="h-6 w-6 text-white" />
                  </div>
                  {section.title}
                </CardTitle>
                <p className="text-slate-600 mt-2">{section.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="space-y-2">
                    <Label 
                      htmlFor={field.key}
                      className="text-sm font-medium text-slate-700"
                    >
                      {field.label}
                    </Label>
                    
                    {field.type === 'switch' ? (
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={field.key}
                          checked={settings[field.key as keyof typeof settings] as boolean}
                          onCheckedChange={(checked) => handleSettingChange(field.key, checked)}
                        />
                        <Label htmlFor={field.key} className="text-sm text-slate-600">
                          {settings[field.key as keyof typeof settings] ? 'Enabled' : 'Disabled'}
                        </Label>
                      </div>
                    ) : field.type === 'select' ? (
                      <Select
                        value={settings[field.key as keyof typeof settings] as string}
                        onValueChange={(value) => handleSettingChange(field.key, value)}
                      >
                        <SelectTrigger 
                          className="bg-white/50 backdrop-blur-sm"
                          style={{ borderColor: `${currentTheme.primary}30` }}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option.toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={field.key}
                        type={field.type}
                        value={settings[field.key as keyof typeof settings] as string}
                        onChange={(e) => handleSettingChange(field.key, e.target.value)}
                        className="bg-white/50 backdrop-blur-sm"
                        style={{ borderColor: `${currentTheme.primary}30` }}
                      />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <Card 
          className="border-white/50 shadow-xl"
          style={{ 
            background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.accent}cc)`,
            borderColor: `${currentTheme.primary}30`
          }}
        >
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div>
                <h3 
                  className="font-semibold text-lg"
                  style={{ color: currentTheme.primary }}
                >
                  Save Changes
                </h3>
                <p className="text-sm text-slate-600">
                  Remember to save your settings before leaving this page
                </p>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="hover:scale-105 transition-all duration-300"
                  style={{ borderColor: `${currentTheme.primary}50`, color: currentTheme.primary }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button 
                  className="shadow-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                    color: 'white'
                  }}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle 
              className="text-xl font-semibold flex items-center gap-2"
              style={{ color: currentTheme.primary }}
            >
              <Database className="h-5 w-5" />
              System Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Version:</span>
                  <span className="font-medium">v2.1.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Build:</span>
                  <span className="font-medium">#1234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Environment:</span>
                  <span className="font-medium">Production</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Last Updated:</span>
                  <span className="font-medium">2024-01-15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Database:</span>
                  <span className="font-medium">Connected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">License:</span>
                  <span className="font-medium">Enterprise</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
