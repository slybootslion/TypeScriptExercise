import React from 'react'
import styles from './UserLayout.module.css'
import logo from "../../assets/images/logo.svg";
import { CaretDownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Layout, Menu } from "antd";
const { Header, Footer, Content } = Layout;

export const UserLayout:React.FC = props => {

  const menu = (
    <Menu>
      <Menu.Item>中文</Menu.Item>
      <Menu.Item>English</Menu.Item>
    </Menu>
  );

  return <Layout className={styles["user-layout-container"]}>
          <Header className={styles["header"]}>
            <div className={styles["lang"]}>
              <Dropdown overlay={menu}>
                <Button>
                  {" "}
                  选择语言 <CaretDownOutlined />
                </Button>
              </Dropdown>
            </div>
          </Header>
          <Content className={styles["content"]}>
            <div className={styles["top"]}>
              <div className={styles["content-header"]}>
                <Link to="/">
                  <img alt="logo" className={styles["logo"]} src={logo} />
                  <span className={styles["title"]}>React学习网</span>
                </Link>
              </div>
              <div className={styles["desc"]}>
                这是一句关于网站的描述
              </div>
              {props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Footer就不写了，太累了</Footer>
        </Layout>
}

