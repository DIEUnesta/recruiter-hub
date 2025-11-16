import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import { candidatAPI } from '@/services/api';

const CandidatDashboard = () => {
  const [user, setUser] = useState(null);
  const [cv, setCV] = useState(null);
  const [lastInterview, setLastInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [userData, cvData, interviewData] = await Promise.all([
        candidatAPI.getUserInfo(),
        candidatAPI.getMyCV(),
        candidatAPI.getLastInterview()
      ]);
      
      setUser(userData);
      setCV(cvData);
      setLastInterview(interviewData);
    } catch (error) {
      console.error('Erreur chargement dashboard:', error);
    } finally {
      setLoading(false);
    }
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

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">
        <i className="bi bi-speedometer2 me-2"></i>
        Tableau de bord
      </h2>

      {user && (
        <Alert variant="info" className="mb-4">
          <h5 className="alert-heading">
            <i className="bi bi-person-circle me-2"></i>
            Bienvenue, {user.name}!
          </h5>
          <p className="mb-0">{user.email}</p>
        </Alert>
      )}

      <Row className="g-4">
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <i className="bi bi-file-earmark-text me-2"></i>
              Statut CV
            </Card.Header>
            <Card.Body>
              {cv ? (
                <>
                  <h5 className="text-success">
                    <i className="bi bi-check-circle me-2"></i>
                    CV soumis
                  </h5>
                  <p className="mb-2"><strong>Date:</strong> {new Date(cv.created_at).toLocaleDateString()}</p>
                  <p className="mb-2"><strong>Statut:</strong> 
                    <span className={`badge ms-2 ${cv.status === 'validated' ? 'bg-success' : 'bg-warning'}`}>
                      {cv.status === 'validated' ? 'Validé' : 'En attente'}
                    </span>
                  </p>
                  <Button variant="outline-primary" size="sm" href="/candidat/cv">
                    Voir mon CV
                  </Button>
                </>
              ) : (
                <>
                  <h5 className="text-warning">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    Aucun CV
                  </h5>
                  <p>Vous n'avez pas encore soumis votre CV.</p>
                  <Button variant="primary" href="/candidat/upload">
                    Soumettre mon CV
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-success text-white">
              <i className="bi bi-chat-dots me-2"></i>
              Dernier entretien
            </Card.Header>
            <Card.Body>
              {lastInterview ? (
                <>
                  <h5 className="text-success">
                    <i className="bi bi-check-circle me-2"></i>
                    Entretien complété
                  </h5>
                  <p className="mb-2"><strong>Date:</strong> {new Date(lastInterview.created_at).toLocaleDateString()}</p>
                  <p className="mb-2"><strong>Score:</strong> 
                    <span className="badge bg-primary ms-2">{lastInterview.score}/100</span>
                  </p>
                  <Button variant="outline-success" size="sm" href={`/candidat/resultats/${lastInterview.id}`}>
                    Voir les résultats
                  </Button>
                </>
              ) : (
                <>
                  <h5 className="text-info">
                    <i className="bi bi-info-circle me-2"></i>
                    Aucun entretien
                  </h5>
                  <p>Vous n'avez pas encore passé d'entretien.</p>
                  <Button variant="success" href="/candidat/quiz" disabled={!cv}>
                    Commencer un quiz
                  </Button>
                  {!cv && (
                    <small className="d-block mt-2 text-muted">
                      Soumettez d'abord votre CV pour accéder au quiz
                    </small>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-dark text-white">
              <i className="bi bi-list-check me-2"></i>
              Prochaines étapes
            </Card.Header>
            <Card.Body>
              <ol className="mb-0">
                <li className={cv ? 'text-success' : ''}>
                  {cv ? <i className="bi bi-check-circle me-2"></i> : <i className="bi bi-circle me-2"></i>}
                  Soumettre votre CV
                </li>
                <li className={cv?.status === 'validated' ? 'text-success' : ''}>
                  {cv?.status === 'validated' ? <i className="bi bi-check-circle me-2"></i> : <i className="bi bi-circle me-2"></i>}
                  Attendre la validation du CV
                </li>
                <li className={lastInterview ? 'text-success' : ''}>
                  {lastInterview ? <i className="bi bi-check-circle me-2"></i> : <i className="bi bi-circle me-2"></i>}
                  Passer le quiz d'entretien
                </li>
                <li>
                  <i className="bi bi-circle me-2"></i>
                  Consulter vos résultats
                </li>
              </ol>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CandidatDashboard;
