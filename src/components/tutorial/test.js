// import React from 'react';
// import PropTypes from 'prop-types';
// import ClientItem from './ClientItem';
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

// function ClientList({ clients }) {
//   return (
//     <div className="panel panel-primary">
//       <div className="panel-heading">Liste des Clients</div>
//       <div className="panel-body">
//         <a href="/addClient" className="btn btn-primary mb-3">Ajouter un nouveau client</a>
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>CODE</th>
//               <th>NOM</th>
//               <th>PRENOM</th>
//               <th>EMAIL</th>
//               <th>TELEPHONE</th>
//               <th>CIN</th>
//               <th>ADRESSE</th>
//               <th>PROFESSION</th>
//               <th>DATE NAISSANCE</th>
//               <th >PHOTO</th>
//             </tr>
//           </thead>
//           <tbody>
//             {clients.map(client => (
//               <ClientItem key={client.code} client={client} />
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// ClientList.propTypes = {
//   clients: PropTypes.arrayOf(PropTypes.shape({
//     code: PropTypes.number.isRequired,
//     nom: PropTypes.string,
//     prenom: PropTypes.string,
//     email: PropTypes.string,
//     telephone: PropTypes.number,
//     cartnational: PropTypes.number,
//     adresse: PropTypes.string,
//     profession: PropTypes.string,
//     naissanceDate: PropTypes.string,
//     photo: PropTypes.string,
//     // comptes: PropTypes.string,

//   })).isRequired,
// };

// export default ClientList;


import React, { Component } from "react";
import ClientDataService from "../../services/client.service";
import { Link } from "react-router-dom";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
//import ClientItem from './ClientItem';
export default class ClientList extends Component {
  constructor(props) {
    super(props);
   // this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveClients = this.retrieveClients.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveClient = this.setActiveClient.bind(this);
    this.removeAllClients = this.removeAllClients.bind(this);
  //  this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      clients: [],
      currentClient: null,
      currentIndex: -1/*,
      searchTitle: ""*/
    };
  }

  componentDidMount() {
    this.retrieveClients();
  }

  // onChangeSearchTitle(e) {
  //   const searchTitle = e.target.value;

  //   this.setState({
  //     searchTitle: searchTitle
  //   });
  // }

  retrieveClients() {
    ClientDataService.getAll()
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

    // retrieveClients() {
  //   clientDataService.getAll()
  //     .then(response => {
  //       try {
  //         const clientsData = JSON.parse(JSON.stringify(response.data));
  //         this.setState({
  //           clients: clientsData
  //         });
  //         console.log(clientsData);
  //       } catch (error) {
  //         console.error("Error parsing JSON: ", error);
  //       }
  //     })
  //     .catch(e => {
  //       console.log("Error fetching clients: ", e);
  //     });
  // }
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
    ClientDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  // searchTitle() {
  //   ClientDataService.findByTitle(this.state.searchTitle)
  //     .then(response => {
  //       this.setState({
  //         clients: response.data
  //       });
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  render() {
    const { /*searchTitle, */clients, currentClient, currentIndex } = this.state;

    return (
       
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            {/* <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            /> */}
            <div className="input-group-append">
              {/* <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button> */}
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
                  {client.nom} {client.prenom}
                </li>
              ))} 
                           {/* {clients.map(client => (
              <ClientItem key={client.code} client={client} />
            ))} */}
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
                {currentClient.photo}
              </div>
              {/* <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTutorial.published ? "Published" : "Pending"}
              </div> */}

              <Link
                to={"/clients/" + currentClient.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}