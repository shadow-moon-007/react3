import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: 'campus' | 'datacenter' | 'operations' | 'cloud' | 'ai' | 'people' | 'tech' | 'generic';
  fallbackText?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackType = 'generic',
  fallbackText,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 flex flex-col items-center justify-center text-slate-400 p-3 select-none ${className}`}
        role="img"
        aria-label={alt || 'Visual placeholder'}
      >
        <svg
          className="w-6 h-6 mb-1 text-slate-400 stroke-current"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
        {fallbackText && (
          <span className="text-[10px] font-mono text-slate-500 text-center tracking-tight truncate max-w-full">
            {fallbackText}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      loading="lazy"
      decoding="async"
      className={className}
      {...props}
    />
  );
};
