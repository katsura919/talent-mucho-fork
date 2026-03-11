"use client";
import React, { SVGProps, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyBanner = ({
  className,
  children,
  hideOnScroll = false,
}: {
  className?: string;
  children: React.ReactNode;
  hideOnScroll?: boolean;
}) => {
  const [open, setOpen] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log(latest);
    if (hideOnScroll && latest > 40) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  });

  return (
    <motion.div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden",
        className,
      )}
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: open ? "auto" : 0,
        opacity: open ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="min-h-14 flex items-center justify-center w-full px-4 py-2">
        {children}
      </div>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: open ? 1 : 0 }}
        className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer z-10"
        onClick={() => setOpen(false)}
      >
        <CloseIcon className="h-5 w-5 text-beige-50 hover:text-white transition-colors" />
      </motion.button>
    </motion.div>
  );
};

const CloseIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};
