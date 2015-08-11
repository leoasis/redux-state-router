import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from '../logger';
import reducer from '../reducer';
import routerStore from '../routerStore';

import ContactPage from './ContactPage';
import Route from './Route';

class App extends React.Component {
  render() {
    return <div>
      <Route />
      <ContactPage />
    </div>;
  }
}

const store = routerStore(applyMiddleware(logger, thunk)(createStore))(reducer);
export default class AppProvider extends React.Component {
  render() {
    return <Provider store={store}>
      {() => <App />}
    </Provider>
  }
}
