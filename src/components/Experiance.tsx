export default function Experience (){
    return(
<section className="bg-gradient-to-br from-gray-900 to-indigo-900 py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        
        {/* Main Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-4">
          Experience the AutoCare Pro Difference
        </h2>
        
        {/* Subtitle/Description */}
        <p className="text-md sm:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust us with their vehicles
        </p>
        
        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          
          {/* Book Your Service Button (Red Primary) */}
          <button 
          //  onClick={handleBookYourService}
            className="px-8 py-4 text-lg font-semibold bg-red-600 hover:bg-red-700 transition duration-300 rounded-md shadow-lg"
          >
            Book Your Service
          </button>
          
          {/* Create Account Button (White Secondary) */}
          <button 
            //onClick={handleCreateAccount}
            className="px-8 py-4 text-lg font-semibold text-black bg-white hover:bg-gray-100 transition duration-300 rounded-md border border-white"
          >
            Create Account
          </button>
        </div>
      </div>

     
    </section>
);}