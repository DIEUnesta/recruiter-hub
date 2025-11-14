import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Briefcase, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const RecruiterProfile = () => {
  // Mock data - à remplacer par les vraies données de votre API
  const recruiterData = {
    nom: "Admin Recruteur",
    email: "recruteur@virtuehire.com",
    role: "Recruteur Principal",
    dateInscription: "15 septembre 2025",
  };

  const recentActions = [
    {
      id: 1,
      action: "Candidat validé",
      candidat: "Marie OBIANG",
      date: "14 nov 2025",
    },
    {
      id: 2,
      action: "CV téléchargé",
      candidat: "Nesta MOUGHIAMA",
      date: "14 nov 2025",
    },
    {
      id: 3,
      action: "Candidat refusé",
      candidat: "Sarah KOMBILA",
      date: "13 nov 2025",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Mon Profil</h1>
          <p className="text-muted-foreground">
            Gérez vos informations personnelles et votre compte
          </p>
        </div>

        {/* Profile Card */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Informations du Recruteur</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    AR
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{recruiterData.nom}</h3>
                  <Badge variant="outline" className="mt-1">
                    {recruiterData.role}
                  </Badge>
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="nom" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nom complet
                  </Label>
                  <Input
                    id="nom"
                    defaultValue={recruiterData.nom}
                    className="bg-muted/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={recruiterData.email}
                    className="bg-muted/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Rôle
                  </Label>
                  <Input
                    id="role"
                    defaultValue={recruiterData.role}
                    disabled
                    className="bg-muted/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date d'inscription
                  </Label>
                  <Input
                    id="date"
                    defaultValue={recruiterData.dateInscription}
                    disabled
                    className="bg-muted/50"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button>Modifier le profil</Button>
                <Button variant="outline">Changer le mot de passe</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Actions */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Historique des Actions Récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActions.map((action) => (
                <div
                  key={action.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-foreground">{action.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {action.candidat}
                    </p>
                  </div>
                  <Badge variant="outline">{action.date}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">
                Candidats traités
              </p>
              <p className="text-3xl font-bold text-foreground">5</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">
                Taux d'acceptation
              </p>
              <p className="text-3xl font-bold text-foreground">20%</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Jours actifs</p>
              <p className="text-3xl font-bold text-foreground">60</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;
