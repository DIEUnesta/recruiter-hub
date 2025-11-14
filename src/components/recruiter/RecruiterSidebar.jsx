import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const RecruiterSidebar = () => {
  const menuItems = [
    { title: 'Tableau de Bord', url: '/recruteur/dashboard', icon: 'bi-house' },
    { title: 'Gestion Candidats', url: '/recruteur/candidats', icon: 'bi-people' },
    { title: 'Statistiques', url: '/recruteur/statistiques', icon: 'bi-bar-chart' },
    { title: 'Questionnaires', url: '/recruteur/questionnaires', icon: 'bi-question-circle' },
    { title: 'Mon Profil', url: '/recruteur/profil', icon: 'bi-person' },
  ];

  const handleLogout = () => {
    console.log('Déconnexion');
    // Ajoutez votre logique de déconnexion ici
  };

  return (
    <div className="d-flex flex-column vh-100 bg-dark text-white" style={{ width: '250px' }}>
      {/* Logo Section */}
      <div className="p-4 border-bottom border-secondary">
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded d-flex align-items-center justify-content-center bg-primary"
            style={{ width: '48px', height: '48px' }}
          >
            <i className="bi bi-shield-check text-white fs-4"></i>
          </div>
          <div>
            <h5 className="mb-0 fw-bold">Recruteur Panel</h5>
            <small className="text-white-50">Gestion des candidatures</small>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <Nav className="flex-column flex-grow-1 py-3">
        {menuItems.map((item) => (
          <Nav.Item key={item.title}>
            <NavLink
              to={item.url}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-3 px-4 py-3 text-white-50 ${
                  isActive ? 'bg-primary text-white fw-bold' : ''
                }`
              }
              style={{ textDecoration: 'none' }}
            >
              <i className={`bi ${item.icon} fs-5`}></i>
              <span>{item.title}</span>
            </NavLink>
          </Nav.Item>
        ))}
      </Nav>

      {/* Logout Button */}
      <div className="p-3 border-top border-secondary">
        <button
          onClick={handleLogout}
          className="btn btn-outline-danger w-100 d-flex align-items-center gap-2 justify-content-center"
        >
          <i className="bi bi-box-arrow-right"></i>
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default RecruiterSidebar;
