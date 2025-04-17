import React from "react";
import { cn } from "@/lib/utils";

export const Meteors = ({
  number = 20,
  className,
  children,
}: {
  number?: number;
  className?: string;
  children?: React.ReactNode;
}) => {
  const meteors = new Array(number).fill(true);
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {children}
      {meteors.map((_, idx) => (
        <span
          key={`meteor-${idx}`}
          className={cn(
            "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-primary shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-primary before:to-transparent",
          )}
          style={{
            top: `${Math.floor(Math.random() * 100)}%`,
            left: `${Math.floor(Math.random() * 100)}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${Math.random() * 2 + 1}s`,
          }}
        ></span>
      ))}
    </div>
  );
};

export default Meteors;
