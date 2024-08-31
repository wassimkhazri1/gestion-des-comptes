import React, { Component } from "react";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import clientDataService from '../../services/client.service';
import { withRouter } from '../../common/with-router';
class Client extends Component {
  constructor(props) {
    super(props);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangePrenom = this.onChangePrenom.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeTelephone = this.onChangeTelephone.bind(this);
    this.onChangeCartnational = this.onChangeCartnational.bind(this);
    this.onChangeAdresse = this.onChangeAdresse.bind(this);
    this.onChangeProfession = this.onChangeProfession.bind(this);
    this.onChangeNaissanceDate = this.onChangeNaissanceDate.bind(this);
    this.onChangePhoto = this.onChangePhoto.bind(this);
    this.getClient = this.getClient.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateClient = this.updateClient.bind(this);
    this.deleteClient = this.deleteClient.bind(this);

    this.state = {
      currentClient: {
        id: null,
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        cartnational : "",
        adresse: "",
        profession: "",
        naissanceDate: "",
        photo: "",

     //   description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getClient(this.props.router.params.id);
  }

  onChangeNom(e) {
    const nom = e.target.value;

    this.setState(function(prevState) {
      return {
        currentClient: {
          ...prevState.currentClient,
          nom: nom
        }
      };
    });
  }

  onChangePrenom(e) {
    const prenom = e.target.value;

    this.setState(function(prevState) {
      return {
        currentClient: {
          ...prevState.currentClient,
          prenom: prenom
        }
      };
    });
  }
  onChangeEmail(e) {
    const email = e.target.value;

    this.setState(function(prevState) {
      return {
        currentClient: {
          ...prevState.currentClient,
          email: email
        }
      };
    });
  }
  
  onChangeProfession(e) {
    const profession = e.target.value;

    this.setState(function(prevState) {
      return {
        currentClient: {
          ...prevState.currentClient,
          profession: profession
        }
      };
    });
  }
  onChangeTelephone(e) {
    const telephone = e.target.value;

    this.setState(function(prevState) {
      return {
        currentClient: {
          ...prevState.currentClient,
          telephone: telephone
        }
      };
    });
  }
  
  onChangeCartnational(e) {
    const cartnational = e.target.value;

    this.setState(function(prevState) {
      return {
        currentClient: {
          ...prevState.currentClient,
          cartnational: cartnational
        }
      };
    });
  }
  
  onChangeAdresse(e) {
    const adresse = e.target.value;

    this.setState(function(prevState) {
      return {
        currentClient: {
          ...prevState.currentClient,
          adresse: adresse
        }
      };
    });
  }
  
  onChangeNaissanceDate(e) {
    const naissanceDate = e.target.value;

    this.setState(function(prevState) {
      return {
        currentClient: {
          ...prevState.currentClient,
          naissanceDate: naissanceDate
        }
      };
    });
  }
  
  onChangePhoto(e) {
    const photo = e.target.value;

    this.setState(function(prevState) {
      return {
        currentClient: {
          ...prevState.currentClient,
          photo: photo
        }
      };
    });
  }
  onChangeDescription(e) {
 //   const description = e.target.value;
    
    this.setState(prevState => ({
      currentClient: {
        ...prevState.currentClient//,
     //   description: description
      }
    }));
  }

  getClient(id) {
    clientDataService.get(id)
      .then(response => {
        this.setState({
          currentClient: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentClient.id,
      prenom: this.state.currentClient.prenom,
    //  description: this.state.currentClient.description,
      published: status
    };

    clientDataService.update(this.state.currentClient.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentClient: {
            ...prevState.currentClient,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateClient() {
    clientDataService.update(
      this.state.currentClient.id,
      this.state.currentClient
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The client was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteClient() {    
    clientDataService.delete(this.state.currentClient.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/clients');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentClient } = this.state;

    return (
      <div>
        {currentClient ? (
          <div className="edit-form">
            <h4>Client</h4>
            <form>
              <div className="form-group">
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            className="form-control"
            id="nom"
            value={currentClient.nom}
            onChange={this.onChangeNom}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="prenom">Prénom</label>
          <input
            type="text"
            className="form-control"
            id="prenom"
            value={currentClient.prenom}
            onChange={this.onChangePrenom}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={currentClient.email}
            onChange={this.onChangeEmail}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telephone">Téléphone</label>
          <input
            type="tel"
            className="form-control"
            id="telephone"
            value={currentClient.telephone}
            onChange={this.onChangeTelephone}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cartnational">Carte Nationale</label>
          <input
            type="text"
            className="form-control"
            id="cartnational"
            value={currentClient.cartnational}
            onChange={this.onChangeCartnational}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="adresse">Adresse</label>
          <input
            type="text"
            className="form-control"
            id="adresse"
            value={currentClient.adresse}
            onChange={this.onChangeAdresse}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="profession">Profession</label>
          <input
            type="text"
            className="form-control"
            id="profession"
            value={currentClient.profession}
            onChange={this.onChangeProfession}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="naissanceDate">Date de Naissance</label>
          <input
            type="date"
            className="form-control"
            id="naissanceDate"
            value={currentClient.naissanceDate}
            onChange={this.onChangeNaissanceDate}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo">Photo</label>
          <input
            type="file"
            className="form-control"
            id="photo"
            accept="image/*"
//value={currentClient.photo}
            onChange={this.onChangePhoto}
          />
        </div>
              {/* <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentClient.description}
                  onChange={this.onChangeDescription}
                />
              </div> */}

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentClient.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentClient.published ? (
              <button
                // className="badge badge-primary mr-2"
                className="btn btn-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                // className="badge badge-primary mr-2"
                className="btn btn-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              // className="badge badge-danger mr-2"
              className="btn btn-danger mr-2"
              onClick={this.deleteClient}
            >
              Delete
            </button>

            <button
              type="submit"
              // className="badge badge-success"
              className="btn btn-success"
              onClick={this.updateClient}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Client...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Client);