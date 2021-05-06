import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Talent from "./Talent";
import Fan from "./Fan";

export const Views = () => {
  return (
    <Switch>
      <Route>
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/talent" />;
          }}
        />
        <Route exact path="/talent" component={Talent} />
        <Route exact path="/fan" component={Fan} />
      </Route>
    </Switch>
  );
};

export default Views;
