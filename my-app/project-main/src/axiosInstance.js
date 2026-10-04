import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
});

axiosInstance.interceptors.response.use(null, (error) => {
  const config = error.config;
  if (!config || !config.retry) return Promise.reject(error);

  config.__retryCount = config.__retryCount || 0;

  if (config.__retryCount >= config.retry) {
    return Promise.reject(error);
  }

  config.__retryCount += 1;

  const backoff = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, config.retryDelay || 1000);
  });

  return backoff.then(() => {
    return axiosInstance(config);
  });
});

export default axiosInstance;
