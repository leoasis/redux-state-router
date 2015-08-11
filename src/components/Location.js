import React from 'react';
import { connect } from 'react-redux';
import { createHistory } from 'history';


class Route extends React.Component {
  static childContextTypes = {
    renderUrl: React.PropTypes.func
  };

  render() {
    return this.props.children();
  }

  getChildContext() {
    return { renderUrl: this.props.render };
  }

  componentDidMount() {
    this.history = createHistory();
    this.unlisten = this.history.listen(location => {
      this.currentPathname = location.pathname;

      if (this.silent) {
        this.silent = false;
        return;
      }

      this.props.onChange(location.pathname);
    });

    this.silent = true;
    this.history.replaceState(null, this.props.url);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  componentDidUpdate() {
    const { url } = this.props;
    if (this.currentPathname === url) {
      return;
    }

    this.silent = true;
    this.history.pushState(null, url);
  }
}

function mergeProps(state, actionCreators, props) {
  return {
    ...props,
    url: props.render(state)
  };
}

const RouteContainer = connect(s => s, {}, mergeProps)(Route);

export default RouteContainer;
