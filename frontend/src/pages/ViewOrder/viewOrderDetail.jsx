

import {Container,Row,Col,Card, Pagination, Table, Button} from "react-bootstrap";
import "./viewOrderDetail.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CommonNavbar from "../Common/navbar.jsx"
import Sidebar from "../Common/sidebar.jsx"
import React, {useEffect } from "react";
import { usePagination } from "../Common/hooks.js";

function ViewDetail() {

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
            <CommonNavbar />
            <Row md={5} className="title">
                <Col md={4}>
                    <h2>Chi tiết đơn hàng</h2>
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
                    <Sidebar />
                    <Col xs={9}>
                        <Row>
                            {/* code here */}
                        </Row>

                        
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ViewDetail;
