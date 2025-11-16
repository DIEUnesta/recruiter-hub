import { NavLink } from '@/components/NavLink';

const CandidatSidebar = () => {
  const menuItems = [
    { title: 'Dashboard', url: '/candidat/dashboard', icon: 'bi-speedometer2' },
    { title: 'Mon CV', url: '/candidat/cv', icon: 'bi-file-earmark-text' },
    { title: 'Upload CV', url: '/candidat/upload', icon: 'bi-cloud-upload' },
    { title: 'Quiz', url: '/candidat/quiz', icon: 'bi-question-circle' },
    { title: 'Résultats', url: '/candidat/resultats', icon: 'bi-clipboard-check' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/connexion';
  };

  return (
    <div className="bg-dark text-white d-flex flex-column" style={{ width: '250px', minHeight: '100vh' }}>
      <div className="p-3 border-bottom border-secondary">
        <h4 className="mb-0">
          <i className="bi bi-person-circle me-2"></i>
          Candidat
        </h4>
      </div>
      
      <nav className="flex-grow-1 p-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            className="d-block text-white text-decoration-none py-2 px-3 rounded mb-2"
            activeClassName="bg-primary"
          >
            <i className={`bi ${item.icon} me-2`}></i>
            {item.title}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-top border-secondary">
        <button 
          onClick={handleLogout}
          className="btn btn-outline-light w-100"
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default CandidatSidebar;
