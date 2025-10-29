import React from 'react';

const OurServicesBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 py-20 px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* Gear icons */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-20">
          <svg
            className="w-32 h-32 text-gray-400 animate-spin-slow"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.4-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
          </svg>
        </div>

        {/* Smaller gear */}
        <div className="absolute left-48 top-20 opacity-15">
          <svg
            className="w-20 h-20 text-gray-500 animate-spin-reverse-slow"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.4-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
          </svg>
        </div>

        {/* Tire stack on the right */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-25">
          <div className="relative">
            {/* Tire 1 */}
            <div className="w-24 h-24 rounded-full border-8 border-gray-400 bg-gray-600 relative">
              <div className="absolute inset-2 rounded-full border-4 border-gray-500">
                <div className="absolute inset-2 rounded-full bg-gray-700 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                </div>
              </div>
            </div>
            {/* Tire 2 - offset */}
            <div className="w-24 h-24 rounded-full border-8 border-gray-400 bg-gray-600 relative -mt-4 ml-6">
              <div className="absolute inset-2 rounded-full border-4 border-gray-500">
                <div className="absolute inset-2 rounded-full bg-gray-700 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                </div>
              </div>
            </div>
            {/* Tire 3 - offset */}
            <div className="w-24 h-24 rounded-full border-8 border-gray-400 bg-gray-600 relative -mt-4 ml-12">
              <div className="absolute inset-2 rounded-full border-4 border-gray-500">
                <div className="absolute inset-2 rounded-full bg-gray-700 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional decorative wrench */}
        <div className="absolute right-48 bottom-20 opacity-20 rotate-45">
          <svg
            className="w-16 h-16 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M22.61 19.17l-4.05-4.05c.47-1.18.47-2.48 0-3.66l-2.83-2.83c-.48-.48-1.26-.48-1.74 0l-.88.88l-4.24-4.24c-.48-.48-1.26-.48-1.74 0L5.39 6.01c-.48.48-.48 1.26 0 1.74l4.24 4.24l-.88.88c-.48.48-.48 1.26 0 1.74l2.83 2.83c1.18.47 2.48.47 3.66 0l4.05 4.05c.67.67 1.76.67 2.43 0l.89-.89c.67-.67.67-1.76 0-2.43zM7.13 7.75L8.87 6l2.83 2.83l-1.74 1.74L7.13 7.75zm11.31 11.31l-.89.89l-3.54-3.54c-.39.08-.8.08-1.19 0l-2.12-2.12L12.44 12l2.12 2.12c.39.39.39 1.02 0 1.41l-1.44 1.44l3.54 3.54l.89-.89c.39-.39.39-1.02 0-1.41z"/>
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto text-center">
        <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 tracking-wide">
          Our Services
        </h1>
        
        <p className="text-xl lg:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
          Comprehensive automotive care from routine maintenance to custom modifications
        </p>
        
        <button className="inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
          Book Service Now
          <svg
            className="ml-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Bottom gradient overlay for depth */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default OurServicesBanner;