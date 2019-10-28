import React from "react";
import { render } from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "./styles/index.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';
import { persistStore } from "redux-persist";
import configureStore from "./configureStore";
import Root from "./components/common/Root";

const store = configureStore();
const persistor = persistStore(store);

render(
  <Root store={store} persistor={persistor} />,
  document.getElementById("root")
);

serviceWorker.unregister();
