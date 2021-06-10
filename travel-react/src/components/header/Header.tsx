import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { Button, Dropdown, Input, Layout, Menu, Typography } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import logo from '../../assets/images/logo.svg'
import { useHistory } from 'react-router-dom'
import { useSelector } from "../../redux/hook";
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next'
import { addLanguageActionCreator, changeLanguageActionCreator } from "../../redux/language/languageActions";
import jwtDecode, {JwtPayload as DefaultJwtPayload} from "jwt-decode";
import { logout } from "../../redux/user/slice";
// import { Dispatch } from "redux";
// import { LanguageActionTypes } from "../../redux/language/languageActions";

interface JwtPayload extends DefaultJwtPayload {
  username: string
}

const Header: React.FC = props => {
  const history = useHistory()
  const language = useSelector(state => state.language.language)
  const languageList = useSelector(state => state.language.languageList)
  const token = useSelector(state => state.user.token)
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  // const dispatch = useDispatch<Dispatch<LanguageActionTypes>>()
  const {t} = useTranslation()

  useEffect(() =>{
    if (token) {
      const t = jwtDecode<JwtPayload>(token)
      setUsername(t.username)
    }
  }, [token])


  const reg = () => history.push('/register')
  const signin = () => history.push('/signin')
  const goHome = () => history.push('/')

  const signOut = () => {
    dispatch(logout(token))
    history.push('/')
  }

  const menuClickHandler = e => {
    const {key} = e
    console.log(key)
    key === 'new' ? dispatch(addLanguageActionCreator('新语言', 'new_lang')) : dispatch(changeLanguageActionCreator(key))
  }

  return <div className={styles['app-header']}>
    <div className={styles['top-header']}>
      <div className={styles.inner}>
        <Typography.Text>让旅游更幸福</Typography.Text>
        <Dropdown.Button style={{marginLeft: 15}}
                         icon={<GlobalOutlined />}
                         overlay={
                           <Menu onClick={menuClickHandler}>
                             {languageList.map(l => <Menu.Item key={l.code}>{l.name}</Menu.Item>)}
                             <Menu.Item key={'new'}>{t('header.add_new_language')}</Menu.Item>
                           </Menu>
                         }>{language === 'zh' ? '中文' : 'English'}</Dropdown.Button>
        {
          token ?
            <Button.Group className={styles['button-group']}>
              <span>{t('header.welcome')}<Typography.Text strong>{username}</Typography.Text></span>
              <Button>{t('header.shoppingCart')}</Button>
              <Button onClick={signOut}>{t('header.signOut')}</Button>
            </Button.Group> :
            <Button.Group className={styles['button-group']}>
              <Button onClick={reg}>注册</Button>
              <Button onClick={signin}>登录</Button>
            </Button.Group>
        }
      </div>
    </div>
    <Layout.Header className={styles['main-header']}>
      <span onClick={goHome}>
        <img src={logo} alt="logo" className={styles['App-logo']} />
        <Typography.Title level={3} className={styles.title}>React网站</Typography.Title>
      </span>
      <Input.Search placeholder={'请输入'} className={styles['search-input']} />
    </Layout.Header>
    <Menu mode={'horizontal'} className={styles["main-menu"]}>
      <Menu.Item key={1}>旅游首页</Menu.Item>
      <Menu.Item key={2}>周末游</Menu.Item>
      <Menu.Item key={3}>跟团游</Menu.Item>
      <Menu.Item key="4"> 自由行 </Menu.Item>
      <Menu.Item key="5"> 私家团 </Menu.Item>
      <Menu.Item key="6"> 邮轮 </Menu.Item>
      <Menu.Item key="7"> 酒店+景点 </Menu.Item>
      <Menu.Item key="8"> 当地玩乐 </Menu.Item>
      <Menu.Item key="9"> 主题游 </Menu.Item>
      <Menu.Item key="10"> 定制游 </Menu.Item>
      <Menu.Item key="11"> 游学 </Menu.Item>
      <Menu.Item key="12"> 签证 </Menu.Item>
      <Menu.Item key="13"> 企业游 </Menu.Item>
      <Menu.Item key="14"> 高端游 </Menu.Item>
      <Menu.Item key="15"> 爱玩户外 </Menu.Item>
      <Menu.Item key="16"> 保险 </Menu.Item>
    </Menu>
  </div>
}

export {
  Header
}
