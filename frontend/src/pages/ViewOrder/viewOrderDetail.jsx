
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./viewOrderDetail.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CommonNavbar from "../Common/navbar.jsx";

function ViewOrderDetail() {
  const { orderId } = useParams(); 
  const [order, setOrder] = useState(null); 

  
  const fetchOrderDetail = async () => {
    try {
      
      const response = await fetch(`api/orders/${orderId}`);
      const data = await response.json();
      setOrder(data); // Lưu thông tin đơn hàng vào state
    } catch (error) {
      console.error("Error fetching order detail:", error);
    }
  };

  
  useEffect(() => {
    fetchOrderDetail();
  }, []);

  return (
    <>
      <CommonNavbar />
      <Container fluid>
        <Row className="title justify-content-center">
          <Col md={8} className="text-center">
            <h2>Chi Tiết Đơn Hàng</h2>
          </Col>
        </Row>

        {order && (
          <Row>
            <Col md={12}>
              <p>Mã đơn hàng: {order.id}</p>
              <p>Ngày bán: {order.date}</p>
              <p>Người bán: {order.seller}</p>
              <p>Tổng giá: {order.total}</p>
              <p>Khách trả: {order.paidByCustomer}</p>
              <p>Trạng thái: {order.status}</p>
              <p>Hình thức thanh toán: {order.paymentMethod}</p>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default ViewOrderDetail;
