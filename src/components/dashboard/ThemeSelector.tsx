
import { useState } from "react";
import { Palette, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const themes = [
  {
    name: "Blue Ocean",
    id: "blue",
    primary: "from-blue-500 to-blue-600",
    secondary: "from-blue-50 to-indigo-50",
    accent: "bg-blue-100",
    colors: {
      primary: "#3b82f6",
      secondary: "#1e40af",
      background: "from-blue-50 via-indigo-50 to-purple-50",
      pageGradient: "from-slate-50 via-blue-50 to-indigo-50"
    }
  },
  {
    name: "Emerald Forest",
    id: "green",
    primary: "from-emerald-500 to-green-600",
    secondary: "from-emerald-50 to-green-50",
    accent: "bg-emerald-100",
    colors: {
      primary: "#10b981",
      secondary: "#059669",
      background: "from-emerald-50 via-green-50 to-teal-50",
      pageGradient: "from-slate-50 via-emerald-50 to-green-50"
    }
  },
  {
    name: "Sunset Orange",
    id: "orange",
    primary: "from-orange-500 to-red-500",
    secondary: "from-orange-50 to-red-50",
    accent: "bg-orange-100",
    colors: {
      primary: "#f97316",
      secondary: "#ea580c",
      background: "from-orange-50 via-red-50 to-pink-50",
      pageGradient: "from-slate-50 via-orange-50 to-red-50"
    }
  },
  {
    name: "Midnight Dark",
    id: "dark",
    primary: "from-gray-800 to-black",
    secondary: "from-gray-900 to-gray-800",
    accent: "bg-gray-700",
    colors: {
      primary: "#1f2937",
      secondary: "#111827",
      background: "from-gray-900 via-gray-800 to-black",
      pageGradient: "from-gray-900 via-gray-800 to-slate-900"
    }
  },
  {
    name: "Ruby Fire",
    id: "red",
    primary: "from-red-500 to-red-600",
    secondary: "from-red-50 to-pink-50",
    accent: "bg-red-100",
    colors: {
      primary: "#ef4444",
      secondary: "#dc2626",
      background: "from-red-50 via-pink-50 to-rose-50",
      pageGradient: "from-slate-50 via-red-50 to-pink-50"
    }
  },
  {
    name: "Pure White",
    id: "white",
    primary: "from-white to-gray-100",
    secondary: "from-gray-50 to-white",
    accent: "bg-gray-50",
    colors: {
      primary: "#f9fafb",
      secondary: "#f3f4f6",
      background: "from-white via-gray-50 to-slate-50",
      pageGradient: "from-white via-gray-50 to-slate-100"
    }
  },
  {
    name: "Golden Sun",
    id: "yellow",
    primary: "from-yellow-500 to-amber-600",
    secondary: "from-yellow-50 to-amber-50",
    accent: "bg-yellow-100",
    colors: {
      primary: "#eab308",
      secondary: "#d97706",
      background: "from-yellow-50 via-amber-50 to-orange-50",
      pageGradient: "from-slate-50 via-yellow-50 to-amber-50"
    }
  },
  {
    name: "Purple Galaxy",
    id: "purple",
    primary: "from-purple-500 to-violet-600",
    secondary: "from-purple-50 to-violet-50",
    accent: "bg-purple-100",
    colors: {
      primary: "#a855f7",
      secondary: "#7c3aed",
      background: "from-purple-50 via-violet-50 to-fuchsia-50",
      pageGradient: "from-slate-50 via-purple-50 to-violet-50"
    }
  },
  {
    name: "Teal Wave",
    id: "teal",
    primary: "from-teal-500 to-cyan-600",
    secondary: "from-teal-50 to-cyan-50",
    accent: "bg-teal-100",
    colors: {
      primary: "#14b8a6",
      secondary: "#0891b2",
      background: "from-teal-50 via-cyan-50 to-blue-50",
      pageGradient: "from-slate-50 via-teal-50 to-cyan-50"
    }
  },
  {
    name: "Rose Pink",
    id: "rose",
    primary: "from-rose-500 to-pink-600",
    secondary: "from-rose-50 to-pink-50",
    accent: "bg-rose-100",
    colors: {
      primary: "#f43f5e",
      secondary: "#ec4899",
      background: "from-rose-50 via-pink-50 to-fuchsia-50",
      pageGradient: "from-slate-50 via-rose-50 to-pink-50"
    }
  }
];

interface ThemeSelectorProps {
  onThemeChange: (theme: any) => void;
}

export function ThemeSelector({ onThemeChange }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  const handleThemeSelect = (theme: any) => {
    setSelectedTheme(theme);
    onThemeChange(theme);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-gradient-to-r ${selectedTheme.primary} hover:opacity-90 text-white shadow-xl transition-all duration-300 hover:scale-105`}
      >
        <Palette className="h-4 w-4 mr-2" />
        Themes
      </Button>

      {isOpen && (
        <Card className="absolute top-14 right-0 w-96 shadow-2xl border-0 bg-white/95 backdrop-blur-xl max-h-96 overflow-y-auto">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Choose Theme</h3>
            <div className="grid grid-cols-2 gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme)}
                  className={`relative p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                    selectedTheme.id === theme.id 
                      ? 'border-blue-500 shadow-lg shadow-blue-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-full h-6 bg-gradient-to-r ${theme.primary} rounded mb-2`}></div>
                  <div className={`w-full h-3 bg-gradient-to-r ${theme.secondary} rounded mb-2`}></div>
                  <div className="text-xs font-medium text-gray-700">{theme.name}</div>
                  
                  {selectedTheme.id === theme.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
