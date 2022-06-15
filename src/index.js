import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  HashRouter,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import GlobalStyle from "./styles/globalStyles.js";
import "./Custom.css";

import Home from "./pages/Home.js";
import ChatRoom from "./pages/ChatRoom.js";
import NotFound from "./pages/NotFound.js";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <HashRouter basename="/">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/chat-room" component={ChatRoom} />
        <Route path="*" component={NotFound} />
      </Switch>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
