import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CommonNavbar from "../Common/navbar.jsx";
import CommonSlider from "../Common/sidebar.jsx";
import AddModal from "./add.jsx";
import ExportImportNoteTable from "./ExportImportNoteTable.jsx";
import "./exportimportnote.css";
import { Fakedata } from "./Fakedata.js";

function ExportImportNote() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailsTable, setShowDetailsTable] = useState(false);

  const [sortByQuantity, setSortByQuantity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;
  const [activePage, setActivePage] = useState(1);

  const [showAddModal, setShowAddModal] = useState(false);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);
  const showDetails = (machanghoa) => {
    const selectedProduct = Fakedata.find(
      (product) => product.machanghoa === machanghoa
    );
    if (selectedProduct) {
      setSelectedProduct(selectedProduct);
      setShowDetailsTable(true);
    } else {
      console.error("Product not found in Fakedata");
    }
  };
  const handleCloseDetails = () => {
    setShowDetailsTable(false);
    setSelectedProduct(null);
  };
  const handleAddSuccess = (newProduct) => {
    setProducts([...products, newProduct]);
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
          <CommonSlider />
        </Col>
        <Col md={10}>
          <Container className="ml-72 ">
            <Row className="title mb-0">
              <Col md={4} className="text-white ">
                <h2>Export Import note</h2>
              </Col>
              <Col md={4} />
              <Col md={4} className="button-container">
                <div className="d-flex gap-3">
                  <Button variant="primary" onClick={handleShowAddModal}>
                    <i className="far fa-plus-square"></i> Thêm
                  </Button>
                  <Button variant="primary">
                    <i className="far fa-plus-square"></i> Xuất ra file
                  </Button>
                </div>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <Row>
                  <ExportImportNoteTable
                    currentItems={currentItems}
                    sortedItems={sortedItems}
                    handlePageChange={handlePageChange}
                    activePage={activePage}
                    itemsPerPage={itemsPerPage}
                    sortByQuantity={sortByQuantity}
                    handleSortByQuantity={handleSortByQuantity}
                    showDetails={showDetails}
                    showDetailsTable={showDetailsTable}
                    selectedProduct={selectedProduct}
                    handleCloseDetails={handleCloseDetails}
                  />
                </Row>
              </Col>
            </Row>
          </Container>
        </Col>
      </div>
      <AddModal
        show={showAddModal}
        handleClose={handleCloseAddModal}
        onAddSuccess={handleAddSuccess}
        setProducts={setProducts}
      />
    </>
  );
}

export default ExportImportNote;
