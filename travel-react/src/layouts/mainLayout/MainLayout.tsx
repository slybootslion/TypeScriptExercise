import React from "react";
import { Footer, Header } from "../../components";
import styles from './MainLayout.module.css'

export const MainLayout: React.FC = props => {
  const {children} = props
  return <>
    <Header />
    <div className={styles['page-content']}>{children}</div>
    <Footer />
  </>
}
