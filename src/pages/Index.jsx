import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container>
        <div className="text-center text-white">
          <div
            className="mx-auto mb-4 rounded-circle bg-white d-inline-flex align-items-center justify-content-center"
            style={{ width: '100px', height: '100px' }}
          >
            <i className="bi bi-people text-primary" style={{ fontSize: '3rem' }}></i>
          </div>
          <h1 className="display-3 fw-bold mb-3">Application VirtueHire</h1>
          <p className="lead mb-5">
            Plateforme de gestion des entretiens virtuels et recrutement
          </p>
          
          <div className="mb-4">
            <h5 className="text-white mb-3">Accès rapide :</h5>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-4">
              <Button
                variant="success"
                size="lg"
                onClick={() => navigate('/recruteur/dashboard')}
                className="d-flex align-items-center justify-content-center gap-2 px-5"
              >
                <i className="bi bi-briefcase"></i>
                Espace Recruteur
              </Button>
              <Button
                variant="info"
                size="lg"
                onClick={() => navigate('/candidat/dashboard')}
                className="d-flex align-items-center justify-content-center gap-2 px-5"
              >
                <i className="bi bi-person"></i>
                Espace Candidat
              </Button>
            </div>
          </div>

          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Button
              variant="light"
              size="lg"
              onClick={() => navigate('/connexion')}
              className="d-flex align-items-center justify-content-center gap-2 px-5"
            >
              <i className="bi bi-box-arrow-in-right"></i>
              Se connecter
            </Button>
            <Button
              variant="outline-light"
              size="lg"
              onClick={() => navigate('/inscription')}
              className="d-flex align-items-center justify-content-center gap-2 px-5"
            >
              <i className="bi bi-person-plus"></i>
              S'inscrire
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Index;
