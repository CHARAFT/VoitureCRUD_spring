import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import necessary hooks
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faUndo } from '@fortawesome/free-solid-svg-icons'; // Added faUndo

const Voiture = () => {
    const [voiture, setVoiture] = useState({
        marque: '',
        modele: '',
        couleur: '',
        immatricule: '',
        prix: '',
        annee: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    // Load car data if an ID is provided (edit mode)
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/voitures/${id}`)
                .then(response => {
                    if (response.data != null) {
                        setVoiture(response.data); // Update form fields with retrieved data
                    }
                })
                .catch(error => {
                    console.error('Error loading car:', error);
                });
        }
    }, [id]);

    // Handle form field changes
    const voitureChange = event => {
        setVoiture({
            ...voiture,
            [event.target.name]: event.target.value
        });
    };

    // Handle form submission (add or edit)
    const submitVoiture = event => {
        event.preventDefault();

        const voitureData = {
            marque: voiture.marque,
            modele: voiture.modele,
            couleur: voiture.couleur,
            immatricule: voiture.immatricule,
            prix: parseInt(voiture.prix),
            annee: parseInt(voiture.annee)
        };

        if (id) {
            // Edit mode
            axios.put(`http://localhost:8080/voitures/${id}`, voitureData, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    if (response.data != null) {
                        alert('Car updated successfully');
                        navigate('/list'); // Redirect to the list after updating
                    }
                })
                .catch(error => {
                    console.error('Error updating car:', error);
                });
        } else {
            // Add mode
            axios.post('http://localhost:8080/voitures', voitureData, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    if (response.data != null) {
                        setVoiture({
                            marque: '',
                            modele: '',
                            couleur: '',
                            immatricule: '',
                            prix: '',
                            annee: ''
                        });
                        alert('Car added successfully');
                        navigate('/list'); // Redirect to the list after adding
                    }
                })
                .catch(error => {
                    console.error('Error adding car:', error);
                });
        }
    };

    // Render the form
    return (
        <Card className="border border-dark bg-dark text-white">
            <Card.Header>{id ? 'Edit Car' : 'Add Car'}</Card.Header>
            <Form onSubmit={submitVoiture} id="VoitureFormId">
                <Card.Body>
                    <Row>
                        <Form.Group as={Col} controlId="formGridMarque">
                            <Form.Label>Marque</Form.Label>
                            <Form.Control
                                required
                                name="marque"
                                type="text"
                                className="bg-dark text-white"
                                placeholder="Enter Car Brand"
                                value={voiture.marque}
                                onChange={voitureChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridModele">
                            <Form.Label>Modele</Form.Label>
                            <Form.Control
                                required
                                name="modele"
                                type="text"
                                className="bg-dark text-white"
                                placeholder="Enter Car Model"
                                value={voiture.modele}
                                onChange={voitureChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridCouleur">
                            <Form.Label>Couleur</Form.Label>
                            <Form.Control
                                required
                                name="couleur"
                                type="text"
                                className="bg-dark text-white"
                                placeholder="Enter Car Color"
                                value={voiture.couleur}
                                onChange={voitureChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridImmatricule">
                            <Form.Label>Immatricule</Form.Label>
                            <Form.Control
                                required
                                name="immatricule"
                                type="text"
                                className="bg-dark text-white"
                                placeholder="Enter License Plate"
                                value={voiture.immatricule}
                                onChange={voitureChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridPrix">
                            <Form.Label>Prix</Form.Label>
                            <Form.Control
                                required
                                name="prix"
                                type="text"
                                className="bg-dark text-white"
                                placeholder="Enter Car Price"
                                value={voiture.prix}
                                onChange={voitureChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridAnnee">
                            <Form.Label>Annee</Form.Label>
                            <Form.Control
                                required
                                name="annee"
                                type="text"
                                className="bg-dark text-white"
                                placeholder="Enter Car Year"
                                value={voiture.annee}
                                onChange={voitureChange}
                            />
                        </Form.Group>
                    </Row>
                </Card.Body>
                <Card.Footer style={{ textAlign: 'right' }}>
                    <Button size="sm" variant="success" type="submit">
                        <FontAwesomeIcon icon={id ? faEdit : faPlus} className="me-2" />
                        {id ? 'Update' : 'Add'}
                    </Button>
                    <Button size="sm" variant="info" type="reset" onClick={() => setVoiture({
                        marque: '',
                        modele: '',
                        couleur: '',
                        immatricule: '',
                        prix: '',
                        annee: ''
                    })}>
                        <FontAwesomeIcon icon={faUndo} className="me-2" /> Reset
                    </Button>
                </Card.Footer>
            </Form>
        </Card>
    );
};

export default Voiture;
