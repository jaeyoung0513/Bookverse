import axios from "axios";
import store from "../redux/store";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (config.data instanceof URLSearchParams) {
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    // 스토어에서 JWT 토큰을 가져와 요청 헤더에 추가합니다.
    const state = store.getState();
    const jwtToken = state.userInfo.jwtToken;
    if (jwtToken) {
      config.headers["Authorization"] = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config._retry
    ) {
      error.config._retry = true;
      try {
        const reissueResponse = await axios.post(
          `${apiClient.defaults.baseURL}/api/reissue`,
          {},
          { withCredentials: true }
        );
        const newToken = reissueResponse.data.accessToken;

        // Redux 상태에 새로운 토큰 저장
        store.dispatch({
          type: "userInfo/saveJwtToken",
          payload: newToken,
        });

        // 요청 헤더에 새로운 토큰 추가 후 재요청
        error.config.headers["Authorization"] = `Bearer ${newToken}`;
        return apiClient(error.config);
      } catch (reissueError) {
        return Promise.reject(reissueError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
