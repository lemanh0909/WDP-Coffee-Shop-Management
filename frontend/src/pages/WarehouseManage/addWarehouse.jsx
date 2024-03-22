import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const AddWarehouseModal = ({ userId, show, onHide, handleAddWarehouse }) => {
    const [formData, setFormData] = useState({
        managerId: userId,
        name: "",
        quantity: "",
        unit: "",
        image: "",
    });

    const handleChange = async (e) => {
        e.persist();
        try {
            const { name, value } = e.target;

            if (name === 'quantity' && (!Number.isInteger(Number(value)) || Number(value) < 0)) {
                return;
            }

            setFormData((prevData) => ({ ...prevData, [name]: value }));
        } catch (error) {
            console.error("Error handling change:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!Number.isInteger(Number(formData.quantity)) || Number(formData.quantity) < 0) {
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/v1/warehouse/create",
                formData
            );

            if (response.data.isSuccess) {
                onHide();
                handleAddWarehouse(response.data.data);
                setFormData({
                    managerId: userId,
                    name: "",
                    quantity: "",
                    unit: "",
                    image: "",
                });
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
                <Modal.Title>Thêm sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Tên sản phẩm:</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^[a-zA-Z\s]*$/.test(inputValue)) {
                                    setFormData({ ...formData, name: inputValue });
                                } else {
                                    alert("Tên sản phẩm chỉ được chứa các ký tự chữ cái và khoảng trắng!");
                                }
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formQuantity">
                        <Form.Label>Số lượng:</Form.Label>
                        <Form.Control
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^[1-9]\d*$/.test(inputValue)) {
                                    setFormData({ ...formData, quantity: inputValue });
                                } else {
                                    alert("Số lượng phải là số nguyên dương!");
                                }
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formUnit">
                        <Form.Label>Đơn vị:</Form.Label>
                        <Form.Control
                            type="text"
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="expiry">
                        <Form.Label>Hạn sử dụng:</Form.Label>
                        <Form.Control
                            type="date"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formImage">
                        <Form.Label>Đường dẫn ảnh:</Form.Label>
                        <Form.Control
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Thêm sản phẩm
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddWarehouseModal;
