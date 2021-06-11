import React, { useEffect } from 'react';
import styles from './App.module.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { DetailPage, HomePage, RegisterPage, SignInPage, ShoppingCartPage } from './pages';
import { Redirect } from 'react-router-dom'
import { useSelector } from "./redux/hook"
import { useDispatch } from "react-redux";
import { getShoppingCart } from "./redux/shoppingCart/slice";
import { PlaceOrderPage } from "./pages/placeOrder";

const PrivateRoute = ({compoent, isAuthenticated, ...rest}) => {
  const routeComponent = props => {
    return isAuthenticated ?
      React.createElement(compoent, props) :
      <Redirect to={{pathname: '/signIn'}} />
  }
  return <Route render={routeComponent} {...rest} />
}

function App () {
  const token = useSelector(state => state.user.token)
  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      dispatch(getShoppingCart(token))
    }
  }, [token])

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signin" component={SignInPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/detail/:touristRouteId" component={DetailPage} />
          <PrivateRoute path="/shoppingCart"
                        compoent={ShoppingCartPage}
                        isAuthenticated={!!token} />
          <PrivateRoute path="/placeOrder"
                        compoent={PlaceOrderPage}
                        isAuthenticated={!!token} />
          <Route render={() => <div>404 not fount</div>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
