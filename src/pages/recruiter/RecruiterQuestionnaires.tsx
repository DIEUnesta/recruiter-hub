import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, Plus } from "lucide-react";

const RecruiterQuestionnaires = () => {
  const questionnaires = [
    {
      id: 1,
      titre: "Quiz Développement Web",
      competence: "React & Laravel",
      questions: 15,
      duree: "20 min",
      utilise: 3,
    },
    {
      id: 2,
      titre: "Quiz Base de Données",
      competence: "MySQL",
      questions: 12,
      duree: "15 min",
      utilise: 2,
    },
    {
      id: 3,
      titre: "Quiz Compétences Générales",
      competence: "Communication",
      questions: 10,
      duree: "12 min",
      utilise: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Questionnaires
            </h1>
            <p className="text-muted-foreground">
              Gérez les quiz d'entretien pour les candidats
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nouveau Quiz
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Quiz
                  </p>
                  <p className="text-3xl font-bold text-foreground">3</p>
                </div>
                <div className="bg-primary/10 rounded-xl p-3">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Questions Totales
                  </p>
                  <p className="text-3xl font-bold text-foreground">37</p>
                </div>
                <div className="bg-stats-purple/10 rounded-xl p-3">
                  <FileText className="w-6 h-6 text-stats-purple" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Durée Moyenne
                  </p>
                  <p className="text-3xl font-bold text-foreground">16m</p>
                </div>
                <div className="bg-stats-orange/10 rounded-xl p-3">
                  <Clock className="w-6 h-6 text-stats-orange" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Questionnaires Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questionnaires.map((quiz) => (
            <Card key={quiz.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <span className="text-lg">{quiz.titre}</span>
                  <Badge variant="outline">{quiz.utilise} fois</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Compétence</p>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                    {quiz.competence}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {quiz.questions} questions
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {quiz.duree}
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Aperçu
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruiterQuestionnaires;
