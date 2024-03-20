import React, { useState, useEffect } from "react";
import { Container, Row, Col, Pagination, Button } from "react-bootstrap";
import { usePagination } from "../Common/hooks.js";
import axios from "axios";
import CommonNavbar from "../Common/navbar.jsx";
import CommonSidebar from "../Common/sidebar.jsx";
import ViewOrderTable from "./vieworderTable.jsx";

function ViewOrder() {
  const itemsPerPage = 7;
  const [orders, setOrders] = useState([]);
  const [paginatedItems, activePage, totalPages, handlePageChange] =
    usePagination(orders, itemsPerPage);
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
  }, []); // Fetch only once when component mounts

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
            <Row>
              <Col xs={12} style={{ marginRight: "20px" }}>
                <Row>
                  {/* Sử dụng component ViewOrderTable thay vì viết mã trực tiếp */}
                  <ViewOrderTable
                    currentItems={paginatedItems}
                    sortedItems={orders}
                    handlePageChange={handlePageChange}
                    activePage={activePage}
                    itemsPerPage={itemsPerPage}
                    selectedOrder={selectedOrder}
                    selectedIndex={selectedIndex}
                    handleDetailClick={handleDetailClick}
                    handleDropdownChange={handleDropdownChange}
                  />
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
