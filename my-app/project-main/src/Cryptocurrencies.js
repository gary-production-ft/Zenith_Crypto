import React, { useState, useEffect, useRef } from 'react';
//import axios from 'axios';
import axiosInstance from './axiosInstance';
import { Card, Button, Modal } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import './Web-css/Cryptocurrencies.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Cryptocurrencies = () => {
    const [cryptos, setCryptos] = useState([]);
    const [selectedCrypto, setSelectedCrypto] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [chartData, setChartData] = useState(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const res = await axiosInstance.get('/coins/markets', {
                    params: {
                        vs_currency: 'usd',
                        order: 'market_cap_desc',
                        per_page: 12,
                        page: 1,
                        sparkline: false,
                    },
                    retry: 3,
                    retryDelay: 2000,
                });
                setCryptos(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCryptos();
    }, []);

    const fetchChartData = async (id) => {
        try {
            const res = await axiosInstance.get(`/coins/${id}/market_chart`, {
                params: {
                    vs_currency: 'usd',
                    days: '7',
                },
                retry: 3,
                retryDelay: 2000,
            });
            const prices = res.data.prices.map(price => ({
                x: new Date(price[0]),
                y: price[1],
            }));
            setChartData({
                labels: prices.map(price => price.x.toLocaleDateString()),
                datasets: [
                    {
                        label: 'Price (USD)',
                        data: prices.map(price => price.y),
                        borderColor: 'rgba(114, 137, 218, 1)',
                        backgroundColor: 'rgba(114, 137, 218, 0.2)',
                        fill: true,
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

    const handleShowModal = (crypto) => {
        setSelectedCrypto(crypto);
        fetchChartData(crypto.id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setChartData(null);
    };

    return (
        <div className="cryptocurrencies-container">
            <h2>Cryptocurrencies</h2>
            <div className="crypto-cards" data-bs-theme="dark">
                {cryptos.map(crypto => (
                    <Card key={crypto.id} className="crypto-card">
                        <Card.Img variant="top" src={crypto.image} alt={crypto.name} />
                        <Card.Body>
                            <Card.Title>{crypto.name}</Card.Title>
                            <Button variant="primary" onClick={() => handleShowModal(crypto)}>View Chart</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            {selectedCrypto && (
                <Modal show={showModal} onHide={handleCloseModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedCrypto.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {chartData ? (
                            <Line data={chartData} ref={chartRef} />
                        ) : (
                            <p>Loading chart data...</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default Cryptocurrencies;
