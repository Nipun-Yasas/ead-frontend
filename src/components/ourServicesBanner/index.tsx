import React from 'react';
import gearsImage from '../../assets/images/gears.png';
import tyresImage from '../../assets/images/tyres.png';

const OurServicesBanner: React.FC = () => {

  const handleClick = (): void => {
    alert("Button clicked!");
  };

  return (
    <div 
      className="flex flex-col items-center relative"
      style={{
        backgroundColor: '#1D293D',
        width: '100vw',
        height: '40vh',
        padding: '2rem'
      }}
    >
      {/* Background gear image */}
      <img 
        src={gearsImage} 
        alt="Gears" 
        className="absolute w-64 h-64 opacity-50"
        style={{
          position: 'absolute',
          top: '45%',
          left: '25%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1
        }}
      />

      {/*Background types image */}
      <img
        src={tyresImage}
        alt="Tyres"
        className="absolute w-64 h-64 opacity-50"
        style={{
          position: 'absolute',
          top:'45%',
          left:'75%',
          transform:'translate(-50%,-50%)',
          zIndex: 1
        }}

        />
      
      {/* Content on top of gear */}
      <div className="relative z-10 flex flex-col items-center mt-10">
        <h1 className="text-center" style={{ color: 'white', fontSize: '4rem' }}>Our Services</h1>
        <h3 className="text-white" style={{ lineHeight: '3' }}>Comprehensive automotive care from routine maintenance to custom modifications</h3>
        <button 
          onClick={handleClick}
          className="rounded"
          style={{ backgroundColor: '#9F2329', color: 'white', padding: '0.5rem 1rem', marginTop: '1rem' }}
        >
          Book Service Now 
        </button>
      </div>
    </div>
    
  );
};

export default OurServicesBanner;