import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Cpu, Globe2 } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

interface InsideGBSCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  icon: React.ComponentType<{ className?: string }>;
  destination: string;
  actionText: string;
}

const INSIDE_GBS_CARDS: InsideGBSCardProps[] = [
  {
    title: 'People & Culture',
    description: 'Meet the teams and people powering collaboration across GBS.',
    imageUrl:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
    imageAlt: 'Professional colleagues collaborating in a bright, modern corporate office',
    icon: Users,
    destination: '/people',
    actionText: 'Browse People Directory',
  },
  {
    title: 'Technology & Innovation',
    description: 'Explore the technology enabling smarter, more connected operations.',
    imageUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    imageAlt: 'Enterprise cloud computing, AI and digital infrastructure',
    icon: Cpu,
    destination: '/departments/GBS-BTS',
    actionText: 'Explore BTS Technology',
  },
  {
    title: 'Global Impact',
    description: 'See how our teams create value across the global enterprise.',
    imageUrl:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
    imageAlt: 'Modern corporate campus and contemporary global business architecture',
    icon: Globe2,
    destination: '/organization',
    actionText: 'View Global Organization',
  },
];

export const InsideGBSSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section aria-labelledby="inside-gbs-heading">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 id="inside-gbs-heading" className="text-lg font-bold text-gray-900 tracking-tight">
            Inside GBS
          </h2>
          <p className="text-xs text-gray-500">
            Discover the people, technology and initiatives moving our enterprise forward.
          </p>
        </div>
      </div>

      {/* 3 Equal-Width Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {INSIDE_GBS_CARDS.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={() => navigate(card.destination)}
              className="bg-white border border-gray-200/80 rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-gray-300 transition-all cursor-pointer flex flex-col justify-between group h-full"
            >
              <div>
                {/* 4:5 / Balanced Aspect Ratio Image Container */}
                <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-slate-900">
                  <SafeImage
                    src={card.imageUrl}
                    alt={card.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    fallbackText={card.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                  {/* Icon badge overlay */}
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-xs">
                    <Icon className="w-3.5 h-3.5 text-[#D71920]" />
                    <span className="font-mono text-[10px] tracking-wider uppercase">{card.title}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-[#D71920] transition-colors leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-5 pb-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#D71920]">
                <span>{card.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
