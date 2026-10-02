import React, { useState } from 'react';
import {
  Download,
  Music,
  Image as ImageIcon,
  CheckCircle,
  Clock,
  User,
  ExternalLink,
  Sparkles,
  Share2,
  BookmarkPlus,
  Loader2,
  AlertTriangle,
  Play,
  FileCheck,
  Zap,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MediaAnalysisResult, QualityOption } from './types';
import { initiateDownloadJob, checkJobStatus, trackDownloadEvent } from './services/apiService';
import { useAuth } from './AuthContext';

interface AnalysisResultCardProps {
  result: MediaAnalysisResult;
  onReset: () => void;
}

export const AnalysisResultCard: React.FC<AnalysisResultCardProps> = ({
  result,
  onReset
}) => {
  const { user, addToHistory } = useAuth();
  const [selectedQuality, setSelectedQuality] = useState<string>(
    result.qualities.find(q => q.quality === '1080p')?.id || result.qualities[0]?.id || ''
  );
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadStatusText, setDownloadStatusText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const activeOption = result.qualities.find(q => q.id === selectedQuality) || result.qualities[0];

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#6366f1', '#a855f7', '#06b6d4', '#10b981']
    });
  };

  const handleDownload = async (customQualityId?: string) => {
    const targetOption = customQualityId
      ? result.qualities.find(q => q.id === customQualityId) || activeOption
      : activeOption;

    if (!targetOption || !targetOption.isAvailable) {
      return;
    }

    try {
      setIsDownloading(true);
      setDownloadProgress(15);
      setDownloadStatusText('Preparing secure media stream...');

      // Track analytics
      trackDownloadEvent(result.platform, targetOption.format);

      // Save to user history
      addToHistory({
        platform: result.platform,
        url: result.originalUrl,
        title: result.title,
        author: result.author,
        mediaType: result.mediaType,
        thumbnailUrl: result.thumbnailUrl,
        selectedFormat: targetOption.format,
        selectedQuality: targetOption.quality,
        status: 'completed',
        createdAt: new Date().toISOString()
      });

      // Initiate async backend job
      const jobResponse = await initiateDownloadJob({
        url: result.originalUrl,
        quality: targetOption.quality,
        format: targetOption.format,
        title: result.title,
        platform: result.platform
      });

      // Poll job status
      const interval = setInterval(async () => {
        try {
          const status = await checkJobStatus(jobResponse.jobId);
          setDownloadProgress(status.progress);

          if (status.status === 'processing') {
            setDownloadStatusText(`Optimizing ${targetOption.label}... (${status.progress}%)`);
          } else if (status.status === 'completed') {
            clearInterval(interval);
            setDownloadProgress(100);
            setDownloadStatusText('Download ready! Starting file transfer...');
            triggerConfetti();

            // Trigger actual browser file download via proxy
            const a = document.createElement('a');
            a.href = status.downloadUrl || targetOption.downloadUrl;
            a.download = `${result.title || 'media'}.${targetOption.format}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            setTimeout(() => {
              setIsDownloading(false);
              setDownloadProgress(0);
              setDownloadStatusText('');
            }, 2500);
          }
        } catch (err) {
          clearInterval(interval);
          // Fallback direct download
          window.location.href = targetOption.downloadUrl;
          setIsDownloading(false);
        }
      }, 500);
    } catch (err) {
      console.error(err);
      // Direct stream fallback
      window.location.href = targetOption.downloadUrl;
      setIsDownloading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(result.originalUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleManualSave = () => {
    addToHistory({
      platform: result.platform,
      url: result.originalUrl,
      title: result.title,
      author: result.author,
      mediaType: result.mediaType,
      thumbnailUrl: result.thumbnailUrl,
      selectedFormat: activeOption?.format || 'mp4',
      selectedQuality: activeOption?.quality || '1080p',
      status: 'saved',
      createdAt: new Date().toISOString()
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Helper shortcuts
  const videoOption = result.qualities.find(q => q.format === 'mp4' && q.quality === '1080p') || result.qualities.find(q => q.format === 'mp4');
  const audioOption = result.qualities.find(q => q.quality === 'audio' || q.format === 'mp3');
  const thumbOption = result.qualities.find(q => q.quality === 'thumbnail');
  const imageOption = result.qualities.find(q => q.format === 'jpg' || q.quality === 'image');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-16 animate-in fade-in slide-in-from-bottom-6 duration-400">
      <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-indigo-950/50">
        
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              {result.platformName}
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-800 text-slate-300 capitalize">
              {result.mediaType}
            </span>
            <span className="flex items-center gap-1 text-xs text-emerald-400">
              <CheckCircle className="w-3.5 h-3.5" />
              Verified Public Media
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              title="Copy original link"
              className="p-2 rounded-xl bg-slate-800/70 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1.5"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={handleManualSave}
              title="Save to My History"
              className={`p-2 rounded-xl transition-colors text-xs flex items-center gap-1.5 ${
                isSaved
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-800/70 hover:bg-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <BookmarkPlus className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">{isSaved ? 'Saved!' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Media Overview & Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6">
          
          {/* Thumbnail / Video Frame */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-full aspect-video sm:aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group shadow-lg">
              <img
                src={result.thumbnailUrl}
                alt={result.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Play Badge */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl">
                  <Play className="w-5 h-5 fill-white ml-0.5 text-white" />
                </div>
              </div>

              {/* Bottom Meta Bar on Thumbnail */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs text-white/90">
                {result.duration && (
                  <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-indigo-400" />
                    {result.duration}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm uppercase font-mono text-[10px]">
                  {result.aspectRatio || 'HD'}
                </span>
              </div>
            </div>

            {/* Quick External Link */}
            <a
              href={result.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-xs text-slate-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
            >
              <span>View original post on {result.platformName}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Details & Quality Selection */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug line-clamp-2 mb-2">
                {result.title}
              </h2>

              {/* Author / Creator Info */}
              <div className="flex items-center gap-2 text-sm text-slate-400 mb-5">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium text-slate-300">{result.author || 'Public Creator'}</span>
              </div>

              {/* Carousel Multi-item indicator if applicable */}
              {result.carouselItems && result.carouselItems.length > 0 && (
                <div className="mb-4 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-xs text-slate-300">
                  <span className="font-semibold text-indigo-400">Multi-item Carousel:</span> Contains {result.carouselItems.length} media slides available for download.
                </div>
              )}

              {/* Quality Options Label */}
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                Select Quality & Format
              </div>

              {/* Quality Options Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
                {result.qualities.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedQuality(opt.id)}
                    className={`p-3 rounded-xl border text-left transition-all relative ${
                      selectedQuality === opt.id
                        ? 'bg-indigo-600/20 border-indigo-500 ring-1 ring-indigo-500/50 shadow-md shadow-indigo-600/10'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs sm:text-sm text-white">{opt.label.split(' ')[0]}</span>
                      <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {opt.format}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span>{opt.fileSize || 'Standard'}</span>
                      {selectedQuality === opt.id && (
                        <Zap className="w-3 h-3 text-indigo-400 animate-pulse" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Asynchronous Download Progress Bar */}
            {isDownloading && (
              <div className="mb-4 p-4 rounded-xl bg-indigo-950/60 border border-indigo-500/30 animate-in fade-in">
                <div className="flex items-center justify-between text-xs font-medium text-indigo-200 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                    {downloadStatusText}
                  </span>
                  <span className="font-mono font-bold">{downloadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-300 rounded-full"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Primary Action Buttons (Separate Download Buttons) */}
            <div className="space-y-2">
              
              {/* Main Selected Format Download Button */}
              <button
                onClick={() => handleDownload()}
                disabled={isDownloading}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isDownloading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
                <span>
                  Download {activeOption.quality === 'audio' ? 'Audio (MP3)' : activeOption.quality === 'thumbnail' ? 'Thumbnail (JPG)' : `Video (${activeOption.label})`}
                </span>
              </button>

              {/* Quick Secondary Distinct Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                
                {/* Download Video Button */}
                {videoOption && (
                  <button
                    onClick={() => handleDownload(videoOption.id)}
                    disabled={isDownloading}
                    className="py-2.5 px-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Download Video</span>
                  </button>
                )}

                {/* Download Audio Button */}
                {audioOption && (
                  <button
                    onClick={() => handleDownload(audioOption.id)}
                    disabled={isDownloading}
                    className="py-2.5 px-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Music className="w-3.5 h-3.5 text-purple-400" />
                    <span>Download Audio</span>
                  </button>
                )}

                {/* Download Thumbnail Button */}
                {thumbOption && (
                  <button
                    onClick={() => handleDownload(thumbOption.id)}
                    disabled={isDownloading}
                    className="py-2.5 px-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Download Thumbnail</span>
                  </button>
                )}

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
