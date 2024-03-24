import React, { useState, useEffect } from "react";
import { Card, Container, Form } from "react-bootstrap";
import axios from "axios";
import { Bar } from "react-chartjs-2";

export default function BestSellingPrice() {
    const [productData, setProductData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [productCount, setProductCount] = useState(5); // Số lượng sản phẩm mặc định
    const [fetchReady, setFetchReady] = useState(false);

    useEffect(() => {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        setStartDate(formatDate(firstDayOfMonth));
        setEndDate(formatDate(today));
        setFetchReady(true);
    }, []);

    useEffect(() => {
        if (fetchReady) {
            fetchData(startDate, endDate, productCount);
        }
    }, [startDate, endDate, productCount, fetchReady]);

    const fetchData = (start, end, count) => {
        const formattedStart = formatDate(new Date(start));
        const formattedEnd = formatEndDate(new Date(end)); // Chuyển đổi ngày kết thúc thành thời điểm cuối ngày

        const userDataString = localStorage.getItem('userData');
        if (!userDataString) {
            throw new Error('User data not found in localStorage.');
        }
        const userData = JSON.parse(userDataString);
        const userId = userData.userID;

        axios.post(`http://localhost:5000/api/v1/statistic/getSellStatistics`, {
            managerId: userId,
            startDate: formattedStart,
            endDate: formattedEnd
        })
            .then(response => {
                const sortedByQuantity = response.data.data.slice().sort((a, b) => b.quantity - a.quantity).slice(0, count);
                const sortedByTotalPrice = response.data.data.slice().sort((a, b) => b.totalPrice - a.totalPrice).slice(0, count);
                setProductData({ sortedByQuantity, sortedByTotalPrice });
            })
            .catch(error => {
                console.error('Error fetching Data:', error);
            });
    };

    const handleStartDateChange = (e) => {
        const formattedDate = e.target.value;
        setStartDate(formattedDate);
    };

    const handleEndDateChange = (e) => {
        const formattedDate = e.target.value;
        console.log(formattedDate);
        setEndDate(formattedDate);
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

    const formatEndDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}T23:59:59.999Z`;
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
        // <Container className="ml-72 flex flex-col items-center">
            <Card className="flex px-5 py-3 flex-col items-center
            border shadow-lg border-zinc-950">
            <h5>Best Revenue Product</h5>
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
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                        <option value="all">All</option>
                    </Form.Control>
                </Form.Group>
            </div>
            <div className="flex w-full h-96 justify-center">
                <Bar options={options2} data={dataPrice} />
            </div>
            </Card>

        // </Container>
    );
}
