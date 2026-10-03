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

export const PlatformGuide: React.FC<PlatformGuideProps> = ({
  onSelectPlatform,
}) => {
  const getIcon = (id: SupportedPlatformId) => {
    switch (id) {
      case 'youtube':
        return <Youtube className="w-5 h-5 text-red-500" />;
      case 'instagram':
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
    <section className="py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">
          Supported Platforms
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.values(PLATFORMS_DATA).map((platform) => (
            <button
              key={platform.id}
              onClick={() =>
                onSelectPlatform(platform.id as SupportedPlatformId)
              }
              className="p-5 rounded-xl bg-slate-900 border border-slate-800 text-white"
            >
              <div className="flex items-center gap-3">
                {getIcon(platform.id as SupportedPlatformId)}
                <div>
  <div>{platform.name}</div>
  <div className="text-xs text-slate-400">Media</div>
</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
