import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./navbar.css";
import logoImage from "../images/logo.png";

const CommonNavbar = () => {
    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Brand href="#home" className="custom-brand col-3 ">
                    <img src={logoImage} alt="Logo" className="navbar-logo img-fluid " />
                </Navbar.Brand>
                <div className="col-3"></div>
                <Nav className="mr-auto font-semibold">
                    <Nav.Link href="/control">Tổng quan</Nav.Link>
                    <Nav.Link href="/employee-management">
                        <i className="fa-solid fa-users"></i> Nhân viên </Nav.Link>

                    <Nav.Link href="/warehouse">
                        <i className="fa-solid fa-box-archive"></i> Hàng Hóa
                    </Nav.Link>

                    <Nav.Link href="#store-list">
                    <i class="fa-solid fa-store"></i>
                        Danh sách cửa hàng
                        </Nav.Link>
                    <Nav.Link href="#transactions">
                        <i className="fa-solid fa-money-bill-transfer"></i> Giao dịch
                    </Nav.Link>
                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Container>
        </Navbar>
    );
};

export default CommonNavbar;
