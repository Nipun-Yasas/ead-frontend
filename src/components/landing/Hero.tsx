import heroImage from '../../assets/hero.png';

export default function Hero(){
return(
  <section id="home">
<div className="relative h-[600px] md:h-[700px] overflow-hidden">
   
      <div className="absolute inset-0 bg-cover bg-center" 
           style={{
             background: `linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroImage})`,
             backgroundSize: "cover",
             backgroundPosition: "center"
           }}>
     
        <div className="absolute inset-0 bg-opacity-60"></div>
      </div>
      
    
      <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
  
        <h1 className="text-4xl text-text-primary sm:text-5xl lg:text-7xl font-bold leading-tight mb-4">
          Premier Automobile <br />
          Service Management
        </h1>
     
        <p className="text-lg sm:text-xl text-text-primary font-light mb-8 max-w-md">
          Track your vehicle service progress in real-time, book 
          appointments, and stay connected with our expert team.
        </p>
    
        <div className="flex space-x-4">
         
          <button 
           // onClick={handleBookService}
            className="px-6 py-3 text-lg font-semibold bg-primary hover:bg-primary-dark text-text-primary transition duration-300 rounded-md shadow-lg"
          >
            Book Service Now
          </button>
          
          {/* Track My Service Button (White Secondary) */}
          <button 
            //onClick={handleTrackService}
            className="px-6 py-3 text-lg font-semibold text-text-primary bg-white hover:bg-gray-100 transition duration-300 rounded-md border border-white"
          >
            Track My Service
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 z-20"></div>
    </div>
    </section>
);
}