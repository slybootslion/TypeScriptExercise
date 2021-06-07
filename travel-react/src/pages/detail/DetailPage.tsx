import React from 'react'
import {RouteComponentProps} from 'react-router-dom'

interface MatchParams {
  touristRouteId: string
}

const DetailPage: React.FC<RouteComponentProps<MatchParams>> = props => {
  return <div>路线详情： {props.match.params.touristRouteId}</div>
}

export {DetailPage}
