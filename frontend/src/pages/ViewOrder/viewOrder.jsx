import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Pagination, Button } from "react-bootstrap";
import { usePagination } from "../Common/hooks.js";
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
  }, [searchOrderId, searchDate]);

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
    }).catch(error => {
      console.error("Error updating order state:", error);
    });
  };

  const handleDetailClick = (index) => {
    const order = paginatedItems[index];
    setSelectedOrder(order);

    if (selectedIndex.includes(index)) {
      const newSelectedIndex = selectedIndex.filter((i) => i !== index);
      setSelectedIndex(newSelectedIndex);
    } else {
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
          <Container className="ml-72">
            <Row className="title mb-0">
              <Col md={4} className="text-white">
                <h2>Order List</h2>
              </Col>
            </Row>
            <Row className="container-table table">
              <Col xs={12} style={{ marginRight: "20px" }}>
                <Row>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Index</th>
                        <th>Order ID</th>
                        <th>Order Date</th>
                        <th>Seller</th>
                        <th>Total Products</th>
                        <th>Total Price</th>
                        <th>Payment Method</th>
                        <th>Status</th>
                        <th>Action</th>
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
                              <Button onClick={() => handleDetailClick(index)}>View Details</Button>
                            </td>
                          </tr>
                          {selectedOrder && selectedIndex.includes(index) && (
                            <tr>
                              <td colSpan="9">
                                <div className="details-table-container">
                                  <Table bordered>
                                    <tbody>
                                      <tr>
                                        <td className="field">Order ID:</td>
                                        <td>{selectedOrder._id}</td>
                                      </tr>
                                      <tr>
                                        <td className="field">Seller:</td>
                                        <td>{selectedOrder.userId}</td>
                                      </tr>
                                      <tr>
                                        <td className="field">Order Date:</td>
                                        <td>{formatDate(selectedOrder.createdAt)}</td>
                                      </tr>
                                      <tr>
                                        <td className="field">Total:</td>
                                        <td>{selectedOrder.totalPrice}</td>
                                      </tr>
                                      <tr>
                                        <td className="field">Customer Paid:</td>
                                        <td>{selectedOrder.customerPay}</td>
                                      </tr>
                                      <tr>
                                        <td className="field">Refund:</td>
                                        <td>{selectedOrder.refund}</td>
                                      </tr>
                                      <tr>
                                        <td className="field">Products:</td>
                                        <td>
                                          <Table bordered>
                                            <thead>
                                              <tr>
                                                <th>No.</th>
                                                <th>Product Name</th>
                                                <th>Size</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
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