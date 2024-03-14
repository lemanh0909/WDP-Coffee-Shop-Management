// Warehouse.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Pagination, Button } from "react-bootstrap";
import { usePagination } from "../Common/hooks.js";
import CommonNavbar from "../Common/navbar.jsx";
import CommonSlider from "../Common/sidebar.jsx";
import AddWarehouseModal from "./addWarehouse.jsx";
import UpdateWarehouseModal from "./updateWarehouse.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Warehouse() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
  const itemsPerPage = 6;
  const [getPaginatedItems, activePage, totalPages, handlePageChange] = usePagination(items, itemsPerPage);

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
      const response = await axios.get(`http://localhost:5000/api/v1/warehouse/${userData.shopId}/getAllWarehousesInShop`);
      setItems(response.data.data);
    } catch (error) {
      console.error('Error fetching warehouse data:', error);
      setError('An error occurred while fetching warehouse data.');
    } finally {
      console.log('Warehouse data fetching completed.');
    }
  };

  const handleUpdateWarehouse = (warehouseId) => {
    setSelectedWarehouseId(warehouseId);
    setShowUpdateModal(true);
  };

  const handleAddWarehouse = () => {
    toast.success('Thêm kho thành công!');
    fetchData();
  };

  const handleUpdateSuccess = () => {
    fetchData();
    setShowUpdateModal(false);
    toast.success('Cập nhật kho thành công!');
  };
  useEffect(() => {
    addCheckboxEventListeners();
  }, []);

  const addCheckboxEventListeners = () => {
    const checkboxes = document.querySelectorAll('.filter-section input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", function () {
        if (this.checked) {
          this.parentElement.classList.add("selected");
        } else {
          this.parentElement.classList.remove("selected");
        }
      });
    });
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
          <ToastContainer position='top-right' />
          <Row className="title mb-0">
            <Col md={4} className="text-white" >
              <h2>Quản lý nhà kho</h2>
            </Col>
            <Col md={4} />
            <Col md={4} className="button-container">
              <button type="button" className="btn btn-primary btn-color" onClick={() => setShowAddModal(true)}>
                <i className="fa-solid fa-plus"></i> Thêm sản phẩm
              </button>
              <button type="button" className="btn btn-primary btn-color">
                <i className="fa-solid fa-file-export"></i>
                Xuất ra file
              </button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Mã hàng hóa</th>
                      <th>Tên hàng hóa</th>
                      <th>Đơn vị</th>
                      <th>Số lượng</th>
                      <th>Ngày tạo</th>
                      <th>Ảnh</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaginatedItems.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center">No data to present!</td>
                      </tr>
                    ) : (
                      getPaginatedItems.map((item) => (
                        <tr key={item._id}>
                          <td>{item._id}</td>
                          <td style={{ color: '#BB2649', fontWeight: 'bold' }}>{item.name}</td>
                          <td>{item.unit}</td>
                          <td>{item.quantity}</td>
                          <td>{item.createdAt}</td>
                          <td>
                            <img
                              src={item.image}
                              alt={`Ảnh của ${item.name}`}
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            />
                          </td>
                          <td>
                            <Button
                              variant="primary"
                              className="edit-btn"
                              onClick={() => handleUpdateWarehouse(item._id)}
                            >
                              <i className="fa-solid fa-pen-to-square"></i>Update
                            </Button>
                            <button type="button" className="btn btn-danger">
                              <i className="fa-solid fa-trash"></i>Delete
                            </button>
                          </td>
                        </tr>
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
      <AddWarehouseModal
        userId={JSON.parse(localStorage.getItem('userData'))?.userID}
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        handleAddWarehouse={handleAddWarehouse}
      />
      {showUpdateModal && (
        <UpdateWarehouseModal
          warehouseId={selectedWarehouseId}
          onUpdateSuccess={handleUpdateSuccess}
          onHide={() => setShowUpdateModal(false)}
        />
      )}
    </>
  );
}

export default Warehouse;
