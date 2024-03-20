import React from "react";
import { Col, Row, Table, Pagination, Button } from "react-bootstrap";
import "./CategoryTable.css";

function WarehouseTable({
  currentItems,
  sortedItems,
  handlePageChange,
  activePage,
  itemsPerPage,
  handleUpdateCategory,
  showDetails,
  selectedRowId,
  showDetailsTable,
  selectedProduct,
  handleCloseModal,
}) {
  return (
    <Row className="container-table" style={{ marginRight: "20px" }}>
      <Col>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Mã Category</th>
              <th>Tên loai hàng</th>
              <th>Mô tả</th>
              <th>Products</th>
              <th>Ngày tạo</th>
              <th>Thao tác</th>
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
                <React.Fragment key={item._id}>
                  <tr>
                    <td>{item._id}</td>
                    <td style={{ color: "#BB2649", fontWeight: "bold" }}>
                      {item.name}
                    </td>
                    <td>{item.description}</td>
                    <td>
                      <Button onClick={() => showDetails(item.products, index)}>
                        Xem chi tiết
                      </Button>
                    </td>
                    <td>{item.createdAt}</td>
                    <td>
                      <Button
                        className="custom-btn-edit"
                        onClick={() => handleUpdateCategory(item._id)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>Update
                      </Button>
                      <Button type="button" className="custom-btn-delete">
                        <i className="fa-solid fa-trash"></i>Delete
                      </Button>
                    </td>
                  </tr>
                  {selectedRowId === index && showDetailsTable && (
                            <tr key={`${item._id}-details`}>
                              <td colSpan="9">
                                <div className="details-table-container">
                                  {console.log(
                                    `Rendering details for item ${item._id}`
                                  )}
                                  <Table bordered>
                                    <tbody>
                                      <tr>
                                        <td className="field w-2/5">
                                          Mã category
                                        </td>
                                        <td>{selectedProduct._id}</td>
                                      </tr>
                                      <tr>
                                        <td className="field w-2/5">
                                          Tên loại hàng hoá
                                        </td>
                                        <td>{item.name}</td>
                                      </tr>
                                      <tr>
                                        <td className="field w-2/5">Mô tả</td>
                                        <td>{item.description}</td>
                                      </tr>
                                      <tr>
                                        <td className="field w-2/5">
                                          Ngày tạo
                                        </td>
                                        <td>{item.createdAt}</td>
                                      </tr>
                                      <tr>
                                        <td className="field w-2/5">
                                          Sản phẩm
                                        </td>
                                        <td key={`${item._id}-details`}>
                                          {selectedRowId === index &&
                                            showDetailsTable && (
                                              <Table bordered>
                                                <thead>
                                                  <tr>
                                                    <th>Mã sản phẩm</th>
                                                    <th>Tên hàng hoá:</th>
                                                    <th>Miêu tả:</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {selectedProduct ? (
                                                    <tr>
                                                      <td>
                                                        {selectedProduct._id}
                                                      </td>
                                                      <td>
                                                        {selectedProduct.name}
                                                      </td>
                                                      <td>
                                                        {
                                                          selectedProduct.description
                                                        }
                                                      </td>
                                                    </tr>
                                                  ) : (
                                                    <tr>
                                                      <td colSpan="3">
                                                        Không có sản phẩm nào
                                                      </td>
                                                    </tr>
                                                  )}
                                                </tbody>
                                              </Table>
                                            )}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                  <Button onClick={handleCloseModal}>
                                    Close
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </Table>
        {/* từ đây */}
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

export default WarehouseTable;
