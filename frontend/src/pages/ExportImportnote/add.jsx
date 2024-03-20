import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Fakedata } from "./Fakedata.js";

function AddModal({ show, handleClose, onAddSuccess, setProducts }) {
  const [tenhanghoa, setTenhanghoa] = useState("");
  const [machanghoa, setMachanghoa] = useState(generateNewProductCode());
  const [lydo, setLydo] = useState("");
  const [dateImport, setDateImport] = useState("");
  const [dateExport, setDateExport] = useState("");
  const [soluong, setSoluong] = useState("");

  function generateNewProductCode() {
    const existingCodes = Fakedata.map((item) => item.machanghoa);
    const maxCode = Math.max(...existingCodes.map((code) => parseInt(code, 10)));
    const newCode = (maxCode + 1).toString().padStart(3, '0');
    return newCode;
  }

  const handleSave = () => {
    const newProduct = {
      tenhanghoa: tenhanghoa,
      machanghoa: machanghoa,
      lydo: lydo,
      dateImport: dateImport,
      dateExport: dateExport,
      soluong: soluong,
    };
  
    // Update the state to include the new product
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  
    // Call the callback function passed from the parent component
    onAddSuccess(newProduct);
  
    // Close the modal
    handleClose();
  };
  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm hàng hóa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="tenhanghoa">
            <Form.Label>Tên hàng hóa</Form.Label>
            <Form.Control
              type="text"
              value={tenhanghoa}
              onChange={(e) => setTenhanghoa(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="machanghoa">
            <Form.Label>Mã hàng hóa</Form.Label>
            <Form.Control
              type="text"
              value={machanghoa}
              onChange={(e) => setMachanghoa(e.target.value)}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="lydo">
            <Form.Label>Lý do</Form.Label>
            <Form.Control
              type="text"
              value={lydo}
              onChange={(e) => setLydo(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="dateImport">
            <Form.Label>Ngày nhập</Form.Label>
            <Form.Control
              type="date"
              value={dateImport}
              onChange={(e) => setDateImport(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="dateExport">
            <Form.Label>Ngày xuất</Form.Label>
            <Form.Control
              type="date"
              value={dateExport}
              onChange={(e) => setDateExport(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="soluong">
            <Form.Label>Số lượng</Form.Label>
            <Form.Control
              type="number"
              value={soluong}
              onChange={(e) => setSoluong(e.target.value)}
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

export default AddModal;
