import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Table,
  Pagination,
} from "react-bootstrap";
import "./warehouse.css";
import { usePagination } from "../Common/hooks.js";
import "bootstrap/dist/css/bootstrap.min.css";
import CommonNavbar from "../Common/navbar.jsx";
import Sidebar from "../Common/sidebar.jsx";

function Warehouse() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const itemsPerPage = 3;
  const [getPaginatedItems, activePage, totalPages, handlePageChange] =
    usePagination(items, itemsPerPage);

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/warehouse/getAll")
      .then(response => {
        if (response.data.isSuccess) {
          setItems(response.data.data.data);
        } else {
          setError("Error: " + response.data.message);
        }
      })
      .catch(error => {
        setError("Error: " + error.message);
      });
  }, []);

  useEffect(() => {
    const checkboxes = document.querySelectorAll(
      '.filter-section input[type="checkbox"]'
    );

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", function () {
        if (this.checked) {
          this.parentElement.classList.add("selected");
        } else {
          this.parentElement.classList.remove("selected");
        }
      });
    });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <CommonNavbar />
      
      <Row md={5} className="title">
        <Col md={4}>
          <h2>Quản lý nhà kho</h2>
        </Col>
        <Col md={4} />
        <Col md={4} className="button-container">
          <button type="button" className="btn btn-primary add-btn">
            <i class="fa-solid fa-plus"></i> Thêm sản phẩm
          </button>
          <button type="button" className="btn btn-primary">
            <i class="fa-solid fa-file-export"></i>
            Xuất ra file
          </button>
        </Col>
      </Row>

      <Container fluid>
        <Row>
          <Sidebar />
          <Col xs={9}>
            <Row>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Mã hàng hóa</th>
                    <th>Tên hàng hóa</th>
                    <th>Số lượng</th>
                    <th>Ảnh</th>
                    <th>Cập nhật</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {getPaginatedItems.map((item) => (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td style={{ color: '#BB2649', fontWeight: 'bold' }}>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <img src={item.image} alt={item.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                      </td>
                      <td>{item.updatedAt}</td>
                      <td>
                        <button type="button" className="btn btn-primary edit-btn"><i className="fa-solid fa-pen-to-square"></i></button>
                        <button type="button" className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                      </td>
                    </tr>
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
    </>
  );
}

export default Warehouse;
