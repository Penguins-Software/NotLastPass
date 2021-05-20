import http from "../http-common";

class PasswordDataService {
  getAll() {
    return http.get("/passwords");
  }

  getAllEnc() {
    return http.get("/passwords/Enc");
  }

  get(id) {
    return http.get(`/passwords/${id}`);
  }

  getEnc(id) {
    return http.get(`/passwords/Enc/${id}`);
  }

  create(data) {
    return http.post("/passwords", data);
  }

  createEnc(data) {
    return http.post("/passwords/Enc", data);
  }

  update(id, data) {
    return http.put(`/passwords/${id}`, data);
  }

  updateEnc(id, data) {
    return http.put(`/passwords/Enc/${id}`, data);
  }

  delete(id) {
    return http.delete(`/passwords/${id}`);
  }

  deleteEnc(id) {
    return http.delete(`/passwords/Enc/${id}`);
  }

  deleteAll() {
    return http.delete(`/passwords`);
  }

  deleteAllEnc() {
    return http.delete(`/passwords/Enc`);
  }

  findByWebsite(website) {
    return http.get(`/passwords?website=${website}`);
  }

  findByUsername(username) {
    return http.get(`/passwords?username=${username}`);
  }
}

export default new PasswordDataService();