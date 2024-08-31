package com.sid.dao;

import com.sid.entities.Client;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;

public interface ClientRepository extends JpaRepository<Client, Long> {
    Page<Client> findAll(Pageable pageable);
    List<Client> findByprenomContaining(String prenom);
    
//    @Query("SELECT SUM(c.solde) FROM Client c")
//    Double getTotalSolde();
}

