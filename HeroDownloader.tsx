import React, { useState, useEffect, useRef } from 'react';
import {
  Link2,
  Clipboard,
  Search,
  Download,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Loader2,
  X,
  Youtube,
  Film,
  Flame,
  Globe,
  Facebook,
  Twitter,
  Pin,
  MessageSquare
} from 'lucide-react';
import { detectPlatform, PLATFORMS_DATA } from './utils/platformDetector';
import { SupportedPlatformId, MediaAnalysisResult } from './types';
import { SupportedPlatformId, MediaAnalysisResult } from '../types';

interface HeroDownloaderProps {
  onAnalyze: (url: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  onClearError: () => void;
  result: MediaAnalysisResult | null;
  presetPlatform?: SupportedPlatformId | null;
}

export const HeroDownloader: React.FC<HeroDownloaderProps> = ({
  onAnalyze,
  isLoading,
  error,
  onClearError,
  result,
  presetPlatform
}) => {
  const [inputUrl, setInputUrl] = useState('');
  const [detectedPlatform, setDetectedPlatform] = useState<SupportedPlatformId>('generic');
  const [hasPasted, setHasPasted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update detection when URL changes
  useEffect(() => {
    if (inputUrl) {
      const { platform } = detectPlatform(inputUrl);
      setDetectedPlatform(platform);
      if (error) onClearError();
    } else if (presetPlatform) {
      setDetectedPlatform(presetPlatform);
    } else {
      setDetectedPlatform('generic');
    }
  }, [inputUrl, presetPlatform]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputUrl(text);
        setHasPasted(true);
        setTimeout(() => setHasPasted(false), 2000);
        // Auto trigger analysis on paste
        onAnalyze(text);
      }
    } catch (err) {
      // Fallback if clipboard permission denied
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim() || isLoading) return;
    onAnalyze(inputUrl);
  };

  const handleSampleClick = (sampleUrl: string) => {
    setInputUrl(sampleUrl);
    onAnalyze(sampleUrl);
  };

  const activeConfig = PLATFORMS_DATA[detectedPlatform] || PLATFORMS_DATA.generic;

  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-cyan-500/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Trust Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-inner text-xs font-medium text-indigo-300 mb-6 animate-in fade-in zoom-in duration-500">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>Universal Public Media Downloader • 100% Free & Legal</span>
        </div>

        {/* Hero Headlines */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-[1.15]">
          Download Videos, Reels, <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
            Posts & More
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-8 sm:mb-10 font-normal">
          Paste a public social-media link and download available media in seconds.
        </p>

        {/* Downloader Form Card */}
        <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800/90 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl shadow-indigo-950/40">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            
            {/* Input Bar */}
            <div className="relative flex items-center bg-slate-950/80 rounded-xl sm:rounded-2xl border border-slate-800 focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all duration-200">
              
              {/* Platform Detection Indicator */}
              <div className="pl-3.5 sm:pl-4 flex items-center justify-center shrink-0">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                  style={{ backgroundColor: `${activeConfig.color}20`, color: activeConfig.color }}
                  title={`Detected: ${activeConfig.name}`}
                >
                  <Globe className="w-4 h-4" />
                </div>
              </div>

              {/* Text Input */}
              <input
                ref={inputRef}
                type="url"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Paste video or post URL here..."
                disabled={isLoading}
                className="w-full bg-transparent px-3 sm:px-4 py-3.5 sm:py-4 text-sm sm:text-base text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />

              {/* Clear button if URL present */}
              {inputUrl && (
                <button
                  type="button"
                  onClick={() => setInputUrl('')}
                  className="p-1.5 mr-1 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Paste Button inside Input */}
              <button
                type="button"
                onClick={handlePaste}
                className="mr-2 sm:mr-3 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/60 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                {hasPasted ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300 hidden sm:inline">Pasted</span>
                  </>
                ) : (
                  <>
                    <Clipboard className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Paste</span>
                  </>
                )}
              </button>
            </div>

            {/* Action Buttons Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-1">
              
              {/* Analyze Button */}
              <button
                type="button"
                onClick={() => inputUrl && onAnalyze(inputUrl)}
                disabled={!inputUrl.trim() || isLoading}
                className="w-full py-3 sm:py-3.5 px-6 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700/80 text-slate-200 hover:text-white border border-slate-700/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                    <span>Inspecting media...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 text-indigo-400" />
                    <span>Analyze</span>
                  </>
                )}
              </button>

              {/* Instant Download CTA Button */}
              <button
                type="submit"
                disabled={!inputUrl.trim() || isLoading}
                className="w-full py-3 sm:py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>Download</span>
              </button>
            </div>

          </form>

          {/* Error Message Box */}
          {error && (
            <div className="mt-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-start gap-2.5 text-left animate-in fade-in duration-200">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">{error}</p>
                <p className="text-xs text-rose-400/80 mt-0.5">
                  Ensure the post is public and does not require account authentication or DRM tokens.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Sample URLs to Try */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Quick Test:</span>
          
          <button
            onClick={() => handleSampleClick('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            YouTube Video
          </button>

          <button
            onClick={() => handleSampleClick('https://www.youtube.com/shorts/kfVsfOSbJY0')}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            YouTube Shorts
          </button>

          <button
            onClick={() => handleSampleClick('https://www.tiktok.com/@tiktok/video/7123456789012345678')}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            TikTok
          </button>

          <button
            onClick={() => handleSampleClick('https://www.instagram.com/reel/C8_SAMPLE_REEL/')}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-pink-500"></span>
            Instagram Reel
          </button>

          <button
            onClick={() => handleSampleClick('https://x.com/Twitter/status/1234567890123456789')}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400"></span>
            X (Twitter)
          </button>
        </div>

        {/* Legal Disclaimer Sub-bar */}
        <div className="mt-8 text-center text-xs text-slate-400 max-w-xl mx-auto">
          <p>
            🔒 Only download content you have permission to download or content that is otherwise legally available for downloading. Respect copyright and platform terms.
          </p>
        </div>

      </div>
    </section>
  );
};
