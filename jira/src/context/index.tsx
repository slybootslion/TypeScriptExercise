import React from "react";
import { AuthProvider, ChildrenNodeType } from "./auth-context";
import { QueryClient, QueryClientProvider } from "react-query";

export const AppProviders = ({children}: ChildrenNodeType) => {

  return <QueryClientProvider client={new QueryClient()}>
    <AuthProvider>
      {children}
    </AuthProvider>
  </QueryClientProvider>

}
