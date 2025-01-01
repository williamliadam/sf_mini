import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Taro from "@tarojs/taro";
import services from "src/services";

export const wxLogin = createAsyncThunk('auth/wxLogin', async () => {
  const result = await Taro.login();
  const res = await services.auth.wxLogin(result.code);
  return res.data;
});

export const wxGetUserInfo = createAsyncThunk('auth/wxGetUserInfo', async () => {
  const profile = await Taro.getUserInfo();
  return profile.userInfo;
});

type UserState = {
  name: string;
  avatarUrl: string;
  city: string;
  country: string;
  gender: number;
  language: string;
  nickName: string;
  province: string;
}
const initialState: UserState = {
  name: '',
  avatarUrl: '',
  city: '',
  country: "",
  gender: 0,
  language: "",
  nickName: "",
  province: "",
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.name = action.payload.name;
      state.nickName = action.payload.nickName;
      state.avatarUrl = action.payload.avatarUrl;
      state.city = action.payload.city;
      state.country = action.payload.country
    }
  },
  extraReducers: (builder) => {
    builder.addCase(wxGetUserInfo.fulfilled, (state, action) => {
      state.nickName = action.payload.nickName;
      state.avatarUrl = action.payload.avatarUrl;
      state.city = action.payload.city;
      state.country = action.payload.country
    });
  }
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
