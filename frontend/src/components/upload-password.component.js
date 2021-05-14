import React, { Component } from "react";
import PasswordDataService from "../services/password.service";
import Papa from "papaparse";
import Password from "./password.component";

export default class UploadPassword extends Component {
    constructor(props) {
        super(props);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.importCSV = this.importCSV.bind(this);

        this.newUpload = this.newUpload.bind(this);
        this.updateData = this.updateData.bind(this);
    
        this.state = {
          file: null,
          uploaded: false
        };
      }

      newUpload(){
          this.setState({
            file: null,
            uploaded: false
          });
      }

      onChangeFile(e) {
        const fileToUpload = e.target.files[0];
        
    
        this.setState({
          file: fileToUpload
        });
      }
    
      importCSV(){
        const {file} = this.state;
        Papa.parse(file, {
          complete: this.updateData,
          header: true
        });
      }

      updateData(results){
        console.log(results.data);
        results.data.forEach(function (element, index) {
            var tempPassword = {
                website: element.url,
                username: element.username,
                password: element.password
            };

            PasswordDataService.create(JSON.stringify(tempPassword)).catch(e => {
                console.log(e);
              });
        });

        this.setState({
            uploaded: true
        });
      }


      render() {
            if(!this.state.uploaded){
                return(
                    <div>
                        <input type="file" name="file" accept=".csv,.json" onChange={this.onChangeFile}/>
                        <button onClick={this.importCSV}> Upload now!</button>
                    </div>
                );
            }
            else{
                return(
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newUpload}>
                        Upload
                        </button>
                    </div>
                );
            }
    }

}