import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Pagination,
  Button,
} from "react-bootstrap";
import { usePagination } from "../Common/hooks.js";
import axios from "axios";
import CommonNavbar from "../Common/navbar.jsx";
import CommonSlider from "../Common/sidebar.jsx";
import AddModal from "./add.jsx";

import { Fakedata } from "./Fakedata.js";

function ExportImportNote() {
  const itemsPerPage = 7;
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [paginatedItems, activePage, totalPages, handlePageChange] =
    usePagination(products, itemsPerPage);
  const [showDetailsTable, setShowDetailsTable] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const showDetails = (machanghoa) => {
    const selectedProduct = Fakedata.find(
      (product) => product.machanghoa === machanghoa
    );

    if (selectedProduct) {
      setSelectedProduct(selectedProduct);
      setShowDetailsTable(true);
    } else {
      console.error("Product not found in Fakedata");
    }
  };
  const handleAddSuccess = (newProduct) => {
    setProducts([...products, newProduct]);
  };


  useEffect(() => {
    setProducts(Fakedata);
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
          <Row className="title mb-0">
            <Col md={4} className="text-white ">
              <h2>Export Import note</h2>
            </Col>
            <Col md={4} />
            <Col md={4} className="button-container">
              <div className="d-flex gap-3">
                <Button variant="primary" onClick={handleShowAddModal}>
                  <i className="far fa-plus-square"></i> Thêm
                </Button>
                <Button variant="primary">
                  <i className="far fa-plus-square"></i> Xuất ra file
                </Button>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Row>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Mã hàng hóa</th>
                      <th>Tên hàng hóa</th>
                      <th>Lý do</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedItems.map((item, index) => (
                      <React.Fragment key={index}>
                        <tr>
                          <td>{item.machanghoa}</td>
                          <td style={{ color: "#BB2649", fontWeight: "bold" }}>
                            {item.tenhanghoa}
                          </td>
                          <td>{item.lydo}</td>
                          <td>{item.gia}</td>
                          <td>{item.soluong}</td>
                          <td>
                            <Button onClick={() => showDetails(item.machanghoa)}>
                              Xem chi tiết
                            </Button>
                          </td>
                        </tr>
                        {showDetailsTable && selectedProduct && selectedProduct.machanghoa === item.machanghoa && (
                          <tr>
                            <td colSpan="6">
                              <div className="details-table-container">
                                <Table bordered>
                                  <tbody>
                                    <tr>
                                      <td className="field" >Tên hàng hóa:</td>
                                      <td style={{ color: "#BB2649", fontWeight: "bold" }}>{selectedProduct.tenhanghoa}</td>
                                    </tr>
                                    <tr>
                                      <td className="field">Mã hàng hóa:</td>
                                      <td>{selectedProduct.machanghoa}</td>
                                    </tr>
                                    <tr>
                                      <td className="field">Lý do:</td>
                                      <td>{selectedProduct.lydo}</td>
                                    </tr>
                                    <tr>
                                      <td className="field">Ngày nhập:</td>
                                      <td>{selectedProduct.dateImport}</td>
                                    </tr>
                                    <tr>
                                      <td className="field">Ngày xuất:</td>
                                      <td>{selectedProduct.dateExport}</td>
                                    </tr>
                                    <tr>
                                      <td className="field">Số lượng:</td>
                                      <td>{selectedProduct.soluong}</td>
                                    </tr>
                                    <tr>
                                      <td className="field">Giá cả:</td>
                                      <td>{selectedProduct.gia}</td>
                                    </tr>
                                    <tr>
                                      <td className="field w-40">Miêu tả:</td>
                                      <td className="w-60">{selectedProduct.mieuta}</td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div>
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
      </div>
      <AddModal
        show={showAddModal}
        handleClose={handleCloseAddModal}
        onAddSuccess={handleAddSuccess}
        setProducts={setProducts} // Pass setProducts here
      />

    </>
  );
}
export default ExportImportNote;
