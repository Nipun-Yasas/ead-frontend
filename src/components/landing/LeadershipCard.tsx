import React from "react";

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
  return (
    <div
      className={`flex flex-col items-center justify-start text-center rounded-md overflow-hidden transition-all duration-500 ease-in-out border-2 shadow-lg mx-2 w-[250px] min-w-[250px] ${
        isActive
          ? "bg-text-primary border-primary"
          : "bg-[#111111] border-[#222222] hover:border-primary"
      }`}
    >
      <div className="w-full h-[280px] overflow-hidden">
        <img src={image} alt={name} className="object-cover w-full h-full" />
      </div>
      <div className="py-4">
        <h3
          className={`text-lg font-semibold ${
            isActive ? "text-black" : "text-text-primary"
          }`}
        >
          {name}
        </h3>
        <p
          className={`text-sm ${isActive ? "text-text-tertiary" : "text-text-tertiary"}`}
        >
          {title}
        </p>
      </div>
    </div>
  );
};

export default LeadershipCard;
