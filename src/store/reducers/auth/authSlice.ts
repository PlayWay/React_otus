import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  user: {
    name: string;
  };
};

const initialState = {
  user: {
    name: "",
  },
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, { payload }: PayloadAction<string>) {
      state.user.name = payload;
    },
    logout(state) {
      state.user.name = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
