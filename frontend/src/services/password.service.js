import http from "../http-common";

class PasswordDataService {
  getAll() {
    return http.get("/passwords");
  }

  get(id) {
    return http.get(`/passwords/${id}`);
  }

  create(data) {
    return http.post("/passwords", data);
  }

  update(id, data) {
    return http.put(`/passwords/${id}`, data);
  }

  delete(id) {
    return http.delete(`/passwords/${id}`);
  }

  deleteAll() {
    return http.delete(`/passwords`);
  }

  findByWebsite(website) {
    return http.get(`/passwords?website=${website}`);
  }

  findByUsername(username) {
    return http.get(`/passwords?username=${username}`);
  }
}

export default new PasswordDataService();