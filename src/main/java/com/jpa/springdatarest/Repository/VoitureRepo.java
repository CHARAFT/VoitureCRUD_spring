package com.jpa.springdatarest.Repository;

import com.jpa.springdatarest.Modele.Voiture;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VoitureRepo extends CrudRepository<Voiture, Long> {

    // Sélectionnez les voitures par marque
    List<Voiture> findByMarque(String marque);
    //Lister Voitures par marque
    List<Voiture> findByModele(@Param("modele") String modele);

    // Sélectionnez les voitures par couleur
    List<Voiture> findByCouleur(String couleur);

    // Sélectionnez les voitures par année
    List<Voiture> findByAnnee(int annee);

    // Sélectionnez les voitures par marque et modèle
    List<Voiture> findByMarqueAndModele(String marque, String modele);

    // Sélectionnez les voitures par marque ou couleur
    List<Voiture> findByMarqueOrCouleur(String marque, String couleur);

    // Sélectionnez les voitures par marque et trier par année
    List<Voiture> findByMarqueOrderByAnneeAsc(String marque);

    // Sélectionnez les voitures par marque en utilisant une requête SQL personnalisée
    @Query("select v from Voiture v where v.marque = ?1")
    List<Voiture> findVoituresByExactMarque(String marque);

    // Sélectionnez les voitures dont la marque se termine par un certain suffixe
    @Query("select v from Voiture v where v.marque like %?1")
    List<Voiture> findByMarqueEndsWith(String marque);
}
