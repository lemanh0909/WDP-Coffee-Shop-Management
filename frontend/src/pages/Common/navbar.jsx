import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

const CommonNavbar = () => {
    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Brand href="#home" className="custom-brand">
                    Product Manage
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#overview">Tổng quan</Nav.Link>
                    <Nav.Link href="#staff">
                        <i class="fa-solid fa-users"></i> Nhân viên
                    </Nav.Link>
                    <Nav.Link href="#">
                        <i class="fa-solid fa-box-archive"></i>
                    </Nav.Link>
                    <NavDropdown title="Hàng hóa" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Sản phẩm 1</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Sản phẩm 2</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Sản phẩm 3</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Sản phẩm khác
                        </NavDropdown.Item>
                    </NavDropdown>
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