// Service API centralisé pour gérer tous les appels HTTP vers le backend Laravel

// URL de base de votre API Laravel
const API_BASE_URL = 'http://localhost:8000/api'; // À remplacer par votre URL

// Helper pour récupérer le token d'authentification
const getAuthToken = () => {
  const user = localStorage.getItem('user');
  if (user) {
    const userData = JSON.parse(user);
    return userData.token || null;
  }
  return null;
};

// Helper pour créer les headers avec authentification
const getHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Gestion des erreurs
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'Une erreur est survenue',
    }));
    throw new Error(error.message || `Erreur HTTP: ${response.status}`);
  }
  return response.json();
};

// ==================== AUTHENTIFICATION ====================

export const authAPI = {
  // Connexion
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  // Inscription
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Déconnexion
  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: getHeaders(true),
    });
    return handleResponse(response);
  },

  // Récupérer l'utilisateur actuel
  getCurrentUser: async () => {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'GET',
      headers: getHeaders(true),
    });
    return handleResponse(response);
  },
};

// ==================== CANDIDATS ====================

export const candidatesAPI = {
  // Récupérer tous les candidats
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const url = `${API_BASE_URL}/candidates${queryParams ? `?${queryParams}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(true),
    });
    return handleResponse(response);
  },

  // Récupérer un candidat par ID
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/candidates/${id}`, {
      method: 'GET',
      headers: getHeaders(true),
    });
    return handleResponse(response);
  },

  // Mettre à jour le statut d'un candidat
  updateStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/candidates/${id}/status`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify({ status }),
    });
    return handleResponse(response);
  },

  // Télécharger le CV d'un candidat
  downloadCV: async (id) => {
    const response = await fetch(`${API_BASE_URL}/candidates/${id}/cv`, {
      method: 'GET',
      headers: getHeaders(true),
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors du téléchargement du CV');
    }
    
    return response.blob();
  },

  // Télécharger le rapport d'entretien
  downloadReport: async (id) => {
    const response = await fetch(`${API_BASE_URL}/candidates/${id}/report`, {
      method: 'GET',
      headers: getHeaders(true),
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors du téléchargement du rapport');
    }
    
    return response.blob();
  },
};

// ==================== STATISTIQUES ====================

export const statsAPI = {
  // Récupérer les statistiques du dashboard
  getDashboard: async () => {
    const response = await fetch(`${API_BASE_URL}/stats/dashboard`, {
      method: 'GET',
      headers: getHeaders(true),
    });
    return handleResponse(response);
  },

  // Récupérer les statistiques détaillées
  getDetailed: async (startDate, endDate) => {
    const response = await fetch(
      `${API_BASE_URL}/stats/detailed?start=${startDate}&end=${endDate}`,
      {
        method: 'GET',
        headers: getHeaders(true),
      }
    );
    return handleResponse(response);
  },
};

// ==================== QUESTIONNAIRES ====================

export const questionnairesAPI = {
  // Récupérer tous les questionnaires
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/questionnaires`, {
      method: 'GET',
      headers: getHeaders(true),
    });
    return handleResponse(response);
  },

  // Récupérer un questionnaire par ID
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/questionnaires/${id}`, {
      method: 'GET',
      headers: getHeaders(true),
    });
    return handleResponse(response);
  },

  // Créer un nouveau questionnaire
  create: async (questionnaireData) => {
    const response = await fetch(`${API_BASE_URL}/questionnaires`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(questionnaireData),
    });
    return handleResponse(response);
  },

  // Mettre à jour un questionnaire
  update: async (id, questionnaireData) => {
    const response = await fetch(`${API_BASE_URL}/questionnaires/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(questionnaireData),
    });
    return handleResponse(response);
  },

  // Supprimer un questionnaire
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/questionnaires/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    return handleResponse(response);
  },
};

// ==================== ACTIVITÉS ====================

export const activitiesAPI = {
  // Récupérer les activités récentes
  getRecent: async (limit = 10) => {
    const response = await fetch(`${API_BASE_URL}/activities?limit=${limit}`, {
      method: 'GET',
      headers: getHeaders(true),
    });
    return handleResponse(response);
  },
};

// Export par défaut
export default {
  auth: authAPI,
  candidates: candidatesAPI,
  stats: statsAPI,
  questionnaires: questionnairesAPI,
  activities: activitiesAPI,
};
