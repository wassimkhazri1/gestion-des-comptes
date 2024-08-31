//import http from "../http-common";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import axios from 'axios';
import authHeader from "./auth/auth-header";
const API_URL = 'http://localhost:8080/api/admin/clients'; // Remplace avec l'URL correcte 
class ClientDataService {
  getAll() {
     return axios.get(API_URL,{ headers: authHeader() });
    //return http.get("/clients", { headers: authHeader() });
  }
getClientsByCodeCompte(codeCompte){
      // Remplace cette URL par celle correspondant à ton API pour obtenir les clients par compte
   //   return http.get(`/admin/clients/compte/${codeCompte}/clients`);
   return axios.get(API_URL + `/compte/${codeCompte}/clients`,{ headers: authHeader() });
}

  get(id) {
   // return http.get(`/admin/clients/${id}`);
   return axios.get(API_URL + `/${id}`,{ headers: authHeader() });
  }

  create(data) {
    const formData = new FormData();

    // Ajoutez les champs du client à formData
    formData.append("prenom", data.prenom);
    formData.append("nom", data.nom);
    formData.append("email", data.email);
    formData.append("telephone", data.telephone);
    formData.append("cartnational", data.cartnational);
    formData.append("adresse", data.adresse);
    formData.append("profession", data.profession);
    formData.append("naissanceDate", data.naissanceDate);
   // formData.append("photoFile",data.photo);
    // Ajoutez le fichier (s'il y en a un) à formData
    if (data.file) {
   //   formData.append("file", data.file);
   formData.append("photoFile",data.photo);
    }
    console.log(formData);
   // return http.post("/clients", formData, {
    return axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  update(id, data) {
   // return http.put(`/admin/clients/${id}`, data);
   return axios.put(API_URL+`/${id}`, data,{ headers: authHeader() });
    
  }

  delete(id) {
    //return http.delete(`/admin/clients/${id}`);
    return axios.delete(API_URL+`/${id}`,{ headers: authHeader() });
  }

  deleteAll() {
    // return http.delete(`/admin/clients`);
    return axios.delete(API_URL,{ headers: authHeader() });
  }

  findByPrenom(prenom) {
    // return http.get(`/admin/clients?prenom=${prenom}`);
    return axios.get(API_URL+`?prenom=${prenom}`);
  }
}

const clientDataService = new ClientDataService();
export default clientDataService;


