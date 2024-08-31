package com.sid.metier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import com.sid.entities.Client;
import com.sid.dao.ClientRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ClientService implements ClientMetier {

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    @Override
    public Optional<Client> getClientById(Long id) {
        return Optional.ofNullable(clientRepository.findById(id).orElse(null));
    }

    @Override
    public Client saveClient(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public void deleteClient(Long id) {
        clientRepository.deleteById(id);
    }

    @Override
    public List<Client> findByPrenomContaining(String prenom) {
        return clientRepository.findByprenomContaining(prenom);
    }

    @Override
    public Optional<Client> findByCode(Long code) {
        return clientRepository.findById(code);
    }

    @Override
    public Page<Client> listClients(int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);
        return clientRepository.findAll(pageable);
    }

}
