// EmployeeManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Spinner, Alert } from 'react-bootstrap';
import CommonNavbar from '../Common/navbar.jsx';
import EmployeeTable from './staffTable.jsx';
import PaginationBar from './paginationBar';
import { usePagination } from '../Common/hooks.js';

function EmployeeManagement() {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 5;
  const [getPaginatedItems, activePage, totalPages, handlePageChange] = usePagination(employeeData, itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = localStorage.getItem('userData');

        if (!userDataString) {
          throw new Error('User data not found in localStorage.');
        }

        const userData = JSON.parse(userDataString);

        const response = await axios.get(`http://localhost:5000/api/v1/user/${userData.userID}/getStaffList`);
        setEmployeeData(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setError('An error occurred while fetching employee data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleStatus = async (employeeId, currentStatus) => {
    try {
      const userDataString = localStorage.getItem('userData');

      if (!userDataString) {
        throw new Error('User data not found in localStorage.');
      }

      const userData = JSON.parse(userDataString);
      await axios.put('http://localhost:5000/api/v1/user/staffAuthorization', {
        managerId: userData.userID,
        staffId: employeeId,
        status: currentStatus === 'Active' ? 'Inactive' : 'Active',
      });

      const updatedEmployeeData = employeeData.map(employee => {
        if (employee._id === employeeId) {
          return { ...employee, status: currentStatus === 'Active' ? 'Inactive' : 'Active' };
        }
        return employee;
      });

      setEmployeeData(updatedEmployeeData);
    } catch (error) {
      console.error('Error updating employee status:', error);
    }
  };

  return (
    <>
      <CommonNavbar />
      <Container className="mt-4">
        <h1 className="text-center mb-4 text-white">Manager Staff</h1>

        {loading && <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && (
          <>
            <EmployeeTable
              employeeData={getPaginatedItems}
              toggleStatus={toggleStatus}
            />

            <PaginationBar
              activePage={activePage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </>
        )}
      </Container>
    </>
  );
}

export default EmployeeManagement;
