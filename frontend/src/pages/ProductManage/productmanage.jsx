import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Pagination } from "react-bootstrap";
import "./productmanage.css";
import { usePagination } from "../Common/hooks.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../Common/sidebar.jsx'
import axios from 'axios';
import CommonNavbar from "../Common/navbar.jsx";

function ProductManage() {

  const itemsPerPage = 7;
  const [products, setProducts] = useState([]);
  const [paginatedItems, activePage, totalPages, handlePageChange] = usePagination(products, itemsPerPage);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const showDetails = (productId) => {
    axios.get(`http://localhost:5000/api/v1/product/${productId}/getProductById`)
      .then(response => {
        setSelectedProduct(response.data.data); // Lưu thông tin chi tiết sản phẩm vào state khi API trả về
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/product/getAllProducts')
      .then(response => {
        setProducts(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    const checkboxes = document.querySelectorAll('.filter-section input[type="checkbox"]');
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
        <Col md={6}>
          <h2>Quản lý hàng hóa</h2>
        </Col>
      </Row>
      <Container fluid>
        <Row>
          <Sidebar
            handlePageChange={handlePageChange}
            activePage={activePage}
            totalPages={totalPages}
            getPaginatedItems={paginatedItems}
          />
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
                        <td style={{ color: '#BB2649', fontWeight: 'bold' }}>{item.name}</td>
                        <td>
                          <button onClick={() => showDetails(item._id)}>Xem chi tiết</button>
                        </td>
                        <td>
                          <button type="button" className="btn btn-primary edit-btn"><i className="fa-solid fa-pen-to-square"></i></button>
                          <button type="button" className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                        </td>
                      </tr>
                      {selectedProduct && selectedProduct._id === item._id && (
                        <tr>
                          <td colSpan="4">
                            <table className="detail-table">
                              <tbody>
                                {selectedProduct.productVariant.map((variant, index) => (
                                  <tr>
                                    <td colSpan="4">
                                      <table className="detail-table">
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
                                            <td><img src={variant.image} alt="Product" /></td>
                                          </tr>
                                          {/* <tr>
                                          <td className="field">Công thức:</td>
                                          <td>
                                            <ul>
                                              {selectedProduct.recipe && selectedProduct.recipe.map((ingredient, index) => (
                                                <li key={index}>{ingredient.warehouse.name}: {ingredient.require}</li>
                                              ))}
                                            </ul>
                                          </td>
                                        </tr> */}
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </td>
                        </tr>
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
    </>
  );
}

export default ProductManage;