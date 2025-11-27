import React from 'react';
import { cn } from '../utils/style';

interface InfoCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode ;
  message?: string;
  iconVariant?: 'info' | 'warning' | 'error' | 'success';
  messageVariant?: 'info' | 'warning' | 'error' | 'success';
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  value,
  icon,
  message,
  iconVariant = 'info',
  messageVariant = 'success',
  className,
}) => {
  const iconVariants = {
    info: 'bg-linear-to-b from-sky-50 to-sky-100 text-sky-500 ring-sky-200',
    warning: 'bg-linear-to-b from-amber-50 to-amber-100 text-amber-500 ring-amber-200',
    error: 'bg-linear-to-b from-red-50 to-red-100 text-red-500 ring-red-200',
    success: 'bg-linear-to-b from-emerald-50 to-emerald-100 text-emerald-500 ring-emerald-200',
  };

  const messageVariants = {
    info: 'text-sky-500',
    warning: 'text-amber-500',
    error: 'text-red-500',
    success: 'text-emerald-500',
  };

  return (
    <div
      className={cn(
        'bg-linear-to-b from-white to-sc-50 rounded-3xl ring-1 ring-inset ring-sc-200 py-5 px-6 shadow-lg shadow-sc-300/60',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-sc-600/90 mb-2">{title}</p>
          <p className="text-2xl font-bold text-sc-900 mb-2">{value}</p>
          {message && (
            <p className={cn('text-xs font-medium block', messageVariants[messageVariant])}>
              {message}
            </p>
          )}
        </div>
        <div
          className={cn(
            'flex items-center justify-center size-13 rounded-lg ring-1 ring-inset',
            iconVariants[iconVariant]
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;