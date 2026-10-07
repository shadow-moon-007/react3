import React, { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { DEMO_USERS } from '../../constants/theme';
import { useNavigate } from 'react-router-dom';
import { Shield, Key, ArrowRight, Lock, Building2, AlertCircle, Sparkles } from 'lucide-react';
import { authApi } from '../../api/authApi';

export const LoginPage: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [ntidInput, setNtidInput] = useState('keshavb');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ntidInput.trim()) return;

    setSubmitting(true);
    setErrorMsg(null);

    try {
      await authApi.login({ ntid: ntidInput });
      navigate('/');
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid NT-ID. Please use a demo credential below.');
    } finally {
      setSubmitting(false);
    }
  };

  const selectDemoUser = async (ntid: string) => {
    setNtidInput(ntid);
    setSubmitting(true);
    setErrorMsg(null);
    try {
      await authApi.login({ ntid });
      navigate('/');
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-[#111111] p-6 text-white text-center relative">
          <div className="w-12 h-12 bg-[#D71920] rounded-xl flex items-center justify-center font-black font-mono text-lg mx-auto mb-3 shadow-md">
            GBS
          </div>
          <h1 className="text-xl font-bold tracking-tight">GBS Portal Sign In</h1>
          <p className="text-xs text-gray-300 mt-1">
            Global Business Services · Enterprise Single Sign-On
          </p>
          <div className="absolute top-3 right-3 text-[10px] font-mono text-gray-400 bg-white/10 px-2 py-0.5 rounded">
            NT-ID SSO
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Corporate NT-ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={ntidInput}
                  onChange={(e) => setNtidInput(e.target.value)}
                  placeholder="e.g. keshavb"
                  required
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D71920] transition-all"
                  autoFocus
                />
                <span className="absolute right-3 top-2.5 text-xs text-gray-400 font-mono">
                  @corp.gbs.com
                </span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#D71920] hover:bg-[#b5141a] text-white text-xs font-bold rounded-lg shadow-sm transition-colors disabled:opacity-50"
            >
              {submitting ? (
                <span>Authenticating NT-ID...</span>
              ) : (
                <>
                  <span>Sign In with Enterprise NT-ID</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Personas */}
          <div className="pt-4 border-t border-gray-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2.5 text-center">
              Quick One-Click Demo Personas
            </span>
            <div className="space-y-2">
              {DEMO_USERS.map((demo) => (
                <button
                  key={demo.ntid}
                  type="button"
                  onClick={() => selectDemoUser(demo.ntid)}
                  className="w-full flex items-center justify-between p-2.5 bg-gray-50 hover:bg-gray-100/90 border border-gray-200/80 rounded-xl text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={demo.avatar}
                      alt={demo.name}
                      className="w-8 h-8 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-gray-900 group-hover:text-[#D71920] transition-colors">
                          {demo.name}
                        </span>
                        <span className="text-[10px] font-mono font-bold px-1 py-0.2 rounded bg-gray-200 text-gray-700">
                          {demo.role}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-400 block truncate max-w-[200px]">
                        {demo.department}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#D71920] font-semibold">
                    {demo.ntid} →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center text-[11px] text-gray-400 font-mono">
          <span>Protected by Enterprise Zero-Trust · Azure AD Ready</span>
        </div>
      </div>
    </div>
  );
};
