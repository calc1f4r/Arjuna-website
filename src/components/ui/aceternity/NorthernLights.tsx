
import React from 'react';
import { cn } from '@/lib/utils';

interface NorthernLightsProps {
  className?: string;
  children?: React.ReactNode;
}

const NorthernLights: React.FC<NorthernLightsProps> = ({ 
  className,
  children 
}) => {
  return (
    <div className={cn("relative overflow-hidden isolate", className)}>
      {/* Northern Lights Animation Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="aurora-container opacity-20">
          <div className="aurora-1"></div>
          <div className="aurora-2"></div>
          <div className="aurora-3"></div>
          <div className="aurora-4"></div>
          
          {/* Additional animated elements */}
          <div className="aurora-stars">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i}
                className="aurora-star"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`
                }}
              />
            ))}
          </div>
          
          <div className="aurora-particles">
            {Array.from({ length: 15 }).map((_, i) => (
              <div 
                key={i}
                className="aurora-particle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {children}
    </div>
  );
};

export default NorthernLights;
