// src/components/Search/Pagination.jsx
import React from "react";

export const Pagination = ({
  page,
  totalPages,
  navigate,
  buildQueryWithPage,
  delayBase,
}) => {
  const getPaginationRange = () => {
    const range = [];
    const maxPages = 10;
    let start = Math.max(1, page - Math.floor(maxPages / 2));
    let end = Math.min(totalPages, start + maxPages - 1);
    start = Math.max(1, end - maxPages + 1);
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  };

  const paginationRange = getPaginationRange();
  const animationDelay = `${delayBase}s`;

  if (totalPages <= 1) return null;

  return (
    <div
      className="mt-auto pt-6 min-h-[80px] flex flex-col items-center opacity-0 animate-slideUp"
      style={{ animationDelay }}
    >
      <div className="flex gap-2">
        <button
          onClick={() =>
            page > 1 && navigate(`/search?${buildQueryWithPage(page - 1)}`)
          }
          className="px-3 py-1 text-gray-700 disabled:opacity-50"
          disabled={page === 1}
        >
          Sebelumnya
        </button>

        {paginationRange.map((p) => (
          <button
            key={p}
            onClick={() => navigate(`/search?${buildQueryWithPage(p)}`)}
            className={`px-3 py-1 rounded transition-colors duration-150 ${
              p === page
                ? "bg-blue-600 text-white font-bold"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() =>
            page < totalPages &&
            navigate(`/search?${buildQueryWithPage(page + 1)}`)
          }
          className="px-3 py-1 text-gray-700 disabled:opacity-50"
          disabled={page === totalPages}
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
};
