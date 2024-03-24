import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Pagination, Button } from "react-bootstrap";
import { usePagination } from "../Common/hooks.js";
import axios from "axios";

function ViewPaycheck() {
  const itemsPerPage = 7;
  const [Paychecks, setPaychecks] = useState([]);
  const [paginatedItems, activePage, totalPages, handlePageChange] =
    usePagination(Paychecks, itemsPerPage);
  const [searchPaycheckId, setSearchPaycheckId] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [selectedPaycheck, setSelectedPaycheck] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);

  const fetchPaychecks = () => {
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      throw new Error('User data not found in localStorage.');
    }
    const userData = JSON.parse(userDataString);
    const userID = userData.userID;

    let url = `http://localhost:5000/api/v1/paycheck/${userID}/getAllPaychecksInShop`;
    axios
      .get(url)
      .then((response) => {
        setPaychecks(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching Paychecks:", error);
      });
  };

  useEffect(() => {
    fetchPaychecks();
  }, [searchPaycheckId, searchDate]);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear().toString().substr(-2);
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };

  const handleDropdownChange = (PaycheckId, newState) => {
    axios.put("http://localhost:5000/api/v1/paycheck/changeState", {
      PaycheckId: PaycheckId,
      state: newState
    }).then(response => {
      console.log("Success");
      fetchPaychecks();
    }).catch(error => {
      console.error("Error updating Paycheck state:", error);
    });
  };

  const handleDetailClick = (index) => {
    const Paycheck = paginatedItems[index];
    setSelectedPaycheck(Paycheck);

    if (selectedIndex.includes(index)) {
      const newSelectedIndex = selectedIndex.filter((i) => i !== index);
      setSelectedIndex(newSelectedIndex);
    } else {
      setSelectedIndex([...selectedIndex, index]);
    }
  };

  return (
    <>
      <div className="flex">
        <Col md={12}>
          <Container className="ml-72">
            <Row className="title mb-0">
              <Col md={4} className="text-white">
                <h2>Paycheck List</h2>
              </Col>
            </Row>
            <Row className="container-table table">
              <Col xs={12} style={{ marginRight: "20px" }}>
                <Row>
                  <Table striped bPaychecked hover>
                    <thead>
                      <tr>
                        <th>Index</th>
                        <th>Paycheck ID</th>
                        <th>Created Date</th>
                        <th>Month</th>
                        <th>Staff Email</th>
                        <th>Price</th>
                        <th>Extra</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedItems.map((Paycheck, index) => (
                        <React.Fragment key={Paycheck._id}>
                          <tr key={Paycheck.id}>
                            <td>{index + 1}</td>
                            <td>{Paycheck._id}</td>
                            <td>{formatDate(Paycheck.createdAt)}</td>
                            <td>{Paycheck.month}</td>
                            <td>{Paycheck.staffEmail}</td>
                            <td>{Paycheck.price}</td>
                            <td>{Paycheck.extra ? "True" : "False"}</td>
                            <td>
                              <select
                                className="form-select"
                                value={Paycheck.state}
                                onChange={(e) => handleDropdownChange(Paycheck._id, e.target.value)}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </td>
                          </tr>
                          {selectedPaycheck && selectedIndex.includes(index) && (
                            <tr>
                              <td colSpan="9">
                                <div className="details-table-container">
                                  <Table bPaychecked>
                                    <tbody>
                                      <tr>
                                        <td className="field">Paycheck ID:</td>
                                        <td>{selectedPaycheck._id}</td>
                                      </tr>
                                      <tr>
                                        <td className="field">Seller:</td>
                                        <td>{selectedPaycheck.userId}</td>
                                      </tr>
                                      <tr>
                                        <td className="field">Paycheck Date:</td>
                                        <td>{formatDate(selectedPaycheck.createdAt)}</td>
                                      </tr>
                                      <tr>
                                        <td className="field">Total:</td>
                                        <td>{selectedPaycheck.totalPrice}</td>
                                      </tr>
                                      <tr>
                                        <td className="field">Customer Paid:</td>
                                        <td>{selectedPaycheck.customerPay}</td>
                                      </tr>
                                      <tr>
                                        <td className="field">Refund:</td>
                                        <td>{selectedPaycheck.refund}</td>
                                      </tr>
                                      <tr>
                                        <td className="field">Products:</td>
                                        <td>
                                          <Table bPaychecked>
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
                                              {selectedPaycheck.products.map((product, idx) => (
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
                <Pagination className="pagination justify-center">
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
          </Container>
        </Col>
      </div>
    </>
  );
}

export default ViewPaycheck;