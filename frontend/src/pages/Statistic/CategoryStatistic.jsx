import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryStatistic() {

    const [categoryData, setCategoryData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
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
            fetchData(startDate, endDate);
        }
    }, [startDate, endDate, fetchReady]);

    const fetchData = (start, end) => {
        const formattedStart = formatDate(new Date(start));
        const formattedEnd = formatEndDate(new Date(end)); // Chuyển đổi ngày kết thúc thành thời điểm cuối ngày

        const userDataString = localStorage.getItem('userData');
        if (!userDataString) {
            throw new Error('User data not found in localStorage.');
        }
        const userData = JSON.parse(userDataString);
        const userId = userData.userID;

        axios.post(`http://localhost:5000/api/v1/statistic/getCategoryStatistics`, {
            managerId: userId,
            startDate: formattedStart,
            endDate: formattedEnd
        })
            .then(response => {
                setCategoryData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Data:', error);
            });
    };
    const data = {
        labels: categoryData.map(categoryData => categoryData.name),
        datasets: [
          {
            label: '# of Votes',
            data: categoryData.map(categoryData => categoryData.totalQuantity),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
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
  return <Pie data={data} />;
}
