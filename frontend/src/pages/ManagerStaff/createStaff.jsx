import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const AddWarehouseModal = ({ userId, show, onHide, handleAddWarehouse }) => {
    const [formData, setFormData] = useState({
        managerId: userId,
        email: "",
        password: "",
        fullName: "",
        dob: "",
        phoneNumber: "",
        shopName: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/v1/user/createStaff",
                formData
            );

            if (response.data.isSuccess) {
                onHide();
                handleAddWarehouse(response.data.data);
                setFormData({
                    managerId: userId,
                    email: "",
                    password: "",
                    fullName: "",
                    dob: "",
                    phoneNumber: "",
                    shopName: "",
                });
                console.log("sucessfully added");
            } else {
                console.error("Error:", response.data.message);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm tài khoản nhân viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formFullName">
                        <Form.Label>Full Name:</Form.Label>
                        <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formDob">
                        <Form.Label>Date of Birth:</Form.Label>
                        <Form.Control type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formPhoneNumber">
                        <Form.Label>Phone Number:</Form.Label>
                        <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formShopName">
                        <Form.Label>Shop Name:</Form.Label>
                        <Form.Control type="text" name="shopName" value={formData.shopName} onChange={handleChange} required />
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ marginTop: '30px' }}>
                        Create Staff
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddWarehouseModal;
