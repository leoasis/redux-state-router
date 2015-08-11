export default function routerStore(createStore) {
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
