import { React, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./navbar.css";
import logoImage from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const CommonNavbar = () => {

    const navigate = useNavigate();
    const [isLoggedIn, setLoggedIn] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('userData');
        setLoggedIn(false);
        navigate("/");
    };

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

                    <Nav.Link href="/order">
                        <i class="fa-solid fa-store"></i>
                        Order
                    </Nav.Link>
                    <Nav.Link href="#transactions">
                        <i className="fa-solid fa-money-bill-transfer"></i> Giao dịch
                    </Nav.Link>

                    {isLoggedIn ? (
                        <Nav className="ml-auto">
                            <Nav.Link onClick={handleLogout}>Đăng xuất</Nav.Link>
                        </Nav>
                    ) : null}
                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Container>
        </Navbar>
    );
};

export default CommonNavbar;
