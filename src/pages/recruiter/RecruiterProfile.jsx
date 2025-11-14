import { Container, Card, Row, Col, Form, Button, Badge } from 'react-bootstrap';

const RecruiterProfile = () => {
  // Mock data - à remplacer par les vraies données de votre API
  const recruiterData = {
    nom: 'Admin Recruteur',
    email: 'recruteur@virtuehire.com',
    role: 'Recruteur Principal',
    dateInscription: '15 septembre 2025',
  };

  const recentActions = [
    {
      id: 1,
      action: 'Candidat validé',
      candidat: 'Marie OBIANG',
      date: '14 nov 2025',
    },
    {
      id: 2,
      action: 'CV téléchargé',
      candidat: 'Nesta MOUGHIAMA',
      date: '14 nov 2025',
    },
    {
      id: 3,
      action: 'Candidat refusé',
      candidat: 'Sarah KOMBILA',
      date: '13 nov 2025',
    },
  ];

  return (
    <div className="bg-light min-vh-100 py-4">
      <Container className="px-4" style={{ maxWidth: '1000px' }}>
        {/* Header */}
        <div className="mb-4">
          <h1 className="display-6 fw-bold mb-2">Mon Profil</h1>
          <p className="text-muted">Gérez vos informations personnelles et votre compte</p>
        </div>

        {/* Profile Card */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Header className="bg-white border-0 py-3">
            <h5 className="mb-0">Informations du Recruteur</h5>
          </Card.Header>
          <Card.Body>
            {/* Avatar Section */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                style={{ width: '80px', height: '80px', fontSize: '1.5rem' }}
              >
                AR
              </div>
              <div>
                <h4 className="mb-1">{recruiterData.nom}</h4>
                <Badge bg="secondary">{recruiterData.role}</Badge>
              </div>
            </div>

            {/* Information Grid */}
            <Row className="g-4 pt-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="d-flex align-items-center gap-2">
                    <i className="bi bi-person"></i>
                    Nom complet
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={recruiterData.nom}
                    className="bg-light"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="d-flex align-items-center gap-2">
                    <i className="bi bi-envelope"></i>
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    defaultValue={recruiterData.email}
                    className="bg-light"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="d-flex align-items-center gap-2">
                    <i className="bi bi-briefcase"></i>
                    Rôle
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={recruiterData.role}
                    disabled
                    className="bg-light"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="d-flex align-items-center gap-2">
                    <i className="bi bi-calendar"></i>
                    Date d'inscription
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={recruiterData.dateInscription}
                    disabled
                    className="bg-light"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Action Buttons */}
            <div className="d-flex gap-3 mt-4">
              <Button variant="primary">Modifier le profil</Button>
              <Button variant="outline-primary">Changer le mot de passe</Button>
            </div>
          </Card.Body>
        </Card>

        {/* Recent Actions */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Header className="bg-white border-0 py-3">
            <h5 className="mb-0">Historique des Actions Récentes</h5>
          </Card.Header>
          <Card.Body>
            <div className="d-flex flex-column gap-3">
              {recentActions.map((action) => (
                <div
                  key={action.id}
                  className="d-flex justify-content-between align-items-center p-3 bg-light rounded"
                >
                  <div>
                    <p className="fw-semibold mb-1">{action.action}</p>
                    <small className="text-muted">{action.candidat}</small>
                  </div>
                  <Badge bg="secondary">{action.date}</Badge>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        {/* Stats Summary */}
        <Row className="g-4">
          <Col md={4}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <small className="text-muted d-block mb-1">Candidats traités</small>
                <h2 className="display-5 fw-bold mb-0">5</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <small className="text-muted d-block mb-1">Taux d'acceptation</small>
                <h2 className="display-5 fw-bold mb-0">20%</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <small className="text-muted d-block mb-1">Jours actifs</small>
                <h2 className="display-5 fw-bold mb-0">60</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RecruiterProfile;
