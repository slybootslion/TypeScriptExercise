import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { checkout } from '../shoppingCart/slice'
import axios from "axios";

interface OrderState {
  loading: boolean
  error: null | string
  currentOrder: any
}

const initialState: OrderState = {
  loading: false,
  error: null,
  currentOrder: null
}

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (parameters: { token: string, orderId: string }, thunkAPI) => {
    const {orderId, token} = parameters
    const res = await axios.post(
      `/travel/orders/${orderId}/placeOrder`,
      null,
      {headers: {Authorization: `Bearer ${token}`}}
    )
    return res.data
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: {
    [placeOrder.pending.type]: state => {
      state.loading = true
    },
    [placeOrder.fulfilled.type]: (state, action) => {
      state.loading = false
      state.error = null
      console.log(action.payload)
      state.currentOrder = action.payload
    },
    [placeOrder.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
    [checkout.pending.type]: state => {
      state.loading = true
    },
    [checkout.fulfilled.type]: (state, action) => {
      state.loading = false
      state.error = null
      state.currentOrder = action.payload
    },
    [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
  }
})
