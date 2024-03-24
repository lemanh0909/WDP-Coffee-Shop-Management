import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Pagination, Button, Modal } from "react-bootstrap";
import "./productmanage.css";
import { usePagination } from "../Common/hooks.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import AddProductModal from "./addProduct.jsx";
import UpdateProductModal from "./updateProduct.jsx";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Common/Authorization.js";

function ProductManage() {

  const [role] = useAuth();
  const navigate = useNavigate();
  if (role == "Admin") {
    navigate("/AdminManagement");
  }
  const itemsPerPage = 7;
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [paginatedItems, activePage, totalPages, handlePageChange] =
    usePagination(products, itemsPerPage);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsTable, setShowDetailsTable] = useState(false);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [productIdToUpdate, setProductIdToUpdate] = useState(null);
  const [warehouse, setWarehouse] = useState([]);
  const [selectedProductToUpdate, setSelectedProductToUpdate] = useState(null);

  const getWarehouse = () => {
    // Lấy userId và shopId từ local storage
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      throw new Error('User data not found in localStorage.');
    }
    const userData = JSON.parse(userDataString);
    const shopId = userData.shopId;
    const userId = userData.userID;
    axios
      .get(`http://localhost:5000/api/v1/warehouse/${shopId}/getAllWarehousesInShop`)
      .then((response) => {
        setWarehouse(response.data.data);
      })
      .catch((error) => {
        console.error("Error getting warehouse:", error);
      });
  }

  const handleShowModal = () => {
    getWarehouse();
    setShowModal(true);
  };



  const handleShowUpdateModal = (product) => {
    setSelectedProductToUpdate(product);
    getWarehouse();
    setShowUpdateModal(true);
  };

  const handleAddSuccess = () => {
    fetchProducts();
  };
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setProductIdToUpdate(null);
  };
  const handleUpdateSuccess = () => {
    fetchProducts(); // Cập nhật danh sách sản phẩm sau khi cập nhật thành công
    handleCloseUpdateModal(); // Đóng modal cập nhật sản phẩm
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
      .delete(`http://localhost:5000/api/v1/product/${productIdToDelete}/delete`)
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
        .get(`http://localhost:5000/api/v1/product/${productId}/getProductVariant`)
        .then((response) => {
          setSelectedProduct(response.data.data.productVariant);
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

  return (
    <>
      <div className="flex">
        <Col md={12}>
          <Container className="ml-72 ">
            <Row className="title mb-0">
              <Col md={4} className="text-white "  >
                <h2>Product Management</h2>
              </Col>
              <Col md={4} />
              <Col md={4} className="button-container">
                <div className="">
                  {role !== "Staff" && <Button
                    variant="primary"
                    className="add-btn btn-primary"
                    onClick={handleShowModal}
                  >
                    <i className="fa-solid fa-plus"></i> Add Product
                  </Button>}
                </div>
              </Col>
            </Row>
            <Row className="container-table table">
              <Col xs={12}>
                <Row>
                  <Table striped bordered hover >
                    <thead>
                      <tr>
                        <th className="text-center">
                          Product Id
                        </th>
                        <th className="text-center">
                          Product Name
                        </th>
                        <th className="text-center">Category</th>
                        <th className="text-center">Size</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Details</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody >
                      {paginatedItems.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center">No data to present!</td>
                        </tr>
                      ) : (
                        paginatedItems.map((item) => (
                          <React.Fragment key={item._id}>
                            <tr >
                              <td className="text-center">{item._id}</td>
                              <td className="text-center" style={{ color: "#BB2649", fontWeight: "bold" }}>{item.name}</td>
                              <td className="text-center">{item.category.name}</td>
                              <td className="text-center">{item.size}</td>
                              <td className="text-center">{item.price}</td>
                              <td className="text-center justify-center">
                                <Button variant="success" onClick={() => showDetails(item._id)}>
                                  View Details
                                </Button>
                              </td>
                              <td className="text-center">
                                <Button variant="primary" className="edit-btn"
                                  onClick={() => handleShowUpdateModal(item)}>
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
                                              <td className="field w-2/5">Product ID:</td>
                                              <td>{selectedProduct._id}</td>
                                            </tr>
                                            <tr>
                                              <td className="field w-2/5">Product name:</td>
                                              <td>{selectedProduct.name}</td>
                                            </tr>
                                            <tr>
                                              <td className="field">Description:</td>
                                              <td>{selectedProduct.description}</td>
                                            </tr>
                                            <tr>
                                              <td className="field w-2/5">Product Size:</td>
                                              <td>{selectedProduct.size}</td>
                                            </tr>
                                            <tr>
                                              <td className="field w-2/5">Product price:</td>
                                              <td>{selectedProduct.price}</td>
                                            </tr>
                                            <tr>
                                              <td className="field">Image:</td>
                                              <td className="text-center">
                                                <div className="grid grid-cols-2 gap-4">
                                                  {selectedProduct.image.map((imageUrl, index) => (
                                                    <div key={index}
                                                      className=" border border-gray-300 rounded-md 
                                                      p-2 flex justify-center items-center"
                                                      onClick={() => handleImageClick(imageUrl)}>
                                                      <img
                                                        className="w-full h-auto"
                                                        src={imageUrl}
                                                        alt={`Product ${index + 1}`}
                                                      />
                                                    </div>
                                                  ))}
                                                </div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td className="field">Recipe:</td>
                                              <td>
                                                <Table bordered>
                                                  <thead>
                                                    <tr>
                                                      <th>STT</th>
                                                      <th>ID</th>
                                                      <th>Name</th>
                                                      <th>Require</th>
                                                      <th>Unit</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    {selectedProduct.recipe.map((product, idx) => (
                                                      <tr key={idx}>
                                                        <td>{idx + 1}</td>
                                                        <td>{product.warehouse._id}</td>
                                                        <td>{product.warehouse.name}</td>
                                                        <td>{product.require}</td>
                                                        <td>{product.warehouse.unit}</td>
                                                      </tr>
                                                    ))}
                                                  </tbody>
                                                </Table>
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

                <Pagination className="justify-center">
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

          </Container>
        </Col>
      </div>
      <AddProductModal
        show={showModal}
        handleClose={handleCloseModal}
        onAddSuccess={handleAddSuccess}
        categories={categories}
        warehouse={warehouse}

      />

      {
        selectedProductToUpdate != null &&
        <UpdateProductModal
          show={showUpdateModal}
          handleClose={handleCloseUpdateModal}
          productInfo={selectedProductToUpdate}
          onUpdate={handleUpdateSuccess}
          categories={categories}
          warehouse={warehouse}
        />
      }


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

      {/* Modal xem ảnh */}
      <Modal show={showImageModal} onHide={handleCloseImageModal}>
        <Modal.Header closeButton>
          <Modal.Title>Product Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedImage} alt="Product" className="w-full" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseImageModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductManage;