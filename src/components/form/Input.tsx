import { cn } from '@/utils/style';
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

  let inputClasses = `w-full h-10 rounded-xl px-3 py-2 text-sm placeholder:text-sc-500/80 ring-[0.1em] ring-inset outline-none border-none focus:ring-2 font-medium `;

  if (disabled) {
    inputClasses += ` text-sc-500 ring-sc-300 bg-sc-100 cursor-not-allowed placeholder:text-sc-400!`;
  } else if (error) {
    inputClasses += ` text-red-800 ring-red-300 focus:ring-red-400 bg-red-50`;
  } else if (success) {
    inputClasses += ` text-green-800 ring-emerald-400 focus:ring-emerald-400 bg-white`;
  } else {
    inputClasses += `text-sc-900 focus:ring-p-400 bg-white hover:border-sc-400  ring-sc-400/60 `;
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
      {error && <p className="text-red-500 mt-1.5 text-xs font-medium">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
