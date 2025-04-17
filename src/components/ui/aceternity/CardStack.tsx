"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export type CardItem = {
  id: string | number;
  content: React.ReactNode;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  badge?: string;
};

interface CardStackProps {
  items: CardItem[];
  offset?: number;
  scaleFactor?: number;
  autoRotate?: boolean;
  rotationInterval?: number;
  className?: string;
}

export const CardStack: React.FC<CardStackProps> = ({
  items,
  offset = 10,
  scaleFactor = 0.06,
  autoRotate = true,
  rotationInterval = 5000,
  className = "",
}) => {
  const [cards, setCards] = useState<CardItem[]>(items);
  const [rotation, setRotation] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoRotate) {
      startRotation();
    }

    return () => {
      if (rotation) clearInterval(rotation);
    };
  }, [autoRotate, items, rotationInterval]);

  const startRotation = () => {
    const interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, rotationInterval);

    setRotation(interval);
  };

  return (
    <div className={`relative ${className}`}>
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute rounded-xl bg-secondary/5 border border-secondary/20 shadow-xl"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -offset,
              scale: 1 - index * scaleFactor,
              zIndex: cards.length - index,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {card.content}
          </motion.div>
        );
      })}
    </div>
  );
};

export default CardStack;
