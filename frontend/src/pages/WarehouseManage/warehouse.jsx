import React from 'react';
import { Container, Row, Col, Table, Form, Pagination, Navbar, Nav, Button, ListGroup, InputGroup, FormControl, NavDropdown } from 'react-bootstrap';
import './warehouse.css'
import { usePagination } from '../Common/hooks.js'
import 'bootstrap/dist/css/bootstrap.min.css';

const fakeData = [
  { id: 1, name: 'Sản phẩm 1', 'Giá nhập': '100,000 VND', 'Giá bán': '150,000 VND', 'Trạng thái': 'In Stock', 'Ngày nhập': '2024-01-29', 'Tồn kho': 50 },
  { id: 2, name: 'Sản phẩm 2', 'Giá nhập': '120,000 VND', 'Giá bán': '180,000 VND', 'Trạng thái': 'Out of Stock', 'Ngày nhập': '2024-01-30', 'Tồn kho': 0 },
  { id: 3, name: 'Sản phẩm 3', 'Giá nhập': '80,000 VND', 'Giá bán': '120,000 VND', 'Trạng thái': 'In Stock', 'Ngày nhập': '2024-01-28', 'Tồn kho': 30 },
  { id: 4, name: 'Sản phẩm 4', 'Giá nhập': '90,000 VND', 'Giá bán': '130,000 VND', 'Trạng thái': 'Out of Stock', 'Ngày nhập': '2024-02-01', 'Tồn kho': 0 },
  { id: 5, name: 'Sản phẩm 5', 'Giá nhập': '110,000 VND', 'Giá bán': '160,000 VND', 'Trạng thái': 'In Stock', 'Ngày nhập': '2024-02-02', 'Tồn kho': 25 },
  { id: 6, name: 'Sản phẩm 6', 'Giá nhập': '70,000 VND', 'Giá bán': '100,000 VND', 'Trạng thái': 'In Stock', 'Ngày nhập': '2024-02-03', 'Tồn kho': 50 },
  { id: 7, name: 'Sản phẩm 7', 'Giá nhập': '85,000 VND', 'Giá bán': '120,000 VND', 'Trạng thái': 'Out of Stock', 'Ngày nhập': '2024-02-04', 'Tồn kho': 0 },
  { id: 8, name: 'Sản phẩm 8', 'Giá nhập': '95,000 VND', 'Giá bán': '140,000 VND', 'Trạng thái': 'In Stock', 'Ngày nhập': '2024-02-05', 'Tồn kho': 15 },
];

function Warehouse() {
  const itemsPerPage = 3;
  const [getPaginatedItems, activePage, totalPages, handlePageChange] = usePagination(fakeData, itemsPerPage);

  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="#home" className="custom-brand">
            Warehouse
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="mr-auto">
            <Nav.Link href="#overview" >Tổng quan</Nav.Link>
            <Nav.Link href="#staff">Nhân viên</Nav.Link>
            <NavDropdown title="Hàng hóa" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Sản phẩm 1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Sản phẩm 2</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Sản phẩm 3</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Sản phẩm khác</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#store-list">Danh sách cửa hàng</Nav.Link>
            <Nav.Link href="#transactions">Giao dịch</Nav.Link>
          </Nav>
          <Form className="d-flex custom-search-form">
            <FormControl type="text" placeholder="Tìm kiếm" className="mr-sm-2" />
            <Button variant="outline-success" className="custom-search-button">Tìm kiếm</Button>
          </Form>
        </Container>
      </Navbar>
      <Row>
        <h2>Quản lý hàng hóa</h2>
      </Row>
      <Container fluid>
        <Row>
          <Col xs={3} className='sidebar'>
            <div>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="MÃ HÀNG HÓA, TÊN"
                  aria-label="MÃ HÀNG HÓA, TÊN"
                />
                <Button variant="outline-secondary" id="button-addon2">
                  Search
                </Button>
              </InputGroup>

              <div className="filter-section">
                <h5 className="text-decoration-underline">Lọc theo loại hàng hóa</h5>
                <Form.Check label="COFFEE BEAN" name="group1" type="checkbox" id="checkbox1" className="mb-1" />
                <Form.Check label="COFFEE BEAN" name="group1" type="checkbox" id="checkbox2" className="mb-1" />
                <Form.Check label="COFFEE BEAN" name="group1" type="checkbox" id="checkbox3" className="mb-1" />
                <Form.Check label="COFFEE BEAN" name="group1" type="checkbox" id="checkbox4" className="mb-1" />
              </div>

              <div className="filter-section mt-3">
                <h5 className="text-decoration-underline">Lọc theo loại nhóm</h5>
                <ListGroup variant="flush">
                  <ListGroup.Item action variant="light">
                    TẤT CẢ
                  </ListGroup.Item>
                  <ListGroup.Item action variant="light">
                    COFFEE BEAN
                  </ListGroup.Item>
                  <ListGroup.Item action variant="light">
                    MILK
                  </ListGroup.Item>
                  <ListGroup.Item action variant="light">
                    CAKE
                  </ListGroup.Item>
                  {/* Add more ListGroup.Items as needed */}
                </ListGroup>
              </div>

              <div className="filter-section mt-3">
                <h5 className="text-decoration-underline">Lọc theo tồn kho</h5>
                <Form.Check label="CÒN HÀNG" name="group2" type="checkbox" id="checkbox5" className="mb-1" />
                <Form.Check label="HẾT HÀNG" name="group2" type="checkbox" id="checkbox6" className="mb-1" />
              </div>
            </div>
          </Col>
          <Col xs={9}>
            <Row>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Mã hàng hóa</th>
                    <th>Tên hàng hóa</th>
                    <th>Giá nhập</th>
                    <th>Giá bán</th>
                    <th>Trạng thái</th>
                    <th>Ngày nhập</th>
                    <th>Tồn kho</th>
                  </tr>
                </thead>
                <tbody>
                  {getPaginatedItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item['Giá nhập']}</td>
                      <td>{item['Giá bán']}</td>
                      <td>{item['Trạng thái']}</td>
                      <td>{item['Ngày nhập']}</td>
                      <td>{item['Tồn kho']}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>

            <Row>
              <Col>
                <Pagination>
                  <Pagination.Prev onClick={() => handlePageChange(activePage - 1)} disabled={activePage === 1} />
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Pagination.Item key={i + 1} active={i + 1 === activePage} onClick={() => handlePageChange(i + 1)}>
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next onClick={() => handlePageChange(activePage + 1)} disabled={activePage === totalPages} />
                </Pagination>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Warehouse;
