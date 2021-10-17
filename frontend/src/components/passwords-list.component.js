import React, { Component } from "react";
import PasswordDataService from "../services/password.service";
import { Link } from "react-router-dom";

import CardItem from './card.component';
import {CardDeck} from 'react-bootstrap';

import AuthService from "../services/auth.service";
import CryptoService from "../services/crypto.service";

export default class PasswordsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchWebsite = this.onChangeSearchWebsite.bind(this);
    this.retrievePasswords = this.retrievePasswords.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePassword = this.setActivePassword.bind(this);
    this.removeAllPasswords = this.removeAllPasswords.bind(this);
    this.searchWebsite = this.searchWebsite.bind(this);

    this.theMeaningOfLive = 42;

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
    PasswordDataService.getAllEnc()
      .then(response => {
        if(response.data.message == "Unauthorized!"){
          AuthService.logout();
        }
        else{
          const tempPasswordList = []
          response.data.forEach(passEncObject => {
            const password = CryptoService.decryptData(passEncObject.encrypted);
            password["_id"] = passEncObject._id;
            tempPasswordList.push(password);
          });

          this.setState({
            passwords: tempPasswordList
          });
        }
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

  //Currently not used
  removeAllPasswords() {
    PasswordDataService.deleteAllEnc()
      .then(response => {
        if(response.data.message == "Unauthorized!"){
          AuthService.logout();
        }else{
          this.refreshList();
        }
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

    //if search text is empty, refresh the list.
    if(this.state.searchWebsite == '' || this.state.searchWebsite == null){
      this.refreshList()
    }
    else{
      //filter data where website contains the searchWebsite string
      const filteredData = this.state.passwords.filter((data) => {
        return data.website.search(this.state.searchWebsite) != -1;
      }); 

      //Set filteredData as the main passwords list.
      this.setState({
        passwords:filteredData
      });
    }

  }

  render() {
    const { searchWebsite, passwords, currentPassword, currentIndex } = this.state;

    let cardList = passwords.map((card) => (
        <div>
                <Link
                    to={"/passwords/" + card._id}
                  >
                <CardItem
                  website={card.website}
                  username={card.username}
                  password={card.password}
                />
                </Link>
          </div>
      ) 
    );

    return (
      <div class="container">
        <div className="row">
          <div className=" col-md-12 input-group">
            <input
              type="text"
              className="form-control col-mb-4"
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
        <div className="row">
          <h4>Passwords List</h4>
        </div>

        <div className="row">
          <CardDeck>
                {cardList}
          </CardDeck>
        </div>
        
      </div>
    );
  }
}