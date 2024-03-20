import React from "react";
import { Col, Row, Table, Pagination, Button } from "react-bootstrap";
import "./ExportImportNoteTable.css";

function EximportTable({
  currentItems,
  sortedItems,
  handlePageChange,
  activePage,
  itemsPerPage,
  sortByQuantity,
  handleSortByQuantity,
  showDetails,
  showDetailsTable,
  selectedProduct,
  handleCloseDetails,
}) {
  return (
    <Row className="container-table" style={{ marginRight: "20px" }}>
      <Col>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Mã hàng hoá</th>
              <th>Tên hàng hoá</th>
              <th>Lý do</th>
              <th>Giá</th>
              <th>
                Số lượng{" "}
                <i
                  className={`fas fa-sort-${sortByQuantity === "asc" ? "up" : "down"
                    }`}
                  onClick={handleSortByQuantity}
                  style={{ cursor: "pointer" }}
                ></i>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No data to present!
                </td>
              </tr>
            ) : (
              currentItems.map((item, index) => (
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
                  {showDetailsTable &&
                    selectedProduct &&
                    selectedProduct.machanghoa === item.machanghoa && (
                      <tr>
                        <td colSpan="6">
                          <div className="details-table-container">
                            <Table bordered>
                              <tbody>
                                <tr>
                                  <td className="field">Tên hàng hóa:</td>
                                  <td
                                    style={{
                                      color: "#BB2649",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {selectedProduct.tenhanghoa}
                                  </td>
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
                                  <td className="w-60">
                                    {selectedProduct.mieuta}
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan="2" className="text-center">
                                    <button
                                      className="btn btn-primary"
                                      onClick={handleCloseDetails}
                                    >
                                      Close
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </td>
                      </tr>
                    )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </Table>
        {sortedItems.length > itemsPerPage && (
          <Pagination className="pagination-bar">
            <Pagination.Prev
              onClick={() => handlePageChange(activePage - 1)}
              disabled={activePage === 1}
            />
            <Pagination.Item
              key={1}
              active={1 === activePage}
              onClick={() => handlePageChange(1)}
            >
              1
            </Pagination.Item>
            {activePage > 3 && <Pagination.Ellipsis />}
            {activePage > 2 && (
              <Pagination.Item
                key={activePage - 1}
                onClick={() => handlePageChange(activePage - 1)}
              >
                {activePage - 1}
              </Pagination.Item>
            )}
            {activePage !== 1 &&
              activePage !== Math.ceil(sortedItems.length / itemsPerPage) && (
                <Pagination.Item key={activePage} active>
                  {activePage}
                </Pagination.Item>
              )}
            {activePage < Math.ceil(sortedItems.length / itemsPerPage) - 1 && (
              <Pagination.Item
                key={activePage + 1}
                onClick={() => handlePageChange(activePage + 1)}
              >
                {activePage + 1}
              </Pagination.Item>
            )}
            {activePage < Math.ceil(sortedItems.length / itemsPerPage) - 2 && (
              <Pagination.Ellipsis />
            )}
            <Pagination.Item
              key={Math.ceil(sortedItems.length / itemsPerPage)}
              active={
                Math.ceil(sortedItems.length / itemsPerPage) === activePage
              }
              onClick={() =>
                handlePageChange(Math.ceil(sortedItems.length / itemsPerPage))
              }
            >
              {Math.ceil(sortedItems.length / itemsPerPage)}
            </Pagination.Item>
            <Pagination.Next
              onClick={() => handlePageChange(activePage + 1)}
              disabled={
                activePage === Math.ceil(sortedItems.length / itemsPerPage)
              }
            />
          </Pagination>
        )}
      </Col>
    </Row>
  );
}

export default EximportTable;
