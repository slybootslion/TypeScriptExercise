import React, { useEffect } from 'react'
import { RouteComponentProps, useParams } from 'react-router-dom'
import { ProductComments } from "../../components";
import { Divider, Spin, Typography } from "antd";
import styles from './DetailPage.module.css'
import { getProductDetail } from '../../redux/productDetail/slice'
import { useSelector } from "../../redux/hook";
import { useDispatch } from "react-redux";
import { MainLayout } from "../../layouts/mainLayout";

interface MatchParams {
  touristRouteId: string
}

const DetailPage: React.FC<RouteComponentProps<MatchParams>> = props => {
  const {touristRouteId} = useParams<MatchParams>()
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState<null | string>(null)
  // const [commentData, setCommentData] = useState<any>(null)

  const loading = useSelector(state => state.productDetail.loading)
  const error = useSelector(state => state.productDetail.error)
  const commentData = useSelector(state => state.productDetail.data)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductDetail(touristRouteId))
  }, [])

  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/travel/touristRoutes/${touristRouteId}`)
        setCommentData(res.data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    fetchData()
  }, [])*/

  if (loading) {
    return <Spin size={'large'}
                 style={{
                   marginTop: 200,
                   marginBottom: 200,
                   marginLeft: 'auto',
                   marginRight: 'auto',
                   width: '100%'
                 }} />
  }

  if (error) {
    return <div>网站出错：{error}</div>
  }

  return <MainLayout>
          <div id="comments" className={styles["product-detail-container"]}>
            <Divider orientation={"center"}>
              <Typography.Title level={3}>用户评价</Typography.Title>
            </Divider>
            <div style={{margin: 40}}>
              <ProductComments data={commentData} />
            </div>
          </div>
        </MainLayout>
}

export { DetailPage }
