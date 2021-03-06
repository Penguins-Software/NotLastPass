import React, { Component } from "react";
import PasswordDataService from "../services/password.service";
import CryptoService from "../services/crypto.service";

export default class AddPassword extends Component {
  constructor(props) {
    super(props);
    this.onChangeWebsite = this.onChangeWebsite.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.savePassword = this.savePassword.bind(this);
    this.newPassword = this.newPassword.bind(this);
    this.generatePassword = this.generatePassword.bind(this);
    this.onChangePasswordLength = this.onChangePasswordLength.bind(this);

    this.state = {
      id: null,
      website: "",
      username: "",
      password: "",
      passwordLength: 10,
      submitted: false
    };
  }

  onChangeWebsite(e) {
    this.setState({
      website: e.target.value
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangePasswordLength(e){
      const passwordLength = e.target.value;
  
      this.setState({
        passwordLength: passwordLength
      });
  }

  generatePassword(){
    const newPassword = CryptoService.generatePassword(this.state.passwordLength);
    this.setState({
      password: newPassword
    });
  }

  savePassword() {
    var data = {
      website: this.state.website,
      username: this.state.username,
      password: this.state.password
    };

    const encData = CryptoService.encryptData(data);

    PasswordDataService.createEnc({encrypted: encData}).then(
      this.setState({
        submitted: true
      })).catch(e => {
      console.log(e);
    });
  }

  newPassword() {
    this.setState({
      id: null,
      website: "",
      username: "",
      password: "",

      submitted: false
    });
  }

  render() {
    const {passwordLength} = this.state;
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newPassword}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="website">website</label>
              <input
                type="text"
                className="form-control"
                id="website"
                required
                value={this.state.website}
                onChange={this.onChangeWebsite}
                name="website"
              />
            </div>

            <div className="form-group">
              <label htmlFor="username">username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                required
                value={this.state.username}
                onChange={this.onChangeUsername}
                name="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">password</label>
              <input
                type="text"
                className="form-control"
                id="password"
                required
                value={this.state.password}
                onChange={this.onChangePassword}
                name="password"
              />
              <div>
              <div className="row">
                <div className="input-group-append col-md-8">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.generatePassword}
                  >
                    Generate Password
                  </button>
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="10"
                    value={passwordLength}
                    onChange={this.onChangePasswordLength}
                  />
                </div>
              </div>
              </div>
            </div>

            <button onClick={this.savePassword} className="btn btn-success">
                Submit
              </button>
          </div>
        )}
      </div>
    );
  }
}