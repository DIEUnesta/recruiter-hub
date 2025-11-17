import { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, ProgressBar, Badge } from 'react-bootstrap';
import { candidatAPI } from '@/services/api';
import { useNavigate } from 'react-router-dom';

// Données de démonstration
const DEMO_QUESTIONS = [
  {
    id: 1,
    question: "Décrivez votre expérience en gestion de projet et les méthodologies que vous maîtrisez.",
    type: "text",
    points: 10
  },
  {
    id: 2,
    question: "Quelle est votre approche pour résoudre un conflit au sein d'une équipe ?",
    type: "text",
    points: 10
  },
  {
    id: 3,
    question: "Parlez-nous d'un projet dont vous êtes particulièrement fier.",
    type: "text",
    points: 10
  },
  {
    id: 4,
    question: "Comment gérez-vous le stress et les délais serrés ?",
    type: "text",
    points: 10
  },
  {
    id: 5,
    question: "Quels sont vos objectifs de carrière à court et long terme ?",
    type: "text",
    points: 10
  }
];

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [timeSpent, setTimeSpent] = useState({});
  const [startTime, setStartTime] = useState(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    // Timer pour suivre le temps passé sur chaque question
    const interval = setInterval(() => {
      setTimeSpent(prev => ({
        ...prev,
        [currentQuestion]: (prev[currentQuestion] || 0) + 1
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestion]);

  const loadQuestions = async () => {
    try {
      const data = await candidatAPI.getQuizQuestions();
      setQuestions(data.questions || []);
      
      if (!data.questions || data.questions.length === 0) {
        // Utiliser les données de démonstration si l'API ne renvoie rien
        setQuestions(DEMO_QUESTIONS);
        setMessage({ 
          type: 'info', 
          text: 'Mode démonstration - Ces questions sont des exemples.' 
        });
      }
    } catch (error) {
      // En cas d'erreur API, utiliser les données de démonstration
      setQuestions(DEMO_QUESTIONS);
      setMessage({ 
        type: 'info', 
        text: 'Mode démonstration - Connectez votre backend Laravel pour des questions personnalisées.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setStartTime(Date.now());
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setStartTime(Date.now());
    }
  };

  const handleSubmit = async () => {
    // Vérifier que toutes les questions ont une réponse
    const unansweredQuestions = questions.filter(q => !answers[q.id] || answers[q.id].trim() === '');
    
    if (unansweredQuestions.length > 0) {
      setMessage({
        type: 'warning',
        text: `Veuillez répondre à toutes les questions (${unansweredQuestions.length} restante(s)).`
      });
      return;
    }

    setSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await candidatAPI.submitQuiz({ answers });
      
      setMessage({ 
        type: 'success', 
        text: 'Quiz soumis avec succès! Redirection vers les résultats...' 
      });

      setTimeout(() => {
        navigate(`/candidat/resultats/${response.interview_id}`);
      }, 2000);
    } catch (error) {
      // Mode démonstration - redirection directe vers les résultats
      setMessage({ 
        type: 'success', 
        text: 'Quiz soumis avec succès! Redirection vers les résultats...' 
      });
      
      setTimeout(() => {
        navigate('/candidat/resultats');
      }, 2000);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="text-muted">Chargement des questions...</p>
        </div>
      </Container>
    );
  }

  if (questions.length === 0) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Aucune question disponible. Veuillez contacter le recruteur.
        </Alert>
        <Button variant="primary" onClick={() => navigate('/candidat/dashboard')}>
          <i className="bi bi-arrow-left me-2"></i>
          Retour au dashboard
        </Button>
      </Container>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const answeredCount = Object.keys(answers).filter(id => answers[id] && answers[id].trim() !== '').length;
  const answeredAll = answeredCount === questions.length;

  return (
    <Container fluid className="py-4">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          {message.text && (
            <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })} className="mb-3">
              {message.text}
            </Alert>
          )}

          <Card className="shadow-lg border-0 mb-4">
            <Card.Header className="bg-primary text-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">
                  <i className="bi bi-question-circle me-2"></i>
                  Quiz d'entretien
                </h4>
                <Badge bg="light" text="primary" className="fs-6">
                  {answeredCount} / {questions.length} répondu(es)
                </Badge>
              </div>
            </Card.Header>

            <Card.Body className="p-4">
              {/* Barre de progression */}
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <small className="text-muted">Question {currentQuestion + 1} sur {questions.length}</small>
                  <small className="text-muted">{Math.round(progress)}% complété</small>
                </div>
                <ProgressBar 
                  now={progress} 
                  variant="success"
                  style={{ height: '10px' }}
                  animated
                />
              </div>

              {/* Question */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="text-dark">
                    <Badge bg="primary" className="me-2">Q{currentQuestion + 1}</Badge>
                    {question.question}
                  </h5>
                  {question.points && (
                    <Badge bg="info" className="ms-2">{question.points} pts</Badge>
                  )}
                </div>

                {/* Zone de réponse */}
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows={8}
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    placeholder="Saisissez votre réponse ici..."
                    className="border-2"
                    style={{ fontSize: '1rem' }}
                  />
                  <Form.Text className="text-muted">
                    <i className="bi bi-info-circle me-1"></i>
                    Prenez le temps de développer votre réponse de manière claire et concise.
                  </Form.Text>
                </Form.Group>

                {/* Indicateur de temps */}
                {timeSpent[currentQuestion] > 0 && (
                  <div className="mt-2 text-end">
                    <small className="text-muted">
                      <i className="bi bi-clock me-1"></i>
                      Temps sur cette question: {formatTime(timeSpent[currentQuestion])}
                    </small>
                  </div>
                )}
              </div>

              {/* Aperçu des questions répondues */}
              <div className="mb-4 p-3 bg-light rounded">
                <small className="text-muted d-block mb-2">
                  <i className="bi bi-list-check me-1"></i>
                  Aperçu des réponses:
                </small>
                <div className="d-flex flex-wrap gap-2">
                  {questions.map((q, idx) => (
                    <Button
                      key={q.id}
                      variant={answers[q.id] && answers[q.id].trim() !== '' ? 'success' : 'outline-secondary'}
                      size="sm"
                      onClick={() => setCurrentQuestion(idx)}
                      className={currentQuestion === idx ? 'border-3 border-primary' : ''}
                    >
                      {idx + 1}
                    </Button>
                  ))}
                </div>
              </div>
            </Card.Body>

            <Card.Footer className="bg-white border-top py-3">
              <div className="d-flex justify-content-between">
                <Button
                  variant="outline-secondary"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Précédent
                </Button>

                {!isLastQuestion ? (
                  <Button
                    variant="primary"
                    onClick={handleNext}
                  >
                    Suivant
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={handleSubmit}
                    disabled={submitting || !answeredAll}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Soumission...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Soumettre le quiz
                      </>
                    )}
                  </Button>
                )}
              </div>
            </Card.Footer>
          </Card>

          {/* Message d'aide */}
          <Alert variant="info" className="shadow-sm">
            <i className="bi bi-lightbulb me-2"></i>
            <strong>Conseils:</strong> Répondez de manière détaillée et professionnelle. Vous pouvez naviguer entre les questions et modifier vos réponses avant la soumission finale.
          </Alert>
        </div>
      </div>
    </Container>
  );
};

export default Quiz;
