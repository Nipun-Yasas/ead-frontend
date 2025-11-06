import React from 'react';
import { Link } from 'react-router-dom';


const CustomerDashboard: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Dashboard Header */}
      <div 
        className="border-b p-6"
        style={{ 
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border-primary)'
        }}
      >
        <div className="flex items-center justify-between">
          {/* <h1 
            className="text-2xl font-bold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            
          </h1> */}
          
          {/* Chat Button */}
          <Link
            to="/chat"
            className="inline-flex items-center px-4 py-2 rounded-lg transition-colors hover:opacity-90"
            style={{ 
              backgroundColor: 'var(--color-primary)',
              color: 'white'
            }}
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
            Messages
          </Link>
        </div>
      </div>

      
    </div>
  );
};

export default CustomerDashboard;