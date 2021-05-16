import axios from "axios";
import AuthService from "./services/auth.service";

const user = AuthService.getCurrentUser();
//Change baseURL depending on REST API url on the server configuration

export default axios.create(
  {
  baseURL: "http://localhost:8081/api",
  headers: {
    "Content-type": "application/json",
    "x-access-token": user?.accessToken
  }
});