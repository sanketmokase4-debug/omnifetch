import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is it legal to download social media videos with OmniFetch?',
      a: 'Yes, provided you are downloading content that you own, content in the public domain, or content with permissive copyright licenses (like Creative Commons). You must never download copyright-protected media without explicit permission from the creator or copyright holder. OmniFetch complies strictly with platform security rules and never bypasses DRM or private accounts.'
    },
    {
      q: 'How do I save downloaded videos on iPhone or iPad (iOS)?',
      a: 'On iOS 13+, open Safari, paste the link, tap "Download", and tap the download icon in Safari’s top address bar. Tap the downloaded file to view it, then tap the Share icon and select "Save Video" to save it directly to your Photos camera roll.'
    },
    {
      q: 'Can I download videos from private accounts or closed groups?',
      a: 'No. OmniFetch strictly respects privacy protections, authentication controls, and access restrictions. If an account or post is set to Private or Friends-Only, our public analyzer will not access it.'
    },
    {
      q: 'What resolutions and audio formats are supported?',
      a: 'We support Full HD (1080p), HD (720p), SD (480p, 360p), 320kbps MP3 audio extraction, full-resolution JPG image downloads, and high-definition video thumbnails.'
    },
    {
      q: 'Do I need to install any software, app, or browser extension?',
      a: 'No. OmniFetch is 100% web-based and functions across mobile browsers (iOS Safari, Android Chrome, Samsung Internet) and desktop browsers (Chrome, Firefox, Edge, Safari) without any installations.'
    },
    {
      q: 'Does OmniFetch store my downloaded files or personal data?',
      a: 'No. We do not store downloaded video or audio files permanently on our servers. Intermediate streaming buffers are purged automatically after delivery. If you create an account, only your personal bookmark history is saved securely in your private cloud profile.'
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-20 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Got Questions? We’ve Got Answers.
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/70 border border-slate-800/80 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left font-semibold text-sm sm:text-base text-white flex items-center justify-between gap-4 cursor-pointer hover:text-indigo-300"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-indigo-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/40 pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
