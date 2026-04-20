import { DisciplineLayout } from "@/components/layout/DisciplineLayout";
import DisciplineDashboard from "@/pages/discipline/Dashboard";

export default function DisciplineDashboardRoute() {
  return (
    <DisciplineLayout>
      <DisciplineDashboard />
    </DisciplineLayout>
  );
}
