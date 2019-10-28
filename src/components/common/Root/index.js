import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import {Provider} from 'react-redux'
import App from './App'

const Root = ({store, persistor}) => (
<Provider store={store}>
<Router >
  <PersistGate loading={null} persistor={persistor}>
      <Route path="/" component={App}/>
  </PersistGate>
</Router>
</Provider>
)

export default Root