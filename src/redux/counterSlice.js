import { createSlice, current } from "@reduxjs/toolkit";
import { json, useNavigate } from "react-router-dom";
import colors, { layoutColors } from "../config/colors";

const initialState = {
  token: localStorage.getItem("rladz-t") || null,
  role: localStorage.getItem("userTyperladz-t") || null,
  active: localStorage.getItem("rladzact-t") || false,
  userId: localStorage.getItem("rladzid-t") || null,
  isLoggedIn: !!localStorage.getItem("rladz-t"),
};

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      console.log(payload, "test");
      localStorage.setItem("rladz-t", payload?.token);
      localStorage.setItem("rladzid-t", payload?.userId);
      localStorage.setItem("userTyperladz-t", payload?.role);
      localStorage.setItem("rladzact-t", payload?.active);
      return {
        ...state,
        token: payload?.token,
        isLoggedIn: true,
        user: payload?.user,
        userId: payload?.userId,
        role: payload?.role,
        active: payload?.active,
      };
    },
    logout: (state) => {
      state.token = null;
      state.userType = null;
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("rladz-t");
      localStorage.removeItem("userTyperladz-t");
      localStorage.removeItem("rladzid-t");
      localStorage.removeItem("userTyperladz-t");
      localStorage.removeItem("rladzact-t");
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = counterSlice.actions;

export default counterSlice.reducer;
