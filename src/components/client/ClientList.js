import React, { Component } from "react";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import clientDataService from "../../services/client.service";
import { Link } from "react-router-dom";
export default class ClientList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchPrenom = this.onChangeSearchPrenom.bind(this);
    this.retrieveClients = this.retrieveClients.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveClient = this.setActiveClient.bind(this);
    this.removeAllClients = this.removeAllClients.bind(this);
    this.searchPrenom = this.searchPrenom.bind(this);

    this.state = {
      clients: [],
      currentClient: null,
      currentIndex: -1,
      searchPrenom: ""
    };

  }
 
  componentDidMount() {
    this.retrieveClients();
  }

  onChangeSearchPrenom(e) {
    const searchPrenom = e.target.value;

    this.setState({
      searchPrenom: searchPrenom
    });
  }

  retrieveClients() {
    clientDataService.getAll()
      .then(response => {
        this.setState({
          clients: response.data
        });
        console.log(this.state.clients);  // Vérifiez ce que contient l'état
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveClients();
    this.setState({
      currentClient: null,
      currentIndex: -1
    });
  }

  setActiveClient(client, index) {
    this.setState({
      currentClient: client,
      currentIndex: index
    });
  }

  removeAllClients() {
    clientDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchPrenom() {
    clientDataService.findByPrenom(this.state.searchPrenom)
      .then(response => {
        this.setState({
          clients: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchPrenom, clients, currentClient, currentIndex } = this.state;
    console.log(clients);  // Vérifiez si des clients sont présents ici
    return (
       
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
             <input
              type="text"
              className="form-control"
              placeholder="Search by prenom"
              value={searchPrenom}
              onChange={this.onChangeSearchPrenom}
            /> 
            <div className="input-group-append">
               <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchPrenom}
              >
                Search
              </button> 
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Clients List</h4>

          <ul className="list-group">
             {clients &&
              clients.map((client, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveClient(client, index)}
                  key={index}
                >
                {client.nom}  {client.prenom} 
                </li>
              ))} 
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllClients}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentClient ? (
            <div>
              <h4>Client</h4>

                  <div>
                <label>
                  <strong>Nom:</strong>
                </label>{" "}
                {currentClient.nom}
              </div>
              <div>
                <label>
                  <strong>Prenom:</strong>
                </label>{" "}
                {currentClient.prenom}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentClient.email}
              </div>
              <div>
                <label>
                  <strong>Telephone:</strong>
                </label>{" "}
                {currentClient.telephone}
              </div>
              <div>
                <label>
                  <strong>Carte National:</strong>
                </label>{" "}
                {currentClient.cartnational}
              </div>
              <div>
                <label>
                  <strong>Adresse:</strong>
                </label>{" "}
                {currentClient.adresse}
              </div>
              <div>
                <label>
                  <strong>Profession:</strong>
                </label>{" "}
                {currentClient.profession}
              </div>
              <div>
                <label>
                  <strong>Date de naissance:</strong>
                </label>{" "}
                {currentClient.naissanceDate}
              </div>
              <div>
                <label>
                  <strong>Photo:</strong>
                </label>{" "}
                <img 
          src={`data:image/jpeg;base64,${currentClient.photo}`}
          className="img-circle" 
          alt="User Profile" 
          width="150" 
          height="150" 
        />
              </div>
              <div>
        <label>
          <strong>Comptes:</strong>
        </label>
        <ul>
          {currentClient.comptes && currentClient.comptes.map((compte, index) => (
            <li key={index}>{compte.codeCompte}

            </li>
          ))}
        </ul>
      </div>
              <Link
                to={"/clients/" + currentClient.code}
                className="btn btn-warning"
                // className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Client...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
