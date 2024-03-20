import React from "react";
import { Col, Row, Table, Pagination, Button } from "react-bootstrap";
import "./tableproductmange.css";


function productmanageTable({
  currentItems,
  sortedItems = [],
  handlePageChange,
  activePage = 1,
  itemsPerPage = 10,
  handleUpdateWarehouse,
  showDetails,
  showDetailsTable,
  selectedProduct
}) {
  return (
    <Row className="container-table" style={{ marginRight: "20px" }}>
      <Col>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Mã hàng hoá</th>
              <th>Tên hàng hoá</th>
              <th>Category</th>
              <th></th>
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
              currentItems.map((item) => (
                <React.Fragment key={item._id}>
                  <tr>
                    <td>{item._id}</td>
                    <td style={{ color: "#BB2649", fontWeight: "bold" }}>
                      {item.name}
                    </td>
                    <td>{item.category.name}</td>
                    <td>
                      <Button onClick={() => showDetails(item._id)}>
                        Xem chi tiết
                      </Button>
                    </td>

                    <td>
                      <Button
                        className="custom-btn-edit"
                        onClick={() => handleUpdateWarehouse(item._id)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>Update
                      </Button>
                      <Button type="button" className="custom-btn-delete">
                        <i className="fa-solid fa-trash"></i>Delete
                      </Button>
                    </td>
                  </tr>
                  {showDetailsTable && selectedProduct && selectedProduct._id === item._id && (
                    <tr>
                      <td colSpan="5">
                        <div className="details-table-container">
                          <Table bordered>
                            <tbody>
                              <tr>
                                <td className="field w-2/5">Tên:</td>
                                <td>{selectedProduct.name}</td>
                              </tr>
                              <tr>
                                <td className="field">Mô tả:</td>
                                <td>{selectedProduct.description}</td>
                              </tr>
                              <tr>
                                <td className="field">Hình ảnh:</td>
                                <td>
                                  <div className="flex flex-wrap gap-3 justify-center">
                                    {selectedProduct.image.map((imageUrl, index) => (
                                      <img
                                        key={index}
                                        className="w-1/4 h-1/4"
                                        src={imageUrl}
                                        alt={`Product ${index + 1}`}
                                      />
                                    ))}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="field">Số lượng biến thể:</td>
                                <td>{selectedProduct.productVariant}</td>
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
        {/* từ đây */}
        {(sortedItems || []).length > 0 && itemsPerPage > 0 && (
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

export default productmanageTable;
