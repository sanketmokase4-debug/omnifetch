import React, { useState } from 'react';
import {
  Download,
  Sun,
  Moon,
  Sparkles,
  ShieldCheck,
  History as HistoryIcon,
  LogIn,
  LogOut,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  FileText
} from 'lucide-react';
import { useTheme } from "./ThemeContext";
import { useAuth } from "./AuthContext";
import { PLATFORMS_DATA } from "./utils/platformDetector";
import { SupportedPlatformId } from '../types';

interface NavbarProps {
  onOpenHistory: () => void;
  onOpenAdmin: () => void;
  onOpenLegal: (tab: 'privacy' | 'terms' | 'dmca' | 'contact') => void;
  onSelectPlatformPage: (platformId: SupportedPlatformId | null) => void;
  activePlatformPage: SupportedPlatformId | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHistory,
  onOpenAdmin,
  onOpenLegal,
  onSelectPlatformPage,
  activePlatformPage
}) => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAdmin, history, signIn, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 dark:bg-slate-950/85 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <button
            onClick={() => {
              onSelectPlatformPage(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[2px] shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Download className="w-5 h-5 text-indigo-400 group-hover:scale-110 group-hover:text-cyan-300 transition-transform duration-200" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                Omni<span className="text-indigo-400">Fetch</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
                All-in-One
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => onSelectPlatformPage(null)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activePlatformPage === null
                  ? 'text-indigo-400 bg-indigo-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Downloader
            </button>

            {/* Platforms Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPlatformDropdownOpen(!platformDropdownOpen)}
                onBlur={() => setTimeout(() => setPlatformDropdownOpen(false), 200)}
                className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-1.5 transition-colors ${
                  activePlatformPage !== null
                    ? 'text-indigo-400 bg-indigo-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span>Supported Platforms</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {platformDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 p-2 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-xl shadow-2xl shadow-black/50 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                    Select Platform
                  </div>
                  <div className="grid grid-cols-1 gap-0.5 max-h-80 overflow-y-auto pr-1">
                    {Object.values(PLATFORMS_DATA).map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectPlatformPage(p.id);
                          setPlatformDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition-colors ${
                          activePlatformPage === p.id
                            ? 'bg-indigo-600/20 text-indigo-400 font-semibold'
                            : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                        }`}
                      >
                        <span>{p.name}</span>
                        <span className="text-[11px] text-slate-500">{p.supportedFormats[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a
              href="#how-it-works"
              onClick={(e) => {
                if (activePlatformPage) {
                  e.preventDefault();
                  onSelectPlatformPage(null);
                  setTimeout(() => {
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              How It Works
            </a>

            <a
              href="#faq"
              onClick={(e) => {
                if (activePlatformPage) {
                  e.preventDefault();
                  onSelectPlatformPage(null);
                  setTimeout(() => {
                    document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              FAQ
            </a>

            <button
              onClick={() => onOpenLegal('dmca')}
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>DMCA</span>
            </button>
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-700/50"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-400" />
              )}
            </button>

            {/* History Drawer Button */}
            <button
              onClick={onOpenHistory}
              title="My Download History"
              className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 border border-slate-800 hover:border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <HistoryIcon className="w-5 h-5 text-indigo-400" />
              {history.length > 0 && (
                <span className="bg-indigo-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {history.length}
                </span>
              )}
            </button>

            {/* Admin Dashboard Button (Visible for all or highlighted if babalumokase@gmail.com) */}
            <button
              onClick={onOpenAdmin}
              className={`p-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5 border ${
                isAdmin
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                  : 'text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
              title="Admin Dashboard & Metrics"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden lg:inline">{isAdmin ? 'Admin' : 'Stats'}</span>
            </button>

            {/* User Auth Profile / Google Sign-in */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-8 h-8 rounded-full border border-indigo-500/50 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <button
                  onClick={signOut}
                  title="Sign Out"
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={signIn}
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onSelectPlatformPage(null);
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2.5 text-left text-sm font-medium rounded-lg bg-indigo-600/10 text-indigo-400"
            >
              All-in-One Downloader
            </button>
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2.5 text-left text-sm font-medium rounded-lg bg-slate-800 text-slate-200"
            >
              Admin & Stats
            </button>
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 pt-2">
            Popular Platforms
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(PLATFORMS_DATA).slice(0, 6).map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  onSelectPlatformPage(p.id);
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2 text-left text-xs font-medium text-slate-300 hover:bg-slate-800 rounded-lg"
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenLegal('dmca');
                setMobileMenuOpen(false);
              }}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              DMCA / Copyright
            </button>
            {!user ? (
              <button
                onClick={() => {
                  signIn();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Sign in with Google
              </button>
            ) : (
              <button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-rose-400"
              >
                Sign Out ({user.email?.split('@')[0]})
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
