const initialState = {
  contacts: {
    1: {id: 1, name: 'John Lennon'},
    2: {id: 2, name: 'Paul Mc Cartney'},
    3: {id: 3, name: 'George Harrison'},
    4: {id: 4, name: 'Ringo Starr'},
  },
  nextId: 5,
  currentContactId: null,
  addingNewContact: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_CONTACTS':
      return {...state, currentContactId: null, addingNewContact: false};
    case 'SELECT_CONTACT':
      return {...state, currentContactId: action.contactId, addingNewContact: false};
    case 'ADDING_NEW_CONTACT':
      return {...state, currentContactId: null, addingNewContact: true};
    case 'SAVE_CONTACT':
      return {
        ...state,
        contacts: {
          ...state.contacts,
          [action.contact.id]: {
            ...action.contact,
            saving: true
          }
        },
        addingNewContact: false,
        currentContactId: action.contact.id,
        nextId: state.nextId + 1
      };
    case 'SAVE_CONTACT_SUCCESS':
      return {
        ...state,
        contacts: {
          ...state.contacts,
          [action.contactId]: {
            ...state.contacts[action.contactId],
            saving: false
          }
        }
      };
    default:
      return state;
  }
}
