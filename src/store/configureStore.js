import rootReducer from '../reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';

const configureStore = () => {
const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(
  persistedReducer, composeWithDevTools(
  applyMiddleware(thunk))
  );

  return store
}

export default configureStore