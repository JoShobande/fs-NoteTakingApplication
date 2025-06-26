"use client";

import { ReactNode } from "react";

interface ModalProps {
  title?: string;
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ title, children, onClose }: ModalProps) {
  return (
    // backdrop
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* panel */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <div className="mb-6">{children}</div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-[20px] cursor-pointer"
          aria-label="Close modal"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
