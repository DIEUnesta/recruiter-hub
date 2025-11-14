import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RecruiterLayout from "./pages/recruiter/RecruiterLayout";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import RecruiterCandidates from "./pages/recruiter/RecruiterCandidates";
import RecruiterStatistics from "./pages/recruiter/RecruiterStatistics";
import RecruiterQuestionnaires from "./pages/recruiter/RecruiterQuestionnaires";
import RecruiterProfile from "./pages/recruiter/RecruiterProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Recruiter Routes */}
          <Route path="/recruteur" element={<RecruiterLayout />}>
            <Route path="dashboard" element={<RecruiterDashboard />} />
            <Route path="candidats" element={<RecruiterCandidates />} />
            <Route path="statistiques" element={<RecruiterStatistics />} />
            <Route path="questionnaires" element={<RecruiterQuestionnaires />} />
            <Route path="profil" element={<RecruiterProfile />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
