import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  active: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function UiPagination({
  active = 1,
  totalPages = 21,
  // totalItems = 0,
  onPageChange = () => {},
}: PaginationProps) {
  const renderPageNumbers = () => {
    const pages: React.ReactNode[] = [];
    const maxVisible = 5;

    // Always show first page
    pages.push(
      <button
        key={1}
        className={`w-12 h-12 flex items-center justify-center text-lg font-medium ${
          active === 1
            ? "bg-amber-600 text-white rounded-full"
            : "text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        }`}
        onClick={() => onPageChange(1)}
      >
        1
      </button>
    );

    // Show pages 2-5 if we have enough pages
    if (totalPages > 1) {
      for (let i = 2; i <= Math.min(maxVisible, totalPages); i++) {
        pages.push(
          <button
            key={i}
            className={`w-12 h-12 flex items-center justify-center text-lg font-medium ${
              active === i
                ? "bg-amber-600 text-white rounded-full"
                : "text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            }`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }
    }

    // Show ellipsis if there are more pages
    if (totalPages > maxVisible) {
      pages.push(
        <span key="ellipsis" className="w-12 h-12 flex items-center justify-center text-gray-500 text-lg">
          ...
        </span>
      );

      // Show last page
      pages.push(
        <button
          key={totalPages}
          className={`w-12 h-12 flex items-center justify-center text-lg font-medium ${
            active === totalPages
              ? "bg-amber-600 text-white rounded-full"
              : "text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          }`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 px-6 py-6">
      <button
        className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={() => onPageChange(active - 1)}
        disabled={active === 1}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      {renderPageNumbers()}
      
      <button
        className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={() => onPageChange(active + 1)}
        disabled={active === totalPages}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}