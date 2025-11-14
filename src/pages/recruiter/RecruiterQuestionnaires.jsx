import { Container, Card, Row, Col, Button, Badge } from 'react-bootstrap';

const RecruiterQuestionnaires = () => {
  const questionnaires = [
    {
      id: 1,
      titre: 'Quiz Développement Web',
      competence: 'React & Laravel',
      questions: 15,
      duree: '20 min',
      utilise: 3,
    },
    {
      id: 2,
      titre: 'Quiz Base de Données',
      competence: 'MySQL',
      questions: 12,
      duree: '15 min',
      utilise: 2,
    },
    {
      id: 3,
      titre: 'Quiz Compétences Générales',
      competence: 'Communication',
      questions: 10,
      duree: '12 min',
      utilise: 5,
    },
  ];

  return (
    <div className="bg-light min-vh-100 py-4">
      <Container fluid className="px-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="display-6 fw-bold mb-2">Questionnaires</h1>
            <p className="text-muted mb-0">Gérez les quiz d'entretien pour les candidats</p>
          </div>
          <Button variant="primary" className="d-flex align-items-center gap-2">
            <i className="bi bi-plus-lg"></i>
            Nouveau Quiz
          </Button>
        </div>

        {/* Stats Cards */}
        <Row className="g-4 mb-4">
          <Col md={4}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <small className="text-muted d-block mb-1">Total Quiz</small>
                    <h2 className="display-5 fw-bold mb-0">3</h2>
                  </div>
                  <div className="bg-primary bg-opacity-10 rounded p-3">
                    <i className="bi bi-file-text text-primary fs-3"></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <small className="text-muted d-block mb-1">Questions Totales</small>
                    <h2 className="display-5 fw-bold mb-0">37</h2>
                  </div>
                  <div className="bg-purple bg-opacity-10 rounded p-3">
                    <i className="bi bi-file-text text-purple fs-3"></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <small className="text-muted d-block mb-1">Durée Moyenne</small>
                    <h2 className="display-5 fw-bold mb-0">16m</h2>
                  </div>
                  <div className="bg-warning bg-opacity-10 rounded p-3">
                    <i className="bi bi-clock text-warning fs-3"></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Questionnaires Grid */}
        <Row className="g-4">
          {questionnaires.map((quiz) => (
            <Col key={quiz.id} md={6} lg={4}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Header className="bg-white border-0 py-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <h5 className="mb-0">{quiz.titre}</h5>
                    <Badge bg="secondary">{quiz.utilise} fois</Badge>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="mb-3">
                    <small className="text-muted d-block mb-1">Compétence</small>
                    <Badge bg="primary" className="bg-opacity-10 text-primary">
                      {quiz.competence}
                    </Badge>
                  </div>
                  <div className="d-flex gap-3 text-muted small mb-3">
                    <div className="d-flex align-items-center gap-1">
                      <i className="bi bi-file-text"></i>
                      {quiz.questions} questions
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <i className="bi bi-clock"></i>
                      {quiz.duree}
                    </div>
                  </div>
                  <div className="d-flex gap-2 pt-2">
                    <Button variant="outline-primary" size="sm" className="flex-fill">
                      Modifier
                    </Button>
                    <Button variant="outline-secondary" size="sm" className="flex-fill">
                      Aperçu
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default RecruiterQuestionnaires;
