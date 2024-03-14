// PaginationBar.jsx
import React from 'react';
import { StyledPagination } from "./managerStaffStyles.jsx";
import { Pagination } from 'react-bootstrap';

const PaginationBar = ({ activePage, totalPages, handlePageChange }) => (
    <StyledPagination size="sm">
        <Pagination.Prev onClick={() => handlePageChange(activePage - 1)} disabled={activePage === 1} />
        {Array.from({ length: totalPages }, (_, i) => (
            <StyledPagination.Item
                key={i + 1}
                active={i + 1 === activePage}
                onClick={() => handlePageChange(i + 1)}
            >
                {i + 1}
            </StyledPagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(activePage + 1)} disabled={activePage === totalPages} />
    </StyledPagination>
);

export default PaginationBar;
