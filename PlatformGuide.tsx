import React from 'react';
import {
  Youtube,
  Film,
  Flame,
  Globe,
  Facebook,
  Twitter,
  Pin,
  MessageSquare,
  Ghost,
  Linkedin,
  AtSign,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { PLATFORMS_DATA } from './utils/platformDetector';
import { SupportedPlatformId } from './types';

interface PlatformGuideProps {
  onSelectPlatform: (platformId: SupportedPlatformId) => void;
}

export const PlatformGuide: React.FC<PlatformGuideProps> = ({ onSelectPlatform }) => {
  const getIcon = (id: SupportedPlatformId) => {
    switch (id) {
      case 'youtube':
      case 'youtube-shorts':
        return <Youtube className="w-5 h-5 text-red-500" />;
      case 'instagram':
      case 'instagram-reels':
        return <Film className="w-5 h-5 text-pink-500" />;
      case 'tiktok':
        return <Flame className="w-5 h-5 text-cyan-400" />;
      case 'facebook':
        return <Facebook className="w-5 h-5 text-blue-500" />;
      case 'twitter':
        return <Twitter className="w-5 h-5 text-sky-400" />;
      case 'pinterest':
        return <Pin className="w-5 h-5 text-rose-500" />;
      case 'reddit':
        return <MessageSquare className="w-5 h-5 text-orange-500" />;
      case 'snapchat':
        return <Ghost className="w-5 h-5 text-yellow-400" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5 text-blue-400" />;
      case 'threads':
        return <AtSign className="w-5 h-5 text-slate-300" />;
      default:
        return <Globe className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <section id="platforms" className="py-16 md:py-20 border-t border-slate-900 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Multi-Platform Compatibility
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Supported Social Media Platforms
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            OmniFetch natively parses publicly accessible media streams across top video and social networks.
          </p>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Object.values(PLATFORMS_DATA).map((p) => (
            <div
              key={p.id}
              onClick={() => onSelectPlatform(p.id)}
              className="group relative p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-indigo-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:scale-110 transition-transform">
                    {getIcon(p.id)}
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-400">
                    {p.supportedFormats[0]}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {p.name} Downloader
                </h3>

                <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {p.guidanceText}
                </p>

                {/* Content Tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {p.supportedContent.slice(0, 2).map((c, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950/80 text-slate-400 border border-slate-800/60"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                <span>View platform guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Legal Compliance Notice */}
        <div className="mt-10 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Strict adherence to platform terms: We do not bypass private accounts, DRM encryptions, authentication, or paywalls.
          </span>
        </div>

      </div>
    </section>
  );
};
