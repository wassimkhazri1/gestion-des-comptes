import http from "../http-common";
import authHeader from "./auth/auth-header";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

class TutorialDataService {
  getAll() {
    return http.get("/admin/tutorials",{ headers: authHeader() });
  }

  get(id) {
    return http.get(`/admin/tutorials/${id}`,{ headers: authHeader() });
  }

  create(data) {
    return http.post("/admin/tutorials", data,{ headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/admin/tutorials/${id}`, data,{ headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/admin/tutorials/${id}`,{ headers: authHeader() });
  }

  deleteAll() {
    return http.delete(`/admin/tutorials`,{ headers: authHeader() });
  }

  findByTitle(title) {
    return http.get(`/admin/tutorials?title=${title}`,{ headers: authHeader() });
  }
}
const tutorialDataService = new TutorialDataService();
export default tutorialDataService;