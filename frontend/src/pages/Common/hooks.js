import { useState } from 'react';

export const usePagination = (items, itemsPerPage) => {
    const [activePage, setActivePage] = useState(1);

    const totalPages = items ? Math.ceil(items.length / itemsPerPage) : 0;

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    const getPaginatedItems = () => {
        if (!items) return [];
        const startIndex = (activePage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentItems = items.slice(startIndex, endIndex);
        return currentItems;
    };

    return [getPaginatedItems(), activePage, totalPages, handlePageChange];
};

export const useEmployees = (initialEmployees) => {
    const [employees, setEmployees] = useState(initialEmployees);

    const handleToggleAdmin = (id) => {
        setEmployees((prevEmployees) =>
            prevEmployees.map((employee) =>
                employee.id === id ? { ...employee, isAdmin: !employee.isAdmin } : employee
            )
        );
    };

    const handleToggleAllowLogin = (id) => {
        setEmployees((prevEmployees) =>
            prevEmployees.map((employee) =>
                employee.id === id ? { ...employee, allowLogin: !employee.allowLogin } : employee
            )
        );
    };

    return [employees, handleToggleAdmin, handleToggleAllowLogin];


};

