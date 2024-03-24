import React, { useState, useEffect } from "react";
import { Col, Row, Table, Pagination, Button, Modal } from "react-bootstrap";
import "./tableWarehouse.css";
// import Popup from './Popup.jsx';
import { format } from 'date-fns';


function WarehouseTable({
    currentItems,
    sortedItems,
    handlePageChange,
    activePage,
    itemsPerPage,
    handleUpdateWarehouse,
    handleDeleteWarehouse,
    sortByQuantity,
    handleSortByQuantity,

}) {
    // const [showPopup, setShowPopup] = useState(false);
    // const [popupItem, setPopupItem] = useState(null);
    const formatDate1 = (isoDate) => {
        if (!isoDate) return "";
        return format(new Date(isoDate), 'dd/MM/yyyy HH:mm:ss');
    };
    const formatDate2 = (isoDate) => {
        if (!isoDate) return "";
        return format(new Date(isoDate), 'dd/MM/yyyy');
    };
    const [selectedImage, setSelectedImage] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);

    // Hàm để đóng modal ảnh
    const handleCloseImageModal = () => {
        setShowImageModal(false);
    };
    // Hàm để mở modal và hiển thị ảnh được click
    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShowImageModal(true);
    };


    // const handleClosePopup = () => {
    //     setShowPopup(false);
    // };

    return (
        <Row className="container-table" style={{ marginRight: "20px" }}>
            {/* <Row style={{ marginRight: "0px", backgroundColor: "rosybrown" }}>
                {showPopup && <Popup item={popupItem} onClose={handleClosePopup} />}
            </Row> */}
            <Col>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Product Code</th>
                            <th>Product Name</th>
                            <th>Unit</th>
                            <th>
                                Quantity{" "}
                                <i
                                    className={`fas fa-sort-${sortByQuantity === "asc" ? "up" : "down"}`}
                                    onClick={handleSortByQuantity}
                                    style={{ cursor: "pointer" }}
                                ></i>
                            </th>
                            <th>Last Update</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No data to present!
                                </td>
                            </tr>
                        ) : (
                            currentItems.map((item) => (
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td style={{ color: "#BB2649", fontWeight: "bold" }}>
                                        {item.name}
                                    </td>
                                    <td>{item.unit}</td>
                                    <td>{item.quantity}</td>
                                    <td>{formatDate1(item.updatedAt)}</td>
                                    <td>
                                        <div
                                            onClick={() => handleImageClick(item.image)}>
                                            <img
                                                src={item.image}
                                                alt={`Ảnh của ${item.name}`}
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <Button
                                            className="custom-btn-edit"
                                            onClick={() => handleUpdateWarehouse(item._id)}
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>Update
                                        </Button>
                                        <Button
                                            className="custom-btn-delete"
                                            onClick={() => handleDeleteWarehouse(item._id)}
                                        >
                                            <i className="fa-solid fa-trash"></i> Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
                {sortedItems.length > itemsPerPage && (
                    <Pagination className="pagination-bar">
                        <Pagination.Prev
                            onClick={() => handlePageChange(activePage - 1)}
                            disabled={activePage === 1}
                        />
                        <Pagination.Item
                            key={1}
                            active={1 === activePage}
                            onClick={() => handlePageChange(1)}
                        >
                            1
                        </Pagination.Item>
                        {activePage > 3 && <Pagination.Ellipsis />}
                        {activePage > 2 && (
                            <Pagination.Item
                                key={activePage - 1}
                                onClick={() => handlePageChange(activePage - 1)}
                            >
                                {activePage - 1}
                            </Pagination.Item>
                        )}
                        {activePage !== 1 && activePage !== Math.ceil(sortedItems.length / itemsPerPage) && (
                            <Pagination.Item
                                key={activePage}
                                active
                            >
                                {activePage}
                            </Pagination.Item>
                        )}
                        {activePage < Math.ceil(sortedItems.length / itemsPerPage) - 1 && (
                            <Pagination.Item
                                key={activePage + 1}
                                onClick={() => handlePageChange(activePage + 1)}
                            >
                                {activePage + 1}
                            </Pagination.Item>
                        )}
                        {activePage < Math.ceil(sortedItems.length / itemsPerPage) - 2 && <Pagination.Ellipsis />}
                        <Pagination.Item
                            key={Math.ceil(sortedItems.length / itemsPerPage)}
                            active={Math.ceil(sortedItems.length / itemsPerPage) === activePage}
                            onClick={() => handlePageChange(Math.ceil(sortedItems.length / itemsPerPage))}
                        >
                            {Math.ceil(sortedItems.length / itemsPerPage)}
                        </Pagination.Item>
                        <Pagination.Next
                            onClick={() => handlePageChange(activePage + 1)}
                            disabled={activePage === Math.ceil(sortedItems.length / itemsPerPage)}
                        />
                    </Pagination>
                )}
            </Col>
            {/* Modal xem ảnh */}
            <Modal show={showImageModal} onHide={handleCloseImageModal} className="mt-10">
                <Modal.Header closeButton>
                    <Modal.Title>Item Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={selectedImage} alt="Product" className="w-full" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseImageModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Row>
    );
}

export default WarehouseTable;
