import React from 'react';
export default class Link extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object,
    renderUrl: React.PropTypes.func,
  };

  render() {
    return <a href={this.calculateUrl()} onClick={this.handleClick.bind(this)}>
      {this.props.children}
    </a>;
  }

  handleClick(ev) {
    ev.preventDefault();
    this.props.onFollow();
  }

  calculateUrl() {
    const {store} = this.context;
    store.dispatch({type: 'ROUTE_LINK_START'});
    this.props.onFollow();
    const nextState = store.getState();
    store.dispatch({type: 'ROUTE_LINK_END'});
    return this.context.renderUrl(nextState);
  }
}
