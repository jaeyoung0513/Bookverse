<<<<<<< HEAD
// const axios = require('axios');
//
// // 로그인 정보
// const loginData = {
//     username: 'your-username',
//     password: 'your-password'
// };
//
// // 로그인 요청 보내기
// axios.post('https://your-api-endpoint.com/login', loginData)
//     .then(response => {
//         // 로그인 성공 시 처리할 로직
//         console.log('로그인 성공:', response.data);
//     })
//     .catch(error => {
//         // 로그인 실패 시 처리할 로직
//         console.error('로그인 실패:', error);
//     });
=======
import axios from "axios";
import store, { saveJwtToken } from "../redux/userSlice";
import { getJwtToken } from "./jwtService";

let isRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    const jwtToken = getJwtToken();
    if (jwtToken) {
      config.headers["Authorization"] = jwtToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken) => {
            originalRequest.headers["Authorization"] = newToken;
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const reissueResponse = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/reissue`,
          {},
          { withCredentials: true }
        );
        const newToken = reissueResponse.headers["authorization"];

        store.dispatch(saveJwtToken(newToken));
        onTokenRefreshed(newToken);

        isRefreshing = false;
        return apiClient(originalRequest);
      } catch (reissueError) {
        isRefreshing = false;
        return Promise.reject(reissueError);
      }
    }

    if (!error.response) {
      console.error("Network Error:", error.message);
      alert("Network error: Please check your connection.");
    } else if (error.response.status >= 500) {
      console.error("Server Error:", error.response.data);
      alert("Server error: Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
>>>>>>> e3380bf88fb77b0daf5583e3c36968c6fdea4065
