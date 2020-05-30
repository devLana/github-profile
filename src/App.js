import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import User from "./components/User";
import './styles/main.scss';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:user" component={User} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
