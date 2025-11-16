import { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { candidatAPI } from '@/services/api';
import { useNavigate, useLocation } from 'react-router-dom';

const FormulaireCV = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    code_postal: '',
    date_naissance: '',
    titre_poste: '',
    annees_experience: '',
    niveau_etudes: '',
    diplome: '',
    competences: '',
    langues: '',
    description: ''
  });

  useEffect(() => {
    // Charger les données existantes ou extraites
    if (location.state?.extractedData) {
      setFormData(prev => ({ ...prev, ...location.state.extractedData }));
    } else {
      loadExistingCV();
    }
  }, [location]);

  const loadExistingCV = async () => {
    try {
      const cv = await candidatAPI.getMyCV();
      if (cv) {
        setFormData(prev => ({ ...prev, ...cv }));
      }
    } catch (error) {
      console.error('Aucun CV existant');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await candidatAPI.submitCVForm(formData);
      setMessage({ 
        type: 'success', 
        text: 'CV soumis avec succès! Redirection vers la validation...' 
      });
      
      setTimeout(() => {
        navigate('/candidat/validation');
      }, 2000);
    } catch (error) {
      setMessage({ 
        type: 'danger', 
        text: error.response?.data?.message || 'Erreur lors de la soumission du CV' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="py-4">
      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">
            <i className="bi bi-file-earmark-text me-2"></i>
            Formulaire CV
          </h4>
        </Card.Header>
        <Card.Body className="p-4">
          {message.text && (
            <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
              {message.text}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <h5 className="mb-3">
              <i className="bi bi-person me-2"></i>
              Informations personnelles
            </h5>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nom *</Form.Label>
                  <Form.Control
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Prénom *</Form.Label>
                  <Form.Control
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Téléphone *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date de naissance</Form.Label>
                  <Form.Control
                    type="date"
                    name="date_naissance"
                    value={formData.date_naissance}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Ville</Form.Label>
                  <Form.Control
                    type="text"
                    name="ville"
                    value={formData.ville}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <hr className="my-4" />

            <h5 className="mb-3">
              <i className="bi bi-briefcase me-2"></i>
              Informations professionnelles
            </h5>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Titre du poste recherché *</Form.Label>
                  <Form.Control
                    type="text"
                    name="titre_poste"
                    value={formData.titre_poste}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Années d'expérience *</Form.Label>
                  <Form.Control
                    type="number"
                    name="annees_experience"
                    value={formData.annees_experience}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Niveau d'études *</Form.Label>
                  <Form.Select
                    name="niveau_etudes"
                    value={formData.niveau_etudes}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Bac">Bac</option>
                    <option value="Bac+2">Bac+2</option>
                    <option value="Bac+3">Bac+3</option>
                    <option value="Bac+5">Bac+5</option>
                    <option value="Doctorat">Doctorat</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Diplôme principal</Form.Label>
                  <Form.Control
                    type="text"
                    name="diplome"
                    value={formData.diplome}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Compétences (séparées par des virgules)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="competences"
                value={formData.competences}
                onChange={handleChange}
                placeholder="Ex: JavaScript, React, Node.js, SQL"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Langues (séparées par des virgules)</Form.Label>
              <Form.Control
                type="text"
                name="langues"
                value={formData.langues}
                onChange={handleChange}
                placeholder="Ex: Français (natif), Anglais (courant), Espagnol (intermédiaire)"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Description / Résumé professionnel</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Décrivez votre parcours et vos objectifs professionnels..."
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button 
                variant="primary" 
                size="lg" 
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Soumission en cours...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    Soumettre mon CV
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FormulaireCV;
