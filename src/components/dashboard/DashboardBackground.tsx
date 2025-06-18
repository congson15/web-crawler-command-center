
interface DashboardBackgroundProps {
  theme?: {
    colors: {
      background: string;
      pageGradient?: string;
    };
  };
}

export function DashboardBackground({ theme }: DashboardBackgroundProps) {
  const backgroundGradient = theme?.colors?.background || "from-blue-50 via-indigo-50 to-purple-50";
  
  // Get colors based on theme
  const getFloatingShapeColors = () => {
    const themeId = theme?.colors?.background;
    
    if (themeId?.includes('emerald') || themeId?.includes('green')) {
      return [
        "from-emerald-400/20 to-green-400/20",
        "from-green-400/20 to-teal-400/20", 
        "from-teal-400/20 to-cyan-400/20",
        "from-lime-400/20 to-emerald-400/20"
      ];
    }
    
    if (themeId?.includes('red') || themeId?.includes('pink')) {
      return [
        "from-red-400/20 to-pink-400/20",
        "from-pink-400/20 to-rose-400/20",
        "from-rose-400/20 to-red-400/20", 
        "from-orange-400/20 to-red-400/20"
      ];
    }
    
    if (themeId?.includes('purple') || themeId?.includes('violet')) {
      return [
        "from-purple-400/20 to-violet-400/20",
        "from-violet-400/20 to-fuchsia-400/20",
        "from-fuchsia-400/20 to-purple-400/20",
        "from-indigo-400/20 to-purple-400/20"
      ];
    }
    
    if (themeId?.includes('yellow') || themeId?.includes('amber')) {
      return [
        "from-yellow-400/20 to-amber-400/20",
        "from-amber-400/20 to-orange-400/20",
        "from-orange-400/20 to-yellow-400/20",
        "from-lime-400/20 to-yellow-400/20"
      ];
    }
    
    if (themeId?.includes('gray') || themeId?.includes('black')) {
      return [
        "from-gray-400/20 to-slate-400/20",
        "from-slate-400/20 to-gray-400/20",
        "from-zinc-400/20 to-gray-400/20",
        "from-stone-400/20 to-slate-400/20"
      ];
    }
    
    // Default blue theme
    return [
      "from-blue-400/20 to-purple-400/20",
      "from-indigo-400/20 to-pink-400/20",
      "from-cyan-400/20 to-blue-400/20",
      "from-purple-400/20 to-indigo-400/20"
    ];
  };
  
  const shapeColors = getFloatingShapeColors();
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dynamic Background Gradients */}
      <div className={`absolute inset-0 bg-gradient-to-br ${backgroundGradient}`}></div>
      
      {/* Floating Geometric Shapes */}
      <div className={`absolute top-20 left-20 w-32 h-32 bg-gradient-to-br ${shapeColors[0]} rounded-full blur-xl animate-pulse`}></div>
      <div className={`absolute top-40 right-40 w-48 h-48 bg-gradient-to-br ${shapeColors[1]} rounded-full blur-xl animate-pulse`} style={{ animationDelay: '1s' }}></div>
      <div className={`absolute bottom-40 left-40 w-40 h-40 bg-gradient-to-br ${shapeColors[2]} rounded-full blur-xl animate-pulse`} style={{ animationDelay: '2s' }}></div>
      <div className={`absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br ${shapeColors[3]} rounded-full blur-xl animate-pulse`} style={{ animationDelay: '3s' }}></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/5 to-white/20"></div>
    </div>
  );
}
