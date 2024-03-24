import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { StyledTable } from "./managerStaffStyles.jsx";

const EmployeeTable = ({ employeeData, toggleStatus, handleButtonClick }) => (
    <StyledTable className="text-center align-middle table-hover">
        <thead>
            <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Action</th> {/* Thêm cột mới */}
            </tr>
        </thead>
        <tbody>
            {employeeData.length === 0 ? (
                <tr>
                    <td colSpan="6" className="text-center">No data to present</td> {/* Cập nhật số cột */}
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
                            <Button onClick={() => handleButtonClick(employee._id)}>Action</Button>
                        </td>
                    </tr>
                ))
            )}
        </tbody>
    </StyledTable>
);

export default EmployeeTable;
