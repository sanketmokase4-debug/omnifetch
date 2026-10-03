import React from 'react';
import { Download, ShieldCheck, Heart, ExternalLink } from 'lucide-react';
import { PLATFORMS_DATA } from '../utils/platformDetector';
import { SupportedPlatformId } from '../types';

interface FooterProps {
  onOpenLegal: (tab: 'privacy' | 'terms' | 'dmca' | 'contact') => void;
  onSelectPlatformPage: (platformId: SupportedPlatformId) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLegal,
  onSelectPlatformPage
}) => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Download className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">
                Omni<span className="text-indigo-400">Fetch</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              All-in-One modern social media video and media downloader. Fast, reliable, and compliant with platform copyright policies.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero logs • No DRM bypass • 100% Free</span>
            </div>
          </div>

          {/* Platform Category 1 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Video Downloaders
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectPlatformPage('youtube')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  YouTube Downloader
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPlatformPage('youtube-shorts')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  YouTube Shorts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPlatformPage('tiktok')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  TikTok Downloader
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPlatformPage('facebook')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Facebook Video
                </button>
              </li>
            </ul>
          </div>

          {/* Platform Category 2 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Social Media
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectPlatformPage('instagram')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Instagram Photos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPlatformPage('instagram-reels')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Instagram Reels
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPlatformPage('twitter')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Twitter / X Video
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPlatformPage('pinterest')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Pinterest Pins
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPlatformPage('reddit')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Reddit Media
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Legal & Support
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('dmca')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  DMCA / Copyright
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('contact')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Mandatory Legal Notice */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-slate-500 text-[11px] leading-relaxed max-w-2xl">
            <strong>Legal Disclaimer:</strong> Only download content you have permission to download or content that is otherwise legally available for downloading. Respect copyright and the terms of the platform hosting the content. OmniFetch is not affiliated with YouTube, Meta, TikTok, X, or any other mentioned brand.
          </p>
          <div className="text-slate-500 text-xs">
            © {new Date().getFullYear()} OmniFetch. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
