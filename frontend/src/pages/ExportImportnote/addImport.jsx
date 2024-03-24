import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddModal({ show, handleClose, onAddSuccess }) {
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Imported");
  const [description, setDescription] = useState("");

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

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const handleSave = async () => {
    // if (price < 0) {
    //   toast.error("Giá không được nhập số âm");
    //   return;
    // }
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
        price: price,
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

  return (
    <Modal show={show} onHide={handleClose} className="mt-10">
      <Modal.Header closeButton>
        <Modal.Title>Add Import note</Modal.Title>
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
              onChange={(e) => {
                const value = e.target.value;
                if (!isNaN(value) && value >= 0) {
                  setQuantity(value);
                }
              }}
            />
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => {
                const value = e.target.value;
                if (!isNaN(value) && value >= 0) {
                  // Kiểm tra nếu giá trị là số và lớn hơn hoặc bằng 0
                  setPrice(value);
                }
              }}
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
            <option value="Imported" disabled>
              {/* Imported */}
            </option>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Mô tả</Form.Label>
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

export default AddModal;
