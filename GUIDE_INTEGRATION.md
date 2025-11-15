# 📚 Guide d'Intégration - Système Recruteur VirtueHire

## 🎯 Vue d'ensemble

Votre application est maintenant complète avec :
- ✅ **Page d'accueil** (`/`)
- ✅ **Connexion** (`/connexion`)
- ✅ **Inscription** (`/inscription`)
- ✅ **Espace Recruteur** (`/recruteur/*`)

---

## 📂 Structure des fichiers

```
src/
├── pages/
│   ├── Index.jsx                    # Page d'accueil
│   ├── Login.jsx                    # Page de connexion ✨ NOUVEAU
│   ├── Register.jsx                 # Page d'inscription ✨ NOUVEAU
│   ├── NotFound.jsx                 # Page 404
│   └── recruiter/
│       ├── RecruiterLayout.jsx      # Layout avec sidebar
│       ├── RecruiterDashboard.jsx   # Dashboard principal
│       ├── RecruiterCandidates.jsx  # Liste des candidats
│       ├── RecruiterStatistics.jsx  # Statistiques
│       ├── RecruiterQuestionnaires.jsx # Questionnaires
│       └── RecruiterProfile.jsx     # Profil du recruteur
├── components/
│   ├── NavLink.jsx                  # Composant de navigation
│   └── recruiter/
│       ├── RecruiterSidebar.jsx     # Sidebar navigation
│       ├── StatsCard.jsx            # Carte de statistiques
│       ├── ActivityFeed.jsx         # Flux d'activités
│       ├── SystemStats.jsx          # Stats système
│       ├── CandidateTable.jsx       # Tableau des candidats
│       └── CandidateDetailsModal.jsx # Modal détails candidat
├── services/
│   └── api.js                       # Service API centralisé ✨ NOUVEAU
└── App.jsx                          # Configuration des routes
```

---

## 🚀 Routes disponibles

| Route | Description | Statut |
|-------|-------------|--------|
| `/` | Page d'accueil | ✅ Fonctionnel |
| `/connexion` | Connexion recruteur | ✅ Nouveau |
| `/inscription` | Inscription recruteur | ✅ Nouveau |
| `/recruteur/dashboard` | Dashboard recruteur | ✅ Fonctionnel |
| `/recruteur/candidats` | Liste des candidats | ✅ Fonctionnel |
| `/recruteur/statistiques` | Statistiques | ✅ Fonctionnel |
| `/recruteur/questionnaires` | Questionnaires | ✅ Fonctionnel |
| `/recruteur/profil` | Profil recruteur | ✅ Fonctionnel |

---

## 🔧 Configuration API Laravel

### Étape 1 : Modifier l'URL de base

Dans `src/services/api.js` (ligne 4), remplacez :

```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

Par l'URL de votre backend Laravel :

```javascript
const API_BASE_URL = 'http://votre-domaine.com/api';
// OU pour le développement local :
const API_BASE_URL = 'http://127.0.0.1:8000/api';
```

### Étape 2 : Routes Laravel nécessaires

Créez ces routes dans votre fichier `routes/api.php` :

```php
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\QuestionnaireController;
use App\Http\Controllers\ActivityController;

// Authentification (publiques)
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Routes protégées (nécessitent authentification)
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'getCurrentUser']);
    
    // Candidats
    Route::get('/candidates', [CandidateController::class, 'index']);
    Route::get('/candidates/{id}', [CandidateController::class, 'show']);
    Route::put('/candidates/{id}/status', [CandidateController::class, 'updateStatus']);
    Route::get('/candidates/{id}/cv', [CandidateController::class, 'downloadCV']);
    Route::get('/candidates/{id}/report', [CandidateController::class, 'downloadReport']);
    
    // Statistiques
    Route::get('/stats/dashboard', [StatsController::class, 'dashboard']);
    Route::get('/stats/detailed', [StatsController::class, 'detailed']);
    
    // Questionnaires
    Route::apiResource('questionnaires', QuestionnaireController::class);
    
    // Activités
    Route::get('/activities', [ActivityController::class, 'recent']);
});
```

### Étape 3 : Configuration CORS Laravel

Dans `config/cors.php` :

```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173', 'http://localhost:5174'], // Ajoutez votre domaine
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

---

## 💻 Intégration dans vos composants

### Exemple 1 : Connexion avec API Laravel

Dans `src/pages/Login.jsx`, remplacez la ligne 31-39 par :

