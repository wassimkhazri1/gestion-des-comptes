import React from 'react';
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

function ClientItem({ client }) {
  return (
    <tr>
      <td>{client.code}</td>
      <td>{client.nom}</td>
      <td>{client.prenom}</td>
      <td>{client.email}</td>
      <td>{client.telephone}</td>
      <td>{client.cartnational}</td>
      <td>{client.adresse}</td>
      <td>{client.profession}</td>
      <td>{new Date(client.naissanceDate).toLocaleDateString()}</td>
      <td>
        <img 
          src={`data:image/jpeg;base64,${client.photo}`}
          className="img-circle" 
          alt="User Profile Photo" 
          width="50" 
          height="50" 
        />
      </td>
       <td>{client.comptes}</td> 
    </tr>
  );
}

export default ClientItem;
