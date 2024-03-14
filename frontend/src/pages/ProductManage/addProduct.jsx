import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from 'axios';

function AddProductModal({ categories, show, handleClose, onAddSuccess }) {
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);


    const handleSave = async () => {
        try {
            const productUrls = [];
            for (let i = 0; i < images.length; i++) {
                const formData = new FormData();
                formData.append("file", images[i]);
                formData.append("upload_preset", "c1xbmqbk");
                const response = await axios.post("https://api.cloudinary.com/v1_1/dvusaqmma/image/upload", formData);
                productUrls.push(response.data.url);
            }
    
            // Xây dựng dữ liệu sản phẩm
            const productData = {
                categoryId: category,
                name: name,
                description: description,
                image: productUrls, // Sử dụng mảng các URL ảnh tải lên từ Cloudinary
            };
            // Gọi API tạo sản phẩm
            const updateProductResponse = await axios.post("http://localhost:5000/api/v1/product/create", productData);
    
            // Xử lý kết quả từ việc tạo sản phẩm
            console.log("Created product:", updateProductResponse.data);
            onAddSuccess();
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    
        handleClose();
    };
    


    const handleRemoveImage = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
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
                            {categories?.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
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
                    <Form.Group controlId="images">
                        <Form.Label>Images</Form.Label>
                        <div className="flex flex-wrap">
                            {images.map((image, index) => (
                                <div key={index} className="relative mr-2 mb-2 w-24 h-24 overflow-hidden">
                                    <img className="w-100 h-100 object-cover" src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} />
                                    <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white bg-opacity-70 flex items-center justify-center cursor-pointer" onClick={() => handleRemoveImage(index)}>
                                        <i className="fas fa-times text-red-500"></i>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Form.Control
                            type="file"
                            multiple
                            onChange={(e) => {
                                const selectedFiles = Array.from(e.target.files);
                                setImages([...images, ...selectedFiles]); // Thêm các tập tin được chọn vào mảng images
                            }}
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
