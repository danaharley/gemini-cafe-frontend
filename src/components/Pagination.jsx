import React from "react";
import { DOTS, usePagination } from "../hooks/usePagination";
import Button from "./Button";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const Pagination = ({
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  onNext,
  onPrev,
  onPage,
  disabled,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center space-x-2 text-neutral-800">
        <div>
          <Button
            outline
            icon={FiChevronsLeft}
            onClick={onPrev}
            disabled={currentPage === 1}
          />
        </div>
        <div className="flex h-8 rounded-full bg-gray-200 font-medium md:h-11">
          {paginationRange.map((pageNumber, i) => {
            if (pageNumber === DOTS) {
              <div class="hidden w-11 cursor-pointer items-center justify-center rounded-full leading-5 transition duration-150 ease-in md:flex">
                &#8230;
              </div>;
            }

            return (
              <div
                key={i}
                onClick={() => onPage(pageNumber)}
                className={`hidden w-11 cursor-pointer items-center justify-center rounded-full leading-5 transition duration-150 ease-in md:flex ${
                  pageNumber === currentPage && "bg-indigo-600 text-white"
                }`}
              >
                {pageNumber}
              </div>
            );
          })}
          <div className="flex w-8 cursor-pointer items-center justify-center rounded-full bg-indigo-600 leading-5 text-white transition duration-150 ease-in md:hidden">
            {currentPage}
          </div>
        </div>
        <div>
          <Button
            outline
            icon={FiChevronsRight}
            onClick={onNext}
            disabled={currentPage === lastPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
