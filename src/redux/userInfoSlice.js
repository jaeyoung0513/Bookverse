import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/axiosInstance";

// 비동기 Thunk 선언
export const updateUserInfo = createAsyncThunk(
  "userInfo/update",
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(
        `/api/user/update/${userInfo.user_id}`, // user_id 사용
        userInfo
      );
      return response.data;
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      return rejectWithValue(error.response?.data || "프로필 업데이트 실패");
    }
  }
);

// Redux Slice 선언
const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    user: null,
    loginFlag: false,
    role: "",
    jwtToken: "",
    updateStatus: "idle",
    updateError: null,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload;
      state.loginFlag = !!action.payload; // 사용자 정보가 있을 때만 true
    },
    clearUserInfo: (state) => {
      state.user = null;
      state.loginFlag = false;
      state.role = "";
      state.jwtToken = "";
    },
    saveJwtToken: (state, action) => {
      state.jwtToken = action.payload;
      state.loginFlag = !!action.payload; // 토큰이 있을 때만 true
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserInfo.pending, (state) => {
        state.updateStatus = "pending";
        state.updateError = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload }; // 새로운 사용자 정보로 갱신
        state.updateStatus = "succeeded";
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload || "프로필 업데이트 실패";
      });
  },
});

// 액션과 리듀서 내보내기
export const { setUserInfo, clearUserInfo, saveJwtToken, setRole } =
  userInfoSlice.actions;
export default userInfoSlice.reducer;
