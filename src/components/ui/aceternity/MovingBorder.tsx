
import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MovingBorderProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  duration?: number;
}

const MovingBorder: React.FC<MovingBorderProps> = ({ 
  children, 
  className, 
  containerClassName,
  duration = 4000 
}) => {
  return (
    <div className={cn("relative rounded-lg p-px overflow-hidden", containerClassName)}>
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary to-accent [mask-image:linear-gradient(to_right,white_0%,black_50%,white_100%)]"
        style={{
          animation: `scroll ${duration}ms linear infinite`,
        }}
      />
      <div className={cn("relative bg-background rounded-lg", className)}>
        {children}
      </div>
    </div>
  );
};

export default MovingBorder;

