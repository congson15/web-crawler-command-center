
import { useState, useEffect } from "react";
import { Palette, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const themes = [
  {
    name: "Ocean Blue",
    id: "blue",
    primary: "#3b82f6",
    secondary: "#1e40af",
    background: "from-blue-50 via-indigo-50 to-purple-50",
    pageGradient: "from-slate-50 via-blue-50 to-indigo-50",
    accent: "#dbeafe"
  },
  {
    name: "Forest Green",
    id: "green",
    primary: "#10b981",
    secondary: "#059669",
    background: "from-emerald-50 via-green-50 to-teal-50",
    pageGradient: "from-slate-50 via-emerald-50 to-green-50",
    accent: "#d1fae5"
  },
  {
    name: "Royal Purple",
    id: "purple",
    primary: "#a855f7",
    secondary: "#7c3aed",
    background: "from-purple-50 via-violet-50 to-fuchsia-50",
    pageGradient: "from-slate-50 via-purple-50 to-violet-50",
    accent: "#e9d5ff"
  },
  {
    name: "Sunset Red",
    id: "red",
    primary: "#ef4444",
    secondary: "#dc2626",
    background: "from-red-50 via-pink-50 to-rose-50",
    pageGradient: "from-slate-50 via-red-50 to-pink-50",
    accent: "#fee2e2"
  },
  {
    name: "Golden Sun",
    id: "yellow",
    primary: "#eab308",
    secondary: "#d97706",
    background: "from-yellow-50 via-amber-50 to-orange-50",
    pageGradient: "from-slate-50 via-yellow-50 to-amber-50",
    accent: "#fef3c7"
  },
  {
    name: "Midnight Black",
    id: "black",
    primary: "#60a5fa",
    secondary: "#3b82f6",
    background: "from-gray-900 via-gray-800 to-black",
    pageGradient: "from-gray-900 via-gray-800 to-slate-900",
    accent: "#1f2937"
  },
  {
    name: "Pure White",
    id: "white",
    primary: "#1f2937",
    secondary: "#374151",
    background: "from-white via-gray-50 to-slate-50",
    pageGradient: "from-white via-gray-50 to-slate-100",
    accent: "#f8fafc"
  },
  {
    name: "Teal Wave",
    id: "teal",
    primary: "#14b8a6",
    secondary: "#0891b2",
    background: "from-teal-50 via-cyan-50 to-blue-50",
    pageGradient: "from-slate-50 via-teal-50 to-cyan-50",
    accent: "#ccfbf1"
  },
  {
    name: "Rose Pink",
    id: "rose",
    primary: "#f43f5e",
    secondary: "#ec4899",
    background: "from-rose-50 via-pink-50 to-fuchsia-50",
    pageGradient: "from-slate-50 via-rose-50 to-pink-50",
    accent: "#fce7f3"
  },
  {
    name: "Orange Sunset",
    id: "orange",
    primary: "#f97316",
    secondary: "#ea580c",
    background: "from-orange-50 via-red-50 to-pink-50",
    pageGradient: "from-slate-50 via-orange-50 to-red-50",
    accent: "#fed7aa"
  }
];

interface ThemeSelectorProps {
  onThemeChange: (theme: any) => void;
}

export function ThemeSelector({ onThemeChange }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('selected-theme');
    if (savedTheme) {
      const theme = themes.find(t => t.id === savedTheme) || themes[0];
      setSelectedTheme(theme);
      onThemeChange(theme);
      
      // Apply CSS variables immediately
      applyThemeVariables(theme);
    }
  }, [onThemeChange]);

  const applyThemeVariables = (theme: any) => {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.primary);
    root.style.setProperty('--theme-secondary', theme.secondary);
    root.style.setProperty('--theme-accent', theme.accent);
  };

  const handleThemeSelect = (theme: any) => {
    setSelectedTheme(theme);
    onThemeChange(theme);
    applyThemeVariables(theme);
    localStorage.setItem('selected-theme', theme.id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Sticky Theme Button */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`rounded-l-2xl rounded-r-none shadow-2xl border-r-0 transition-all duration-300 hover:scale-105 ${
            isOpen ? 'pr-4' : 'pr-6'
          }`}
          style={{
            background: `linear-gradient(135deg, ${selectedTheme.primary}, ${selectedTheme.secondary})`,
            color: selectedTheme.id === 'white' ? '#1f2937' : 'white'
          }}
        >
          <Palette className="h-5 w-5" />
          {!isOpen && <span className="ml-2 font-medium">Themes</span>}
        </Button>
      </div>

      {/* Theme Panel */}
      {isOpen && (
        <div className="fixed right-0 top-0 h-full w-80 z-40 animate-slide-in-right">
          <Card className="h-full rounded-none shadow-2xl border-l border-t-0 border-r-0 border-b-0 bg-white/95 backdrop-blur-xl">
            <CardContent className="p-0 h-full flex flex-col">
              {/* Header */}
              <div className="p-6 border-b bg-gradient-to-r from-slate-50 to-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xl text-gray-800">Choose Theme</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0 hover:bg-gray-200"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-1">Customize your dashboard appearance</p>
              </div>

              {/* Theme Grid */}
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                <div className="grid grid-cols-1 gap-4">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeSelect(theme)}
                      className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg group ${
                        selectedTheme.id === theme.id 
                          ? 'border-blue-500 shadow-xl shadow-blue-200 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                      }`}
                    >
                      {/* Color Preview */}
                      <div className="flex items-center gap-3 mb-3">
                        <div 
                          className="w-12 h-12 rounded-xl shadow-lg border-2 border-white"
                          style={{
                            background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                          }}
                        ></div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-gray-800">{theme.name}</div>
                          <div className="text-xs text-gray-500 font-mono">{theme.id}</div>
                        </div>
                      </div>

                      {/* Preview Bars */}
                      <div className="space-y-2">
                        <div 
                          className="h-3 rounded-full"
                          style={{ backgroundColor: theme.primary }}
                        ></div>
                        <div 
                          className="h-2 rounded-full opacity-70"
                          style={{ backgroundColor: theme.secondary }}
                        ></div>
                        <div 
                          className="h-2 rounded-full opacity-50"
                          style={{ backgroundColor: theme.accent }}
                        ></div>
                      </div>

                      {/* Selected Indicator */}
                      {selectedTheme.id === theme.id && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}

                      {/* Hover Indicator */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t bg-gradient-to-r from-slate-50 to-slate-100">
                <div className="text-center">
                  <div className="text-sm text-gray-600">
                    Current: <span className="font-semibold">{selectedTheme.name}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Theme saved automatically
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 animate-fade-in"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
