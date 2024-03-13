import React, { useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Card,
} from "react-bootstrap";
import "./Category.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CommonNavbar from "../Common/navbar.jsx"
import Sidebar from "../Common/sidebar.jsx"

function Category() {

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
                    <Sidebar />
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
    )
}

export default Category;
