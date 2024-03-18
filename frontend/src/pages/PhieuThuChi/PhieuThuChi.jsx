import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Pagination, Button } from "react-bootstrap";
import { usePagination } from "../Common/hooks.js";
import axios from "axios";
import CommonNavbar from "../Common/navbar.jsx";
import CommonSidebar from "../Common/sidebar.jsx";
import AddThuModal from "./addPhieuThu.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

function PhieuThuChi() {
  const itemsPerPage = 7;
  const [products, setProducts] = useState([]);
  const [paginatedItems, activePage, totalPages, handlePageChange] = usePagination(products, itemsPerPage);

  const [showAddThuModal, setShowAddThuModal] = useState(false);
  const handleShowAddThuModal = () => setShowAddThuModal(true);
  const handleCloseAddThuModal = () => setShowAddThuModal(false);

  const handleAddThuSuccess = () => {
    toast.success('Thêm kho thành công!');
    fetchProducts();
    handleCloseAddThuModal();
  };

  const fetchProducts = async () => {
    try {
      const userDataString = localStorage.getItem('userData');

      if (!userDataString) {
        throw new Error('User data not found in localStorage.');
      }

      const userData = JSON.parse(userDataString);
      const response = await axios.get(`http://localhost:5000/api/v1/receipt/${userData.shopId}/getAllReceiptsInShop`);
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching warehouse data:', error);
    } finally {
      console.log('Warehouse data fetching completed.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const exportToCSV = (csvData, fileName) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
      <CommonNavbar />
      <div className="flex">
        <Col md={2}>
          <CommonSidebar />
        </Col>

        <Col md={10}>
          <Container className="ml-72 ">
            <ToastContainer position='top-right' />
            <Row className="title mb-0">
              <Col md={6} className="text-left text-white">
                <h2>Quản lý Thu Chi</h2>
              </Col>
              <Col md={6} className="text-right">
                <Button variant="primary" onClick={handleShowAddThuModal}>
                  <i className="far fa-plus-square"></i> Thêm phiếu
                </Button>
                <Button variant="warning" onClick={() => exportToCSV(products, "phieu_thu_chi")}>Export</Button>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Table striped bordered hover className="custom-table">
                  <thead className="custom-table-header">
                    <tr>
                      <th>ID Phiếu</th>
                      <th>Tên Phiếu</th>
                      <th>Ngày tạo</th>
                      <th>Giá trị</th>
                      <th>Loại Phiếu</th>
                      <th>Mô tả</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedItems.map((item, index) => (
                      <React.Fragment key={index}>
                        <tr className="custom-table-row">
                          <td>{item._id}</td>
                          <td>{item.name}</td>
                          <td>{item.date}</td>
                          <td>{item.status === 'Expense' ? '-' + item.price : item.price}</td>
                          <td>{item.status}</td>
                          <td>{item.description}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </Table>
                <Pagination className="pagination justify-content-center">
                  <Pagination.Prev onClick={() => handlePageChange(activePage - 1)} disabled={activePage === 1} />
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Pagination.Item
                      key={i + 1}
                      active={i + 1 === activePage}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next onClick={() => handlePageChange(activePage + 1)} disabled={activePage === totalPages} />
                </Pagination>
              </Col>
            </Row>
          </Container>
        </Col>
      </div>
      <AddThuModal
        userId={JSON.parse(localStorage.getItem('userData'))?.userID}
        show={showAddThuModal}
        onHide={handleCloseAddThuModal}
        handleAddThu={handleAddThuSuccess}
      />
    </>
  );
}
export default PhieuThuChi;
