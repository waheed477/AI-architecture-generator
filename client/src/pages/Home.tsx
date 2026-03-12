import { Link } from "wouter";
import { Sparkles, Building2, Zap } from "lucide-react";
import { useLayoutStore } from "@/state/store";
import Footer from "@/components/Footer";

export default function Home() {
  const isDark = useLayoutStore((state) => state.theme === 'dark');

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-b from-gray-900 via-black to-black text-white' : 'bg-gradient-to-b from-slate-50 via-gray-100 to-white text-gray-900'} overflow-hidden relative transition-colors duration-300 flex flex-col`}>
      {/* Background image with overlay */}
      <div 
        className={`absolute inset-0 ${isDark ? 'opacity-30' : 'opacity-10'}`}
        style={{
          backgroundImage: "url('/architecture-hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      ></div>
      
      {/* Dark/Light overlay */}
      <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-black/40 via-black/60 to-black/80' : 'bg-gradient-to-b from-white/40 via-white/60 to-white/80'}`}></div>

      {/* Animated gradient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 ${isDark ? 'bg-gray-500/10' : 'bg-blue-500/10'} rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 ${isDark ? 'bg-gray-600/10' : 'bg-indigo-600/10'} rounded-full blur-3xl animate-pulse`} style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-20 flex-grow">
        {/* Navigation */}
        <nav className={`border-b backdrop-blur-md ${isDark ? 'border-gray-700/50 bg-black/50' : 'border-gray-200/50 bg-white/50'}`}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className={`w-8 h-8 ${isDark ? 'text-gray-300' : 'text-blue-600'}`} />
              <span className={`text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${isDark ? 'from-gray-300 to-gray-400' : 'from-blue-600 to-indigo-600'}`}>ArchStudio</span>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-[calc(100vh-280px)]">
          <div className="text-center space-y-8 max-w-3xl">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm transition-colors border ${isDark ? 'bg-gray-800/40 border-gray-700/60 hover:border-gray-500/60' : 'bg-white/40 border-gray-200/60 hover:border-blue-500/40 shadow-sm'}`}>
              <Sparkles className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-blue-600'}`} />
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>AI-Powered Design Generation</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className={`bg-gradient-to-r bg-clip-text text-transparent ${isDark ? 'from-gray-200 via-gray-300 to-white' : 'from-gray-900 via-gray-800 to-gray-600'}`}>
                Create Stunning
              </span>
              <br />
              <span className={isDark ? 'text-white' : 'text-gray-900'}>3D Architecture Layouts</span>
            </h1>

            {/* Subheading */}
            <p className={`text-xl leading-relaxed max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Transform your architectural vision into interactive 3D models in seconds. Define your space, customize your style, and export professional layouts.
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Link href="/design">
                <button 
                  className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-lg text-white shadow-lg transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:shadow-gray-600/30' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-600/30'}`}
                  data-testid="button-get-started"
                >
                  <span>Start Designing</span>
                  <Zap className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
              <div className={`rounded-xl p-6 backdrop-blur-sm transition-all duration-300 border shadow-sm ${isDark ? 'bg-gray-800/30 border-gray-700/60 hover:border-gray-500/60 hover:bg-gray-800/40' : 'bg-white border-gray-200 hover:border-blue-500/40 hover:shadow-md'}`}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto ${isDark ? 'bg-gray-600/30' : 'bg-blue-50'}`}>
                  <Building2 className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-blue-600'}`} />
                </div>
                <h3 className={`font-semibold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Smart Layouts</h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>AI-generated floor plans tailored to your specifications</p>
              </div>

              <div className={`rounded-xl p-6 backdrop-blur-sm transition-all duration-300 border shadow-sm ${isDark ? 'bg-gray-800/30 border-gray-700/60 hover:border-gray-500/60 hover:bg-gray-800/40' : 'bg-white border-gray-200 hover:border-blue-500/40 hover:shadow-md'}`}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto ${isDark ? 'bg-gray-600/30' : 'bg-blue-50'}`}>
                  <Sparkles className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-blue-600'}`} />
                </div>
                <h3 className={`font-semibold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>3D Visualization</h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Interactive models you can rotate and explore</p>
              </div>

              <div className={`rounded-xl p-6 backdrop-blur-sm transition-all duration-300 border shadow-sm ${isDark ? 'bg-gray-800/30 border-gray-700/60 hover:border-gray-500/60 hover:bg-gray-800/40' : 'bg-white border-gray-200 hover:border-blue-500/40 hover:shadow-md'}`}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto ${isDark ? 'bg-gray-600/30' : 'bg-blue-50'}`}>
                  <Zap className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-blue-600'}`} />
                </div>
                <h3 className={`font-semibold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Export</h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Download as PDF or high-res images instantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
}
