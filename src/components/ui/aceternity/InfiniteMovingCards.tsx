"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface InfiniteMovingCardsProps {
  items: {
    id: string | number;
    name: string;
    content: string;
    title?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className = "",
}: InfiniteMovingCardsProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [duplicatedItems, setDuplicatedItems] = useState<typeof items>([]);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    // Duplicate items to create the infinite effect
    setDuplicatedItems([...items, ...items]);
  }, [items]);

  const getVelocity = () => {
    switch (speed) {
      case "fast":
        return direction === "left" ? -40 : 40;
      case "slow":
        return direction === "left" ? -15 : 15;
      case "normal":
      default:
        return direction === "left" ? -25 : 25;
    }
  };

  return (
    <div ref={containerRef} className={`overflow-hidden relative ${className}`}>
      <motion.div
        className="flex"
        style={{ width: containerWidth * 2 }}
        animate={{
          x: direction === "left" ? [0, -containerWidth] : [-containerWidth, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
            velocity: getVelocity(),
          },
        }}
        {...(pauseOnHover && { whileHover: { animationPlayState: "paused" } })}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="flex-shrink-0 w-full"
            style={{ width: containerWidth }}
          >
            <div className="flex space-x-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-secondary/5 border border-secondary/20 rounded-lg p-4 flex-shrink-0 w-[300px] hover:bg-secondary/10 transition-colors duration-300"
                >
                  <p className="text-muted-foreground text-sm mb-2">
                    "{item.content}"
                  </p>
                  <div className="mt-2">
                    <p className="font-medium">{item.name}</p>
                    {item.title && (
                      <p className="text-muted-foreground text-xs">
                        {item.title}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteMovingCards;
