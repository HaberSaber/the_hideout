import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// Import Components here
import LandingPage from "./LandingPage";
import Home from "./Home";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      {/* <Route path="/example/:exampleID" component={Example} /> */}
      {/* component={NotFound} will 404 when there is no path match */}
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
