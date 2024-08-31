import React from 'react';
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

function CompteItem({ compte }) {
  return (
    <tr>
      <td>{compte.typeCompte}</td>
      <td>{new Date(compte.dateCreation).toLocaleDateString()}</td>
      <td>{compte.solde}</td>
      <td>{compte.typeCompte === 'CompteCourant' ? compte.decouvert : ''}</td>
      <td>{compte.typeCompte === 'CompteEpargne' ? compte.taux : ''}</td>
      <td>{compte.clientId}</td>
    </tr>
  );
}

export default CompteItem;
