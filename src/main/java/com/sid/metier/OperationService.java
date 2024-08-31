


package com.sid.metier;

import java.util.List;
import java.util.Optional;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import com.sid.entities.Operation;

public interface OperationService {
	Operation saveOperation(Operation operation);

	Operation updateOperation(Operation compte);

	void deleteOperation(Long id);

	Optional<Operation> findOperationById(Long id);

	List<Operation> findAllOperations();
	
	//Double calculerTotalVersementByMonth(int month);
	Double calculerTotalVersementByMonth(int month, String typeOperation);

	Double calculerTotalByMonth(int month);
	
	List<Operation> getOperationsByMonth(int month);

}
