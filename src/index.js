import 'babel-polyfill';
import pdfMake from 'script-loader!./scripts/pdfmake.min';

import React from 'react';
import { render } from 'react-dom';
import Main from './containers/Main';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const store = createStore(reducer, applyMiddleware(thunk));

const reactRoot = document.getElementsByClassName('jmt_dotmatrixifier')[0];

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  reactRoot
);
