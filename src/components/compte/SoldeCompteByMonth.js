import React, { useState, useEffect } from 'react';
import authHeader from "../../services/auth/auth-header";
import { DataGrid } from '@mui/x-data-grid';
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
const SoldeCompteByMonth = () => {
  const [comptes, setComptes] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);
  };

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
      if (selectedMonth) {
        try {
          const comptesResponse = await fetch(`http://localhost:8080/api/admin/comptes/by-month?month=${selectedMonth}`, { headers: authHeader() });
          const comptesData = await comptesResponse.json();
          setComptes(comptesData.compteslist);
        } catch (error) {
          //setError('Erreur lors de la récupération des données.');
          setError(error);
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
      else{
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
    }
    };

    fetchData();
  }, [selectedMonth]);



  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>Select Month to View compte</h2>
      
      <select value={selectedMonth} onChange={handleMonthChange}>
        <option value="">--Select a Month--</option>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
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
};

export default SoldeCompteByMonth;
