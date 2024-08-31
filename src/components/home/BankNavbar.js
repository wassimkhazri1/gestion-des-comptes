import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

function BankNavbar() {
  return (
  
    
      <Navbar className="navbar navbar-expand navbar bg" >
        <Container>
          <Nav className="me-auto">
            <NavDropdown title="Comptes" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Comptelist">Comptes</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/addCompte">
              Add Compte
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/consulter">
              Consulter Compte
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/soldemoi">
              Solde par moi
              </NavDropdown.Item>
            </NavDropdown>
                        {/* Dropdown for operation */}
                        <NavDropdown title="operations" id="basic-nav-dropdown">
              <NavDropdown.Item href="/OperationList">Operations</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/addOperation">
                Add Operation
              </NavDropdown.Item>
            </NavDropdown>
            {/* Dropdown for client */}
            <NavDropdown title="Client" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Clientlist">Clients</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/addClient">
                Add Client
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Tutorial" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Tutoriallist">Tutorial</NavDropdown.Item>
              <NavDropdown.Item href="/addTutorial">
                Add Tutorial
              </NavDropdown.Item>
              <NavDropdown.Item href="/testform">Test Form</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/dash">
                Dashboard
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          </Navbar.Text>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      
    
  );
}

export default BankNavbar;