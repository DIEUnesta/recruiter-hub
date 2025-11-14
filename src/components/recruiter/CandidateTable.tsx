import { Eye, Download, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Candidate {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  score: number;
  methode: string;
  status: string;
}

// Mock data - à remplacer par les vraies données de votre API
const candidates: Candidate[] = [
  {
    id: 1,
    nom: "Nesta MOUGHIAMA",
    email: "nesta@example.com",
    telephone: "+241 06 00 00 00",
    score: 85,
    methode: "PDF",
    status: "En attente",
  },
  {
    id: 2,
    nom: "Marie OBIANG",
    email: "marie@example.com",
    telephone: "+241 06 11 11 11",
    score: 92,
    methode: "Formulaire",
    status: "Validé",
  },
  {
    id: 3,
    nom: "Sarah KOMBILA",
    email: "sarah@example.com",
    telephone: "+241 06 22 22 22",
    score: 45,
    methode: "PDF",
    status: "Refusé",
  },
];

interface CandidateTableProps {
  onViewDetails: (candidate: Candidate) => void;
}

export function CandidateTable({ onViewDetails }: CandidateTableProps) {
  const handleDownloadXML = (candidateId: number) => {
    console.log("Télécharger XML pour candidat:", candidateId);
    // Logique de téléchargement XML
  };

  const handleAccept = (candidate: Candidate) => {
    const message = `Félicitations ${candidate.nom}! Votre candidature a été acceptée.`;
    const whatsappUrl = `https://wa.me/${candidate.telephone.replace(/\s/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleReject = (candidate: Candidate) => {
    const message = `Bonjour ${candidate.nom}, nous sommes désolés mais votre candidature n'a pas été retenue.`;
    const whatsappUrl = `https://wa.me/${candidate.telephone.replace(/\s/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Méthode</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell className="font-medium">{candidate.nom}</TableCell>
              <TableCell>{candidate.email}</TableCell>
              <TableCell>{candidate.telephone}</TableCell>
              <TableCell>
                <Badge
                  variant={candidate.score >= 60 ? "default" : "destructive"}
                >
                  {candidate.score}%
                </Badge>
              </TableCell>
              <TableCell>{candidate.methode}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    candidate.status === "Validé"
                      ? "default"
                      : candidate.status === "Refusé"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {candidate.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewDetails(candidate)}
                    title="Voir détails"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDownloadXML(candidate.id)}
                    title="Télécharger XML"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-green-600 hover:text-green-700"
                    onClick={() => handleAccept(candidate)}
                    title="Accepter via WhatsApp"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive/80"
                    onClick={() => handleReject(candidate)}
                    title="Refuser via WhatsApp"
                  >
                    <XCircle className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
