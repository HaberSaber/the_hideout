import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// Import Components here
import LandingPage from "./LandingPage";
import Example from "./Example";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/example/:exampleID" component={Example} />
      {/* component={NotFound} will 404 when there is no path match */}
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
