import React ,{ useState, useEffect } from "react";
import { Col, Row, Table, Pagination, Button } from "react-bootstrap";
import "./tableWarehouse.css";
import Popup from './Popup.jsx'; 



function WarehouseTable({
    currentItems,
    sortedItems,
    handlePageChange,
    activePage,
    itemsPerPage,
    handleUpdateWarehouse,
    sortByQuantity,
    handleSortByQuantity,
    
}) {
    const [showPopup, setShowPopup] = useState(false);
    const [popupItem, setPopupItem] = useState(null);
    useEffect(() => {
        // Kiểm tra xem có mặt hàng nào gần đến ngày hết hạn không
        currentItems.forEach(item => {
            const expiryDate = new Date(item.expiry);
            const currentDate = new Date();
            const daysUntilExpiry = Math.floor((expiryDate - currentDate) / (1000 * 60 * 60 * 24)); // Số ngày còn lại cho đến ngày hết hạn
            if (daysUntilExpiry <= 7 && daysUntilExpiry > 0) { // Nếu còn dưới 7 ngày đến hạn
                setPopupItem(item);
                setShowPopup(true); // Hiển thị popup nếu có thông báo
            }
        });
    }, [currentItems]);

    const handleClosePopup = () => {
        setShowPopup(false);
    };
   
    return (
        
        <Row className="container-table" style={{ marginRight: "20px" }}>
              <Row className="Popup-expiry" style={{ marginRight: "20px",backgroundColor: "rosybrown" }}>
              {showPopup && <Popup item={popupItem} onClose={handleClosePopup} />}
        </Row>
            <Col>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Mã hàng hoá</th>
                            <th>Tên hàng hoá</th>
                            <th>Đơn vị</th>
                            <th>
                                Số lượng{" "}
                                <i
                                    className={`fas fa-sort-${sortByQuantity === "asc" ? "up" : "down"}`}
                                    onClick={handleSortByQuantity}
                                    style={{ cursor: "pointer" }}
                                ></i>
                            </th>
                            <th>Ngày tạo</th>
                            <th>Ảnh</th>
                            <th>Hạn sử dụng</th>
                            <th>Thao tác</th>
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
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td style={{ color: "#BB2649", fontWeight: "bold" }}>
                                        {item.name}
                                    </td>
                                    <td>{item.unit}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.createdAt}</td>
                                    <td>
                                        <img
                                            src={item.image}
                                            alt={`Ảnh của ${item.name}`}
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </td>
                                    <td>{item.expiry}</td>
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
                            ))
                        )}
                    </tbody>
                </Table>
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
                        {activePage !== 1 && activePage !== Math.ceil(sortedItems.length / itemsPerPage) && (
                            <Pagination.Item
                                key={activePage}
                                active
                            >
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
                        {activePage < Math.ceil(sortedItems.length / itemsPerPage) - 2 && <Pagination.Ellipsis />}
                        <Pagination.Item
                            key={Math.ceil(sortedItems.length / itemsPerPage)}
                            active={Math.ceil(sortedItems.length / itemsPerPage) === activePage}
                            onClick={() => handlePageChange(Math.ceil(sortedItems.length / itemsPerPage))}
                        >
                            {Math.ceil(sortedItems.length / itemsPerPage)}
                        </Pagination.Item>
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

export default WarehouseTable;
