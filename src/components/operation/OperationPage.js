import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import OperationItem from '../operation/OperationItem';
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
export default function OperationPage({operations}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // const [operations,setOperations] = useState([]);
  const columns = [
    { field: 'numero', headerName: 'Num', width: 120 },
    { field: 'typeOperation', headerName: 'Type', width: 130 },
      {
      field: 'dateOperation',
      headerName: 'Date',
      type: 'Date',
      width: 120,
    },
    { field: 'montant', headerName: 'Montant',type: 'number', width: 130 },
    { field: 'compteId', headerName: 'Code',type: 'number', width: 130 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch(operations);
      } catch (error) {
        //setError('Erreur lors de la récupération des données.');
        setError('');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [operations]);

  return (
    
    <div style={{ height: 400, width: '100%' }}>
      {loading}
      {error}
      <DataGrid
        rows={operations}
        columns={columns}
        getRowId={(row) => row.numero}
        {...operations.map(operation => (
          <OperationItem key={operation.numero} operation={operation} />
        ))}
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