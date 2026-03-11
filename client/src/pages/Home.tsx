import { Link } from "wouter";
import { Sparkles, Building2, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated gradient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-slate-700/50 backdrop-blur-md bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ArchAI</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center space-y-8 max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-4 py-2 rounded-full backdrop-blur-sm hover:border-blue-500/50 transition-colors">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-slate-300">AI-Powered Design Generation</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Create Stunning
            </span>
            <br />
            <span className="text-white">3D Architecture Layouts</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Transform your architectural vision into interactive 3D models in seconds. Define your space, customize your style, and export professional layouts.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <Link href="/design">
              <button 
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold text-lg text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
                data-testid="button-get-started"
              >
                <span>Start Designing</span>
                <Zap className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 backdrop-blur-sm hover:border-blue-500/50 hover:bg-slate-800/60 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Smart Layouts</h3>
              <p className="text-slate-400">AI-generated floor plans tailored to your specifications</p>
            </div>

            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 backdrop-blur-sm hover:border-purple-500/50 hover:bg-slate-800/60 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">3D Visualization</h3>
              <p className="text-slate-400">Interactive models you can rotate and explore</p>
            </div>

            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 backdrop-blur-sm hover:border-pink-500/50 hover:bg-slate-800/60 transition-all duration-300">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quick Export</h3>
              <p className="text-slate-400">Download as PDF or high-res images instantly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
