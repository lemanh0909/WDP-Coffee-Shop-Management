// Warehouse.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Col, Row, Button } from "react-bootstrap";
import CommonNavbar from "../Common/navbar.jsx";
import CommonSidebar from "../Common/sidebar.jsx";
import AddWarehouseModal from "./addWarehouse.jsx";
import UpdateWarehouseModal from "./updateWarehouse.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../WarehouseManage/warehouse.css";
import WarehouseTable from "./warehouseTable.jsx";

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
    toast.success("Thêm kho thành công!");
    fetchData();
  };

  const handleUpdateSuccess = () => {
    fetchData();
    setShowUpdateModal(false);
    toast.success("Cập nhật kho thành công!");
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
        <Col md={2}>
          <CommonSidebar />
        </Col>

        <Col md={10}>
          <Container>
            <ToastContainer position="top-right" />
            <Row
              className="title"
              style={{ marginTop: "20px", marginRight: "20px" }}
            >
              <Col md={4} className="text-white">
                <h2>Quản lý nhà kho</h2>
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
                  className="btn btn-danger btn-color"
                  style={{ marginRight: "10px" }}
                  onClick={() => setShowAddModal(true)}
                >
                  <i className="fa-solid fa-plus"></i> Thêm sản phẩm
                </Button>
                <Button type="button" className="btn btn-primary btn-color">
                  <i className="fa-solid fa-file-export"></i>
                  Xuất ra file
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
