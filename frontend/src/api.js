// // src/api.js
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api'
// });

// api.interceptors.request.use((config) => {
//   // 👇 Yahan localStorage ki jagah sessionStorage kar diya
//   const token = localStorage.getItem('token'); 
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Apna backend URL check kar lena
});

// Axios Interceptor: Yeh har request (GET, POST, PUT, DELETE) se pehle chalega
api.interceptors.request.use(
  (config) => {
    // LocalStorage ya SessionStorage se token nikalna
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    // Agar token mil gaya, toh usko request ke Headers mein daal do
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;