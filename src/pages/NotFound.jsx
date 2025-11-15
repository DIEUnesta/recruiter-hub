import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Container, Button } from 'react-bootstrap';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '100vh' }}>
      <Container>
        <div className="text-center">
          <h1 className="mb-4 display-1 fw-bold">404</h1>
          <p className="mb-4 fs-4 text-muted">Oops! Page introuvable</p>
          <Button variant="primary" size="lg" href="/">
            Retour à l'accueil
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
