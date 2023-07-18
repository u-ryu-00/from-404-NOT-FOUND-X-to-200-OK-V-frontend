import { useState } from 'react';

function Pagination({ totalPages, onClick, setPage }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    setPage(pageNumber);

    onClick(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    handlePageChange(totalPages);
  };

  // Calculate the range of pages to display in groups of 5
  const getPageRange = () => {
    const maxPagesToShow = 5;
    const pageGroup = Math.ceil(currentPage / maxPagesToShow);
    const startPage = (pageGroup - 1) * maxPagesToShow + 1;
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  return (
    <div>
      <button type="button" onClick={() => handlePageChange(1)}>⏮</button>
      <button
        type="button"
        onClick={() => {
          if (currentPage > 1) {
            handlePageChange(currentPage - 1);
          }
        }}
      >
        ◀️
      </button>
      {getPageRange().map((pageNumber) => (
        <button
          type="button"
          key={pageNumber}
          className={currentPage === pageNumber ? 'active' : ''}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button type="button" onClick={handleNextPage}>
        ▶️
      </button>
      <button type="button" onClick={handleLastPage}>⏭</button>
      <span style={{ marginLeft: '10px' }}>
        Current Page:
        {currentPage}
      </span>
    </div>
  );
}

export default Pagination;
