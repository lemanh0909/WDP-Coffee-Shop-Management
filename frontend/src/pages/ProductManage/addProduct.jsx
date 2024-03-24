import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import axios from 'axios';
import RecipeModal from "./recipe.jsx";

function AddProductModal({ categories, show, handleClose, onAddSuccess, warehouse }) {
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [size, setSize] = useState("None"); // Thêm state cho size và giá trị mặc định là "None"
    const [price, setPrice] = useState(""); // Thêm state cho price
    const [addedRecipes, setAddedRecipes] = useState([]);
    
    const handleRecipeAdded = (products) => {
        // Cập nhật danh sách sản phẩm đã thêm
        setAddedRecipes(products);
    };

    const [showRecipeModal, setShowRecipeModal] = useState(false);

 
    const handleSave = async () => {
        try {
            if (name === "" || !name) {
                return console.log("Name cannot be empty!");
            }
            const productUrls = [];
            for (let i = 0; i < images.length; i++) {
                const formData = new FormData();
                formData.append("file", images[i]);
                formData.append("upload_preset", "c1xbmqbk");
                const response = await axios.post("https://api.cloudinary.com/v1_1/dvusaqmma/image/upload", formData);
                productUrls.push(response.data.url);
            }
            const listRecipe = [];
            for(let recipeItem of addedRecipes) {
                // const warehouse = {
                //     _id: recipeItem.warehouseId,
                //     name: recipeItem.warehouseName,
                //     unit: recipeItem.unit
                // }
                const recipe ={
                    warehouse: recipeItem.warehouse,
                    require: recipeItem.require
                }
                listRecipe.push(recipe);
            }
            // Xây dựng dữ liệu sản phẩm
            const productData = {
                categoryId: category,
                name: name,
                description: description,
                size: size, // Thêm trường size vào dữ liệu sản phẩm
                price: price, // Thêm trường price vào dữ liệu sản phẩm
                image: productUrls, // Sử dụng mảng các URL ảnh tải lên từ Cloudinary
                recipe: listRecipe
            };
            // Gọi API tạo sản phẩm
            const updateProductResponse = await axios.post("http://localhost:5000/api/v1/product/create", productData);

            // Xử lý kết quả từ việc tạo sản phẩm
            console.log("Created product:", updateProductResponse.data);
            setCategory("");
            setName("");
            setDescription("");
            setImages([]);
            setSize("None");
            setPrice("");
            setAddedRecipes([]);
            onAddSuccess();
        } catch (error) {
            console.error('Error uploading file:', error);
        }

        handleClose();
    };

    const handleRemoveImage = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    const handleAddRecipe = () => {
        setShowRecipeModal(true);
    };

    const resetForm = () => {
        setCategory("");
        setName("");
        setDescription("");
        setImages([]);
        setSize("None");
        setPrice("");
        setAddedRecipes([]);
    };

    const handleModalHide = () => {
        resetForm();
        handleClose();
    };
    return (
        <Modal show={show} onHide={handleModalHide} className="mt-10">
            <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="gap-2">
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
                                        src={URL.createObjectURL(image)}
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
                            Add Recipe
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
                        onRecipeAdded={handleRecipeAdded}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddProductModal;
