import React from "react";
import { PaymentForm, CheckOutCard } from "../../components";
import { MainLayout } from "../../layouts/mainLayout";
import { Row, Col } from 'antd'
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hook";
import { placeOrder } from "../../redux/order/slice";

export const PlaceOrderPage: React.FC = props => {
  const dispatch = useDispatch()
  const token = useSelector(s => s.user.token) as string
  const loading = useSelector(s => s.order.loading)
  const order = useSelector(s => s.order.currentOrder)

  const checkOut = () => dispatch(placeOrder({token, orderId: order.id}))

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          <CheckOutCard loading={loading}
                        onCheckout={checkOut}
                        order={order} />
        </Col>
      </Row>
    </MainLayout>
  )
}
