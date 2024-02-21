import React from 'react';
import { useEmployees, usePagination } from '../Common/hooks';
import { Container, Form } from 'react-bootstrap';
import { StyledTable, StyledPagination } from './managerStaffStyles';
import 'bootstrap/dist/css/bootstrap.min.css';
import CommonNavbar from '../Common/navbar';

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
          <Form.Check
            type="switch"
            id={`admin-switch-${employee.id}`}
            label=""
            checked={employee.isAdmin}
            onChange={() => handleToggleAdmin(employee.id)}
          />
        </td>
        <td>
          <Form.Check
            type="switch"
            id={`allow-login-switch-${employee.id}`}
            label=""
            checked={employee.allowLogin}
            onChange={() => handleToggleAllowLogin(employee.id)}
          />
        </td>
      </tr>
    ));
  };

  const renderPaginationItems = () => {
    const items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <StyledPagination.Item
          key={number}
          active={number === activePage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </StyledPagination.Item>
      );
    }
    return items;
  };

  return (
    <>
      <CommonNavbar />
      <Container className="mt-4">
        <h1 className="text-center mb-4">Manager Staff</h1>
        <StyledTable className="text-center align-middle table-hover">
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
        </StyledTable>
        <StyledPagination size="sm">{renderPaginationItems()}</StyledPagination>
      </Container>
    </>
  );
};

export default EmployeeManagement;

