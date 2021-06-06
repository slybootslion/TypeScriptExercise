import styles from './Robot.module.css'
import { useContext } from "react";
import { appCtx } from "../AppState";
import { withAddToCart } from "./AddToCart";

export interface RobotProps {
  id: number
  name: string
  email: string,
  add: (id, name) => void
}

const Robot: React.FC<RobotProps> = props => {
  const {id, name, email, add} = props
  const ctxValue = useContext(appCtx)

  return <>
    <div className={styles.cardContainer}>
      <img src={`https://robohash.org/${id}`} alt="robot" />
      <h2>{name}</h2>
      <p>{email}</p>
      <p>作者：{ctxValue.username}</p>
      <button onClick={() => add(id, name)}>加入购物车</button>
    </div>
  </>
}

export default withAddToCart(Robot)
