import { useContext } from "react";
import { useSearchParams } from "react-router-dom";

import { ProductPaginationContext } from "../../pages/Product/Product";

import "./Pagination.css";

function Pagination() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { totalPages } = useContext(
    ProductPaginationContext
  );

  const currentPage =
    Number(searchParams.get("page")) || 1;

  if (totalPages <= 1) {
    return null;
  }

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    const newParams =
      new URLSearchParams(searchParams);

    newParams.set("page", String(page));

    setSearchParams(newParams);
  };

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    if (currentPage <= 4) {
      return [
        1,
        2,
        3,
        4,
        5,
        "...",
        totalPages,
      ];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <section className="pagination-section">

      <button
        className="page-btn next"
        disabled={currentPage === 1}
        onClick={() =>
          goToPage(currentPage - 1)
        }
      >
        ← Trước
      </button>

      {getPageNumbers().map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`dots-${index}`}
              className="pagination-dots"
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            className={
              page === currentPage
                ? "page-btn active"
                : "page-btn"
            }
            onClick={() => goToPage(page)}
          >
            {page}
          </button>
        );
      })}

      <button
        className="page-btn next"
        disabled={currentPage === totalPages}
        onClick={() =>
          goToPage(currentPage + 1)
        }
      >
        Tiếp →
      </button>

    </section>
  );
}

export default Pagination;