```javascript
try {
  const data = await authAPI.login(formData.email, formData.password);
  
  // Stocker le token et l'utilisateur
  localStorage.setItem('user', JSON.stringify({
    ...data.user,
    token: data.token
  }));
  
  navigate('/recruteur/dashboard');
} catch (err) {
  setError(err.message || 'Email ou mot de passe incorrect');
  setLoading(false);
}
```

### Exemple 2 : Récupérer les candidats

Dans `src/components/recruiter/CandidateTable.jsx`, ajoutez en haut du fichier :

```javascript
import { useState, useEffect } from 'react';
import { candidatesAPI } from '../../services/api';

const CandidateTable = ({ onViewDetails }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      const data = await candidatesAPI.getAll();
      setCandidates(data.candidates);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  // ... reste du code
};
```

### Exemple 3 : Statistiques du dashboard

Dans `src/pages/recruiter/RecruiterDashboard.jsx`, ajoutez :

```javascript
import { useState, useEffect } from 'react';
import { statsAPI } from '../../services/api';

const RecruiterDashboard = () => {
  const [stats, setStats] = useState({
    totalCandidates: 0,
    pending: 0,
    accepted: 0,
    rejected: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await statsAPI.getDashboard();
      setStats(data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  // ... reste du code
};
```

---

## 🔐 Authentification et protection des routes

### Créer un composant de route protégée

Créez `src/components/ProtectedRoute.jsx` :

```javascript
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  
  if (!user) {
    return <Navigate to="/connexion" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
```

### Utiliser les routes protégées

Dans `src/App.jsx`, modifiez :

```javascript
import ProtectedRoute from './components/ProtectedRoute';

// ...

<Route 
  path="/recruteur" 
  element={
    <ProtectedRoute>
      <RecruiterLayout />
    </ProtectedRoute>
  }
>
  <Route path="dashboard" element={<RecruiterDashboard />} />
  <Route path="candidats" element={<RecruiterCandidates />} />
  {/* ... autres routes */}
</Route>
```

---

## 📝 Format de réponse API attendu

### Login/Register

```json
{
  "user": {
    "id": 1,
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "jean@example.com",
    "role": "recruiter"
  },
  "token": "1|xyz123abc456..."
}
```

### Liste des candidats

```json
{
  "candidates": [
    {
      "id": 1,
      "nom": "MOUGHIAMA",
      "prenom": "Nesta",
      "email": "nesta@example.com",
      "telephone": "+241 XX XX XX XX",
      "score": 85,
      "method": "pdf",
      "status": "pending",
      "created_at": "2025-01-15T10:30:00Z"
    }
  ]
}
```

### Statistiques Dashboard

```json
{
  "totalCandidates": 5,
  "pending": 3,
  "accepted": 1,
  "rejected": 1,
  "avgScore": 82,
  "recentActivities": [...]
}
```

---

## 🎨 Personnalisation du thème

Les couleurs et styles sont dans `src/index.css`. Vous pouvez personnaliser :

```css
/* Couleurs principales */
.bg-purple { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.text-purple { color: #667eea; }

/* Styles des cartes */
.card { border-radius: 12px; }
.shadow-sm { box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
```

---

## ✅ Checklist d'intégration

- [ ] Modifier `API_BASE_URL` dans `src/services/api.js`
- [ ] Créer les routes Laravel dans `routes/api.php`
- [ ] Configurer CORS dans Laravel
- [ ] Créer les contrôleurs Laravel nécessaires
- [ ] Tester la connexion/inscription
- [ ] Intégrer l'API dans les composants
- [ ] Ajouter la protection des routes
- [ ] Tester toutes les fonctionnalités

---

## 🆘 Aide et support

### Problèmes communs

**CORS Error** : Vérifiez `config/cors.php` et ajoutez votre domaine frontend

**401 Unauthorized** : Le token n'est pas envoyé correctement, vérifiez `getHeaders()` dans `api.js`

**404 Not Found** : Vérifiez que les routes Laravel correspondent aux appels dans `api.js`

### Démo locale

1. Démarrez Laravel : `php artisan serve`
2. Démarrez React : `npm run dev`
3. Testez la connexion sur `http://localhost:5173/connexion`

---

## 🚀 Prochaines étapes recommandées

1. **Implémenter les contrôleurs Laravel** pour chaque endpoint
2. **Ajouter la validation** des formulaires côté serveur
3. **Implémenter l'upload de fichiers** (CV, documents)
4. **Ajouter des notifications** en temps réel
5. **Créer des tests** pour les API

---

**Bon développement ! 💪**
