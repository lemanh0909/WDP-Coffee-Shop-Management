import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Pagination,
  Navbar,
  Nav,
  Button,
  ListGroup,
  InputGroup,
  FormControl,
  NavDropdown,
} from "react-bootstrap";
import "./Control.css";
import { usePagination } from "../Common/hooks.js";
import "bootstrap/dist/css/bootstrap.min.css";





const fakeData = [
  {
    id: 1,
    name: "COFFEE BEAN",
    "Giá nhập": "100,000 VND",
    "Giá bán": "150,000 VND",
    "Trạng thái": "In Stock",
    "Ngày nhập": "2024-01-29",
    "Tồn kho": 50,
  },
  {
    id: 2,
    name: "MILKTEA",
    "Giá nhập": "120,000 VND",
    "Giá bán": "180,000 VND",
    "Trạng thái": "Out of Stock",
    "Ngày nhập": "2024-01-30",
    "Tồn kho": 0,
  },
  {
    id: 3,
    name: "CAKE",
    "Giá nhập": "120,000 VND",
    "Giá bán": "180,000 VND",
    "Trạng thái": "Out of Stock",
    "Ngày nhập": "2024-01-30",
    "Tồn kho": 0,
  }




];

function Warehouse() {
  const itemsPerPage = 3;
  const [getPaginatedItems, activePage, totalPages, handlePageChange] =
    usePagination(fakeData, itemsPerPage);

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

  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="#home" className="custom-brand">
            Control
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#overview">Tổng quan</Nav.Link>
            <Nav.Link href="#staff"><i class="fa-solid fa-users"></i> Nhân viên</Nav.Link>
            <Nav.Link href="#"><i class="fa-solid fa-box-archive"></i></Nav.Link>
            <NavDropdown title="Hàng hóa" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Sản phẩm 1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Sản phẩm 2</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Sản phẩm 3</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Sản phẩm khác
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#store-list"><i class="fa-solid fa-store"></i> Danh sách cửa hàng</Nav.Link>
            <Nav.Link href="#transactions"><i class="fa-solid fa-money-bill-transfer"></i> Giao dịch</Nav.Link>
          </Nav>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
      <Row md={5} className="title">
        <Col md={4}>
          <br></br>
          <h2>Control Display</h2>
          <br></br>
        </Col><Col md={4} />



      </Row>

      <Container fluid>
        <Row>
          <Col md={2} className="sidebar">
            <div>
              <InputGroup className="mb-7">
                <FormControl
                  placeholder="MÃ HÀNG HÓA, TÊN"
                  aria-label="MÃ HÀNG HÓA, TÊN"
                />

                <Button variant="outline-secondary" id="button-addon2">
                  Search
                </Button>
              </InputGroup>
              <InputGroup className="mb-5">
                <FormControl
                  placeholder="TÊN NHÀ CUNG CẤP"
                  aria-label="MÃ HÀNG HÓA, TÊN"
                />
                <Button variant="outline-secondary" id="button-addon2">
                  Search
                </Button>
              </InputGroup>

              <div className="filter-section">
                <h5 className="text-decoration-underline">
                  Lọc theo loại hàng hóa
                </h5>
                <Form.Check
                  label="COFFEE BEAN"
                  name="group1"
                  type="checkbox"
                  id="checkbox1"
                  className="mb-1"
                />
                <Form.Check
                  label="COFFEE BEAN"
                  name="group1"
                  type="checkbox"
                  id="checkbox2"
                  className="mb-1"
                />
                <Form.Check
                  label="COFFEE BEAN"
                  name="group1"
                  type="checkbox"
                  id="checkbox3"
                  className="mb-1"
                />
                <Form.Check
                  label="COFFEE BEAN"
                  name="group1"
                  type="checkbox"
                  id="checkbox4"
                  className="mb-1"
                />
              </div>

              <div className="filter-section mt-3">
                <h5 className="text-decoration-underline">
                  Lọc theo loại nhóm
                </h5>
                <ListGroup variant="flush">
                  <ListGroup.Item action variant="light">
                    TẤT CẢ
                  </ListGroup.Item>
                  <ListGroup.Item action variant="light">
                    COFFEE BEAN
                  </ListGroup.Item>
                  <ListGroup.Item action variant="light">
                    MILK TEA
                  </ListGroup.Item>
                  <ListGroup.Item action variant="light">
                    COFFEE
                  </ListGroup.Item>
                  <ListGroup.Item action variant="light">
                    CAKE
                  </ListGroup.Item>
                  {/* Add more ListGroup.Items as needed */}
                </ListGroup>
              </div>

              <div className="filter-section mt-3">
                <h5 className="text-decoration-underline">Lọc theo tồn kho</h5>
                <Form.Check
                  label="CÒN HÀNG"
                  name="group2"
                  type="checkbox"
                  id="checkbox5"
                  className="mb-1"
                />
                <Form.Check
                  label="HẾT HÀNG"
                  name="group2"
                  type="checkbox"
                  id="checkbox6"
                  className="mb-1"
                />
              </div>
            </div>
          </Col>
          <Col xs={8}>
            <Row className="justify-content-center align-items-center">
              <Container fluid >
                <Row className="justify-content-center align-items-center">
                  <div class="col-md-6 d-flex flex-column justify-content-between">
                    <Row className="justify-content-center">
                      <button type="button" class="btn btn-outline-primary btn-lg mb-2">Bán Hàng</button>
                      <button type="button" class="btn btn-outline-primary btn-lg mb-2">Thanh Toán Tại Quầy</button>
                    </Row>
                    <Row className="justify-content-center">
                      <button type="button" class="btn btn-outline-primary btn-lg mb-2">Kho</button>
                      <button type="button" class="btn btn-outline-primary btn-lg mb-2">Báo Cáo</button>
                    </Row>
                  </div>
                  <div class="col-md-6 d-flex flex-column justify-content-between">
                    <Row className="justify-content-center">
                      <button type="button" class="btn btn-outline-primary btn-lg mb-2">Quản Lý Nhân Viên</button>
                      <button type="button" class="btn btn-outline-primary btn-lg mb-2">Cài Đặt</button>
                    </Row>
                    <Row className="justify-content-center">
                      <button type="button" class="btn btn-outline-primary btn-lg mb-2">Thu Chi</button>
                      <button type="button" class="btn btn-outline-primary btn-lg mb-2">Hướng Dẫn</button>
                    </Row>
                  </div>
                </Row>
              </Container>

            </Row>

            <Row>
              <Col>

              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Warehouse;
