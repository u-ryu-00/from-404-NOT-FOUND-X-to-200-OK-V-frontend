import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 8rem;
  margin-bottom: 3rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0056a8;
  color: #FFFFFF;
  font-family: 'Darumadrop One';
  font-size: 4rem;

  position: relative;
  display: inline-block;
  font-size: 22px;
  color: white;
  border-radius: 6px;
  text-align: center;
  transition: top .01s linear;
  text-shadow: 0 1px 0 rgba(0,0,0,0.15);
  margin: 0 .2rem;
  padding: .5rem 1rem .5rem 1rem;

  &:hover {
    animation: jelly 0.5s;
  }

  @keyframes jelly {
    25% {
      transform: scale(0.9, 1.1);
    }

    50% {
      transform: scale(1.1, 0.9);
    }

    75% {
      transform: scale(0.95, 1.05);
    }
  }

  &.active {
    background-color: #FFFFFF; 
    color: #0056a8;
    border: 3px solid #0056a8;
  }
`;

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

  const getPageRange = () => {
    const maxPagesToShow = 5;
    const pageGroup = Math.ceil(currentPage / maxPagesToShow);
    const startPage = (pageGroup - 1) * maxPagesToShow + 1;
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  return (
    <Container>
      <Button type="button" onClick={() => handlePageChange(1)}>⏮</Button>
      <Button
        type="button"
        onClick={() => {
          if (currentPage > 1) {
            handlePageChange(currentPage - 1);
          }
        }}
      >
        ◀️
      </Button>
      {getPageRange().map((pageNumber) => (
        <Button
          type="button"
          key={pageNumber}
          className={currentPage === pageNumber ? 'active' : ''}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}
      <Button type="button" onClick={handleNextPage}>
        ▶️
      </Button>
      <Button type="button" onClick={handleLastPage}>⏭</Button>
    </Container>
  );
}

export default Pagination;
