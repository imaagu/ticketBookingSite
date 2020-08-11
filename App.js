import React, { Component } from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
//import NavBar from "./components/navBar";
import Movies from "./components/movies";
import BookMovie from "./components/bookMovie";
import Seat from "./components/bookSeat";
import Payment from "./components/payment";
//import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/bookMovie/:location/:id?/buyTicket/:i?/:j?/:z?"
            component={Seat}
          />
          <Route path="/bookMovie" component={BookMovie} />
          <Route path="/home" component={Movies} />
          <Route path="/payment" component={Payment} />
          <Redirect to="/home/NCR" />
        </Switch>
      </div>
    );
  }
}

export default App;
