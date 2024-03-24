import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const AddWarehouseModal = ({ userId, show, onHide, handleAddWarehouse }) => {
  const [formData, setFormData] = useState({
    managerId: userId,
    name: "",
    quantity: "",
    unit: "",
    image: "",
  });

  const handleChange = async (e) => {
    e.persist();
    try {
      const { name, value } = e.target;

      if (
        name === "quantity" &&
        (!Number.isInteger(Number(value)) || Number(value) < 0)
      ) {
        return;
      }

      setFormData((prevData) => ({ ...prevData, [name]: value }));
    } catch (error) {
      console.error("Error handling change:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !Number.isInteger(Number(formData.quantity)) ||
      Number(formData.quantity) < 0
    ) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/warehouse/create",
        formData
      );

      if (response.data.isSuccess) {
        onHide();
        handleAddWarehouse(response.data.data);
        setFormData({
          managerId: userId,
          name: "",
          quantity: "",
          unit: "",
          image: "",
        });
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} animation={false} className="mt-10">
      <Modal.Header closeButton>
        <Modal.Title>Add Product into warehouse </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Product Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(inputValue)) {
                  setFormData({ ...formData, name: inputValue });
                } else {
                  alert(
                    "Product names must contain only alphabetic characters and spaces!"
                  );
                }
              }}
            />
          </Form.Group>
          <Form.Group controlId="formQuantity">
            <Form.Label>Quantity:</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (/^[1-9]\d*$/.test(inputValue)) {
                  setFormData({ ...formData, quantity: inputValue });
                } else {
                  alert("The quantity must be a positive integer!");
                }
              }}
            />
          </Form.Group>
          <Form.Group controlId="formUnit">
            <Form.Label>Unit:</Form.Label>
            <Form.Control
              as="select"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
            >
              <option value="">Choose Unit</option>
              <option value="gam">gam</option>
              <option value="ml">ml</option>
              <option value="cái">piece</option>
              <option value="chiếc">pcs</option>
            </Form.Control>
          </Form.Group>

          {/* <Form.Group controlId="expiry">
            <Form.Label>Product's shelf life:</Form.Label>
            <Form.Control
              type="date"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
            />
          </Form.Group> */}
          <Form.Group controlId="formImage">
            <Form.Label>Image Link:</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddWarehouseModal;
