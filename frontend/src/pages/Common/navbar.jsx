import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const CommonNavbar = () => {
    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Brand href="#home" className="custom-brand">
                    Coffee Shop
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/control">Tổng quan</Nav.Link>
                    <Nav.Link href="/employee-management">
                        <i class="fa-solid fa-users"></i> Nhân viên
                    </Nav.Link>
                    <Nav.Link href="/productmanage" title="Hàng hóa" id="basic-nav-dropdown">
                        <i class="fa-solid fa-box-archive"></i> Hàng Hóa
                    </Nav.Link>
                    <Nav.Link href="/warehouse">Nhà kho</Nav.Link>
                    <Nav.Link href="#transactions">
                        <i class="fa-solid fa-money-bill-transfer"></i> Giao dịch
                    </Nav.Link>
                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Container>
        </Navbar>
    );
};

export default CommonNavbar;