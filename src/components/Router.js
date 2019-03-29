import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// Import Components here
import App from "./App";
import Example from "./Example";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/:exampleID" component={Example} />
      {/* component={NotFound} will 404 when there is no path match */}
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
