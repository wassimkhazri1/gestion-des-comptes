import React, { useState } from 'react';
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/dash/Header";
import axios from 'axios';
import authHeader from "../../services/auth/auth-header";
const API_URL ="http://localhost:8080/api/admin/clients";

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
const AddClient = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const [clientDTO, setClientDTO] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    cartnational: '',
    adresse: '',
    profession: '',
    naissanceDate: '',
    photo: null, // Photo à uploader
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientDTO({
      ...clientDTO,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setClientDTO({
        ...clientDTO,
        photo: reader.result.split(',')[1], // Enlever le préfixe de l'encodage base64
      });
    };
    
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, clientDTO, { headers: authHeader() });
      console.log('Client created:', response.data);
      // Optionnel: Réinitialiser le formulaire après la soumission
      setClientDTO({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        cartnational: '',
        adresse: '',
        profession: '',
        naissanceDate: '',
        photo: null,
      });
    } catch (error) {
      console.error('Erreur lors de la création du client:', error);
    }
  };


  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        // onSubmit={handleFormSubmit}
        onSubmit={handleFormSubmit}
        // initialValues={initialValues} 
       // initialValues={setClientDTO}
        validationSchema={checkoutSchema}
      >
        {({
        //  values,
          errors,
          touched,
          handleBlur,
        //  handleChange,
          // handleFileChange,
         // handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nom"
                onBlur={handleBlur}
                onChange={handleChange}
                value={clientDTO.nom}
                name="nom"
                error={!!touched.nom && !!errors.nom}
                helperText={touched.nom && errors.nom}
                sx={{ gridColumn: "span 2" }}
              />  
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Prénom"
                onBlur={handleBlur}
                onChange={handleChange}
                value={clientDTO.prenom}
                name="prenom"
                error={!!touched.prenom && !!errors.prenom}
                helperText={touched.prenom && errors.prenom}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={clientDTO.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="tel"
                label="Téléphone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={clientDTO.telephone}
                name="telephone"
                error={!!touched.telephone && !!errors.telephone}
                helperText={touched.telephone && errors.telephone}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Carte Nationale"
                onBlur={handleBlur}
                onChange={handleChange}
                value={clientDTO.cartnational}
                name="cartnational"
                error={!!touched.cartnational && !!errors.cartnational}
                helperText={touched.cartnational && errors.cartnational}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Adresse"
                onBlur={handleBlur}
                onChange={handleChange}
                value={clientDTO.adresse}
                name="adresse"
                error={!!touched.adresse && !!errors.adresse}
                helperText={touched.adresse && errors.adresse}
                sx={{ gridColumn: "span 2" }}
              />
                <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Profession"
                onBlur={handleBlur}
                onChange={handleChange}
                value={clientDTO.profession}
                name="profession"
                error={!!touched.profession && !!errors.profession}
                helperText={touched.profession && errors.profession}
                sx={{ gridColumn: "span 2" }}
              />
                <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date de Naissance"
                onBlur={handleBlur}
                onChange={handleChange}
                value={clientDTO.naissanceDate}
                name="naissanceDate"
                error={!!touched.naissanceDate && !!errors.naissanceDate}
                helperText={touched.naissanceDate && errors.naissanceDate}
                sx={{ gridColumn: "span 2" }}
                InputLabelProps={{
                  sx: {
                    transform: 'translateX(10px)' // Décale le label de 10px vers la droite
                  }
                }}
              />
                <TextField
                fullWidth
                variant="filled"
                type="file"
                //label="Photo"
                onBlur={handleBlur}
                onChange={handleFileChange}
                name="photo"
                accept="image/*"
                // error={!!touched.photo && !!errors.photo}
                // helperText={touched.photo && errors.photo}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Client
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  nom: yup.string().required("required"),
  prenom: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  telephone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
    cartnational: yup.string().required("required"),
    adresse: yup.string().required("required"),
    profession: yup.string().required("required"),
    naissanceDate: yup.string().required("required"),

  // nom: '',
  // prenom: '',
  // email: '',
  // telephone: '',
  // cartnational: '',
  // adresse: '',
  // profession: '',
  // naissanceDate: '',
  photo: null,
});
// const initialValues = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   contact: "",
//   address1: "",
//   address2: "",
// };

export default AddClient;

