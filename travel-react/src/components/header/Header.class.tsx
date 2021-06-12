import React from "react";
import styles from "./Header.module.css";
import { Button, Dropdown, Input, Layout, Menu, Typography } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import logo from '../../assets/images/logo.svg'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import rootStore, { RootState } from '../../redux/store'
import { withTranslation, WithTranslation } from 'react-i18next'
import { addLanguageActionCreator, changeLanguageActionCreator } from "../../redux/language/languageActions";
import { connect } from 'react-redux'
import { Dispatch } from "redux";

const mapStateToProps = (state: RootState) => {
  return {
    language: state.language.language,
    languageList: state.language.languageList
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeLanguage: (code: 'zh' | 'en') => {
      const action = changeLanguageActionCreator(code)
      dispatch(action)
    },
    addLanguage: (name: string, code: string) => {
      const action = addLanguageActionCreator(name, code)
      dispatch(action)
    }
  }
}

type PropsType = RouteComponentProps & WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class HeaderComponent extends React.PureComponent<PropsType> {
  constructor (props) {
    super(props);
    this.goHome = this.goHome.bind(this)
    this.reg = this.reg.bind(this)
    this.signin = this.signin.bind(this)
    this.handleMenu = this.handleMenu.bind(this)
  }

  handleStoreState = () => {
    const storeState = rootStore.store.getState()
    this.setState({
      language: storeState.language.language,
      languageList: storeState.language.languageList
    })
  }

  goHome () {
    this.props.history.push('/')
  }

  reg () {
    this.props.history.push('register')
  }

  signin () {
    this.props.history.push('signin')
  }

  handleMenu (e) {
    const {key} = e
    key === 'new' ? this.props.addLanguage('新语言', 'newLang') : this.props.changeLanguage(key)
  }

  render () {
    const {t, language, languageList} = this.props
    return <div className={styles['app-header']}>
      <div className={styles['top-header']}>
        <div className={styles.inner}>
          <Typography.Text>{t('header.slogan')}</Typography.Text>
          <Dropdown.Button style={{marginLeft: 15}}
                           icon={<GlobalOutlined />}
                           overlay={<Menu onClick={this.handleMenu}>
                             {languageList.map(l => <Menu.Item key={l.code}>{l.name}</Menu.Item>)}
                             <Menu.Item key={'new'}>添加新语言</Menu.Item>
                           </Menu>}>
            {language === 'zh' ? '中文' : 'English'}
          </Dropdown.Button>
          <Button.Group className={styles['button-group']}>
            <Button onClick={this.reg}>注册</Button>
            <Button onClick={this.signin}>登录</Button>
          </Button.Group>
        </div>
      </div>
      <Layout.Header className={styles['main-header']}>
      <span onClick={this.goHome}>
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
}

const Header = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(HeaderComponent)))

export {
  Header
}

