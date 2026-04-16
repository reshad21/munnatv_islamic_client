import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  color,
}: StatsCardProps) {
  return (
    <Card className="overflow-hidden py-0">
      <CardContent className="p-0">
        <div className="flex flex-col">
          <div className={`bg-gradient-to-r ${color} p-4 text-white`}>
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-sm">{title}</h3>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                {icon}
              </div>
            </div>
            <p className="text-2xl font-bold mt-2">{value}</p>
          </div>
          <div className="p-3 bg-card">
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
