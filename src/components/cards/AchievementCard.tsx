import React from 'react';
import { Achievement } from '../../types';
import { Award, Trophy, Star, Sparkles, Building2 } from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  let Icon = Award;
  let borderHighlight = 'border-gray-200/80';
  let iconBg = 'bg-amber-50 text-amber-600';

  if (achievement.category === 'Award') {
    Icon = Trophy;
    borderHighlight = 'border-amber-200 bg-amber-50/10';
    iconBg = 'bg-amber-100 text-amber-700';
  } else if (achievement.category === 'Milestone') {
    Icon = Star;
    borderHighlight = 'border-blue-200 bg-blue-50/10';
    iconBg = 'bg-blue-100 text-blue-700';
  }

  return (
    <div
      className={`bg-white border rounded-xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${borderHighlight}`}
    >
      <div>
        {/* Unboxed Metadata (Zero-Pill Discipline) */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-gray-800">{achievement.category}</span>
            <span aria-hidden="true">·</span>
            <span>{achievement.department}</span>
          </div>
          <span className="font-mono text-[11px] text-gray-400">{achievement.date}</span>
        </div>

        {/* Title & Icon */}
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg shrink-0 ${iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-gray-900 leading-snug">
              {achievement.title}
            </h4>
            <div className="text-xs font-semibold text-[#D71920] mt-0.5">
              Honoree: {achievement.recipient}
            </div>
          </div>
        </div>

        {/* Description story */}
        <p className="text-xs text-gray-600 mt-3 leading-relaxed">
          {achievement.description}
        </p>

        {/* Impact Metric callout */}
        <div className="mt-3.5 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
            Verified Business Impact
          </span>
          <span className="text-xs font-bold text-gray-900 block mt-0.5 font-mono">
            {achievement.impactMetric}
          </span>
        </div>
      </div>

      {/* Presented By */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span className="text-[11px]">Conferred by:</span>
        <span className="font-medium text-gray-800 text-[11px] truncate max-w-[200px]">
          {achievement.presentedBy}
        </span>
      </div>
    </div>
  );
};
