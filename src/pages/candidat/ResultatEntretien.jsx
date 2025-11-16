import { useState, useEffect } from 'react';
import { Container, Card, Alert, Button, Table, Badge, Row, Col } from 'react-bootstrap';
import { candidatAPI } from '@/services/api';
import { useParams, useNavigate } from 'react-router-dom';

const ResultatEntretien = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (id) {
      loadResult();
    } else {
      loadLatestResult();
    }
  }, [id]);

  const loadResult = async () => {
    try {
      const data = await candidatAPI.getInterviewResult(id);
      setResult(data);
    } catch (error) {
      setMessage({ 
        type: 'danger', 
        text: 'Impossible de charger les résultats' 
      });
    } finally {
      setLoading(false);
    }
  };

  const loadLatestResult = async () => {
    try {
      const data = await candidatAPI.getLastInterview();
      setResult(data);
    } catch (error) {
      setMessage({ 
        type: 'warning', 
        text: 'Aucun résultat disponible' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadXML = async () => {
    try {
      const blob = await candidatAPI.downloadInterviewXML(result.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `entretien_${result.id}.xml`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      setMessage({ 
        type: 'danger', 
        text: 'Erreur lors du téléchargement du XML' 
      });
    }
  };

  const getScoreBadge = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'primary';
    if (score >= 40) return 'warning';
    return 'danger';
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
        return <Badge bg="success">Accepté</Badge>;
      case 'rejected':
        return <Badge bg="danger">Rejeté</Badge>;
      default:
        return <Badge bg="warning">En attente</Badge>;
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

  if (!result) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Aucun résultat disponible. Veuillez d'abord passer le quiz.
        </Alert>
        <Button variant="primary" onClick={() => navigate('/candidat/quiz')}>
          Passer le quiz
        </Button>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Card className="shadow mb-4">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">
            <i className="bi bi-clipboard-check me-2"></i>
            Résultats de l'entretien
          </h4>
        </Card.Header>
        <Card.Body className="p-4">
          {message.text && (
            <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
              {message.text}
            </Alert>
          )}

          <Row className="mb-4">
            <Col md={4}>
              <Card className="text-center h-100 border-primary">
                <Card.Body>
                  <h6 className="text-muted mb-2">Score Global</h6>
                  <h1 className={`display-3 text-${getScoreBadge(result.score)}`}>
                    {result.score}
                  </h1>
                  <p className="text-muted mb-0">/ 100</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center h-100">
                <Card.Body>
                  <h6 className="text-muted mb-3">Statut</h6>
                  <div className="mb-3">
                    {getStatusBadge(result.status)}
                  </div>
                  <p className="text-muted small mb-0">
                    Date: {new Date(result.created_at).toLocaleDateString()}
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center h-100">
                <Card.Body>
                  <h6 className="text-muted mb-3">Actions</h6>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={handleDownloadXML}
                    className="mb-2 w-100"
                  >
                    <i className="bi bi-download me-2"></i>
                    Télécharger XML
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => navigate('/candidat/dashboard')}
                    className="w-100"
                  >
                    <i className="bi bi-house me-2"></i>
                    Dashboard
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {result.feedback && (
            <Alert variant="info">
              <h6 className="alert-heading">
                <i className="bi bi-chat-left-text me-2"></i>
                Feedback du recruteur
              </h6>
              <p className="mb-0">{result.feedback}</p>
            </Alert>
          )}

          {result.questions && result.questions.length > 0 && (
            <>
              <h5 className="mb-3">
                <i className="bi bi-list-check me-2"></i>
                Détails des réponses
              </h5>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Question</th>
                    <th>Votre réponse</th>
                    <th className="text-center">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {result.questions.map((q, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{q.question}</td>
                      <td>{q.user_answer}</td>
                      <td className="text-center">
                        <Badge bg={getScoreBadge(q.score)}>
                          {q.score}/10
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ResultatEntretien;
