import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const itemsPerPage = 6;
  const [activePage, setActivePage] = useState(1);

  const fetchData = async () => {
    try {
      const userDataString = localStorage.getItem("userData");
      if (!userDataString) {
        throw new Error("User data not found in localStorage.");
      }
      const userData = JSON.parse(userDataString);

      const shopId = userData.shopId;
      const userId = userData.userID;
      const response = await axios.get(
        `http://localhost:5000/api/v1/category/${userId}/getAllCategoriesInShop`
      );

      setItems(response.data.data.data);
    } catch (error) {
      console.error("Error fetching category data:", error);
      setError("An error occurred while fetching category data.");
    } finally {
      console.log("category data fetching completed.");
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

  const handleDeleteCategory = (categoryId) => {
    setShowConfirmationModal(true);
    setCategoryIdToDelete(categoryId);
  };

  // Xác nhận xóa
  const confirmDelete = () => {
    axios
      .delete(`http://localhost:5000/api/v1/category/${categoryIdToDelete}/delete`)
      .then((response) => {
        console.log("Category deleted successfully");
        fetchData();
        setShowConfirmationModal(false);
        toast.success("Delete Category successfully!");
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  const handleUpdateCategory = (categoryId) => {
    const selected = items.find((item) => item._id === categoryId);
    setSelectedCategory(selected);
    setShowUpdateModal(true);
  };

  const handleAddCategory = () => {
    toast.success("Add Category Successfully!");
    fetchData();
  };

  const handleCloseModal = () => {
    setShowDetailsTable(false);
  };

  const handleShowConfirmationModal = (categoryId) => {
    setShowConfirmationModal(true);
    setCategoryIdToDelete(categoryId);
  };

  const handleUpdateSuccess = () => {
    fetchData();
    setShowUpdateModal(false);
    toast.success("Update category successful!");
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
        <Col md={12}>
          <Container className="ml-72">
            <ToastContainer position="bottom-right" />
            <Row className="title mb-0">
              <Col md={4} className="text-white">
                <h2>Category management</h2>
              </Col>
              <Col md={4} />
              <Col md={4} className="button-container">
                <button
                  type="button"
                  className="btn btn-primary btn-color"
                  style={{ marginRight: "10px" }}
                  onClick={() => setShowAddModal(true)}
                >
                  <i className="fa-solid fa-plus"></i> Add category
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
              handleDeleteCategory={handleDeleteCategory}
            />
          </Container>
        </Col>
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
          categoryData={selectedProduct}
          onUpdateSuccess={handleUpdateSuccess}
          onHide={() => setShowUpdateModal(false)}
        />
      )}

      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Category;
