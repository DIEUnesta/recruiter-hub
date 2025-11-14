import { Card } from 'react-bootstrap';

const StatsCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    purple: 'bg-purple',
    orange: 'bg-warning',
    green: 'bg-success',
    red: 'bg-danger',
  };

  const bgColorClass = colorClasses[color] || 'bg-primary';

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body>
        <div className="d-flex align-items-start justify-content-between">
          <div>
            <h2 className="display-4 fw-bold mb-2">{value}</h2>
            <p className="text-muted mb-0">{title}</p>
          </div>
          <div className={`${bgColorClass} rounded p-3`}>
            <i className={`bi ${icon} text-white fs-3`}></i>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StatsCard;
