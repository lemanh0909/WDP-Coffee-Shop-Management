import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from 'axios';

function AddCategoryModal({ show, handleClose, onAddSuccess }) {
   
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [product, setProducts] = useState("");

    const handleSave = () => {
        const data = {
           
            name: name,
            description: description,
            product: product
        };

        axios.post('http://localhost:5000/api/v1/category/create', data)
            .then(response => {
                console.log('category added successfully:', response.data);
                onAddSuccess();
            })
            .catch(error => {
                console.error('Error adding product:', error);
            });

        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="product">
                        <Form.Label>Product</Form.Label>
                        <Form.Control
                            type="text"
                            value={product.name}
                            onChange={(e) => setProducts(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddCategoryModal;
