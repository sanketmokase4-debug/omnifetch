import React from 'react';
import {
  X,
  History,
  Trash2,
  ExternalLink,
  Download,
  Clock,
  Sparkles,
  LogIn
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserHistoryRecord } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onReAnalyze: (url: string) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  onReAnalyze
}) => {
  const { user, history, removeFromHistory, signIn } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md h-full bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Download History</h2>
              <p className="text-xs text-slate-400">{history.length} saved public media items</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sync Prompt if guest */}
        {!user && (
          <div className="m-4 p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 flex items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-semibold text-indigo-200">Sync with Google Account</p>
              <p className="text-indigo-300/70 text-[11px]">Save history across all your devices.</p>
            </div>
            <button
              onClick={signIn}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1 shrink-0 cursor-pointer shadow"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          </div>
        )}

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <History className="w-10 h-10 mb-3 text-slate-600" />
              <p className="font-medium text-slate-300 text-sm">No download history yet</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                When you analyze and download public videos or audio, they will show up here.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors space-y-2.5"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover bg-slate-900 shrink-0 border border-slate-800"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-400">
                        {item.platform}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        {item.selectedQuality} • {item.selectedFormat}
                      </span>
                    </div>
                    <h3 className="text-xs font-semibold text-white truncate leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">{item.author}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        onReAnalyze(item.url);
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white font-medium text-xs transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>Fetch</span>
                    </button>

                    <button
                      onClick={() => removeFromHistory(item.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            Close History
          </button>
        </div>

      </div>
    </div>
  );
};
