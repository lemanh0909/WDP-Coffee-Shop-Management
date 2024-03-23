import React, { useState, useEffect } from "react";
import { Container, Col, Form } from "react-bootstrap";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Statistic() {
    const [productData, setProductData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [productCount, setProductCount] = useState(5); // Số lượng sản phẩm mặc định

    useEffect(() => {
        // Tính toán ngày bắt đầu và kết thúc của tháng gần nhất
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const formattedEndDate = formatDate(today);
        const formattedFirstDay = formatDate(firstDayOfMonth);

        setStartDate(formattedFirstDay);
        setEndDate(formattedEndDate);

        // Lấy userId và shopId từ local storage
        const userDataString = localStorage.getItem('userData');
        if (!userDataString) {
            throw new Error('User data not found in localStorage.');
        }
        const userData = JSON.parse(userDataString);
        const userId = userData.userID;
        axios.post(`http://localhost:5000/api/v1/statistic/getSellStatistics`, {
            managerId: userId,
            startDate: formattedFirstDay,
            endDate: formattedEndDate
        })
            .then(response => {
                // Sắp xếp dữ liệu theo quantity và totalPrice
                const sortedByQuantity = response.data.data.slice().sort((a, b) => a.quantity - b.quantity).slice(0, productCount);
                const sortedByTotalPrice = response.data.data.slice().sort((a, b) => a.totalPrice - b.totalPrice).slice(0, productCount);
                setProductData({ sortedByQuantity, sortedByTotalPrice });
            })
            .catch(error => {
                console.error('Error fetching Data:', error);
            });
    }, [productCount]); // Thêm productCount vào mảng dependency

    const handleStartDateChange = (e) => {
        const formattedDate = e.target.value;
        setStartDate(formattedDate);
    };

    const handleEndDateChange = (e) => {
        const formattedDate = e.target.value;
        setEndDate(formattedDate);
    };

    const handleProductCountChange = (e) => {
        const count = parseInt(e.target.value);
        setProductCount(count);
    };

    const handleProductCountSelect = (e) => {
        const value = e.target.value;
        if (value === 'all') {
            setProductCount(productData.length);
        } else {
            setProductCount(parseInt(value));
        }
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const options1 = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            },
            title: {
                display: true,
                text: 'Best selling product',
            }, scales: {
                x: {
                    ticks: {
                        maxRotation: 0,
                        minRotation: 0
                    }
                }
            }
        },
    };

    const options2 = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            },
            title: {
                display: true,
                text: 'Most revenue product',
            }, scales: {
                x: {
                    ticks: {
                        maxRotation: 0,
                        minRotation: 0
                    }
                }
            }
        },
    };

    const dataQuantity = {
        labels: productData.sortedByQuantity?.map(product => product.name) || [],
        datasets: [
            {
                label: 'Numbers',
                data: productData.sortedByQuantity?.map(product => product.quantity) || [],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const dataPrice = {
        labels: productData.sortedByTotalPrice?.map(product => product.name) || [],
        datasets: [
            {
                label: 'Total Price',
                data: productData.sortedByTotalPrice?.map(product => product.totalPrice) || [],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div className="statistic bg-white">
            <div className="flex statistic">
                <Col md={10} className="statistic">
                    <Container className="ml-72 flex flex-col items-center">
                        <h3>Product Statistics</h3>
                        <div className="flex gap-12 mb-4">
                            <Form.Group controlId="startDate">
                                <Form.Label>Start Date:</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="endDate">
                                <Form.Label>End Date:</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="productCount">
                                <Form.Label>Number of Products:</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={productCount === productData.length ? 'all' : productCount}
                                    onChange={handleProductCountSelect}
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                    <option value={20}>20</option>
                                    <option value="all">All</option>
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div className="flex w-full h-96 justify-center">
                            <Bar options={options1} data={dataQuantity} />
                        </div>

                        <div className="flex w-full h-96 justify-center">
                            <Bar options={options2} data={dataPrice} />
                        </div>
                    </Container>
                </Col>
            </div>
        </div>
    );
}
