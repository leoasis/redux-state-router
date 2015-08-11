import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from '../logger';
import reducer from '../reducer';
import routerStore from 'redux-router/routerStore';
import stateToUrl from '../stateToUrl';
import transitionTo from '../transitionTo';

import ContactPage from './ContactPage';
import Location from 'redux-router/components/Location';

const store = routerStore(applyMiddleware(logger, thunk)(createStore))(reducer);

function onUrlChange(url) {
  const action = transitionTo(url);

  if (action) {
    store.dispatch(action);
  }
}

class App extends React.Component {
  render() {
    return <Location render={stateToUrl} onChange={onUrlChange}>
      {() => <ContactPage />}
    </Location>;
  }
}

export default class AppProvider extends React.Component {
  render() {
    return <Provider store={store}>
      {() => <App />}
    </Provider>
  }
}
