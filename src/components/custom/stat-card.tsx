import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

type Props = {
  title: string;
  icon?: ReactNode;
  content: string;
  helpText?: string;
};

export default function StatCard({ title, icon, content, helpText }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{content}</div>
        {helpText && (
          <p className="text-xs text-muted-foreground">{helpText}</p>
        )}
      </CardContent>
    </Card>
  );
}
