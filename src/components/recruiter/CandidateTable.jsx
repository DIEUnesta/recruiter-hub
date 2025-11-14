import { Table, Badge, Button } from 'react-bootstrap';

const CandidateTable = ({ onViewDetails }) => {
  // Mock data - à remplacer par les vraies données de votre API Laravel
  const candidates = [
    {
      id: 1,
      nom: 'Nesta MOUGHIAMA',
      email: 'nesta@example.com',
      telephone: '+241 06 00 00 00',
      score: 85,
      methode: 'PDF',
      status: 'En attente',
    },
    {
      id: 2,
      nom: 'Marie OBIANG',
      email: 'marie@example.com',
      telephone: '+241 06 11 11 11',
      score: 92,
      methode: 'Formulaire',
      status: 'Validé',
    },
    {
      id: 3,
      nom: 'Sarah KOMBILA',
      email: 'sarah@example.com',
      telephone: '+241 06 22 22 22',
      score: 45,
      methode: 'PDF',
      status: 'Refusé',
    },
  ];

  const handleDownloadXML = (candidateId) => {
    console.log('Télécharger XML pour candidat:', candidateId);
    // Ajoutez votre logique de téléchargement XML ici
  };

  const handleAccept = (candidate) => {
    const message = `Félicitations ${candidate.nom}! Votre candidature a été acceptée.`;
    const whatsappUrl = `https://wa.me/${candidate.telephone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleReject = (candidate) => {
    const message = `Bonjour ${candidate.nom}, nous sommes désolés mais votre candidature n'a pas été retenue.`;
    const whatsappUrl = `https://wa.me/${candidate.telephone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getStatusBadge = (status) => {
    if (status === 'Validé') return 'success';
    if (status === 'Refusé') return 'danger';
    return 'warning';
  };

  return (
    <div className="table-responsive bg-white rounded shadow-sm">
      <Table hover className="mb-0">
        <thead className="table-light">
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Score</th>
            <th>Méthode</th>
            <th>Status</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td className="fw-semibold">{candidate.nom}</td>
              <td>{candidate.email}</td>
              <td>{candidate.telephone}</td>
              <td>
                <Badge bg={candidate.score >= 60 ? 'primary' : 'danger'}>
                  {candidate.score}%
                </Badge>
              </td>
              <td>{candidate.methode}</td>
              <td>
                <Badge bg={getStatusBadge(candidate.status)}>
                  {candidate.status}
                </Badge>
              </td>
              <td>
                <div className="d-flex gap-2 justify-content-end">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => onViewDetails(candidate)}
                    title="Voir détails"
                  >
                    <i className="bi bi-eye"></i>
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleDownloadXML(candidate.id)}
                    title="Télécharger XML"
                  >
                    <i className="bi bi-download"></i>
                  </Button>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => handleAccept(candidate)}
                    title="Accepter via WhatsApp"
                  >
                    <i className="bi bi-check-circle"></i>
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleReject(candidate)}
                    title="Refuser via WhatsApp"
                  >
                    <i className="bi bi-x-circle"></i>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CandidateTable;
