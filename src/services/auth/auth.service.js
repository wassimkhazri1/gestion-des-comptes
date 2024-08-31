import axios from "axios";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

 const API_URL = "http://localhost:8080/api/auth/";

// const register = (username, email, password,photo) => {

//   return axios.post(API_URL + "signup", {
//     username,
//     email,
//     password,
//     photo,
//   }
//   // , {
//   //   headers: {
//   //     "Content-Type": "multipart/form-data",
//   //   },
//   // }
// );
// };

const register = (username, email, password, photo) => {
  // Créez une instance de FormData
  const formData = new FormData();
  formData.append('username', username);
  formData.append('email', email);
  formData.append('password', password);
  
  // Ajoutez la photo si elle existe
  if (photo) {
    formData.append('photo', photo);
  }

  // Envoyez la requête POST
  return axios.post(API_URL + "signup", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


const login = async (username, password) => {
  const response = await axios
    .post(API_URL + "signin", {
      username,
      password,
    });
    // j'ai remplacé accessToken par token
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
  sessionStorage.removeItem('user');


};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;