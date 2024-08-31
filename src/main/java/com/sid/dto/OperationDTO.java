package com.sid.dto;

import java.util.Date;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
public class OperationDTO {
	private Long numero;
	private Date dateOperation;
	private double montant;
	private Long compteId;
	private String typeOperation;
	private Long codeDestinataire; // Nouveau champ pour les virements

	public Long getNumero() {
		return numero;
	}

	public void setNumero(Long numero) {
		this.numero = numero;
	}

	public Date getDateOperation() {
		return dateOperation;
	}

	public void setDateOperation(Date dateOperation) {
		this.dateOperation = dateOperation;
	}

	public double getMontant() {
		return montant;
	}

	public void setMontant(double montant) {
		this.montant = montant;
	}

	public Long getCompteId() {
		return compteId;
	}

	public void setCompteId(Long compteId) {
		this.compteId = compteId;
	}

	public String getTypeOperation() {
		return typeOperation;
	}

	public void setTypeOperation(String typeOperation) {
		this.typeOperation = typeOperation;
	}

	public Long getCodeDestinataire() {
		return codeDestinataire;
	}

	public void setCodeDestinataire(Long codeDestinataire) {
		this.codeDestinataire = codeDestinataire;
	}

}
