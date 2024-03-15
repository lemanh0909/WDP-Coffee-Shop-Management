import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import "./viewOrderDetail.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CommonNavbar from "../Common/navbar.jsx";
import Sidebar from "../Common/sidebar.jsx";
import React from "react";

function ViewDetail() {
    return (
        <>
            <CommonNavbar />
            <Container fluid className="ml-72">
                <Row className="mb-3">
                    <Col>
                        <h2>Chi tiết đơn hàng</h2>
                    </Col>
                    <Col className="text-right">
                        <Button variant="primary" className="mr-2">
                            <i className="fa-solid fa-plus"></i> Thêm danh mục
                        </Button>
                        <Button variant="secondary">
                            <i className="fa-solid fa-file-export"></i> Xuất ra file
                        </Button>
                    </Col>
                </Row>

                <Row className="justify-content-center mb-4">
                    <Col md={9}>
                        <Card>
                            <Card.Header as="h5">Mã đơn hàng: HD123456</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={6}>
                                        <p><strong>Ngày bán:</strong> 15 Mar 2023, 12:47 PM</p>
                                        <p><strong>Người bán:</strong> Nguyen Van A</p>
                                    </Col>
                                    <Col md={6}>
                                        <p><strong>Tổng giá:</strong> 100,000</p>
                                        <p><strong>Khách trả:</strong> 100,000</p>
                                        <p className="status-paid">Đã thanh toán</p>
                                    </Col>
                                </Row>
                                <Table striped bordered hover responsive="sm">
                                    <thead>
                                        <tr>
                                            <th>Mã hàng hóa</th>
                                            <th>Tên hàng hóa</th>
                                            <th>Số lượng</th>
                                            <th>Đơn giá</th>
                                            <th>Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>HH123</td>
                                            <td>Cà phê đen</td>
                                            <td>4</td>
                                            <td>25,000</td>
                                            <td>100,000</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <div className="total-info">
                                    <p>Voucher: <strong>Không</strong></p>
                                    <p><strong>Tổng cộng:</strong> 100,000</p>
                                    <p><strong>Tổng thanh toán:</strong> 100,000</p>
                                </div>
                                <div className="invoice-actions text-right">
                                    <Button variant="primary" className="mr-2">Export to excel</Button>
                                    <Button variant="secondary" className="mr-2">In</Button>
                                    <Button variant="success" className="mr-2">Cập nhật</Button>
                                    <Button variant="danger">Hủy</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Sidebar />
            </Container>
        </>
    );
}

export default ViewDetail;
