import { createSlice } from "@reduxjs/toolkit";
import { User } from "../type";
import { AppDispatch, RootState } from "./store";
import * as auth from "../auth-provider";
import { bootstrapUser } from "../context/auth-context";

interface State {
  user: User | null
}

const initialState: State = {
  user: null
}

export const authSlice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setUser (state, action) {
      state.user = action.payload
    }
  }
})

const {setUser} = authSlice.actions

export const login = (form: auth.AuthForm) => (dispatch: AppDispatch) => auth.login(form).then(res => dispatch(setUser(res)))
export const register = (form: auth.AuthForm) => (dispatch: AppDispatch) => auth.register(form).then(res => dispatch(setUser(res)))
export const logout = () => (dispatch: AppDispatch) => auth.logout().then(res => dispatch(setUser(null)))
export const bootstrap = () => (dispatch: AppDispatch) => bootstrapUser().then(res => dispatch(setUser(res)))

export const selectUser = (state:RootState) => state.auth.user
