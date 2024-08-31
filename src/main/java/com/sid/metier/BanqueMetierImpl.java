package com.sid.metier;

import java.util.Date;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sid.dao.CompteRepository;
import com.sid.dao.OperationRepository;
import com.sid.entities.Compte;
import com.sid.entities.CompteCourant;
import com.sid.entities.Operation;
import com.sid.entities.Versement;
import com.sid.entities.Retrait;
import java.util.logging.Logger;

@Service
@Transactional
public class BanqueMetierImpl implements IBanqueMetier {
	private static final Logger logger = Logger.getLogger(BanqueMetierImpl.class.getName());
	@Autowired
	private CompteRepository compteRepository;
	@Autowired
	private OperationRepository operationRepository;

	@Override
	public Compte consulterCompte(Long codeCpte) {
		// logger.info("Consultation du compte avec le code: {}", codeCpte);
		Compte cp = compteRepository.findByCodeCompte(codeCpte);
		if (cp == null) {
			// logger.info("Result: ");
			throw new RuntimeException("Compte introuvable");
		}
		return cp;
	}

	@Override
	public void verser(Long codeCpte, double montant) {
		Compte cp = consulterCompte(codeCpte);
		Versement v = new Versement(new Date(), montant, cp);
		operationRepository.save(v);
		cp.setSolde(cp.getSolde() + montant);
		compteRepository.save(cp);

	}

	@Override
	public void retirer(Long codeCpte, double montant) {
		Compte cp = consulterCompte(codeCpte);
		double facilitesCaisse = 0;
		if (cp instanceof CompteCourant)
			facilitesCaisse = ((CompteCourant) cp).getDecouvert();
		if (cp.getSolde() + facilitesCaisse < montant)
			throw new RuntimeException("Solde Insuffisant");
		Retrait r = new Retrait(new Date(), montant, cp);
		operationRepository.save(r);
		cp.setSolde(cp.getSolde() - montant);
		compteRepository.save(cp);

	}

	@Override
	public void virement(Long codeCpte1, Long codeCpte2, double montant) {
		if (codeCpte1.equals(codeCpte2))
			throw new RuntimeException("On peut pas effectuer un virement sur la meme compte");
		retirer(codeCpte1, montant);
		verser(codeCpte2, montant);

 	}

	@Override
	public Page<Operation> listOperration(Long codeCpte, int page, int size) {
		PageRequest pageable = PageRequest.of(page, size);
		return operationRepository.listOperation(codeCpte, pageable);
	}

}
