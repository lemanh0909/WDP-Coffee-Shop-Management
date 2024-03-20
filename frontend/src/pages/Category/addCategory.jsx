import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const AddCategoryModal = ({ userId, show, onHide, handleAddCategory }) => {
    const [formData, setFormData] = useState({
        managerId: userId,
        name: "",
        description: "",
        products: [""],
        
    });

    const handleChange = async (e) => {
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
                "http://localhost:5000/api/v1/category/create",
                formData
            );

            if (response.data.isSuccess) {
                onHide();
                handleAddCategory(response.data.data);
                setFormData({
                    managerId: userId,
                    name: "",
                    description: "",
                    products: [""],
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
                                if (/^[a-zA-Z0-9\s-]*$/.test(inputValue)) {
                                    setFormData({ ...formData, name: inputValue });
                                } else {
                                    alert("Tên sản phẩm chỉ được chứa các ký tự chữ cái và khoảng trắng!");
                                }
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDes">
                        <Form.Label>Mo Ta:</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^[a-zA-Z0-9\s-]*$/.test(inputValue)) {
                                    setFormData({ ...formData, description: inputValue });
                                } else {
                                    alert("Tên sản phẩm chỉ được chứa các ký tự chữ cái và khoảng trắng!");
                                }
                            }}
                        />
                    </Form.Group>
                   
                    <Form.Group controlId="formProduct">
                        <Form.Label>Ma sản phẩm:</Form.Label>
                        <Form.Control
                            type="text"
                            name="products"
                            value={formData.products}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^[a-zA-Z0-9\s-]*$/.test(inputValue)) {
                                    setFormData({ ...formData, products: inputValue });
                                } else {
                                    alert("Tên sản phẩm chỉ được chứa các ký tự chữ cái và khoảng trắng!");
                                }
                            }}
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

export default AddCategoryModal;
