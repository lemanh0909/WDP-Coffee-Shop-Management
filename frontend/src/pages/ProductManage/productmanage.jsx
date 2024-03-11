import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Pagination, Button, Modal } from "react-bootstrap";
import "./productmanage.css";
import { usePagination } from "../Common/hooks.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import CommonNavbar from "../Common/navbar.jsx";
import CommonSlider from "../Common/sidebar.jsx";
import AddProductModal from "./addProduct.jsx";
import UpdateProductModal from "./updateProduct.jsx";

function ProductManage() {
  const itemsPerPage = 7;
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [paginatedItems, activePage, totalPages, handlePageChange] =
    usePagination(products, itemsPerPage);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsTable, setShowDetailsTable] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [productIdToUpdate, setProductIdToUpdate] = useState(null);

  const handleShowUpdateModal = (productId) => {
    setProductIdToUpdate(productId);
    setShowUpdateModal(true);
  };

  const handleAddSuccess = () => {
    fetchProducts();
  };
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setProductIdToUpdate(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowDetailsTable(false);
  };

  const handleShowConfirmationModal = (productId) => {
    setShowConfirmationModal(true);
    setProductIdToDelete(productId);
  };
  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setProductIdToDelete(null);
  };

  const handleDelete = () => {
    axios
      .delete("http://localhost:5000/api/v1/product/delete", {
        data: { productId: productIdToDelete },
      })
      .then((response) => {
        console.log("Product deleted successfully");
        fetchProducts();
        setShowConfirmationModal(false);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };


  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/v1/product/getAllProducts")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const showDetails = (productId) => {
    if (selectedProduct && selectedProduct._id === productId) {
      setShowDetailsTable(!showDetailsTable);
    } else {
      axios
        .get(`http://localhost:5000/api/v1/product/${productId}/getProductById`)
        .then((response) => {
          setSelectedProduct(response.data.data);
          setShowDetailsTable(true);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <CommonNavbar />
      <div className="flex">
        <CommonSlider
          handlePageChange={handlePageChange}
          activePage={activePage}
          totalPages={totalPages}
          getPaginatedItems={paginatedItems}
        />
        <Container className="ml-72 ">
          <Row className="title mb-0">
            <Col md={4} className="text-white "  >
              <h2>Quản lý sản phẩm</h2>
            </Col>
            <Col md={4} />
            <Col md={4} className="button-container">
              <div className="">
                <Button
                  variant="primary"
                  className="add-btn btn-color"
                  onClick={handleShowModal}
                >
                  <i className="fa-solid fa-plus"></i> Thêm sản phẩm
                </Button>
                <Button variant="primary" className="btn-color">
                  <i className="fa-solid fa-file-export"></i> Biến thể
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Row>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>
                        Mã hàng hóa
                      </th>
                      <th>
                        Tên hàng hóa
                      </th>
                      <th>Category</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedItems.map((item) => (
                      <React.Fragment key={item._id}>
                        <tr>
                          <td>{item._id}</td>
                          <td style={{ color: "#BB2649", fontWeight: "bold" }}>{item.name}</td>
                          <td></td>
                          <td>
                            <Button onClick={() => showDetails(item._id)}>
                              Xem chi tiết
                            </Button>
                          </td>
                          <td>
                            <Button variant="primary" className="edit-btn" onClick={() => handleShowUpdateModal(item._id)}>
                              <i className="fa-solid fa-pen-to-square"></i> Update
                            </Button>
                            <Button variant="danger" onClick={() => handleShowConfirmationModal(item._id)}>
                              <i className="fa-solid fa-trash"></i> Delete
                            </Button>
                          </td>
                        </tr>
                        {showDetailsTable && selectedProduct &&
                          selectedProduct._id === item._id && (
                            <React.Fragment>
                              <tr>
                                <td colSpan="12">
                                  <div className="details-table-container">
                                    <Table bordered>
                                      <tbody>
                                        <tr>
                                          <td className="field">Tên:</td>
                                          <td>{selectedProduct.name}</td>
                                        </tr>
                                        <tr>
                                          <td className="field">Mô tả:</td>
                                          <td>{selectedProduct.description}</td>
                                        </tr>
                                        <tr>
                                          <td className="field">Hình ảnh:</td>
                                          <td>
                                            <img src={selectedProduct.image} alt="Product" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </div>
                                </td>
                              </tr>
                            </React.Fragment>
                          )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </Table>
              </Row>
              <Row>
                <Col>
                  <Pagination className="pagination">
                    <Pagination.Prev
                      onClick={() => handlePageChange(activePage - 1)}
                      disabled={activePage === 1}
                    />
                    {Array.from({ length: totalPages }, (_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === activePage}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      onClick={() => handlePageChange(activePage + 1)}
                      disabled={activePage === totalPages}
                    />
                  </Pagination>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <AddProductModal show={showModal} handleClose={handleCloseModal} onAddSuccess={handleAddSuccess} />

      <UpdateProductModal
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        productId={productIdToUpdate}
        onUpdate={fetchProducts}
      />
      <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xoá sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xoá sản phẩm này không?</Modal.Body>
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

export default ProductManage;