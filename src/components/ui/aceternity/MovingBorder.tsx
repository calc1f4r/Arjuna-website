import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface MovingBorderProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

const MovingBorder: React.FC<MovingBorderProps> = ({ children, className, duration = 4000 }) => {
  const [x, setX] = useState(0);
  const requestRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      setX(x => x + 1);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current as number);
  }, []);

  const gradientTransform = `translateX(${x}px)`;

  return (
    <div className={cn("relative rounded-lg p-px overflow-hidden", className)}>
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary to-accent [mask-image:linear-gradient(to_right,white_0%,black_50%,white_100%)]"
        style={{
          transform: gradientTransform,
          animation: `scroll ${duration}ms linear infinite`,
        }}
      />
      <div className="relative bg-background rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default MovingBorder;
