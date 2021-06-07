import React from 'react';
import styles from './App.module.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { DetailPage, HomePage, RegisterPage, SignInPage } from './pages';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signin" component={SignInPage}></Route>
          <Route path="/register" component={RegisterPage}></Route>
          <Route path="/detail/:touristRouteId" component={DetailPage}></Route>
          <Route render={() => <div>404 not fount</div>}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
