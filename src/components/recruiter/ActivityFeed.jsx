import { Card } from 'react-bootstrap';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      title: 'Nouveau candidat inscrit',
      candidateName: 'Nesta MOUGHIAMA',
      time: 'il y a 5 min',
    },
    {
      id: 2,
      title: 'Quiz complété',
      candidateName: 'Marie OBIANG',
      time: 'il y a 12 min',
    },
    {
      id: 3,
      title: 'CV téléchargé',
      candidateName: 'Sarah KOMBILA',
      time: 'il y a 25 min',
    },
  ];

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Header className="bg-white border-0 py-3">
        <h5 className="mb-0 d-flex align-items-center gap-2">
          <i className="bi bi-clock-history text-primary"></i>
          Activité Récente
        </h5>
      </Card.Header>
      <Card.Body>
        <div className="d-flex flex-column gap-3">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`pb-3 ${index !== activities.length - 1 ? 'border-bottom' : ''}`}
            >
              <p className="fw-semibold mb-1">{activity.title}</p>
              <small className="text-muted">
                {activity.candidateName} • {activity.time}
              </small>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ActivityFeed;
