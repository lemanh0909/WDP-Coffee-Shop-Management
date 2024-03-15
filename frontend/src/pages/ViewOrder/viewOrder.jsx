import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Pagination, Button } from "react-bootstrap";
import { usePagination } from "../Common/hooks.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import CommonNavbar from "../Common/navbar.jsx";
import CommonSlider from "../Common/sidebar.jsx";

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
      <Row md={5} className="title">
        <Col md={4}>
          <h2>Danh sách đơn hàng</h2>
        </Col><Col md={4} />

        <Col md={4} className="button-container">
          <button type="button" className="btn btn-primary add-btn">
            <i class="fa-solid fa-plus"></i> Thêm danh mục
          </button>
          <button type="button" className="btn btn-primary">
            <i class="fa-solid fa-file-export"></i>
            Xuất ra file
          </button>
        </Col>

      </Row>

      <Container fluid>
        <Row md={5} className="title">
          <Col md={8}>
            <h2>Danh sách đơn hàng</h2>
          </Col>
          <Col md={4} className="button-container">
            <Button variant="primary" className="add-btn">
              <i className="fa-solid fa-plus"></i> Thêm danh mục
            </Button>
            <Button variant="primary">
              <i className="fa-solid fa-file-export"></i> Xuất ra file
            </Button>
          </Col>
        </Row>

        <Row className="justify-content-md-center align-items-center" style={{ minHeight: '100vh' }}>
          <Sidebar />
          <Col xs={10}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã đơn hàng</th>
                  <th>Ngày bán</th>
                  <th>Người bán</th>
                  <th>Tổng giá</th>
                  <th>Khách trả</th>
                  <th>Trạng thái</th>
                  <th>Hình thức thanh toán</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.seller}</td>
                    <td>{order.total}</td>
                    <td>{order.paidByCustomer}</td>
                    <td>{order.status}</td>
                    <td>{order.paymentMethod}</td>
                    <td>
                      <Link to={`/view-order/${order.id}`} className="btn btn-primary btn-sm">Xem chi tiết</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Row className="pagination-row">
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


    </>
  );
}

export default ViewOrder;
