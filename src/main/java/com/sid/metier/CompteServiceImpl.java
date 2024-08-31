package com.sid.metier;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import com.sid.entities.Compte;
import com.sid.dao.CompteRepository;

@Service
public class CompteServiceImpl implements CompteService {

	@Autowired
	private CompteRepository compteRepository;

	@Override
	public Compte saveCompte(Compte compte) {
		return compteRepository.save(compte);
	}

	@Override
	public Compte updateCompte(Compte compte) {
		if (compteRepository.existsById(compte.getCodeCompte())) {
			return compteRepository.save(compte);
		} else {
			// Gestion des erreurs si le compte n'existe pas
			return null;
		}
	}

	@Override
	public void deleteCompte(Long id) {
		if (compteRepository.existsById(id)) {
			compteRepository.deleteById(id);
		} else {
			// Gestion des erreurs si le compte n'existe pas
		}
	}

	@Override
	public Optional<Compte> findCompteById(Long id) {
		return compteRepository.findById(id);
	}

	@Override
	public List<Compte> findAllComptes() {
		return compteRepository.findAll();
	}
}
