package com.sid.entities;

import java.io.Serializable;
import java.util.Date;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "TYPE_OP", discriminatorType = DiscriminatorType.STRING, length = 1)
public abstract class Operation implements Serializable {
	@Id
	@GeneratedValue
	private Long numero;
	private Date dateOperation;
	private double montant;
    private Long codeDestinataire;
	@ManyToOne
	@JoinColumn(name = "compte_id")
	@JsonBackReference
	private Compte compte;

	public Operation() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Operation(Date dateOperation, double montant, Long codeDestinataire, Compte compte) {
		super();
		this.dateOperation = dateOperation;
		this.montant = montant;
		this.codeDestinataire = codeDestinataire;
		this.compte = compte;
	}

	public Operation(Date dateOperation, double montant, Compte compte) {
		super();
		this.dateOperation = dateOperation;
		this.montant = montant;
		this.compte = compte;
	}

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

	public Compte getCompte() {
		return compte;
	}
 
	public void setCompte(Compte compte) {
		this.compte = compte;
	}

	public Long getCodeDestinataire() {
		return codeDestinataire;
	}

	public void setCodeDestinataire(Long codeDestinataire) {
		this.codeDestinataire = codeDestinataire;
	}
	

}
