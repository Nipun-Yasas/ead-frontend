import React from 'react';
import { 
  FaRegDotCircle, 
  FaRocket, 
  FaShieldAlt, 
  FaHeart, 
  FaClock, 
  FaAward 
} from 'react-icons/fa';

// --- Stats Data ---
interface StatItem {
  value: string;
  label: string;
}

const statsData: StatItem[] = [
  { value: '15+', label: 'Years Experience' },
  { value: '10K+', label: 'Vehicles Serviced' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '50+', label: 'Expert Technicians' },
];

// --- Core Values Data ---
interface CoreValue {
  icon: React.ReactElement;
  title: string;
  description: string;
  isHighlighted?: boolean;
}

const coreValuesData: CoreValue[] = [
  {
    icon: <FaShieldAlt size={30} />,
    title: 'Quality First',
    description: 'We never compromise on the quality of our service or parts used in your vehicle.',
  },
  {
    icon: <FaHeart size={30} />,
    title: 'Customer Care',
    description: 'Your satisfaction and trust are at the heart of everything we do.',
    isHighlighted: true,
  },
  {
    icon: <FaClock size={30} />,
    title: 'Timely Service',
    description: 'We respect your time and ensure efficient service delivery without cutting corners.',
  },
  {
    icon: <FaAward size={30} />,
    title: 'Excellence',
    description: 'Continuously improving and setting new standards in automotive service.',
  },
];

// --- Main Component ---
const AboutSection: React.FC = () => {
  return (
    <section id="about">
      <div className="bg-bg-primary text-text-primary font-sans overflow-hidden">
        
        {/* 1. Stats Bar */}
        <section className="flex justify-around items-center flex-wrap px-8 py-12 border-y-[3px] border-[#D60507]">
          {statsData.map((stat) => (
            <div key={stat.label} className="text-center min-w-[150px] mx-4 my-4">
              <h2 className="text-[3.5rem] font-bold mb-1 text-white">{stat.value}</h2>
              <p className="text-base text-text-muted uppercase tracking-wide m-0">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* 2. Mission & Vision */}
        <section className="flex justify-center gap-10 flex-wrap px-8 py-16">
          <div className="bg-bg-secondary border border-[#D60507] rounded-xl p-8 max-w-[550px] shadow-[0_4px_15px_rgba(0,0,0,0.2)]">
            <div className="bg-[#D60507] text-white rounded-full w-[50px] h-[50px] flex items-center justify-center mb-5">
              <FaRegDotCircle size={24} />
            </div>
            <h3 className="text-[1.75rem] font-semibold mb-4">Our Mission</h3>
            <p className="text-[#ccc] leading-relaxed text-base">
              To provide transparent, efficient, and reliable automotive
              services through innovative technology while maintaining the
              highest standards of craftsmanship. We strive to make
              vehicle maintenance stress-free and accessible for everyone.
            </p>
          </div>

          <div className="bg-bg-secondary border border-[#D60507] rounded-xl p-8 max-w-[550px] shadow-[0_4px_15px_rgba(0,0,0,0.2)]">
            <div className="bg-[#D60507] text-white rounded-full w-[50px] h-[50px] flex items-center justify-center mb-5">
              <FaRocket size={24} />
            </div>
            <h3 className="text-[1.75rem] font-semibold mb-4">Our Vision</h3>
            <p className="text-[#ccc] leading-relaxed text-base">
              To become the global standard for automotive service
              management, where every vehicle owner has complete
              transparency and control over their service experience, and
              every technician has the tools to deliver excellence.
            </p>
          </div>
        </section>

        {/* 3. Core Values */}
        <section className="px-8 py-2.5 pb-12 text-center">
          <div className="mb-16">
            <h2 className="text-[2.75rem] font-bold text-[#D60507] mb-4">Our Core Values</h2>
            <p className="text-lg text-white max-w-[600px] mx-auto leading-normal">
              The principles that guide every decision we make and every service
              we provide
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 max-w-[1200px] mx-auto">
            {coreValuesData.map((value) => (
              <div 
                key={value.title} 
                className={`
                  ${value.isHighlighted ? 'bg-[#D60507]' : 'bg-[#2a2a2a]'}
                  p-10 rounded-xl transition-all duration-300 ease-in-out
                  shadow-[0_4px_15px_rgba(0,0,0,0.2)]
                  hover:transform hover:-translate-y-2 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)]
                `}
              >
                <div 
                  className={`
                    ${value.isHighlighted ? 'bg-bg-header text-[#D60507]' : 'bg-[#444] text-white'}
                    rounded-full w-[70px] h-[70px] inline-flex items-center justify-center mb-6
                    transition-colors duration-300
                  `}
                >
                  {value.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                <p className={`${value.isHighlighted ? 'text-white' : 'text-[#ccc]'} leading-relaxed text-[0.95rem]`}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </section>
  );
};

export default AboutSection;