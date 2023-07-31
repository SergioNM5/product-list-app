import React, { useState } from "react";

interface PaginationInterface {
  totalItems: number;
  itemsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  setCurrentPage,
  currentPage,
}: PaginationInterface) => {
  let pages: number[] = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="w-full flex justify-center gap-4">
      {pages.map((page, index) => {
        return (
          <button
            className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ${
              +page === +currentPage ? "bg-blue-800" : "bg-blue-500"
            }`}
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
