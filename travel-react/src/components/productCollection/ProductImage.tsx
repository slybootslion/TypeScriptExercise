import React from "react";
import { Image, Typography } from 'antd'

interface PropsType {
  id: number | string
  size: 'large' | 'small'
  title: string
  imageSrc: string
  price: string | number
}

const ProductImage: React.FC<PropsType> = props => {
  const {id, size, imageSrc, title, price} = props
  let width, height
  if (size === 'large') {
    width = 490
    height = 285
  } else {
    width = 240
    height = 120
  }

  return <>
    <Image src={imageSrc} width={width} height={height} />
    <div>
      <Typography.Text type='secondary'>{title.slice(0, 25)}</Typography.Text>
      <Typography.Text type='danger' strong>$ {price} 起</Typography.Text>
    </div>
  </>
}

export default ProductImage
