// import http from "../http-common";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

import axios from 'axios';
import authHeader from "./auth/auth-header";
const API_URL = 'http://localhost:8080/api/admin/operations'; // Remplace avec l'URL correcte 

class OperationDataService {
  getAll() {
    // return http.get("/operations");
    return axios.get(API_URL,{ headers: authHeader() });
  }

  getOperationsByCodeCompte(codeCompte, page = 0) {
    // Assuming your API supports pagination with a page query parameter
    // return http.get(`/operations/compte/${codeCompte}/operations?page=${page}`);
    return axios.get(API_URL+`/compte/${codeCompte}/operations?page=${page}`,{ headers: authHeader() });
  }

  get(id) {
    // return http.get(`/operations/${id}`);
    return axios.get(API_URL+`/${id}`,{ headers: authHeader() });
  }

  create(data) {
    // return http.post("/operations/saveOperation", data);
    return axios.post(API_URL+"/saveOperation", data,{ headers: authHeader() });
  }
  update(id, data) {
    return axios.put(API_URL+`/${id}`, data,{ headers: authHeader() });
  }

  delete(id) {
    // return http.delete(`/operations/${id}`);
    return axios.delete(API_URL+`/${id}`,{ headers: authHeader() });
  }

  deleteAll() {
    // return http.delete(`/operations`);
    return axios.delete(API_URL,{ headers: authHeader() });
  }
exportExcel() {
  // return http.get(`/operations/export/excel`);
  return axios.get(API_URL+`/export/excel`,{ headers: authHeader() });
}
exportPdf() {
  // return http.get(`/operations/export/pdf`);
  return axios.get(API_URL+`/export/pdf`,{ headers: authHeader() });
}

exportcomptePdf(compteId) {
  ///export/compte/{compteId}/pdf
  // return http.get(`/operations/export/pdf`);
  return axios.get(API_URL+`/export/compte/${compteId}/pdf`,{ headers: authHeader() });
}
  // findByTitle(title) {
  //   return http.get(`/operations?title=${title}`);
  // }
}
const operationDataService = new OperationDataService();

export default  operationDataService;