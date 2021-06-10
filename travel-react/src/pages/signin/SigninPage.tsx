import React from 'react'
import { UserLayout } from "../../layouts/userLayout";
import { SigninForm } from "./SigninForm";

const SignInPage: React.FC = props => {
  return <UserLayout>
          <SigninForm />
         </UserLayout>
}

export { SignInPage }
