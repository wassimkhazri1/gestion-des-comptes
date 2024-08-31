package com.sid.web;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sid.dto.DataDto;
import com.sid.dto.OperationDTO;
import com.sid.entities.Operation;
import com.sid.entities.Tutorial;
import com.sid.exception.SpecificExceptionType;
import com.sid.metier.TutorialService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin/tutorials")
public class TutorialController {
	@Autowired
	private TutorialService tutorialService;

	@GetMapping
	public List<Tutorial> getAllTutorials(@RequestParam(required = false) String title) {
		if (title == null) {
			return tutorialService.findAll();
		} else {
			return tutorialService.findByTitleContaining(title);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<Tutorial> getTutorialById(@PathVariable("id") Long id) {
		Optional<Tutorial> tutorialData = tutorialService.findById(id);

		return tutorialData.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PostMapping
	public Tutorial createTutorial(@RequestBody Tutorial tutorial) {
		return tutorialService.save(tutorial);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Tutorial> updateTutorial(@PathVariable("id") Long id, @RequestBody Tutorial tutorial) {
		Optional<Tutorial> tutorialData = tutorialService.findById(id);

		if (tutorialData.isPresent()) {
			Tutorial _tutorial = tutorialData.get();
			_tutorial.setTitle(tutorial.getTitle());
			_tutorial.setDescription(tutorial.getDescription());
			_tutorial.setPublished(tutorial.isPublished());
			return ResponseEntity.ok(tutorialService.save(_tutorial));
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable("id") Long id) {
		try {
			tutorialService.deleteById(id);
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DeleteMapping
	public ResponseEntity<HttpStatus> deleteAllTutorials() {
		try {
			tutorialService.findAll().forEach(tutorial -> tutorialService.deleteById(tutorial.getId()));
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/published")
	public List<Tutorial> findByPublished() {
		return tutorialService.findByPublished(true);
	}

}

/*
 * @GetMapping("/by-month") public ResponseEntity<Map<String, Object>>
 * getOperationsByMonthByType(@RequestParam("month") Integer month,
 * 
 * @RequestParam("typeOperation") String typeOperation) { try { List<Operation>
 * operations = operationServiceImpl.findAllOperations(); List<OperationDTO>
 * operationDTOs =
 * operations.stream().map(this::convertToDto).collect(Collectors.toList());
 * 
 * List<String> mois = Arrays.asList("Janvier", "Février", "Mars", "Avril",
 * "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre",
 * "Décembre"); int size = operationDTOs.size(); List<DataDto> dataDtos = new
 * ArrayList<>(12); Double sumDouble = 0.0; for (int j = 0; j < 12; j++) { month
 * = j + 1; Double totalVersement =
 * operationService.calculerTotalByMonth(month); for (int i = 0; i < size; i++)
 * { if (operationDTOs.get(i).getTypeOperation().equals(typeOperation)) {
 * sumDouble = sumDouble + operationDTOs.get(i).getMontant();
 * 
 * }
 * 
 * } dataDtos.add(new DataDto(mois.get(j), sumDouble)); } Map<String, Object>
 * response = new HashMap<>(); response.put("listOps", dataDtos);
 * 
 * return new ResponseEntity<>(response, HttpStatus.OK); } catch
 * (SpecificExceptionType e) { // Replace with specific exceptions // Log the
 * exception return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST); } catch
 * (Exception e) { // Log the exception return new ResponseEntity<>(null,
 * HttpStatus.INTERNAL_SERVER_ERROR); } } /
 */