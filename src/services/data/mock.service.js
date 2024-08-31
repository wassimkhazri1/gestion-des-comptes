//import http from "../http-common";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import axios from 'axios';
import authHeader from "../auth/auth-header";
const API_URL = 'http://localhost:8080/api/admin/comptes'; // Remplace avec l'URL correcte 
class MockDataService {
getSoldeByMonth(id) {
    // return http.get(`/admin/clients/${id}`);
    return axios.get(API_URL + `/solde-by-month?month=${id}`,{ headers: authHeader() });
   }

}

const mockDataService = new MockDataService();
export default mockDataService;