import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBarContainer from './navigation/navbar-container';
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Icons from "./helpers/icons";
import Store from "./pages/store";
import NoMatch from "./pages/no-match";


export default class App extends Component {
  constructor(props) {
    super(props);
    Icons();
  }
  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <NavBarContainer/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/store" component={Store}/>
              <Route path="/about" component={About}/>
              <Route path="/contact" component={Contact}/>
              <Route component={NoMatch} />
            </Switch>
          </div>

        </Router>
          
      </div>
    );
  }
}
