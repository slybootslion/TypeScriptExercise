import React, { useEffect } from "react";
import styles from './HomePage.module.css'
import { BusinessPartners, Carousel, Footer, Header, ProductCollection, SideMenu } from "../../components";
import { Col, Row, Spin, Typography } from 'antd'
import sideImage1 from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useSelector } from "../../redux/hook";
import { giveMeDataActionCreator } from "../../redux/recommendProducts/recommendProductsActions";


const HomePage: React.FC = props => {
  const {t} = useTranslation()
  const productList = useSelector(state => state.recommendProducts.productList)
  const loading = useSelector(state => state.recommendProducts.loading)
  const error = useSelector(state => state.recommendProducts.error)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(giveMeDataActionCreator())
  }, [])

  if (loading) {
    return <Spin size="large"
                 style={{
                   marginTop: 200,
                   marginBottom: 200,
                   marginLeft: 'auto',
                   marginRight: 'auto',
                   width: '100%'
                 }} />
  }

  if (error) return <div>网站出错: {error}</div>

  return <div>
    <Header />
    <div className={styles['page-content']}>
      <Row style={{marginTop: 20}}>
        <Col span={6}>
          <SideMenu />
        </Col>
        <Col span={18}>
          <Carousel />
        </Col>
      </Row>
      <ProductCollection
        title={<Typography.Title level={3} type="warning">{t('home_page.hot_recommended')}</Typography.Title>}
        sideImage={sideImage1}
        products={productList[0].touristRoutes} />
      <ProductCollection
        title={<Typography.Title level={3} type="danger">新品上市</Typography.Title>}
        sideImage={sideImage2}
        products={productList[1].touristRoutes} />
      <ProductCollection
        title={<Typography.Title level={3} type="success">国内游推荐</Typography.Title>}
        sideImage={sideImage3}
        products={productList[2].touristRoutes} />
      <BusinessPartners />
    </div>
    <Footer />
  </div>
}

export {
  HomePage
}
