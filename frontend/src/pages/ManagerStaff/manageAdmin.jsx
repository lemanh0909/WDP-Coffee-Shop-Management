import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Spinner, Alert, Row, Col } from 'react-bootstrap';
import EmployeeTable from './manageTable.jsx';
import PaginationBar from './paginationBar';
import { usePagination } from '../Common/hooks.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../Common/Authorization.js';
import { useNavigate } from 'react-router-dom';

function AdminManagement() {
    const [role] = useAuth();
    const navigate = useNavigate();
    if (role != "Admin") { navigate("/"); }
    const [employeeData, setEmployeeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const itemsPerPage = 7;
    const [getPaginatedItems, activePage, totalPages, handlePageChange] = usePagination(employeeData, itemsPerPage);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/user/getManagerList`);
            setEmployeeData(response.data);
        } catch (error) {
            console.error('Error fetching employee data:', error);
            setError('An error occurred while fetching employee data.');
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (employeeId, currentStatus) => {
        try {
            await axios.put('http://localhost:5000/api/v1/user/managerAuthorization', {
                managerId: employeeId,
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
            <Container className="mt-4">
                <ToastContainer position='top-right' />
                <Row className="justify-content-between align-items-center mb-4">
                    <Col xs={12}>
                        <h1 className="text-center mb-0 text-white">Management login rights</h1>
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
                    </>
                )}
            </Container>
        </>

    );
}

export default AdminManagement;
