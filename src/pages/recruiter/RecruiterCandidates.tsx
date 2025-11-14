import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { CandidateTable } from "@/components/recruiter/CandidateTable";
import { CandidateDetailsModal } from "@/components/recruiter/CandidateDetailsModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Candidate {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  score: number;
  methode: string;
  status: string;
}

const RecruiterCandidates = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleViewDetails = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Liste Complète des Candidats
          </h1>
          <p className="text-muted-foreground">
            Recherchez et filtrez tous les candidats
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom, email..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filtrer par score" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les scores</SelectItem>
              <SelectItem value="high">Score élevé (≥ 80%)</SelectItem>
              <SelectItem value="medium">Score moyen (60-79%)</SelectItem>
              <SelectItem value="low">Score faible (&lt; 60%)</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filtrer par méthode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les méthodes</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="form">Formulaire</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Plus de filtres
          </Button>
        </div>

        {/* Candidates Table */}
        <CandidateTable onViewDetails={handleViewDetails} />

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Affichage de 1 à 3 sur 3 candidats
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Précédent
            </Button>
            <Button variant="outline" size="sm" disabled>
              Suivant
            </Button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <CandidateDetailsModal
        candidate={selectedCandidate}
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default RecruiterCandidates;
