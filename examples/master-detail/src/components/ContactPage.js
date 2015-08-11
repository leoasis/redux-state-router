import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actionCreators';

import Link from './Link';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import ContactDetails from './ContactDetails';

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
