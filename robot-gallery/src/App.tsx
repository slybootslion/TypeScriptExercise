import robots from './mockdata/robots.json'
import styles from './App.module.css'
import logo from './assets/images/logo.svg'

import ShoppingCart from "./components/ShoppingCart";
import Robot from './components/Robot'

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} alt="logo" className={styles.appLogo} />
        <h1>机器人购物平台（非常中二）</h1>
      </div>
      <ShoppingCart />
      <ul className={styles.robotList}>
        {robots.map(r => <Robot id={r.id} name={r.name} email={r.email} key={r.id} />)}
      </ul>
    </div>
  );
}

export default App;
