import React, { useState } from 'react';
import operationDataService from '../../services/operation.service';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/


const OperationsPanel = ({ compte, onSave }) => {
    const [typeOperation, setTypeOperation] = useState('VERS');
    const [codeDestinataire, setCodeCompte2] = useState('');
    const [montant, setMontant] = useState('');
    const [message, setMessage] = useState('');

    const handleTypeChange = (event) => {
        setTypeOperation(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!montant || isNaN(montant) || parseFloat(montant) <= 0) {
            setMessage('Veuillez entrer un montant valide.');
            return;
        }

        if (typeOperation === 'VIR' && !codeDestinataire) {
            setMessage('Veuillez entrer un compte destinataire valide.');
            return;
        }

        const operationData = {
            typeOperation: typeOperation === 'VERS' ? 'V' : typeOperation === 'RET' ? 'R' : 'VIR',
            compteId: compte.codeCompte,
            montant: parseFloat(montant),
            ...(typeOperation === 'VIR' && { codeDestinataire: codeDestinataire })
        };

        console.log('Payload:', operationData); // Affiche les données envoyées pour le diagnostic

        operationDataService.create(operationData)
            .then(response => {
                if (response.status === 200) {
                    setMessage('Opération enregistrée avec succès!');
                    setMontant('');  // Clear input fields after successful operation
                    setCodeCompte2('');
                    onSave(); // Appelle la fonction onSave après l'ajout de l'opération
                } else {
                    setMessage('Erreur lors de l\'enregistrement de l\'opération.');
                }
            })
            .catch(error => {
                setMessage('Erreur lors de l\'enregistrement de l\'opération.');
                console.error('There was an error!', error);
            });
    };

    return (
      <MDBRow>
        {compte && (
            <div className="col-md-6">
                <div className="panel panel-primary">
                    <div className="panel-heading">Opérations sur le compte</div>
                    <div className="panel-body">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Compte:{" "}{compte.codeCompte}</label>
                            </div>
                            <MDBRow>
                            <MDBCol>
                      
                                <input
                                    type="radio"
                                    name="typeOperation"
                                    value="VERS"
                                    checked={typeOperation === 'VERS'}
                                    onChange={handleTypeChange}
                                />
                                <label>Versement</label>
                                </MDBCol>
                                <MDBCol>
                                <input
                                    type="radio"
                                    name="typeOperation"
                                    value="RET"
                                    checked={typeOperation === 'RET'}
                                    onChange={handleTypeChange}
                                />
                                <label>Retrait</label>
                                </MDBCol>
                                <MDBCol>
                                <input
                                    type="radio"
                                    name="typeOperation"
                                    value="VIR"
                                    checked={typeOperation === 'VIR'}
                                    onChange={handleTypeChange}
                                />
                                <label>Virement</label>
                                </MDBCol>
                                </MDBRow>
                            {typeOperation === 'VIR' && (
                                <div id="forVirement">
                                    <label>Vers:</label>
                                    <input
                                        type="text"
                                        name="codeDestinataire"
                                        value={codeDestinataire}
                                        onChange={(e) => setCodeCompte2(e.target.value)}
                                    />
                                </div>
                            )}
                            <div>
                                <label>Montant:</label>
                                <input
                                    type="text"
                                    name="montant"
                                    value={montant}
                                    onChange={(e) => setMontant(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                        {message && (
                            <div className="alert alert-info mt-3">
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}
        </MDBRow>
    );
};

export default OperationsPanel;

