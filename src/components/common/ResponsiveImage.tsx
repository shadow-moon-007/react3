import React, { useState } from 'react';
import { Maximize2, MapPin, Info, X, Camera, Building } from 'lucide-react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | 'auto';
  className?: string;
  imageClassName?: string;
  caption?: string;
  location?: string;
  photographer?: string;
  showDetailsOverlay?: boolean;
  allowZoom?: boolean;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  aspectRatio = '16/9',
  className = '',
  imageClassName = '',
  caption,
  location,
  photographer,
  showDetailsOverlay = true,
  allowZoom = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showMetadataBar, setShowMetadataBar] = useState(false);

  const aspectClass =
    aspectRatio === '16/9'
      ? 'aspect-video'
      : aspectRatio === '4/3'
      ? 'aspect-[4/3]'
      : aspectRatio === '1/1'
      ? 'aspect-square'
      : '';

  return (
    <>
      <div
        className={`relative overflow-hidden rounded-xl bg-gray-100 group select-none ${aspectClass} ${className}`}
      >
        {/* Placeholder / Shimmer while loading */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <Building className="w-8 h-8 text-gray-300" />
          </div>
        )}

        {/* Fallback container if broken or not found (Zero Broken Image policy) */}
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white p-4 text-center">
            <Building className="w-8 h-8 text-red-500 mb-2" />
            <span className="text-xs font-bold">{alt}</span>
            <span className="text-[10px] text-gray-400 mt-1">Enterprise Facility Visual</span>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${imageClassName}`}
          />
        )}

        {/* Measured Contrast Scrim for text readability */}
        {(caption || location) && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4 text-white pointer-events-none transition-opacity duration-200 opacity-90 group-hover:opacity-100">
            {location && (
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-gray-300 tracking-wide mb-0.5">
                <MapPin className="w-3 h-3 text-[#D71920]" />
                <span>{location}</span>
              </div>
            )}
            {caption && (
              <p className="text-xs font-semibold text-white/95 line-clamp-1 leading-snug drop-shadow-xs">
                {caption}
              </p>
            )}
          </div>
        )}

        {/* Floating Action Controls */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {(caption || photographer || location) && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowMetadataBar(!showMetadataBar);
              }}
              className="p-1.5 rounded-lg bg-black/60 hover:bg-black/85 text-white/90 backdrop-blur-xs transition-colors"
              title="Image details & provenance"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          )}

          {allowZoom && !hasError && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(true);
              }}
              className="p-1.5 rounded-lg bg-black/60 hover:bg-black/85 text-white/90 backdrop-blur-xs transition-colors"
              title="Inspect high-resolution image"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Metadata Details Flyout */}
        {showMetadataBar && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-2 top-2 z-20 p-3 bg-gray-950/90 text-white rounded-lg backdrop-blur-md border border-white/10 text-xs shadow-xl animate-in fade-in duration-150"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-[10px] uppercase tracking-wider text-[#D71920] font-mono">
                Corporate Asset Spec
              </span>
              <button
                type="button"
                onClick={() => setShowMetadataBar(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            {caption && <p className="text-gray-200 font-medium mb-1">{caption}</p>}
            <div className="space-y-0.5 text-[11px] text-gray-400 font-mono">
              {location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#D71920]" />
                  <span>{location}</span>
                </div>
              )}
              {photographer && (
                <div className="flex items-center gap-1">
                  <Camera className="w-3 h-3 text-gray-400" />
                  <span>Captured by: {photographer}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* High-Resolution Zoom Modal */}
      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <div className="relative max-w-5xl w-full flex flex-col items-center">
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between text-white pb-3 mb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">{alt}</span>
                {location && (
                  <span className="text-xs font-mono text-gray-400">· {location}</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Close fullscreen view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image */}
            <div className="relative w-full max-h-[80vh] flex items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black">
              <img
                src={src}
                alt={alt}
                className="max-h-[80vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Bottom Caption & Provenance */}
            {caption && (
              <div className="w-full pt-3 mt-2 text-center text-xs text-gray-300">
                <p>{caption}</p>
                {photographer && (
                  <p className="text-[11px] text-gray-500 font-mono mt-0.5">
                    Credit: {photographer}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
