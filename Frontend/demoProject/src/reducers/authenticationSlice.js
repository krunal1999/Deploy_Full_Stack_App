import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  id: null,
  user: null,
  isAuthenticated: false,
};

function clearAuthCookies() {
  Cookies.remove("accessToken", { path: "/" });
}

const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = null;
      state.user = null;
      state.isAuthenticated = true;
      
      localStorage.setItem("isAuthenticated", "true");
    },
    logout: (state) => {
      state.id = null;
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("isAuthenticated");
      clearAuthCookies();
    },
    setUser: (state, action) => {
      state.user = action.payload; 
    },
  },
});

export const { login, logout, setUser } = authenticationSlice.actions;
export default authenticationSlice.reducer;
