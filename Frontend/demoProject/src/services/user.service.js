import axios from "axios";
import config from "../config/config";

const axiosInstance = axios.create({
  withCredentials: true,
});

class AuthenticationService {
  registerUser(data) {
    return axiosInstance.post(`${config.serverUrl}/user/register`, data);
  }
  loginUser(data) {
    return axiosInstance.post(`${config.serverUrl}/user/login`, data);
  }
  fetchUserById(id) {
    return axiosInstance.get(`${config.serverUrl}/user/${id}`);
  }
  fetchUserDetails() {
    return axiosInstance.get(`${config.serverUrl}/user/`);
  }
  
}

const authenticationService = new AuthenticationService();
export default authenticationService;
