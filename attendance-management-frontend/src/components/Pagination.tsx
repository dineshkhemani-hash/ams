import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Reusable pagination component with first, last, next, and previous page navigation
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  // Calculate what page numbers to show
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // At most 5 pages to display
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust start page if we are near the end
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-center space-x-2 mt-6">
        {/* Previous page button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          Prev
        </button>

        {/* First page button (if not in view) */}
        {renderPageNumbers()[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                currentPage === 1
                  ? "bg-gray-900/10 dark:bg-gray-100/10 text-gray-900 dark:text-gray-100 font-medium"
                  : "hover:bg-gray-900/5 dark:hover:bg-gray-100/5 text-gray-600 dark:text-gray-400"
              }`}
              aria-label="First page"
            >
              1
            </button>
            {renderPageNumbers()[0] > 2 && (
              <span className="px-2 text-gray-600 dark:text-gray-400">...</span>
            )}
          </>
        )}

        {/* Page number buttons */}
        {renderPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg ${
              currentPage === pageNum
                ? "bg-gray-900/10 dark:bg-gray-100/10 text-gray-900 dark:text-gray-100 font-medium"
                : "hover:bg-gray-900/5 dark:hover:bg-gray-100/5 text-gray-600 dark:text-gray-400"
            }`}
            aria-label={`Page ${pageNum}`}
            aria-current={currentPage === pageNum ? "page" : undefined}
          >
            {pageNum}
          </button>
        ))}

        {/* Last page button (if not in view) */}
        {renderPageNumbers()[renderPageNumbers().length - 1] < totalPages && (
          <>
            {renderPageNumbers()[renderPageNumbers().length - 1] <
              totalPages - 1 && (
              <span className="text-gray-500 dark:text-gray-400">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-900/5 dark:hover:bg-gray-100/5 text-gray-600 dark:text-gray-400"
              aria-label="Last page"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next page button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          Next
        </button>
      </div>

      {/* Current page indicator */}
      <div className="text-center my-4 text-sm text-gray-500 dark:text-gray-400">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;
