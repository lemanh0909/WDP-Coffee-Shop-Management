import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function AddExportModal({ show, handleClose, onAddSuccess }) {
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("Exported");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const userDataString = localStorage.getItem("userData");

      if (!userDataString) {
        throw new Error("User data not found in localStorage.");
      }
      const userData = JSON.parse(userDataString);

      const response = await axios.get(
        `http://localhost:5000/api/v1/warehouse/${userData.shopId}/getAllWarehousesInShop`
      );

      if (response.status === 200) {
        const warehouseData = response.data.data;
        setWarehouseOptions(warehouseData);
      } else {
        throw new Error("Failed to fetch warehouses.");
      }
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };

  const handleSave = async () => {
    try {
      console.log("Selected warehouse:", selectedWarehouse);

      const userDataString = localStorage.getItem("userData");
      if (!userDataString) {
        throw new Error("User data not found in localStorage.");
      }
      const userData = JSON.parse(userDataString);

      const data = {
        shopId: userData.shopId,
        warehouseId: selectedWarehouse,
        userId: userData.userID,
        quantity: quantity,
        price: 0,
        status: status,
        description: description,
      };

      const response = await axios.post(
        "http://localhost:5000/api/v1/note/createNote",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("Note created successfully:", response.data);
        onAddSuccess(response.data);
        handleClose();
      } else {
        throw new Error("Failed to create note.");
      }
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "" || (parseFloat(value) >= 0 && /^\d*\.?\d*$/.test(value))) {
      setQuantity(value);
    }
    const numericValue = value.replace(/\D/g, '');
    const isPositiveInteger = numericValue !== '' && !isNaN(numericValue) && parseInt(numericValue) >0;
  
    if (isPositiveInteger) {
      setQuantity(numericValue);
    } else {
      alert('Add at least one');
      setQuantity('1');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className="mt-10">
      <Modal.Header closeButton>
        <Modal.Title>Add Export note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="warehouseId">
            <Form.Label>Warehouse name</Form.Label>
            <Form.Control
              as="select"
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
            >
              <option value="">Choose Warehouse</option>
              {warehouseOptions.map((warehouse) => (
                <option key={warehouse._id} value={warehouse._id}>
                  {warehouse.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled
            />
            <option value="Exported" disabled>
            </option>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddExportModal;
