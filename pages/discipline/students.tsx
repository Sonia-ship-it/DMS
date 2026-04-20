import { DisciplineLayout } from "@/components/layout/DisciplineLayout";
import StudentsList from "@/pages/discipline/StudentsList";

export default function DisciplineStudentsRoute() {
  return (
    <DisciplineLayout>
      <StudentsList />
    </DisciplineLayout>
  );
}
