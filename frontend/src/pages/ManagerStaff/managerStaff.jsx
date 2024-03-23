import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Spinner, Alert, Button, Row, Col } from 'react-bootstrap';
import EmployeeTable from './staffTable.jsx';
import PaginationBar from './paginationBar';
import { usePagination } from '../Common/hooks.js';
import CreateStaffModal from './createStaff.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../Common/Authorization.js';
import { useNavigate } from 'react-router-dom';

function EmployeeManagement() {
  const [role] = useAuth();
  const navigate = useNavigate();
  if (role == "Admin") { navigate("/adminManagement"); }
  else {
    if (role == "Staff") {
      navigate("/control")
    }
  }
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const itemsPerPage = 7;
  const [getPaginatedItems, activePage, totalPages, handlePageChange] = usePagination(employeeData, itemsPerPage);

  useEffect(() => {
    fetchData();
  }, []);



  const fetchData = async () => {
    try {
      const userDataString = localStorage.getItem('userData');

      if (!userDataString) {
        throw new Error('Insufficient permissions to use this function');
      }

      const userData = JSON.parse(userDataString);

      const response = await axios.get(`http://localhost:5000/api/v1/user/${userData.userID}/getStaffList`);
      setEmployeeData(response.data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
      setError('Insufficient permissions to use this function');
    } finally {
      setLoading(false);
    }
  };

  const handleAddWarehouse = () => {
    setShowAddModal(false);
    toast.success('Thêm nhân viên thành công!');
    fetchData();
  };

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
      toast.success('Update thành công!');
    } catch (error) {
      console.error('Error updating employee status:', error);
    }
  };

  return (
    <>
      <CommonNavbar />
      <Container className="mt-4">
        <ToastContainer position='top-right' />
        <Row className="justify-content-between align-items-center mb-4">
          <Col xs={6}>
            <h1 className="text-center mb-0 text-white">Staff login rights</h1>
          </Col>
          <Col xs={6} className="text-right">
            {role == "Manager" && (
              <Button style={{ backgroundColor: "#8b5a2b" }} variant="primary" className="add-btn btn-color" onClick={() => setShowAddModal(true)}>
                <i className="fa-solid fa-plus"></i> Create account
              </Button>
            )}
          </Col>
        </Row>

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
            <CreateStaffModal
              userId={JSON.parse(localStorage.getItem('userData'))?.userID}
              show={showAddModal}
              onHide={() => setShowAddModal(false)}
              handleAddWarehouse={handleAddWarehouse}
            />

          </>
        )}
      </Container>
    </>
  );
}

export default EmployeeManagement;
