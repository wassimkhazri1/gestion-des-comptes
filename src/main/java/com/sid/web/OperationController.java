package com.sid.web;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

import java.io.IOException;
import java.security.DrbgParameters.NextBytes;

import com.itextpdf.text.DocumentException;
import com.sid.dao.CompteRepository;
import com.sid.dao.OperationRepository;
import com.sid.dto.DataDto;
import com.sid.dto.OperationDTO;
import com.sid.entities.Operation;
import com.sid.exception.SpecificExceptionType;
import com.sid.metier.ClientMetier;
import com.sid.metier.IBanqueMetier;
import com.sid.metier.OperationService;
import com.sid.metier.OperationServiceImpl;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/admin/operations")
@CrossOrigin(origins = "http://localhost:3000")
public class OperationController {

	@Autowired
	private ClientMetier clientMetier;

	@Autowired
	private IBanqueMetier banqueMetier;

	@Autowired
	private OperationServiceImpl operationServiceImpl;

	@Autowired
	private OperationService operationService;

	@Autowired
	private CompteRepository compteRepository;

	@Autowired
	private OperationRepository operationRepository;

	@GetMapping("/operations")
	public Map<String, String> index() {
		Map<String, String> response = new HashMap<>();
		response.put("message", "Operations index");
		return response;
	}

	@GetMapping("/comptes")
	public Map<String, String> indexc() {
		Map<String, String> response = new HashMap<>();
		response.put("message", "Comptes index");
		return response;
	}

