import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 bg-white border border-gray-200/80 rounded-2xl">
      <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-[#D71920] mb-4">
        <Compass className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-black text-gray-900 tracking-tight">404 — Page Not Found</h1>
      <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-md">
        The corporate page or resource you are looking for has been moved or does not exist in the GBS directory.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </button>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#D71920] hover:bg-[#b5141a] rounded-lg shadow-xs transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </button>
      </div>
    </div>
  );
};
