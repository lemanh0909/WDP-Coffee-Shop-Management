import React from 'react';
import { Col, Form, InputGroup, FormControl, Button, ListGroup } from 'react-bootstrap';

function Sidebar({ handlePageChange, activePage, totalPages, getPaginatedItems }) {
    return (
        <Col md={5} className="sidebar">
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
    );
}

export default Sidebar;