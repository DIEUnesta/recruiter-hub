import { useState } from 'react';
import { Container, Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import CandidateTable from '../../components/recruiter/CandidateTable';
import CandidateDetailsModal from '../../components/recruiter/CandidateDetailsModal';

const RecruiterCandidates = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleViewDetails = (candidate) => {
    setSelectedCandidate(candidate);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCandidate(null);
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <Container fluid className="px-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="display-6 fw-bold mb-2">Liste Complète des Candidats</h1>
          <p className="text-muted">Recherchez et filtrez tous les candidats</p>
        </div>

        {/* Search and Filters */}
        <Row className="g-3 mb-4">
          <Col md={4}>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <Form.Control
                placeholder="Rechercher par nom, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={3}>
            <Form.Select>
              <option value="all">Tous les scores</option>
              <option value="high">Score élevé (≥ 80%)</option>
              <option value="medium">Score moyen (60-79%)</option>
              <option value="low">Score faible (&lt; 60%)</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select>
              <option value="all">Toutes les méthodes</option>
              <option value="pdf">PDF</option>
              <option value="form">Formulaire</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button variant="outline-primary" className="w-100">
              <i className="bi bi-filter me-2"></i>
              Plus de filtres
            </Button>
          </Col>
        </Row>

        {/* Candidates Table */}
        <CandidateTable onViewDetails={handleViewDetails} />

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <small className="text-muted">Affichage de 1 à 3 sur 3 candidats</small>
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" size="sm" disabled>
              Précédent
            </Button>
            <Button variant="outline-secondary" size="sm" disabled>
              Suivant
            </Button>
          </div>
        </div>
      </Container>

      {/* Details Modal */}
      <CandidateDetailsModal
        candidate={selectedCandidate}
        show={showModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default RecruiterCandidates;
