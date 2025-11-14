import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Award } from "lucide-react";

const RecruiterStatistics = () => {
  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Statistiques Globales
          </h1>
          <p className="text-muted-foreground">
            Vue d'ensemble des performances de recrutement
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Score moyen
                  </p>
                  <p className="text-3xl font-bold text-foreground">75%</p>
                </div>
                <div className="bg-primary/10 rounded-xl p-3">
                  <Award className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Taux de réussite
                  </p>
                  <p className="text-3xl font-bold text-foreground">60%</p>
                </div>
                <div className="bg-stats-green/10 rounded-xl p-3">
                  <TrendingUp className="w-6 h-6 text-stats-green" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Total candidats
                  </p>
                  <p className="text-3xl font-bold text-foreground">5</p>
                </div>
                <div className="bg-stats-purple/10 rounded-xl p-3">
                  <Users className="w-6 h-6 text-stats-purple" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Compétences évaluées
                  </p>
                  <p className="text-3xl font-bold text-foreground">12</p>
                </div>
                <div className="bg-stats-orange/10 rounded-xl p-3">
                  <BarChart3 className="w-6 h-6 text-stats-orange" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Répartition par Méthode de Soumission</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">PDF Upload</span>
                    <span className="text-sm font-bold">60% (3)</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "60%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Formulaire Manuel</span>
                    <span className="text-sm font-bold">40% (2)</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-stats-orange" style={{ width: "40%" }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Compétences les Plus Recherchées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">React</span>
                    <span className="text-sm font-bold">90%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-stats-purple" style={{ width: "90%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Laravel</span>
                    <span className="text-sm font-bold">75%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-stats-green" style={{ width: "75%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">MySQL</span>
                    <span className="text-sm font-bold">65%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "65%" }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Score Distribution */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Distribution des Scores par Compétence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Compétences Techniques</span>
                  <span className="text-sm font-bold">Score moyen: 85%</span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-progress-blue" style={{ width: "85%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Communication</span>
                  <span className="text-sm font-bold">Score moyen: 78%</span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-progress-green" style={{ width: "78%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Résolution de Problèmes</span>
                  <span className="text-sm font-bold">Score moyen: 72%</span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-progress-purple" style={{ width: "72%" }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecruiterStatistics;
