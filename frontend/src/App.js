import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPassword from "./components/add-password.component";
import Password from "./components/password.component";
import PasswordsList from "./components/passwords-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/passwords" className="navbar-brand">
            Penguins
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/passwords"} className="nav-link">
                Passwords
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/passwords"]} component={PasswordsList} />
            <Route exact path="/add" component={AddPassword} />
            <Route path="/passwords/:id" component={Password} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;