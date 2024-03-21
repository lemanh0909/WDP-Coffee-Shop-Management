import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Modal, } from "react-bootstrap";
import { usePagination } from "../Common/hooks.js";
import CommonNavbar from "../Common/navbar.jsx";
import CommonSlider from "../Common/sidebar.jsx";
import AddCategoryModal from "./addCategory.jsx";
import UpdateCategoryModal from "./updateCategory.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryTable from "./CategoryTable.jsx";

function Category() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showDetailsTable, setShowDetailsTable] = useState(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortByQuantity, setSortByQuantity] = useState(null);
  const itemsPerPage = 5;
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userDataString = localStorage.getItem('userData');

      if (!userDataString) {
        throw new Error('User data not found in localStorage.');
      }

      const userData = JSON.parse(userDataString);
      const response = await axios.get(`http://localhost:5000/api/v1/category/${userData.userID}/getAllCategoriesInShop`);
      setItems(response.data.data.data);

    } catch (error) {
      console.error('Error fetching category data:', error);
      setError('An error occurred while fetching category data.');
    } finally {
      console.log('category data fetching completed.');
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
          console.log(response.data.data)
          setShowDetailsTable(true);
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
    const selected = items.find(item => item._id === categoryId);
    setSelectedCategoryId(categoryId);
    setSelectedCategory(selected);
    setShowUpdateModal(true);
  };

  const handleAddCategory = () => {
    toast.success('Thêm the loai thành công!');
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
    toast.success('Cập nhật the loai thành công!');
  };

  const handleSortByQuantity = () => {
    setSortByQuantity(sortByQuantity === "asc" ? "desc" : "asc");
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = sortByQuantity
    ? [...filteredItems].sort((a, b) => {
      if (sortByQuantity === "asc") {
        return a.quantity - b.quantity;
      } else {
        return b.quantity - a.quantity;
      }
    })
    : filteredItems;

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <CommonNavbar />
      <div className="flex">
        <Col md={2}> <CommonSlider />
        </Col>
        <Col md={10}>
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
            <CategoryTable
              currentItems={currentItems}
              sortedItems={sortedItems}
              handlePageChange={handlePageChange}
              activePage={activePage}
              itemsPerPage={itemsPerPage}
              handleUpdateCategory={handleUpdateCategory}
              showDetails={showDetails}
              selectedRowId={selectedRowId}
              showDetailsTable={showDetailsTable}
              selectedProduct={selectedProduct}
              handleCloseModal={handleCloseModal}
            />
          </Container></Col>

      </div>
      <AddCategoryModal
        userId={JSON.parse(localStorage.getItem('userData'))?.userID}
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
