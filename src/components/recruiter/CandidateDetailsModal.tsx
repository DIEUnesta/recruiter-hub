import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Candidate {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  score: number;
  methode: string;
  status: string;
}

interface CandidateDetailsModalProps {
  candidate: Candidate | null;
  open: boolean;
  onClose: () => void;
}

export function CandidateDetailsModal({
  candidate,
  open,
  onClose,
}: CandidateDetailsModalProps) {
  if (!candidate) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Détails du Candidat</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informations Personnelles */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-foreground">
              Informations Personnelles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Nom complet</p>
                <p className="font-medium">{candidate.nom}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{candidate.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Téléphone</p>
                <p className="font-medium">{candidate.telephone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Méthode de soumission</p>
                <Badge variant="outline">{candidate.methode}</Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* CV et Expérience */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-foreground">
              CV et Expérience
            </h3>
            <div className="bg-muted/30 p-4 rounded-lg space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Expérience professionnelle
                </p>
                <p className="text-sm">
                  Développeur Full Stack • 3 ans d'expérience • Spécialisé en
                  React et Laravel
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Diplôme</p>
                <p className="text-sm">Licence 3 Informatique - INPTIC</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Compétences</p>
                <div className="flex flex-wrap gap-2">
                  <Badge>React</Badge>
                  <Badge>Laravel</Badge>
                  <Badge>MySQL</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>TailwindCSS</Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Résultats de l'entretien */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-foreground">
              Résultats de l'Entretien
            </h3>
            <div className="bg-muted/30 p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Score global</span>
                <Badge
                  variant={candidate.score >= 60 ? "default" : "destructive"}
                  className="text-base px-3 py-1"
                >
                  {candidate.score}%
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Date de passage
                </p>
                <p className="text-sm">14 novembre 2025</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Détails par compétence
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Compétences techniques</span>
                    <span className="font-medium">90%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Communication</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Résolution de problèmes</span>
                    <span className="font-medium">80%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Télécharger CV (XML)
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Télécharger Rapport (XML)
            </Button>
            <Button variant="secondary" onClick={onClose} className="ml-auto">
              <X className="w-4 h-4 mr-2" />
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
