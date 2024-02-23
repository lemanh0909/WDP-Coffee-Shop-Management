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
import "./Category.css";
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
                        Category
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
                    <h2>Danh Mục</h2>
                </Col><Col md={4} />

                <Col md={4} className="button-container">
                    <button type="button" className="btn btn-primary add-btn">
                        <i class="fa-solid fa-plus"></i> Thêm danh mục
                    </button>
                    <button type="button" className="btn btn-primary">
                        <i class="fa-solid fa-file-export"></i>
                        Xuất ra file
                    </button>
                </Col>

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
                    <Col xs={9}>
                        <Row>
                            <Container fluid>
                                <Row className="justify-content-center">
                                    <Col md={3}>
                                        <Card className="my-3">
                                            <Card.Img variant="top" src="https://assets.epicurious.com/photos/63e54a0664e14d52936a2937/1:1/w_2539,h_2539,c_limit/CoffeeSubscriptions_IG_V1_030922_6350_V1_final.jpg" />
                                            <Card.Body>
                                                <Card.Title className="text-center">COFFEE BEAN</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={3}>
                                        <Card className="my-3">
                                            <Card.Img variant="top" src="https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/AE8AB721-ACB5-4E82-845C-75CB6BCFFB96/Derivates/e3b88c15-1aea-4554-b9b0-77514681f359.jpg" />
                                            <Card.Body>
                                                <Card.Title className="text-center">MILK TEA</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={3}>
                                        <Card className="my-3">
                                            <Card.Img variant="top" src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/7/10/1066729/Dmaw_Kdxoaujopn.jpg" />
                                            <Card.Body>
                                                <Card.Title className="text-center">COFFEE</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={3}>
                                        <Card className="my-3">
                                            <Card.Img variant="top" src="https://tutrungbaybanhkem.com/wp-content/uploads/2019/09/cafe-banh-ngot.jpg" />
                                            <Card.Body>
                                                <Card.Title className="text-center">CAKE</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
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
