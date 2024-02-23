import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const CommonNavbar = () => {
    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Brand href="#home" className="custom-brand">
                    Product Manage
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/warehouse">Tổng kho</Nav.Link>
                    <Nav.Link href="/employee-management">
                        <i class="fa-solid fa-users"></i> Nhân viên
                    </Nav.Link>

                    <Nav.Link href="/productmanage">
                        <i class="fa-solid fa-box-archive"></i> Hàng hóa
                    </Nav.Link>
                    <Nav.Link href="#store-list">Danh sách cửa hàng</Nav.Link>
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
