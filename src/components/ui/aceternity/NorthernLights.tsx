
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
        </div>
      </div>
      
      {children}
    </div>
  );
};

export default NorthernLights;
