import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from '../logger';
import reducer from '../reducer';

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

function watchRoutesStore(createStore) {
  return (reducer, initialState) => {
    const store = createStore(reducer, initialState);
    let linking = false;
    let linkingState = null;

    function getState() {
      return linking ? linkingState : store.getState();
    }

    function dispatch(action) {
      switch(action.type) {
        case 'ROUTE_LINK_START':
          linking = true;
          break;
        case 'ROUTE_LINK_END':
          linking = false;
          break;
        default:
          if (linking) {
            linkingState = store.getReducer()(getState(), action);
          } else {
            return store.dispatch(action);
          }
          break;
      }
      return action;
    }

    return {
      ...store,
      dispatch,
      getState
    };
  }
}

const store = watchRoutesStore(applyMiddleware(logger, thunk)(createStore))(reducer);
export default class AppProvider extends React.Component {
  render() {
    return <Provider store={store}>
      {() => <App />}
    </Provider>
  }
}
