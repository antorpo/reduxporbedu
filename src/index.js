import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "./components/styles/iconos.css";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import reducers from "./reducers";
import reduxThunk from "redux-thunk";

const store = createStore(
  reducers, // Todos los reducers
  {}, // Estado inicial
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
