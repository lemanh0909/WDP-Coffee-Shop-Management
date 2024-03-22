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
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={updatedData.name}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^[a-zA-Z0-9\s-]*$/.test(inputValue)) {
                                    setUpdatedData({ ...updatedData, name: inputValue });
                                } else {
                                    alert("The name must contain only alphabetic characters and spaces!");
                                }
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDes">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter mo ta"
                            value={updatedData.description}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^[a-zA-Z0-9\s-]*$/.test(inputValue)) {
                                    setUpdatedData({ ...updatedData, description: inputValue });
                                } else {
                                    alert("The name must contain only alphabetic characters and spaces!");
                                }
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProducts">
                        <Form.Label>Code product</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter ma san pham"
                            value={updatedData.products}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^[a-zA-Z0-9\s-]*$/.test(inputValue)) {
                                    setUpdatedData({ ...updatedData, products: inputValue });
                                } else {
                                    alert("The name must contain only alphabetic characters and spaces!");
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
