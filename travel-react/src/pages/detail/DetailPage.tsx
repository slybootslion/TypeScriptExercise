import React, { useEffect, useState } from 'react'
import { RouteComponentProps, useParams } from 'react-router-dom'
import { Footer, Header, ProductComments } from "../../components";
import { Divider, Spin, Typography } from "antd";
import styles from './DetailPage.module.css'
import axios from 'axios'

interface MatchParams {
  touristRouteId: string
}

const DetailPage: React.FC<RouteComponentProps<MatchParams>> = props => {
  const {touristRouteId} = useParams<MatchParams>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | string>(null)
  const [commentData, setCommentData] = useState<any>(null)

  useEffect(() => {
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
  }, [])

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

  return <>
    <Header />
    <div className={styles["page-content"]}>
      <div id="comments" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>用户评价</Typography.Title>
        </Divider>
        <div style={{margin: 40}}>
          <ProductComments data={commentData} />
        </div>
      </div>
    </div>
    <Footer />
  </>
}

export { DetailPage }
