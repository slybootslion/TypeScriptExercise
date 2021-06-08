import React from "react";
import { sideMenuList } from './mockup'
import { Menu } from "antd";
import styles from './SideMenu.module.css'
import { GifOutlined } from '@ant-design/icons'

const SideMenu: React.FC = () => {
  return <Menu mode='vertical' className={styles['side-menu']}>
    {
      sideMenuList.map((item, index) => {
        return <Menu.SubMenu key={`${index}-submenu1`} title={<span><GifOutlined />{item.title}</span>}>
          {
            item.subMenu.map((i) => {
              return <Menu.SubMenu key={`${parseInt((Math.random() * 1000000).toString())}-submenu2`} title={<span><GifOutlined />{i.title}</span>}>
                {
                  i.subMenu.map(_i => {
                    return <Menu.Item key={`${parseInt((Math.random() * 1000000).toString())}-submenu3`}><span><GifOutlined />{_i}</span></Menu.Item>
                  })
                }
              </Menu.SubMenu>
            })
          }
        </Menu.SubMenu>
      })
    }
  </Menu>
}

export { SideMenu }
