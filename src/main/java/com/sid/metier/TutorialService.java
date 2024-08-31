package com.sid.metier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import com.sid.dao.TutorialRepository;
import com.sid.entities.Tutorial;
@Service
public class TutorialService {
	
	@Autowired
    private TutorialRepository tutorialRepository;

    public List<Tutorial> findAll() {
        return tutorialRepository.findAll();
    }

    public Optional<Tutorial> findById(Long id) {
        return tutorialRepository.findById(id);
    }

    public Tutorial save(Tutorial tutorial) {
        return tutorialRepository.save(tutorial);
    }

    public void deleteById(Long id) {
        tutorialRepository.deleteById(id);
    }

    public List<Tutorial> findByPublished(boolean published) {
        return tutorialRepository.findByPublished(published);
    }

    public List<Tutorial> findByTitleContaining(String title) {
        return tutorialRepository.findByTitleContaining(title);
    }

}
