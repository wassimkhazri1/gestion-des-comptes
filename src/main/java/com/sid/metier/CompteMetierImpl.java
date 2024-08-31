package com.sid.metier;

import java.util.List;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sid.dao.CompteRepository;
import com.sid.entities.Compte;

@Service
@Transactional
public class CompteMetierImpl implements CompteMetier {
	@Autowired
	private CompteRepository compteRepository;

	public Compte saveCompte(Compte compte) {
		return compteRepository.save(compte);
	}

	public List<Compte> getAllComptes() {
		return compteRepository.findAll();
	}

	@Override
	public Page<Compte> listComptes(int page, int size) {
		PageRequest pageable = PageRequest.of(page, size);
		return compteRepository.findAllComptes(pageable);
	}

	@Override
	public Double calculerTotalSolde() {
		return compteRepository.getTotalSolde();
	}

	@Override
	public List<Compte> getByMonth(int month) {
		return compteRepository.findByMonthNative(month);
	}

	@Override
	public Double calculerTotalSoldeByMonth(int month) {
		return compteRepository.getTotalSoldeByMonth(month);
	}

}
