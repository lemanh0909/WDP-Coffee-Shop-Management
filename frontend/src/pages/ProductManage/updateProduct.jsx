import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import axios from 'axios';
import RecipeModal from "./recipe.jsx";

function UpdateProductModal({ categories, show, handleClose, onUpdate, productInfo, warehouse }) {
    const category = productInfo.category._id;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [size, setSize] = useState("None");
    const [price, setPrice] = useState("");
    const [addedRecipes, setAddedRecipes] = useState([]);

    useEffect(() => {
        setName(productInfo.name || "");
        setDescription(productInfo.description || "");
        setImages(productInfo.image);
        setSize(productInfo.size || "None");
        setPrice(productInfo.price || "");
        setAddedRecipes(productInfo.recipe || []);
    }, [productInfo]);

    const handleRecipeAdded = (products) => {
        setAddedRecipes(products);
    };

    const [showRecipeModal, setShowRecipeModal] = useState(false);

    const handleSave = async () => {
        try {
            if (name === "" || !name) {
                return console.log("Name cannot be empty!");
            }

            // Xác định các ảnh đã tồn tại trước đó
            const existingImages = images.filter(image => typeof image === 'string');

            // Tạo một mảng mới chứa các đường dẫn của các ảnh mới và các ảnh đã tồn tại
            const updatedImages = [...existingImages];

            // Lặp qua các ảnh mới được chọn từ file input và thêm vào mảng updatedImages
            for (const newImage of images) {
                if (newImage instanceof File) {
                    // Tải ảnh mới lên Cloudinary và lấy đường dẫn
                    const formData = new FormData();
                    formData.append('file', newImage);
                    formData.append('upload_preset', 'c1xbmqbk'); // Thay thế bằng upload preset của bạn

                    const response = await axios.post(
                        "https://api.cloudinary.com/v1_1/dvusaqmma/image/upload",
                        formData
                    );

                    updatedImages.push(response.data.secure_url);
                }
            }

            const productData = {
                productId: productInfo._id,
                categoryId: category,
                name: name,
                description: description,
                size: size,
                price: price,
                image: updatedImages,
                recipe: addedRecipes
            };

            console.log(productData);

            const updateProductResponse =
                await axios.put(`http://localhost:5000/api/v1/product/updateVariant`, productData);

            console.log("Updated product:", updateProductResponse.data);

            onUpdate();
            handleClose();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };


    const handleRemoveImage = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    const handleAddRecipe = () => {
        setShowRecipeModal(true);
    };


    const handleModalClose = () => {
        setName(productInfo.name || "");
        setDescription(productInfo.description || "");
        setImages(productInfo.image);
        setSize(productInfo.size || "None");
        setPrice(productInfo.price || "");
        setAddedRecipes(productInfo.recipe || []);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="gap-2">
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

                    <Form.Group controlId="size">
                        <Form.Label>Size</Form.Label>
                        <Form.Control
                            as="select"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                        >
                            <option value="None">None</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="images">
                        <Form.Label>Images</Form.Label>
                        <div className="flex flex-wrap">
                            {images.map((image, index) => (
                                <div key={index} className="relative mr-2 mb-2 w-24 h-24 overflow-hidden">
                                    <img className="w-100 h-100 object-cover"
                                        src={typeof image === 'object' ? URL.createObjectURL(image) : image}
                                        alt={`Image ${index + 1}`} />
                                    <div className="absolute top-1 right-1 w-5 h-5 
                    rounded-full bg-white bg-opacity-70 flex items-center 
                    justify-center cursor-pointer" onClick={() => handleRemoveImage(index)}>
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
                                setImages([...images, ...selectedFiles]);
                            }}
                        />
                    </Form.Group>

                    <div className="my-2">
                        <Button variant="primary" onClick={handleAddRecipe}>
                            Change Recipe
                        </Button>
                    </div>
                    {addedRecipes.length > 0 && (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Warehouse Name</th>
                                    <th>Require</th>
                                    <th>Unit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {addedRecipes.map((recipe, index) => (
                                    <tr key={index}>
                                        <td>{recipe.warehouse.name}</td>
                                        <td>{recipe.require}</td>
                                        <td>{recipe.warehouse.unit}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                    <RecipeModal
                        show={showRecipeModal}
                        handleClose={() => setShowRecipeModal(false)}
                        warehouse={warehouse}
                        currentRecipes={productInfo.recipe}
                        onRecipeAdded={handleRecipeAdded}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );


}

export default UpdateProductModal;