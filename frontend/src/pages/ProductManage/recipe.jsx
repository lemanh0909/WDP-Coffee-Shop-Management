import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";

function RecipeModal({ show, handleClose, warehouse, currentRecipes, onRecipeAdded }) {
    const [selectedWarehouse, setSelectedWarehouse] = useState(""); // State lưu trữ warehouse được chọn
    const [require, setRequire] = useState(""); // State lưu trữ số lượng cần thiết
    const [unit, setUnit] = useState("None"); // State lưu trữ đơn vị của kho hàng
    const [addedRecipe, setAddedRecipe] = useState(currentRecipes || []); // State lưu trữ thông tin về các sản phẩm đã thêm

    const handleSaveRecipe = () => {
        // Logic thêm sản phẩm ở đây...

        // Gọi callback function để truyền danh sách sản phẩm đã thêm về nơi gọi
        onRecipeAdded(addedRecipe);
        handleClose();

    };

    const handleWarehouseChange = (e) => {
        const selectedWarehouseId = e.target.value;
        const selectedWarehouse = warehouse.find(item => item._id === selectedWarehouseId);
        if (selectedWarehouse) {
            setUnit(selectedWarehouse.unit); // Cập nhật đơn vị của kho hàng được chọn
            setSelectedWarehouse(selectedWarehouseId);
        }
    };

    const handleAddRecipe = () => {
        if (selectedWarehouse && require) {
            const existingRecipeIndex = addedRecipe.findIndex(Recipe => Recipe.warehouse._id === selectedWarehouse);
            if (existingRecipeIndex !== -1) {
                // Nếu đã có sản phẩm từ kho hàng đó, cập nhật số lượng
                const updatedRecipe = [...addedRecipe];
                updatedRecipe[existingRecipeIndex].require += parseInt(require);
                setAddedRecipe(updatedRecipe);
            } else {
                // Nếu chưa có, thêm sản phẩm mới
                const newRecipe = {
                    warehouse: {
                        _id: selectedWarehouse,
                        unit: unit,
                        name: warehouse.find(item => item._id === selectedWarehouse)?.name || '' // Lấy tên kho hàng từ danh sách warehouse
                    },
                    require: parseInt(require),
                };
                setAddedRecipe([...addedRecipe, newRecipe]);
            }
            setSelectedWarehouse(""); // Đặt lại giá trị của các trường nhập về trạng thái ban đầu
            setRequire("");
            setUnit("None");
        }
    };

    const handleRemoveRecipe = (indexToRemove) => {
        const updatedRecipe = addedRecipe.filter((Recipe, index) => index !== indexToRemove);
        setAddedRecipe(updatedRecipe);
    };

    return (
        <Modal show={show} onHide={handleClose} className="modal-lg">
            <Modal.Header closeButton>
                <Modal.Title>Recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="flex gap-2 mb-2">
                    <Form.Group controlId="warehouse">
                        <Form.Label>Warehouse</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedWarehouse}
                            onChange={handleWarehouseChange}
                        >
                            <option value="">Select Warehouse</option>
                            {warehouse.map((item) => (
                                <option key={item._id} value={item._id}>{item.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="unit">
                        <Form.Label>Unit</Form.Label>
                        <Form.Control
                            type="text"
                            value={unit}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group controlId="require">
                        <Form.Label>Require</Form.Label>
                        <Form.Control
                            type="number"
                            value={require}
                            onChange={(e) => setRequire(e.target.value)}
                        />
                    </Form.Group>
                    <div className="flex items-end">
                    <Button  variant="primary" onClick={handleAddRecipe}>Add</Button>
                    </div>
                    
                </Form>
                {addedRecipe.length > 0 && (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className="text-center">Warehouse Name</th>
                                <th className="text-center">Require</th>
                                <th className="text-center">Unit</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addedRecipe.map((Recipe, index) => (
                                <tr key={index}>
                                    <td className="text-center">{Recipe.warehouse.name}</td> {/* Sử dụng class của Tailwind CSS */}
                                    <td className="text-center">{Recipe.require}</td> {/* Sử dụng class của Tailwind CSS */}
                                    <td className="text-center">{Recipe.warehouse.unit}</td> {/* Sử dụng class của Tailwind CSS */}
                                    <td className="text-center">
                                        <Button variant="danger" onClick={() => handleRemoveRecipe(index)}>Remove</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={handleSaveRecipe}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RecipeModal;
