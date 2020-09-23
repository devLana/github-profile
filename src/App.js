import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import "./styles/main.scss";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1);
  };

  return (
    <Router>
      <Switch>
        <Route
          path="/:user"
          render={props =>
            refresh ? null : <User {...props} handleRefresh={handleRefresh} />
          }
        />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
