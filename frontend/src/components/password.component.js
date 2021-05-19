import React, { Component } from "react";
import PasswordDataService from "../services/password.service";
import AuthService from "../services/auth.service";

export default class Password extends Component {
  constructor(props) {
    super(props);
    this.onChangeWebsite = this.onChangeWebsite.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.getPassword = this.getPassword.bind(this);

    this.updatePassword = this.updatePassword.bind(this);
    this.deletePassword = this.deletePassword.bind(this);

    this.state = {
      currentPassword: {
        id: null,
        website: "",
        username: "",
        password: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getPassword(this.props.match.params.id);
  }

  onChangeWebsite(e) {
    const website = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPassword: {
          ...prevState.currentPassword,
          website: website
        }
      };
    });
  }

  onChangeUsername(e) {
    const username = e.target.value;
    
    this.setState(prevState => ({
      currentPassword: {
        ...prevState.currentPassword,
        username: username
      }
    }));
  }

  onChangePassword(e) {
    const password = e.target.value;
    
    this.setState(prevState => ({
      currentPassword: {
        ...prevState.currentPassword,
        password: password
      }
    }));
  }


  getPassword(id) {
    PasswordDataService.get(id)
      .then(response => {
        if(response.data.message == "Unauthorized!"){
          AuthService.logout();
        }
        else{
          this.setState({
            currentPassword: response.data
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePassword() {
    PasswordDataService.update(
      this.state.currentPassword._id,
      this.state.currentPassword
    )
      .then(response => {
        if(response.data.message == "Unauthorized!"){
          AuthService.logout();
        }
        else{
          this.setState({
            message: "The password was updated successfully!"
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletePassword() {
    PasswordDataService.delete(this.state.currentPassword._id)
      .then(response => {
        if(response.data.message == "Unauthorized!"){
          AuthService.logout();
        }
        else{
          this.props.history.push('/passwords')
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentPassword } = this.state;

    return (
      <div>
        {currentPassword ? (
          <div className="edit-form">
            <h4>Password</h4>
            <form>
              <div className="form-group">
                <label htmlFor="website">website</label>
                <input
                  type="text"
                  className="form-control"
                  id="website"
                  value={currentPassword.website}
                  onChange={this.onChangeWebsite}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={currentPassword.username}
                  onChange={this.onChangeUsername}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">password</label>
                <input
                  type="password"//change to text to view password
                  className="form-control"
                  id="password"
                  value={currentPassword.password}
                  onChange={this.onChangePassword}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletePassword}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatePassword}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Password...</p>
          </div>
        )}
      </div>
    );
  }
}