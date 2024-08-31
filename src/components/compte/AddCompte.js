import React, { useState } from 'react';
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import axios from 'axios';
const API_URL ="http://localhost:8080/api/comptes";
const AddCompte = () => {
  const [compte, setCompte] = useState({
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
    setCompte({
      ...compte,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
        setCompte({
        ...compte,
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
      const response = await axios.post(API_URL, compte);
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
    <div className="container mt-4">
      <h2>Créer un nouveau client</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            className="form-control"
            name="nom"
            value={compte.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Prénom</label>
          <input
            type="text"
            className="form-control"
            name="prenom"
            value={compte.prenom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={compte.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Téléphone</label>
          <input
            type="tel"
            className="form-control"
            name="telephone"
            value={compte.telephone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Carte Nationale</label>
          <input
            type="text"
            className="form-control"
            name="cartnational"
            value={compte.cartnational}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Adresse</label>
          <input
            type="text"
            className="form-control"
            name="adresse"
            value={compte.adresse}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Profession</label>
          <input
            type="text"
            className="form-control"
            name="profession"
            value={compte.profession}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date de Naissance</label>
          <input
            type="date"
            className="form-control"
            name="naissanceDate"
            value={compte.naissanceDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Photo</label>
          <input
            type="file"
            className="form-control"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Créer
        </button>
      </form>
    </div>
  );
};

export default AddCompte;
