import React from 'react';
import { TrendingUp, TrendingDown, Minus, LucideIcon } from 'lucide-react';

interface KPIWidgetProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  subtext?: string;
  icon?: LucideIcon;
  color?: string;
}

export const KPIWidget: React.FC<KPIWidgetProps> = ({
  label,
  value,
  change,
  trend = 'neutral',
  subtext,
  icon: Icon,
}) => {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-xs hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
            <Icon className="w-4 h-4 text-[#D71920]" />
          </div>
        )}
      </div>

      <div className="mt-2.5 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-mono tabular-nums">
          {value}
        </span>
        {change && (
          <div
            className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
              trend === 'up'
                ? 'text-[#16A34A]'
                : trend === 'down'
                ? 'text-[#D71920]'
                : 'text-gray-500'
            }`}
          >
            {trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
            {trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
            {trend === 'neutral' && <Minus className="w-3.5 h-3.5" />}
            <span className="font-mono">{change}</span>
          </div>
        )}
      </div>

      {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
    </div>
  );
};
