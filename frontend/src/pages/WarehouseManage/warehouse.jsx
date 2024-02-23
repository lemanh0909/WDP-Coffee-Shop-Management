import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Pagination,

} from "react-bootstrap";
import "./warehouse.css";
import { usePagination } from "../Common/hooks.js";
import "bootstrap/dist/css/bootstrap.min.css";
import CommonNavbar from "../Common/navbar.jsx";
import Sidebar from "../Common/sidebar.jsx";

const fakeData = [
  {
    id: 1,
    name: "Sản phẩm 1",
    "Giá nhập": "100,000 VND",
    "Giá bán": "150,000 VND",
    "Trạng thái": "In Stock",
    "Ngày nhập": "2024-01-29",
    "Tồn kho": 50,
  },
  {
    id: 2,
    name: "Sản phẩm 2",
    "Giá nhập": "120,000 VND",
    "Giá bán": "180,000 VND",
    "Trạng thái": "Out of Stock",
    "Ngày nhập": "2024-01-30",
    "Tồn kho": 0,
  },
  {
    id: 3,
    name: "Sản phẩm 3",
    "Giá nhập": "80,000 VND",
    "Giá bán": "120,000 VND",
    "Trạng thái": "In Stock",
    "Ngày nhập": "2024-01-28",
    "Tồn kho": 30,
  },
  {
    id: 4,
    name: "Sản phẩm 4",
    "Giá nhập": "90,000 VND",
    "Giá bán": "130,000 VND",
    "Trạng thái": "Out of Stock",
    "Ngày nhập": "2024-02-01",
    "Tồn kho": 0,
  },
  {
    id: 5,
    name: "Sản phẩm 5",
    "Giá nhập": "110,000 VND",
    "Giá bán": "160,000 VND",
    "Trạng thái": "In Stock",
    "Ngày nhập": "2024-02-02",
    "Tồn kho": 25,
  },
  {
    id: 6,
    name: "Sản phẩm 6",
    "Giá nhập": "70,000 VND",
    "Giá bán": "100,000 VND",
    "Trạng thái": "In Stock",
    "Ngày nhập": "2024-02-03",
    "Tồn kho": 50,
  },
  {
    id: 7,
    name: "Sản phẩm 7",
    "Giá nhập": "85,000 VND",
    "Giá bán": "120,000 VND",
    "Trạng thái": "Out of Stock",
    "Ngày nhập": "2024-02-04",
    "Tồn kho": 0,
  },
  {
    id: 8,
    name: "Sản phẩm 8",
    "Giá nhập": "95,000 VND",
    "Giá bán": "140,000 VND",
    "Trạng thái": "In Stock",
    "Ngày nhập": "2024-02-05",
    "Tồn kho": 15,
  },
];

function Warehouse() {
  const itemsPerPage = 3;
  const [paginatedItems, activePage, totalPages, handlePageChange] = usePagination(fakeData, itemsPerPage);

  useEffect(() => {
    const checkboxes = document.querySelectorAll(
      '.filter-section input[type="checkbox"]'
    );

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", function () {
        if (this.checked) {
          this.parentElement.classList.add("selected");
        } else {
          this.parentElement.classList.remove("selected");
        }
      });
    });
  }, []);

  return (
    <>
      <CommonNavbar />
      <Row md={5} className="title">
        <Col md={4}>
          <h2>Quản lý nhà kho</h2>
        </Col><Col md={4} />

        <Col md={4} className="button-container">
          <button type="button" className="btn btn-primary add-btn">
            <i class="fa-solid fa-plus"></i> Thêm sản phẩm
          </button>
          <button type="button" className="btn btn-primary">
            <i class="fa-solid fa-file-export"></i>
            Xuất ra file
          </button>
        </Col>

      </Row>

      <Container fluid>
        <Row>
          <Sidebar
            handlePageChange={handlePageChange}
            activePage={activePage}
            totalPages={totalPages}
            getPaginatedItems={paginatedItems}
          />
          <Col xs={9}>
            <Row>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Mã hàng hóa</th>
                    <th>Tên hàng hóa</th>
                    <th>Giá nhập</th>
                    <th>Giá bán</th>
                    <th>Trạng thái</th>
                    <th>Ngày nhập</th>
                    <th>Tồn kho</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td style={{ color: '#BB2649', fontWeight: 'bold' }}>{item.name}</td>
                      <td>{item["Giá nhập"]}</td>
                      <td>{item["Giá bán"]}</td>
                      <td>{item["Trạng thái"]}</td>
                      <td>{item["Ngày nhập"]}</td>
                      <td>{item["Tồn kho"]}</td>
                      <td>
                        <button type="button" className="btn btn-primary edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>

                        <button type="button" className="btn btn-danger">
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>

            <Row>
              <Col>
                <Pagination>
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

export default Warehouse;
