import React from "react";
import { Comment, List } from "antd";

interface PropsTypes {
  data: { id: string, author: string, avatar: string, content: string, createDate: string }[]
}

const ProductComments: React.FC<PropsTypes> = props => {
  const {data} = props
  return <List dataSource={data}
               itemLayout={'horizontal'}
               renderItem={item => {
                 return <li>
                   <Comment author={item.author}
                            avatar={item.avatar}
                            content={item.content + item.id}
                            datetime={item.createDate} />
                 </li>
               }}>

  </List>
}

export { ProductComments }
