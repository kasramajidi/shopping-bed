import { useState } from "react";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (totalPages < 2) return null;

  return (
    <div className="join self-end mt-5">
      {currentPage > 1 && (
        <button
          className="join-item btn-primary btn btn-outline"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
      )}

      {/* رادیو باتن‌ها برای صفحات */}
      <div className="join ">
        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;
          return (
            <input
              key={page}
              className="join-item btn  text-[rgb(57,78,106)]"
              type="radio"
              name="options"
              aria-label={String(page)}
              checked={currentPage === page}
              onChange={() => handlePageChange(page)}
            />
          );
        })}
      </div>

      {totalPages > 10 && currentPage < totalPages - 2 && (
        <button className="join-item btn btn-primary">...</button>
      )}

      {currentPage < totalPages && (
        <button
          className="join-item btn-primary btn btn-outline"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
}
