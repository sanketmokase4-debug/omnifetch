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
  return (
    <div style={{
      minHeight: '100vh',
      background: '#111',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '32px'
    }}>
      MainContent Test ✅
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
export default App;
