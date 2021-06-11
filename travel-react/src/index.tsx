import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'antd/dist/antd.css';
import './i18n/config'
import { Provider } from 'react-redux'
import rootStore from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

import axios from 'axios'

axios.defaults.headers.lucode = '30b4da17-afcc-4090-9e63-48af76404a60'
// axios.defaults.baseURL = 'http://localhost:39200'
axios.defaults.baseURL = 'https://f.sketchmac.com'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootStore.store}>
      <PersistGate persistor={rootStore.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
