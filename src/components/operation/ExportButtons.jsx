import React from "react";
import axios from "axios";
import authHeader from "../../services/auth/auth-header";
import PdfIcon from '../../img/pdf.gif';
import XlsxIcon from '../../img/xl.gif';
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/


const ExportButtons = ({ codeCompte }) => {
    // export en pdf ou en xlsx toutes les operations
    // const handleDownload = (type) => {
    //     axios({
    //         url: `http://localhost:8080/api/admin/operations/export/${type}`, // Endpoint backend
    //         method: "GET",
    //         responseType: "blob", // Pour les fichiers binaires,headers: 
    //         headers: authHeader(),
    //     }).then((response) => {
    //         const url = window.URL.createObjectURL(new Blob([response.data]));
    //         const link = document.createElement("a");
    //         link.href = url;
    //         link.setAttribute("download", `export.${type}`);
    //         document.body.appendChild(link);
    //         link.click();
    //     });
    // };
    // export en pdf ou en xlsx toutes les operations pour le compte dont le codeCompte = ${codeCompte}
    const handleOperationDownload = (type) => {
        axios({
            url: `http://localhost:8080/api/admin/operations/export/compte/${codeCompte}/${type}`, // Endpoint backend
            method: "GET",
            responseType: "blob", // Pour les fichiers binaires
            headers: authHeader(),
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `export.${type}`);
            document.body.appendChild(link);
            link.click();
        });
    };
    const handleOperationxlsx = (type) => {
        axios({
            url: `http://localhost:8080/api/admin/operations/export/compte/${codeCompte}/${type}`, // Endpoint backend
            method: "GET",
            responseType: "blob", // Pour les fichiers binaires
            headers: authHeader(),
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `export.${type}`);
            document.body.appendChild(link);
            link.click();
        });
    };
    const handleOperationDownloadxlsx = (type) => {
        axios({
            url: `http://localhost:8080/api/admin/operations/export/${type}`, // Endpoint backend
            method: "GET",
            responseType: "blob", // Pour les fichiers binaires
            headers: authHeader(),
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `export.${type}`);
            document.body.appendChild(link);
            link.click();
        });
    };

    return (
        <div>
            <img
                src={PdfIcon}
                alt="PDF" onClick={() => handleOperationDownload("pdf")} title="Télécharger PDF" type="submit"
            />
                      {"  "}  <img
                src={XlsxIcon}
                alt="XLSX" onClick={() => handleOperationxlsx("xlsx")} title="Télécharger Excel" type="submit"
            />
                                  {"  "}  <img
                src={XlsxIcon}
                alt="XLSX" onClick={() => handleOperationDownloadxlsx("xlsx")} title="Télécharger Tous en Excel" type="submit"
            />
        </div>
    );
};

export default ExportButtons;
