
import React from "react";
import { cn } from "@/lib/utils";

export const MovingBorder = ({
  children,
  duration = 2000,
  className,
  borderClassName,
  as: Component = "div",
  containerClassName,
  size = 400,
  backgroundColor = "transparent"
}: {
  children?: React.ReactNode;
  duration?: number;
  className?: string;
  borderClassName?: string;
  as?: any;
  containerClassName?: string;
  size?: number;
  backgroundColor?: string;
}) => {
  return (
    <Component
      className={cn(
        "relative overflow-hidden",
        containerClassName
      )}
      style={{
        background: backgroundColor,
      }}
    >
      <div
        className={cn(
          "absolute inset-0 h-full w-full",
          borderClassName
        )}
        style={{
          background: `
            conic-gradient(
              from 0deg at 50% 50%,
              hsl(var(--primary)) 0%,
              hsl(var(--accent)) 25%,
              hsl(var(--primary)) 50%,
              hsl(var(--accent)) 75%,
              hsl(var(--primary)) 100%
            )
          `,
          borderRadius: "inherit",
          animation: `spin ${duration}ms linear infinite`,
        }}
      />
      <div
        className={cn(
          "relative z-10 bg-background rounded-[inherit]",
          className
        )}
      >
        {children}
      </div>
      
      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Component>
  );
};

export default MovingBorder;
