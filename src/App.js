import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import { FaUserCircle, FaCog, FaBell, FaExchangeAlt, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from 'react-bootstrap/Navbar';
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import AuthService from "./services/auth/auth.service";
import authHeader from "./services/auth/auth-header";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Profile from "./components/auth/Profile";
import PrivateRoute from './components/auth/PrivateRoute'; // Assure-toi que le chemin est correct

import BoardUser from "./components/auth/BoardUser";
import BoardModerator from "./components/auth/BoardModerator";
import BoardAdmin from "./components/auth/BoardAdmin";
import Home from "./components/home/home";
import DataGridPremiumDemo from './components/home/DataGridPremiumDemo';
import AdapterHijri from './components/home/AdapterHijri';


import HomePage from "./components/auth/HomePage";

import CompteList from './components/compte/compte-list.components';
import ClientList from './components/client/ClientList';
import BankNavbar from './components/home/BankNavbar';
import CompteForm from './components/compte/CompteForm';
import TutorialsList from './components/tutorial/tutorials-list.component';
import Operationslist from './components/operation/OperationList';
import AddTutorial from './components/tutorial/add-tutorial.component';
import Tutorial from './components/tutorial/tutorial.component';
import Client from './components/client/client.component';
import MyComponent from './components/compte/MyComponent';
import AddClient from './components/client/AddClient';
import OperationsPanel from './components/operation/OperationsPanel';
import SoldeCompteByMonth from './components/compte/SoldeCompteByMonth';
import ProfilePage from './components/home/ProfilePage';

// import Topbar from "./scenes/global/Topbar";
// import Sidebar from "./scenes/global/Sidebar";
// import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices/index";
import Contacts from "./scenes/contacts/index";
import Bar from "./scenes/bar/index";
import Form from "./scenes/form/index";
import Line from "./scenes/line/index";
import Pie from "./scenes/pie/index";
import FAQ from "./scenes/faq/index";
import Geography from "./scenes/geography/index";
import Calendar from "./scenes/calendar/calendar";
import Board from './components/auth/Board';
import SchedulerExample from "./components/home/SchedulerExample";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/



const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const [comptes, setComptes] = useState([]);
  const [clients, setClients] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [operations, setOperations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const comptesResponse = await fetch('http://localhost:8080/api/admin/comptes', { headers: authHeader() });
        const comptesData = await comptesResponse.json();
        setComptes(comptesData.comptes);

        const clientsResponse = await fetch('http://localhost:8080/api/admin/clients', { headers: authHeader() });
        const clientsData = await clientsResponse.json();
        setClients(clientsData.clients);

        const tutorialsResponse = await fetch('http://localhost:8080/api/admin/tutorials', { headers: authHeader() });
        const tutorialsData = await tutorialsResponse.json();
        setTutorials(tutorialsData.tutorials);

        const operationsResponse = await fetch('http://localhost:8080/api/admin/operations', { headers: authHeader() });
        const operationsData = await operationsResponse.json();
        setOperations(operationsData.operations);

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


  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-gray bg-gray">
        <Link to={"/"} className="navbar-brand">
          BankBank
        </Link>
        <div className="navbar-nav mr-auto">
          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <BankNavbar />
            </li>
          )}

        </div>


                <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          {currentUser ? (
          <div className="navbar-nav ml-auto">
            <Dropdown align="end">
      <Dropdown.Toggle variant="link" id="dropdown-basic">
      <img 
          src={`data:image/jpeg;base64,${currentUser.photo}`}
          className="rounded-circle"
          // className="img-circle" 
          alt="User Profile" 
          width="40" 
          height="40" 
        />
        {/* <img
          src="https://via.placeholder.com/40" // Remplacez par l'URL de la photo de profil
          alt="Profile"
          className="rounded-circle"
        /> */}
      </Dropdown.Toggle>

      <Dropdown.Menu className="p-2" style={{ width: '250px' }}>
        <div className="d-flex align-items-center mb-3">
        <img 
          src={`data:image/jpeg;base64,${currentUser.photo}`}
          // className="img-circle" 
          className="rounded-circle me-3"
          alt="User Profile" 
          width="30" 
          height="30" 
        />
          {/* <img
            src="https://via.placeholder.com/50" // Remplacez par l'URL de la photo de profil
            alt="Profile"
            className="rounded-circle me-3"
          /> */}
          <div>
            <h6 className="mb-0">{currentUser.username}</h6>
            <small className="text-muted">{currentUser.email}</small>
          </div>
        </div>
        <Dropdown.Divider />
        <Dropdown.Item href="/profile">
          <FaUserCircle className="me-2" />
          View Profile
        </Dropdown.Item>
        <Dropdown.Item href="#/settings">
          <FaCog className="me-2" />
          Account Settings
        </Dropdown.Item>
        <Dropdown.Item href="#/notifications">
          <FaBell className="me-2" />
          Notifications
        </Dropdown.Item>
        <Dropdown.Item href="#/switch">
          <FaExchangeAlt className="me-2" />
          Switch Account
        </Dropdown.Item>
        <Dropdown.Item href="#/help">
          <FaQuestionCircle className="me-2" />
          Help Center
        </Dropdown.Item>
        <Dropdown.Item href="/login" className="nav-link" onClick={logOut}>
          <FaSignOutAlt className="me-2" />
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
          </Navbar.Text>
        </Navbar.Collapse>
      </nav>
             
 



      <div className="container mt-3">
            {loading && <div>Chargement...</div>}
            {/* {error && <div className="alert alert-danger">{error}</div>} */}
            {error && <div>{error}</div>}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          {/* <Route path="/register" element={<Register/>} /> */}
          <Route path="/register" element={<SignUp/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/profilePage" element={<ProfilePage/>} />
          <Route path="/user" element={<BoardUser/>} />
          <Route path="/mod" element={<BoardModerator/>} />
          <Route path="/admin" element={<BoardAdmin/>} />

          {/* <Route path="/admin" element={<Dashboard />} /> */}

          <Route path="/Comptelist" element={<CompteList comptes={comptes} />} />
          <Route path="/addCompte" element={<CompteForm clients={clients} />} />
          <Route path="/consulter" element={<MyComponent />} /> 
          <Route path="/soldemoi" element= {<SoldeCompteByMonth/>} />
          <Route path="/Clientlist" element={<ClientList clients={clients} />} />
          <Route path="/addClient" element={<AddClient />} />
          <Route path="/clients/:id" element={<Client />} />
          <Route path="/Tutoriallist" element={<TutorialsList tutorials={tutorials} />} />
          <Route path="/OperationList" element={<Operationslist operations={operations} />} />
          <Route path="/addOperation" element={<OperationsPanel />} />
          
          <Route path="/addTutorial" element={<AddTutorial />} />
          <Route path="/tutorials/:id" element={<Tutorial />} />

          <Route
        path="/dash"
        element={
          <PrivateRoute role={["admin"]}>
            <Board />
          </PrivateRoute>
        }
      />
              <Route path="/dataGrid" element={<DataGridPremiumDemo />} />
              <Route path="/hijri" element={<AdapterHijri />} />
              <Route path="/scheduler" element={<SchedulerExample/>} />


              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/homa" element={<HomePage />} />

        </Routes>
      </div>
    </div>
  );
};

export default App;



