import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import "./styles/main.scss";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:user" component={User} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
