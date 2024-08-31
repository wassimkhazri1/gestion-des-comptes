package com.sid.web;

import com.sid.dao.CompteRepository;
import com.sid.dto.ClientDTO;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import com.sid.entities.Client;
import com.sid.entities.Compte;

import com.sid.exception.SpecificExceptionType;
import com.sid.metier.ClientMetier;
import com.sid.metier.ClientService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/admin/clients")
@CrossOrigin(origins = "http://localhost:3000")
public class ClientController {

	@Autowired
	private ClientMetier clientMetier;

	@Autowired
	private CompteRepository compteRepository;

	@GetMapping
	public List<ClientDTO> getAllClients() {
		return clientMetier.getAllClients().stream().map(this::convertToDTO).collect(Collectors.toList());
	}

	@GetMapping("/{id}")
	public ResponseEntity<ClientDTO> getClientById(@PathVariable Long id) {
		Optional<Client> client = clientMetier.getClientById(id);
		return client.map(c -> ResponseEntity.ok(convertToDTO(c))).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping("/compte/{compteId}/clients")
	public ResponseEntity<Map<String, Object>> getClientByCompteId(@PathVariable Long compteId) {
		try {
			// Récupérer le compte par ID
			Compte compte = compteRepository.findByCodeCompte(compteId);

			// Récupérer le client associé au compte
			Client client = compte.getClient();

			// Convertir le client en DTO
			ClientDTO clientDTO = convertToDTO(client);

			// Préparer la réponse
			Map<String, Object> response = new HashMap<>();

			response.put("client", clientDTO);

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (SpecificExceptionType e) { // Remplacer par des exceptions spécifiques
			// Log the exception
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			// Log the exception
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping
	public ClientDTO createClient(@RequestBody ClientDTO clientDTO) {
		Client client = convertToEntity(clientDTO);
		Client savedClient = clientMetier.saveClient(client);
		return convertToDTO(savedClient);
	}

	@PutMapping("/{id}")
	public ResponseEntity<ClientDTO> updateClient(@PathVariable Long id, @RequestBody ClientDTO clientDTO) {
		if (!clientMetier.getClientById(id).isPresent()) {
			return ResponseEntity.notFound().build();
		}
		Client client = convertToEntity(clientDTO);
		client.setCode(id); // Ensure the ID is set for update
		Client updatedClient = clientMetier.saveClient(client);
		return ResponseEntity.ok(convertToDTO(updatedClient));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
		if (!clientMetier.getClientById(id).isPresent()) {
			return ResponseEntity.notFound().build();
		}
		clientMetier.deleteClient(id);
		return ResponseEntity.ok().build();
	}

	private ClientDTO convertToDTO(Client client) {
		ClientDTO dto = new ClientDTO();
		dto.setCode(client.getCode());
		dto.setNom(client.getNom());
		dto.setPrenom(client.getPrenom());
		dto.setEmail(client.getEmail());
		dto.setTelephone(client.getTelephone());
		dto.setCartnational(client.getCartnational());
		dto.setAdresse(client.getAdresse());
		dto.setProfession(client.getProfession());
		dto.setNaissanceDate(client.getNaissanceDate());
		dto.setPhoto(client.getPhoto());
		dto.setComptes(client.getComptes());
		return dto;
	}

	private Client convertToEntity(ClientDTO dto) {
		Client client = new Client();
		client.setCode(dto.getCode());
		client.setNom(dto.getNom());
		client.setPrenom(dto.getPrenom());
		client.setEmail(dto.getEmail());
		client.setTelephone(dto.getTelephone());
		client.setCartnational(dto.getCartnational());
		client.setAdresse(dto.getAdresse());
		client.setProfession(dto.getProfession());
		client.setNaissanceDate(dto.getNaissanceDate());
		client.setPhoto(dto.getPhoto());
		client.setComptes(dto.getComptes());
		return client;
	}
}
