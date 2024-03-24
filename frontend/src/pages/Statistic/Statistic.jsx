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

import BestSellingQuantity from "./BestSellingQuantity.jsx";
import BestSellingPrice from "./BestSellingPrice.jsx";
import CategoryStatistic from "./CategoryStatistic.jsx";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Statistic() {

    return (
        <div className="statistic bg-white">

            <div className="flex statistic">
                    <Container className="flex flex-col items-center gap-2">
                        <h3 className="text-white">Product Statistics</h3>
                        <BestSellingQuantity/>
                        <BestSellingPrice/>
                    </Container>

            </div>
        </div>
    );
}
