import Router from 'routes';

const router = Router();
router.addRoute('/contacts/new', () => ({type: 'ADDING_NEW_CONTACT'}));
router.addRoute('/contacts/:id', params => ({type: 'SELECT_CONTACT', contactId: params.id}));
router.addRoute('/contacts', () => ({type: 'SHOW_CONTACTS'}));

export default function transitionTo(url) {
  const route = router.match(url);
  if (route) {
    return route.fn(route.params);
  }
}
