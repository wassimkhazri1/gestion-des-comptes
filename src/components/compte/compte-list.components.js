// import React, { useState } from 'react';
// //CreatedAndDevelopedByWassimKhazri
// //https://www.linkedin.com/in/wassim-khazri-ab923a14b/
// import PropTypes from 'prop-types';
// import CompteItem from './CompteItem';

// function CompteList({ comptes }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const comptesPerPage = 10;

//   // Calculer les comptes pour la page actuelle
//   const indexOfLastCompte = currentPage * comptesPerPage;
//   const indexOfFirstCompte = indexOfLastCompte - comptesPerPage;
//   const currentComptes = comptes.slice(indexOfFirstCompte, indexOfLastCompte);

//   // Changer de page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Générer les numéros de page
//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(comptes.length / comptesPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="panel panel-primary">
//       <div className="panel-heading">Liste des Comptes</div>
//       <div className="panel-body">
//         <a href="/addCompte" className="btn btn-primary mb-3">Ajouter un nouveau compte</a>
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>TYPE CPTE</th>
//               <th>DATE CREATION</th>
//               <th>SOLDE</th>
//               <th>DECOUVERT</th>
//               <th>TAUX</th>
//               <th>CODE CLI</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentComptes.map(compte => (
//               <CompteItem key={compte.codeCompte} compte={compte} />
//             ))}
//           </tbody>
//         </table>
//         <nav>
//           <ul className="pagination">
//             {pageNumbers.map(number => (
//               <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
//                 {/* <a onClick={() => paginate(number)} className="page-link">
//                   {number}
//                 </a> */}
//                 <button onClick={() => paginate(number)} className="page-link">{number}</button>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// }

// CompteList.propTypes = {
//   comptes: PropTypes.arrayOf(PropTypes.shape({
//     codeCompte: PropTypes.number.isRequired,
//     typeCompte: PropTypes.string,
//     dateCreation: PropTypes.string,
//     solde: PropTypes.number,
//     decouvert: PropTypes.number,
//     taux: PropTypes.number,
//     clientId: PropTypes.number,
//   })).isRequired,
// };

// export default CompteList;

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import authHeader from "../../services/auth/auth-header";
import { useState, useEffect } from "react";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
export default function CompteList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [comptes, setComptes] = useState([]);
  const columns = [
    { field: 'codeCompte', headerName: 'CODE COMPTE', width: 170 },
    { field: 'typeCompte', headerName: 'TYPE CPTE', width: 150 },
      {
      field: 'dateCreation',
      headerName: 'DATE CREATION',
      type: 'Date',
      width: 120,
    },
    { field: 'solde', headerName: 'SOLDE',type: 'number', width: 130 },
    { field: 'decouvert', headerName: 'DECOUVERT',type: 'number', width: 130 },
    { field: 'taux', headerName: 'TAUX',type: 'number', width: 130 },
    { field: 'clientId', headerName: 'CODE CLI',type: 'number', width: 130 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const comptesResponse = await fetch('http://localhost:8080/api/admin/comptes', { headers: authHeader() });
        const comptesData = await comptesResponse.json();
        setComptes(comptesData.comptes);
      } catch (error) {
        //setError('Erreur lors de la récupération des données.');
        setError('');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    
    <div style={{ height: 400, width: '100%' }}>
      {loading}
      {error}
      <DataGrid
        rows={comptes}
        columns={columns}
        getRowId={(row) => row.codeCompte}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
