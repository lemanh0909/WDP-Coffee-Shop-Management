// UpdateWarehouseModal.jsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function UpdateWarehouseModal({ warehouseId, onUpdateSuccess, onHide }) {
    const [updatedData, setUpdatedData] = useState({
        name: "",
        unit: "",
        image: "",

    });

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/api/v1/warehouse/${warehouseId}/updateBasis`, updatedData);
            onUpdateSuccess();
            onHide();
        } catch (error) {
            console.error('Error updating warehouse data:', error);
        }
    };

    return (
        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Update Warehouse</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={updatedData.name}
                            onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formUnit">
                        <Form.Label>Unit</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter unit"
                            value={updatedData.unit}
                            onChange={(e) => setUpdatedData({ ...updatedData, unit: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter image URL"
                            value={updatedData.image}
                            onChange={(e) => setUpdatedData({ ...updatedData, image: e.target.value })}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateWarehouseModal;
