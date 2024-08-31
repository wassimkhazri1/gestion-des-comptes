 import http from "../http-common";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

import axios from 'axios';
import authHeader from "./auth/auth-header";
const API_URL = 'http://localhost:8080/api/admin/comptes'; // Remplace avec l'URL correcte 
class CompteDataService {
//getAll,
  getAll() {
    // return http.get("/admin/comptes",{ headers: authHeader() });
    return axios.get(API_URL,{ headers: authHeader() });
  }
  getAllComptes() {
    // return http.get("/admin/comptes",{ headers: authHeader() });
    return axios.get(API_URL,{ headers: authHeader() });
  }

  get(codeCompte) {
    // return http.get(`/admin/comptes/${codeCompte}`,{ headers: authHeader() });
    return axios.get(API_URL+`/${codeCompte}`,{ headers: authHeader() });
  }

  create(data) {
    // return http.post("/admin/comptes/addCompte", data,{ headers: authHeader() });
    return axios.post(API_URL+"/addCompte", data,{ headers: authHeader() });
  }

  update(id, data) {
    // return http.put(`/admin/comptes/${id}`, data,{ headers: authHeader() });
    return axios.put(API_URL+`/comptes/${id}`, data,{ headers: authHeader() });
  }

  delete(id) {
    // return http.delete(`/admin/comptes/${id}`,{ headers: authHeader() });
    return axios.delete(API_URL+`/${id}`,{ headers: authHeader() });
  }

  deleteAll() {
    // return http.delete(`/admin/comptes`,{ headers: authHeader() });
    return http.delete(API_URL,{ headers: authHeader() });
  }

  // findByTitle(title) {
  //   return http.get(`/comptes?title=${title}`);
  // }
}
const compteDataService = new CompteDataService();

export default compteDataService;