package com.jpa.springdatarest;

import com.jpa.springdatarest.Modele.Proprietaire;
import com.jpa.springdatarest.Modele.Voiture;
import com.jpa.springdatarest.Repository.VoitureRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@DataJpaTest
public class VoitureRepoTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private VoitureRepo voitureRepo;

    @Test
    public void ajouterVoiture() {
        // Créer et persister un propriétaire avant d'ajouter la voiture
        Proprietaire proprietaire = new Proprietaire("John", "Doe");
        entityManager.persistAndFlush(proprietaire);

        // Créer une voiture avec le propriétaire persistant
        Voiture voiture = new Voiture("MiolaCar", "Uber", "Blanche", "M-2020", 2021, 180000, proprietaire);
        entityManager.persistAndFlush(voiture);

        // Vérifier que la voiture a bien été ajoutée et a un ID non null
        assertThat(voiture.getId()).isNotNull();
    }

    @Test
    public void supprimerVoiture() {
        // Créer et persister un propriétaire avant d'ajouter les voitures
        Proprietaire proprietaire = new Proprietaire("John", "Doe");
        entityManager.persistAndFlush(proprietaire);

        // Ajouter deux voitures avec le propriétaire persistant
        entityManager.persistAndFlush(new Voiture("MiolaCar", "Uber", "Blanche", "M-2020", 2021, 180000, proprietaire));
        entityManager.persistAndFlush(new Voiture("MiniCooper", "Uber", "Rouge", "C-2020", 2021, 180000, proprietaire));

        // Supprimer toutes les voitures
        voitureRepo.deleteAll();

        // Vérifier que toutes les voitures ont bien été supprimées
        assertThat(voitureRepo.findAll()).isEmpty();
    }
}
