import React, { useState } from 'react';
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

const ConsultationForm = ({ onSubmit }) => {
    const [codeCompte, setCodeCompte] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(codeCompte);
    };

    return (
        <div className="col-md-6">
            <div className="panel panel-primary">
                <div className="panel-heading">Consultation d'un compte</div>
                <div className="panel-body">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Code Cpte:</label>
                            <input
                                type="text"
                                value={codeCompte}
                                onChange={(e) => setCodeCompte(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary">Ok</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ConsultationForm;
