import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actionCreators';
import Link from './Link';

class ContactList extends React.Component {
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

class ContactDetails extends React.Component {
  render() {
    const {contact} = this.props;
    return <div>
      <h1>{contact.name}</h1>
      <h2>{contact.email}</h2>
      <p>{contact.description}</p>
    </div>;
  }
}
class ContactForm extends React.Component {
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

class ContactPage extends React.Component {
  render() {
    return <div>
      <ContactList contacts={this.props.contacts} onSelect={this.props.onSelectContact} />
      <Link onFollow={this.handleAddNewContact.bind(this)}>
        Add a new contact
      </Link>
      {this.props.addingNewContact && <ContactForm onSave={this.props.onSaveContact} />}
      {this.props.currentContact && <ContactDetails contact={this.props.currentContact} />}
    </div>
  }

  handleAddNewContact() {
    this.props.onAddNewContact();
  }
}

function stateToProps(state) {
  return {
    contacts: Object.keys(state.contacts).map(contactId => state.contacts[contactId]),
    currentContact: state.currentContactId ? state.contacts[state.currentContactId] : null,
    addingNewContact: state.addingNewContact,
  };
}

const actionCreatorsProps = {
  onSelectContact: actionCreators.selectContact,
  onAddNewContact: actionCreators.addNewContact,
  onSaveContact: actionCreators.saveContact
};

const ContactPageContainer = connect(stateToProps, actionCreatorsProps)(ContactPage);

export default ContactPageContainer;
