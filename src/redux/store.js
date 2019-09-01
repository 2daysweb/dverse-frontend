
            import { createStore, applyMiddleware, compose } from 'redux'
            import thunk from 'redux-thunk'
            import rootReducer from './rootReducer';


            //this gives us access to the devtools for redux
            const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
            
            //this creates our store. This requires our reducer exported from our reducers file and all of the middleware that we're using. 
            //middleware is just fancy for something that interrupts a process in the middle of it's action
            const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

            export default store