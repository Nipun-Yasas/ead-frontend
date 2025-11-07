import React from "react";
import { useTheme } from '../../contexts/ThemeContext';

interface LeadershipCardProps {
  name: string;
  title: string;
  image: string;
  isActive: boolean;
}

const LeadershipCard: React.FC<LeadershipCardProps> = ({
  name,
  title,
  image,
  isActive,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Background and border classes differ in light mode (white interior) vs dark mode
  const rootBgClass = isLight
    ? 'bg-white border-primary'
    : isActive
      ? 'bg-text-primary border-primary'
      : 'bg-[#111111] border-[#222222] hover:border-primary';

  return (
    <div
      className={`flex flex-col items-center justify-start text-center rounded-md overflow-hidden transition-all duration-500 ease-in-out border-2 shadow-lg mx-2 w-[250px] min-w-[250px] ${rootBgClass}`}
    >
      <div className="w-full h-[280px] overflow-hidden">
        <img src={image} alt={name} className="object-cover w-full h-full" />
      </div>
      <div className="py-4">
        <h3
          className={`text-lg font-semibold ${isLight ? 'text-black' : isActive ? 'text-black' : 'text-text-primary'}`}
        >
          {name}
        </h3>
        <p className={`text-sm ${isLight ? 'text-text-tertiary' : 'text-text-tertiary'}`}>
          {title}
        </p>
      </div>
    </div>
  );
};

export default LeadershipCard;
