import React from 'react';

export default class ContactDetails extends React.Component {
  render() {
    const {contact} = this.props;
    return <div>
      <h1>{contact.name}</h1>
      <h2>{contact.email}</h2>
      <p>{contact.description}</p>
    </div>;
  }
}
