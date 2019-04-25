import React from "react";
import { render } from "react-dom";
import Router from "./components/Router";
import 'bootstrap/dist/css/bootstrap.css';

// Renders router in the element with the id="main" in /public/index.html
render(<Router />, document.querySelector("#main"));
