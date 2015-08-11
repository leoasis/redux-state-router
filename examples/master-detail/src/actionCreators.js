export function selectContact(contact) {
  return {type: 'SELECT_CONTACT', contactId: contact.id};
}

export function addNewContact() {
  return {type: 'ADDING_NEW_CONTACT'};
}

export function saveContact(contact) {
  return (dispatch, getState) => {
    const nextId = getState().nextId;
    dispatch({type: 'SAVE_CONTACT', contact: {...contact, id: nextId}});
    setTimeout(() => {
      dispatch({type: 'SAVE_CONTACT_SUCCESS', contactId: nextId});
    }, 1000);
  }
}
