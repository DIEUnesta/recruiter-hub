import { useState } from 'react';
import { Container, Card, Form, Button, Alert, ProgressBar } from 'react-bootstrap';
import { candidatAPI } from '@/services/api';
import { useNavigate } from 'react-router-dom';

const UploadCV = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setMessage({ type: 'danger', text: 'Veuillez sélectionner un fichier PDF' });
        setFile(null);
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB
        setMessage({ type: 'danger', text: 'Le fichier ne doit pas dépasser 5MB' });
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setMessage({ type: '', text: '' });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setMessage({ type: 'warning', text: 'Veuillez sélectionner un fichier' });
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('cv', file);

      // Simulation de progression
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      const response = await candidatAPI.uploadCV(formData);
      
      clearInterval(progressInterval);
      setProgress(100);

      setMessage({ 
        type: 'success', 
        text: 'CV uploadé avec succès! Redirection vers le formulaire...' 
      });

      setTimeout(() => {
        navigate('/candidat/cv', { state: { extractedData: response.data } });
      }, 2000);

    } catch (error) {
      setMessage({ 
        type: 'danger', 
        text: error.response?.data?.message || 'Erreur lors de l\'upload du CV' 
      });
      setProgress(0);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container fluid className="py-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">
                <i className="bi bi-cloud-upload me-2"></i>
                Upload CV
              </h4>
            </Card.Header>
            <Card.Body className="p-4">
              {message.text && (
                <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
                  {message.text}
                </Alert>
              )}

              <Alert variant="info">
                <i className="bi bi-info-circle me-2"></i>
                <strong>Instructions:</strong>
                <ul className="mb-0 mt-2">
                  <li>Format accepté: PDF uniquement</li>
                  <li>Taille maximale: 5MB</li>
                  <li>Le CV sera automatiquement analysé pour extraire vos informations</li>
                </ul>
              </Alert>

              <Form onSubmit={handleUpload}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">
                    <i className="bi bi-file-earmark-pdf me-2"></i>
                    Sélectionnez votre CV (PDF)
                  </Form.Label>
                  <Form.Control
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    disabled={uploading}
                    size="lg"
                  />
                  {file && (
                    <div className="mt-2 text-success">
                      <i className="bi bi-check-circle me-2"></i>
                      Fichier sélectionné: {file.name}
                    </div>
                  )}
                </Form.Group>

                {uploading && (
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Upload en cours...</span>
                      <span>{progress}%</span>
                    </div>
                    <ProgressBar 
                      now={progress} 
                      variant="primary" 
                      animated 
                      striped
                    />
                  </div>
                )}

                <div className="d-grid gap-2">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    type="submit"
                    disabled={!file || uploading}
                  >
                    {uploading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Upload en cours...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-upload me-2"></i>
                        Uploader mon CV
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline-secondary"
                    onClick={() => navigate('/candidat/cv')}
                    disabled={uploading}
                  >
                    Remplir le formulaire manuellement
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default UploadCV;
