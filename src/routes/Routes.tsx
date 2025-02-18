import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UsersList from "../components/pages/UserList/UserList";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={UsersList} />
      </Switch>
    </Router>
  );
};

export default Routes;
