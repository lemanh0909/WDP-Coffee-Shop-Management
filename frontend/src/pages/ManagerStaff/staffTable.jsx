import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { StyledTable } from "./managerStaffStyles.jsx";
import UpdateEmployee from './updateSalaryStaff.jsx';
import { toast } from 'react-toastify';

const EmployeeTable = ({ employeeData, toggleStatus, fetchData }) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

    const handleButtonClick = (employeeId) => {
        setSelectedEmployeeId(employeeId);
        setShowUpdateModal(true);
    };

    const handleUpdateSuccess = () => {
        toast.success('Update successful!')
        fetchData();
    };

    return (
        <>
            <StyledTable className="text-center align-middle table-hover">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Salary</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeData.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center">No data to present</td>
                        </tr>
                    ) : (
                        employeeData.map(employee => (
                            <tr key={employee._id}>
                                <td>{employee.fullName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phoneNumber}</td>
                                <td>{employee.salary ? new Intl.NumberFormat('vi-VN').format(employee.salary) : "0"}</td>
                                <td>
                                    <Form.Check
                                        type="switch"
                                        id={`custom-switch-${employee._id}`}
                                        onChange={() => toggleStatus(employee._id, employee.status)}
                                        checked={employee.status === 'Active'}
                                    />
                                </td>
                                <td>
                                    <Button style={{ backgroundColor: "#D2B48C" }} onClick={() => handleButtonClick(employee._id)}>Update Salary</Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </StyledTable>

            <UpdateEmployee
                employeeId={selectedEmployeeId}
                onUpdateSuccess={handleUpdateSuccess}
                onHide={() => setShowUpdateModal(false)}
                show={showUpdateModal}
            />
        </>
    );
};

export default EmployeeTable;
