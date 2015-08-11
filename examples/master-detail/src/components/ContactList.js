import React from 'react';
import Link from './Link';

export default class ContactList extends React.Component {
  render() {
    return <ul>
      {this.props.contacts.map(contact =>
        <li key={contact.id}>
          <ContactRow contact={contact} onSelect={this.props.onSelect} />
        </li>
      )}
    </ul>;
  }
}

class ContactRow extends React.Component {
  render() {
    const {contact} = this.props;
    return <Link onFollow={this.handleFollow.bind(this)}>
      {contact.name}{contact.saving ? ' (saving)...' : null}
    </Link>;
  }

  handleFollow() {
    this.props.onSelect(this.props.contact);
  }
}
