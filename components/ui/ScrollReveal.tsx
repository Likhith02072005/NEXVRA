'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView } from 'motion/react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'left' | 'right' | 'down';
  distance?: number;
  className?: string;
  once?: boolean;
  viewportAmount?: number;
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  distance = 24,
  className = '',
  once = true,
  viewportAmount = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: viewportAmount });

  const directionMap = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  const offset = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: offset.x, y: offset.y }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerRevealProps {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'left' | 'right' | 'down';
  distance?: number;
  className?: string;
  once?: boolean;
  viewportAmount?: number;
}

export function StaggerReveal({
  children,
  stagger = 0.08,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  distance = 24,
  className = '',
  once = true,
  viewportAmount = 0.15,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: viewportAmount });

  const directionMap = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  const offset = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, x: offset.x, y: offset.y },
                visible: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: { duration, ease: [0.25, 0.1, 0.25, 1] },
                },
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
