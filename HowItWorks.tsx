import React from 'react';
import { ClipboardCopy, Search, DownloadCloud, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Copy Public URL',
      description: 'Open YouTube, Instagram, TikTok, X, or any supported social network and copy the link of any public post or video.',
      icon: <ClipboardCopy className="w-6 h-6 text-indigo-400" />
    },
    {
      step: '02',
      title: 'Analyze Media',
      description: 'Paste the link into the OmniFetch search bar. Our engine automatically detects the platform and validates available stream formats.',
      icon: <Search className="w-6 h-6 text-cyan-400" />
    },
    {
      step: '03',
      title: 'Instant Download',
      description: 'Choose your desired resolution (1080p, 720p, 480p) or audio track (MP3) and download directly to your mobile or desktop device.',
      icon: <DownloadCloud className="w-6 h-6 text-emerald-400" />
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Fast 3-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How OmniFetch Works
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Simple, seamless, and lightning fast. No complex setup or software installations required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/90 shadow-xl flex flex-col justify-between group hover:border-indigo-500/40 hover:bg-slate-900/90 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                  <span className="text-3xl font-extrabold font-mono text-slate-800 group-hover:text-indigo-500/30 transition-colors">
                    {s.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-1.5 text-xs text-indigo-400 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero registration required</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
