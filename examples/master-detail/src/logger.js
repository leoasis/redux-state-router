export default function logger({getState}) {
  return next => action => {
    console.group(action.type);
    console.info('dispatching:', action);
    const result = next(action);
    console.log('next state:', getState());
    console.groupEnd();
    return result;
  }
}
