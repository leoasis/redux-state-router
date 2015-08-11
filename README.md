# Rationale

Most routers out there implement the routing mechanism to decide which view to render. But we know that with technologies like React, the state is what dictates what to render.

Also, with a unidirectional data flow like `redux`, we can allow to go back and forth our state via steps, which are triggered via actions.

With all this into account, we can build a router that just renders the url with a function that only depends on the state, and that emit changes whenever the url changes from outside. Thus, we can have the url be one more component in our tree rendered with React:

```js
<Location render={renderUrlFromState} onChange={transitionToUrl} />
```

## Url as a function of the state

A Url in an app is a representation of the state. As such, it can be written as a function of the state, just like with any other UI component.

```
url = renderUrl(state)
```

We can define a `renderUrl` function that whenever the state changes, gets called, and returns the app url at that particular state. Then we can grab that result and set it as the location in our browser, using the history API.

With this approach, you can now model your entire render tree as a function of the state, and decide which component to render based on that state, and nothing else. This is unlike other router approaches that determine what to render depending on the url.

Modeling the urls as a byproduct of the state gives us all the benefits of still having a single source of truth in our app. Time travel, interaction serialization, and all that goodness. So any manipulation to the state will recreate exactly the same UI and same url.

So now, by representing the urls as a function of the state, we have solved the first problem, but in the world of the web we need links, and we interact with urls in the address bar.

## Links

Links need to point to a specific url, so that the html can be crawlable, accessible and all the stuff that the web expects.

But with this approach, we don't need to manually specify the url for the link, since, as we said, the url can be obtained from the state.

How can we avoid setting the url to a link?

By just specifying a callback on the Link when it's followed (via a click for example), and that callback dispatching some action to our app that will trigger a state change, we can call that callback in a fake context to simulate the next step after that action is executed, in order to get that next state and run the `renderUrl` function with that.

If the callback has no side-effects, that is, it simply calls an action, and makes no calls to the database, we can safely do that simulation and get the url for the link.

```js
<Link onFollow={() => dispatch({type: 'SELECT_CONTACT', contactId: 1})}>
  {this.props.contact.name}
</Link>
```

## Initial route and history

Now coming from the outside, whenever a route is triggered, either via a click to the previous or next buttons in the browser, or via a direct input of a url, we need to dispatch a change to the state to get to that state.

For that we can just use any route matching library that we know, and define which action to return based on the particular url. We then dispatch that action returned and then the app will render based on the state after that action, rendering the url as well (which should be the same as the one that triggered the action).

```js
import Router from 'routes';

const router = Router();
router.addRoute('/contacts/new', () => ({type: 'ADDING_NEW_CONTACT'}));
router.addRoute('/contacts/:id', params => ({type: 'SELECT_CONTACT', contactId: params.id}));
router.addRoute('/contacts', () => ({type: 'SHOW_CONTACTS'}));
...

function transitionTo(url) {
  const route = router.match(url);
  return route.fn(route.params);
}

<Location render={renderUrl} onChange={url => dispatch(transitionTo(url))} />
```
