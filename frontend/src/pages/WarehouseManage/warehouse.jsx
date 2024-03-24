// Warehouse.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Col, Row, Button } from "react-bootstrap";
import AddWarehouseModal from "./addWarehouse.jsx";
import UpdateWarehouseModal from "./updateWarehouse.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../WarehouseManage/warehouse.css";
import WarehouseTable from "./warehouseTable.jsx";
import ConfirmationModal from "./deleteWarehouse.jsx";

function Warehouse() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByQuantity, setSortByQuantity] = useState(null);
  const itemsPerPage = 5;
  const [activePage, setActivePage] = useState(1);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedWarehouseIdToDelete, setSelectedWarehouseIdToDelete] = useState(null);

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
        `http://localhost:5000/api/v1/warehouse/${userData.shopId}/getAllWarehousesInShop`
      );
      setItems(response.data.data);
    } catch (error) {
      console.error("Error fetching warehouse data:", error);
      setError("An error occurred while fetching warehouse data.");
    } finally {
      console.log("Warehouse data fetching completed.");
    }
  };

  const handleUpdateWarehouse = (warehouseId) => {
    const selected = items.find((item) => item._id === warehouseId);
    setSelectedWarehouseId(warehouseId);
    setSelectedWarehouse(selected);
    setShowUpdateModal(true);
  };

  const handleAddWarehouse = () => {
    toast.success("Add warehouse successfully!");
    fetchData();
  };

  const handleUpdateSuccess = () => {
    fetchData();
    setShowUpdateModal(false);
    toast.success("Update warehouse successfully!");
  };

  const handleDeleteWarehouse = (warehouseId) => {
    setSelectedWarehouseIdToDelete(warehouseId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:5000/api/v1/warehouse/${selectedWarehouseIdToDelete}/delete`)
      .then((response) => {
        console.log("Warehouse deleted successfully");
        fetchData();
        setShowDeleteConfirmation(false);
        toast.success("Delete warehouse successfully!");
      })
      .catch((error) => {
        console.error("Error deleting warehouse:", error);
        setShowDeleteConfirmation(false);
      });
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
          <Container>
            <ToastContainer position="top-right" />
            <Row
              className="title"
              style={{ marginTop: "20px", marginRight: "20px" }}
            >
              <Col md={4} className="text-white">
                <h2>Warehouse Management</h2>
              </Col>
              <Col md={4}>
                <div className="wrap">
                  <div className="search">
                    <input
                      type="text"
                      className="searchTerm"
                      placeholder="What are you looking for?"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="searchButton">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </Col>
              <Col
                md={4}
                className="button-container d-flex justify-content-end"
              >
                <Button
                  type="button"
                  className="btn btn-primary btn-color"
                  style={{ marginRight: "10px" }}
                  onClick={() => setShowAddModal(true)}
                >
                  <i className="fa-solid fa-plus"></i> Add Product
                </Button>
                <Button type="button" className="btn btn-success btn-color">
                  <i className="fa-solid fa-file-export"></i>
                  Export to excel
                </Button>
              </Col>
            </Row>

            <WarehouseTable
              currentItems={currentItems}
              sortedItems={sortedItems}
              handlePageChange={handlePageChange}
              activePage={activePage}
              itemsPerPage={itemsPerPage}
              handleSortByQuantity={handleSortByQuantity}
              handleUpdateWarehouse={handleUpdateWarehouse}
              sortByQuantity={sortByQuantity}
              handleDeleteWarehouse={handleDeleteWarehouse}
            />
          </Container>
        </Col>
      </div>
      <AddWarehouseModal
        userId={JSON.parse(localStorage.getItem("userData"))?.userID}
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        handleAddWarehouse={handleAddWarehouse}
      />
      <ConfirmationModal
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
        onConfirm={handleConfirmDelete}
      />
      {showUpdateModal && (
        <UpdateWarehouseModal
          warehouseId={selectedWarehouseId}
          warehouseData={selectedWarehouse}
          onUpdateSuccess={handleUpdateSuccess}
          onHide={() => setShowUpdateModal(false)}
        />
      )}
    </>
  );
}

export default Warehouse;
