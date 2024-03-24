import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateEmployee = ({ employeeId, onUpdateSuccess, onHide, show }) => {
    const [newSalary, setNewSalary] = useState('');

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/v1/user/${employeeId}/update`, { salary: newSalary });
            if (response.status === 200) {
                onUpdateSuccess();
                onHide();
                setNewSalary('');
            } else {
                console.error('Error updating employee:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    const handleCloseModal = () => {
        onHide();
        setNewSalary('');
    };

    return (
        <Modal show={show} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Update Salary</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formSalary">
                    <Form.Label>New Salary</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter new salary"
                        value={newSalary}
                        onChange={(e) => setNewSalary(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateEmployee;
