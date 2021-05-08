import axios from "axios";

//Change baseURL depending on REST API url on the server configuration
export default axios.create({
  baseURL: "http://localhost:8081/api",
  headers: {
    "Content-type": "application/json"
  }
});