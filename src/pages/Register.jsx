import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    entreprise: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);

    try {
      // TODO: Remplacer par votre appel API Laravel
      // const response = await fetch('http://votre-api.com/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // const data = await response.json();
      
      // Simulation d'inscription (à remplacer)
      setTimeout(() => {
        localStorage.setItem('user', JSON.stringify({ 
          email: formData.email,
          nom: formData.nom,
          prenom: formData.prenom,
          role: 'recruiter' 
        }));
        navigate('/recruteur/dashboard');
      }, 1000);
    } catch (err) {
      setError('Une erreur est survenue lors de l\'inscription');
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light py-5"
      style={{ minHeight: '100vh' }}
    >
      <Container>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <Card className="border-0 shadow">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div
                    className="mx-auto mb-3 rounded-circle d-inline-flex align-items-center justify-content-center"
                    style={{ 
                      width: '80px', 
                      height: '80px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}
                  >
                    <i className="bi bi-person-plus text-white" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <h2 className="fw-bold">Inscription Recruteur</h2>
                  <p className="text-muted">Créez votre compte pour accéder à la plateforme</p>
                </div>

                {error && (
                  <Alert variant="danger" dismissible onClose={() => setError('')}>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Nom *</Form.Label>
                        <Form.Control
                          type="text"
                          name="nom"
                          placeholder="Votre nom"
                          value={formData.nom}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Prénom *</Form.Label>
                        <Form.Control
                          type="text"
                          name="prenom"
                          placeholder="Votre prénom"
                          value={formData.prenom}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <Form.Group className="mb-3">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Téléphone</Form.Label>
                        <Form.Control
                          type="tel"
                          name="telephone"
                          placeholder="+241 XX XX XX XX"
                          value={formData.telephone}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Entreprise</Form.Label>
                        <Form.Control
                          type="text"
                          name="entreprise"
                          placeholder="Nom de l'entreprise"
                          value={formData.entreprise}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <Form.Group className="mb-3">
                    <Form.Label>Mot de passe *</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                    />
                    <Form.Text className="text-muted">
                      Minimum 6 caractères
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirmer le mot de passe *</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      label={
                        <>
                          J'accepte les{' '}
                          <Link to="/conditions" className="text-decoration-none">
                            conditions d'utilisation
                          </Link>
                        </>
                      }
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mb-3"
                    size="lg"
                    disabled={loading}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none'
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Inscription en cours...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Créer mon compte
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <small className="text-muted">
                      Vous avez déjà un compte ?{' '}
                      <Link to="/connexion" className="text-decoration-none fw-semibold">
                        Se connecter
                      </Link>
                    </small>
                  </div>
                </Form>

                <hr className="my-4" />

                <div className="text-center">
                  <Link to="/" className="text-decoration-none">
                    <i className="bi bi-arrow-left me-2"></i>
                    Retour à l'accueil
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
