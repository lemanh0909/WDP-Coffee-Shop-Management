import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Pagination, Button } from "react-bootstrap";
import { usePagination } from "../Common/hooks.js";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import AddImportModal from "./addImport.jsx";
import AddExportModal from "./addExport.jsx";
import 'react-toastify/dist/ReactToastify.css';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';

function PhieuThuChi() {
  const itemsPerPage = 8;
  const [products, setProducts] = useState([]);
  const [paginatedItems, activePage, totalPages, handlePageChange] = usePagination(products, itemsPerPage);

  const [showAddImportModal, setShowAddImportModal] = useState(false);
  const [showAddExportModal, setShowAddExportModal] = useState(false);
  const formatDate1 = (isoDate) => {
    if (!isoDate) return "";
    return format(new Date(isoDate), 'dd/MM/yyyy HH:mm:ss');
  };

  const handleCloseAddImportModal = () => setShowAddImportModal(false);
  const handleShowAddImportModal = () => setShowAddImportModal(true);

  const handleCloseAddExportModal = () => setShowAddExportModal(false);
  const handleShowAddExportModal = () => setShowAddExportModal(true);

  const handleAddSuccess = (newProduct) => {
    setProducts([...products, newProduct]);
    fetchProducts();
  };

  const fetchProducts = async () => {
    try {
      const userDataString = localStorage.getItem('userData');

      if (!userDataString) {
        throw new Error('User data not found in localStorage.');
      }

      const userData = JSON.parse(userDataString);
      const response = await axios.get(`http://localhost:5000/api/v1/note/${userData.shopId}/getNoteFromShop`);
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching warehouse data:', error);
      toast.error('Error fetching warehouse data!');
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
      <div className="flex">

        <Col md={12}>
          <Container className="ml-72">
            <ToastContainer position='top-right' />
            <Row className="title mb-0">
              <Col md={6} className="text-left text-white">
                <h2>Note E-I Management</h2>
              </Col>
              <Col md={6} className="text-right">
                <Button variant="primary" className="mr-1" onClick={handleShowAddImportModal}>
                  <i className="far fa-plus-square"></i> Add Import note
                </Button>
                <Button variant="danger" className="mr-1" onClick={handleShowAddExportModal}>
                  <i className="far fa-plus-square"></i> Add Export note
                </Button>
                <Button variant="success" className="mr-1" onClick={() => exportToCSV(products, "phieu_thu_chi")}> <i className="fa-solid fa-file-export"></i> Export to excel</Button>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
              </Col>
            </Row>

            <Row className="container-table table">
              <Col xs={12}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Warehouse</th>
                      <th>User email</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Create date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedItems.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No data to present!
                        </td>
                      </tr>
                    ) : (
                      paginatedItems.map((item) => (
                        <tr key={item._id}>
                          <td>{item.warehouse ? item.warehouse.name : "N/A"}</td>
                          <td>{item.userEmail}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price !== 0 ? item.price : "none"}</td>
                          <td>{item.status}</td>
                          <td>{formatDate1(item.createdAt)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
                <Pagination className="pagination-bar justify-content-center">
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
            <AddImportModal
              show={showAddImportModal}
              handleClose={handleCloseAddImportModal}
              onAddSuccess={handleAddSuccess}
              setProducts={setProducts}
            />
            <AddExportModal
              show={showAddExportModal}
              handleClose={handleCloseAddExportModal}
              onAddSuccess={handleAddSuccess}
              setProducts={setProducts}
            />
          </Container>
        </Col>
      </div>
    </>
  );
}
export default PhieuThuChi;
