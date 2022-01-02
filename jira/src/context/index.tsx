import React from "react";
import { AuthProvider, ChildrenNodeType } from "./auth-context";

export const AppProviders = ({children}: ChildrenNodeType) => {

  return <AuthProvider>
    {children}
  </AuthProvider>
}
