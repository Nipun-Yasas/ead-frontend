import React from "react";
import LeadershipCard from "./LeadershipCard";
import { CheckCircle } from "lucide-react";

//Leadership Team Section 

const members = [
  { name: "MTNS Perera", title: "Chief Executive Officer", image: "/images/team3.jpg" },
  { name: "G.P. Jayamanna", title: "Head of Operations", image: "/images/team1.png" },
  { name: "OPNYK Bandara", title: "Lead Technician", image: "/images/team3.jpg" },
  { name: "Malidu M.D.K.D", title: "Customer Experience Director", image: "/images/team2.png" },
  { name: "MJH PINTO", title: "Marketing Manager", image: "/images/team2.png" },
  { name: "Hewagama S", title: "Finance Director", image: "/images/team4.png" },
  { name: "James Patel", title: "Innovation Lead", image: "/images/team3.jpg" },
  { name: "Olivia Gomez", title: "Operations Analyst", image: "/images/team4.png" },
  { name: "Henry Wilson", title: "Technical Advisor", image: "/images/team1.png" },
  { name: "Lisa Brown", title: "HR Manager", image: "/images/team2.png" },
];

// Duplicate list for smooth infinite scroll
const duplicatedMembers = [...members, ...members];

const LeadershipTeam: React.FC = () => {
  return (
    <section className="bg-bg-primary text-center overflow-hidden relative">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll-slow {
          animation: scroll 25s linear infinite;
          will-change: transform;
        }

        .hover-zoom {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .hover-zoom:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(255, 255, 255, 0.1);
        }

        .card-width {
          flex: 0 0 25%;
        }
        @media (max-width: 1024px) {
          .card-width { flex: 0 0 33.3333%; }
        }
        @media (max-width: 768px) {
          .card-width { flex: 0 0 50%; }
        }
        @media (max-width: 500px) {
          .card-width { flex: 0 0 100%; }
        }
      `}</style>

      <h2 className="text-primary text-5xl mt-10 font-bold mb-2">
        Meet Our Leadership Team
      </h2>
      <p className="text-text-tertiary mb-12 text-lg">
        Experienced professionals dedicated to automotive excellence
      </p>

      <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
        <div className="flex animate-scroll-slow">
          {duplicatedMembers.map((member, index) => (
            <div key={index} className="card-width px-2 hover-zoom">
              <LeadershipCard
                name={member.name}
                title={member.title}
                image={member.image}
                isActive={false}
              />
            </div>
          ))}
        </div>

        <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-[#0f0f0f] to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-[#0f0f0f] to-transparent pointer-events-none"></div>
      </div>

      {/* Add the next section directly below */}
      <WhatSetsUsApart />
    </section>
  );
};

//What Sets Us Apart Section 

const WhatSetsUsApart: React.FC = () => {
  const features = [
    {
      title: "Real-Time Transparency",
      description:
        "Track your vehicle's service progress live from your phone. Know exactly what's happening, when it's happening.",
    },
    {
      title: "Quality Parts Guarantee",
      description:
        "We use only OEM or premium aftermarket parts backed by comprehensive warranties.",
    },
    {
      title: "Convenient Scheduling",
      description:
        "Book appointments online 24/7 with instant confirmation and flexible time slots.",
    },
    {
      title: "Certified Technicians",
      description:
        "All our technicians are ASE certified with continuous training in the latest automotive technologies.",
    },
    {
      title: "Advanced Diagnostics",
      description:
        "State-of-the-art diagnostic equipment ensures accurate problem identification every time.",
    },
    {
      title: "Comprehensive Warranty",
      description:
        "All services come with our industry-leading warranty for your peace of mind.",
    },
  ];

  return (
    <div id="services" className="bg-[rgba(45,45,45,0.7)] text-text-primary py-15 mt-20 mb-10 px-6 text-center">
      <h2 className="text-primary text-5xl font-bold mb-2">What Sets Us Apart</h2>
      <p className="text-text-tertiary mb-12 text-lg">
        Why thousands of customers trust AutoCare Pro
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 bg-[#0f0f0f] p-6 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <CheckCircle className="text-success w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-text-primary text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-text-tertiary text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadershipTeam;
