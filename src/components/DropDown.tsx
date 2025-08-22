"use client";

import { ReactNode, useState, useRef, useEffect } from "react";

interface DropdownMenuProps {
//   trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function DropdownMenu({
//   trigger,
  children,
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  
  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left ${className || ""}`}
    >
      <div className="w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-99">
          {children}
      </div>  
    </div>
  );
}
