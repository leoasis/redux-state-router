import React from 'react';

export default class ContactForm extends React.Component {
  render() {
    return <form onSubmit={this.handleSubmit.bind(this)}>
      <input ref="name" type="text" placeholder="Name" />
      <input ref="email" type="text" placeholder="Email" />
      <button type="submit">Save</button>
    </form>;
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.onSave({
      name: React.findDOMNode(this.refs.name).value,
      email: React.findDOMNode(this.refs.email).value,
    });
  }
}
