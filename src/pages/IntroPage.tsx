import { ArrowRight, BarChart3, Grip, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

export function IntroPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-slate-950/0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-indigo-500/20">
              <span className="text-3xl font-bold text-white">W</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
              Waffle Board
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              A modern, high-performance dashboard template built with React, Vite, and <span className="text-indigo-400 font-semibold">Waffle Charts</span>.
              Configurable, themeable, and ready to deploy.
            </p>
            <div className="flex gap-4">
              <Link
                to="/dashboard"
                className="group flex items-center gap-2 px-8 py-3 bg-white text-slate-950 rounded-full font-semibold hover:bg-indigo-50 transition-all active:scale-95"
              >
                Launch Demo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://github.com/mbuchthal/waffle-board"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3 bg-slate-800 text-slate-300 rounded-full font-semibold hover:bg-slate-700 transition-all border border-slate-700"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-800">
        <div className="grid md:grid-cols-3 gap-12">
          <FeatureCard
            icon={<BarChart3 className="w-6 h-6 text-indigo-400" />}
            title="Waffle Charts Integration"
            description="Built on top of Visx. Includes a full suite of charts: Line, Bar, Scatter, Heatmap, Chord, and more."
          />
          <FeatureCard
            icon={<Palette className="w-6 h-6 text-purple-400" />}
            title="Advanced Theming"
            description="Switch between Ocean, Forest, Sunset, and Dark modes instantly. CSS variable driven design system."
          />
          <FeatureCard
            icon={<Grip className="w-6 h-6 text-pink-400" />}
            title="Draggable Layouts"
            description="Powered by react-grid-layout. Resize and rearrange widgets to create your perfect workspace."
          />
        </div>
      </div>

      {/* Code Snippet Section */}
      <div className="max-w-4xl mx-auto px-6 py-10 mb-20">
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-b border-slate-800">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <span className="ml-2 text-xs text-slate-500 font-mono">Terminal</span>
          </div>
          <div className="p-6 font-mono text-sm overflow-x-auto">
            <div className="flex gap-4 text-slate-300 mb-2">
              <span className="text-slate-500 select-none">$</span>
              <span>git clone https://github.com/mbuchthal/waffle-board.git</span>
            </div>
            <div className="flex gap-4 text-slate-300 mb-2">
              <span className="text-slate-500 select-none">$</span>
              <span>cd waffle-board</span>
            </div>
            <div className="flex gap-4 text-slate-300">
              <span className="text-slate-500 select-none">$</span>
              <span>npm install && npm run dev</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center py-10 text-slate-500 text-sm border-t border-slate-900">
        <p>© 2025 Waffle Board. <Link to="/license" className="hover:text-indigo-400 transition-colors">MIT License</Link>.</p>
        <div className="mt-2 flex justify-center gap-4">
          <a href="https://github.com/mbuchthal/waffle-charts" className="hover:text-indigo-400 transition-colors">Waffle Charts</a>
          <span>•</span>
          <a href="https://github.com/mbuchthal/waffle-board" className="hover:text-indigo-400 transition-colors">Waffle Board</a>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 hover:bg-slate-900 transition-all">
      <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-100 mb-2">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
