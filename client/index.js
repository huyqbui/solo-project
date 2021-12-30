// entry point for application

import React from "react";
import { render } from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { Provider } from 'react-redux';
import store from './store.js';

render(

    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);