	@GetMapping("/compte/{compteId}/operations")
	public ResponseEntity<Map<String, Object>> getAllOperations(@PathVariable Long compteId,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {

		try {
			// Setup pageable and fetch paged result using the custom query
			Pageable paging = PageRequest.of(page, size);
			Page<Operation> operationsPage = operationRepository.listOperation(compteId, paging);

			// Convert operations to DTOs
			List<OperationDTO> operationDTOs = operationsPage.getContent().stream().map(this::convertToDto)
					.collect(Collectors.toList());

			// Prepare the response
			Map<String, Object> response = new HashMap<>();
			response.put("listOperations", operationDTOs);
			response.put("currentPage", operationsPage.getNumber());
			response.put("totalItems", operationsPage.getTotalElements());
			response.put("totalPages", operationsPage.getTotalPages());

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (EntityNotFoundException e) {
			// Handle specific exception
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			// Handle generic exceptions
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// retourne la somme des operations pour un mois donné et selon le type
	// d'operation(retrait ou versement)
	@GetMapping("/allversbymonth")
	public ResponseEntity<Map<String, Object>> getAllVersementByMonth(@RequestParam("month") Integer month,
			@RequestParam("typeOperation") String typeOperation) {
		try {

			List<Operation> operations = operationService.getOperationsByMonth(month);
			List<OperationDTO> operationDTOs = operations.stream().map(this::convertToDto).collect(Collectors.toList());
			Double sumDouble = 0.0;
			for (int i = 0; i < operationDTOs.size(); i++) {
				if (operationDTOs.get(i).getTypeOperation().equals(typeOperation)) {
					sumDouble = sumDouble + operationDTOs.get(i).getMontant();

				}

			}

			Map<String, Object> response = new HashMap<>();
			if (typeOperation.equals("Retrait")) {
				response.put("totalRetrait", sumDouble);
			}
			if (typeOperation.equals("Versement")) {
				response.put("totalVersement", sumDouble);
			}
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

	// retourne la somme de tout les operations pour un mois donné
	@GetMapping("/vers-by-month")
	public ResponseEntity<Double> getTotalByMonth(@RequestParam(required = false) Integer month) {
		Double totalVersement = operationService.calculerTotalByMonth(month);
		return new ResponseEntity<>(totalVersement, HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<Map<String, Object>> getAllOperations() {
		try {
			List<Operation> operations = operationServiceImpl.findAllOperations();

			List<OperationDTO> operationDTOs = operations.stream().map(this::convertToDto).collect(Collectors.toList());

			Map<String, Object> response = new HashMap<>();
			response.put("listOperations", operationDTOs);

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (SpecificExceptionType e) { // Replace with specific exceptions
			// Log the exception
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			// Log the exception
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/saveOperation")
	public ResponseEntity<?> saveOperation(@RequestBody OperationDTO operationDTO) {
		Map<String, String> response = new HashMap<>();
		try {
			// Processus en fonction du type d'opération
			if (operationDTO.getTypeOperation().equals("V")) {
				banqueMetier.verser(operationDTO.getCompteId(), operationDTO.getMontant());
			} else if (operationDTO.getTypeOperation().equals("R")) {
				banqueMetier.retirer(operationDTO.getCompteId(), operationDTO.getMontant());
			} else if (operationDTO.getTypeOperation().equals("VIR")) {

				// Ajout de la logique pour gérer les virements
				if (operationDTO.getCodeDestinataire() == null) {
					throw new IllegalArgumentException("Le compte destinataire est requis pour un virement.");
				}
				banqueMetier.virement(operationDTO.getCompteId(), operationDTO.getCodeDestinataire(),
						operationDTO.getMontant());
			}
			response.put("status", "success");
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.put("status", "error");
			response.put("message", e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<OperationDTO> getOperationById(@PathVariable Long id) {
		Optional<Operation> operation = operationServiceImpl.findOperationById(id);
		if (operation.isPresent()) {
			OperationDTO operationDTO = convertToDto(operation.get());
			return new ResponseEntity<>(operationDTO, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/export/pdf")
	public void exportToPdf(HttpServletResponse response) throws IOException, DocumentException {
		response.setContentType("application/pdf");
		response.setHeader("Content-Disposition", "attachment; filename=operations.pdf");
		List<Operation> operations = operationServiceImpl.findAllOperations();
		operationServiceImpl.exportOperationsToPdf(operations, response);
	}

	@GetMapping("/export/compte/{compteId}/pdf")
	public void exportToPdfCompte(HttpServletResponse response, @PathVariable Long compteId)
			throws IOException, DocumentException {
		response.setContentType("application/pdf");
		response.setHeader("Content-Disposition", "attachment; filename=operations.pdf");
		List<Operation> operations = operationRepository.listOperationCompteClient(compteId);
		operationServiceImpl.exportOperationsToPdf(operations, response);
	}

	@GetMapping("/export/xlsx")
	public void exportToExcel(HttpServletResponse response) throws IOException {
		response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		response.setHeader("Content-Disposition", "attachment; filename=operations.xlsx");
		List<Operation> operations = operationServiceImpl.findAllOperations();
		operationServiceImpl.exportOperationsToExcel(operations, response);
	}

	@GetMapping("/export/compte/{compteId}/xlsx")
	public void exportToxlsxCompte(HttpServletResponse response, @PathVariable Long compteId) throws IOException {
		response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		response.setHeader("Content-Disposition", "attachment; filename=operations.xlsx");
		List<Operation> operations = operationRepository.listOperationCompteClient(compteId);
		operationServiceImpl.exportOperationsToExcel(operations, response);
	}

	// retourne une list de la somme des operations pour un mois donné et selon le
	// type d'operation(retrait ou versement)
	@GetMapping("/allversbymonthXY")
	public ResponseEntity<Map<String, Object>> getAllVersementByMonthXY(/*@RequestParam("month") Integer month,*/
			@RequestParam("typeOperation") String typeOperation) {
		try {

			List<String> mois = Arrays.asList("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août",
					"Septembre", "Octobre", "Novembre", "Décembre");
			List<DataDto> dataDtos = new ArrayList<>(12);
			Double sumDouble = 0.0;
			for (int j = 0; j < 12; j++) {
				Integer month = j + 1;
				List<Operation> operations = operationService.getOperationsByMonth(month);
				List<OperationDTO> operationDTOs = operations.stream().map(this::convertToDto)
						.collect(Collectors.toList());
				// Double totalVersement = operationService.calculerTotalByMonth(month);
				for (int i = 0; i < operationDTOs.size(); i++) {
					if (operationDTOs.get(i).getTypeOperation().equals(typeOperation)) {
						sumDouble = sumDouble + operationDTOs.get(i).getMontant();

					}

				}
				dataDtos.add(new DataDto(mois.get(j), sumDouble));
				sumDouble = 0.0;
			}
			Map<String, Object> response = new HashMap<>();
			response.put("listOps", dataDtos);

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

	public OperationDTO convertToDto(Operation operation) {
		OperationDTO dto = new OperationDTO();
		dto.setNumero(operation.getNumero());
		dto.setDateOperation(operation.getDateOperation());
		dto.setMontant(operation.getMontant());
		dto.setCompteId(operation.getCompte().getCodeCompte());
		dto.setTypeOperation(operation.getClass().getSimpleName());
		return dto;
	}

}
