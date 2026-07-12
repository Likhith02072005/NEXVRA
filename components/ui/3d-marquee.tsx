"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";

const MotionImage = motion(Image);

export const ThreeDMarquee = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  // Ensure we have images to show, fallback to empty array
  const imgList = images || [];

  // Split the images array into 6 columns for higher density
  const cols = 6;
  const chunkSize = Math.ceil(imgList.length / cols);
  const chunks = Array.from({ length: cols }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return imgList.slice(start, start + chunkSize);
  });

  return (
    <div
      className={cn(
        "relative mx-auto block h-[650px] w-full overflow-hidden rounded-3xl max-sm:h-100",
        className,
      )}
    >
      {/* Edge vignette fade to blend grid with dark background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,#0a0a12_85%)] pointer-events-none z-30" />

      <div className="flex size-full items-center justify-center">
        {/* Enlarge coordinate space to prevent clipping gaps during rotation */}
        <div className="w-[140%] h-[140%] shrink-0 scale-75 sm:scale-90 lg:scale-110 relative">
          <div
            style={{
              transform: "perspective(1200px) rotateX(45deg) rotateY(-5deg) rotateZ(-30deg)",
              transformStyle: "preserve-3d",
            }}
            className="absolute top-10 left-[10%] grid w-[120%] h-[120%] origin-center grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 transform-3d"
          >
            {chunks.map((subarray, colIndex) => {
              if (subarray.length === 0) return null;
              
              // Set responsive visibility class matching grid-cols configuration
              let visibilityClass = "flex flex-col items-center gap-6";
              if (colIndex === 1 || colIndex === 3) {
                visibilityClass = "flex flex-col items-center gap-6 hidden sm:flex";
              } else if (colIndex === 4 || colIndex === 5) {
                visibilityClass = "flex flex-col items-center gap-6 hidden lg:flex";
              }

              // Continuous linear animation without pauses
              return (
                <motion.div
                  animate={{ y: colIndex % 2 === 0 ? [30, -120] : [-120, 30] }}
                  transition={{
                    duration: colIndex % 2 === 0 ? 25 : 32,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "linear",
                  }}
                  key={colIndex + "marquee"}
                  className={visibilityClass}
                >
                  <GridLineVertical className="-left-3" offset="50px" />
                  {subarray.map((image, imageIndex) => (
                    <div className="relative w-full" key={imageIndex + image}>
                      <GridLineHorizontal className="-top-3" offset="10px" />
                      <div className="rounded-xl overflow-hidden border border-white/5 bg-white/[0.01] p-1.5 shadow-xl hover:border-gold-accent/40 transition-all duration-300">
                        <MotionImage
                          whileHover={{
                            y: -6,
                            scale: 1.04,
                          }}
                          transition={{
                            duration: 0.25,
                            ease: "easeInOut",
                          }}
                          key={imageIndex + image}
                          src={image}
                          alt={`Showcase ${imageIndex + 1}`}
                          className="aspect-[4/3] w-full rounded-lg object-cover"
                          width={260}
                          height={195}
                          priority={true}
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#0a0a12",
          "--color": "rgba(245, 240, 232, 0.05)",
          "--height": "1px",
          "--width": "4px",
          "--fade-stop": "90%",
          "--offset": offset || "200px",
          "--color-dark": "rgba(245, 240, 232, 0.05)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        className,
      )}
    ></div>
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#0a0a12",
          "--color": "rgba(245, 240, 232, 0.05)",
          "--height": "4px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px",
          "--color-dark": "rgba(245, 240, 232, 0.05)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        className,
      )}
    ></div>
  );
};
