import React from 'react'
import { UserLayout } from "../../layouts/userLayout";
import { RegisterForm } from "./RegisterForm";

const RegisterPage: React.FC = props => {
  return <UserLayout>
          <RegisterForm />
         </UserLayout>
}

export { RegisterPage }
