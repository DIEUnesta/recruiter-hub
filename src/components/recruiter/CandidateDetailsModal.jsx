import { Modal, Button, Badge, Row, Col } from 'react-bootstrap';

const CandidateDetailsModal = ({ candidate, show, onClose }) => {
  if (!candidate) return null;

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Détails du Candidat</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <h5 className="fw-bold mb-3">Informations Personnelles</h5>
          <div className="bg-light p-3 rounded">
            <Row>
              <Col md={6} className="mb-3">
                <small className="text-muted d-block">Nom complet</small>
                <span className="fw-semibold">{candidate.nom}</span>
              </Col>
              <Col md={6} className="mb-3">
                <small className="text-muted d-block">Email</small>
                <span className="fw-semibold">{candidate.email}</span>
              </Col>
              <Col md={6} className="mb-3">
                <small className="text-muted d-block">Téléphone</small>
                <span className="fw-semibold">{candidate.telephone}</span>
              </Col>
              <Col md={6} className="mb-3">
                <small className="text-muted d-block">Méthode de soumission</small>
                <Badge bg="secondary">{candidate.methode}</Badge>
              </Col>
            </Row>
          </div>
        </div>

        <hr />

        <div className="mb-4">
          <h5 className="fw-bold mb-3">CV et Expérience</h5>
          <div className="bg-light p-3 rounded">
            <div className="mb-3">
              <small className="text-muted d-block mb-1">Expérience professionnelle</small>
              <p className="mb-0 small">
                Développeur Full Stack • 3 ans d'expérience • Spécialisé en React et Laravel
              </p>
            </div>
            <div className="mb-3">
              <small className="text-muted d-block mb-1">Diplôme</small>
              <p className="mb-0 small">Licence 3 Informatique - INPTIC</p>
            </div>
            <div>
              <small className="text-muted d-block mb-2">Compétences</small>
              <div className="d-flex flex-wrap gap-2">
                <Badge bg="primary">React</Badge>
                <Badge bg="primary">Laravel</Badge>
                <Badge bg="primary">MySQL</Badge>
                <Badge bg="primary">TypeScript</Badge>
                <Badge bg="primary">TailwindCSS</Badge>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="mb-4">
          <h5 className="fw-bold mb-3">Résultats de l'Entretien</h5>
          <div className="bg-light p-3 rounded">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <small className="text-muted">Score global</small>
              <Badge 
                bg={candidate.score >= 60 ? 'primary' : 'danger'}
                className="fs-6 px-3 py-2"
              >
                {candidate.score}%
              </Badge>
            </div>
            <div className="mb-3">
              <small className="text-muted d-block mb-1">Date de passage</small>
              <p className="mb-0 small">14 novembre 2025</p>
            </div>
            <div>
              <small className="text-muted d-block mb-2">Détails par compétence</small>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-between small">
                  <span>Compétences techniques</span>
                  <span className="fw-semibold">90%</span>
                </div>
                <div className="d-flex justify-content-between small">
                  <span>Communication</span>
                  <span className="fw-semibold">85%</span>
                </div>
                <div className="d-flex justify-content-between small">
                  <span>Résolution de problèmes</span>
                  <span className="fw-semibold">80%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" className="d-flex align-items-center gap-2">
          <i className="bi bi-download"></i>
          Télécharger CV (XML)
        </Button>
        <Button variant="outline-primary" className="d-flex align-items-center gap-2">
          <i className="bi bi-download"></i>
          Télécharger Rapport (XML)
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CandidateDetailsModal;
