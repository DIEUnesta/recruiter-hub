import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import StatsCard from '../../components/recruiter/StatsCard';
import ActivityFeed from '../../components/recruiter/ActivityFeed';
import SystemStats from '../../components/recruiter/SystemStats';
import CandidateTable from '../../components/recruiter/CandidateTable';
import CandidateDetailsModal from '../../components/recruiter/CandidateDetailsModal';

const RecruiterDashboard = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
          <h1 className="display-6 fw-bold mb-2">Panneau de Recrutement</h1>
          <p className="text-muted">Gestion complète des candidatures VirtueHire</p>
        </div>

        {/* Stats Cards */}
        <Row className="g-4 mb-4">
          <Col xs={12} sm={6} lg={3}>
            <StatsCard
              title="Total Candidatures"
              value={5}
              icon="bi-people"
              color="purple"
            />
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <StatsCard
              title="En Attente"
              value={3}
              icon="bi-clock"
              color="orange"
            />
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <StatsCard
              title="Validés"
              value={1}
              icon="bi-check-circle"
              color="green"
            />
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <StatsCard
              title="Refusés"
              value={1}
              icon="bi-x-circle"
              color="red"
            />
          </Col>
        </Row>

        {/* Activity and System Stats */}
        <Row className="g-4 mb-4">
          <Col lg={6}>
            <ActivityFeed />
          </Col>
          <Col lg={6}>
            <SystemStats />
          </Col>
        </Row>

        {/* Candidates Table */}
        <div className="mb-4">
          <h4 className="fw-bold mb-3">Liste des Candidats</h4>
          <CandidateTable onViewDetails={handleViewDetails} />
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

export default RecruiterDashboard;
