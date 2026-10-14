import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Building2 } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

export const FeaturedGBSSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section aria-label="Global Business Services Overview">
      <div className="bg-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-xs flex flex-col md:flex-row items-stretch md:h-[210px] transition-all hover:border-gray-300">
        {/* Left Side: Landscape Corporate Image */}
        <div className="w-full md:w-[38%] lg:w-[34%] h-48 md:h-full relative shrink-0 bg-slate-900 overflow-hidden">
          <SafeImage
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80"
            alt="Modern global enterprise campus and contemporary glass office architecture"
            className="w-full h-full object-cover object-center transform hover:scale-103 transition-transform duration-500"
            fallbackText="GBS Global Headquarters"
          />
          {/* Subtle gradient overlay to blend into card */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10 pointer-events-none md:block hidden" />
          {/* Subtle location watermark */}
          <div className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono text-gray-200 flex items-center gap-1">
            <Building2 className="w-3 h-3 text-[#D71920]" />
            <span>Global Operations Centers</span>
          </div>
        </div>

        {/* Right Side: Text & Visual Storytelling */}
        <div className="w-full md:w-[62%] lg:w-[66%] p-5 sm:p-6 lg:px-8 flex flex-col justify-center">
          {/* Section Kicker with Red Accent Line */}
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-6 h-0.5 bg-[#D71920] rounded-full shrink-0" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 font-mono">
              Global Business Services at a glance
            </span>
          </div>

          {/* Supporting Headline */}
          <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight leading-snug">
            One enterprise. Connected teams. Measurable impact.
          </h2>

          {/* Supporting Description */}
          <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed max-w-2xl">
            Connecting people, processes and technology across GBS to enable smarter operations,
            stronger collaboration and measurable business outcomes.
          </p>

          {/* Restrained Accent CTA */}
          <div className="mt-3.5 pt-2.5 border-t border-gray-100 flex items-center">
            <button
              onClick={() => navigate('/departments/GBS')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D71920] hover:text-[#b5141a] group transition-colors"
            >
              <span>Explore GBS</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
