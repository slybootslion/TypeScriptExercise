import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'antd/dist/antd.css';
import './i18n/config'
import { Provider } from 'react-redux'
import store from './redux/store'

import axios from 'axios'
axios.defaults.headers.lucode = '30b4da17-afcc-4090-9e63-48af76404a60'
axios.defaults.baseURL = 'http://localhost:39200'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
