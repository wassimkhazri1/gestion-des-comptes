package com.sid.web;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sid.dao.ClientRepository;
import com.sid.dao.CompteRepository;
import com.sid.dto.CompteDTO;
import com.sid.dto.DataDto;
import com.sid.dto.OperationDTO;
import com.sid.entities.Client;
import com.sid.entities.Compte;
import com.sid.entities.CompteCourant;
import com.sid.entities.CompteEpargne;
import com.sid.entities.Operation;
import com.sid.exception.SpecificExceptionType;
import com.sid.metier.CompteMetier;
import com.sid.metier.CompteMetierImpl;
import com.sid.metier.CompteService;

@RestController
@RequestMapping("/api/admin/comptes")
@CrossOrigin(origins = "http://localhost:3000")
public class CompteController {

	@Autowired
	private CompteMetierImpl compteMetierImpl;

	@Autowired
	private CompteMetier compteMetier;

	@Autowired
	private ClientRepository clientRepository;

	@Autowired
	private CompteRepository compteRepository;

	@Autowired
	private CompteService compteService;

	@GetMapping
	public ResponseEntity<Map<String, Object>> getAllComptes() {
		try {
			List<Compte> comptes = compteMetierImpl.getAllComptes();

			List<CompteDTO> compteDTOs = comptes.stream().map(this::convertToDTO).collect(Collectors.toList());

			Map<String, Object> response = new HashMap<>();
			response.put("comptes", compteDTOs);

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (SpecificExceptionType e) { // Replace with specific exceptions
			// Log the exception
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			// Log the exception
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/addCompte")
	public Compte addCompte(@RequestBody CompteDTO compteDTO) {
		// Log received DTO
		// log.info("Received CompteDto: {}", compteDto);
		Client client = clientRepository.findById(compteDTO.getClientId())
				.orElseThrow(() -> new RuntimeException("Client not found with id " + compteDTO.getClientId()));
		Compte compte;
		switch (compteDTO.getTypeCompte()) {
		case "CC":
			CompteCourant compteCourant = new CompteCourant();
			// Assuming taux is used as decouvert for CompteCourant
			compteCourant.setDecouvert(compteDTO.getDecouvert());
			compte = compteCourant;
			break;
		case "CE":
			CompteEpargne compteEpargne = new CompteEpargne();
			compteEpargne.setTaux(compteDTO.getTaux());
			compte = compteEpargne;
			break;
		default:
			throw new IllegalArgumentException("Unknown typeCompte: " + compteDTO.getTypeCompte());
		}
		// Set common properties
		compte.setCodeCompte(compteDTO.getCodeCompte());
		compte.setDateCreation(compteDTO.getDateCreation());
		compte.setSolde(compteDTO.getSolde());
		compte.setClient(client);

		return compteRepository.save(compte);

	}

	@GetMapping("/{id}")
	public ResponseEntity<CompteDTO> getCompteById(@PathVariable Long id) {
		Optional<Compte> compte = compteService.findCompteById(id);
		if (compte.isPresent()) {
			CompteDTO compteDTO = convertToDTO(compte.get());
			Map<String, Object> response = new HashMap<>();
			response.put("compte", compteDTO);
			return new ResponseEntity<>(compteDTO, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/total-solde")
	public ResponseEntity<Double> getTotalSolde() {
		Double totalSolde = compteMetier.calculerTotalSolde();
		return ResponseEntity.ok(totalSolde);
	}

	@GetMapping("/solde-by-month")
	public ResponseEntity<Double> getTotalSoldeByMonth(@RequestParam(required = false) Integer month) {
		Double totalSolde = compteMetier.calculerTotalSoldeByMonth(month);
		return ResponseEntity.ok(totalSolde);
	}

    // retourne le total des soldes des comptes
	@GetMapping("/total-solde-by-month")
	public ResponseEntity<Map<String, Object>> getSoldeByMonth() {
		try {

			List<String> mois = Arrays.asList("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août",
					"Septembre", "Octobre", "Novembre", "Décembre");
			List<DataDto> dataDtos = new ArrayList<>(12);
			// Double sumDouble = 0.0;
			for (int j = 0; j < 12; j++) {
				Double totalSolde = compteMetier.calculerTotalSolde();
				dataDtos.add(new DataDto(mois.get(j), totalSolde));
				// totalSolde = 0.0;
			}
			Map<String, Object> response = new HashMap<>();
			response.put("listops", dataDtos);

			return new ResponseEntity<>(response, HttpStatus.OK);
			// return ResponseEntity.ok(sumDouble);
		} catch (SpecificExceptionType e) { // Replace with specific exceptions
			// Log the exception
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			// Log the exception
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	// soldeByMonth

//    @GetMapping("/by-month")
//    public ResponseEntity<List<Compte>> getByMonth(@RequestParam(required = false) Integer month) {
//        if (month == null) {
//            // gérer le cas où le mois n'est pas spécifié
//            return ResponseEntity.badRequest().body(null); // ou retourner une valeur par défaut
//        }
//
//        List<Compte> comptes = compteMetierImpl.getByMonth(month);
//		List<CompteDTO> compteDTOs = comptes.stream().map(this::convertToDTO).collect(Collectors.toList());
//		Map<String, Object> response = new HashMap<>();
//		response.put("compteslist", compteDTOs);
//        return ResponseEntity.ok(comptes);
//    }
	@GetMapping("/by-month")
	public ResponseEntity<Map<String, Object>> getByMonth(@RequestParam(required = false) Integer month) {
		if (month == null) {
			// gérer le cas où le mois n'est pas spécifié
			return ResponseEntity.badRequest().body(null); // ou retourner une valeur par défaut
		}
		try {
			List<Compte> comptes = compteMetierImpl.getByMonth(month);
			List<CompteDTO> compteDTOs = comptes.stream().map(this::convertToDTO).collect(Collectors.toList());
			Map<String, Object> response = new HashMap<>();
			response.put("compteslist", compteDTOs);

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (SpecificExceptionType e) { // Replace with specific exceptions
			// Log the exception
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			// Log the exception
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	private CompteDTO convertToDTO(Compte compte) {
		CompteDTO dto = new CompteDTO();
		System.out.println("Compte: " + compte);
		System.out.println("CompteDTO: " + dto);
		dto.setCodeCompte(compte.getCodeCompte());
		dto.setDateCreation(compte.getDateCreation());
		dto.setSolde(compte.getSolde());
		dto.setClientId(compte.getClient().getCode());
		dto.setTypeCompte(compte.getClass().getSimpleName());
		if (compte instanceof CompteCourant) {
			dto.setDecouvert(((CompteCourant) compte).getDecouvert());
		} else if (compte instanceof CompteEpargne) {
			dto.setTaux(((CompteEpargne) compte).getTaux());
		}
		System.out.println("Compte: " + compte);
		System.out.println("CompteDTO: " + dto);
		return dto;

	}

}
