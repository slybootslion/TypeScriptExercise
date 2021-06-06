import React from "react";
import styles from './ShoppingCart.module.css'
import { FiShoppingCart } from 'react-icons/fi'
import { appCtx } from "../AppState";

interface Props {

}

interface State {
  isOpen: boolean
}

class ShoppingCart extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // e.target 描述的是时间发生的元素
    // e.currentTarget 描述的是事件处理绑定的元素
    this.setState({isOpen: !this.state.isOpen})
  }

  render () {
    return (
      <appCtx.Consumer>
        {
          value => {
            return (
              <div className={styles.cartContainer}>
                <button className={styles.button}
                        onClick={this.handleClick}>
                  <FiShoppingCart />
                  <span>购物车 {value.shoppingCart.items.length}（件）</span>
                </button>
                <div className={styles.cartDropDown}
                     style={{display: this.state.isOpen ? 'block' : 'none'}}>
                  <ul>
                    {
                      value.shoppingCart.items.map(r => <li key={r.id}>{r.name}</li>)
                    }
                  </ul>
                </div>
              </div>
            )
          }
        }
      </appCtx.Consumer>
    )
  }
}

export default ShoppingCart
