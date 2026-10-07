import React, { useState } from 'react';
import { useUIStore } from '../../stores/uiStore';
import { useCMSStore } from '../../stores/cmsStore';
import { useAuthStore } from '../../stores/authStore';
import { X, Award, Sparkles, Send } from 'lucide-react';

export const KudosModal: React.FC = () => {
  const { kudosModalOpen, setKudosModalOpen, selectedEmployee, showToast } = useUIStore();
  const { users, addAchievement } = useCMSStore();
  const { user: currentUser } = useAuthStore();

  const [recipientId, setRecipientId] = useState(selectedEmployee?.id || users[0]?.id || '');
  const [category, setCategory] = useState<'Recognition' | 'Award' | 'Spotlight'>('Recognition');
  const [citation, setCitation] = useState('');
  const [impact, setImpact] = useState('');

  if (!kudosModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!citation.trim()) {
      showToast('Please enter recognition details', 'warning');
      return;
    }

    const recipient = users.find((u) => u.id === recipientId) || users[0];

    addAchievement({
      title: `${category}: Exceptional Contribution by ${recipient.name}`,
      recipient: recipient.name,
      recipientType: 'Individual',
      department: (recipient.department.includes('BTS') ? 'GBS-BTS' : 'GBS-BO') as any,
      date: new Date().toISOString().split('T')[0],
      category,
      description: citation,
      impactMetric: impact || 'Recognized by peer leadership',
      presentedBy: `${currentUser?.name || 'Anonymous Peer'} (${currentUser?.department || 'GBS'})`,
      avatar: recipient.avatar,
    });

    showToast(`Kudos sent to ${recipient.name}! Published to Wall of Recognition.`, 'success');
    setCitation('');
    setImpact('');
    setKudosModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
      >
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-amber-50/50">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-gray-900 text-sm">Send Colleague Recognition & Kudos</h3>
          </div>
          <button
            onClick={() => setKudosModalOpen(false)}
            className="p-1.5 rounded-md hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Select Colleague
            </label>
            <select
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D71920]"
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} — {u.title} ({u.department})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Recognition Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Recognition', 'Spotlight', 'Award'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-colors ${
                    category === cat
                      ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs'
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Citation & Impact Story
            </label>
            <textarea
              rows={3}
              value={citation}
              onChange={(e) => setCitation(e.target.value)}
              placeholder="What remarkable contribution or leadership did they demonstrate?"
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D71920]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Measurable Outcome or Key Metric (Optional)
            </label>
            <input
              type="text"
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
              placeholder="e.g. Slashed API latency by 40% or Saved 200 hours in month-end close"
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D71920]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setKudosModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#D71920] hover:bg-[#b5141a] rounded-lg shadow-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Kudos</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
