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
import AddPhieuThuModal from "./addPhieuThu.jsx";
import AddPhieuChiModal from "./addPhieuChi.jsx";
import StatisticsCard from './StatisticsCard';

function PhieuThuChi() {
  const itemsPerPage = 7;
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [paginatedItems, activePage, totalPages, handlePageChange] =
    usePagination(products, itemsPerPage);

  const [showAddPhieuThuModal, setShowAddPhieuThuModal] = useState(false);
  const handleShowAddPhieuThuModal = () => setShowAddPhieuThuModal(true);
  const handleCloseAddPhieuThuModal = () => setShowAddPhieuThuModal(false);

  const handleAddPhieuThuSuccess = () => {
    fetchProducts();
    handleCloseAddPhieuThuModal();
  };
  const [showAddPhieuChiModal, setShowAddPhieuChiModal] = useState(false);
  const handleShowAddPhieuChiModal = () => setShowAddPhieuChiModal(true);
  const handleCloseAddPhieuChiModal = () => setShowAddPhieuChiModal(false);

  const handleAddPhieuChiSuccess = () => {
    fetchProducts();
    handleCloseAddPhieuChiModal();
  };

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/v1/receipt/getAll")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalRevenue = products.reduce((sum, item) => {
    const value = parseFloat(item.giatri.replace(/,/g, ''));
    return sum + (value > 0 ? value : 0);
  }, 0);

  const totalExpense = products.reduce((sum, item) => {
    const value = parseFloat(item.giatri.replace(/,/g, ''));
    return sum + (value < 0 ? Math.abs(value) : 0);
  }, 0);

  const balance = totalRevenue - totalExpense;

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
              <h2>Quản lý Thu Chi</h2>
            </Col>
            <Col md={4} />
            <Col md={4} className="button-container">
              <div className="d-flex gap-3">
                <Button variant="primary" onClick={handleShowAddPhieuThuModal}>
                  <i className="far fa-plus-square"></i> Thêm phiếu thu
                </Button>
                <Button variant="danger" onClick={handleShowAddPhieuChiModal}>
                  <i className="far fa-plus-square"></i> Thêm phiếu chi
                </Button>
              </div>
            </Col>
          </Row>
          {/* show thu chi  */}
          <Row>
            <div className="grid grid-cols-3 gap-4 mb-2">
              <StatisticsCard
                icon={<i className="bi bi-arrow-right-circle text-4xl leading-none"></i>}
                title="Tổng thu"
                value={totalRevenue.toLocaleString()}
                valueColor="text-sky-600"
                bgColor="bg-slate-200"
                iconColor="bg-sky-600"
              />
              <StatisticsCard
                icon={<i className="bi bi-arrow-left-circle text-4xl leading-none"></i>}
                title="Tổng Chi"
                value={totalExpense.toLocaleString()}
                valueColor="text-red-600"
                bgColor="bg-slate-200"
                iconColor="bg-red-600"
              />
              <StatisticsCard
                icon={<i className="bi bi-currency-dollar text-4xl leading-none"></i>}
                title="Tồn quỹ"
                value={balance.toLocaleString()}
                valueColor="text-green-600"
                bgColor="bg-slate-200"
                iconColor="bg-green-600"
              />
            </div>
          </Row>
          <Row>
            <Col xs={12}>
              <Row>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Mã Chứng từ</th>
                      <th>Người nộp/chi</th>
                      <th>Hạng mục thu/chi</th>
                      <th>Lí do</th>
                      <th>Ngày giao dịch</th>
                      <th>Giá trị</th>
                      <th>Hình thức</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedItems.map((item, index) => (
                      <React.Fragment key={index}>
                        <tr>
                          <td>{item.machungtu}</td>
                          <td style={{ color: "#BB2649", fontWeight: "bold" }}>
                            {item.nguoinop}
                          </td>
                          <td>{item.hangmucthuchi}</td>
                          <td>{item.lido}</td>
                          <td>{item.date}</td>
                          <td>{item.giatri}</td>
                          <td>{item.hinhthuc}</td>
                        </tr>
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
                  {/*{paginatedItems
    .slice(
      (activePage - 1) * itemsPerPage,
      activePage * itemsPerPage
    )
    .map((item, index) => (
      <tr key={index}>
        <td>{item.machungtu}</td>
        <td style={{ color: "#BB2649", fontWeight: "bold" }}>
          {item.nguoinop}
        </td>
        <td>{item.hangmucthuchi}</td>
        <td>{item.lido}</td>
        <td>{item.date}</td>
        <td>{item.giatri}</td>
        <td>{item.hinhthuc}</td>
      </tr>
    ))}*/}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <AddPhieuThuModal
        show={showAddPhieuThuModal}
        handleClose={handleCloseAddPhieuThuModal}
        onAddSuccess={handleAddPhieuThuSuccess}
      />
      <AddPhieuChiModal
        show={showAddPhieuChiModal}
        handleClose={handleCloseAddPhieuChiModal}
        onAddSuccess={handleAddPhieuChiSuccess}
      />
    </>
  );
}
export default PhieuThuChi;
