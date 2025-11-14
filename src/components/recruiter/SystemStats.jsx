import { Card, ProgressBar } from 'react-bootstrap';

const SystemStats = () => {
  const stats = [
    { label: 'Taux de réussite moyen', value: 82, variant: 'primary' },
    { label: 'Satisfaction recruteurs', value: 95, variant: 'success' },
    { label: 'Candidatures traitées', value: 78, variant: 'purple' },
  ];

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Header className="bg-white border-0 py-3">
        <h5 className="mb-0 d-flex align-items-center gap-2">
          <i className="bi bi-bar-chart text-primary"></i>
          Statistiques Système
        </h5>
      </Card.Header>
      <Card.Body>
        <div className="d-flex flex-column gap-4">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <small className="fw-semibold">{stat.label}</small>
                <span className="fw-bold">{stat.value}%</span>
              </div>
              <ProgressBar 
                now={stat.value} 
                variant={stat.variant} 
                style={{ height: '8px' }}
              />
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default SystemStats;
