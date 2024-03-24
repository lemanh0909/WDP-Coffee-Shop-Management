import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Pagination, Button } from "react-bootstrap";
import { usePagination } from "../Common/hooks.js";
import axios from "axios";
import AddReceiptModal from "./addPhieuThu.jsx";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Common/Authorization.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';

function Receipts() {
  const itemsPerPage = 7;
  const [receipts, setReceipts] = useState([]);
  const [paginatedItems, activePage, totalPages, handlePageChange] = usePagination(receipts, itemsPerPage);

  const [showAddReceiptModal, setShowAddReceiptModal] = useState(false);
  const handleShowAddReceiptModal = () => setShowAddReceiptModal(true);
  const handleCloseAddReceiptModal = () => setShowAddReceiptModal(false);

  const formatDate1 = (isoDate) => {
    if (!isoDate) return "";
    return format(new Date(isoDate), 'dd/MM/yyyy HH:mm:ss');
  };

  const [role] = useAuth();
  const navigate = useNavigate();
  if (role === "Admin") {
    navigate("/miniDrawerAdmin");
  }


  const handleAddReceiptSuccess = () => {
    toast.success('Receipt added successfully!');
    fetchReceipts();
    handleCloseAddReceiptModal();
  };

  const fetchReceipts = async () => {
    try {
      const userDataString = localStorage.getItem('userData');

      if (!userDataString) {
        throw new Error('User data not found in localStorage.');
      }
      const userData = JSON.parse(userDataString);
      const response = await axios.get(`http://localhost:5000/api/v1/receipt/${userData.shopId}/getAllReceiptsInShop`);
      setReceipts(response.data.data);
    } catch (error) {
      console.error('Error fetching receipt data:', error);
    } finally {
      console.log('Receipt data fetching completed.');
    }
  };

  useEffect(() => {
    fetchReceipts();
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


      <Col md={12}>
        <Container className="ml-72 ">
          <ToastContainer position='top-right' />
          <Row className="title mb-0">
            <Col md={6} className="text-left text-white">
              <h2>Receipt Management</h2>
            </Col>
            <Col md={6} className="text-right">
              <Button variant="primary" onClick={handleShowAddReceiptModal}>
                <i className="far fa-plus-square"></i> Add Receipt
              </Button>
              <Button variant="warning" onClick={() => exportToCSV(receipts, "receipts")}>Export</Button>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12}>
            </Col>
          </Row>
          <Row className="container-table table">
            <Col xs={12}>
              <Table striped bordered hover >
                <thead>
                  <tr>
                    <th>Receipt ID</th>
                    <th>Receipt Name</th>
                    <th>Creation Date</th>
                    <th>Value (VND)</th>
                    <th>Receipt Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedItems.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr className="custom-table-row">
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>{formatDate1(item.date)}</td>
                        <td>{item.status === 'Expense' ? '-' + (item.price ? new Intl.NumberFormat('vi-VN').format(item.price) : "none") : (item.price ? new Intl.NumberFormat('vi-VN').format(item.price) : "none")}</td>
                        <td>{item.status}</td>
                        <td>{item.description}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
              <Pagination className="pagination justify-center">
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

      <AddReceiptModal
        userId={JSON.parse(localStorage.getItem('userData'))?.userID}
        show={showAddReceiptModal}
        onHide={handleCloseAddReceiptModal}
        handleAddReceipt={handleAddReceiptSuccess}
      />
    </>
  );
}

export default Receipts;
