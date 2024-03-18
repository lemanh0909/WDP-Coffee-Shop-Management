import React, { useState, useEffect } from "react";
import axios from "axios";

import { Container, Row, Col, Table, Pagination, Button, Modal } from "react-bootstrap";

import { usePagination } from "../Common/hooks.js";
import CommonNavbar from "../Common/navbar.jsx";
import CommonSidebar from "../Common/sidebar.jsx";
import AddCategoryModal from "./addCategory.jsx";
import UpdateCategoryModal from "./updateCategory.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Category() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showDetailsTable, setShowDetailsTable] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const handleShowModal = () => setShowModal(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const itemsPerPage = 6;

  const [getPaginatedItems, activePage, totalPages, handlePageChange] = usePagination(items, itemsPerPage);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userDataString = localStorage.getItem("userData");

      if (!userDataString) {
        throw new Error("User data not found in localStorage.");
      }

      const userData = JSON.parse(userDataString);
      const response = await axios.get(
        `http://localhost:5000/api/v1/category/${userData.userID}/getAllCategoriesInShop`
      );
      setItems(response.data.data.data);

    } catch (error) {
      console.error("Error fetching category data:", error);
      setError("An error occurred while fetching category data.");
    } finally {
      console.log("category data fetching completed.");
    }
  };

  // Thêm một state để lưu trữ sản phẩm được chọn để hiển thị chi tiết
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  // Xử lý khi click vào nút "Xem chi tiết"
  const showDetails = (productId, rowId) => {
    console.log("showDetails function is called.");
    if (selectedRowId === rowId && showDetailsTable) {
      setShowDetailsTable(false); // Ẩn chi tiết nếu đã được hiển thị

    } else {
      axios
        .get(`http://localhost:5000/api/v1/product/${productId}/getProductById`)
        .then((response) => {
          setSelectedProduct(response.data.data);
          setShowDetailsTable(true);
          setSelectedRowId(rowId); // Lưu id của dòng được chọn
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  };

  const handleDelete = () => {
    axios
      .delete("http://localhost:5000/api/v1/category/delete", {
        data: { categoryId: categoryIdToDelete },
      })
      .then((response) => {
        console.log("category deleted successfully");
        fetchData();
        setShowConfirmationModal(false);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };


  const handleUpdateCategory = (categoryId) => {
    const selected = items.find((item) => item._id === categoryId);
    setSelectedCategoryId(categoryId);
    setSelectedCategory(selected);
    setShowUpdateModal(true);
  };

  const handleAddCategory = () => {
    toast.success("Thêm the loai thành công!");
    fetchData();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowDetailsTable(false);
  };


  const handleShowConfirmationModal = (categoryId) => {
    setShowConfirmationModal(true);
    setCategoryIdToDelete(categoryId);
  };
  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setCategoryIdToDelete(null);
  };

  const handleUpdateSuccess = () => {
    fetchData();
    setShowUpdateModal(false);
    toast.success("Cập nhật the loai thành công!");
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
          <ToastContainer position="top-right" />
          <Row className="title mb-0">
            <Col md={4} className="text-white">
              <h2>Quản lý thể loai</h2>
            </Col>
            <Col md={4} />
            <Col md={4} className="button-container">
              <button
                type="button"
                className="btn btn-danger btn-color"
                style={{ marginRight: "10px" }}
                onClick={() => setShowAddModal(true)}
              >
                <i className="fa-solid fa-plus"></i> Thêm loại sản phẩm
              </button>
              <button type="button" className="btn btn-primary btn-color">
                <i className="fa-solid fa-file-export"></i>
                Xuất ra file
              </button>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Row>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Mã Category</th>
                      <th>Tên loai hàng</th>
                      <th>Mô tả</th>
                      <th>Products</th>
                      <th>Ngày tạo</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaginatedItems.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No data to present!
                        </td>
                      </tr>
                    ) : (
                      getPaginatedItems.map((item, index) => (
                        <React.Fragment key={item._id}>
                          <tr>
                            <td>{item._id}</td>
                            <td
                              style={{ color: "#BB2649", fontWeight: "bold" }}
                            >
                              {item.name}
                            </td>
                            <td>{item.description}</td>
                            <td>
                              <Button
                                onClick={() =>
                                  showDetails(item.products, index)
                                }
                              >
                                Xem chi tiết
                              </Button>
                            </td>
                            <td>{item.createdAt}</td>
                            <td>
                              <Button
                                variant="primary"
                                className="edit-btn"
                                onClick={() => handleUpdateCategory(item._id)}
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                                Update
                              </Button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() =>
                                  handleShowConfirmationModal(item.products)
                                }
                              >
                                <i className="fa-solid fa-trash"></i>Delete
                              </button>
                            </td>
                          </tr>
                          {selectedRowId === index && showDetailsTable && (
                            <tr key={`${item._id}-details`} >
                              <td colSpan="9">
                                <div className="details-table-container">
                                  {console.log(
                                    `Rendering details for item ${item._id}`
                                  )}
                                  <Table bordered>
                                    <tbody>
                                      <tr >
                                        <td className="field w-2/5" >
                                          Mã category
                                        </td>
                                        <td>{selectedProduct._id}</td>
                                      </tr>
                                      <tr>
                                        <td className="field w-2/5">
                                          Tên  loại hàng hoá
                                        </td>
                                        <td>{item.name}</td>
                                      </tr>
                                      <tr>
                                        <td className="field w-2/5">Mô tả</td>
                                        <td>{item.description}</td>
                                      </tr>
                                      <tr>
                                        <td className="field w-2/5">
                                          Ngày tạo
                                        </td>
                                        <td>{item.createdAt}</td>
                                      </tr>

                                      <tr>
  <td className="field w-2/5">Sản phẩm</td>
  <td key={`${item._id}-details`}>
    {selectedRowId === index && showDetailsTable && (
      <Table bordered>
        <thead>
          <tr>
            <th>Mã sản phẩm</th>
            <th>Tên hàng hoá:</th>
            <th>Miêu tả:</th>
          </tr>
        </thead>
        <tbody>
          {selectedProduct && (
            <tr>
              <td>{selectedProduct._id}</td>
              <td>{selectedProduct.name}</td>
              <td>{selectedProduct.description}</td>
            </tr>
          )}
        </tbody>
      </Table>
    )}
    {selectedRowId === index && showDetailsTable && !selectedProduct && (
      <p>Không có sản phẩm nào</p>
    )}
  </td>
</tr>
                                    </tbody>
                                  </Table>
                                  <Button onClick={handleCloseModal}>
                                    Close
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))
                    )}
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

      </div>
      <AddCategoryModal
        userId={JSON.parse(localStorage.getItem("userData"))?.userID}
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        handleClose={handleCloseModal}
        handleAddCategory={handleAddCategory}
      />
      {showUpdateModal && (
        <UpdateCategoryModal
          categoryId={selectedCategoryId}
          categoryData={selectedCategory}
          onUpdateSuccess={handleUpdateSuccess}
          onHide={() => setShowUpdateModal(false)}
        />
      )}

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

export default Category;
