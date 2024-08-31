import React from 'react';
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

function OperationItem({ operation }) {
  return (
    <tr>
      <td>{operation.numero}</td>
      <td>{operation.typeOperation}</td>
      <td>{new Date(operation.dateOperation).toLocaleDateString()}</td>
      <td>{operation.montant}</td>
      <td>{operation.compteId}</td>
    </tr>
  );
}

export default OperationItem;
