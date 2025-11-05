import React from 'react';
import styles from './AboutSection.module.css';
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
    <div className={styles.aboutSection}>
      
      {/* 1. Stats Bar */}
      <section className={styles.statsBar}>
        {statsData.map((stat) => (
          <div key={stat.label} className={styles.statItem}>
            <h2>{stat.value}</h2>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* 2. Mission & Vision */}
      <section className={styles.missionVision}>
        <div className={styles.missionVisionCard}>
          <div className={styles.iconWrapperRed}>
            <FaRegDotCircle size={24} />
          </div>
          <h3>Our Mission</h3>
          <p>
            To provide transparent, efficient, and reliable automotive
            services through innovative technology while maintaining the
            highest standards of craftsmanship. We strive to make
            vehicle maintenance stress-free and accessible for everyone.
          </p>
        </div>

        <div className={styles.missionVisionCard}>
          <div className={styles.iconWrapperRed}>
            <FaRocket size={24} />
          </div>
          <h3>Our Vision</h3>
          <p>
            To become the global standard for automotive service
            management, where every vehicle owner has complete
            transparency and control over their service experience, and
            every technician has the tools to deliver excellence.
          </p>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className={styles.coreValues}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>Our Core Values</h2>
          <p className={styles.subtitle}>
            The principles that guide every decision we make and every service
            we provide
          </p>
        </div>

        <div className={styles.valuesGrid}>
          {coreValuesData.map((value) => (
            <div 
              key={value.title} 
              className={`${styles.valueCard} ${value.isHighlighted ? styles.highlighted : ''}`}
            >
              <div className={styles.iconWrapperGray}>
                {value.icon}
              </div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
    </section>
  );
};

export default AboutSection;