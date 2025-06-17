
export function DashboardBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
      
      {/* Floating Geometric Shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-40 w-48 h-48 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-40 w-40 h-40 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      
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
