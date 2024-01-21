import { useState } from 'react';

export const usePagination = (items, itemsPerPage) => {
    const [activePage, setActivePage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    const getPaginatedItems = () => {
        const indexOfLastItem = activePage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
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
