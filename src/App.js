import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home} />
      {/* <Route path="/:user" component={User} /> */}
    </Router>
  );
};

export default App;
