import React from "react";

interface CardProps {
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-300">
      {children}
    </div>
  );
};

export default Card;
