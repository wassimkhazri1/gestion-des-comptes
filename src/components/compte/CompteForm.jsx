import React, { useState, useEffect } from 'react';
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol
}
from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import CompteDataService from '../../services/compte.service';
import ClientDataService from '../../services/client.service'; // Assurez-vous d'importer ce service
import Image from '../../img/visuelparticuliers.png';

// const required = (value) => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };

const CompteForm = () => {
    const [form, setForm] = useState({
        dateCreation: '',
        solde: '',
        clientId: '',
        typeCompte: 'CC',
        taux: '',
        decouvert: ''
    });
    const [clients, setClients] = useState([]); // État pour stocker la liste des clients
    const navigate = useNavigate(); 
    const [showEpargneFields, setShowEpargneFields] = useState(false);
    const [showCourantFields, setShowCourantFields] = useState(true);

    useEffect(() => {
        // Appel pour récupérer les clients dès que le composant est monté
        ClientDataService.getAll()
            .then(response => {
                setClients(response.data); // Mise à jour de l'état avec la liste des clients
            })
            .catch(e => {
                console.log(e);
            });
    }, []); // Le tableau vide [] signifie que cet effet se déclenche une seule fois après le montage

    useEffect(() => {
        const handleTypeCompteChange = () => {
            const type = form.typeCompte;
            setShowEpargneFields(type === 'CE');
            setShowCourantFields(type === 'CC');
        };

        handleTypeCompteChange();
    }, [form.typeCompte]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm({
            ...form,
            [id]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        CompteDataService.create(form)
            .then(response => {
                console.log(response.data);
                navigate('/Comptelist'); // Redirection vers la liste des comptes
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
    <MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='6'>
                <div className="panel-body">
                    <h1>Add New Compte</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="dateCreation">Date Creation:</label>
                            <input className="form-control" type="date" id="dateCreation" value={form.dateCreation} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="solde">Solde:</label>
                            <input className="form-control" type="number" step="0.01" id="solde" value={form.solde} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="clientId">Client:</label>
                            <select className="form-control" id="clientId" value={form.clientId} onChange={handleChange} required>
                                {clients.length > 0 ? (
                                    clients.map(client => (
                                        <option key={client.code} value={client.code}>{client.nom} {client.prenom}</option>
                                    ))
                                ) : (
                                    <option value="">No clients available</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="typeCompte">Type Compte:</label>
                            <select className="form-control" id="typeCompte" value={form.typeCompte} onChange={handleChange} required>
                                <option value="CE">Compte Epargne</option>
                                <option value="CC">Compte Courant</option>
                            </select>
                        </div>

                        {showEpargneFields && (
                            <div className="form-group" id="epargneFields">
                                <label htmlFor="taux">Taux:</label>
                                <input className="form-control" type="number" step="0.01" id="taux" value={form.taux} onChange={handleChange} />
                            </div>
                        )}

                        {showCourantFields && (
                            <div className="form-group" id="courantFields">
                                <label htmlFor="decouvert">Decouvert:</label>
                                <input className="form-control" type="number" step="0.01" id="decouvert" value={form.decouvert} onChange={handleChange} />
                            </div>
                        )}

                        <button className="btn btn-primary" type="submit">Submit</button>
                    </form>
                </div>
                </MDBCol>
                <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src={Image}
            alt="Particulier protrait" className="w-100" style={{height:'50%', width:'100%', objectFit: 'cover', objectPosition: 'left'}} />
        </MDBCol>

      </MDBRow>

    </MDBContainer>
    );
};

export default CompteForm;