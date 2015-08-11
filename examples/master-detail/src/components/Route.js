import React from 'react';
import { connect } from 'react-redux';
import { createHistory } from 'history';
import Router from 'routes';


class Route extends React.Component {
  render() {
    return null;
  }

  componentDidMount() {
    this.history = createHistory();
    this.unlisten = this.history.listen(location => {
      this.currentPathname = location.pathname;

      if (this.silent) {
        this.silent = false;
        return;
      }

      const action = transitionTo(location.pathname);
      if (action) {
        this.props.dispatch(action);
      }
    });

    this.silent = true;
    this.history.replaceState(null, this.props.url);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  componentDidUpdate() {
    if (this.currentPathname === this.props.url) {
      return;
    }

    this.silent = true;
    this.history.pushState(null, this.props.url);
  }
}

const router = Router();
router.addRoute('/contacts/new', () => ({type: 'ADDING_NEW_CONTACT'}));
router.addRoute('/contacts/:id', params => ({type: 'SELECT_CONTACT', contactId: params.id}));
router.addRoute('/contacts', () => ({type: 'SHOW_CONTACTS'}));

function transitionTo(url) {
  const route = router.match(url);
  if (route) {
    return route.fn(route.params);
  }
}

export function stateToUrl(state) {
  let url;
  if (state.addingNewContact) {
    url = '/contacts/new';
  } else if (state.currentContactId) {
    url = `/contacts/${state.currentContactId}`;
  } else {
    url = '/contacts';
  }
  return {url};
}

const RouteContainer = connect(stateToUrl)(Route);

export default RouteContainer;
