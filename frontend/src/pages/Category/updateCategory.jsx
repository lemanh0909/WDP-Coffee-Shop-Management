import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function UpdateCategoryModal({ categoryId, categoryData, onUpdateSuccess, onHide }) {
    const [updatedData, setUpdatedData] = useState({
        name: "",
        description: "",
        products: [""],
    });

    useEffect(() => {
        if (categoryData) {
            setUpdatedData({
                name: categoryData.name,
                description: categoryData.description,
                products: categoryData.products,
            });
        }
    }, [categoryData]);

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/api/v1/category/${categoryId}/updateBasis`, updatedData);
            onUpdateSuccess();
            console.log(onUpdateSuccess())
            onHide();
        } catch (error) {
            console.error('Error updating category data:', error);
        }
    };

    return (
        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Update Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Tên loại sản phẩm</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên"
                            value={updatedData.name}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                
                                    setUpdatedData({ ...updatedData, name: inputValue });
                                
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDes">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập mô tả"
                            value={updatedData.description}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                               
                                    setUpdatedData({ ...updatedData, description: inputValue });
                               
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProducts">
                        <Form.Label>Mã sản phẩm</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập mã sản phẩm"
                            value={updatedData.products}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^[a-zA-Z0-9\s-]*$/.test(inputValue)) {
                                    setUpdatedData({ ...updatedData, products: inputValue });
                                } else {
                                    alert("Mã chỉ được chứa các ký tự chữ cái và khoảng trắng!");
                                }
                            }}
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

export default UpdateCategoryModal;
