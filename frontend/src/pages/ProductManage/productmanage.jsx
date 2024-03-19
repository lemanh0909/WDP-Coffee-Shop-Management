import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Pagination, Button, Modal } from "react-bootstrap";
import "./productmanage.css";
import { usePagination } from "../Common/hooks.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import CommonNavbar from "../Common/navbar.jsx";
import CommonSidebar from "../Common/sidebar.jsx";
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
    // Lấy userId và shopId từ local storage
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      throw new Error('User data not found in localStorage.');
    }
    const userData = JSON.parse(userDataString);
    const shopId = userData.shopId;
    const userId = userData.userID;
    axios
      .get(`http://localhost:5000/api/v1/product/${shopId}/getAllProductsWithCategoryInShop`)
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
        .get(`http://localhost:5000/api/v1/product/${productId}/getProductByIdTotalVariant`)
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


  const [categories, setCategories] = useState([]);
  useEffect(() => {
    // Lấy userId và shopId từ local storage
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      throw new Error('User data not found in localStorage.');
    }
    const userData = JSON.parse(userDataString);
    const shopId = userData.shopId;
    const userId = userData.userID;
    axios.get(`http://localhost:5000/api/v1/category/${userId}/getAllCategoriesInShop`)
      .then(response => {
        setCategories(response.data.data.data);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);


  return (
    <>
      <CommonNavbar />
      <div className="flex">
        <Col md={2}>
          <CommonSidebar />
        </Col>

        <Col md={10}>
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
                    className="add-btn btn-danger"
                    onClick={handleShowModal}
                  >
                    <i className="fa-solid fa-plus"></i> Thêm sản phẩm
                  </Button>
                  <Button variant="primary" className="btn-secondary">
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
                      {paginatedItems.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center">No data to present!</td>
                        </tr>
                      ) : (
                        paginatedItems.map((item) => (
                          <React.Fragment key={item._id}>
                            <tr>
                              <td>{item._id}</td>
                              <td style={{ color: "#BB2649", fontWeight: "bold" }}>{item.name}</td>
                              <td>{item.category.name}</td>
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
                                              <td className="field w-2/5">Tên:</td>
                                              <td>{selectedProduct.name}</td>
                                            </tr>
                                            <tr>
                                              <td className="field">Mô tả:</td>
                                              <td>{selectedProduct.description}</td>
                                            </tr>
                                            <tr>
                                              <td className="field">Hình ảnh:</td>
                                              <td>
                                                <div className="flex flex-wrap gap-3 justify-center">
                                                  {selectedProduct.image.map((imageUrl, index) => (
                                                    <img
                                                      key={index}
                                                      className="w-1/4 h-1/4"
                                                      src={imageUrl}
                                                      alt={`Product ${index + 1}`}
                                                    />
                                                  ))}
                                                </div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td className="field">Số lượng biến thể:</td>
                                              <td>
                                                {selectedProduct.productVariant}
                                              </td>
                                            </tr>
                                          </tbody>
                                        </Table>
                                      </div>
                                    </td>
                                  </tr>
                                </React.Fragment>
                              )}
                          </React.Fragment>)
                        ))}
                    </tbody>
                  </Table>
                </Row>
                <Row>
                  <Col>
                    <Pagination>
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
        </Col>
      </div>
      <AddProductModal
        show={showModal}
        handleClose={handleCloseModal}
        onAddSuccess={handleAddSuccess}
        categories={categories}

      />


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