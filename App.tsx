import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { HeroDownloader } from './HeroDownloader';
import { AnalysisResultCard } from './AnalysisResultCard';
import { PlatformGuide } from './PlatformGuide';
import { HowItWorks } from './HowItWorks';
import { FeaturesGrid } from './FeaturesGrid';
import { FAQSection } from './FAQSection';
import { PlatformSeoPage } from './PlatformSeoPage';
import { AdminDashboardModal } from './AdminDashboardModal';
import { HistoryDrawer } from './HistoryDrawer';
import { LegalModal } from './LegalModal';
import { Footer } from './Footer';
import { ThemeProvider } from './ThemeContext';
import { AuthProvider } from "./AuthContext";
import { analyzeMediaUrl } from './services/apiService';
import { MediaAnalysisResult, SupportedPlatformId } from './types';
import { PLATFORMS_DATA } from './utils/platformDetector';

function MainContent() {
  const [activePlatformPage, setActivePlatformPage] = useState<SupportedPlatformId | null>(null);
  const [result, setResult] = useState<MediaAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modals & Drawers
  const [historyOpen, setHistoryOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<{
    isOpen: boolean;
    tab: 'privacy' | 'terms' | 'dmca' | 'contact';
  }>({
    isOpen: false,
    tab: 'privacy'
  });

  // Handle URL hash changes for SEO page routing simulation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const match = Object.values(PLATFORMS_DATA).find(p => p.seoSlug === hash || p.id === hash);
      if (match) {
        setActivePlatformPage(match.id);
      } else if (!hash) {
        setActivePlatformPage(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectPlatformPage = (platformId: SupportedPlatformId | null) => {
    setActivePlatformPage(platformId);
    if (platformId) {
      window.location.hash = `#/${PLATFORMS_DATA[platformId]?.seoSlug || platformId}`;
    } else {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalyze = async (url: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await analyzeMediaUrl(url);
      setResult(res);
      setIsLoading(false);

      // Smooth scroll to result
      setTimeout(() => {
        const el = document.getElementById('analysis-result');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } catch (err: any) {
      setIsLoading(false);
      setResult(null);
      setError(
        err.message ||
        'Unable to parse this media link. Please verify it is a valid public link and not protected by private account settings.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Navigation Bar */}
      <Navbar
        onOpenHistory={() => setHistoryOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenLegal={(tab) => setLegalModal({ isOpen: true, tab })}
        onSelectPlatformPage={handleSelectPlatformPage}
        activePlatformPage={activePlatformPage}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activePlatformPage ? (
          <PlatformSeoPage
            platformId={activePlatformPage}
            onBackToHome={() => handleSelectPlatformPage(null)}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            error={error}
            result={result}
          />
        ) : (
          <>
            {/* Hero Downloader Interface */}
            <HeroDownloader
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
              error={error}
              onClearError={() => setError(null)}
              result={result}
            />

            {/* Analysis Result Card */}
            {result && (
              <div id="analysis-result">
                <AnalysisResultCard
                  result={result}
                  onReset={() => setResult(null)}
                />
              </div>
            )}

            {/* Supported Platforms Overview */}
            <PlatformGuide
              onSelectPlatform={(id) => handleSelectPlatformPage(id)}
            />

            {/* 3-Step Guide */}
            <HowItWorks />

            {/* Features Highlight */}
            <FeaturesGrid />

            {/* Frequently Asked Questions */}
            <FAQSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenLegal={(tab) => setLegalModal({ isOpen: true, tab })}
        onSelectPlatformPage={(id) => handleSelectPlatformPage(id)}
      />

      {/* Modals and Drawers */}
      <AdminDashboardModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />

      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onReAnalyze={(url) => {
          handleAnalyze(url);
          if (activePlatformPage) setActivePlatformPage(null);
        }}
      />

      <LegalModal
        isOpen={legalModal.isOpen}
        onClose={() => setLegalModal({ isOpen: false, tab: 'privacy' })}
        defaultTab={legalModal.tab}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <React.Fragment>
        <MainContent />
      </React.Fragment>
    </ThemeProvider>
  );
}
