import { useState } from 'react';
import compteDataService from '../../services/compte.service';
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

const MyComponent = () => {
  const [compte, setCompte] = useState(null);
  const [operations, setOperations] = useState([]);
  const [pages, setPages] = useState([]);

  const handleConsultation = (codeCompte) => {
    // Récupérer les informations du compte en fonction du codeCompte
    compteDataService.get(codeCompte)
      .then(response => {
        setCompte(response.data);
        
        // Ensuite, récupérer les opérations liées à ce compte
        // Supposons que l'API retourne les opérations dans le même appel
      
        setOperations(response.data.operations);

        // Si la pagination est également incluse dans la réponse
        setPages(response.data.pages);
      })
      .catch(e => {
        console.error('Erreur lors de la récupération du compte :', e);
      });
  };

  return (
    <div>
      {/* Formulaire de consultation */}
      <form onSubmit={(e) => { e.preventDefault(); handleConsultation(e.target.elements.codeCompte.value); }}>
        <label>Code Compte:</label>
        <input type="text" name="codeCompte" />
        <button type="submit" className="btn btn-primary">Ok</button>
      </form>

      {/* Affichage des détails du compte */}
      {compte && (
        <div>
          <h4>Informations sur le compte</h4>
          <p>Client: {compte.client.nom}</p>
          <p>Code: {compte.codeCompte}</p>
          <p>Solde: {compte.solde}</p>
          <p>Date de Création: {compte.dateCreation}</p>
          <p>Type: {compte.type}</p>
          {compte.type === 'CompteCourant' && <p>Découvert: {compte.decouvert}</p>}
          {compte.type === 'CompteEpargne' && <p>Taux: {compte.taux}</p>}
        </div>
      )}

      {/* Affichage des opérations */}
      {operations.length > 0 && (
        <div>
          <h4>Liste des opérations</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Num</th>
                <th>Type</th>
                <th>Date</th>
                <th>Montant</th>
              </tr>
            </thead>
            <tbody>
               {operations.map((operation, index) => (
                <tr key={index}>
                  <td>{operation.numero}</td>
                  <td>{operation.typeOperation}</td>
                  <td>{operation.dateOperation}</td>
                  <td>{operation.montant}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {pages.length > 0 && (
            <ul className="pagination">
              {pages.map((page, index) => (
                <li key={index} className="page-item">
                  <button className="page-link" onClick={() => handleConsultation(compte.codeCompte, page)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default MyComponent;
