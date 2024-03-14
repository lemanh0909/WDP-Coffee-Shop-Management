import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const AddThuModal = ({ userId, show, onHide, handleAddThu }) => {
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
            const response = await axios.post(
                "http://localhost:5000/api/v1/receipt/create",
                formData
            );

            if (response.data.isSuccess) {
                onHide();
                handleAddThu(response.data.data);
                setFormData({
                    managerId: userId,
                    name: "",
                    date: "",
                    price: "",
                    status: "",
                    description: "",
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
                <Modal.Title>Thêm phiếu thu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Tên:</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            pattern="[a-zA-Z\s]+"
                            required
                            title="Tên sản phẩm chỉ được chứa các ký tự chữ cái và khoảng trắng."
                        />
                    </Form.Group>
                    <Form.Group controlId="formDate">
                        <Form.Label>Ngày:</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Giá:</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            step="1"
                            required
                            title="Giá phải là số nguyên dương!"
                        />
                    </Form.Group>
                    <Form.Group controlId="formStatus">
                        <Form.Label>Trạng thái:</Form.Label>
                        <Form.Control
                            as="select"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Chọn trạng thái --</option>
                            <option value="Income">Thu</option>
                            <option value="Expense">Chi</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Mô tả:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Thêm phiếu
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddThuModal;
