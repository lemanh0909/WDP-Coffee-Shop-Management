import React from "react";
import { Col, Row, Table, Pagination, Button } from "react-bootstrap";
import "./vieworderTable.css";

function ViewOrderTable({
    currentItems,
    sortedItems,
    handlePageChange,
    activePage,
    itemsPerPage,
    selectedOrder,
    selectedIndex,
    handleDetailClick,
    handleDropdownChange,
}) {
    const formatDate = (date) => {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear().toString().substr(-2);
        const hours = d.getHours().toString().padStart(2, '0');
        const minutes = d.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes} ${day}/${month}/${year}`;
    };

    return (
        <Row className="container-table" style={{ marginRight: "20px" }}>
            <Col>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã đơn hàng</th>
                            <th>Ngày bán</th>
                            <th>Người bán</th>
                            <th>Tổng sản phẩm</th>
                            <th>Tổng giá</th>
                            <th>Hình thức thanh toán</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="text-center">
                                    No data to present!
                                </td>
                            </tr>
                        ) : (
                            currentItems.map((order, index) => (
                                <React.Fragment key={order._id}>
                                    <tr key={order._id}>
                                        <td>{index + 1}</td>
                                        <td>{order._id}</td>
                                        <td>{formatDate(order.createdAt)}</td>
                                        <td>{order.userId}</td>
                                        <td>{order.totalProducts}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.paymentMethod}</td>
                                        <td>
                                            <select
                                                className="form-select"
                                                value={order.state}
                                                onChange={(e) => handleDropdownChange(order._id, e.target.value)}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </td>
                                        <td>
                                            <Button onClick={() => handleDetailClick(index)}>Xem chi tiết</Button>
                                        </td>
                                    </tr>
                                    {selectedOrder && selectedIndex.includes(index) && (
                                        <tr>
                                            <td colSpan="9">
                                                <div className="details-table-container">
                                                    <Table bordered>
                                                        <tbody>
                                                            <tr>
                                                                <td className="field">Mã đơn hàng:</td>
                                                                <td>{selectedOrder._id}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="field">Người bán:</td>
                                                                <td>{selectedOrder.userId}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="field">Ngày bán:</td>
                                                                <td>{formatDate(selectedOrder.createdAt)}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="field">Số lượng sản phẩm:</td>
                                                                <td>{selectedOrder.totalProducts}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="field">Tổng giá:</td>
                                                                <td>{selectedOrder.totalPrice}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="field">Khách trả:</td>
                                                                <td>{selectedOrder.customerPay}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="field">Trả lại:</td>
                                                                <td>{selectedOrder.refund}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="field">Sản phẩm:</td>
                                                                <td>
                                                                    <Table bordered>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>STT</th>
                                                                                <th>Tên sản phẩm</th>
                                                                                <th>Kích thước</th>
                                                                                <th>Giá</th>
                                                                                <th>Số lượng</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {selectedOrder.products.map((product, idx) => (
                                                                                <tr key={idx}>
                                                                                    <td>{idx + 1}</td>
                                                                                    <td>{product.name}</td>
                                                                                    <td>{product.size}</td>
                                                                                    <td>{product.price}</td>
                                                                                    <td>{product.quantity}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </Table>
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
                {/* Pagination */}
                {sortedItems.length > itemsPerPage && (
                    <Pagination className="pagination-bar">
                        <Pagination.Prev
                            onClick={() => handlePageChange(activePage - 1)}
                            disabled={activePage === 1}
                        />
                        {Array.from({ length: Math.ceil(sortedItems.length / itemsPerPage) }, (_, i) => (
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
                            disabled={activePage === Math.ceil(sortedItems.length / itemsPerPage)}
                        />
                    </Pagination>
                )}
            </Col>
        </Row>
    );
}

export default ViewOrderTable;
