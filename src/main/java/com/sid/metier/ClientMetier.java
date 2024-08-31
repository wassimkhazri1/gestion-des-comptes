package com.sid.metier;

import org.springframework.data.domain.Page;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import com.sid.entities.Client;

import java.util.List;
import java.util.Optional;

public interface ClientMetier {
	List<Client> getAllClients();

	Optional<Client> getClientById(Long id);

	Client saveClient(Client client);

	void deleteClient(Long id);

	List<Client> findByPrenomContaining(String prenom);

	Optional<Client> findByCode(Long code);

	Page<Client> listClients(int page, int size);
	
	 
}
