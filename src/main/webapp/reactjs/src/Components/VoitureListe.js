import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from 'react-router-dom';

const VoitureListe = () => {
    const [voitures, setVoitures] = useState([]);
    const navigate = useNavigate();

    // Charger la liste des voitures
    useEffect(() => {

        axios.get('http://localhost:8080/voitures/')
            .then(response => {
                setVoitures(response.data);
            })
            .catch(error => {
                console.error('Erreur lors du chargement des voitures:', error);
            });
    }, []);

    // Fonction pour rediriger vers la page d'édition de voiture
    const editVoiture = (id) => {
        navigate(`/edit/${id}`); // Redirection vers Voiture.js avec l'ID
    };

    // Fonction pour supprimer une voiture
    const deleteVoiture = (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
            axios.delete(`http://localhost:8080/voitures/${id}`)
                .then(() => {
                    setVoitures(voitures.filter(voiture => voiture.id !== id)); // Mise à jour de la liste
                })
                .catch(error => {
                    console.error('Erreur lors de la suppression de la voiture:', error);
                });
        }
    };

    return (
        <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                <th>Marque</th>
                <th>Modèle</th>
                <th>Couleur</th>
                <th>Immatriculation</th>
                <th>Prix</th>
                <th>Année</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {voitures.map(voiture => (
                <tr key={voiture.id}>
                    <td>{voiture.marque}</td>
                    <td>{voiture.modele}</td>
                    <td>{voiture.couleur}</td>
                    <td>{voiture.immatricule}</td>
                    <td>{voiture.prix}</td>
                    <td>{voiture.annee}</td>
                    <td>
                        {/* Bouton pour éditer */}
                        {/*<Link to={"/edit/"+voiture.id} className="btn btn-sm btn-outline-primary">*/}
                        {/*    <FontAwesomeIcon icon={faEdit} />*/}
                        {/*</Link>*/}
                        <Button
                            variant="warning"
                            className="me-2"
                            onClick={() => editVoiture(voiture.id)}
                        >
                            <FontAwesomeIcon icon={faEdit} /> Éditer
                        </Button>
                        {/* Bouton pour supprimer */}
                        <Button
                            variant="danger"
                            onClick={() => deleteVoiture(voiture.id)}
                        >
                            <FontAwesomeIcon icon={faTrash} /> Supprimer
                        </Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default VoitureListe;
