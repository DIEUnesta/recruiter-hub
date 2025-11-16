import { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, ProgressBar } from 'react-bootstrap';
import { candidatAPI } from '@/services/api';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const data = await candidatAPI.getQuizQuestions();
      setQuestions(data.questions || []);
      
      if (!data.questions || data.questions.length === 0) {
        setMessage({ 
          type: 'warning', 
          text: 'Aucune question disponible pour le moment.' 
        });
      }
    } catch (error) {
      setMessage({ 
        type: 'danger', 
        text: error.response?.data?.message || 'Erreur lors du chargement des questions' 
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
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
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
      setMessage({ 
        type: 'danger', 
        text: error.response?.data?.message || 'Erreur lors de la soumission du quiz' 
      });
    } finally {
      setSubmitting(false);
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

  if (questions.length === 0) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Aucune question disponible. Veuillez contacter le recruteur.
        </Alert>
        <Button variant="primary" onClick={() => navigate('/candidat/dashboard')}>
          Retour au dashboard
        </Button>
      </Container>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const answeredAll = Object.keys(answers).length === questions.length;

  return (
    <Container fluid className="py-4">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">
                  <i className="bi bi-question-circle me-2"></i>
                  Quiz d'entretien
                </h4>
                <span className="badge bg-light text-primary">
                  Question {currentQuestion + 1} / {questions.length}
                </span>
              </div>
            </Card.Header>
            <Card.Body className="p-4">
              {message.text && (
                <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
                  {message.text}
                </Alert>
              )}

              <ProgressBar 
                now={progress} 
                label={`${Math.round(progress)}%`}
                className="mb-4"
                variant="primary"
              />

              <div className="mb-4">
                <h5 className="mb-3">
                  <span className="badge bg-primary me-2">{currentQuestion + 1}</span>
                  {question.question}
                </h5>

                {question.type === 'multiple_choice' ? (
                  <Form.Group>
                    {question.options.map((option, index) => (
                      <Form.Check
                        key={index}
                        type="radio"
                        id={`question-${question.id}-option-${index}`}
                        name={`question-${question.id}`}
                        label={option}
                        value={option}
                        checked={answers[question.id] === option}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        className="mb-3 p-3 border rounded"
                      />
                    ))}
                  </Form.Group>
                ) : (
                  <Form.Group>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      value={answers[question.id] || ''}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      placeholder="Saisissez votre réponse ici..."
                    />
                  </Form.Group>
                )}
              </div>

              <div className="d-flex justify-content-between">
                <Button 
                  variant="outline-secondary"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0 || submitting}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Précédent
                </Button>

                {isLastQuestion ? (
                  <Button 
                    variant="success"
                    onClick={handleSubmit}
                    disabled={!answeredAll || submitting}
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
                ) : (
                  <Button 
                    variant="primary"
                    onClick={handleNext}
                    disabled={submitting}
                  >
                    Suivant
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Button>
                )}
              </div>

              {!answeredAll && isLastQuestion && (
                <Alert variant="warning" className="mt-3 mb-0">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Veuillez répondre à toutes les questions avant de soumettre.
                </Alert>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Quiz;
