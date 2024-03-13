import React, { useState } from "react";
import { Container, Row, Col, Table, Button, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./viewOrder.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CommonNavbar from "../Common/navbar.jsx";
import { usePagination } from "../Common/hooks.js";


const orders = [
  { id: 1, date: '2024-03-13', seller: 'John Doe', total: 100, paidByCustomer: 80, status: 'Completed', paymentMethod: 'Cash' },
  { id: 2, date: '2024-03-12', seller: 'Jane Smith', total: 150, paidByCustomer: 150, status: 'Pending', paymentMethod: 'Credit Card' },
  
];

function ViewOrder() {
  const [activePage, setActivePage] = useState(1); 
  const itemsPerPage = 5; 
  const totalPages = Math.ceil(orders.length / itemsPerPage); 
  const paginatedItems = orders.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage); 

  
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <>
      <CommonNavbar />
      <Container fluid>
        <Row className="title justify-content-center">
          <Col md={8} className="text-center">
            <h2>Danh sách đơn hàng</h2>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã đơn hàng</th>
                  <th>Ngày bán</th>
                  <th>Người bán</th>
                  <th>Tổng giá</th>
                  <th>Khách trả</th>
                  <th>Trạng thái</th>
                  <th>Hình thức thanh toán</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.seller}</td>
                    <td>{order.total}</td>
                    <td>{order.paidByCustomer}</td>
                    <td>{order.status}</td>
                    <td>{order.paymentMethod}</td>
                    <td>
                      <Link to={`/view-order/${order.id}`} className="btn btn-primary btn-sm">Xem chi tiết</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <Pagination className="pagination">
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
    </>
  );
}

export default ViewOrder;
