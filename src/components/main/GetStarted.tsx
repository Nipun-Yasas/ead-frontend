import React from 'react';

const GetStarted: React.FC = () => {
  return (
    <section className="bg-[#030213] max-h-[400px] flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Calendar Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 border-2 border-text-secondary rounded-lg flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-text-secondary" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Ready to Get Started?
        </h1>

        {/* Description */}
        <p className="text-lg text-text-secondary mb-12 max-w-xl mx-auto leading-relaxed">
          Experience the future of automobile service management. Book your appointment 
          today and track your service in real-time.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-primary hover:bg-primary-dark text-text-primary font-semibold py-4 px-8 rounded-lg transition-colors duration-200 w-full sm:w-auto min-w-[160px]">
            Book Appointment
          </button>
          
          <button className="border-2 border-text-secondary hover:border-text-primary text-text-secondary hover:text-text-primary font-semibold py-4 px-8 rounded-lg transition-all duration-200 w-full sm:w-auto min-w-[160px]">
            Create Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;