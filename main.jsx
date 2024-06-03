import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './client/src/App.jsx';
import './index.css';
import { store } from './client/src/redux/store.js';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);