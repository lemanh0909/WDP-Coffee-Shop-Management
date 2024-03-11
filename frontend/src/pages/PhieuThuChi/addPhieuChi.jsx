import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from 'axios';

function AddPhieuChiModal({ show, handleClose, onAddSuccess }) {
  const [nguoinop, setNguoinop] = useState("");
  const [hangmucthuchi, setHangmucthuchi] = useState("");
  const [lido, setLido] = useState("");
  const [date, setDate] = useState("");
  const [giatri, setGiatri] = useState("");
  const [hinhthuc, setHinhthuc] = useState("");

  const handleSave = () => {
    const data = {
      nguoinop: nguoinop,
      hangmucthuchi: hangmucthuchi,
      lido: lido,
      date: date,
      giatri: giatri,
      hinhthuc: hinhthuc
    };

    axios.post('http://localhost:5000/api/v1/phieuchi/create', data)
      .then(response => {
        console.log('Phiếu chi đã được thêm thành công:', response.data);
        onAddSuccess();
      })
      .catch(error => {
        console.error('Lỗi khi thêm phiếu chi:', error);
      });

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm phiếu chi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="nguoinop">
            <Form.Label>Người nộp</Form.Label>
            <Form.Control type="text" value={nguoinop} onChange={(e) => setNguoinop(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="hangmucthuchi">
            <Form.Label>Hạng mục thu chi</Form.Label>
            <Form.Control type="text" value={hangmucthuchi} onChange={(e) => setHangmucthuchi(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="lido">
            <Form.Label>Lý do</Form.Label>
            <Form.Control as="textarea" rows={3} value={lido} onChange={(e) => setLido(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Ngày giao dịch</Form.Label>
            <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="giatri">
            <Form.Label>Giá trị</Form.Label>
            <Form.Control type="number" value={giatri} onChange={(e) => setGiatri(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="hinhthuc">
            <Form.Label>Hình thức</Form.Label>
            <Form.Control type="text" value={hinhthuc} onChange={(e) => setHinhthuc(e.target.value)} />
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

export default AddPhieuChiModal;
