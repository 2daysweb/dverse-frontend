import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
 
export const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
));


// export default function configureStore(initialState){
//   return createStore(
//     rootReducer,
//     initialState,
//     compose(
//       applyMiddleware(thunk),
//       window.devToolsExtension ? window.devToolsExtension() : f => f
//     )
//   );
// }