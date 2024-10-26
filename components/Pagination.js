import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const pages = [...Array(totalPages)].map((_, index) => index + 1); 

  return (
    <Pagination>
      <Pagination.Prev 
        onClick={() => handlePageClick(currentPage - 1)} 
        disabled={currentPage === 1} 
      />
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Next 
        onClick={() => handlePageClick(currentPage + 1)} 
        disabled={currentPage === totalPages} 
      />
    </Pagination>
  );
};

export default PaginationComponent;
