# 🎯 Guide d'Intégration - Fonctionnalités Candidat

## 📌 Vue d'ensemble

Les nouvelles fonctionnalités candidat ont été ajoutées à votre projet existant. Ce guide vous explique comment les intégrer avec votre backend Laravel.

---

## ✅ Fichiers ajoutés

### Pages Candidat
- `src/pages/candidat/CandidatLayout.jsx` - Layout avec sidebar
- `src/pages/candidat/CandidatDashboard.jsx` - Dashboard candidat
- `src/pages/candidat/FormulaireCV.jsx` - Formulaire de saisie CV
- `src/pages/candidat/UploadCV.jsx` - Upload de CV en PDF
- `src/pages/candidat/ValidationCV.jsx` - Validation des données
- `src/pages/candidat/Quiz.jsx` - Quiz d'entretien
- `src/pages/candidat/ResultatEntretien.jsx` - Affichage des résultats

### Composants
- `src/components/candidat/CandidatSidebar.jsx` - Navigation candidat

### Services API
- Nouvelles fonctions ajoutées dans `src/services/api.js` (section `candidatAPI`)

### Routes
- Nouvelles routes ajoutées dans `src/App.jsx` (section `/candidat/*`)

---

## 🚀 Routes Candidat Disponibles

| Route | Page | Description |
|-------|------|-------------|
| `/candidat/dashboard` | CandidatDashboard | Tableau de bord principal avec vue d'ensemble |
| `/candidat/upload` | UploadCV | Upload d'un CV en PDF (analyse automatique) |
| `/candidat/cv` | FormulaireCV | Formulaire manuel ou édition du CV |
| `/candidat/validation` | ValidationCV | Validation des données avant soumission |
| `/candidat/quiz` | Quiz | Quiz d'entretien adapté au profil |
| `/candidat/resultats` | ResultatEntretien | Résultats du dernier entretien |
| `/candidat/resultats/:id` | ResultatEntretien | Résultats d'un entretien spécifique |

---

## 🔧 Intégration Backend Laravel

### Étape 1 : Routes API à ajouter

Ajoutez ces routes dans votre fichier `routes/api.php` :

```php
<?php

use App\Http\Controllers\CVController;
use App\Http\Controllers\EntretienController;

Route::middleware('auth:sanctum')->group(function () {
    
    // ========== ROUTES CANDIDAT ==========
    
    // Dashboard
    Route::get('/cv/me', [CVController::class, 'getMyCV']);
    Route::get('/entretien/me', [EntretienController::class, 'getLastInterview']);
    
    // Gestion CV
    Route::post('/cv/upload-pdf', [CVController::class, 'uploadPDF']);
    Route::post('/cv/submit-form', [CVController::class, 'submitForm']);
    Route::post('/cv/validate', [CVController::class, 'validate']);
    
    // Quiz / Entretien
    Route::get('/entretien/questions', [EntretienController::class, 'getQuestions']);
    Route::post('/entretien/submit', [EntretienController::class, 'submitAnswers']);
    Route::get('/entretien/result/{id}', [EntretienController::class, 'getResult']);
    Route::get('/entretien/xml/{id}', [EntretienController::class, 'downloadXML']);
});
```

---

### Étape 2 : Contrôleurs Laravel nécessaires

#### **CVController.php**

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CVController extends Controller
{
    // Récupérer le CV du candidat connecté
    public function getMyCV(Request $request)
    {
        $cv = $request->user()->cv; // Supposant une relation user->cv
        
        if (!$cv) {
            return response()->json(null, 404);
        }
        
        return response()->json($cv);
    }
    
    // Upload d'un CV PDF avec extraction de données
    public function uploadPDF(Request $request)
    {
        $request->validate([
            'cv' => 'required|file|mimes:pdf|max:5120', // 5MB max
        ]);
        
        $file = $request->file('cv');
        $path = $file->store('cvs', 'public');
        
        // TODO: Implémenter l'extraction de données du PDF
        // Exemple avec une librairie comme spatie/pdf-to-text ou un service externe
        
        $extractedData = [
            'nom' => 'Extraction...',
            'prenom' => 'En cours...',
            // ... autres champs extraits
        ];
        
        return response()->json([
            'message' => 'CV uploadé avec succès',
            'path' => $path,
            'data' => $extractedData
        ]);
    }
    
    // Soumettre le formulaire CV
    public function submitForm(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:100',
            'prenom' => 'required|string|max:100',
            'email' => 'required|email',
            'telephone' => 'required|string|max:20',
            'titre_poste' => 'required|string|max:255',
            'annees_experience' => 'required|integer|min:0',
            'niveau_etudes' => 'required|string',
            // ... autres validations
        ]);
        
        $cv = $request->user()->cv()->updateOrCreate(
            ['user_id' => $request->user()->id],
            $validated
        );
        
        return response()->json([
            'message' => 'CV enregistré avec succès',
            'cv' => $cv
        ]);
    }
    
    // Valider le CV
    public function validate(Request $request)
    {
        $cv = $request->user()->cv;
        
        if (!$cv) {
            return response()->json(['message' => 'Aucun CV à valider'], 404);
        }
        
        $cv->update(['status' => 'validated', 'validated_at' => now()]);
        
        return response()->json([
            'message' => 'CV validé avec succès',
            'cv' => $cv
        ]);
    }
}
```

#### **EntretienController.php**

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EntretienController extends Controller
{
    // Récupérer le dernier entretien du candidat
    public function getLastInterview(Request $request)
    {
        $interview = $request->user()->entretiens()
            ->latest()
            ->first();
        
        if (!$interview) {
            return response()->json(null, 404);
        }
        
        return response()->json($interview);
    }
    
    // Récupérer les questions adaptées au profil du candidat
    public function getQuestions(Request $request)
    {
        $cv = $request->user()->cv;
        
        if (!$cv || $cv->status !== 'validated') {
            return response()->json([
                'message' => 'Veuillez d\'abord valider votre CV'
            ], 403);
        }
        
        // TODO: Logique pour sélectionner les questions selon le profil
        $questions = [
            [
                'id' => 1,
                'question' => 'Parlez-moi de votre expérience en ' . $cv->titre_poste,
                'type' => 'text'
            ],
            [
                'id' => 2,
                'question' => 'Quelle est votre plus grande compétence technique ?',
                'type' => 'multiple_choice',
                'options' => ['JavaScript', 'Python', 'PHP', 'Java']
            ],
            // ... plus de questions
        ];
        
        return response()->json(['questions' => $questions]);
    }
    
    // Soumettre les réponses du quiz
    public function submitAnswers(Request $request)
    {
        $validated = $request->validate([
            'answers' => 'required|array'
        ]);
        
        // TODO: Calculer le score et analyser les réponses
        $score = rand(60, 95); // Exemple
        
        $interview = $request->user()->entretiens()->create([
            'answers' => $validated['answers'],
            'score' => $score,
            'status' => 'pending',
            'completed_at' => now()
        ]);
        
        return response()->json([
            'message' => 'Quiz soumis avec succès',
            'interview_id' => $interview->id,
            'score' => $score
        ]);
    }
    
    // Récupérer les résultats d'un entretien
    public function getResult(Request $request, $id)
    {
        $interview = $request->user()->entretiens()->findOrFail($id);
        
        return response()->json($interview->load('questions'));
    }
    
    // Télécharger le résultat en XML
    public function downloadXML(Request $request, $id)
    {
        $interview = $request->user()->entretiens()->findOrFail($id);
        
        // TODO: Générer le XML
        $xml = new \SimpleXMLElement('<entretien/>');
        $xml->addChild('id', $interview->id);
        $xml->addChild('score', $interview->score);
        $xml->addChild('date', $interview->created_at);
        // ... plus de données
        
        return response($xml->asXML(), 200)
            ->header('Content-Type', 'application/xml')
            ->header('Content-Disposition', 'attachment; filename="entretien_' . $id . '.xml"');
    }
}
```

