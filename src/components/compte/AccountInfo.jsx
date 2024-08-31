import React from 'react';
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

const AccountInfo = ({ compte }) => {
    return (
        compte && (
            <div className="col-md-6">
                <div className="panel panel-primary">
                    <div className="panel-heading">Informations sur le compte</div>
                    <div className="panel-body">
                        <div>
                            <label>Client:</label>
                            <label>{compte.client.nom}</label>
                        </div>
                        <div>
                            <label>Photo:</label>
                            <img
                                src={`data:image/jpeg;base64,${compte.client.photo}`}
                                className="img-circle"
                                alt="User Profile Photo"
                                width="50"
                                height="50"
                            />
                        </div>
                        <div>
                            <label>Code:</label>
                            <label>{compte.codeCompte}</label>
                        </div>
                        <div>
                            <label>Solde:</label>
                            <label>{compte.solde}</label>
                        </div>
                        <div>
                            <label>Date Création:</label>
                            <label>{compte.dateCreation}</label>
                        </div>
                        <div>
                            <label>Type:</label>
                            <label>{compte.class.simpleName}</label>
                        </div>
                        {compte.class.simpleName === 'CompteCourant' && (
                            <div>
                                <label>Découvert:</label>
                                <label>{compte.decouvert}</label>
                            </div>
                        )}
                        {compte.class.simpleName === 'CompteEpargne' && (
                            <div>
                                <label>Taux:</label>
                                <label>{compte.taux}</label>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    );
};

export default AccountInfo;
