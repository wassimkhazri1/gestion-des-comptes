package com.sid.metier;

import java.util.List;
import java.util.Optional;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import com.sid.entities.Compte;

public interface CompteService {
	Compte saveCompte(Compte compte);

	Compte updateCompte(Compte compte);

	void deleteCompte(Long id);

	Optional<Compte> findCompteById(Long id);

	List<Compte> findAllComptes();
}
