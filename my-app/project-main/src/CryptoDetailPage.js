import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
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
import './Web-css/CryptoDetailPage.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const CryptoDetailPage = () => {
    const { id } = useParams();
    const [crypto, setCrypto] = useState(null);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchCrypto = async () => {
            try {
                const res = await axiosInstance.get(`/coins/${id}`,{
                    retry: 3,
                    retryDelay: 2000,
                });
                setCrypto(res.data);
            } catch (error) {
                console.error('Error fetching crypto data:', error);
            }
        };

        const fetchChartData = async () => {
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

        fetchCrypto();
        fetchChartData();
    }, [id]);

    if (!crypto) return <p>Loading...</p>;

    return (
        <Container className="crypto-detail-container">
            <Row>
                <Col>
                    <h2>{crypto.name}</h2>
                    <Card className="crypto-detail-card" data-bs-theme="dark">
                        <Card.Body>
                            <Card.Img src={crypto.image.large} alt={crypto.name} />
                            <Card.Text>
                                <strong>Symbol:</strong> {crypto.symbol}
                            </Card.Text>
                            <Card.Text>
                                <strong>Current Price:</strong> ${crypto.market_data.current_price.usd}
                            </Card.Text>
                            <Card.Text>
                                <strong>Market Cap:</strong> ${crypto.market_data.market_cap.usd}
                            </Card.Text>
                            <Card.Text>
                                <strong>Total Volume:</strong> ${crypto.market_data.total_volume.usd}
                            </Card.Text>
                            <Card.Text>
                                <strong>24h High:</strong> ${crypto.market_data.high_24h.usd}
                            </Card.Text>
                            <Card.Text>
                                <strong>24h Low:</strong> ${crypto.market_data.low_24h.usd}
                            </Card.Text>
                            <Card.Text>
                                <strong>Price Change 24h:</strong> ${crypto.market_data.price_change_24h}
                            </Card.Text>
                            <Card.Text>
                                <strong>Price Change Percentage 24h:</strong> {crypto.market_data.price_change_percentage_24h}%
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    {chartData ? (
                        <Line data={chartData} />
                    ) : (
                        <p>Loading chart data...</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default CryptoDetailPage;
