import React, { Component } from "react";
import PasswordDataService from "../services/password.service";
import { Link } from "react-router-dom";

export default class PasswordsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchWebsite = this.onChangeSearchWebsite.bind(this);
    this.retrievePasswords = this.retrievePasswords.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePassword = this.setActivePassword.bind(this);
    this.removeAllPasswords = this.removeAllPasswords.bind(this);
    this.searchWebsite = this.searchWebsite.bind(this);

    this.state = {
      passwords: [],
      currentPassword: null,
      currentIndex: -1,
      searchWebsite: ""
    };
  }

  componentDidMount() {
    this.retrievePasswords();
  }

  onChangeSearchWebsite(e) {
    const searchWebsite = e.target.value;

    this.setState({
      searchWebsite: searchWebsite
    });
  }

  retrievePasswords() {
    PasswordDataService.getAll()
      .then(response => {
        this.setState({
          passwords: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePasswords();
    this.setState({
      currentPassword: null,
      currentIndex: -1
    });
  }

  setActivePassword(password, index) {
    this.setState({
      currentPassword: password,
      currentIndex: index
    });
  }

  removeAllPasswords() {
    PasswordDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchWebsite() {
    this.setState({
      currentPassword: null,
      currentIndex: -1
    });

    PasswordDataService.findByWebsite(this.state.searchWebsite)
      .then(response => {
        this.setState({
          passwords: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchWebsite, passwords, currentPassword, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by website"
              value={searchWebsite}
              onChange={this.onChangeSearchWebsite}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchWebsite}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Passwords List</h4>

          <ul className="list-group">
            {passwords &&
              passwords.map((password, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePassword(password, index)}
                  key={index}
                >
                  {password.website}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllPasswords}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentPassword ? (
            <div>
              <h4>Password</h4>
              <div>
                <label>
                  <strong>Website:</strong>
                </label>{" "}
                {currentPassword.website}
              </div>
              <div>
                <label>
                  <strong>Username:</strong>
                </label>{" "}
                {currentPassword.username}
              </div>
              <div>
                <label>
                  <strong>Password:</strong>
                </label>{" "}
                {currentPassword.password}
              </div>

              <Link
                to={"/passwords/" + currentPassword.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Password...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}