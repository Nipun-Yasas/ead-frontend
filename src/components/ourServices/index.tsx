import React from 'react';

const OurServices: React.FC = () => {
  const services = [
    {
      id: 1,
      title: "Regular Maintenance",
      description: "24/7 support team ready to assist with any questions or concerns",
      image: "/assets/images/ImageWithFallback.png",
      link: "#"
    },
    {
      id: 2,
      title: "Diagnostics & Repair",
      description: "Advanced diagnostic tools and expert technicians for comprehensive repairs",
      image: "/assets/images/ImageWithFallback.png",
      link: "#"
    },
    {
      id: 3,
      title: "Performance Tuning",
      description: "Optimize your vehicle's performance with our specialized tuning services",
      image: "/assets/images/ImageWithFallback.png",
      link: "#"
    }
  ];

  return (
    <section className="bg-gray-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Services
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive automotive care for all your needs
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border-2 border-red-600 hover:border-red-500 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-gray-700">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    e.currentTarget.src = "https://via.placeholder.com/400x300/374151/9CA3AF?text=Service+Image";
                  }}
                />
                {/* Learn More Button Overlay */}
                <div className="absolute bottom-4 left-4">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold transition-colors duration-200">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;