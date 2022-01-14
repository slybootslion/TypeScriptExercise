import React from "react";
import { AuthProvider, ChildrenNodeType } from "./auth-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "../store/store";

export const AppProviders = ({children}: ChildrenNodeType) => {

  return <Provider store={store}>
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  </Provider>
}
