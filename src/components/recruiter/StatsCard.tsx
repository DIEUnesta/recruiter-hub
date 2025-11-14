import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: "purple" | "orange" | "green" | "red";
}

const colorClasses = {
  purple: "bg-stats-purple",
  orange: "bg-stats-orange",
  green: "bg-stats-green",
  red: "bg-stats-red",
};

export function StatsCard({ title, value, icon: Icon, color }: StatsCardProps) {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-2">{value}</h3>
            <p className="text-muted-foreground text-sm">{title}</p>
          </div>
          <div className={`${colorClasses[color]} rounded-xl p-3`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
