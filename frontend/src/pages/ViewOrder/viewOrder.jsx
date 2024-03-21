import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Pagination, Button } from "react-bootstrap";
import { usePagination } from "../Common/hooks.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import CommonNavbar from "../Common/navbar.jsx";
import CommonSidebar from "../Common/sidebar.jsx";

function ViewOrder() {
  const itemsPerPage = 7;
  const [orders, setOrders] = useState([]);
  const [paginatedItems, activePage, totalPages, handlePageChange] =
    usePagination(orders, itemsPerPage);
  const [searchOrderId, setSearchOrderId] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);

  const fetchOrders = () => {
    // Lấy userId và shopId từ local storage
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      throw new Error('User data not found in localStorage.');
    }
    const userData = JSON.parse(userDataString);
    const shopId = userData.shopId;

    let url = `http://localhost:5000/api/v1/order/${shopId}/getAllOrdersInShop`;
    axios
      .get(url)
      .then((response) => {
        setOrders(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, [searchOrderId, searchDate]); // Trigger fetching when search parameters change

  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear().toString().substr(-2);
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };

  const handleDropdownChange = (orderId, newState) => {
    axios.put("http://localhost:5000/api/v1/order/changeState", {
      orderId: orderId,
      state: newState
    }).then(response => {
      console.log("Success");
      fetchOrders();
      // Handle success
      // You might want to update the state here to reflect the changes immediately
    }).catch(error => {
      console.error("Error updating order state:", error);
    });
  };

  const handleDetailClick = (index) => {
    const order = paginatedItems[index];
    setSelectedOrder(order);

    // Nếu index đã tồn tại trong selectedIndex, loại bỏ nó
    if (selectedIndex.includes(index)) {
      const newSelectedIndex = selectedIndex.filter((i) => i !== index);
      setSelectedIndex(newSelectedIndex);
    } else {
      // Nếu index chưa tồn tại trong selectedIndex, thêm vào selectedIndex
      setSelectedIndex([...selectedIndex, index]);
    }
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
            <Row className="title mb-0">
              <Col md={4} className="text-white">
                <h2>Danh sách đơn hàng</h2>
              </Col>
            </Row>
            <Row className="container-table table">
              <Col xs={12} style={{ marginRight: "20px" }}>
                <Row>
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
                      {paginatedItems.map((order, index) => (
                        <React.Fragment key={order._id}>
                          <tr key={order.id}>
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
        </Col>
      </div>
    </>
  );
}

export default ViewOrder;