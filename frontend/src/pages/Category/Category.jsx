// Category.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Modal, } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonNavbar from "../Common/navbar.jsx";
import CommonSlider from "../Common/sidebar.jsx";
import AddCategoryModal from "./addCategory.jsx";
import UpdateCategoryModal from "./updateCategory.jsx";
import CategoryTable from "./CategoryTable.jsx";

function Category() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [showDetailsTable, setShowDetailsTable] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByQuantity, setSortByQuantity] = useState(null);
  const itemsPerPage = 5;
  const [activePage, setActivePage] = useState(1);

  const fetchData = async () => {
    try {
      const userDataString = localStorage.getItem('userData');
      if (!userDataString) {
        throw new Error('User data not found in localStorage.');
      }
      const userData = JSON.parse(userDataString);

      const shopId = userData.shopId;
      const userId = userData.userID;
      const response = await axios.get(
        `http://localhost:5000/api/v1/category/${userData.userID}/getAllCategoriesInShop`
      );

      setItems(response.data.data.data);
    } catch (error) {
      console.error('Error fetching category data:', error);
      setError('An error occurred while fetching category data.');
    } finally {
      console.log('category data fetching completed.');
    }
  };

  const showDetails = (product, rowId) => {
    if (selectedRowId === rowId && showDetailsTable) {
      setShowDetailsTable(false);
    } else {
      setSelectedProduct(product);
      setShowDetailsTable(true);
    }
    setSelectedRowId(rowId);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    // Lấy userId và shopId từ local storage
    const userDataString = localStorage.getItem("userData");
    if (!userDataString) {
      throw new Error("User data not found in localStorage.");
    }
    const userData = JSON.parse(userDataString);
    const shopId = userData.shopId;
    const userId = userData.userID;
    axios
      .get(
        `http://localhost:5000/api/v1/category/${shopId}/getAllCategoriesInShop`
      )
      .then((response) => {
        setCategories(response.data.data.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);
  
  

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
    setSelectedCategory(selected);
    setShowUpdateModal(true);
  };

  const handleAddCategory = () => {
    toast.success('Thêm the loai thành công!');
    fetchData();
  };

  const handleCloseModal = () => {
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
    toast.success('Update category successful!');
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

      <div className="flex">
        <Col md={2}> <CommonSlider />
        </Col>
        <Col md={10}>
          <Container className="ml-72">
            <ToastContainer position="top-right" />
            <Row className="title mb-0">
              <Col md={4} className="text-white">
                <h2>Category management</h2>
              </Col>
              <Col md={4} />
              <Col md={4} className="button-container">
                <button
                  type="button"
                  className="btn btn-danger btn-color"
                  style={{ marginRight: "10px" }}
                  onClick={() => setShowAddModal(true)}
                >
                  <i className="fa-solid fa-plus"></i> Add category
                </button>
                <button type="button" className="btn btn-primary btn-color">
                  <i className="fa-solid fa-file-export"></i>
                  Export to excel
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
          categoryData={selectedProduct}
          onUpdateSuccess={handleUpdateSuccess}
          onHide={() => setShowUpdateModal(false)}
        />
      )}

      <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmationModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Category;
