import { useState } from "react";
import { Users, Clock, CheckCircle, XCircle } from "lucide-react";
import { StatsCard } from "@/components/recruiter/StatsCard";
import { ActivityFeed } from "@/components/recruiter/ActivityFeed";
import { SystemStats } from "@/components/recruiter/SystemStats";
import { CandidateTable } from "@/components/recruiter/CandidateTable";
import { CandidateDetailsModal } from "@/components/recruiter/CandidateDetailsModal";

interface Candidate {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  score: number;
  methode: string;
  status: string;
}

const RecruiterDashboard = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Panneau de Recrutement
          </h1>
          <p className="text-muted-foreground">
            Gestion complète des candidatures VirtueHire
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Candidatures"
            value={5}
            icon={Users}
            color="purple"
          />
          <StatsCard
            title="En Attente"
            value={3}
            icon={Clock}
            color="orange"
          />
          <StatsCard
            title="Validés"
            value={1}
            icon={CheckCircle}
            color="green"
          />
          <StatsCard
            title="Refusés"
            value={1}
            icon={XCircle}
            color="red"
          />
        </div>

        {/* Activity and System Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityFeed />
          <SystemStats />
        </div>

        {/* Candidates Table */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Liste des Candidats
          </h2>
          <CandidateTable onViewDetails={handleViewDetails} />
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

export default RecruiterDashboard;
