package com.sid.metier;

import java.util.List;

import org.springframework.data.domain.Page;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import com.sid.entities.Compte;

public interface CompteMetier {
	public Page<Compte> listComptes(int page, int size);

	Double calculerTotalSolde();

	List<Compte> getByMonth(int month);

	public Double calculerTotalSoldeByMonth(int month);

}
