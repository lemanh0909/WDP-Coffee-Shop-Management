import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from 'axios';

function AddProductModal({ show, handleClose, onAddSuccess }) {
    const [category, setCategory] = useState("drink");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const handleSave = () => {
        const data = {
            categoryId: category === 'drink' ? '65d26f018160ec32ae0fd9fd' : '65d2761c245e8784a561d6c8',
            name: name,
            description: description,
            image: image
        };

        axios.post('http://localhost:5000/api/v1/product/create', data)
            .then(response => {
                console.log('Product added successfully:', response.data);
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
                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            as="select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="drink">Drink</option>
                            <option value="food">Food</option>
                        </Form.Control>
                    </Form.Group>
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
                    <Form.Group controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
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

export default AddProductModal;
