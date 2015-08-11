export default function stateToUrl(state) {
  if (state.addingNewContact) {
    return '/contacts/new';
  }

  if (state.currentContactId) {
    return `/contacts/${state.currentContactId}`;
  }

  return '/contacts';
}
