import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Pagination,
  Button,
} from "react-bootstrap";
import "./productmanage.css";
import { usePagination } from "../Common/hooks.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import CommonNavbar from "../Common/navbar.jsx";
import CommonSlider from "../Common/sidebar.jsx";
import AddProductModal from "./addProduct.jsx";

function ProductVariantDetails({ variant }) {
  return (
    <div className="detail-table">
      <table>
        <tbody>
          <tr>
            <td className="field">Tên:</td>
            <td>{variant.name}</td>
          </tr>
          <tr>
            <td className="field">Mô tả:</td>
            <td>{variant.description}</td>
          </tr>
          <tr>
            <td className="field">Kích thước:</td>
            <td>{variant.size}</td>
          </tr>
          <tr>
            <td className="field">Giá:</td>
            <td>{variant.price}</td>
          </tr>
          <tr>
            <td className="field">Hình ảnh:</td>
            <td>
              <img src={variant.image} alt="Product" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ProductManage() {
  const itemsPerPage = 7;
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [paginatedItems, activePage, totalPages, handlePageChange] =
    usePagination(products, itemsPerPage);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  const showDetails = (productId) => {
    axios
      .get(`http://localhost:5000/api/v1/product/${productId}/getProductById`)
      .then((response) => {
        setSelectedProduct(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/product/getAllProducts")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <>
      <CommonNavbar />
      <div className="flex">
        <CommonSlider
          handlePageChange={handlePageChange}
          activePage={activePage}
          totalPages={totalPages}
          getPaginatedItems={paginatedItems}
        />
        <Container className="ml-72 ">
          <Row className="title">
            <Col md={4} className="text-white">
              <h2>Quản lý sản phẩm</h2>
            </Col>
            <Col md={4} />
            <Col md={4} className="button-container">
              <div className="">
                <Button
                  variant="primary"
                  className="add-btn btn-color"
                  onClick={handleShowModal}
                >
                  <i className="fa-solid fa-plus"></i> Thêm sản phẩm
                </Button>
                <Button variant="primary" className="btn-color">
                  <i className="fa-solid fa-file-export"></i> Biến thể
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={9}>
              <Row>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Mã hàng hóa</th>
                      <th>Tên hàng hóa</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedItems.map((item) => (
                      <React.Fragment key={item._id}>
                        <tr>
                          <td>{item._id}</td>
                          <td style={{ color: "#BB2649", fontWeight: "bold" }}>
                            {item.name}
                          </td>
                          <td>
                            <Button onClick={() => showDetails(item._id)}>
                              Xem chi tiết
                            </Button>
                          </td>
                          <td>
                            <Button variant="primary" className="edit-btn">
                              <i className="fa-solid fa-pen-to-square"></i>
                            </Button>
                            <Button variant="danger">
                              <i className="fa-solid fa-trash"></i>
                            </Button>
                          </td>
                        </tr>
                        {selectedProduct &&
                          selectedProduct._id === item._id && (
                            <React.Fragment>
                              <tr>
                                <td colSpan="4">
                                  <div className="variant-details-container">
                                    <p className="variant-count">
                                      Số lượng biến thể:{" "}
                                      {selectedProduct.productVariant.length}
                                    </p>
                                    <Row>
                                      <Col xs={6}>
                                        <ul className="variant-list">
                                          {selectedProduct.productVariant.map(
                                            (variant, index) => (
                                              <li key={index}>
                                                <Button
                                                  onClick={() =>
                                                    setSelectedVariant(variant)
                                                  }
                                                >
                                                  Xem chi tiết biến thể{" "}
                                                  {index + 1}
                                                </Button>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </Col>
                                      <Col xs={6}>
                                        {selectedVariant && (
                                          <ProductVariantDetails
                                            variant={selectedVariant}
                                          />
                                        )}
                                      </Col>
                                    </Row>
                                  </div>
                                </td>
                              </tr>
                            </React.Fragment>
                          )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </Table>
              </Row>
              <Row>
                <Col>
                  <Pagination className="pagination">
                    <Pagination.Prev
                      onClick={() => handlePageChange(activePage - 1)}
                      disabled={activePage === 1}
                    />
                    {Array.from({ length: totalPages }, (_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === activePage}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      onClick={() => handlePageChange(activePage + 1)}
                      disabled={activePage === totalPages}
                    />
                  </Pagination>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <AddProductModal show={showModal} handleClose={handleCloseModal} />
    </>
  );
}

export default ProductManage;