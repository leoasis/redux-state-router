import React from 'react';
import { connect } from 'react-redux';
import { createHistory } from 'history';
import stateToUrl from '../stateToUrl';
import transitionTo from '../transitionTo';


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

const RouteContainer = connect(state => ({url: stateToUrl(state)}))(Route);

export default RouteContainer;
