import { cn } from '@/app/utils/style';
import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
}

const Label: React.FC<LabelProps> = ({ children, className, required, ...props }) => {
  return (
    <label 
      className={cn('block text-sm font-medium text-gray-700 mb-2', className)} 
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default Label;