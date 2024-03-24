import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const AddWarehouseModal = ({ userId, show, onHide, handleAddWarehouse }) => {
  const [formData, setFormData] = useState({
    managerId: userId,
    name: "",
    quantity: "",
    unit: "",
    image: null,
  });

  const handleChange = async (e) => {
    e.persist();
    try {
      const { name, value, files } = e.target;

      if (
        name === "quantity" &&
        (!Number.isInteger(Number(value)) || Number(value) < 0)
      ) {
        return;
      }

      if (files && files.length > 0) {
        setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
      } else {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      }
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
      const formDataImg = new FormData();
      let newData = {
        managerId: formData.managerId,
        name: formData.name,
        quantity: formData.quantity,
        unit: formData.unit,
        image: '',
      }
      if (formData.image) {
        formDataImg.append("file", formData.image);
        formDataImg.append("upload_preset", "c1xbmqbk");
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dvusaqmma/image/upload",
          formDataImg
        );
        const imageUrl = response.data.url;
        setFormData((prevData) => ({ ...prevData, image: imageUrl }));
        newData = {
          managerId: formData.managerId,
          name: formData.name,
          quantity: formData.quantity,
          unit: formData.unit,
          image: imageUrl,
        }
      }

      const response = await axios.post(
        "http://localhost:5000/api/v1/warehouse/create",
        newData
      );

      if (response.data.isSuccess) {
        onHide();
        handleAddWarehouse(response.data.data);
        setFormData({
          managerId: userId,
          name: "",
          quantity: "",
          unit: "",
          image: null,
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
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formQuantity">
            <Form.Label>Quantity:</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
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
              <option value="piece">piece</option>
              <option value="pcs">pcs</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formImage">
            <Form.Label>Image:</Form.Label>
            <Form.Control
              type="file"
              name="image"
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
