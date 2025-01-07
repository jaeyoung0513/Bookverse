import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    entities: {}, // { id: userInfo }
    loginFlag: false,
    role: "",
    jwtToken: "",
  },
  reducers: {
    addUserInfo: (state, action) => {
      const { user_id, ...rest } = action.payload;
      state.entities[user_id] = rest;
    },
    clearUserInfo: (state) => {
      state.entities = {};
    },
    setLoginFlag: (state, action) => {
      state.loginFlag = action.payload;
    },
    setLogout: (state) => {
      state.loginFlag = false;
      state.role = "";
      state.jwtToken = "";
    },
    saveJwtToken: (state, action) => {
      state.jwtToken = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const {
  addUserInfo,
  clearUserInfo,
  setLoginFlag,
  setLogout,
  saveJwtToken,
  setRole,
} = userInfoSlice.actions;

export const updateUserInfo = (userInfo) => async (dispatch) => {
  try {
    const response = await axios.put(
      `/api/user/update/${userInfo.id}`,
      userInfo
    );
    dispatch({
      type: "userInfo/updateSuccess",
      payload: response.data,
    });
    alert("프로필 정보가 성공적으로 업데이트되었습니다.");
  } catch (error) {
    console.error("프로필 업데이트 실패:", error);
    alert("프로필 업데이트를 실패하였습니다.");
  }
};

export default userInfoSlice.reducer;
