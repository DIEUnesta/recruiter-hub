import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-stats-purple/5">
      <div className="text-center space-y-6 px-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
          <Users className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Application VirtueHire
        </h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          Plateforme de gestion des entretiens virtuels et recrutement
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            size="lg"
            onClick={() => navigate("/recruteur/dashboard")}
            className="gap-2"
          >
            <Users className="w-5 h-5" />
            Espace Recruteur
          </Button>
          <Button size="lg" variant="outline">
            Espace Candidat
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
