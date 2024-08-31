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
import com.sid.entities.Operation;

public interface OperationRepository extends JpaRepository<Operation, Long> {
	// Compte findByNumero(Long numero);

	// liste des operatios d'un compte du codeCompte = x
	@Query("select o from Operation o where o.compte.codeCompte=:x order by o.dateOperation desc")
	public Page<Operation> listOperation(@Param("x") Long codeCpte, Pageable pageable);

	// liste des operatios d'un compte du codeCompte = x
	@Query("select o from Operation o where o.compte.codeCompte=:x order by o.dateOperation desc")
	public List<Operation> listOperationCompteClient(@Param("x") Long codeCpte);

	// liste des operatios d'un compte du codeCompte = x
	@Query("select o from Operation o where o.compte.codeCompte=:x order by o.dateOperation desc")
	public List<Operation> listOperations(@Param("x") Long compteId);

//    String strVer = "Versement";
//    @Query(value = "SELECT SUM(montant) FROM Operation WHERE MONTH(date_operation) = :month "
//    		+ " And  type_operation = " + strVer + '"' 
//    		, nativeQuery = true)
//    Double getTotalVersementByMonth(@Param("month") int month);

	
//	// le total des versements par mois    cette requet fonctionne
//	String typeOperation = "R";
//	@Query(value = "SELECT SUM(montant) FROM bank.operation WHERE MONTH(date_operation) = :month "
//			+ "AND type_op =  '"+typeOperation+"'", nativeQuery = true)
//	Double getTotalVersementByMonth(@Param("month") int month/*, @Param("typeOperation") String typeOperation*/);
	
	// le total des versements par mois

	@Query(value = "SELECT SUM(montant) FROM Operation WHERE MONTH(date_operation) = :month AND type_operation =:typeOperation", nativeQuery = true)
	Double getTotalVersementByMonth(@Param("month") int month, @Param("typeOperation") String typeOperation);

	// total des operations par mois
	@Query(value = "SELECT SUM(montant) FROM Operation WHERE MONTH(date_operation) = :month ", nativeQuery = true)
	Double getTotalByMonth(@Param("month") int month);
	
	
	// list des montants des operations par mois
	@Query(value = "SELECT * FROM Operation WHERE MONTH(date_operation) = :month ", nativeQuery = true)
	public List<Operation> getByMonth(@Param("month") int month);

}
