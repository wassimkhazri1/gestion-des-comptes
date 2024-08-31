package com.sid.metier;

import org.springframework.data.domain.Page;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import com.sid.entities.Compte;
import com.sid.entities.Operation;

// couche metier ou bien couche service

public interface IBanqueMetier {
	public Compte consulterCompte(Long codeCpte);

	public void verser(Long codeCpte, double montant);

	public void retirer(Long codeCpte, double montant);

	public void virement(Long codeCpte1, Long codeCpte2, double montant);

	public Page<Operation> listOperration(Long codeCpte, int page, int size);

}
