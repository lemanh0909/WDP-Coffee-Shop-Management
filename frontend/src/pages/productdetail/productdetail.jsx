import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import "./productdetail.css";
import { usePagination } from "../Common/hooks.js";
import "bootstrap/dist/css/bootstrap.min.css";

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

function ProductDetail() {
  const itemsPerPage = 3;
  const [getPaginatedItems] =
    usePagination(fakeData, itemsPerPage);

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={9}>
            <Row>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Mã hàng hóa</th>
                  </tr>
                  <tr>
                    <th>Tên hàng hóa</th>
                  </tr>
                  <tr>
                    <th>Loại hàng hoá</th>
                  </tr>
                  <tr>
                    <th>Miêu tả</th>
                  </tr>
                  <tr>
                    <th>Giá bán </th>
                  </tr>
                </thead>
                <tbody>
                  {getPaginatedItems.map((item) => {
                    // Lọc ra chỉ phần tử có id bằng 1
                    if (item.id === 1) {
                      return (
                        <tr key={item.id}>
                          <td>{item.id}</td>

                          <td style={{ color: "#BB2649", fontWeight: "bold" }}>
                            {item.name}
                          </td>
                          <td></td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary edit-btn"
                            >
                              Edit
                            </button>
                            <button type="button" className="btn btn-danger">
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    } else {
                      return null; // Trả về null nếu id không bằng 1
                    }
                  })}
                </tbody>
              </Table>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductDetail;
