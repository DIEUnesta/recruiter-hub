import { useState, useEffect } from 'react';
import { Container, Card, Alert, Button, Table, Badge, Row, Col, ProgressBar } from 'react-bootstrap';
import { candidatAPI } from '@/services/api';
import { useParams, useNavigate } from 'react-router-dom';

// Données de démonstration
const DEMO_RESULT = {
  id: 1,
  candidate_name: "Candidat Démo",
  position: "Développeur Full Stack",
  date: new Date().toLocaleDateString('fr-FR'),
  status: "pending",
  score: 78,
  total_score: 100,
  duration: "32 minutes",
  answers: [
    {
      question: "Décrivez votre expérience en gestion de projet et les méthodologies que vous maîtrisez.",
      answer: "J'ai travaillé sur plusieurs projets utilisant la méthodologie Agile/Scrum...",
      score: 8,
      max_score: 10,
      feedback: "Bonne compréhension des méthodologies agiles"
    },
    {
      question: "Quelle est votre approche pour résoudre un conflit au sein d'une équipe ?",
      answer: "Je privilégie toujours la communication ouverte et l'écoute active...",
      score: 9,
      max_score: 10,
      feedback: "Excellente approche collaborative"
    },
    {
      question: "Parlez-nous d'un projet dont vous êtes particulièrement fier.",
      answer: "J'ai développé une application web complète qui a permis d'automatiser...",
      score: 7,
      max_score: 10,
      feedback: "Bon exemple, pourrait être plus détaillé"
    },
    {
      question: "Comment gérez-vous le stress et les délais serrés ?",
      answer: "Je m'organise en priorisant les tâches et en utilisant des techniques de time-boxing...",
      score: 8,
      max_score: 10,
      feedback: "Méthodes efficaces de gestion du temps"
    },
    {
      question: "Quels sont vos objectifs de carrière à court et long terme ?",
      answer: "À court terme, je souhaite renforcer mes compétences techniques...",
      score: 7,
      max_score: 10,
      feedback: "Objectifs clairs et réalistes"
    }
  ],
  strengths: [
    "Communication efficace",
    "Compétences techniques solides",
    "Esprit d'équipe",
    "Capacité d'adaptation"
  ],
  areas_improvement: [
    "Approfondir l'expérience en gestion de projet",
    "Développer les compétences en leadership"
  ],
  recruiter_notes: "Candidat prometteur avec un bon potentiel. Profil technique solide et bonnes soft skills."
};

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
      // Utiliser les données de démonstration
      setResult(DEMO_RESULT);
      setMessage({ 
        type: 'info', 
        text: 'Mode démonstration - Connectez votre backend Laravel pour voir vos vrais résultats.' 
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
      // Utiliser les données de démonstration
      setResult(DEMO_RESULT);
      setMessage({ 
        type: 'info', 
        text: 'Mode démonstration - Ceci est un exemple de résultat d\'entretien.' 
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
        type: 'warning', 
        text: 'Téléchargement XML disponible uniquement avec le backend connecté.' 
      });
    }
  };

  const getScoreBadge = (score) => {
    const percentage = (score / result.total_score) * 100;
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'primary';
    if (percentage >= 40) return 'warning';
    return 'danger';
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
        return <Badge bg="success"><i className="bi bi-check-circle me-1"></i>Accepté</Badge>;
      case 'rejected':
        return <Badge bg="danger"><i className="bi bi-x-circle me-1"></i>Rejeté</Badge>;
      default:
        return <Badge bg="warning"><i className="bi bi-clock me-1"></i>En attente</Badge>;
    }
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="text-muted">Chargement des résultats...</p>
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
          <i className="bi bi-play-circle me-2"></i>
          Passer le quiz
        </Button>
      </Container>
    );
  }

  const scorePercentage = (result.score / result.total_score) * 100;

  return (
    <Container fluid className="py-4">
      {message.text && (
        <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })} className="mb-3">
          {message.text}
        </Alert>
      )}

      {/* En-tête avec score global */}
      <Card className="shadow-lg border-0 mb-4">
        <Card.Header className="bg-primary text-white py-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-1">
                <i className="bi bi-clipboard-check me-2"></i>
                Résultats de l'entretien
              </h4>
              <small>{result.position} - {result.date}</small>
            </div>
            {getStatusBadge(result.status)}
          </div>
        </Card.Header>

        <Card.Body className="p-4">
          <Row className="mb-4">
            {/* Score global */}
            <Col md={4}>
              <Card className="text-center h-100 border-0 bg-light">
                <Card.Body className="py-4">
                  <div className="mb-3">
                    <i className="bi bi-trophy text-warning" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h2 className="mb-2">
                    <Badge bg={getScoreBadge(result.score)} className="fs-3">
                      {result.score}/{result.total_score}
                    </Badge>
                  </h2>
                  <p className="text-muted mb-2">Score global</p>
                  <ProgressBar 
                    now={scorePercentage} 
                    variant={getScoreBadge(result.score)}
                    className="mb-2"
                    style={{ height: '8px' }}
                  />
                  <small className="text-muted">{Math.round(scorePercentage)}%</small>
                </Card.Body>
              </Card>
            </Col>

            {/* Durée */}
            <Col md={4}>
              <Card className="text-center h-100 border-0 bg-light">
                <Card.Body className="py-4">
                  <div className="mb-3">
                    <i className="bi bi-clock text-primary" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h3 className="mb-2">{result.duration}</h3>
                  <p className="text-muted mb-0">Durée totale</p>
                </Card.Body>
              </Card>
            </Col>

            {/* Nombre de questions */}
            <Col md={4}>
              <Card className="text-center h-100 border-0 bg-light">
                <Card.Body className="py-4">
                  <div className="mb-3">
                    <i className="bi bi-question-circle text-info" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h3 className="mb-2">{result.answers?.length || 0}</h3>
                  <p className="text-muted mb-0">Questions traitées</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Détails des réponses */}
      <Card className="shadow mb-4">
        <Card.Header className="bg-white border-bottom">
          <h5 className="mb-0">
            <i className="bi bi-list-check me-2"></i>
            Détail des réponses
          </h5>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0">
            <thead className="bg-light">
              <tr>
                <th style={{ width: '5%' }}>#</th>
                <th style={{ width: '40%' }}>Question</th>
                <th style={{ width: '35%' }}>Votre réponse</th>
                <th style={{ width: '10%' }} className="text-center">Score</th>
                <th style={{ width: '10%' }}>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {result.answers?.map((item, index) => (
                <tr key={index}>
                  <td className="text-center">
                    <Badge bg="secondary">{index + 1}</Badge>
                  </td>
                  <td>
                    <strong>{item.question}</strong>
                  </td>
                  <td>
                    <small className="text-muted">{item.answer?.substring(0, 100)}...</small>
                  </td>
                  <td className="text-center">
                    <Badge bg={item.score >= item.max_score * 0.8 ? 'success' : item.score >= item.max_score * 0.6 ? 'primary' : 'warning'}>
                      {item.score}/{item.max_score}
                    </Badge>
                  </td>
                  <td>
                    <small className="text-muted">
                      {item.feedback ? (
                        <>
                          <i className="bi bi-chat-left-text me-1"></i>
                          {item.feedback}
                        </>
                      ) : (
                        <span className="text-muted fst-italic">En attente</span>
                      )}
                    </small>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Row>
        {/* Points forts */}
        <Col md={6}>
          <Card className="shadow mb-4 h-100">
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">
                <i className="bi bi-star me-2"></i>
                Points forts
              </h5>
            </Card.Header>
            <Card.Body>
              {result.strengths && result.strengths.length > 0 ? (
                <ul className="list-unstyled mb-0">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="mb-2">
                      <i className="bi bi-check-circle text-success me-2"></i>
                      {strength}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted mb-0">Aucun point fort spécifié.</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Axes d'amélioration */}
        <Col md={6}>
          <Card className="shadow mb-4 h-100">
            <Card.Header className="bg-warning text-dark">
              <h5 className="mb-0">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Axes d'amélioration
              </h5>
            </Card.Header>
            <Card.Body>
              {result.areas_improvement && result.areas_improvement.length > 0 ? (
                <ul className="list-unstyled mb-0">
                  {result.areas_improvement.map((area, index) => (
                    <li key={index} className="mb-2">
                      <i className="bi bi-arrow-up-circle text-warning me-2"></i>
                      {area}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted mb-0">Aucun axe d'amélioration spécifié.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Notes du recruteur */}
      {result.recruiter_notes && (
        <Card className="shadow mb-4">
          <Card.Header className="bg-info text-white">
            <h5 className="mb-0">
              <i className="bi bi-chat-square-quote me-2"></i>
              Notes du recruteur
            </h5>
          </Card.Header>
          <Card.Body>
            <p className="mb-0">{result.recruiter_notes}</p>
          </Card.Body>
        </Card>
      )}

      {/* Actions */}
      <div className="d-flex gap-2 justify-content-between">
        <Button variant="outline-primary" onClick={() => navigate('/candidat/dashboard')}>
          <i className="bi bi-arrow-left me-2"></i>
          Retour au dashboard
        </Button>
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" onClick={handleDownloadXML}>
            <i className="bi bi-download me-2"></i>
            Télécharger (XML)
          </Button>
          <Button variant="primary" onClick={() => navigate('/candidat/quiz')}>
            <i className="bi bi-arrow-repeat me-2"></i>
            Repasser le quiz
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ResultatEntretien;
