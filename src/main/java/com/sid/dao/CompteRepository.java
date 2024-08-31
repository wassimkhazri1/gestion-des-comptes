package com.sid.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import com.sid.entities.Compte;

public interface CompteRepository extends JpaRepository<Compte, Long> {

	Compte findByCodeCompte(Long codeCompte);

	@Query("SELECT c FROM Compte c")
	Page<Compte> findAllComptes(Pageable pageable);
	
    @Query("SELECT SUM(c.solde) FROM Compte c")
    Double getTotalSolde();
    
    
    @Query(value = "SELECT SUM(solde) FROM Compte WHERE MONTH(date_creation) = :month", nativeQuery = true)
    Double getTotalSoldeByMonth(@Param("month") int month);
    
    @Query(value = "SELECT * FROM Compte WHERE MONTH(date_creation) = :month", nativeQuery = true)
    List<Compte> findByMonthNative(@Param("month") int month);
    

}
