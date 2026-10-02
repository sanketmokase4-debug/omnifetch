import React, { useState } from 'react';
import {
  ArrowLeft,
  Download,
  Search,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Film,
  FileCheck,
  Shield,
  Layers,
  ChevronDown
} from 'lucide-react';
import { PLATFORMS_DATA } from './utils/platformDetector';
import { SupportedPlatformId, MediaAnalysisResult } from './types';
import { AnalysisResultCard } from './AnalysisResultCard';
import { SupportedPlatformId, MediaAnalysisResult } from '../types';

interface PlatformSeoPageProps {
  platformId: SupportedPlatformId;
  onBackToHome: () => void;
  onAnalyze: (url: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  result: MediaAnalysisResult | null;
}

export const PlatformSeoPage: React.FC<PlatformSeoPageProps> = ({
  platformId,
  onBackToHome,
  onAnalyze,
  isLoading,
  error,
  result
}) => {
  const config = PLATFORMS_DATA[platformId] || PLATFORMS_DATA.youtube;
  const [pageUrl, setPageUrl] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pageUrl.trim()) {
      onAnalyze(pageUrl.trim());
    }
  };

  return (
    <div className="min-h-screen pb-20 animate-in fade-in duration-300">
      
      {/* Top Breadcrumb Header */}
      <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Downloaders</span>
          </button>
          <span className="text-xs font-mono text-indigo-400">/{config.seoSlug}</span>
        </div>
      </div>

      {/* Platform Hero */}
      <div className="relative py-12 md:py-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none -z-10"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 30%, ${config.color}, transparent 70%)`
          }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 mb-4">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: config.color }}
            />
            <span>Dedicated {config.name} Downloader</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {config.seoTitle}
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-8">
            {config.seoDescription}
          </p>

          {/* Quick Input Bar */}
          <div className="max-w-2xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 sm:p-3 shadow-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                value={pageUrl}
                onChange={(e) => setPageUrl(e.target.value)}
                placeholder={`Paste ${config.name} link here...`}
                className="flex-1 bg-slate-950 px-4 py-3 text-sm text-white rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={!pageUrl.trim() || isLoading}
                className="py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-lg shadow-indigo-600/20"
              >
                <Search className="w-4 h-4" />
                <span>{isLoading ? 'Analyzing...' : 'Analyze'}</span>
              </button>
            </form>
          </div>

          {/* Sample URL trigger */}
          {config.sampleUrls.length > 0 && (
            <div className="mt-4 text-xs text-slate-400">
              <span>Try with sample link: </span>
              <button
                onClick={() => {
                  setPageUrl(config.sampleUrls[0]);
                  onAnalyze(config.sampleUrls[0]);
                }}
                className="text-indigo-400 underline hover:text-indigo-300 font-mono"
              >
                {config.sampleUrls[0]}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Result Display if Analyzed */}
      {result && (
        <div className="max-w-4xl mx-auto px-4">
          <AnalysisResultCard result={result} onReset={() => {}} />
        </div>
      )}

      {/* In-depth Guidance & SEO Info Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        
        {/* Supported Formats & Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-base mb-3">
              <Film className="w-5 h-5" />
              <span>Supported Content</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {config.supportedContent.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-base mb-3">
              <FileCheck className="w-5 h-5" />
              <span>Available Formats</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {config.supportedFormats.map((fmt, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>{fmt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Step-by-Step Platform Usage Guide */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800">
          <h2 className="text-xl font-bold text-white mb-4">
            How to Download {config.name} Media
          </h2>
          <ol className="space-y-4 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-mono font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <p className="font-semibold text-white">Find the {config.name} post or video</p>
                <p className="text-slate-400 text-xs mt-0.5">Open {config.name} on your web browser or app and navigate to the public media item.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-mono font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <p className="font-semibold text-white">Copy the Link</p>
                <p className="text-slate-400 text-xs mt-0.5">Tap the Share icon and click "Copy link" to place the URL on your clipboard.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-mono font-bold flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <p className="font-semibold text-white">Paste and Download</p>
                <p className="text-slate-400 text-xs mt-0.5">Paste into OmniFetch, pick 1080p, 720p, or MP3 audio, and start your instant download.</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Platform Specific FAQ */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white mb-3">
            {config.name} Downloader FAQ
          </h3>
          {config.faq.map((f, i) => (
            <div key={i} className="rounded-xl bg-slate-900/60 border border-slate-800">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-4 text-left font-semibold text-sm text-white flex items-center justify-between"
              >
                <span>{f.question}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 text-xs text-slate-400 border-t border-slate-800/40 pt-2.5">
                  {f.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
