"use client";

import type React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  active: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  active = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange = () => {},
}: PaginationProps) {
  const pages: React.ReactNode[] = [];
  const visiblePages = 4;
  for (let i = 1; i <= Math.min(visiblePages, totalPages); i++) {
    pages.push(
      <button
        key={i}
        className={`w-8 h-8 flex items-center justify-center ${active === i ? "bg-[#0f3d3e] text-white rounded-full" : "text-gray-600 hover:bg-gray-100 rounded"}`}
        onClick={() => onPageChange(i)}
        disabled={active === i}
      >
        {i}
      </button>
    );
  }

  // Calculate showing range
  const start = totalItems === 0 ? 0 : (active - 1) * 10 + 1;
  const end = Math.min(active * 10, totalItems);

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
      <p className="text-sm text-gray-600">Showing {start} to {end} of {totalItems} entries</p>
      <div className="flex items-center gap-1">
        <button
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded"
          onClick={() => onPageChange(active - 1)}
          disabled={active === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        {pages}
        <button
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded"
          onClick={() => onPageChange(active + 1)}
          disabled={active === totalPages}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
