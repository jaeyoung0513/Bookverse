import { createSlice } from "@reduxjs/toolkit";

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
      const { id, ...userInfo } = action.payload;
      state.entities[id] = userInfo;
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

export default userInfoSlice.reducer;
