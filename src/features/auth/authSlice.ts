import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Taro from "@tarojs/taro";
import services from "src/services";

export const wxLogin = createAsyncThunk('auth/wxLogin', async () => {
  const result = await Taro.login();
  const res = await services.auth.wxLogin(result.code);
  if (res.data) {
    Taro.setStorageSync('token', res.data.token);
    Taro.setStorageSync('refreshToken', res.data.refreshToken);
  }
  return res.data;
});

type AuthState = {
  token: string;
  refreshToken: string;
}

const initialState: AuthState = {
  token: '',
  refreshToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{
      token: string;
      refreshToken: string;
    }>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(wxLogin.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    });
  }
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;