import React from "react";
import { cn } from "../utils/style";

interface CardProps {
  children: React.ReactNode;
  className?: string
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={cn("bg-linear-to-b from-white to-sc-50 rounded-3xl ring-1 ring-inset ring-sc-200 py-5 px-6 shadow-lg shadow-sc-300/60 mb-6", className)}>
      {children}
    </div>
  );
};

export default Card;