---

### Étape 3 : Modèles Laravel

#### **Migration : create_cvs_table**

```php
Schema::create('cvs', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('nom');
    $table->string('prenom');
    $table->string('email');
    $table->string('telephone');
    $table->string('adresse')->nullable();
    $table->string('ville')->nullable();
    $table->string('code_postal')->nullable();
    $table->date('date_naissance')->nullable();
    $table->string('titre_poste');
    $table->integer('annees_experience');
    $table->string('niveau_etudes');
    $table->string('diplome')->nullable();
    $table->text('competences')->nullable();
    $table->text('langues')->nullable();
    $table->text('description')->nullable();
    $table->string('status')->default('draft'); // draft, validated
    $table->timestamp('validated_at')->nullable();
    $table->timestamps();
});
```

#### **Migration : create_entretiens_table**

```php
Schema::create('entretiens', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->json('answers');
    $table->json('questions')->nullable();
    $table->integer('score')->default(0);
    $table->string('status')->default('pending'); // pending, accepted, rejected
    $table->text('feedback')->nullable();
    $table->timestamp('completed_at')->nullable();
    $table->timestamps();
});
```

---

## 📊 Flux de travail Candidat

1. **Connexion** → `/connexion`
2. **Dashboard** → `/candidat/dashboard` (vue d'ensemble)
3. **Upload CV** → `/candidat/upload` (upload PDF OU formulaire manuel)
4. **Validation** → `/candidat/validation` (vérification des données)
5. **Quiz** → `/candidat/quiz` (entretien adapté)
6. **Résultats** → `/candidat/resultats` (consultation des scores)

---

## 🎨 Technologies utilisées

- **React** avec JSX (pas de TypeScript)
- **Vite** pour le build
- **Bootstrap 5** pour le style
- **React Router** pour la navigation
- **React Bootstrap** pour les composants UI

---

## 🔐 Protection des routes

Pour protéger les routes candidat, créez un composant `ProtectedRoute` :

```jsx
// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  if (!user || !user.token) {
    return <Navigate to="/connexion" replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
```

Utilisez-le dans `App.jsx` :

```jsx
<Route path="/candidat" element={
  <ProtectedRoute requiredRole="candidat">
    <CandidatLayout />
  </ProtectedRoute>
}>
  {/* ... routes candidat */}
</Route>
```

---

## 📝 Configuration API

L'URL de l'API est configurée dans `src/services/api.js` :

```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

Modifiez cette valeur selon votre environnement.

---

## ✅ Checklist d'intégration

- [ ] Routes API ajoutées dans `routes/api.php`
- [ ] Contrôleurs `CVController` et `EntretienController` créés
- [ ] Migrations exécutées (`cvs` et `entretiens`)
- [ ] Relations ajoutées dans les modèles (`User`, `CV`, `Entretien`)
- [ ] CORS configuré pour accepter votre frontend
- [ ] URL API mise à jour dans `src/services/api.js`
- [ ] Protection des routes implémentée (optionnel)
- [ ] Tests des endpoints effectués

---

## 🆘 Besoin d'aide ?

Consultez le fichier `GUIDE_INTEGRATION.md` pour plus de détails sur :
- Les formats de réponse API attendus
- Les exemples de code complets
- La personnalisation du thème
- Le troubleshooting

---

**Votre application est maintenant prête avec les fonctionnalités candidat complètes ! 🎉**
