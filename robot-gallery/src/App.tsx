import styles from './App.module.css'
import logo from './assets/images/logo.svg'

import Robot from "./components/Robot";
import ShoppingCart from "./components/ShoppingCart";
import React, { useEffect, useState } from "react";
import RobotDiscount from "./components/RobotDiscount";

// interface Props {
// }
//
// interface State {
//   robotGallery: any[]
// }

const App: React.FC = () => {

  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [robotGallery, setRobotGallery] = useState<any>([])

  useEffect(() => {
    document.title = `点击次数${count}`
  }, [count])

  useEffect(() => {
    setLoading(true)
    const fetchFn = async () => {
      const list = await (await fetch('https://jsonplaceholder.typicode.com/users')).json()
      setRobotGallery(list)
    }
    fetchFn().then(() => setLoading(false)).catch(err => setError(err.message))
  }, [])

  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} alt="logo" className={styles.appLogo} />
        <h1>机器人购物平台（非常中二）</h1>
      </div>
      <button onClick={() => setCount(count + 1)}>click</button>
      <span>count: {count}</span>
      <ShoppingCart />
      {error && <div>网站错误： {error}</div>}
      {
        !loading ?
          <ul className={styles.robotList}>
            {robotGallery.map((r, idx) =>
              idx % 2 === 0 ?
                <RobotDiscount id={r.id} name={r.name} email={r.email} key={r.id} /> :
                <Robot id={r.id} name={r.name} email={r.email} key={r.id} />)}
          </ul> :
          <h2>加载中</h2>
      }
    </div>
  )
}
/*
class App extends React.PureComponent<Props, State> {
  constructor (props) {
    super(props);
    this.state = {
      robotGallery: []
    }
  }

  async componentDidMount () {
    const robotGallery = await (await fetch('https://jsonplaceholder.typicode.com/users')).json()
    // setState是同步还是异步？
    // 异步更新，同步执行，setState()本身并非异步，但对state的处理机制给人一种异步的假象。state处理一般发生在生命周期变化的时候。
    this.setState({robotGallery})
  }

  render () {
    const {robotGallery} = this.state
    return (
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <img src={logo} alt="logo" className={styles.appLogo} />
          <h1>机器人购物平台（非常中二）</h1>
        </div>
        <ShoppingCart />
        <ul className={styles.robotList}>
          {robotGallery.map(r => <Robot id={r.id} name={r.name} email={r.email} key={r.id} />)}
        </ul>
      </div>
    );
  }
}
*/

export default App;
