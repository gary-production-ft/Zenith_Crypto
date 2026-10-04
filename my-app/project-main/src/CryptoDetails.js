import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import { useNavigate } from 'react-router-dom';
import { ListGroup, Form, InputGroup, Button } from 'react-bootstrap';
import './Web-css/CryptoDetails.css';

const CryptoDetails = () => {
    const [cryptos, setCryptos] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const res = await axiosInstance.get('/coins/markets', {
                    params: {
                        vs_currency: 'usd',
                        order: 'market_cap_desc',
                        per_page: 25,
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

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSelectCrypto = (crypto) => {
        navigate(`/details/${crypto.id}`);
    };

    const filteredCryptos = cryptos.filter(crypto =>
        crypto.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="crypto-details-container ">
            <h2>Crypto Details</h2>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Search for a cryptocurrency..."
                    value={search}
                    onChange={handleSearch}
                />
                <Button variant="outline-secondary"  onClick={() => setSearch('')}>Clear</Button>
            </InputGroup>
            <div className="crypto-list" data-bs-theme="dark">
                <ListGroup>
                    {filteredCryptos.map(crypto => (
                        <ListGroup.Item 
                            key={crypto.id}
                            action
                            onClick={() => handleSelectCrypto(crypto)}
                            className="crypto-list-item"
                        >
                            <img src={crypto.image} alt={crypto.name} className="crypto-icon" />
                            {crypto.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </div>
    );
};

export default CryptoDetails;
