import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  loading: boolean
  error: string | null
  token: string | null
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null
}

export const singIn = createAsyncThunk(
  'user/singIn',
  async (loginData: {email: string, password: string}, thunkAPI) => {
    const {email, password} = loginData
    const res = await axios.post('/travel/auth/login', {email, password})
    return res.data.token
  }
)

export const logout = createAsyncThunk(
  'user/logout',
  async (token:string | null) => {
    axios.defaults.headers.Authorization = `Bearer ${token}`
    const res = await axios.post('/travel/auth/logout')
    return res.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [singIn.pending.type]: state => {
      state.loading = true
    },
    [singIn.fulfilled.type]: (state, action) => {
      state.token = action.payload
      state.loading = false
      state.error = null
    },
    [singIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
    [logout.pending.type]: state => {
      state.loading = true
    },
    [logout.fulfilled.type]: (state) => {
      state.token = null
      state.loading = false
      state.error = null
    },
    [logout.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
  }
})
