import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button
} from "react-bootstrap";
import "./Control.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CommonNavbar from "../Common/navbar.jsx";
import useAuth from "../Common/Authorization.js";

function Control() {
  const [role] = useAuth();
  const navigate = useNavigate();
  if (role === "Admin") {
    navigate("/AdminManagement");
  }
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
                <Button variant="/exportimportnote" size="lg" className="btn btn-outline-primary btn-lg mb-3 btn-zoom">Export-Import note</Button>
                <Link to="/warehouse" className="btn btn-outline-primary btn-lg mb-3 btn-zoom">Warehouse</Link>
                {role !== "Staff" && <Link to="/employee-management" className="btn btn-outline-primary btn-lg mb-3 btn-zoom">Staff management</Link>}
                <Link to="/Thuchi" className="btn btn-outline-primary btn-lg mb-3 btn-zoom">Receipt</Link>
              </Col>
              <Col md={6} className="d-flex flex-column align-items-center">
                <Link to="/order" className="btn btn-outline-primary btn-lg mb-3 btn-zoom">Order</Link>
                <Link to="/productmanage" className="btn btn-outline-primary btn-lg mb-3 btn-zoom">Product management</Link>
                <Link to="/view-order" className="btn btn-outline-primary btn-lg mb-3 btn-zoom">View Order</Link>
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
