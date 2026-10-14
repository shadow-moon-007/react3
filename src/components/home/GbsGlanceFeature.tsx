import React, { useState } from 'react';
import { ArrowRight, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// High-fidelity corporate photography asset
import gbsCampusImg from '../../assets/images/gbs_campus_glance_1791870931938.jpg';

export const GbsGlanceFeature: React.FC = () => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  return (
    <section aria-labelledby="gbs-glance-heading">
      <div className="bg-white border border-gray-200/80 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row items-stretch min-h-[190px] lg:h-[210px]">
          {/* Left: Landscape Corporate Architectural Image */}
          <div className="w-full sm:w-5/12 lg:w-[380px] shrink-0 relative bg-gray-100 overflow-hidden sm:min-h-full h-48">
            {!imageError ? (
              <img
                src={gbsCampusImg}
                alt="Global Business Services modern enterprise headquarters campus with contemporary glass architecture"
                className="w-full h-full object-cover object-center"
                onError={() => setImageError(true)}
                loading="eager"
                referrerPolicy="no-referrer"
              />
            ) : (
              // Styled CSS fallback container
              <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <Building2 className="w-8 h-8 text-[#D71920] mb-2" />
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                  GBS Global Campus
                </span>
              </div>
            )}
            {/* Subtle soft boundary vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent sm:hidden pointer-events-none" />
          </div>

          {/* Right: Clean Restrained Editorial Content */}
          <div className="flex-1 p-5 sm:p-6 lg:p-7 flex flex-col justify-center">
            {/* Kicker / Title */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D71920] shrink-0" aria-hidden="true" />
              <h2
                id="gbs-glance-heading"
                className="text-xs font-bold uppercase tracking-wider text-gray-500 font-mono"
              >
                Global Business Services at a glance
              </h2>
            </div>

            {/* Supporting Headline */}
            <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight leading-snug">
              One enterprise. Connected teams. Measurable impact.
            </h3>

            {/* Subtle Keysight-style Red Accent Rule */}
            <div className="w-10 h-0.5 bg-[#D71920] my-2.5 rounded-full" aria-hidden="true" />

            {/* Supporting Description */}
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl font-normal">
              Connecting people, processes and technology across GBS to enable smarter operations,
              stronger collaboration and measurable business outcomes.
            </p>

            {/* Subtle Explore GBS Link */}
            <div className="mt-3.5">
              <button
                onClick={() => navigate('/organization')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D71920] hover:text-[#b5141a] group transition-colors"
              >
                <span>Explore GBS</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
