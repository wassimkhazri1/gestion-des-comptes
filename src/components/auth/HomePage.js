import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import authHeader from "../../services/auth/auth-header";
import { useState, useEffect } from "react";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
export default function HomePage() {
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