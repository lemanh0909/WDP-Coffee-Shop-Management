import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const UpdateProductModal = ({ show, handleClose, productId, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdate = () => {
        axios
            .put(`http://localhost:5000/api/v1/product/${productId}/update`, formData)
            .then((response) => {
                onUpdate();
                handleClose();
            })
            .catch((error) => {
                console.error("Error updating product:", error);
            });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cập Nhật Sản Phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Tên sản phẩm</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên sản phẩm"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Nhập mô tả"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formImage">
                        <Form.Label>Link hình ảnh</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập link hình ảnh"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Cập Nhật
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateProductModal;
