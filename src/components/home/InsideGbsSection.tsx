import React, { useState } from 'react';
import { ArrowRight, Users, Cpu, Globe2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// High-fidelity corporate photography assets
import insidePeopleImg from '../../assets/images/inside_gbs_people_1791870933139.jpg';
import insideTechImg from '../../assets/images/inside_gbs_tech_1791870934082.jpg';
import insideImpactImg from '../../assets/images/inside_gbs_impact_1791870934092.jpg';

interface InsideCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  destination: string;
  actionText: string;
  fallbackIcon: React.ElementType;
}

const InsideCard: React.FC<InsideCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  destination,
  actionText,
  fallbackIcon: FallbackIcon,
}) => {
  const navigate = useNavigate();
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      onClick={() => navigate(destination)}
      className="bg-white border border-gray-200/80 rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between group cursor-pointer"
    >
      <div>
        {/* Top Image Container */}
        <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden border-b border-gray-150">
          {!imageFailed ? (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
              onError={() => setImageFailed(true)}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
              <FallbackIcon className="w-8 h-8 text-[#D71920] mb-2" />
              <span className="text-xs font-semibold text-gray-300">{title}</span>
            </div>
          )}
          {/* Subtle top indicator band */}
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono font-medium text-white tracking-wide">
            INSIDE GBS
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5">
          <h3 className="text-base font-bold text-gray-900 group-hover:text-[#D71920] transition-colors leading-snug">
            {title}
          </h3>
          <p className="text-xs text-gray-600 mt-2 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Footer Navigation Link */}
      <div className="px-5 pb-4 pt-2 flex items-center justify-between border-t border-gray-100 text-xs">
        <span className="text-gray-400 text-[11px] font-mono">GBS Strategic Pillar</span>
        <span className="inline-flex items-center gap-1 font-semibold text-[#D71920] group-hover:translate-x-0.5 transition-transform">
          <span>{actionText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};

export const InsideGbsSection: React.FC = () => {
  return (
    <section aria-labelledby="inside-gbs-heading">
      {/* Section Header */}
      <div className="mb-4">
        <h2 id="inside-gbs-heading" className="text-lg font-bold text-gray-900 tracking-tight">
          Inside GBS
        </h2>
        <p className="text-xs text-gray-500">
          Discover the people, technology and initiatives moving our enterprise forward.
        </p>
      </div>

      {/* 3 Equal-Width Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <InsideCard
          title="People & Culture"
          description="Meet the teams and people powering collaboration across GBS."
          imageSrc={insidePeopleImg}
          imageAlt="Professional colleagues collaborating in a bright, modern corporate office"
          destination="/organization"
          actionText="Meet Teams"
          fallbackIcon={Users}
        />

        <InsideCard
          title="Technology & Innovation"
          description="Explore the technology enabling smarter, more connected operations."
          imageSrc={insideTechImg}
          imageAlt="Enterprise cloud computing, AI, and connected digital infrastructure lab"
          destination="/departments/GBS-BTS"
          actionText="Explore Tech"
          fallbackIcon={Cpu}
        />

        <InsideCard
          title="Global Impact"
          description="See how our teams create value across the global enterprise."
          imageSrc={insideImpactImg}
          imageAlt="Modern corporate campus and international business architecture"
          destination="/analytics"
          actionText="View Impact"
          fallbackIcon={Globe2}
        />
      </div>
    </section>
  );
};
