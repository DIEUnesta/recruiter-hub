import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3 } from "lucide-react";

interface StatItem {
  label: string;
  value: number;
  color: string;
}

const stats: StatItem[] = [
  { label: "Taux de réussite moyen", value: 82, color: "bg-progress-blue" },
  { label: "Satisfaction recruteurs", value: 95, color: "bg-progress-green" },
  { label: "Candidatures traitées", value: 78, color: "bg-progress-purple" },
];

export function SystemStats() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Statistiques Système
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-foreground">{stat.label}</p>
                <span className="text-sm font-bold text-foreground">{stat.value}%</span>
              </div>
              <Progress value={stat.value} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
