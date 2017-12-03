import {CoffeeApp} from "./coffee-app/coffee-app";
import React from "react";
import ReactDOM from "react-dom";

window.React = React;

ReactDOM.render((
    <CoffeeApp/>
), document.getElementById("app-container"));
