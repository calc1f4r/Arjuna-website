import React from "react";
import { cn } from "@/lib/utils";

interface GridBackgroundDemoProps {
  children: React.ReactNode;
  className?: string;
}

export const GridBackgroundDemo: React.FC<GridBackgroundDemoProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "h-full w-full bg-black relative flex flex-col items-center justify-center overflow-hidden rounded-md",
        className,
      )}
    >
      <div className="absolute inset-0 w-full h-full bg-black z-20 [mask-image:radial-gradient(transparent,white)]" />
      <div className="absolute inset-0 w-full h-full z-10">
        <div
          className="absolute z-10 h-full w-full opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
          }}
        />
        <div className="absolute inset-0 z-10 bg-black [mask-image:radial-gradient(black,transparent_70%)]" />

        <div className="absolute left-0 right-0 bottom-0 top-1/2 z-0 bg-gradient-to-t from-transparent to-[rgba(255,13,104,0.08)]" />
        <div className="absolute left-0 right-0 bottom-1/2 top-0 z-0 bg-gradient-to-b from-transparent to-[rgba(204,10,83,0.08)]" />
      </div>

      <div className="relative z-30">{children}</div>
    </div>
  );
};

export default GridBackgroundDemo;
