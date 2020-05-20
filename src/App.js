import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import User from "./components/User";

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
