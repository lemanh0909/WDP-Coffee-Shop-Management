import React from 'react';
import { useEmployees, usePagination } from './hooks';
import { Table, Badge, Tooltip, Pagination, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './managerStaff.css';

const ToggleBadge = ({ value, onClick, textTrue, textFalse }) => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>{value ? textTrue : textFalse}</Tooltip>}
    >
      <Badge
        bg={value ? 'success' : 'secondary'}
        onClick={onClick}
        className="toggle-badge"
      >
        <FontAwesomeIcon icon={value ? faCheck : faTimes} />
      </Badge>
    </OverlayTrigger>
  );
};

const EmployeeManagement = () => {
  const initialEmployees = [
    { id: 1, login: 'admin', name: 'Admin1', email: 'admin@example.com', phone: '1900633680', isAdmin: true, allowLogin: true },
    { id: 2, login: 'user1', name: 'Nguyen Van A1', email: 'user1@example.com', phone: '1900633681', isAdmin: false, allowLogin: true },
    { id: 3, login: 'user2', name: 'Tran Thi B2', email: 'user2@example.com', phone: '1900633682', isAdmin: false, allowLogin: false },
    { id: 4, login: 'user4', name: 'Tran Thi B3', email: 'user2@example.com', phone: '1900633682', isAdmin: false, allowLogin: false },
    { id: 5, login: 'user5', name: 'Tran Thi B4', email: 'user2@example.com', phone: '1900633682', isAdmin: false, allowLogin: false },
    { id: 6, login: 'user6', name: 'Tran Thi B5', email: 'user2@example.com', phone: '1900633682', isAdmin: false, allowLogin: false },
    { id: 7, login: 'user7', name: 'Tran Thi B6', email: 'user2@example.com', phone: '1900633682', isAdmin: false, allowLogin: false },
    { id: 8, login: 'user8', name: 'Tran Thi B7', email: 'user2@example.com', phone: '1900633682', isAdmin: false, allowLogin: false },
    { id: 9, login: 'user9', name: 'Tran Thi B7', email: 'user2@example.com', phone: '1900633682', isAdmin: false, allowLogin: false },
    { id: 10, login: 'user10', name: 'Tran Thi B9', email: 'user2@example.com', phone: '1900633682', isAdmin: false, allowLogin: false },
    { id: 11, login: 'user11', name: 'Tran Thi B10', email: 'user2@example.com', phone: '1900633682', isAdmin: false, allowLogin: false },
  ];

  const [employees, handleToggleAdmin, handleToggleAllowLogin] = useEmployees(
    initialEmployees
  );

  const [currentItems, activePage, totalPages, handlePageChange] = usePagination(
    employees,
    5
  );

  const renderTableRows = () => {
    return currentItems.map((employee) => (
      <tr key={employee.id}>
        <td>{employee.login}</td>
        <td>{employee.name}</td>
        <td>{employee.email}</td>
        <td>{employee.phone}</td>
        <td>
          <ToggleBadge
            value={employee.isAdmin}
            onClick={() => handleToggleAdmin(employee.id)}
            textTrue="Admin right"
            textFalse="Not admin right"
          />
        </td>
        <td>
          <ToggleBadge
            value={employee.allowLogin}
            onClick={() => handleToggleAllowLogin(employee.id)}
            textTrue="Allow"
            textFalse="Not allow"
          />
        </td>
      </tr>
    ));
  };

  const renderPaginationItems = () => {
    const items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === activePage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Manager Staff</h1>
      <Table
        responsive="sm"
        striped
        bordered
        hover
        size="sm"
        className="text-center align-middle"
      >
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Admin rights</th>
            <th>Allow login</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </Table>
      <div className="pagination-container d-flex justify-content-center mt-4">
        <Pagination size="sm">{renderPaginationItems()}</Pagination>
      </div>
    </div>
  );
};

export default EmployeeManagement;
