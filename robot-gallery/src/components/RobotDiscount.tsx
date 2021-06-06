import styles from './Robot.module.css'
import { useContext } from "react";
import { appCtx } from "../AppState";
import { useAddToCart } from "./AddToCart";

interface RobotProps {
  id: number
  name: string
  email: string
}

const Robot: React.FC<RobotProps> = props => {
  const {id, name, email} = props
  const ctxValue = useContext(appCtx)

  const add = useAddToCart()

  return <>
    <div className={styles.cardContainer}>
      <img src={`https://robohash.org/${id}`} alt="robot" />
      <h2>打折商品：{name}</h2>
      <p>{email}</p>
      <p>作者：{ctxValue.username}</p>
      <button onClick={() => add(id, name)}>加入购物车</button>
    </div>
  </>
}

export default Robot
