import { useState, useEffect } from 'react';
import { Container, Card, Alert, Button, Table } from 'react-bootstrap';
import { candidatAPI } from '@/services/api';
import { useNavigate } from 'react-router-dom';

const ValidationCV = () => {
  const [cvData, setCVData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  useEffect(() => {
    loadCVData();
  }, []);

  const loadCVData = async () => {
    try {
      const cv = await candidatAPI.getMyCV();
      setCVData(cv);
    } catch (error) {
      setMessage({ 
        type: 'danger', 
        text: 'Impossible de charger les données du CV' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async () => {
    setValidating(true);
    setMessage({ type: '', text: '' });

    try {
      await candidatAPI.validateCV();
      setMessage({ 
        type: 'success', 
        text: 'CV validé avec succès! Vous pouvez maintenant passer au quiz.' 
      });
      
      setTimeout(() => {
        navigate('/candidat/dashboard');
      }, 2000);
    } catch (error) {
      setMessage({ 
        type: 'danger', 
        text: error.response?.data?.message || 'Erreur lors de la validation' 
      });
    } finally {
      setValidating(false);
    }
  };

  const handleEdit = () => {
    navigate('/candidat/cv');
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </Container>
    );
  }

  if (!cvData) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Aucun CV à valider. Veuillez d'abord soumettre votre CV.
        </Alert>
        <Button variant="primary" onClick={() => navigate('/candidat/upload')}>
          Soumettre mon CV
        </Button>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Card className="shadow">
        <Card.Header className="bg-success text-white">
          <h4 className="mb-0">
            <i className="bi bi-clipboard-check me-2"></i>
            Validation du CV
          </h4>
        </Card.Header>
        <Card.Body className="p-4">
          {message.text && (
            <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
              {message.text}
            </Alert>
          )}

          <Alert variant="info">
            <i className="bi bi-info-circle me-2"></i>
            Veuillez vérifier attentivement vos informations avant de valider. Une fois validé, votre CV sera soumis au recruteur.
          </Alert>

          <h5 className="mb-3">
            <i className="bi bi-person me-2"></i>
            Informations personnelles
          </h5>
          <Table striped bordered hover responsive className="mb-4">
            <tbody>
              <tr>
                <td><strong>Nom complet</strong></td>
                <td>{cvData.nom} {cvData.prenom}</td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>{cvData.email}</td>
              </tr>
              <tr>
                <td><strong>Téléphone</strong></td>
                <td>{cvData.telephone}</td>
              </tr>
              <tr>
                <td><strong>Ville</strong></td>
                <td>{cvData.ville}</td>
              </tr>
              <tr>
                <td><strong>Date de naissance</strong></td>
                <td>{cvData.date_naissance}</td>
              </tr>
            </tbody>
          </Table>

          <h5 className="mb-3">
            <i className="bi bi-briefcase me-2"></i>
            Informations professionnelles
          </h5>
          <Table striped bordered hover responsive className="mb-4">
            <tbody>
              <tr>
                <td><strong>Poste recherché</strong></td>
                <td>{cvData.titre_poste}</td>
              </tr>
              <tr>
                <td><strong>Expérience</strong></td>
                <td>{cvData.annees_experience} ans</td>
              </tr>
              <tr>
                <td><strong>Niveau d'études</strong></td>
                <td>{cvData.niveau_etudes}</td>
              </tr>
              <tr>
                <td><strong>Diplôme</strong></td>
                <td>{cvData.diplome || 'Non spécifié'}</td>
              </tr>
              <tr>
                <td><strong>Compétences</strong></td>
                <td>{cvData.competences || 'Non spécifié'}</td>
              </tr>
              <tr>
                <td><strong>Langues</strong></td>
                <td>{cvData.langues || 'Non spécifié'}</td>
              </tr>
            </tbody>
          </Table>

          {cvData.description && (
            <>
              <h5 className="mb-3">
                <i className="bi bi-card-text me-2"></i>
                Description professionnelle
              </h5>
              <Card className="mb-4">
                <Card.Body>
                  <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                    {cvData.description}
                  </p>
                </Card.Body>
              </Card>
            </>
          )}

          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button 
              variant="outline-secondary" 
              size="lg"
              onClick={handleEdit}
              disabled={validating}
            >
              <i className="bi bi-pencil me-2"></i>
              Modifier
            </Button>
            <Button 
              variant="success" 
              size="lg"
              onClick={handleValidate}
              disabled={validating}
            >
              {validating ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Validation en cours...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-2"></i>
                  Valider mon CV
                </>
              )}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ValidationCV;
