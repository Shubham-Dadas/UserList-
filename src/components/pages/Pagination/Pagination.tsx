import React from "react";
import "./pagination.scss";

interface PaginationProps {
  handlePageClick: (data: { selected: number }) => void;
  pageCount: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  handlePageClick,
  pageCount,
  currentPage,
}) => {
  const getPageNumbers = () => {
    let pages: (number | string)[] = [];

    if (pageCount <= 4) {
      pages = Array.from({ length: pageCount }, (_, i) => i);
    } else {
     
      pages.push(0);

      if (currentPage > 2) pages.push("...");

      let start = Math.max(1, currentPage - 1);
      let end = Math.min(pageCount - 2, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < pageCount - 3) pages.push("...");
        pages.push(pageCount - 1);
      }

    return pages;
  };

  return (
    <div className="pagination-container">
      <button
        onClick={() =>
          handlePageClick({ selected: Math.max(0, currentPage - 1) })
        }
        disabled={currentPage === 0}
        className="pagination-btn prev"
      >
        ◄
      </button>

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={index} className="pagination-dots">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => handlePageClick({ selected: page as number })}
            className={`pagination-btn ${currentPage === page ? "active" : ""}`}
          >
            {Number(page) + 1}
          </button>
        )
      )}

      <button
        onClick={() =>
          handlePageClick({
            selected: Math.min(pageCount - 1, currentPage + 1),
          })
        }
        disabled={currentPage === pageCount - 1}
        className="pagination-btn next"
      >
        ►
      </button>
    </div>
  );
};

export default Pagination;
