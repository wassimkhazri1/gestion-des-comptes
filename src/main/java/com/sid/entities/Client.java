package com.sid.entities;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;

@Entity
public class Client implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long code;
	private String nom;
	private String prenom;
	private String email;
	private Long telephone;
	private Long cartnational;
	private String adresse;
	private String profession;
	private Date naissanceDate;

	@Lob
	@Column(name = "photo", columnDefinition = "LONGTEXT")
	private String photo; // Photo encodée en base64

	@OneToMany(mappedBy = "client", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JsonManagedReference
	private Collection<Compte> comptes;

	public Client() {
		// Constructeur par défaut
	}

	public Client(String nom, String prenom, String email, Long telephone, Long cartnational, String adresse,
			String profession, Date naissanceDate, String photo) {
		this.nom = nom;
		this.prenom = prenom;
		this.email = email;
		this.telephone = telephone;
		this.cartnational = cartnational;
		this.adresse = adresse;
		this.profession = profession;
		this.naissanceDate = naissanceDate;
		this.photo = photo;
	}

	// Getters et Setters

	public Long getCode() {
		return code;
	}

	public void setCode(Long code) {
		this.code = code;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}
	//CreatedAndDevelopedByWassimKhazri
	//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Long getTelephone() {
		return telephone;
	}

	public void setTelephone(Long telephone) {
		this.telephone = telephone;
	}

	public Long getCartnational() {
		return cartnational;
	}

	public void setCartnational(Long cartnational) {
		this.cartnational = cartnational;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public String getProfession() {
		return profession;
	}

	public void setProfession(String profession) {
		this.profession = profession;
	}

	public Date getNaissanceDate() {
		return naissanceDate;
	}

	public void setNaissanceDate(Date naissanceDate) {
		this.naissanceDate = naissanceDate;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public Collection<Compte> getComptes() {
		return comptes;
	}

	public void setComptes(Collection<Compte> comptes) {
		this.comptes = comptes;
	}
}
