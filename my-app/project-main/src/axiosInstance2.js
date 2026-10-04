import axios from 'axios';
import axiosRetry from 'axios-retry';

const axiosInstance2 = axios.create({
  baseURL: 'http://localhost:5000/api',
});

axiosRetry(axiosInstance2, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

export default axiosInstance2;
