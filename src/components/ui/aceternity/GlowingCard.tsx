
import React from 'react';
import { cn } from '@/lib/utils';

interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlowingCard: React.FC<GlowingCardProps> = ({ children, className }) => {
  return (
    <div className={cn("aceternity-border rounded-xl", className)}>
      <div className="bg-background rounded-lg p-6 h-full">
        {children}
      </div>
    </div>
  );
};

export default GlowingCard;
