import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import "./viewOrderDetail.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

function ViewDetail() {
    return (
        <>
            <Container fluid className="ml-72">
                <Row className="mb-3">
                    <Col>
                        <h2>Order Details</h2>
                    </Col>
                    <Col className="text-right">
                        <Button variant="primary" className="mr-2">
                            <i className="fa-solid fa-plus"></i> Add category
                        </Button>
                        <Button variant="secondary">
                            <i className="fa-solid fa-file-export"></i> Export to file
                        </Button>
                    </Col>
                </Row>

                <Row className="justify-content-center mb-4">
                    <Col md={9}>
                        <Card>
                            <Card.Header as="h5">Order ID: HD123456</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={6}>
                                        <p><strong>Order Date:</strong> 15 Mar 2023, 12:47 PM</p>
                                        <p><strong>Seller:</strong> Nguyen Van A</p>
                                    </Col>
                                    <Col md={6}>
                                        <p><strong>Total Price:</strong> 100,000</p>
                                        <p><strong>Customer Pay:</strong> 100,000</p>
                                        <p className="status-paid">Paid</p>
                                    </Col>
                                </Row>
                                <Table striped bordered hover responsive="sm">
                                    <thead>
                                        <tr>
                                            <th>Product ID</th>
                                            <th>Product Name</th>
                                            <th>Quantity</th>
                                            <th>Unit Price</th>
                                            <th>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>HH123</td>
                                            <td>Black Coffee</td>
                                            <td>4</td>
                                            <td>25,000</td>
                                            <td>100,000</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <div className="total-info">
                                    <p>Voucher: <strong>No</strong></p>
                                    <p><strong>Total:</strong> 100,000</p>
                                    <p><strong>Total Paid:</strong> 100,000</p>
                                </div>
                                <div className="invoice-actions text-right">
                                    <Button variant="primary" className="mr-2">Export to excel</Button>
                                    <Button variant="secondary" className="mr-2">Print</Button>
                                    <Button variant="success" className="mr-2">Update</Button>
                                    <Button variant="danger">Cancel</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ViewDetail;
