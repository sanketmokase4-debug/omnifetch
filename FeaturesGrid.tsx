import React from 'react';
import {
  Zap,
  Shield,
  Smartphone,
  Sparkles,
  Layers,
  Music2,
  Trash2,
  Lock
} from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: 'High-Speed Stream Processing',
      description: 'Distributed streaming pipelines parse and prepare media files with virtually zero waiting time.'
    },
    {
      icon: <Smartphone className="w-5 h-5 text-indigo-400" />,
      title: 'Mobile-First Responsive Design',
      description: 'Engineered specifically for one-tap mobile browsing on iOS Safari, Android Chrome, and tablets.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
      title: 'No Watermarks Added',
      description: 'Downloads media in its pure, original quality without third-party overlays or compression artifacts.'
    },
    {
      icon: <Music2 className="w-5 h-5 text-purple-400" />,
      title: 'Audio Extractor (MP3)',
      description: 'Easily strip soundtrack audio from TikTok, YouTube Shorts, or Reels in 320kbps MP3 fidelity.'
    },
    {
      icon: <Lock className="w-5 h-5 text-emerald-400" />,
      title: '100% Privacy & Zero Logs',
      description: 'We never store passwords, cookies, session credentials, or permanent copyrighted video archives.'
    },
    {
      icon: <Trash2 className="w-5 h-5 text-rose-400" />,
      title: 'Auto Temporary Cleanup',
      description: 'All intermediate worker files are purged automatically from memory within minutes.'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-slate-900/40 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Why Choose OmniFetch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for Speed, Quality & Simplicity
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Everything you need for fast and hassle-free public media archiving.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
