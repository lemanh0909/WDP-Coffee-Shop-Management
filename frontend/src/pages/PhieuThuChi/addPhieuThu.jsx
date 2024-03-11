import React, { useState } from "react";
import { Modal, Button,ButtonGroup, Form } from "react-bootstrap";
import axios from 'axios';

function AddPhieuThuModal({ show, handleClose, onAddSuccess }) {
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("");

    const handleSave = () => {
        const data = {
            userId: username,
            name: username,
            date: date,
            price: price,
            status: status,
            description: description
        };

        axios.post('http://localhost:5000/api/v1/receipt/create', data)
            .then(response => {
                console.log('Receipt created successfully:', response.data);
                onAddSuccess();
            })
            .catch(error => {
                console.error('Error creating receipt:', error);
            });

        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm phiếu thu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="username">
                        <Form.Label>Người nộp</Form.Label>
                        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Miêu tả thu/chi dùng texterea</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="date">
                        <Form.Label>Ngày giao dịch</Form.Label>
                        <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Giá trị</Form.Label>
                        <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="status">
                        <Form.Label>Trạng thái thu hoặc chi</Form.Label>
                        <ButtonGroup>
    <Button 
        variant={status === "Imported" ? "primary" : "outline-primary"} 
        onClick={() => setStatus("Imported")}
        className={status === "Imported" ? "bg-blue-500 text-white" : "bg-white text-blue-500 border-blue-500"}
    >
        Thu
    </Button>
    <Button 
        variant={status === "Exported" ? "primary" : "outline-primary"} 
        onClick={() => setStatus("Exported")}
        className={status === "Exported" ? "bg-blue-500 text-white" : "bg-white text-blue-500 border-blue-500"}
    >
        Chi
    </Button>
</ButtonGroup>

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

export default AddPhieuThuModal;
