import React from 'react';
import { Form } from 'react-bootstrap';
import { StyledTable } from "./managerStaffStyles.jsx";

const EmployeeTable = ({ employeeData, toggleStatus }) => (
    <StyledTable className="text-center align-middle table-hover">
        <thead>
            <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {employeeData.length === 0 ? (
                <tr>
                    <td colSpan="5" className="text-center">No data to present</td>
                </tr>
            ) : (
                employeeData.map(employee => (
                    <tr key={employee._id}>
                        <td>{employee.fullName}</td>
                        <td>{employee.email}</td>
                        <td>{employee.phoneNumber}</td>
                        <td>{employee.role}</td>
                        <td>
                            <Form.Check
                                type="switch"
                                id={`custom-switch-${employee._id}`}
                                onChange={() => toggleStatus(employee._id, employee.status)}
                                checked={employee.status === 'Active'}
                            />
                        </td>
                    </tr>
                ))
            )}
        </tbody>
    </StyledTable>
);

export default EmployeeTable;
