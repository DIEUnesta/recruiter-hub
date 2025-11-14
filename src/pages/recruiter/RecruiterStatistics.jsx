import { Container, Card, Row, Col, ProgressBar } from 'react-bootstrap';

const RecruiterStatistics = () => {
  return (
    <div className="bg-light min-vh-100 py-4">
      <Container fluid className="px-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="display-6 fw-bold mb-2">Statistiques Globales</h1>
          <p className="text-muted">Vue d'ensemble des performances de recrutement</p>
        </div>

        {/* Key Metrics */}
        <Row className="g-4 mb-4">
          <Col xs={12} sm={6} lg={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <small className="text-muted d-block mb-1">Score moyen</small>
                    <h2 className="display-5 fw-bold mb-0">75%</h2>
                  </div>
                  <div className="bg-primary bg-opacity-10 rounded p-3">
                    <i className="bi bi-award text-primary fs-3"></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <small className="text-muted d-block mb-1">Taux de réussite</small>
                    <h2 className="display-5 fw-bold mb-0">60%</h2>
                  </div>
                  <div className="bg-success bg-opacity-10 rounded p-3">
                    <i className="bi bi-graph-up text-success fs-3"></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <small className="text-muted d-block mb-1">Total candidats</small>
                    <h2 className="display-5 fw-bold mb-0">5</h2>
                  </div>
                  <div className="bg-purple bg-opacity-10 rounded p-3">
                    <i className="bi bi-people text-purple fs-3"></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <small className="text-muted d-block mb-1">Compétences évaluées</small>
                    <h2 className="display-5 fw-bold mb-0">12</h2>
                  </div>
                  <div className="bg-warning bg-opacity-10 rounded p-3">
                    <i className="bi bi-bar-chart text-warning fs-3"></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Charts Section */}
        <Row className="g-4 mb-4">
          <Col lg={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white border-0 py-3">
                <h5 className="mb-0">Répartition par Méthode de Soumission</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <small className="fw-semibold">PDF Upload</small>
                    <small className="fw-bold">60% (3)</small>
                  </div>
                  <ProgressBar now={60} variant="primary" style={{ height: '12px' }} />
                </div>
                <div>
                  <div className="d-flex justify-content-between mb-2">
                    <small className="fw-semibold">Formulaire Manuel</small>
                    <small className="fw-bold">40% (2)</small>
                  </div>
                  <ProgressBar now={40} variant="warning" style={{ height: '12px' }} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white border-0 py-3">
                <h5 className="mb-0">Compétences les Plus Recherchées</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <small className="fw-semibold">React</small>
                    <small className="fw-bold">90%</small>
                  </div>
                  <ProgressBar now={90} variant="purple" style={{ height: '12px' }} />
                </div>
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <small className="fw-semibold">Laravel</small>
                    <small className="fw-bold">75%</small>
                  </div>
                  <ProgressBar now={75} variant="success" style={{ height: '12px' }} />
                </div>
                <div>
                  <div className="d-flex justify-content-between mb-2">
                    <small className="fw-semibold">MySQL</small>
                    <small className="fw-bold">65%</small>
                  </div>
                  <ProgressBar now={65} variant="primary" style={{ height: '12px' }} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Score Distribution */}
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-white border-0 py-3">
            <h5 className="mb-0">Distribution des Scores par Compétence</h5>
          </Card.Header>
          <Card.Body>
            <div className="mb-4">
              <div className="d-flex justify-content-between mb-2">
                <small className="fw-semibold">Compétences Techniques</small>
                <small className="fw-bold">Score moyen: 85%</small>
              </div>
              <ProgressBar now={85} variant="primary" style={{ height: '16px' }} />
            </div>
            <div className="mb-4">
              <div className="d-flex justify-content-between mb-2">
                <small className="fw-semibold">Communication</small>
                <small className="fw-bold">Score moyen: 78%</small>
              </div>
              <ProgressBar now={78} variant="success" style={{ height: '16px' }} />
            </div>
            <div>
              <div className="d-flex justify-content-between mb-2">
                <small className="fw-semibold">Résolution de Problèmes</small>
                <small className="fw-bold">Score moyen: 72%</small>
              </div>
              <ProgressBar now={72} variant="purple" style={{ height: '16px' }} />
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default RecruiterStatistics;
