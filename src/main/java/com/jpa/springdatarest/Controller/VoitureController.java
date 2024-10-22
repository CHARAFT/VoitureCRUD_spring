package com.jpa.springdatarest.Controller;

import com.jpa.springdatarest.Modele.Voiture;
import com.jpa.springdatarest.Repository.VoitureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/voitures")

public class VoitureController {
    @Autowired
    private VoitureRepo voitureRepo;
    @GetMapping("/")
    public Iterable<Voiture> getVoitures(){
        return voitureRepo.findAll();
    }
    @PostMapping("")
    public Voiture addVoiture(@RequestBody Voiture voiture) {
        return voitureRepo.save(voiture);
    }
    @GetMapping("/{id}")
    public Optional<Voiture> getVoitureById(@PathVariable Long id) {
        return voitureRepo.findById(id);
    }
    @PutMapping("/{id}")
    public Voiture updateVoiture(@PathVariable Long id, @RequestBody Voiture updatedVoiture) {
        // Check if the Voiture exists
        return voitureRepo.findById(id).map(voiture -> {
            voiture.setMarque(updatedVoiture.getMarque()); // Update the necessary fields
            voiture.setModele(updatedVoiture.getModele());
            voiture.setAnnee(updatedVoiture.getAnnee());
            // Add other fields as needed
            return voitureRepo.save(voiture);
        }).orElseThrow(() -> new RuntimeException("Voiture not found with id " + id));
    }

    @DeleteMapping("/{id}")
    public void deleteVoiture(@PathVariable Long id) {
        voitureRepo.deleteById(id);
    }
}
