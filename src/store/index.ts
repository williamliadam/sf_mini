import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Taro from '@tarojs/taro';
import services from 'src/services';
export const wxLogin = createAsyncThunk('auth/wxLogin', async () => {
  console.log("wxLogin");
  const result = await Taro.login();
  console.log(result);
  const res = await services.auth.wxLogin(result.code);
  console.log(res);
  return res.data;
});

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    user: "hello",
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: 'John Doe',
    age: 25,
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAge: (state, action) => {
      state.age = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(wxLogin.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.age = action.payload.age;
    });
  }
});

const rootReducer = {
  global: globalSlice.reducer,
  user: userSlice.reducer,
}

const store = configureStore({
  reducer: rootReducer,
});



export const { setUser } = globalSlice.actions;
export const { setName, setAge } = userSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;