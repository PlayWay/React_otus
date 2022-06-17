import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: string;
};

const initialState = {
  user: "",
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, { payload }: PayloadAction<string>) {
      state.user = payload;
    },
    logout(state) {
      state.user = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
