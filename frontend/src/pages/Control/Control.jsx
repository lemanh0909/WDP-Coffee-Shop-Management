import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button
} from "react-bootstrap";
import "./Control.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CommonNavbar from "../Common/navbar.jsx";

function Control() {
  return (
    <>
      <CommonNavbar />
      <Container fluid>
        <Row className="title justify-content-center">
          <Col md={8} className="text-center">
            <h2>Control Display</h2>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Row className="justify-content-center">
              <Col md={6} className="d-flex flex-column align-items-center">
                <Button variant="outline-primary" size="lg" className="btn btn-outline-primary btn-lg mb-3 btn-zoom">Bán Hàng</Button>
                <Link to="/warehouse" className="btn btn-outline-primary btn-lg mb-3 btn-zoom">Kho</Link>
                <Link to="/employee-management" className="btn btn-outline-primary btn-lg mb-3 btn-zoom">Quản Lý Nhân Viên</Link>
                <Link to="/Thuchi" className="btn btn-outline-primary btn-lg mb-3 btn-zoom">Thu Chi</Link>
              </Col>
              <Col md={6} className="d-flex flex-column align-items-center">
                <Link to="#" className="btn btn-outline-primary btn-lg mb-3 btn-zoom">Thanh Toán Tại Quầy</Link>
                <Link to="/productmanage" className="btn btn-outline-primary btn-lg mb-3 btn-zoom">Quản lý product</Link>
                <Button variant="outline-primary" size="lg" className="btn btn-outline-primary btn-lg mb-3 btn-zoom">Cài Đặt</Button>
                <Link to="/category" className="btn btn-outline-primary btn-lg mb-3 btn-zoom">Category</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Control;
