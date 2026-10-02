import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  FileText,
  Mail,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Send,
  Loader2
} from 'lucide-react';
import { submitDmcaReport } from '../firebase';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'privacy' | 'terms' | 'dmca' | 'contact';
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'privacy'
}) => {
  const [tab, setTab] = useState<'privacy' | 'terms' | 'dmca' | 'contact'>(defaultTab);

  // DMCA Form states
  const [claimantName, setClaimantName] = useState('');
  const [claimantEmail, setClaimantEmail] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [statement, setStatement] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const handleDmcaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimantName || !claimantEmail || !targetUrl || !statement) {
      setFormError('Please fill in all required fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError('');
      await submitDmcaReport({
        claimantName,
        claimantEmail,
        targetUrl,
        statement
      });
      setIsSubmitted(true);
      setIsSubmitting(false);
    } catch (err) {
      setFormError('Failed to submit report. Please try again or email dmca@omnifetch.example.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white">Legal, Compliance & Support</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-950/30 text-xs font-semibold gap-1 sm:gap-4 overflow-x-auto">
          <button
            onClick={() => { setTab('privacy'); setIsSubmitted(false); }}
            className={`py-3 px-2 sm:px-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
              tab === 'privacy' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => { setTab('terms'); setIsSubmitted(false); }}
            className={`py-3 px-2 sm:px-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
              tab === 'terms' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => { setTab('dmca'); setIsSubmitted(false); }}
            className={`py-3 px-2 sm:px-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
              tab === 'dmca' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            DMCA / Copyright
          </button>
          <button
            onClick={() => { setTab('contact'); setIsSubmitted(false); }}
            className={`py-3 px-2 sm:px-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
              tab === 'contact' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Contact & Support
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed flex-1">
          
          {tab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Privacy Policy</h3>
              <p>
                At OmniFetch, we take your privacy with paramount importance. We are committed to transparency in our data processing practices.
              </p>
              <h4 className="font-semibold text-white mt-2">1. No Media Storage</h4>
              <p>
                We do not store or host any downloaded social media files, videos, images, or audio on our permanent servers. Intermediate data transmitted during streaming is automatically deleted from memory buffers within minutes.
              </p>
              <h4 className="font-semibold text-white mt-2">2. Zero Account Logins or Credentials</h4>
              <p>
                We never ask for, collect, or store your social media account passwords, login credentials, session cookies, or access tokens.
              </p>
              <h4 className="font-semibold text-white mt-2">3. User History</h4>
              <p>
                If you sign in with Google Firebase Auth, your personal media download history and bookmark records are saved strictly within your private, authenticated database profile.
              </p>
            </div>
          )}

          {tab === 'terms' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Terms of Service</h3>
              <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs">
                ⚠️ Notice: Only download content you have permission to download or content that is otherwise legally available for downloading. Respect copyright and the terms of the platform hosting the content.
              </div>
              <p>
                By accessing or using OmniFetch, you agree to abide by these Terms of Service.
              </p>
              <h4 className="font-semibold text-white mt-2">1. Lawful & Permitted Usage</h4>
              <p>
                OmniFetch is provided strictly for personal, non-commercial archiving of content that you own, content published under open licenses (such as Creative Commons), or public domain media.
              </p>
              <h4 className="font-semibold text-white mt-2">2. No Bypass of Security or DRM</h4>
              <p>
                You may not use OmniFetch to attempt bypassing digital rights management (DRM), private account locks, subscription paywalls, or authentication systems.
              </p>
            </div>
          )}

          {tab === 'dmca' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">DMCA & Copyright Takedown Policy</h3>
              <p>
                OmniFetch respects intellectual property rights and complies with the Digital Millennium Copyright Act (DMCA). If you believe your copyrighted work is being referenced improperly, please submit a formal takedown request below.
              </p>

              {isSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="font-bold text-sm text-white">DMCA Notice Received</p>
                  <p className="text-xs text-emerald-300">
                    Your claim has been logged and our legal compliance team will review the target URL within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDmcaSubmit} className="space-y-3 pt-2">
                  {formError && (
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Claimant / Rights Holder Name *</label>
                      <input
                        type="text"
                        value={claimantName}
                        onChange={(e) => setClaimantName(e.target.value)}
                        placeholder="e.g. John Doe / Studio Legal Dept"
                        className="w-full bg-slate-950 px-3 py-2 text-xs text-white rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Contact Email Address *</label>
                      <input
                        type="email"
                        value={claimantEmail}
                        onChange={(e) => setClaimantEmail(e.target.value)}
                        placeholder="legal@company.example"
                        className="w-full bg-slate-950 px-3 py-2 text-xs text-white rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Target Public URL to Restrict *</label>
                    <input
                      type="url"
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-slate-950 px-3 py-2 text-xs text-white rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Statement of Infringement & Ownership *</label>
                    <textarea
                      rows={3}
                      value={statement}
                      onChange={(e) => setStatement(e.target.value)}
                      placeholder="Describe your ownership and request..."
                      className="w-full bg-slate-950 px-3 py-2 text-xs text-white rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-2.5 px-5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    <span>Submit DMCA Takedown Notice</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {tab === 'contact' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Contact & Support</h3>
              <p>
                Have questions, encountered a broken public stream, or want to suggest a new platform? Reach out to our technical team.
              </p>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span>support@omnifetch.example</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>legal@omnifetch.example</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
