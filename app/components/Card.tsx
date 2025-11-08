import React from "react";

interface CardProps {
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg shadow-sc-300/70 px-8 py-7 ring-1 ring-inset ring-gray-200 hover:shadow-xl transition-all duration-300">
      {children}
    </div>
  );
};

export default Card;
