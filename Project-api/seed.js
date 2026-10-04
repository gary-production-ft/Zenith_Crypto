const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crypto-stats', { useNewUrlParser: true, useUnifiedTopology: true });

const statsSchema = new mongoose.Schema({
    totalUsers: Number,
    totalTransactions: Number,
    totalVolume: Number,
    marketCap: Number
});

const Stats = mongoose.model('Stats', statsSchema);

const seedStats = async () => {
    await Stats.deleteMany({});
    const stats = new Stats({
        totalUsers: 1000,
        totalTransactions: 5000,
        totalVolume: 120000,
        marketCap: 2500000
    });
    await stats.save();
    mongoose.connection.close();
};

seedStats();