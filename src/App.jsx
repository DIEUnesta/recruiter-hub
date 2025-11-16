import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import RecruiterLayout from './pages/recruiter/RecruiterLayout';
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import RecruiterCandidates from './pages/recruiter/RecruiterCandidates';
import RecruiterStatistics from './pages/recruiter/RecruiterStatistics';
import RecruiterQuestionnaires from './pages/recruiter/RecruiterQuestionnaires';
import RecruiterProfile from './pages/recruiter/RecruiterProfile';
import CandidatLayout from './pages/candidat/CandidatLayout';
import CandidatDashboard from './pages/candidat/CandidatDashboard';
import FormulaireCV from './pages/candidat/FormulaireCV';
import UploadCV from './pages/candidat/UploadCV';
import ValidationCV from './pages/candidat/ValidationCV';
import Quiz from './pages/candidat/Quiz';
import ResultatEntretien from './pages/candidat/ResultatEntretien';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
          {/* Recruiter Routes */}
          {/* Recruiter Routes */}
          <Route path="/recruteur" element={<RecruiterLayout />}>
            <Route path="dashboard" element={<RecruiterDashboard />} />
            <Route path="candidats" element={<RecruiterCandidates />} />
            <Route path="statistiques" element={<RecruiterStatistics />} />
            <Route path="questionnaires" element={<RecruiterQuestionnaires />} />
            <Route path="profil" element={<RecruiterProfile />} />
          </Route>
          {/* Candidat Routes */}
          <Route path="/candidat" element={<CandidatLayout />}>
            <Route path="dashboard" element={<CandidatDashboard />} />
            <Route path="cv" element={<FormulaireCV />} />
            <Route path="upload" element={<UploadCV />} />
            <Route path="validation" element={<ValidationCV />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="resultats" element={<ResultatEntretien />} />
            <Route path="resultats/:id" element={<ResultatEntretien />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
