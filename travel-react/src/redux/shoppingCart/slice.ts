import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ShoppingCartState {
  loading: boolean
  error: null | string
  items: any[]
}

const initialState: ShoppingCartState = {
  loading: true,
  error: null,
  items: []
}

export const getShoppingCart = createAsyncThunk(
  'shoppingCart/getShoppingCart',
  async (token: string, thunkAPI) => {
    const res = await axios.get(`/travel/shoppingCart`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    return res.data.shoppingCartItems
  }
)

export const addShoppingCartItem = createAsyncThunk(
  'shoppingCart/addShoppingCartItem',
  async (parameters: { token: string, touristRouteId: string },
         thunkAPI) => {
    const res = await axios.post(`/travel/shoppingCart/items`,
      {touristRouteId: parameters.touristRouteId},
      {headers: {Authorization: `Bearer ${parameters.token}`}})
    return res.data.shoppingCartItems
  }
)

export const clearShoppingCart = createAsyncThunk(
  'shoppingCart/clearShoppingCart',
  async (token: string,
         thunkAPI) => {
    return axios.delete(`/travel/shoppingCart/all`,
      {headers: {Authorization: `Bearer ${token}`}})
  }
)

export const checkout = createAsyncThunk(
  'shoppingCart/checkout',
  async (token: string) => {
    const res = await axios.post(`/travel/shoppingCart/checkout`,
      null,
      {headers: {Authorization: `Bearer ${token}`}})
    return res.data
  }
)

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {},
  extraReducers: {
    [getShoppingCart.pending.type]: state => {
      state.loading = true
    },
    [getShoppingCart.fulfilled.type]: (state, action) => {
      state.loading = false
      state.error = null
      state.items = action.payload
    },
    [getShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
    [addShoppingCartItem.pending.type]: state => {
      state.loading = true
    },
    [addShoppingCartItem.fulfilled.type]: (state, action) => {
      state.loading = false
      state.error = null
      state.items = action.payload
    },
    [addShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
    [clearShoppingCart.pending.type]: state => {
      state.loading = true
    },
    [clearShoppingCart.fulfilled.type]: (state) => {
      state.loading = false
      state.error = null
      state.items = []
    },
    [clearShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
    [checkout.pending.type]: state => {
      state.loading = true
    },
    [checkout.fulfilled.type]: (state, action) => {
      state.loading = false
      state.error = null
      state.items = []
    },
    [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
  }
})
