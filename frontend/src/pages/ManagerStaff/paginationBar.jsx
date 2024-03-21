// PaginationBar.jsx
import React from 'react';
import { StyledPagination } from "./managerStaffStyles.jsx";
import { Pagination } from 'react-bootstrap';

const PaginationBar = ({ activePage, totalPages, handlePageChange }) => {
    const maxVisiblePages = 2;
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
    let startPage = activePage - halfMaxVisiblePages;
    let endPage = activePage + halfMaxVisiblePages;

    if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    } else if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return (
        <StyledPagination size="sm">
            <Pagination.Prev onClick={() => handlePageChange(activePage - 1)} disabled={activePage === 1} />
            {startPage > 1 && (
                <>
                    <StyledPagination.Item onClick={() => handlePageChange(1)}>1</StyledPagination.Item>
                    {startPage > 2 && <StyledPagination.Ellipsis />}
                </>
            )}
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                const page = startPage + i;
                return (
                    <StyledPagination.Item
                        key={page}
                        active={page === activePage}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </StyledPagination.Item>
                );
            })}
            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <StyledPagination.Ellipsis />}
                    <StyledPagination.Item onClick={() => handlePageChange(totalPages)}>{totalPages}</StyledPagination.Item>
                </>
            )}
            <Pagination.Next onClick={() => handlePageChange(activePage + 1)} disabled={activePage === totalPages} />
        </StyledPagination>
    );
};


export default PaginationBar;
