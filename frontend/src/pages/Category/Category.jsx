import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Pagination, Button, Modal } from "react-bootstrap";
import "./Category.css";
import { usePagination } from "../Common/hooks.js";
import "bootstrap/dist/css/bootstrap.min.css";
import CommonNavbar from "../Common/navbar.jsx";
import CommonSlider from "../Common/sidebar.jsx";
import AddCategoryModal from "./addCategory.jsx";
import UpdateCategoryModal from "./updateCategory.jsx";

function Category() {
  const itemsPerPage = 7;
  const [category, setCategory] = useState([]);
  const [paginatedItems, activePage, totalPages, handlePageChange] =
    usePagination(category, itemsPerPage);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [categoryIdToUpdate, setCategoryIdToUpdate] = useState(null);

  // Fake data for demonstration
  const fakeData = [
    { categoryId: 1, name: "Category 1", description: "Description 1", products: { name: "Product 1" } },
    { categoryId: 2, name: "Category 2", description: "Description 2", products: { name: "Product 2" } },
    { categoryId: 3, name: "Category 3", description: "Description 3", products: { name: "Product 3" } },
    // Add more fake data as needed
  ];

  useEffect(() => {
    setCategory(fakeData); // Set fake data when component mounts
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowUpdateModal = (categoryId) => {
    setCategoryIdToUpdate(categoryId);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setCategoryIdToUpdate(null);
  };

  const handleShowConfirmationModal = (categoryId) => {
    setShowConfirmationModal(true);
    setCategoryIdToDelete(categoryId);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setCategoryIdToDelete(null);
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log("Deleting category with ID:", categoryIdToDelete);
    setShowConfirmationModal(false);
  };

  return (
    <>
      <CommonNavbar />
      <div className="flex">
        <CommonSlider
          handlePageChange={handlePageChange}
          activePage={activePage}
          totalPages={totalPages}
        />
        <Container className="ml-72">
          <Row className="title mb-0">
            <Col md={4} className="text-white">
              <h2>Quản lý danh mục</h2>
            </Col>
            <Col md={4} />
            <Col md={4} className="button-container">
              <div className="">
                <Button
                  variant="primary"
                  className="add-btn btn-color"
                  onClick={handleShowModal}
                >
                  <i className="fa-solid fa-plus"></i> Thêm danh mục
                </Button>
                <Button variant="primary" className="btn-color">
                  <i className="fa-solid fa-file-export"></i> Biến thể
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Category ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Products</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedItems.map((item) => (
                    <tr key={item.categoryId}>
                      <td>{item.categoryId}</td>
                      <td style={{ color: "#BB2649", fontWeight: "bold" }}>{item.name}</td>
                      <td style={{ color: "#BB2649", fontWeight: "bold" }}>{item.description}</td>
                      <td style={{ color: "#BB2649", fontWeight: "bold" }}>{item.products.name}</td>
                      <td>
                        <Button variant="primary" className="edit-btn" onClick={() => handleShowUpdateModal(item.categoryId)}>
                          <i className="fa-solid fa-pen-to-square"></i> Sửa
                        </Button>
                        <Button variant="danger" onClick={() => handleShowConfirmationModal(item.categoryId)}>
                          <i className="fa-solid fa-trash"></i> Xóa
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination className="pagination">
                {/* Pagination controls */}
              </Pagination>
            </Col>
          </Row>
        </Container>
      </div>
      <AddCategoryModal
        show={showModal}
        handleClose={handleCloseModal}
      />
      <UpdateCategoryModal
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        categoryId={categoryIdToUpdate}
      />
      <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xoá danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xoá danh mục này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmationModal}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Xoá
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Category;
