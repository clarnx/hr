import React from 'react';

const Pagination = ({ currentPage, totalPages, prevPage, nextPage, setCurrentPage }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center gap-1 w-full bg-white py-6">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-300 h-10 w-20 rounded-md cursor-pointer outline-none"
      >
        Previous
      </button>
      <div className="flex gap-1">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`${
              currentPage === pageNumber
                ? 'bg-[#cc3115] text-white'
                : 'bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-300'
            } h-10 w-10 flex items-center justify-center rounded-full cursor-pointer outline-none`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-300 h-10 w-20 rounded-md cursor-pointer outline-none"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
