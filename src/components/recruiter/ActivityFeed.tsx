import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface Activity {
  id: number;
  title: string;
  candidateName: string;
  time: string;
}

const activities: Activity[] = [
  {
    id: 1,
    title: "Nouveau candidat inscrit",
    candidateName: "Nesta MOUGHIAMA",
    time: "il y a 5 min",
  },
  {
    id: 2,
    title: "Quiz complété",
    candidateName: "Marie OBIANG",
    time: "il y a 12 min",
  },
  {
    id: 3,
    title: "CV téléchargé",
    candidateName: "Sarah KOMBILA",
    time: "il y a 25 min",
  },
];

export function ActivityFeed() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Activité Récente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
            >
              <div className="flex-1">
                <p className="font-medium text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.candidateName} • {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
