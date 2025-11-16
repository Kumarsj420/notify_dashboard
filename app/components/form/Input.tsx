import { cn } from '@/app/utils/style';
import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  hasError?: boolean;
  success?: boolean;
  rightIcon?: React.ReactNode;
  wrapperClassName?: string;
  innerWrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className = '',
    success = false,
    error,
    rightIcon,
    wrapperClassName = '',
    innerWrapperClassName = '',
    disabled = false,
    ...inputProps
  } = props;

  let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none transition-all duration-200`;

  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 bg-gray-50 cursor-not-allowed`;
  } else if (error) {
    inputClasses += ` text-red-800 border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/10 bg-white`;
  } else if (success) {
    inputClasses += ` text-green-800 border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/10 bg-white`;
  } else {
    inputClasses += ` text-gray-800 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 bg-white hover:border-gray-400`;
  }

  return (
    <div className={cn(wrapperClassName)}>
      <div className={cn('relative', innerWrapperClassName)}>
        <input 
          ref={ref} 
          className={cn(inputClasses, className)} 
          disabled={disabled}
          {...inputProps} 
        />
        {rightIcon && (
          <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer">
            {rightIcon}
          </span>
        )}
      </div>
      {error && <p className="text-red-500 mt-1.5 text-xs">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
