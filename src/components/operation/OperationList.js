import React, { useState } from 'react';
import operationDataService from '../../services/operation.service';
import clientDataService from '../../services/client.service';
import OperationsPanel from '../operation/OperationsPanel';
import ExportButtons from './ExportButtons';
import OperationPage from './OperationPage';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';
import OkIcon from '../../img/ok2.png';
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
const OperationList = () => {
  const [codeCompte, setCodeCompte] = useState('');
  const [operations, setOperations] = useState([]);
  const [clients, setClients] = useState([]);
  const [error, setError] = useState('');
  const [setPages] = useState([]);

  //const [currentPage, setCurrentPage] = useState(1);
  const operationsPerPage = 3;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(operations.length / operationsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleCodeCompteChange = (event) => {
    setCodeCompte(event.target.value);
  };
  const handleSave = () => {
    handleFetchOperations(); // Ré-appelle handleFetchOperations pour mettre à jour la liste des opérations
   // setCurrentPage(0); // Retourne à la première page après une mise à jour
  };
  const handleFetchOperations = () => {
    if (!codeCompte) {
      setError('Veuillez entrer un code de compte.');
      return;
    } 
      clientDataService.getClientsByCodeCompte(codeCompte)
      .then(response => {
        console.log('Client Response:', response.data);
        setClients([response.data.client]); // Wrap the single client in an array
        setError('');
      })
      .catch(error => {
        console.error('There was an error fetching the client!', error);
        setError('Erreur lors de la récupération du client.');
      });   
          // Fetch operations and pagination data
    operationDataService.getOperationsByCodeCompte(codeCompte/*, currentPage*/)
    .then(response => {
      setOperations(response.data.listOperations); // Adjust according to your response structure
      setPages([...Array(response.data.totalPages).keys()]);
    })
    .catch(error => {
      console.error('Error fetching operations:', error);
    }, [codeCompte]);
  };

  return (

    <div>
              <section style={{ backgroundColor: '#eee' }}>
        <MDBContainer className="py-5">
          <MDBCard className="mb-4">
          <MDBRow>
          <MDBCol lg="6" >  
          <div className="col-md-6">
            <div className="panel panel-primary">
                <div className="panel-heading">Consultation d'un compte</div>
                <div className="panel-body">
                        <div>             
                            <input
                                type="text"
                                id="codeCompte"
                                value={codeCompte}
                                onChange={handleCodeCompteChange}
                                placeholder="Taper le code compte"
                            />
                                        <img
                src={OkIcon}
                alt="OK" onClick={handleFetchOperations} title="Consulter"
                className="rounded-circle"
                style={{ width: '50px' }} type="submit"
            />
                        </div>
                </div>
            </div>
        </div>
        </MDBCol> 
        <MDBCol lg="6" >  
        <OperationsPanel compte={clients[0] ? { codeCompte: codeCompte } : null} onSave={handleSave}/> 
        </MDBCol>  
          </MDBRow>
          </MDBCard>
          {clients.map((client) => (
          <MDBRow key={client.code}> 
                   {client.comptes
         .filter(compte => String(compte.codeCompte) === String(codeCompte))
         .map(compte => (
          <MDBRow key={compte.codeCompte} >      
            <MDBCol lg="4" >                                 
              <MDBCard className="mb-4" >
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src={`data:image/jpeg;base64,${client.photo}`}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '150px' }}
                    fluid />
                  <p className="text-muted mb-1">{client.profession}</p>
                  <p className="text-muted mb-4">{client.adresse}</p>
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn outline className="ms-1">Message</MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
              <MDBCard className="mb-4">
                <MDBCardBody>
                <MDBRow>
                    <MDBCol sm="6">
                      <MDBCardText>Account number</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="6">
                      <MDBCardText className="text-muted">{compte.codeCompte}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                  <MDBCol sm="3">
                      <MDBCardText>Solde</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{compte.solde}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="4">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="6">
                      <MDBCardText className="text-muted">{client.prenom} {" "} {client.nom}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{client.email}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="4">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      <MDBCardText className="text-muted">{client.telephone}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="4">
                      <MDBCardText>Id Card</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="4">
                      <MDBCardText className="text-muted">{client.cartnational}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="4">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="6">
                      <MDBCardText className="text-muted">{client.adresse}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>   
            </MDBCol>
            <MDBCol lg="8">
            <div className="panel-heading" style={{textEmphasis : '2px'}}>Liste des operations</div>
            <hr/>
              {error && <p style={{ color: 'red' }}>{error}</p>}
                     <OperationPage operations={operations} /> 
                                   {/* Inclure ExportButtons et passer codeCompte en prop  */}
                                  {operations.length > 0 && <ExportButtons codeCompte={codeCompte} />}    
      </MDBCol>
            </MDBRow>))}
          </MDBRow>))}
        </MDBContainer>
        </section>

      </div>
  );
};

export default OperationList;
