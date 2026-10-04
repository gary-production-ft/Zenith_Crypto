const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/crypto-stats', { useNewUrlParser: true, useUnifiedTopology: true });

const statsSchema = new mongoose.Schema({
    totalUsers: Number,
    totalTransactions: Number,
    totalVolume: Number,
    marketCap: Number
});

const Stats = mongoose.model('Stats', statsSchema);

app.get('/api/stats', async (req, res) => {
    try {
        const stats = await Stats.findOne({});
        res.json(stats);
    } catch (err) {
        res.status(500).send(err);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
