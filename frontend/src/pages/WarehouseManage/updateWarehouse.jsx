import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function UpdateWarehouseModal({ warehouseId, warehouseData, onUpdateSuccess, onHide }) {
    const [updatedData, setUpdatedData] = useState({
        _id: warehouseId,
        name: "",
        unit: "",
        image: "",
    });

    useEffect(() => {
        if (warehouseData) {
            setUpdatedData({ ...warehouseData });
        }
    }, [warehouseData]);

    const handleUpdate = async () => {
        try {
            let newData = { ...updatedData };
            if (updatedData.image && typeof updatedData.image !== 'string') {
                const formDataImg = new FormData();
                formDataImg.append("file", updatedData.image);
                formDataImg.append("upload_preset", "c1xbmqbk");
                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dvusaqmma/image/upload",
                    formDataImg
                );
                const imageUrl = response.data.url;
                newData.image = imageUrl;
            }

            await axios.put(`http://localhost:5000/api/v1/warehouse/update`, newData);
            onUpdateSuccess();
            onHide();
        } catch (error) {
            console.error('Error updating warehouse data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files && files.length > 0) {
            setUpdatedData((prevData) => ({
                ...prevData,
                [name]: files[0]
            }));
        } else {
            setUpdatedData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    return (
        <Modal show={true} onHide={onHide} className="mt-10">
            <Modal.Header closeButton>
                <Modal.Title>Update Warehouse</Modal.Title>
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
                                if (/^[a-zA-Z\s]*$/.test(inputValue)) {
                                    setUpdatedData({ ...updatedData, name: inputValue });
                                } else {
                                    alert("Names must contain only alphabetic characters and spaces!");
                                }
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formUnit">
                        <Form.Label>Unit</Form.Label>
                        <Form.Control
                            as="select"
                            name="unit"
                            value={updatedData.unit}
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
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            name="image"
                            onChange={handleChange}
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

export default UpdateWarehouseModal;
