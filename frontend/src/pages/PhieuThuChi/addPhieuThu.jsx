import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const AddReceiptModal = ({ userId, show, onHide, handleAddReceipt }) => {
    const [formData, setFormData] = useState({
        managerId: userId,
        name: "",
        date: "",
        price: "",
        status: "",
        description: "",
    });

    const handleChange = (e) => {
        e.persist();
        try {
            const { name, value } = e.target;
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        } catch (error) {
            console.error("Error handling change:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Submitting form data:", formData);
            const nameCreate = JSON.parse(localStorage.getItem('userData')).fullName;;

            const { name, date, price, status, description } = formData;
            const requestData = { managerId: userId, nameCreate, name, date, price, status, description };

            const response = await axios.post(
                "http://localhost:5000/api/v1/receipt/create",
                requestData
            );
            console.log("Response data:", response.data);

            if (response.data.isSuccess) {
                onHide();
                handleAddReceipt(response.data.data);
                setFormData({
                    managerId: userId,
                    name: "",
                    date: "",
                    price: "",
                    status: "",
                    description: "",
                });
                console.log("Receipt added successfully!");
            } else {
                console.error("Error:", response.data.message);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} animation={false} className="mt-10">
            <Modal.Header closeButton>
                <Modal.Title>Add Receipt</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            pattern="[a-zA-Z\s]+"
                            required
                            title="Name should contain only alphabetic characters and spaces."
                        />
                    </Form.Group>
                    <Form.Group controlId="formDate">
                        <Form.Label>Date:</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Price:</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            step="1"
                            required
                            title="Price must be a positive integer!"
                        />
                    </Form.Group>
                    <Form.Group controlId="formStatus">
                        <Form.Label>Status:</Form.Label>
                        <Form.Control
                            as="select"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Select status --</option>
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Receipt
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddReceiptModal;
