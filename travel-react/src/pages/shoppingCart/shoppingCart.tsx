import React from 'react'
import { MainLayout } from "../../layouts/mainLayout";
import styles from './ShoppingCart.module.css'
import { PaymentCard, ProductList } from "../../components";
import { Affix, Col, Row } from 'antd';
import { useSelector } from "../../redux/hook";
import { useDispatch } from "react-redux";
import { checkout, clearShoppingCart } from "../../redux/shoppingCart/slice";
import { useHistory } from "react-router-dom";

export const ShoppingCartPage: React.FC = props => {
  const history = useHistory()
  const dispatch = useDispatch()
  const shoppingCartLoading = useSelector(s => s.shoppingCart.loading)
  const shoppingCartItems = useSelector(s => s.shoppingCart.items)
  const token = useSelector(s => s.user.token) as string

  const priceList = shoppingCartItems.map(s => s.touristRoute.price)

  const checkOut = () => {
    if (!shoppingCartItems.length) return
    dispatch(checkout(token))
    history.push('/placeOrder')
  }

  return (
    <MainLayout>
      <Row>
        <Col span={16}>
          <div className={styles['product-list-container']}>
            <ProductList data={shoppingCartItems.map(s => s.touristRoute)} />
          </div>
        </Col>
        <Col span={8}>
          <Affix>
            <div className={styles['product-card-container']}>
              <PaymentCard loading={shoppingCartLoading}
                           price={priceList.reduce((a, b) => a + b, 0)}
                           originalPrice={shoppingCartItems
                             .map(s => s.originalPrice)
                             .reduce((a, b) => a + b, 0)}
                           onCheckout={checkOut}
                           onShoppingCartClear={() => dispatch(clearShoppingCart(token))}/>
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  )
}


