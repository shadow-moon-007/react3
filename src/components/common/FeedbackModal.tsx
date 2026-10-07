import React, { useState } from 'react';
import { useUIStore } from '../../stores/uiStore';
import { X, MessageSquareHeart, Send } from 'lucide-react';

export const FeedbackModal: React.FC = () => {
  const { feedbackModalOpen, setFeedbackModalOpen, showToast } = useUIStore();
  const [topic, setTopic] = useState('Portal Usability');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState('5');

  if (!feedbackModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    showToast('Thank you! Your feedback has been sent to the GBS Digital Experience Team.', 'success');
    setMessage('');
    setFeedbackModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
      >
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
          <div className="flex items-center gap-2">
            <MessageSquareHeart className="w-5 h-5 text-[#D71920]" />
            <h3 className="font-bold text-gray-900 text-sm">GBS Portal Feedback & Support</h3>
          </div>
          <button
            onClick={() => setFeedbackModalOpen(false)}
            className="p-1.5 rounded-md hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Topic
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D71920]"
            >
              <option value="Portal Usability">Portal Usability & UI</option>
              <option value="Resource or SOP Request">Missing Resource or SOP Request</option>
              <option value="Data Correction">Directory or Org Chart Data Correction</option>
              <option value="Feature Suggestion">New Feature Suggestion</option>
              <option value="Incident">Bug or Broken Link</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Experience Rating (1-5)
            </label>
            <div className="flex gap-2">
              {['1', '2', '3', '4', '5'].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded border transition-colors ${
                    rating === star
                      ? 'bg-red-50 border-[#D71920] text-[#D71920] font-bold'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {star} ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Comments or Suggestion
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you'd like improved or report an issue..."
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D71920]"
              required
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setFeedbackModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#D71920] hover:bg-[#b5141a] rounded-lg shadow-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Feedback</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
